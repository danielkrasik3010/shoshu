import { createClient } from "@supabase/supabase-js";

/**
 * Server-only Supabase client for Route Handlers.
 * Prefer SUPABASE_SERVICE_ROLE_KEY (Dashboard → Settings → API) — never expose to the client.
 * Falls back to NEXT_PUBLIC_SUPABASE_ANON_KEY if RLS policies allow anon INSERT.
 */
export function createSignupClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  const key = serviceKey ?? anonKey;
  if (!url || !key) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_URL and a key (SUPABASE_SERVICE_ROLE_KEY or NEXT_PUBLIC_SUPABASE_ANON_KEY)",
    );
  }

  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
