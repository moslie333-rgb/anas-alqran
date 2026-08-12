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

export async function submitTrialLead(_lead: TrialLeadData): Promise<{ success: boolean; error?: string }> {
  return { success: true };
}

export async function fetchTrialLeads(): Promise<TrialLeadData[]> {
  return [];
}

export async function updateLeadStatus(_id: string, _status: string): Promise<boolean> {
  return true;
}

export async function deleteTrialLead(_id: string): Promise<boolean> {
  return true;
}
