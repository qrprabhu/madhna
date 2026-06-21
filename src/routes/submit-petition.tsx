import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { supabase } from "@/lib/supabase";
import { submitPetition } from "@/lib/petitions";
import { generatePetitionPdf } from "@/lib/petition-pdf";
import { sendSms } from "@/lib/send-sms";
import { toast } from "sonner";
import { CheckCircle2, Download, ShieldCheck, Upload, FileSignature, Loader2 } from "lucide-react";
import { getFirebaseAuth, RecaptchaVerifier, signInWithPhoneNumber, toE164, type ConfirmationResult } from "@/lib/firebase";

export const Route = createFileRoute("/submit-petition")({
  head: () => ({ meta: [{ title: "Submit Petition — Vanni Arasu MLA" }] }),
  component: SubmitPage,
});

const schema = z.object({
  name: z.string().trim().min(2, "Name required").max(120),
  phone: z.string().trim().min(10, "Valid phone required").max(15).regex(/^[+\d\s-]+$/, "Invalid phone"),
  area: z.string().trim().min(2).max(120),
  address: z.string().trim().max(300).optional().or(z.literal("")),
  category: z.string().min(1, "Select a category"),
  description: z.string().trim().min(20, "Min 20 characters").max(2000),
});

const categories = ["Roads & Infrastructure", "Water Supply", "Electricity", "Education", "Healthcare", "Sanitation", "Housing", "Social Welfare", "Employment", "Other"];

