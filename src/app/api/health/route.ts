import { NextResponse } from "next/server";
import { checkSupabaseHealth } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export async function GET() {
  const result = await checkSupabaseHealth();
  return NextResponse.json(result, {
    status: result.databaseReachable ? 200 : 503,
  });
}
