import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { useLayoutEffect, useRef, useState } from "react";
import { ArrowRight, FileSignature, Facebook, Twitter, Instagram, Youtube,
  Users, CheckCircle2, Clock, MapPin, Briefcase, FileText, Sparkles, Quote, Target, Heart, Trophy, Send, MessageCircle, Zap, TrendingUp } from "lucide-react";
import portrait from "@/assets/vanni-arasu.png";
import { Counter } from "@/components/Counter";
import { PetitionCard } from "@/components/PetitionCard";
import { fetchPetitions, fetchStats } from "@/lib/petitions";
import { useScrollProgress } from "@/hooks/use-scroll-progress";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Vanni Arasu MLA — Tindivanam | Voice of the People" },
      { name: "description", content: "Official website of Vanni Arasu, MLA Tindivanam, VCK. Submit petitions, view ongoing works and resolved cases." },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const { data: petitions = [] } = useQuery({ queryKey: ["petitions", "latest"], queryFn: () => fetchPetitions({ limit: 6 }) });
  const { data: stats } = useQuery({ queryKey: ["stats"], queryFn: fetchStats });

  return (
    <>
      <Hero />
      <About />
      <Stats stats={stats} />
      <KeyAchievements />
      <HowItWorks />
      <LatestPetitions petitions={petitions} />
      <CompletedShowcase petitions={petitions.filter(p => (p.status ?? "").toLowerCase() === "resolved").slice(0, 3)} />
      <Testimonials />
      <LatestUpdates />
      <Contact />
    </>
  );
}

