import { supabase, isSupabaseConfigured } from "../supabase";

export interface ReviewItem {
  id?: string;
  src: string;
  alt: string;
  parent_name?: string;
  display_order?: number;
}

export const DEFAULT_REVIEWS: ReviewItem[] = [
  { src: "/images/reviews/review-1.jpg", alt: "تقييم ولي أمر لأكاديمية أنس القرآن - 1" },
  { src: "/images/reviews/review-2.jpg", alt: "تقييم ولي أمر لأكاديمية أنس القرآن - 2" },
  { src: "/images/reviews/review-3.jpg", alt: "تقييم ولي أمر لأكاديمية أنس القرآن - 3" },
  { src: "/images/reviews/review-4.jpg", alt: "تقييم ولي أمر لأكاديمية أنس القرآن - 4" },
  { src: "/images/reviews/review-5.jpg", alt: "تقييم ولي أمر لأكاديمية أنس القرآن - 5" },
  { src: "/images/reviews/review-6.jpg", alt: "تقييم ولي أمر لأكاديمية أنس القرآن - 6" },
];

export async function fetchReviews(): Promise<ReviewItem[]> {
  if (!isSupabaseConfigured) {
    return DEFAULT_REVIEWS;
  }

  try {
    const { data, error } = await supabase
      .from("testimonials")
      .select("*")
      .order("display_order", { ascending: true });

    if (error || !data || data.length === 0) {
      return DEFAULT_REVIEWS;
    }

    return data.map((item) => ({
      id: item.id,
      src: item.image_url || item.src,
      alt: item.alt || item.parent_name || "تقييم ولي أمر لأكاديمية أنس القرآن",
      parent_name: item.parent_name,
      display_order: item.display_order,
    }));
  } catch {
    return DEFAULT_REVIEWS;
  }
}

export async function createReview(review: { image_url: string; alt?: string; parent_name?: string; display_order?: number }): Promise<{ success: boolean; error?: string }> {
  if (!isSupabaseConfigured) return { success: true };

  try {
    const { error } = await supabase.from("testimonials").insert([
      {
        image_url: review.image_url,
        alt: review.alt || "تقييم ولي أمر لأكاديمية أنس القرآن",
        parent_name: review.parent_name,
        display_order: review.display_order || 0,
      },
    ]);

    if (error) return { success: false, error: error.message };
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err?.message || "فشل إضافة التقييم" };
  }
}

export async function deleteReview(id: string): Promise<{ success: boolean; error?: string }> {
  if (!isSupabaseConfigured) return { success: true };

  try {
    const { error } = await supabase.from("testimonials").delete().eq("id", id);
    if (error) return { success: false, error: error.message };
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err?.message || "فشل حذف التقييم" };
  }
}
