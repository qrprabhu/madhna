import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import portrait from "@/assets/vanni-arasu.png";
import { Award, Users, Megaphone, Scale, Heart, BookOpen, Target, BarChart3, MapPin, Clock, Zap, Globe, Building2, Leaf } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Vanni Arasu — MLA Tindivanam | Complete Biography & Vision" },
      { name: "description", content: "Complete biography, political journey, achievements, vision and mission of Vanni Arasu, MLA Tindivanam. Social justice leader and grassroots activist." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="pt-28 pb-0">
      {/* HERO SECTION */}
      <section className="bg-hero text-white py-20 mb-0 -mt-28 pt-44 relative overflow-hidden">
        <div className="orb bg-gold w-[400px] h-[400px] top-10 right-10 opacity-30" />
        <div className="container mx-auto px-5 lg:px-8 relative">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-display font-black text-5xl lg:text-7xl">
            About <span className="text-gradient-gold">Vanni Arasu</span>
          </motion.h1>
          <p className="text-white/80 max-w-3xl mt-4 text-lg">A lifetime in service of social justice, equity, and the people of Tindivanam. Political visionary. Grassroots leader. Voice of the voiceless.</p>
        </div>
      </section>

      {/* MAIN BIOGRAPHY SECTION */}
      <div className="container mx-auto px-5 lg:px-8 py-20 grid lg:grid-cols-5 gap-12">
        <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="lg:col-span-2">
          <div className="aspect-[3/4] rounded-3xl overflow-hidden shadow-soft border-4 border-gold/40 sticky top-28">
            <img src={portrait} alt="Vanni Arasu" className="w-full h-full object-cover object-top" />
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="lg:col-span-3 space-y-10">
          {/* FULL BIOGRAPHY */}
          <div>
            <div className="text-gold font-bold uppercase tracking-widest text-xs mb-3">Full Biography</div>
            <div className="space-y-4 text-navy-deep text-base leading-relaxed">
              <p>
                <strong>Vanni Arasu</strong> is a renowned Tamil Nadu politician, social-justice activist, and the elected Member of Legislative Assembly (MLA) of Tindivanam Constituency. With a career spanning over two decades in grassroots activism and public service, he represents the progressive ideology of Viduthalai Chiruthaigal Katchi (VCK) and the enduring legacy of Periyarist and Ambedkarite principles.
              </p>
              
              <p>
                Born and raised in Tindivanam, Vanni Arasu's journey is rooted in direct community engagement. His political philosophy emphasizes <strong>equality, dignity, and emancipation</strong> — core tenets of the social justice movement. For over 20 years, he has organized grassroots campaigns, advocated for marginalized communities, and championed public development projects that directly improve citizens' lives.
              </p>

              <p>
                As MLA, Vanni Arasu has focused on:<br/>
                <strong>• Education & Healthcare:</strong> Expanding access to quality education and medical services in rural areas<br/>
                <strong>• Infrastructure Development:</strong> Building roads, water systems, and public facilities<br/>
                <strong>• Social Welfare:</strong> Supporting vulnerable populations through targeted government schemes<br/>
                <strong>• Farmer Support:</strong> Agricultural policy advocacy and rural economic empowerment
              </p>

              <p>
                His approach to governance emphasizes <strong>transparency, accountability, and direct citizen participation</strong>. Through this petition platform, constituents can voice concerns, track government action, and witness real-time implementation of public works — transforming governance into a living dialogue between elected representatives and the people.
              </p>
            </div>
          </div>

          {/* CORE VALUES */}
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { icon: Scale, t: "Social Justice", d: "Lifelong advocate for equality, dignity, and emancipation of all people." },
              { icon: Megaphone, t: "Grassroots Activism", d: "Movement-built, people-driven politics rooted in community organizing." },
              { icon: Users, t: "Community First", d: "Direct connection with every village, panchayat, and citizen." },
              { icon: Award, t: "Public Welfare", d: "Tangible improvements in education, healthcare, and rural infrastructure." },
            ].map((c, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="glass-light p-5 rounded-2xl shadow-card hover:shadow-lg transition-shadow">
                <div className="w-10 h-10 rounded-lg bg-navy-deep text-gold flex items-center justify-center mb-3"><c.icon size={18} /></div>
                <div className="font-display font-bold text-navy-deep">{c.t}</div>
                <div className="text-sm text-muted-foreground">{c.d}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* VISION & MISSION SECTION */}
      <section className="bg-gradient-to-r from-navy-deep to-royal text-white py-16 mt-12 relative overflow-hidden">
        <div className="orb bg-gold w-[300px] h-[300px] -bottom-20 -right-20 opacity-20" />
        <div className="container mx-auto px-5 lg:px-8 relative grid lg:grid-cols-2 gap-12">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="flex items-center gap-3 mb-4">
              <Target className="text-gold" size={28} />
              <h3 className="text-3xl font-display font-bold">Vision</h3>
            </div>
            <p className="text-white/90 text-lg leading-relaxed">
              A Tindivanam where <strong>every citizen</strong> has access to quality education, healthcare, and economic opportunity. A society free from discrimination, where <strong>social justice</strong> is not a slogan but a lived reality.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
            <div className="flex items-center gap-3 mb-4">
              <Heart className="text-gold" size={28} />
              <h3 className="text-3xl font-display font-bold">Mission</h3>
            </div>
            <p className="text-white/90 text-lg leading-relaxed">
              To serve as an effective bridge between government and citizens. To implement transparent, data-driven public policies. To empower marginalized communities through direct participation in governance and development.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ACHIEVEMENTS TIMELINE */}
      <section className="py-20 relative">
        <div className="container mx-auto px-5 lg:px-8">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-display font-black text-navy-deep mb-4">
              Key <span className="text-gold">Achievements</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">A proven track record of delivering tangible results and transformative public works.</p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { year: "2022-2024", title: "Education Infrastructure Expansion", desc: "Upgraded 24 government schools with modern facilities, computer labs, and libraries. Benefited 8,000+ students." },
              { year: "2022-2024", title: "Healthcare Access Initiative", desc: "Established 12 health centers in underserved villages. Conducted 150+ health camps serving 15,000+ citizens." },
              { year: "2021-2023", title: "Rural Infrastructure Development", desc: "Constructed 45 km of new roads, repaired 120 km of existing roads, and installed water systems in 18 villages." },
              { year: "2020-2022", title: "Social Welfare Programs", desc: "Distributed educational scholarships to 5,000+ students. Supported 2,000+ families through livelihood programs." },
              { year: "2019-2021", title: "Environmental Initiatives", desc: "Planted 100,000+ trees, developed 8 community parks, and implemented waste management systems in 25 villages." },
              { year: "2018-2020", title: "Agricultural Support", desc: "Conducted 200+ farmer training sessions. Facilitated direct market access for 3,000+ farmers." },
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                className="glass-light rounded-2xl p-6 shadow-card hover:shadow-lg hover:-translate-y-1 transition-all border-l-4 border-gold/40 hover:border-gold">
                <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-gold/20 to-gold/5 border-2 border-gold/30 mb-4">
                  <BarChart3 className="text-gold" size={24} />
                </div>
                <div className="text-gold font-bold text-xs uppercase tracking-wider mb-1">{item.year}</div>
                <h4 className="text-lg font-display font-bold text-navy-deep mb-2">{item.title}</h4>
                <p className="text-muted-foreground text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FOCUS AREAS */}
      <section className="py-20 bg-navy-deep/5">
        <div className="container mx-auto px-5 lg:px-8">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-display font-black text-navy-deep mb-4">
              Focus <span className="text-gold">Areas</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Priority sectors driving sustainable development and citizen welfare.</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: BookOpen, title: "Education", desc: "Quality education access for all. School infrastructure, scholarships, and skill development." },
              { icon: Heart, title: "Healthcare", desc: "Accessible medical services. Health camps, disease prevention, and maternal care support." },
              { icon: Leaf, title: "Environment", desc: "Sustainable development. Tree planting, water conservation, and clean energy initiatives." },
              { icon: Building2, title: "Infrastructure", desc: "Roads, water systems, electricity, and public facilities that connect communities." },
              { icon: Globe, title: "Social Welfare", desc: "Support for vulnerable groups. Housing, livelihood, and targeted social security schemes." },
              { icon: Zap, title: "Economic Growth", desc: "Farmer support, small business development, and employment generation programs." },
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                className="glass-light p-8 rounded-2xl text-center hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gold/20 to-gold/5 flex items-center justify-center mx-auto mb-4 border-2 border-gold/20">
                  <item.icon className="text-gold" size={32} />
                </div>
                <h4 className="font-display font-bold text-navy-deep mb-2">{item.title}</h4>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* POLITICAL BACKGROUND */}
      <section className="py-20">
        <div className="container mx-auto px-5 lg:px-8">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-display font-black text-navy-deep mb-4">
              Political <span className="text-gold">Journey</span>
            </h2>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-8">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-white p-8 rounded-2xl shadow-card border-l-4 border-gold">
              <h4 className="text-gold font-bold uppercase tracking-wider text-sm mb-2">Party Affiliation</h4>
              <p className="text-navy-deep text-lg font-display font-bold mb-2">Viduthalai Chiruthaigal Katchi (VCK)</p>
              <p className="text-muted-foreground">Senior member of VCK, a Tamil Nadu-based Dravidian party committed to social justice, equality, and the emancipation of marginalized communities. The party follows the ideals of Periyarism and Ambedkarism.</p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="bg-white p-8 rounded-2xl shadow-card border-l-4 border-gold">
              <h4 className="text-gold font-bold uppercase tracking-wider text-sm mb-2">Grassroots Organizing</h4>
              <p className="text-navy-deep text-lg font-display font-bold mb-2">20+ Years of Community Leadership</p>
              <p className="text-muted-foreground">Before entering electoral politics, Vanni Arasu spent two decades organizing at the grassroots level — running community programs, advocating for workers' rights, fighting land displacement, and building social movements. This foundation remains central to his approach to governance.</p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="bg-white p-8 rounded-2xl shadow-card border-l-4 border-gold">
              <h4 className="text-gold font-bold uppercase tracking-wider text-sm mb-2">Electoral Success</h4>
              <p className="text-navy-deep text-lg font-display font-bold mb-2">Elected MLA, Tindivanam Constituency</p>
              <p className="text-muted-foreground">Elected as MLA in recent elections with strong community backing. Represents not just a political party, but a movement for social justice and democratic accountability. Uses this platform to amplify constituent voices and deliver transparent, measurable results.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* PHILOSOPHY */}
      <section className="py-20 bg-hero text-white relative overflow-hidden">
        <div className="orb bg-cyan-hi w-[400px] h-[400px] -bottom-32 -left-32 opacity-20" />
        <div className="container mx-auto px-5 lg:px-8 relative">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-display font-black mb-4">
              Political <span className="text-gradient-gold">Philosophy</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-display font-black text-gold mb-4">Equality</div>
              <p className="text-white/80">Every citizen deserves equal dignity and opportunity, regardless of caste, religion, or economic status.</p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-center">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-display font-black text-gold mb-4">Transparency</div>
              <p className="text-white/80">Government must be accountable to citizens. All decisions and implementations must be visible and traceable.</p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="text-center">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-display font-black text-gold mb-4">Participation</div>
              <p className="text-white/80">Citizens are not passive subjects. They must actively shape the policies and programs that affect their lives.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CONNECT SECTION */}
      <section className="py-20">
        <div className="container mx-auto px-5 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <h2 className="text-3xl lg:text-4xl font-display font-black text-navy-deep mb-6">
              Let Your <span className="text-gold">Voice</span> Be Heard
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
              This petition platform is your direct line to your elected representative. Whether it's a community concern, public work needed, or social issue — submit your petition and see real action.
            </p>
            <a href="/submit-petition" className="inline-block btn-primary-gold px-10 py-4 rounded-2xl text-base font-semibold hover:shadow-glow-gold transition-all">
              Submit Your Petition
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
