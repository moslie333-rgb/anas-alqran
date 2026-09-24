import { supabase } from "@/lib/supabase";

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
  try {
    const { data, error } = await supabase
      .from("testimonials")
      .select("*")
      .order("display_order", { ascending: true });

    if (error || !data || data.length === 0) {
      if (error) console.warn("Supabase fetchReviews warning:", error.message);
      return DEFAULT_REVIEWS;
    }

    return data.map((item) => ({
      id: item.id,
      src: item.image_url || "/images/reviews/review-1.jpg",
      alt: item.alt || "تقييم ولي أمر لأكاديمية أنس القرآن",
      parent_name: item.parent_name || undefined,
      display_order: item.display_order ?? undefined,
    }));
  } catch (err) {
    console.error("fetchReviews error:", err);
    return DEFAULT_REVIEWS;
  }
}

export async function createReview(review: {
  image_url: string;
  alt?: string;
  parent_name?: string;
  display_order?: number;
}): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabase.from("testimonials").insert({
      image_url: review.image_url,
      alt: review.alt || "تقييم ولي أمر لأكاديمية أنس القرآن",
      parent_name: review.parent_name || null,
      display_order: review.display_order || 1,
    });

    if (error) return { success: false, error: error.message };
    return { success: true };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    return { success: false, error: errorMsg };
  }
}

export async function deleteReview(id: string): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabase.from("testimonials").delete().eq("id", id);
    if (error) return { success: false, error: error.message };
    return { success: true };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    return { success: false, error: errorMsg };
  }
}
