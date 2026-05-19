import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Facebook, Twitter, Instagram, Youtube } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({ meta: [{ title: "Contact — Vanni Arasu MLA Office" }] }),
  component: ContactPage,
});

function ContactPage() {
  const items = [
    { icon: MapPin, label: "Office Address", value: "MLA Office, Tindivanam, Villupuram District, Tamil Nadu — 604001" },
    { icon: Phone, label: "Phone", value: "+91 98000 00000" },
    { icon: Mail, label: "Email", value: "contact@vanniarasu.in" },
    { icon: Clock, label: "Office Hours", value: "Mon–Sat • 10:00 AM – 6:00 PM" },
  ];

  return (
    <div className="pt-28 pb-20">
      <section className="bg-hero text-white py-16 -mt-28 pt-40 mb-12 relative overflow-hidden">
        <div className="orb bg-[--cyan-hi] w-[400px] h-[400px] -top-20 -left-20 opacity-40" />
        <div className="container mx-auto px-5 lg:px-8 relative">
          <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="font-display font-black text-4xl lg:text-6xl">
            Get in <span className="text-gradient-gold">Touch</span>
          </motion.h1>
          <p className="text-white/80 mt-3">We're here to listen, support and act.</p>
        </div>
      </section>

      <div className="container mx-auto px-5 lg:px-8 grid lg:grid-cols-2 gap-6 max-w-6xl">
        <div className="space-y-4">
          {items.map((c, i) => (
            <motion.div key={c.label} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="glass-light rounded-2xl p-5 flex items-start gap-4 shadow-card">
              <div className="w-12 h-12 rounded-xl bg-[--navy-deep] text-gold flex items-center justify-center flex-shrink-0"><c.icon size={20} /></div>
              <div>
                <div className="text-xs uppercase tracking-widest text-[--royal] font-bold mb-1">{c.label}</div>
                <div className="text-[--navy-deep] font-medium">{c.value}</div>
              </div>
            </motion.div>
          ))}
          <div className="glass-light rounded-2xl p-5 shadow-card">
            <div className="text-xs uppercase tracking-widest text-[--royal] font-bold mb-3">Follow</div>
            <div className="flex gap-3">
              {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="w-11 h-11 rounded-full bg-[--navy-deep] text-gold flex items-center justify-center hover:bg-gold hover:text-[--navy-deep] transition-all">
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="rounded-3xl overflow-hidden shadow-soft min-h-[500px]">
          <iframe title="Map" src="https://www.google.com/maps?q=Tindivanam,Tamil+Nadu&output=embed" className="w-full h-full border-0 min-h-[500px]" loading="lazy" />
        </div>
      </div>
    </div>
  );
}
