import { motion } from "framer-motion";
import { MapPin, Calendar, AlertCircle, Clock, CheckCircle2 } from "lucide-react";
import type { Petition } from "@/lib/petitions";
import { normalizeStatus } from "@/lib/petitions";

const statusMap = {
  Pending: { label: "Pending", icon: AlertCircle, cls: "bg-amber-100 text-amber-800 border-amber-300" },
  Ongoing: { label: "Ongoing", icon: Clock, cls: "bg-blue-100 text-blue-800 border-blue-300" },
  Resolved: { label: "Resolved", icon: CheckCircle2, cls: "bg-emerald-100 text-emerald-800 border-emerald-300" },
} as const;

const defaultStatus = statusMap.Pending;

export function PetitionCard({ petition, index = 0 }: { petition: Petition; index?: number }) {
  const s = statusMap[normalizeStatus(petition.status) ?? "Pending"] ?? defaultStatus;
  const Icon = s.icon;
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="group glass-light rounded-2xl p-6 shadow-card hover:shadow-soft hover:-translate-y-1 transition-all duration-300"
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <h3 className="font-display font-bold text-lg leading-tight text-[--navy-deep] line-clamp-2">{petition.category}</h3>
        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-semibold border ${s.cls}`}>
          <Icon size={12} /> {s.label}
        </span>
      </div>
      <p className="text-sm text-muted-foreground line-clamp-3 mb-4">{petition.description}</p>
      <div className="flex items-center justify-between text-xs text-muted-foreground border-t pt-3">
        <span className="inline-flex items-center gap-1"><MapPin size={12} /> {petition.area}</span>
        <span className="inline-flex items-center gap-1"><Calendar size={12} /> {petition.created_at ? new Date(petition.created_at).toLocaleDateString("en-IN") : "—"}</span>
      </div>
    </motion.article>
  );
}
