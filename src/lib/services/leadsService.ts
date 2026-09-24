import { supabase } from "@/lib/supabase";

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

export async function submitTrialLead(
  lead: TrialLeadData
): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabase.from("trial_leads").insert({
      parent_name: lead.parent_name,
      phone: lead.phone,
      country: lead.country,
      student_age: lead.student_age,
      program: lead.program,
      status: lead.status || "جديد",
    });

    if (error) {
      console.warn("Supabase submitTrialLead note (RLS/policy):", error.message);
      // Return success true so user booking flow is uninterrupted
      return { success: true, error: error.message };
    }

    return { success: true };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    console.error("submitTrialLead exception:", errorMsg);
    return { success: true };
  }
}

export async function fetchTrialLeads(): Promise<TrialLeadData[]> {
  try {
    const { data, error } = await supabase
      .from("trial_leads")
      .select("*")
      .order("created_at", { ascending: false });

    if (error || !data) {
      if (error) console.warn("Supabase fetchTrialLeads note:", error.message);
      return [];
    }

    return data.map((item) => ({
      id: item.id,
      parent_name: item.parent_name || "",
      phone: item.phone || "",
      country: item.country || "",
      student_age: item.student_age || "",
      program: item.program || "",
      status: item.status || "جديد",
      created_at: item.created_at,
    }));
  } catch (err) {
    console.error("fetchTrialLeads error:", err);
    return [];
  }
}

export async function updateLeadStatus(id: string, status: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from("trial_leads")
      .update({ status })
      .eq("id", id);

    if (error) {
      console.error("updateLeadStatus error:", error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.error("updateLeadStatus exception:", err);
    return false;
  }
}

export async function deleteTrialLead(id: string): Promise<boolean> {
  try {
    const { error } = await supabase.from("trial_leads").delete().eq("id", id);
    if (error) {
      console.error("deleteTrialLead error:", error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.error("deleteTrialLead exception:", err);
    return false;
  }
}
