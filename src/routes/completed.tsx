import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { fetchPetitions } from "@/lib/petitions";
import { motion } from "framer-motion";
import { CheckCircle2, MapPin, Calendar } from "lucide-react";

export const Route = createFileRoute("/completed")({
  head: () => ({ meta: [{ title: "Completed Works — Vanni Arasu MLA" }] }),
  component: CompletedPage,
});

function CompletedPage() {
  const { data: items = [] } = useQuery({ queryKey: ["petitions", "resolved"], queryFn: () => fetchPetitions({ status: "Resolved" }) });

  return (
    <div className="pt-28 pb-20">
      <section className="bg-hero text-white py-16 -mt-28 pt-40 mb-12 relative overflow-hidden">
        <div className="orb bg-gold w-[400px] h-[400px] top-0 right-10 opacity-30" />
        <div className="container mx-auto px-5 lg:px-8 relative">
          <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="font-display font-black text-4xl lg:text-6xl">
            Completed <span className="text-gradient-gold">Works</span>
          </motion.h1>
          <p className="text-white/80 mt-3">Promises delivered. Open for public verification.</p>
        </div>
      </section>
      <div className="container mx-auto px-5 lg:px-8">
        {items.length === 0 ? (
          <div className="text-center py-20 glass-light rounded-2xl max-w-xl mx-auto">
            <p className="text-muted-foreground">No completed works to display yet.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            {items.map((p, i) => (
              <motion.article key={p.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                className="bg-card rounded-3xl overflow-hidden shadow-card hover:shadow-soft transition-all group">
                <div className="grid sm:grid-cols-2 gap-0">
                  {p.image_url && (
                    <div className="aspect-square overflow-hidden bg-muted">
                      <div className="text-xs uppercase tracking-wider text-white bg-red-500/80 absolute m-3 px-2 py-1 rounded">Before</div>
                      <img src={p.image_url} alt="before" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    </div>
                  )}
                  {p.resolved_image && (
                    <div className="aspect-square overflow-hidden bg-muted relative">
                      <div className="text-xs uppercase tracking-wider text-white bg-emerald-500/80 absolute m-3 px-2 py-1 rounded">After</div>
                      <img src={p.resolved_image} alt="after" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 text-emerald-600 text-xs font-bold mb-2"><CheckCircle2 size={14} /> RESOLVED</div>
                  <h3 className="font-display font-bold text-xl text-[--navy-deep] mb-2">{p.category}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{p.description}</p>
                  {p.resolution_note && (
                    <div className="bg-[--gold]/10 border-l-4 border-gold rounded-r-lg p-3 text-sm text-[--navy-deep] mb-3">
                      <strong>Resolution: </strong>{p.resolution_note}
                    </div>
                  )}
                  <div className="flex items-center justify-between text-xs text-muted-foreground border-t pt-3">
                    <span className="inline-flex items-center gap-1"><MapPin size={12} /> {p.area}</span>
                    {p.resolved_at && <span className="inline-flex items-center gap-1"><Calendar size={12} /> {new Date(p.resolved_at).toLocaleDateString("en-IN")}</span>}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
