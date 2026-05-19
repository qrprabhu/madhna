import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Loader2, Lock } from "lucide-react";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Admin Login" }] }),
  component: LoginPage,
});

async function isAuthorizedAdmin(userId: string) {
  const { data, error } = await supabase
    .from("user_roles")
    .select("role")
    .eq("user_id", userId)
    .eq("role", "admin")
    .maybeSingle();
  if (error) throw error;
  return !!data;
}

function LoginPage() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      if (!data.user) throw new Error("Sign in failed");

      const allowed = await isAuthorizedAdmin(data.user.id);
      if (!allowed) {
        await supabase.auth.signOut();
        throw new Error(
          "This account is not authorized for admin access. Contact your administrator.",
        );
      }

      nav({ to: "/admin" });
    } catch (e: unknown) {
      let message = e instanceof Error ? e.message : "Sign in failed";
      if (/invalid login credentials/i.test(message)) {
        message =
          "Invalid email or password. Create the user in the same Supabase project as VITE_SUPABASE_URL in .env (check Settings → API), with Auto Confirm enabled.";
      }
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="min-h-screen bg-hero flex items-center justify-center px-5 relative overflow-hidden"
    >
      <div className="orb bg-gold w-[400px] h-[400px] top-10 right-10 opacity-30" />
      <div className="orb bg-[--cyan-hi] w-[400px] h-[400px] bottom-10 left-10 opacity-30" />
      <div className="relative glass rounded-3xl p-8 w-full max-w-md text-white shadow-glow-gold">
        <Link to="/" className="text-xs text-white/60 hover:text-gold">
          ← Back to site
        </Link>
        <div className="text-center mb-6 mt-3">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-gold flex items-center justify-center text-[--navy-deep] mb-3">
            <Lock />
          </div>
          <h1 className="font-display font-black text-3xl">Admin Sign In</h1>
          <p className="text-white/60 text-sm mt-1">
            Authorized staff only. Accounts are created by an administrator.
          </p>
        </div>
        <form onSubmit={submit} className="space-y-4">
          <input
            type="email"
            required
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:border-gold focus:outline-none"
          />
          <input
            type="password"
            required
            minLength={6}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:border-gold focus:outline-none"
          />
          <button
            disabled={loading}
            className="btn-primary-gold w-full py-3 rounded-xl flex items-center justify-center gap-2"
          >
            {loading && <Loader2 className="animate-spin" size={16} />}
            Sign In
          </button>
        </form>
      </div>
    </motion.div>
  );
}
