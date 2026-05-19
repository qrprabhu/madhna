import { Link, useLocation } from "@tanstack/react-router";
import { FileSignature } from "lucide-react";

export function MobileStickyCTA() {
  const loc = useLocation();
  if (loc.pathname.startsWith("/submit-petition") || loc.pathname.startsWith("/admin") || loc.pathname.startsWith("/login")) return null;
  return (
    <div className="lg:hidden fixed bottom-4 inset-x-4 z-40">
      <Link to="/submit-petition" className="btn-primary-gold flex items-center justify-center gap-2 w-full py-4 rounded-2xl shadow-glow-gold animate-pulse-glow">
        <FileSignature size={18} />
        Submit Your Petition
      </Link>
    </div>
  );
}
