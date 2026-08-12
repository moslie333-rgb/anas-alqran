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
  return DEFAULT_REVIEWS;
}

export async function createReview(_review: { image_url: string; alt?: string; parent_name?: string; display_order?: number }): Promise<{ success: boolean; error?: string }> {
  return { success: true };
}

export async function deleteReview(_id: string): Promise<{ success: boolean; error?: string }> {
  return { success: true };
}