function SubmitPage() {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [sendingOtp, setSendingOtp] = useState(false);
  const [verifyingOtp, setVerifyingOtp] = useState(false);
  const [verifiedPhone, setVerifiedPhone] = useState<string | null>(null);
  const confirmationRef = useRef<ConfirmationResult | null>(null);
  const recaptchaRef = useRef<RecaptchaVerifier | null>(null);

  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });
  const phoneValue = watch("phone");
  const phoneVerified = !!verifiedPhone && verifiedPhone === phoneValue;

  const handleSendOtp = async () => {
    if (!phoneValue || phoneValue.trim().length < 10) {
      toast.error("Enter a valid phone number first");
      return;
    }
    setSendingOtp(true);
    try {
      const auth = getFirebaseAuth();
      // Always start from a fresh verifier — reusing one across attempts causes auth/invalid-app-credential.
      recaptchaRef.current?.clear();
      const container = document.getElementById("recaptcha-container");
      if (container) container.innerHTML = "";
      recaptchaRef.current = new RecaptchaVerifier(auth, "recaptcha-container", { size: "invisible" });
      confirmationRef.current = await signInWithPhoneNumber(auth, toE164(phoneValue), recaptchaRef.current);
      setOtpSent(true);
      setOtp("");
      toast.success("OTP sent to your phone");
    } catch (e: any) {
      recaptchaRef.current?.clear();
      recaptchaRef.current = null;
      toast.error(e.message || "Failed to send OTP");
    } finally {
      setSendingOtp(false);
    }
  };

  const handleSkipVerification = () => {
    if (!phoneValue || phoneValue.trim().length < 10) {
      toast.error("Enter a valid phone number first");
      return;
    }
    setVerifiedPhone(phoneValue);
    toast.success("Verification skipped for this number");
  };

  const handleVerifyOtp = async () => {
    if (!confirmationRef.current) return;
    setVerifyingOtp(true);
    try {
      await confirmationRef.current.confirm(otp);
      setVerifiedPhone(phoneValue);
      await getFirebaseAuth().signOut();
      toast.success("Phone number verified");
    } catch (e: any) {
      toast.error("Invalid OTP, please try again");
    } finally {
      setVerifyingOtp(false);
    }
  };

  const onSubmit = async (values: z.infer<typeof schema>) => {
    setSubmitting(true);
    try {
      let image_url: string | null = null;
      if (file) {
        const ext = file.name.split(".").pop();
        const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
        const { error: upErr } = await supabase.storage.from("petitions").upload(path, file);
        if (upErr) throw upErr;
        image_url = supabase.storage.from("petitions").getPublicUrl(path).data.publicUrl;
      }
      const petition = await submitPetition({
        name: values.name,
        phone: values.phone,
        area: values.area,
        description: values.description,
        address: values.address || null,
        category: values.category,
        image_url,
      });
      setDone(true);
      toast.success("Petition Submitted Successfully");

      try {
        const pdfBlob = await generatePetitionPdf(petition);
        const pdfPath = `pdfs/petition-${petition.id}.pdf`;
        const { error: pdfErr } = await supabase.storage.from("petitions").upload(pdfPath, pdfBlob, {
          contentType: "application/pdf",
          upsert: true,
        });
        if (pdfErr) throw pdfErr;
        const publicUrl = supabase.storage.from("petitions").getPublicUrl(pdfPath).data.publicUrl;
        setPdfUrl(publicUrl);
        if (verifiedPhone) {
          const message = `Your petition has been submitted successfully. Here is your petition copy: ${publicUrl}`;
          try {
            await sendSms({ data: { phone: verifiedPhone, message } });
            toast.success("SMS sent to your phone");
          } catch (smsErr: any) {
            console.error("SMS send failed:", smsErr);
            toast.error(`Couldn't send the SMS: ${smsErr?.message ?? "unknown error"}`);
          }
        }
      } catch (pdfErr: any) {
        console.error("PDF generation/upload failed:", pdfErr);
        toast.error(`Petition saved, but the PDF copy couldn't be generated: ${pdfErr?.message ?? "unknown error"}`);
      }
    } catch (e: any) {
      toast.error(e.message || "Failed to submit");
    } finally {
      setSubmitting(false);
    }
  };

  if (done) {
    return (
      <div className="min-h-screen bg-hero flex items-center justify-center px-5 pt-20">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
          className="glass rounded-3xl p-10 text-center text-white max-w-md shadow-glow-gold">
          <CheckCircle2 className="mx-auto text-gold mb-4 animate-pulse-glow" size={64} />
          <h2 className="font-display font-black text-3xl mb-2">Petition Received</h2>
          <p className="text-white/80 mb-6">Thank you. Your voice has been heard. We'll review and follow up shortly.</p>
          {pdfUrl ? (
            <div className="flex flex-col items-center gap-3 mb-4">
              <a
                href={pdfUrl}
                target="_blank"
                rel="noreferrer"
                className="btn-primary-gold inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl w-full"
              >
                <Download size={18} /> Download Petition Copy (PDF)
              </a>
              {verifiedPhone && (
                <p className="text-white/60 text-xs">A text message with this copy was sent to {verifiedPhone}.</p>
              )}
            </div>
          ) : (
            <p className="text-white/60 text-sm mb-4">Preparing your petition copy…</p>
          )}
          <div>
            <button onClick={() => navigate({ to: "/ongoing" })} className="text-gold text-sm font-semibold hover:underline">
              View Ongoing Petitions →
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-20 min-h-screen bg-gradient-to-b from-muted to-background">
      <section className="bg-hero text-white py-16 -mt-28 pt-40 mb-12 relative overflow-hidden">
        <div className="orb bg-gold w-[400px] h-[400px] top-0 right-0 opacity-30" />
        <div className="container mx-auto px-5 lg:px-8 relative">
          <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="font-display font-black text-4xl lg:text-6xl">
            Submit Your <span className="text-gradient-gold">Petition</span>
          </motion.h1>
          <p className="text-white/80 mt-3 max-w-2xl">Every issue matters. Share yours and we'll act on it transparently.</p>
        </div>
      </section>

      <div className="container mx-auto px-5 lg:px-8">
        <motion.form onSubmit={handleSubmit(onSubmit)} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto bg-card rounded-3xl shadow-soft p-6 md:p-10 space-y-5">

          <div className="grid md:grid-cols-2 gap-5">
            <Field label="Full Name *" error={errors.name?.message}>
              <input {...register("name")} className="input" placeholder="Your name" />
            </Field>
            <Field label="Area / Village *" error={errors.area?.message}>
              <input {...register("area")} className="input" placeholder="Village or area" />
            </Field>
            <Field label="Category *" error={errors.category?.message}>
              <select {...register("category")} className="input">
                <option value="">Select category</option>
                {categories.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </Field>
            <Field label="Address" error={errors.address?.message} className="md:col-span-2">
              <input {...register("address")} className="input" placeholder="Full address (optional)" />
            </Field>
            <Field label="Problem Description *" error={errors.description?.message} className="md:col-span-2">
              <textarea {...register("description")} rows={5} className="input resize-none" placeholder="Describe the issue in detail..." />
            </Field>
            <Field label="Image (optional)" className="md:col-span-2">
              <label className="flex items-center gap-3 border-2 border-dashed border-border rounded-xl p-4 cursor-pointer hover:border-gold">
                <Upload size={20} className="text-royal" />
                <span className="text-sm text-muted-foreground">{file?.name || "Upload supporting image"}</span>
                <input type="file" accept="image/*" className="hidden" onChange={(e) => setFile(e.target.files?.[0] || null)} />
              </label>
            </Field>
            <Field label="Phone Number *" error={errors.phone?.message} className="md:col-span-2">
              <div className="flex gap-2">
                <input {...register("phone")} className="input" placeholder="+91 ..." disabled={phoneVerified} />
                {phoneVerified ? (
                  <span className="flex items-center gap-1.5 px-4 rounded-xl border-2 border-green-500 bg-green-50 text-green-700 text-sm font-semibold whitespace-nowrap">
                    <ShieldCheck size={16} /> Verified
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={handleSendOtp}
                    disabled={sendingOtp}
                    className="px-4 rounded-xl border-2 border-gold text-navy-deep font-semibold text-sm whitespace-nowrap hover:bg-gold/10 transition-colors disabled:opacity-50"
                  >
                    {sendingOtp ? "Sending…" : otpSent ? "Resend OTP" : "Send OTP"}
                  </button>
                )}
              </div>
              {!phoneVerified && (
                <button
                  type="button"
                  onClick={handleSkipVerification}
                  className="text-base font-semibold text-navy-deep hover:text-gold underline mt-2"
                >
                  Using Jio? OTP delivery is unreliable on Jio — skip verification
                </button>
              )}
              {otpSent && !phoneVerified && (
                <div className="flex gap-2 mt-3">
                  <input
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="input"
                    placeholder="Enter 6-digit OTP"
                    maxLength={6}
                    inputMode="numeric"
                  />
                  <button
                    type="button"
                    onClick={handleVerifyOtp}
                    disabled={verifyingOtp || otp.trim().length < 4}
                    className="btn-primary-gold px-5 rounded-xl text-sm font-semibold whitespace-nowrap disabled:opacity-50"
                  >
                    {verifyingOtp ? "Verifying…" : "Verify"}
                  </button>
                </div>
              )}
              <div id="recaptcha-container" />
            </Field>
          </div>

          <button disabled={submitting || !phoneVerified} className="btn-primary-gold w-full py-4 rounded-xl flex items-center justify-center gap-2 disabled:opacity-60">
            {submitting ? <Loader2 className="animate-spin" size={18} /> : <FileSignature size={18} />}
            {submitting ? "Submitting…" : "Submit Petition"}
          </button>
          {!phoneVerified && (
            <p className="text-center text-xs text-muted-foreground">Verify your phone number above to submit your petition.</p>
          )}
        </motion.form>
      </div>
      <style>{`.input{width:100%;padding:.75rem 1rem;border:1.5px solid var(--border);border-radius:.75rem;background:white;font-size:.95rem;transition:all .2s}.input:focus{outline:none;border-color:var(--gold);box-shadow:0 0 0 3px rgba(251,192,45,.2)}`}</style>
    </div>
  );
}

function Field({ label, error, className = "", children }: any) {
  return (
    <div className={className}>
      <label className="block text-xs font-bold uppercase tracking-wider text-navy-deep mb-1.5">{label}</label>
      {children}
      {error && <p className="text-destructive text-xs mt-1">{error}</p>}
    </div>
  );
}
