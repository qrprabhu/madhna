import { supabase } from "@/lib/supabase";

function toReadableSupabaseError(error: unknown): Error {
  if (error instanceof Error) {
    if (error.message === "Failed to fetch" || error.name === "TypeError") {
      return new Error(
        "Cannot reach Supabase. Check that the project is active in the dashboard, VITE_SUPABASE_URL matches Project Settings → API, and restart npm run dev.",
      );
    }
    return error;
  }
  if (error && typeof error === "object" && "message" in error) {
    return new Error(String((error as { message: unknown }).message));
  }
  return new Error("Something went wrong talking to Supabase.");
}

/** Matches DB default and admin updates */
export type PetitionStatus = "Pending" | "Ongoing" | "Resolved";

export type PetitionPriority = "low" | "medium" | "high" | "urgent";

export interface Petition {
  id: number;
  name: string | null;
  phone: string | null;
  area: string | null;
  address: string | null;
  category: string | null;
  description: string | null;
  image_url: string | null;
  status: string | null;
  priority: string | null;
  created_at: string | null;
  resolved_image: string | null;
  resolution_note: string | null;
  resolved_at: string | null;
}

export function normalizeStatus(status: string | null | undefined): PetitionStatus | null {
  if (!status) return null;
  const s = status.trim().toLowerCase();
  if (s === "pending") return "Pending";
  if (s === "ongoing") return "Ongoing";
  if (s === "resolved") return "Resolved";
  return null;
}

export async function fetchPetitions(filter?: { status?: PetitionStatus; limit?: number }) {
  let q = supabase.from("petitions").select("*").order("created_at", { ascending: false });
  if (filter?.status) q = q.eq("status", filter.status);
  if (filter?.limit) q = q.limit(filter.limit);
  try {
    const { data, error } = await q;
    if (error) throw error;
    return (data ?? []) as Petition[];
  } catch (e) {
    throw toReadableSupabaseError(e);
  }
}

export async function submitPetition(fields: {
  name: string;
  phone: string;
  area: string;
  description: string;
  address?: string | null;
  category?: string;
  priority?: PetitionPriority;
  image_url?: string | null;
}) {
  try {
    const { error } = await supabase.from("petitions").insert([
      {
        name: fields.name,
        phone: fields.phone,
        area: fields.area,
        description: fields.description,
        address: fields.address ?? null,
        category: fields.category ?? "Other",
        priority: fields.priority ?? "medium",
        image_url: fields.image_url ?? null,
      },
    ]);
    if (error) throw error;
  } catch (e) {
    throw toReadableSupabaseError(e);
  }
}

export async function fetchStats() {
  let data;
  try {
    const result = await supabase.from("petitions").select("status,area");
    if (result.error) throw result.error;
    data = result.data;
  } catch (e) {
    throw toReadableSupabaseError(e);
  }
  const rows = data ?? [];
  const resolved = rows.filter((r) => normalizeStatus(r.status) === "Resolved").length;
  const ongoing = rows.filter((r) => normalizeStatus(r.status) === "Ongoing").length;
  const pending = rows.filter((r) => normalizeStatus(r.status) === "Pending").length;
  const villages = new Set(
    rows.map((r) => (r.area ?? "").trim().toLowerCase()).filter(Boolean),
  ).size;
  return {
    total: rows.length,
    resolved,
    ongoing,
    pending,
    villages,
    people: rows.length * 12,
  };
}
