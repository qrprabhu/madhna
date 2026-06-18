import { Link } from "@tanstack/react-router";
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin, Clock, Award } from "lucide-react";
import vckLogo from "@/assets/vck-logo.png";

export function SiteFooter() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="relative bg-gradient-to-b from-navy-deep via-navy-deep/95 to-black text-white overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: "radial-gradient(circle at 20% 50%, rgba(255,215,0,0.1) 0%, transparent 50%)",
      }} />
      <div className="orb bg-royal w-[300px] h-[300px] -top-32 -right-32 opacity-10" />
      <div className="orb bg-cyan-hi w-[200px] h-[200px] -bottom-20 -left-20 opacity-5" />

      {/* MAIN FOOTER CONTENT */}
      <div className="container mx-auto px-5 lg:px-8 py-20 relative">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* BRAND SECTION */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <img src={vckLogo} alt="VCK Logo" className="w-14 h-14 rounded-xl shadow-glow-gold" />
              <div>
                <div className="font-display font-bold text-2xl">Viduthalai Chiruthaigal Katchi</div>
                <div className="text-xs text-gold tracking-widest uppercase font-semibold">Minister • Social Welfare</div>
              </div>
            </div>
            
            <p className="text-white/70 text-sm leading-relaxed max-w-sm mb-6">
              Voice of the People, Strength of Tindivanam. A member of <strong>Viduthalai Chiruthaigal Katchi (VCK)</strong>, dedicated to social justice, equality, and public welfare through transparent governance.
            </p>

            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3 text-white/80 hover:text-gold transition-colors">
                <MapPin size={16} className="text-gold flex-shrink-0" />
                <span>MLA Office, Tindivanam, Villupuram Dist., TN</span>
              </div>
              <div className="flex items-center gap-3 text-white/80 hover:text-gold transition-colors">
                <Phone size={16} className="text-gold flex-shrink-0" />
                <a href="tel:+919800000000" className="hover:text-gold">+91 98000 00000</a>
              </div>
              <div className="flex items-center gap-3 text-white/80 hover:text-gold transition-colors">
                <Mail size={16} className="text-gold flex-shrink-0" />
                <a href="mailto:contact@vanniarasu.in" className="hover:text-gold">contact@vanniarasu.in</a>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-3 mt-6">
              {[
                { Icon: Facebook, label: "Facebook" },
                { Icon: Twitter, label: "Twitter" },
                { Icon: Instagram, label: "Instagram" },
                { Icon: Youtube, label: "YouTube" },
              ].map(({ Icon, label }, i) => (
                <a 
                  key={i} 
                  href="#" 
                  aria-label={label}
                  className="w-11 h-11 rounded-full bg-white/10 hover:bg-gradient-to-br hover:from-gold hover:to-gold/70 flex items-center justify-center transition-all duration-300 group"
                >
                  <Icon size={16} className="group-hover:text-navy-deep" />
                </a>
              ))}
            </div>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h4 className="text-gold font-display font-bold mb-5 text-sm uppercase tracking-wider border-b border-gold/30 pb-3">
              Platform
            </h4>
            <ul className="space-y-3 text-sm text-white/70">
              <li>
                <Link to="/" className="hover:text-gold hover:translate-x-1 transition-all inline-flex items-center gap-2">
                  → Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-gold hover:translate-x-1 transition-all inline-flex items-center gap-2">
                  → About MLA
                </Link>
              </li>
              <li>
                <Link to="/submit-petition" className="hover:text-gold hover:translate-x-1 transition-all inline-flex items-center gap-2">
                  → Submit Petition
                </Link>
              </li>
              <li>
                <Link to="/ongoing" className="hover:text-gold hover:translate-x-1 transition-all inline-flex items-center gap-2">
                  → Ongoing Works
                </Link>
              </li>
              <li>
                <Link to="/completed" className="hover:text-gold hover:translate-x-1 transition-all inline-flex items-center gap-2">
                  → Completed Works
                </Link>
              </li>
            </ul>
          </div>

          {/* OFFICE HOURS */}
          <div>
            <h4 className="text-gold font-display font-bold mb-5 text-sm uppercase tracking-wider border-b border-gold/30 pb-3">
              Office Hours
            </h4>
            <ul className="space-y-3 text-sm text-white/70">
              <li className="flex items-start gap-2">
                <Clock size={16} className="text-gold flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-white">Mon - Fri</div>
                  <div>9:00 AM - 5:00 PM</div>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Clock size={16} className="text-gold flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-white">Saturday</div>
                  <div>10:00 AM - 2:00 PM</div>
                </div>
              </li>
              <li className="text-white/50 text-xs pt-2">
                Sunday & Holidays: Closed
              </li>
            </ul>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent my-12" />

        {/* BOTTOM SECTION */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* LEFT - Copyright & Links */}
          <div className="space-y-4">
            <p className="text-white/60 text-sm">
              © {currentYear} Vanni Arasu MLA Office. All rights reserved.
            </p>
            <p className="text-white/50 text-xs leading-relaxed">
              <strong>Viduthalai Chiruthaigal Katchi (VCK)</strong> is a Dravidian political party committed to social justice, equality, and the emancipation of marginalized communities.
            </p>
            <div className="flex gap-4 text-xs text-white/50">
              <Link to="/login" className="hover:text-gold transition-colors">
                Admin Portal
              </Link>
              <span>•</span>
              <a href="#" className="hover:text-gold transition-colors">
                Privacy Policy
              </a>
              <span>•</span>
              <a href="#" className="hover:text-gold transition-colors">
                Terms of Service
              </a>
            </div>
          </div>

          {/* RIGHT - Stats/Highlights */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white/5 border border-gold/20 rounded-xl p-4 text-center hover:bg-white/10 transition-colors">
              <Award size={20} className="text-gold mx-auto mb-2" />
              <div className="font-display font-bold text-lg text-gold">50K+</div>
              <div className="text-xs text-white/70">Constituents Served</div>
            </div>
            <div className="bg-white/5 border border-gold/20 rounded-xl p-4 text-center hover:bg-white/10 transition-colors">
              <div className="font-display font-bold text-lg text-gold">100%</div>
              <div className="text-xs text-white/70">Transparency</div>
            </div>
            <div className="bg-white/5 border border-gold/20 rounded-xl p-4 text-center hover:bg-white/10 transition-colors">
              <div className="font-display font-bold text-lg text-gold">20+</div>
              <div className="text-xs text-white/70">Years Service</div>
            </div>
          </div>
        </div>
      </div>

      {/* TOP FOOTER STRIPE */}
      <div className="h-1 bg-gradient-to-r from-transparent via-gold to-transparent" />
    </footer>
  );
}
