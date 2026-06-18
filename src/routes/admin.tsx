import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchPetitions, fetchStats, normalizeStatus, type Petition, type PetitionStatus } from "@/lib/petitions";
import { toast } from "sonner";
import { LogOut, Search, Trash2, CheckCircle2, Clock, AlertCircle, Loader2, Upload, ShieldCheck, FileText, Users, MapPin } from "lucide-react";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin Dashboard" }] }),
  component: AdminPage,
});

function AdminPage() {
  const nav = useNavigate();
  const [userId, setUserId] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [filter, setFilter] = useState<"all" | PetitionStatus>("all");
  const [search, setSearch] = useState("");
  const qc = useQueryClient();

  useEffect(() => {
    const init = async () => {
      const { data } = await supabase.auth.getUser();
      if (!data.user) { nav({ to: "/login" }); return; }
      setUserId(data.user.id);
      const { data: roleData, error: roleError } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", data.user.id)
        .eq("role", "admin")
        .maybeSingle();
      if (roleError) {
        console.error(roleError);
        setIsAdmin(false);
        return;
      }
      setIsAdmin(!!roleData);
    };
    init();
  }, [nav]);

  const { data: petitions = [] } = useQuery({
    queryKey: ["admin", "petitions"], queryFn: () => fetchPetitions(), enabled: isAdmin === true,
  });
  const { data: stats } = useQuery({ queryKey: ["admin", "stats"], queryFn: fetchStats, enabled: isAdmin === true });

  const logout = async () => { await supabase.auth.signOut(); nav({ to: "/" }); };

  if (isAdmin === null) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin" /></div>;
  if (isAdmin === false) return (
    <div className="min-h-screen flex items-center justify-center px-5 text-center">
      <div>
        <ShieldCheck className="mx-auto text-gold mb-3" size={48} />
        <h2 className="font-display font-bold text-2xl mb-2">Access Denied</h2>
        <p className="text-muted-foreground mb-4">
          This account is not authorized. An administrator must add you in Supabase before you can sign in.
        </p>
        <button onClick={logout} className="btn-primary-gold px-5 py-2 rounded-full">Sign out</button>
      </div>
    </div>
  );

  const filtered = petitions.filter(p =>
    (filter === "all" || normalizeStatus(p.status) === filter) &&
    (search === "" || [p.name, p.area, p.category, p.description].join(" ").toLowerCase().includes(search.toLowerCase()))
  );

  const refresh = () => qc.invalidateQueries({ queryKey: ["admin"] });

  return (
    <div className="min-h-screen bg-muted">
      <header className="bg-navy-deep text-white sticky top-0 z-30 shadow-soft">
        <div className="container mx-auto px-5 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-gold flex items-center justify-center text-navy-deep font-black">VA</div>
            <div>
              <div className="font-display font-bold leading-tight">Admin Dashboard</div>
              <div className="text-[10px] text-gold uppercase tracking-widest">Vanni Arasu MLA</div>
            </div>
          </Link>
          <button onClick={logout} className="text-sm flex items-center gap-1.5 px-4 py-2 rounded-lg hover:bg-white/10">
            <LogOut size={14} /> Sign out
          </button>
        </div>
      </header>

      <div className="container mx-auto px-5 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { icon: FileText, label: "Total", value: stats?.total ?? 0, color: "bg-royal" },
            { icon: AlertCircle, label: "Pending", value: stats?.pending ?? 0, color: "bg-amber-500" },
            { icon: Clock, label: "Ongoing", value: stats?.ongoing ?? 0, color: "bg-blue-500" },
            { icon: CheckCircle2, label: "Resolved", value: stats?.resolved ?? 0, color: "bg-emerald-500" },
          ].map((s) => (
            <div key={s.label} className="bg-card rounded-2xl p-5 shadow-card">
              <div className={`w-10 h-10 rounded-xl ${s.color} text-white flex items-center justify-center mb-3`}><s.icon size={18} /></div>
              <div className="text-3xl font-display font-black text-navy-deep">{s.value}</div>
              <div className="text-xs text-muted-foreground uppercase tracking-wider">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="bg-card rounded-2xl p-4 shadow-card mb-6 flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by name, area, category..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-background focus:outline-none focus:border-gold" />
          </div>
          <div className="flex gap-1.5">
            {(["all", "Pending", "Ongoing", "Resolved"] as const).map(s => (
              <button key={s} onClick={() => setFilter(s)}
                className={`px-4 py-2 rounded-xl text-sm font-medium capitalize transition-all ${
                  filter === s ? "bg-navy-deep text-white" : "bg-muted hover:bg-border"
                }`}>{s}</button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          {filtered.length === 0 ? (
            <div className="bg-card rounded-2xl p-10 text-center text-muted-foreground">No petitions match your filter.</div>
          ) : filtered.map((p) => (
            <AdminPetitionRow key={p.id} petition={p} onChange={refresh} />
          ))}
        </div>
      </div>
    </div>
  );
}

function AdminPetitionRow({ petition, onChange }: { petition: Petition; onChange: () => void }) {
  const [open, setOpen] = useState(false);
  const [resolveOpen, setResolveOpen] = useState(false);
  const [note, setNote] = useState(petition.resolution_note || "");
  const [resolvedFile, setResolvedFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);

  const updateStatus = async (status: PetitionStatus) => {
    const { error } = await supabase.from("petitions").update({ status }).eq("id", petition.id);
    if (error) toast.error(error.message); else { toast.success(`Marked as ${status}`); onChange(); }
  };

  const remove = async () => {
    if (!confirm("Delete this petition? This cannot be undone.")) return;
    const { error } = await supabase.from("petitions").delete().eq("id", petition.id);
    if (error) toast.error(error.message); else { toast.success("Deleted"); onChange(); }
  };

  const resolve = async () => {
    setSaving(true);
    try {
      let resolved_image = petition.resolved_image;
      if (resolvedFile) {
        const ext = resolvedFile.name.split(".").pop();
        const path = `resolved-${Date.now()}.${ext}`;
        const { error: e1 } = await supabase.storage.from("petitions").upload(path, resolvedFile);
        if (e1) throw e1;
        resolved_image = supabase.storage.from("petitions").getPublicUrl(path).data.publicUrl;
      }
      const { error } = await supabase.from("petitions").update({
        status: "Resolved", resolution_note: note, resolved_image, resolved_at: new Date().toISOString(),
      }).eq("id", petition.id);
      if (error) throw error;
      toast.success("Marked as resolved");
      setResolveOpen(false); onChange();
    } catch (e: any) { toast.error(e.message); } finally { setSaving(false); }
  };

  const statusColors: Record<string, string> = {
    Pending: "bg-amber-100 text-amber-800",
    Ongoing: "bg-blue-100 text-blue-800",
    Resolved: "bg-emerald-100 text-emerald-800",
  };
  const statusKey = normalizeStatus(petition.status) ?? "Pending";

  return (
    <div className="bg-card rounded-2xl shadow-card overflow-hidden">
      <div className="p-5 flex flex-col md:flex-row md:items-center gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase ${statusColors[statusKey] ?? statusColors.Pending}`}>{statusKey}</span>
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">{petition.priority}</span>
            <span className="text-xs text-muted-foreground">{new Date(petition.created_at).toLocaleDateString("en-IN")}</span>
          </div>
          <div className="font-display font-bold text-navy-deep truncate">{petition.category}</div>
          <div className="text-xs text-muted-foreground flex flex-wrap gap-3 mt-0.5">
            <span className="inline-flex items-center gap-1"><Users size={11} />{petition.name} • {petition.phone}</span>
            <span className="inline-flex items-center gap-1"><MapPin size={11} />{petition.area}</span>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {statusKey !== "Ongoing" && statusKey !== "Resolved" && (
            <button onClick={() => updateStatus("Ongoing")} className="px-3 py-1.5 rounded-lg bg-blue-100 text-blue-800 text-xs font-bold hover:bg-blue-200">Mark Ongoing</button>
          )}
          {statusKey === "Ongoing" && (
            <button onClick={() => updateStatus("Pending")} className="px-3 py-1.5 rounded-lg bg-amber-100 text-amber-800 text-xs font-bold hover:bg-amber-200">Not Ongoing</button>
          )}
          {statusKey !== "Resolved" && (
            <button onClick={() => setResolveOpen(true)} className="px-3 py-1.5 rounded-lg bg-emerald-100 text-emerald-800 text-xs font-bold hover:bg-emerald-200">Resolve</button>
          )}
          <button onClick={() => setOpen(!open)} className="px-3 py-1.5 rounded-lg bg-muted text-xs font-bold">{open ? "Hide" : "Details"}</button>
          <button onClick={remove} className="p-1.5 rounded-lg bg-red-100 text-red-700 hover:bg-red-200"><Trash2 size={14} /></button>
        </div>
      </div>

      {open && (
        <div className="px-5 pb-5 border-t border-border pt-4 text-sm">
          <p className="text-muted-foreground mb-2"><strong className="text-navy-deep">Description:</strong> {petition.description}</p>
          {petition.address && <p className="text-muted-foreground"><strong className="text-navy-deep">Address:</strong> {petition.address}</p>}
          {petition.image_url && <img src={petition.image_url} alt="" className="mt-3 rounded-lg max-h-64" />}
        </div>
      )}

      {resolveOpen && (
        <div className="px-5 pb-5 border-t border-border pt-4 space-y-3">
          <textarea value={note} onChange={(e) => setNote(e.target.value)} rows={3}
            placeholder="Resolution note (what was done)..." className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm" />
          <label className="flex items-center gap-3 border-2 border-dashed border-border rounded-lg p-3 cursor-pointer hover:border-gold">
            <Upload size={16} className="text-royal" />
            <span className="text-sm text-muted-foreground">{resolvedFile?.name || "Upload completion image"}</span>
            <input type="file" accept="image/*" className="hidden" onChange={(e) => setResolvedFile(e.target.files?.[0] || null)} />
          </label>
          <div className="flex gap-2">
            <button onClick={resolve} disabled={saving} className="btn-primary-gold px-4 py-2 rounded-lg text-sm flex items-center gap-2">
              {saving && <Loader2 className="animate-spin" size={14} />} Confirm Resolution
            </button>
            <button onClick={() => setResolveOpen(false)} className="px-4 py-2 rounded-lg bg-muted text-sm">Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}
