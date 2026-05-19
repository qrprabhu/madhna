import { createClient } from "@supabase/supabase-js";

function readEnv(name) {
  if (typeof import.meta !== "undefined" && import.meta.env?.[name]) {
    return import.meta.env[name];
  }
  if (typeof process !== "undefined" && process.env?.[name]) {
    return process.env[name];
  }
  return undefined;
}

function createSupabaseClient() {
  const supabaseUrl = readEnv("VITE_SUPABASE_URL") || readEnv("SUPABASE_URL");
  const supabaseKey =
    readEnv("VITE_SUPABASE_ANON_KEY") ||
    readEnv("VITE_SUPABASE_PUBLISHABLE_KEY") ||
    readEnv("SUPABASE_PUBLISHABLE_KEY");

  if (!supabaseUrl || !supabaseKey) {
    throw new Error(
      "Missing Supabase config. In Vercel → Project → Settings → Environment Variables, add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY (or SUPABASE_URL + SUPABASE_PUBLISHABLE_KEY), then redeploy.",
    );
  }

  return createClient(supabaseUrl, supabaseKey, {
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
