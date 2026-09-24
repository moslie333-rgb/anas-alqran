import { createClient, SupabaseClient } from "@supabase/supabase-js";

// Read public environment variables with safe fallbacks
const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  "https://hukqsgvrlfyxnveuzpjt.supabase.co";

const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh1a3FzZ3ZybGZ5eG52ZXV6cGp0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU4OTM1MzMsImV4cCI6MjEwMTQ2OTUzM30.ASKh9VCHlJu0Ot4z7qBLFVP0tlLmld3g-jlwkmyWhG4";

/**
 * Global singleton reference for Supabase client
 * to prevent multiple client instances during fast refresh or repeated calls
 */
declare global {
  var __supabase_instance__: SupabaseClient | undefined;
}

export function getSupabaseClient(): SupabaseClient {
  if (typeof globalThis !== "undefined" && globalThis.__supabase_instance__) {
    return globalThis.__supabase_instance__;
  }

  const client = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: typeof window !== "undefined",
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  });

  if (process.env.NODE_ENV !== "production") {
    globalThis.__supabase_instance__ = client;
  }

  return client;
}

// Export singleton instance
export const supabase = getSupabaseClient();

export const isSupabaseConfigured: boolean =
  Boolean(supabaseUrl && supabaseAnonKey && supabaseUrl.includes(".supabase.co"));

export interface SupabaseHealthCheckResult {
  connected: boolean;
  databaseReachable: boolean;
  latencyMs?: number;
  error?: string;
  url: string;
  checkedAt: string;
}

/**
 * Health check function to verify Supabase connectivity and DB responsiveness
 */
export async function checkSupabaseHealth(): Promise<SupabaseHealthCheckResult> {
  const startTime = Date.now();
  const checkedAt = new Date().toISOString();

  try {
    if (!supabaseUrl || !supabaseAnonKey) {
      return {
        connected: false,
        databaseReachable: false,
        error: "Supabase environment variables are missing",
        url: supabaseUrl || "missing",
        checkedAt,
      };
    }

    // Ping the database by checking academy_settings
    const { error, status } = await supabase
      .from("academy_settings")
      .select("id")
      .limit(1);

    const latencyMs = Date.now() - startTime;

    if (error) {
      return {
        connected: true,
        databaseReachable: status >= 200 && status < 400,
        latencyMs,
        error: `[${error.code}] ${error.message}`,
        url: supabaseUrl,
        checkedAt,
      };
    }

    return {
      connected: true,
      databaseReachable: true,
      latencyMs,
      url: supabaseUrl,
      checkedAt,
    };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    return {
      connected: false,
      databaseReachable: false,
      latencyMs: Date.now() - startTime,
      error: errorMsg,
      url: supabaseUrl,
      checkedAt,
    };
  }
}
