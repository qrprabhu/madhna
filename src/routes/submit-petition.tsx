import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { supabase } from "@/lib/supabase";
import { submitPetition } from "@/lib/petitions";
import { toast } from "sonner";
import { CheckCircle2, Upload, FileSignature, Loader2 } from "lucide-react";

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
  priority: z.enum(["low", "medium", "high", "urgent"]),
});

const categories = ["Roads & Infrastructure", "Water Supply", "Electricity", "Education", "Healthcare", "Sanitation", "Housing", "Social Welfare", "Employment", "Other"];

function SubmitPage() {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { priority: "medium" as const },
  });
  const selectedPriority = watch("priority");

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
      await submitPetition({
        name: values.name,
        phone: values.phone,
        area: values.area,
        description: values.description,
        address: values.address || null,
        category: values.category,
        priority: values.priority,
        image_url,
      });
      setDone(true);
      toast.success("Petition Submitted Successfully");
      setTimeout(() => navigate({ to: "/ongoing" }), 2500);
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
          <p className="text-white/80">Thank you. Your voice has been heard. We'll review and follow up shortly.</p>
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
            <Field label="Phone Number *" error={errors.phone?.message}>
              <input {...register("phone")} className="input" placeholder="+91 ..." />
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
            <Field label="Priority *" error={errors.priority?.message} className="md:col-span-2">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {(["low", "medium", "high", "urgent"] as const).map((p) => (
                  <label key={p} className="cursor-pointer">
                    <input type="radio" {...register("priority")} value={p} className="sr-only" />
                    <div
                      className={`text-center py-2.5 rounded-xl border-2 text-sm capitalize transition-all ${
                        selectedPriority === p
                          ? "border-amber-500 bg-amber-100 text-slate-900 font-bold shadow-sm ring-2 ring-amber-400/60"
                          : "border-slate-200 bg-white text-slate-600 font-medium hover:border-amber-300"
                      }`}
                    >
                      {p}
                    </div>
                  </label>
                ))}
              </div>
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
          </div>

          <button disabled={submitting} className="btn-primary-gold w-full py-4 rounded-xl flex items-center justify-center gap-2 disabled:opacity-60">
            {submitting ? <Loader2 className="animate-spin" size={18} /> : <FileSignature size={18} />}
            {submitting ? "Submitting…" : "Submit Petition"}
          </button>
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
