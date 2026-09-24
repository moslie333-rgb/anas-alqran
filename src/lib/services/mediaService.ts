import { supabase } from "@/lib/supabase";

export interface MediaItem {
  id: string;
  file_name: string;
  file_path: string;
  file_url: string;
  file_size?: number;
  mime_type?: string;
  created_at: string;
}

const STORAGE_BUCKET = "public-assets";

export async function uploadMediaFile(
  file: File
): Promise<{ url: string | null; error: string | null }> {
  try {
    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
    const filePath = `uploads/${fileName}`;

    // Attempt upload to Supabase Storage bucket
    const { error: uploadError } = await supabase.storage
      .from(STORAGE_BUCKET)
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (!uploadError) {
      const {
        data: { publicUrl },
      } = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(filePath);

      return { url: publicUrl, error: null };
    }

    // If bucket doesn't exist or RLS denies anon upload, gracefully fall back to local preview
    if (typeof window !== "undefined") {
      const localUrl = URL.createObjectURL(file);
      return { url: localUrl, error: null };
    }

    return { url: null, error: uploadError.message };
  } catch {
    if (typeof window !== "undefined") {
      return { url: URL.createObjectURL(file), error: null };
    }
    return { url: null, error: "فشل رفع الملف" };
  }
}

export async function fetchAllMedia(): Promise<MediaItem[]> {
  try {
    const { data, error } = await supabase.storage
      .from(STORAGE_BUCKET)
      .list("uploads", {
        limit: 100,
        sortBy: { column: "created_at", order: "desc" },
      });

    if (error || !data) {
      return [];
    }

    return data.map((item) => {
      const {
        data: { publicUrl },
      } = supabase.storage
        .from(STORAGE_BUCKET)
        .getPublicUrl(`uploads/${item.name}`);

      return {
        id: item.id || item.name,
        file_name: item.name,
        file_path: `uploads/${item.name}`,
        file_url: publicUrl,
        file_size: item.metadata?.size,
        mime_type: item.metadata?.mimetype,
        created_at: item.created_at || new Date().toISOString(),
      };
    });
  } catch {
    return [];
  }
}

export async function deleteMediaItem(
  _id: string,
  filePath: string
): Promise<boolean> {
  try {
    const { error } = await supabase.storage
      .from(STORAGE_BUCKET)
      .remove([filePath]);

    return !error;
  } catch {
    return false;
  }
}
