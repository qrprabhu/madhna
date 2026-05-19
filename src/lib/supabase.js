import { createClient } from "@supabase/supabase-js";
import { getSupabasePublicConfig } from "./supabase-config";

function createSupabaseClient() {
  const config = getSupabasePublicConfig();
  if (!config) {
    throw new Error(
      "Missing Supabase config. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in Vercel → Settings → Environment Variables (Production + Preview), then Redeploy.",
    );
  }

  return createClient(config.url, config.key, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    },
  });
}

let _client;

export const supabase = new Proxy(
  {},
  {
    get(_, prop, receiver) {
      if (!_client) _client = createSupabaseClient();
      return Reflect.get(_client, prop, receiver);
    },
  },
);
