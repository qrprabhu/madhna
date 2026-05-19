/** Public Supabase settings (anon key is safe to expose in the browser). */
export type SupabasePublicConfig = { url: string; key: string };

declare global {
  interface Window {
    __SUPABASE__?: SupabasePublicConfig;
  }
}

function fromProcessEnv(): SupabasePublicConfig | null {
  if (typeof process === "undefined" || !process.env) return null;
  const url = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
  const key =
    process.env.VITE_SUPABASE_ANON_KEY ||
    process.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
    process.env.SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) return null;
  return { url, key };
}

function fromImportMeta(): SupabasePublicConfig | null {
  if (typeof import.meta === "undefined" || !import.meta.env) return null;
  const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
  const key =
    (import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined) ||
    (import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string | undefined);
  if (!url || !key) return null;
  return { url, key };
}

export function getSupabasePublicConfig(): SupabasePublicConfig | null {
  if (typeof window !== "undefined" && window.__SUPABASE__?.url && window.__SUPABASE__?.key) {
    return window.__SUPABASE__;
  }
  return fromImportMeta() ?? fromProcessEnv();
}

export function serializeSupabaseConfigScript(): string | null {
  const config = fromProcessEnv();
  if (!config) return null;
  return `window.__SUPABASE__=${JSON.stringify(config)};`;
}
