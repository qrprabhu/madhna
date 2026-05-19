import { Link, useLocation } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { TranslateButton } from "@/components/TranslateButton";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/ongoing", label: "Ongoing" },
  { to: "/completed", label: "Completed" },
  { to: "/submit-petition", label: "Petition" },
  { to: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const loc = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [loc.pathname]);

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
      scrolled ? "bg-[rgba(11,31,58,0.85)] backdrop-blur-xl shadow-soft" : "bg-transparent"
    }`}>
      <div className="container mx-auto px-5 lg:px-8 flex items-center justify-between h-16 lg:h-20">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-xl bg-gold flex items-center justify-center font-display font-black text-[--navy-deep] text-lg shadow-glow-gold">
            VA
          </div>
          <div className="hidden sm:block">
            <div className="text-white font-display font-bold leading-tight">Vanni Arasu</div>
            <div className="text-[10px] text-gold tracking-widest uppercase">MLA • Tindivanam</div>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="px-4 py-2 text-sm font-medium text-white/85 hover:text-gold rounded-lg transition-colors relative"
              activeProps={{ className: "px-4 py-2 text-sm font-bold text-gold" }}
            >
              {l.label}
            </Link>
          ))}
          <TranslateButton className="ml-1" />
          <Link
            to="/login"
            className="ml-2 px-4 py-2.5 text-sm font-medium text-white/85 hover:text-gold rounded-lg border border-white/20 hover:border-gold/50 transition-colors"
          >
            Admin
          </Link>
          <Link to="/submit-petition" className="ml-2 px-5 py-2.5 rounded-full btn-primary-gold text-sm">
            Submit Petition
          </Link>
        </nav>

        <button className="lg:hidden text-white p-2" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden bg-[rgba(11,31,58,0.97)] backdrop-blur-xl border-t border-white/10">
          <div className="container mx-auto px-5 py-4 flex flex-col gap-1">
            {links.map((l) => (
              <Link key={l.to} to={l.to} className="px-4 py-3 text-white/90 hover:bg-white/5 rounded-lg">
                {l.label}
              </Link>
            ))}
            <TranslateButton className="mx-4 justify-center border-white/10" />
            <Link to="/login" className="px-4 py-3 text-gold font-medium hover:bg-white/5 rounded-lg">
              Admin Login
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
