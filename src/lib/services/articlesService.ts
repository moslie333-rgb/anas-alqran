import { Article, ARTICLES_DATA } from "@/data/articles";
import { supabase } from "@/lib/supabase";

export async function fetchAllArticles(): Promise<Article[]> {
  try {
    const { data, error } = await supabase
      .from("articles")
      .select("*")
      .order("created_at", { ascending: false });

    if (error || !data || data.length === 0) {
      if (error) console.warn("Supabase fetchAllArticles note:", error.message);
      return ARTICLES_DATA;
    }

    return data.map((item) => ({
      id: item.id,
      slug: item.slug || `article-${item.id}`,
      title: item.title || "",
      excerpt: item.excerpt || "",
      category: item.category || "تربية إيمانية",
      date: item.created_at
        ? new Date(item.created_at).toLocaleDateString("ar-EG", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })
        : "اليوم",
      readTime: item.read_time || "٥ دقائق",
      thumbnail: item.thumbnail || item.image_url || "/images/article1.jpg",
      featured: Boolean(item.is_featured ?? item.featured),
      tags: Array.isArray(item.tags) ? item.tags : ["أنس القرآن"],
      fullContent: item.content || item.full_content || item.excerpt || "",
    }));
  } catch (err) {
    console.error("fetchAllArticles error:", err);
    return ARTICLES_DATA;
  }
}

export async function fetchArticleBySlug(slug: string): Promise<Article | undefined> {
  const articles = await fetchAllArticles();
  return articles.find((a) => a.slug === slug);
}

export async function fetchFeaturedArticles(): Promise<Article[]> {
  const articles = await fetchAllArticles();
  return articles.filter((a) => a.featured);
}

export async function createArticle(
  article: Partial<Article>
): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabase.from("articles").insert({
      title: article.title,
      slug: article.slug,
      excerpt: article.excerpt,
      category: article.category,
      is_featured: article.featured,
      tags: article.tags,
    });

    if (error) return { success: false, error: error.message };
    return { success: true };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    return { success: false, error: errorMsg };
  }
}

export async function updateArticle(
  id: string,
  article: Partial<Article>
): Promise<{ success: boolean; error?: string }> {
  try {
    const payload: Record<string, unknown> = {};
    if (article.title !== undefined) payload.title = article.title;
    if (article.slug !== undefined) payload.slug = article.slug;
    if (article.excerpt !== undefined) payload.excerpt = article.excerpt;
    if (article.category !== undefined) payload.category = article.category;
    if (article.featured !== undefined) payload.is_featured = article.featured;
    if (article.tags !== undefined) payload.tags = article.tags;

    const { error } = await supabase
      .from("articles")
      .update(payload)
      .eq("id", id);

    if (error) return { success: false, error: error.message };
    return { success: true };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    return { success: false, error: errorMsg };
  }
}

export async function deleteArticle(id: string): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabase.from("articles").delete().eq("id", id);
    if (error) return { success: false, error: error.message };
    return { success: true };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    return { success: false, error: errorMsg };
  }
}
