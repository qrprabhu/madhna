import { Link } from "@tanstack/react-router";
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="bg-[--navy-deep] text-white pt-16 pb-8 relative overflow-hidden">
      <div className="orb bg-[--royal] w-[400px] h-[400px] -top-32 -right-32" />
      <div className="container mx-auto px-5 lg:px-8 relative">
        <div className="grid md:grid-cols-4 gap-10 mb-10">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gold flex items-center justify-center font-display font-black text-[--navy-deep]">VA</div>
              <div>
                <div className="font-display font-bold text-xl">Vanni Arasu</div>
                <div className="text-xs text-gold tracking-widest uppercase">MLA Tindivanam</div>
              </div>
            </div>
            <p className="text-white/70 text-sm max-w-md leading-relaxed">
              Voice of the People, Strength of Tindivanam. Serving the people of Tindivanam with dedication, transparency, and social justice.
            </p>
            <div className="flex gap-3 mt-5">
              {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-gold hover:text-[--navy-deep] transition-all">
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-gold font-display font-semibold mb-4 text-sm uppercase tracking-wider">Explore</h4>
            <ul className="space-y-2 text-sm text-white/75">
              <li><Link to="/about" className="hover:text-gold">About MLA</Link></li>
              <li><Link to="/ongoing" className="hover:text-gold">Ongoing Works</Link></li>
              <li><Link to="/completed" className="hover:text-gold">Completed Works</Link></li>
              <li><Link to="/submit-petition" className="hover:text-gold">Submit Petition</Link></li>
              <li><Link to="/login" className="hover:text-gold">Admin Login</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-gold font-display font-semibold mb-4 text-sm uppercase tracking-wider">Office</h4>
            <ul className="space-y-2 text-sm text-white/75">
              <li>MLA Office, Tindivanam</li>
              <li>Villupuram District, TN</li>
              <li>+91 98000 00000</li>
              <li>contact@vanniarasu.in</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center text-xs text-white/50 gap-2">
          <span>© {new Date().getFullYear()} Vanni Arasu MLA Office • Viduthalai Chiruthaigal Katchi</span>
          <Link to="/login" className="hover:text-gold">Admin Login</Link>
        </div>
      </div>
    </footer>
  );
}
