import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { fetchPetitions } from "@/lib/petitions";
import { PetitionCard } from "@/components/PetitionCard";
import { motion } from "framer-motion";

export const Route = createFileRoute("/ongoing")({
  head: () => ({ meta: [{ title: "Ongoing Works — Vanni Arasu MLA" }] }),
  component: OngoingPage,
});

function OngoingPage() {
  const { data: ongoing = [] } = useQuery({ queryKey: ["petitions", "ongoing"], queryFn: () => fetchPetitions({ status: "Ongoing" }) });
  const { data: pending = [] } = useQuery({ queryKey: ["petitions", "pending"], queryFn: () => fetchPetitions({ status: "Pending" }) });
  const all = [...ongoing, ...pending];

  return (
    <div className="pt-28 pb-20">
      <section className="bg-hero text-white py-16 -mt-28 pt-40 mb-12 relative overflow-hidden">
        <div className="orb bg-cyan-hi w-[400px] h-[400px] top-10 -right-20 opacity-40" />
        <div className="container mx-auto px-5 lg:px-8 relative">
          <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="font-display font-black text-4xl lg:text-6xl">
            Ongoing <span className="text-gradient-gold">Works</span>
          </motion.h1>
          <p className="text-white/80 mt-3">Petitions currently in active progress.</p>
        </div>
      </section>
      <div className="container mx-auto px-5 lg:px-8">
        {all.length === 0 ? (
          <div className="text-center py-20 glass-light rounded-2xl max-w-xl mx-auto">
            <p className="text-muted-foreground">No ongoing petitions right now.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {all.map((p, i) => <PetitionCard key={p.id} petition={p} index={i} />)}
          </div>
        )}
      </div>
    </div>
  );
}