function Hero() {
  return (
    <section className="relative min-h-screen bg-hero overflow-hidden pt-24 lg:pt-20">
      {/* Floating orbs */}
      <div className="orb bg-cyan-hi w-[500px] h-[500px] top-10 -left-40 animate-float-slow" />
      <div className="orb bg-gold w-[400px] h-[400px] bottom-10 right-0 animate-float-slow" style={{ animationDelay: "2s" }} />
      <div className="orb bg-royal w-[600px] h-[600px] top-1/2 left-1/3 opacity-30" />

      {/* Grid lines */}
      <div className="absolute inset-0 opacity-[0.05]" style={{
        backgroundImage: "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
        backgroundSize: "60px 60px"
      }} />

      <div className="container mx-auto px-5 lg:px-8 relative z-10 grid lg:grid-cols-12 gap-8 items-center min-h-[calc(100vh-5rem)] py-12">
        {/* LEFT */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-5 text-white order-2 lg:order-1"
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs font-medium tracking-wider uppercase mb-6"
          >
            <Sparkles size={14} className="text-gold" />
            Viduthalai Chiruthaigal Katchi
          </motion.div>

          <h1 className="font-display font-black text-5xl md:text-6xl lg:text-7xl leading-[0.95] mb-4">
            Vanni <span className="text-gradient-gold">Arasu</span>
          </h1>
          <div className="flex items-center gap-2 text-gold/90 text-sm uppercase tracking-[0.2em] mb-6 font-semibold">
            <span className="h-px w-8 bg-gold" /> MLA • Tindivanam
          </div>

          <p className="text-white/80 text-base lg:text-lg leading-relaxed max-w-xl mb-6">
            Tamil Nadu politician, social justice activist, and grassroots leader serving the people of Tindivanam constituency with dedication and transparency.
          </p>

          <blockquote className="border-l-2 border-gold pl-4 mb-8">
            <p className="font-display italic text-xl lg:text-2xl text-white">
              "Voice of the People,<br /><span className="text-gradient-gold">Strength of Tindivanam.</span>"
            </p>
          </blockquote>

          <div className="flex gap-3">
            {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
              <a key={i} href="#" className="w-11 h-11 rounded-full glass flex items-center justify-center hover:bg-gold hover:text-navy-deep transition-all">
                <Icon size={16} />
              </a>
            ))}
          </div>
        </motion.div>

        {/* CENTER PORTRAIT */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="lg:col-span-4 relative order-1 lg:order-2"
        >
          <div className="relative aspect-[3/4] max-w-md mx-auto">
            {/* Spotlight */}
            <div className="absolute inset-0 bg-cyan-hi/30 blur-[100px] scale-110 -z-10" />
            <div className="absolute -inset-6 rounded-full bg-gradient-to-tr from-gold/40 to-transparent blur-3xl -z-10" />

            {/* Decorative ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-4 rounded-3xl border-2 border-dashed border-gold/30"
            />

            <div className="relative h-full rounded-3xl overflow-hidden border-4 border-gold/40 shadow-glow-gold bg-gradient-to-b from-royal/40 to-navy-deep/40">
              <img src={portrait} alt="Vanni Arasu MLA Tindivanam" className="w-full h-full object-cover object-top" />
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-navy-deep to-transparent" />
              <div className="absolute bottom-4 inset-x-4 glass rounded-xl p-3 text-white">
                <div className="text-[10px] uppercase tracking-widest text-gold font-bold">Constituency</div>
                <div className="font-display font-bold text-lg leading-tight">Tindivanam</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* RIGHT CTAs */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="lg:col-span-3 order-3 flex flex-col gap-4 lg:items-end"
        >
          <Link to="/submit-petition" className="group btn-primary-gold px-8 py-5 rounded-2xl flex items-center justify-center gap-2 text-base shadow-glow-gold w-full lg:w-auto animate-pulse-glow">
            <FileSignature size={18} />
            Submit Petition
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link to="/completed" className="btn-outline-gold px-8 py-5 rounded-2xl flex items-center justify-center gap-2 text-base w-full lg:w-auto">
            View Completed Works
            <ArrowRight size={16} />
          </Link>

          <div className="glass rounded-2xl p-4 text-white mt-4 w-full lg:w-64">
            <div className="text-xs text-gold uppercase tracking-widest font-bold mb-1">24/7 Helpline</div>
            <div className="font-display font-bold text-xl">+91 98000 00000</div>
          </div>
        </motion.div>
      </div>

      {/* curtain scroll indicator */}
      <div className="absolute bottom-6 inset-x-0 flex justify-center text-white/60 text-xs animate-bounce">
        Scroll ▼
      </div>
    </section>
  );
}

function SectionTitle({ kicker, title, subtitle }: { kicker: string; title: string; subtitle?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="max-w-2xl mx-auto text-center mb-12"
    >
      <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-gold/15 text-navy-deep text-xs font-bold uppercase tracking-widest mb-4">
        <span className="w-1.5 h-1.5 rounded-full bg-gold" /> {kicker}
      </div>
      <h2 className="font-display font-black text-4xl lg:text-5xl text-navy-deep leading-tight mb-3">{title}</h2>
      {subtitle && <p className="text-muted-foreground text-base lg:text-lg">{subtitle}</p>}
    </motion.div>
  );
}

function About() {
  const pillars = [
    { icon: Target, title: "Vision", text: "An equitable Tindivanam where every voice is heard, respected, and acted upon." },
    { icon: Heart, title: "Mission", text: "Grassroots activism, transparent governance, and sustained advocacy for rural communities." },
    { icon: Trophy, title: "Journey", text: "From street-level activism to the Legislative Assembly — a continuous fight for social justice under VCK." },
  ];
  return (
    <section id="about" className="py-24 lg:py-32 relative overflow-hidden">
      <div className="orb bg-cyan-hi/20 w-[600px] h-[600px] -top-40 -right-40" />
      <div className="container mx-auto px-5 lg:px-8 relative">
        <SectionTitle kicker="About the MLA" title="A Lifetime of Social Justice" subtitle="Built on conviction. Powered by the people. Accountable always." />
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {pillars.map((p, i) => (
            <motion.div key={p.title}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-light rounded-3xl p-8 shadow-card hover:shadow-soft transition-all hover:-translate-y-1"
            >
              <div className="w-14 h-14 rounded-2xl bg-gold flex items-center justify-center text-navy-deep mb-5 shadow-glow-gold">
                <p.icon size={24} />
              </div>
              <h3 className="font-display font-bold text-2xl text-navy-deep mb-2">{p.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{p.text}</p>
            </motion.div>
          ))}
        </div>

        {/* Timeline */}
        <div className="max-w-3xl mx-auto">
          <h3 className="font-display font-bold text-2xl text-center mb-10 text-navy-deep">Public Service Timeline</h3>
          <div className="relative border-l-2 border-gold/40 pl-8 space-y-8">
            {[
              { y: "Early Years", t: "Grassroots activism with youth movements in Villupuram district." },
              { y: "Joined VCK", t: "Aligned with Viduthalai Chiruthaigal Katchi to scale social-justice advocacy." },
              { y: "Constituency Leader", t: "Built a people-first political organization across Tindivanam villages." },
              { y: "Elected MLA", t: "Sworn in as MLA, Tindivanam — delivering on development & equity." },
            ].map((item, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative"
              >
                <div className="absolute -left-[42px] top-1 w-5 h-5 rounded-full bg-gold ring-4 ring-gold/20" />
                <div className="text-gold text-xs font-bold uppercase tracking-widest">{item.y}</div>
                <p className="text-navy-deep mt-1">{item.t}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Stats({ stats }: { stats?: Awaited<ReturnType<typeof fetchStats>> }) {
  const items = [
    { icon: FileText, label: "Total Petitions", value: stats?.total ?? 0 },
    { icon: CheckCircle2, label: "Resolved", value: stats?.resolved ?? 0 },
    { icon: Clock, label: "Ongoing", value: stats?.ongoing ?? 0 },
    { icon: Users, label: "People Helped", value: stats?.people ?? 0 },
    { icon: MapPin, label: "Villages Served", value: stats?.villages ?? 0 },
    { icon: Briefcase, label: "Projects Completed", value: stats?.resolved ?? 0 },
  ];
  return (
    <section className="py-24 bg-hero text-white relative overflow-hidden">
      <div className="orb bg-gold w-[400px] h-[400px] -top-20 left-1/4 opacity-20" />
      <div className="container mx-auto px-5 lg:px-8 relative">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full glass text-xs font-bold uppercase tracking-widest mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-gold" /> Impact in Numbers
          </div>
          <h2 className="font-display font-black text-4xl lg:text-5xl mb-3">Transparency, Measured.</h2>
          <p className="text-white/70">Every petition. Every village. Every commitment delivered.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {items.map((it, i) => (
            <motion.div key={it.label}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className="glass rounded-2xl p-5 text-center hover:shadow-glow-gold transition-all"
            >
              <div className="w-12 h-12 mx-auto rounded-xl bg-gold/20 flex items-center justify-center text-gold mb-3">
                <it.icon size={20} />
              </div>
              <div className="font-display font-black text-3xl text-gradient-gold mb-1">
                <Counter value={it.value} />+
              </div>
              <div className="text-xs uppercase tracking-wider text-white/70 font-medium">{it.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function LatestPetitions({ petitions }: { petitions: any[] }) {
  return (
    <section className="py-24 lg:py-32">
      <div className="container mx-auto px-5 lg:px-8">
        <SectionTitle kicker="Latest Petitions" title="Voices from the Ground" subtitle="Real petitions from the people of Tindivanam — tracked in public view." />
        {petitions.length === 0 ? (
          <div className="text-center py-12 glass-light rounded-2xl max-w-xl mx-auto">
            <Quote className="mx-auto text-gold mb-3" />
            <p className="text-muted-foreground">No petitions yet. Be the first to raise your voice.</p>
            <Link to="/submit-petition" className="inline-block mt-4 btn-primary-gold px-5 py-2.5 rounded-full text-sm">Submit a Petition</Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {petitions.map((p, i) => <PetitionCard key={p.id} petition={p} index={i} />)}
          </div>
        )}
        <div className="text-center mt-10">
          <Link to="/ongoing" className="inline-flex items-center gap-2 text-navy-deep font-semibold hover:text-royal">
            View all ongoing works <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}

function CompletedShowcase({ petitions }: { petitions: any[] }) {
  return (
    <section className="py-24 lg:py-32 bg-navy-deep text-white relative overflow-hidden">
      <div className="orb bg-royal w-[500px] h-[500px] top-0 right-0 opacity-40" />
      <div className="container mx-auto px-5 lg:px-8 relative">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full glass text-xs font-bold uppercase tracking-widest mb-4">
            <CheckCircle2 size={14} className="text-gold" /> Completed Works
          </div>
          <h2 className="font-display font-black text-4xl lg:text-5xl mb-3">Promises. <span className="text-gradient-gold">Delivered.</span></h2>
        </div>
        {petitions.length === 0 ? (
          <div className="glass rounded-2xl p-10 text-center max-w-xl mx-auto">
            <p className="text-white/70">Completed works will appear here as petitions are resolved.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {petitions.map((p, i) => (
              <motion.div key={p.id}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="glass rounded-2xl overflow-hidden group"
              >
                {p.resolved_image && (
                  <div className="aspect-video overflow-hidden">
                    <img src={p.resolved_image} alt={p.category} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  </div>
                )}
                <div className="p-5">
                  <div className="flex items-center gap-2 text-gold text-xs font-bold mb-2"><CheckCircle2 size={14} /> RESOLVED</div>
                  <h3 className="font-display font-bold text-lg mb-2">{p.category}</h3>
                  <p className="text-white/70 text-sm line-clamp-2 mb-3">{p.resolution_note || p.description}</p>
                  <div className="text-xs text-white/50">{p.area} • {p.resolved_at && new Date(p.resolved_at).toLocaleDateString("en-IN")}</div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
        <div className="text-center mt-10">
          <Link to="/completed" className="btn-outline-gold inline-flex items-center gap-2 px-6 py-3 rounded-full">
            View all completed works <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}

// KEY ACHIEVEMENTS SECTION
function KeyAchievements() {
  const achievements = [
    {
      period: "2022-2024",
      title: "School Infrastructure Projects",
      items: [
        "50 new computer systems installed",
        "School building renovation completed",
        "200+ students benefited"
      ]
    },
    {
      period: "2023-2025",
      title: "Water & Sanitation Program",
      items: [
        "24/7 water supply to 5 villages",
        "500+ household water connections",
        "Health awareness camps conducted"
      ]
    },
    {
      period: "2024-2026",
      title: "Road Development Initiative",
      items: [
        "25 km road networks constructed",
        "3 major highway connections improved",
        "Emergency services accessibility enhanced"
      ]
    },
    {
      period: "2024-2026",
      title: "Healthcare & Welfare",
      items: [
        "250 students received scholarships",
        "Health camps serving 1000+ citizens",
        "Free medical camps in 10 villages"
      ]
    },
  ];

  return (
    <section className="py-24 lg:py-32 bg-white relative overflow-hidden">
      <div className="orb bg-royal/10 w-[400px] h-[400px] -top-40 -left-40" />
      <div className="orb bg-gold/10 w-[300px] h-[300px] -bottom-20 -right-20" />
      <div className="container mx-auto px-5 lg:px-8 relative">
        <SectionTitle kicker="Track Record" title="Key Achievements" subtitle="A proven track record of delivering tangible results and transformative public works." />
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {achievements.map((achievement, i) => (
            <motion.div
              key={achievement.period}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-light rounded-2xl p-6 shadow-card hover:shadow-lg hover:-translate-y-1 transition-all border-l-4 border-gold/40 hover:border-gold"
            >
              <div className="text-xs font-bold uppercase tracking-widest text-gold bg-gold/10 px-3 py-1 rounded-full inline-block mb-4">
                {achievement.period}
              </div>
              <h3 className="font-display font-bold text-lg text-navy-deep mb-4">{achievement.title}</h3>
              <ul className="space-y-3">
                {achievement.items.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle2 size={16} className="text-gold flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-navy-deep/80">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// HOW IT WORKS SECTION
function HowItWorks() {
  const { progress, ref } = useScrollProgress();
  const pathRef = useRef<SVGPathElement>(null);
  const [pathLength, setPathLength] = useState(0);
  const [glowPoint, setGlowPoint] = useState({ x: 0, y: 40 });

  const steps = [
    { 
      icon: Send, 
      title: "Submit Petition", 
      desc: "Fill out the form with your issue, location, and supporting details." 
    },
    { 
      icon: MessageCircle, 
      title: "Get Tracked", 
      desc: "Receive a unique ID. Watch your petition's progress in real-time." 
    },
    { 
      icon: CheckCircle2, 
      title: "See Action", 
      desc: "Government responds, assigns work, and publishes updates publicly." 
    },
    { 
      icon: TrendingUp, 
      title: "Celebrate Results", 
      desc: "When complete, your petition becomes a success story others can learn from." 
    },
  ];

  // Points the curvy connector passes through — one per step, gently waving up and down.
  const curvePoints = steps.map((_, i) => {
    const t = i / (steps.length - 1);
    const x = t * 1000;
    const y = 40 + 24 * Math.sin(t * Math.PI * 2);
    return { x, y };
  });

  // Smooth S-curve through the points using horizontal-tangent bezier segments.
  const curveD = curvePoints.reduce((d, p, i) => {
    if (i === 0) return `M ${p.x},${p.y}`;
    const prev = curvePoints[i - 1];
    const midX = (prev.x + p.x) / 2;
    return `${d} C ${midX},${prev.y} ${midX},${p.y} ${p.x},${p.y}`;
  }, "");

  useLayoutEffect(() => {
    if (pathRef.current) setPathLength(pathRef.current.getTotalLength());
  }, [curveD]);

  useLayoutEffect(() => {
    if (pathRef.current && pathLength) {
      const point = pathRef.current.getPointAtLength(progress * pathLength);
      setGlowPoint({ x: point.x, y: point.y });
    }
  }, [progress, pathLength]);

  return (
    <section ref={ref} className="py-24 lg:py-32 bg-white relative overflow-hidden">
      <div className="orb bg-royal/10 w-[400px] h-[400px] -bottom-40 -left-40" />
      <div className="container mx-auto px-5 lg:px-8 relative">
        <SectionTitle kicker="The Process" title="How Your Voice Gets Heard" subtitle="Transparency at every step — from petition to resolution." />

        {/* Desktop animated curvy connector line SVG */}
        <div className="hidden md:flex justify-center mb-8">
          <svg className="w-full max-w-4xl h-20" viewBox="0 0 1000 80" preserveAspectRatio="none">
            {/* Background curve */}
            <path d={curveD} fill="none" stroke="#d4af37" strokeWidth="2" opacity="0.15" vectorEffect="non-scaling-stroke" />

            <defs>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#d4af37" stopOpacity="0.3" />
                <stop offset="50%" stopColor="#d4af37" stopOpacity="1" />
                <stop offset="100%" stopColor="#d4af37" stopOpacity="0.3" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>

            {/* Curvy line that draws itself forward as the user scrolls */}
            <path
              ref={pathRef}
              d={curveD}
              fill="none"
              stroke="url(#lineGradient)"
              strokeWidth="3"
              strokeLinecap="round"
              filter="url(#glow)"
              vectorEffect="non-scaling-stroke"
              strokeDasharray={pathLength || 1}
              strokeDashoffset={pathLength * (1 - progress)}
              style={{ transition: 'stroke-dashoffset 0.1s ease-out' }}
            />

            {/* Glow circle traveling along the curve */}
            {progress > 0 && (
              <circle
                cx={glowPoint.x}
                cy={glowPoint.y}
                r="6"
                fill="#d4af37"
                opacity={Math.min(1, progress * 1.5)}
                filter="url(#glow)"
              />
            )}

            {/* Step markers */}
            {steps.map((_, i) => {
              const isReached = progress >= (i / (steps.length - 1));
              return (
                <g key={i}>
                  <circle
                    cx={curvePoints[i].x}
                    cy={curvePoints[i].y}
                    r="5"
                    fill={isReached ? "#d4af37" : "#fff"}
                    stroke="#d4af37"
                    strokeWidth="2"
                  />
                </g>
              );
            })}
          </svg>
        </div>

        <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative"
            >
              <div className="glass-light rounded-2xl p-8 text-center h-full hover:shadow-lg transition-all">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gold to-gold/70 flex items-center justify-center text-white mx-auto mb-5 shadow-glow-gold">
                  <step.icon size={28} />
                </div>
                <h3 className="font-display font-bold text-xl text-navy-deep mb-3">
                  {i + 1}. {step.title}
                </h3>
                <p className="text-muted-foreground text-sm">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// TESTIMONIALS SECTION
function Testimonials() {
  const testimonials = [
    {
      name: "Lakshmi S.",
      role: "Teacher, Tindivanam",
      quote: "I submitted a petition about poor condition of our school building. Within 2 weeks, MLA visited personally. Construction started last month. Real change!",
      avatar: "👩‍🏫"
    },
    {
      name: "Rajesh Kumar",
      role: "Farmer, Kannapuram Village",
      quote: "Never thought we'd see clean water in our village. The petition system made our voices count. Now we have access to water 24/7. Grateful.",
      avatar: "👨‍🌾"
    },
    {
      name: "Priya Devi",
      role: "ASHA Worker, Kadambur",
      quote: "The transparency in tracking petitions is incredible. We can see when roads will be repaired. No empty promises. This is real democracy.",
      avatar: "👩‍⚕️"
    },
    {
      name: "Arjun M.",
      role: "Student, Tindivanam College",
      quote: "Our petition for computer lab resulted in 50 new systems. The platform gave us hope that our generation's voice matters politically.",
      avatar: "👨‍🎓"
    },
  ];

  return (
    <section className="py-24 lg:py-32 bg-navy-deep/5">
      <div className="container mx-auto px-5 lg:px-8">
        <SectionTitle kicker="From Our People" title="Real Stories of Change" subtitle="Hear directly from constituents whose petitions became action." />
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass rounded-2xl p-6 shadow-card hover:shadow-lg transition-all"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="text-4xl">{testimonial.avatar}</div>
                <div>
                  <div className="font-display font-bold text-navy-deep">{testimonial.name}</div>
                  <div className="text-xs text-muted-foreground">{testimonial.role}</div>
                </div>
              </div>
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-gold text-lg">★</span>
                ))}
              </div>
              <p className="text-sm text-navy-deep leading-relaxed italic">"{testimonial.quote}"</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// LATEST UPDATES SECTION
function LatestUpdates() {
  const updates = [
    {
      date: "12 Jun 2024",
      category: "Health",
      title: "Health Camp Conducted in Kadambur Village",
      desc: "Free health check-up camp attended by 500+ citizens. Blood pressure monitoring, diabetes screening, and awareness programs."
    },
    {
      date: "08 Jun 2024",
      category: "Infrastructure",
      title: "Road Repair Project Completion - Kannapuram Route",
      desc: "5 km road reconstruction completed ahead of schedule. Residents report smoother commute and improved safety."
    },
    {
      date: "05 Jun 2024",
      category: "Education",
      title: "Government School Gets Computer Lab",
      desc: "50 new computers installed at Tindivanam Govt School. ICT training for 40 teachers completed. 400+ students benefit."
    },
    {
      date: "01 Jun 2024",
      category: "Social",
      title: "Scholarship Distribution Ceremony",
      desc: "250 students received educational scholarships from the MLA office. Total allocation: ₹25 Lakhs for merit-based support."
    },
  ];

  return (
    <section className="py-24 lg:py-32">
      <div className="container mx-auto px-5 lg:px-8">
        <SectionTitle kicker="Latest News" title="What's Happening" subtitle="Recent updates from the MLA office and constituent activities." />
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {updates.map((update, i) => (
            <motion.div
              key={update.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative"
            >
              <div className="glass-light rounded-2xl p-6 h-full transition-all hover:shadow-lg border-l-4 border-gold/20 group-hover:border-gold/60">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold uppercase tracking-widest text-gold bg-gold/10 px-3 py-1 rounded-full">
                    {update.category}
                  </span>
                  <span className="text-xs text-muted-foreground">{update.date}</span>
                </div>
                <h3 className="font-display font-bold text-lg text-navy-deep mb-2 group-hover:text-gold transition-colors">
                  {update.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{update.desc}</p>
                <div className="mt-4 pt-4 border-t border-border">
                  <a href="#" className="text-xs font-semibold text-gold hover:text-gold/70 inline-flex items-center gap-1">
                    Read more <ArrowRight size={12} />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link to="/contact" className="btn-primary-gold inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-semibold">
            View All Updates & Subscribe <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}

// CONTACT SECTION
function Contact() {
  return (
    <section className="py-24 lg:py-32">
      <div className="container mx-auto px-5 lg:px-8">
        <SectionTitle kicker="Contact" title="Reach the MLA Office" subtitle="We're here every working day. Your voice matters." />
        <div className="grid lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
          <div className="glass-light rounded-3xl p-8 shadow-card space-y-5">
            {[
              { l: "Office Address", v: "MLA Office, Tindivanam, Villupuram District, Tamil Nadu — 604001", icon: MapPin },
              { l: "Phone", v: "+91 98000 00000", icon: Clock },
              { l: "Email", v: "contact@vanniarasu.in", icon: FileText },
              { l: "Office Hours", v: "Mon–Sat • 10:00 AM – 6:00 PM (Sunday: Closed)", icon: Clock },
            ].map((c) => (
              <div key={c.l} className="border-b border-border last:border-0 pb-4 last:pb-0 flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-lg bg-gold/20 flex items-center justify-center text-gold">
                    <c.icon size={20} />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="text-xs uppercase tracking-widest text-royal font-bold mb-1">{c.l}</div>
                  <div className="text-navy-deep font-medium">{c.v}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="rounded-3xl overflow-hidden shadow-soft min-h-[300px]">
            <iframe
              title="MLA Office Tindivanam"
              src="https://www.google.com/maps?q=Tindivanam,Tamil+Nadu&output=embed"
              className="w-full h-full min-h-[300px] border-0"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
