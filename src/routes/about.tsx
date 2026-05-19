import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import portrait from "@/assets/vanni-arasu.png";
import { Award, Users, Megaphone, Scale } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Vanni Arasu — MLA Tindivanam" },
      { name: "description", content: "Biography, vision, mission and political journey of Vanni Arasu, MLA Tindivanam." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="pt-28 pb-24">
      <section className="bg-hero text-white py-20 mb-16 -mt-28 pt-44 relative overflow-hidden">
        <div className="orb bg-gold w-[400px] h-[400px] top-10 right-10 opacity-30" />
        <div className="container mx-auto px-5 lg:px-8 relative">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-display font-black text-5xl lg:text-7xl">
            About <span className="text-gradient-gold">Vanni Arasu</span>
          </motion.h1>
          <p className="text-white/80 max-w-2xl mt-4 text-lg">A lifetime in service of social justice, equity, and the people of Tindivanam.</p>
        </div>
      </section>

      <div className="container mx-auto px-5 lg:px-8 grid lg:grid-cols-5 gap-12">
        <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="lg:col-span-2">
          <div className="aspect-[3/4] rounded-3xl overflow-hidden shadow-soft border-4 border-gold/40">
            <img src={portrait} alt="Vanni Arasu" className="w-full h-full object-cover object-top" />
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="lg:col-span-3 space-y-8">
          <div>
            <div className="text-gold font-bold uppercase tracking-widest text-xs mb-2">Biography</div>
            <p className="text-[--navy-deep] text-lg leading-relaxed">
              Vanni Arasu is a Tamil Nadu politician, social-justice activist, and the elected MLA of Tindivanam. For over two decades, he has stood with the people — organizing grassroots campaigns, advocating for community welfare, and championing public development. As a senior member of Viduthalai Chiruthaigal Katchi (VCK), his politics is rooted in Periyarist and Ambedkarite ideals of equality, dignity, and emancipation.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            {[
              { icon: Scale, t: "Social Justice", d: "Lifelong advocate for equality and public welfare." },
              { icon: Megaphone, t: "Grassroots Activism", d: "Movement-built, people-driven politics." },
              { icon: Users, t: "Community First", d: "Direct connection with every village panchayat." },
              { icon: Award, t: "Public Welfare", d: "Education, healthcare, and rural infrastructure." },
            ].map((c, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="glass-light p-5 rounded-2xl shadow-card">
                <div className="w-10 h-10 rounded-lg bg-[--navy-deep] text-gold flex items-center justify-center mb-3"><c.icon size={18} /></div>
                <div className="font-display font-bold text-[--navy-deep]">{c.t}</div>
                <div className="text-sm text-muted-foreground">{c.d}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
