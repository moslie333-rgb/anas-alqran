import { supabase, isSupabaseConfigured } from "../supabase";

export interface TrialLeadData {
  id?: string;
  parent_name: string;
  phone: string;
  country: string;
  student_age: string;
  program: string;
  status?: string;
  created_at?: string;
}

export async function submitTrialLead(lead: TrialLeadData): Promise<{ success: boolean; error?: string }> {
  if (!isSupabaseConfigured) {
    return { success: true };
  }

  try {
    const { error } = await supabase.from("trial_leads").insert([
      {
        parent_name: lead.parent_name,
        phone: lead.phone,
        country: lead.country,
        student_age: lead.student_age,
        program: lead.program,
        status: "new",
        created_at: new Date().toISOString(),
      },
    ]);

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err: any) {
    return { success: false, error: err?.message || "Error submitting lead" };
  }
}

export async function fetchTrialLeads(): Promise<TrialLeadData[]> {
  if (!isSupabaseConfigured) return [];

  try {
    const { data, error } = await supabase
      .from("trial_leads")
      .select("*")
      .order("created_at", { ascending: false });

    if (error || !data) return [];
    return data as TrialLeadData[];
  } catch {
    return [];
  }
}

export async function updateLeadStatus(id: string, status: string): Promise<boolean> {
  if (!isSupabaseConfigured) return true;

  try {
    const { error } = await supabase.from("trial_leads").update({ status }).eq("id", id);
    return !error;
  } catch {
    return false;
  }
}

export async function deleteTrialLead(id: string): Promise<boolean> {
  if (!isSupabaseConfigured) return true;

  try {
    const { error } = await supabase.from("trial_leads").delete().eq("id", id);
    return !error;
  } catch {
    return false;
  }
}
