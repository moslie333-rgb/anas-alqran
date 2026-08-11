import { createClient, SupabaseClient } from "@supabase/supabase-js";

// Framework Detection: Next.js uses NEXT_PUBLIC_ prefix
const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  "https://placeholder-project.supabase.co";

const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "placeholder-anon-key";

export const isSupabaseConfigured =
  supabaseUrl !== "https://placeholder-project.supabase.co" &&
  supabaseAnonKey !== "placeholder-anon-key" &&
  supabaseUrl.includes(".supabase.co");

export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});
