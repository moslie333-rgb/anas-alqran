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
  // Create a local object URL for the uploaded file
  return { url: URL.createObjectURL(file), error: null };
}

export async function fetchAllMedia(): Promise<MediaItem[]> {
  return [];
}

export async function deleteMediaItem(_id: string, _filePath: string): Promise<boolean> {
  return true;
}
