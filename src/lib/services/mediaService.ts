import { supabase, isSupabaseConfigured } from "../supabase";

export interface MediaItem {
  id: string;
  file_name: string;
  file_path: string;
  file_url: string;
  file_size?: number;
  mime_type?: string;
  created_at: string;
}

export async function uploadMediaFile(file: File): Promise<{ url: string | null; error: string | null }> {
  if (!isSupabaseConfigured) {
    return { url: URL.createObjectURL(file), error: null };
  }

  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}_${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
    const filePath = `uploads/${fileName}`;

    // Upload to Supabase Storage
    const { error: uploadError } = await supabase.storage
      .from("public-assets")
      .upload(filePath, file, { cacheControl: '3600', upsert: true });

    if (uploadError) {
      return { url: null, error: uploadError.message };
    }

    // Get Public URL
    const { data: urlData } = supabase.storage
      .from("public-assets")
      .getPublicUrl(filePath);

    const publicUrl = urlData.publicUrl;

    // Save record to media_assets table
    await supabase.from("media_assets").insert([
      {
        file_name: file.name,
        file_path: filePath,
        file_url: publicUrl,
        file_size: file.size,
        mime_type: file.type,
      },
    ]);

    return { url: publicUrl, error: null };
  } catch (err: any) {
    return { url: null, error: err?.message || "فشل رفع الملف" };
  }
}

export async function fetchAllMedia(): Promise<MediaItem[]> {
  if (!isSupabaseConfigured) return [];

  try {
    const { data, error } = await supabase
      .from("media_assets")
      .select("*")
      .order("created_at", { ascending: false });

    if (error || !data) return [];
    return data as MediaItem[];
  } catch {
    return [];
  }
}

export async function deleteMediaItem(id: string, filePath: string): Promise<boolean> {
  if (!isSupabaseConfigured) return true;

  try {
    // Delete from Storage
    await supabase.storage.from("public-assets").remove([filePath]);

    // Delete from Database
    const { error } = await supabase.from("media_assets").delete().eq("id", id);
    return !error;
  } catch {
    return false;
  }
}
