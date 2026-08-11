import { supabase, isSupabaseConfigured } from "../supabase";
import { Article, ARTICLES_DATA } from "@/data/articles";

export async function fetchAllArticles(): Promise<Article[]> {
  if (!isSupabaseConfigured) {
    return ARTICLES_DATA;
  }

  try {
    const { data, error } = await supabase
      .from("articles")
      .select("*")
      .order("created_at", { ascending: false });

    if (error || !data || data.length === 0) {
      return ARTICLES_DATA;
    }

    return data.map((item) => ({
      id: item.id,
      slug: item.slug,
      title: item.title,
      excerpt: item.excerpt,
      category: item.category,
      date: item.date_label || item.date || "١٥ أغسطس ٢٠٢٦",
      readTime: item.read_time_label || item.readTime || "٥ دقائق",
      thumbnail: item.thumbnail_url || item.thumbnail || "/images/article1.jpg",
      featured: item.is_featured ?? item.featured ?? true,
      tags: item.tags || ["تربية أطفال", "حفظ القرآن"],
      fullContent: item.full_content || item.fullContent || "",
    }));
  } catch {
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

export async function createArticle(article: Partial<Article>): Promise<{ success: boolean; error?: string }> {
  if (!isSupabaseConfigured) {
    return { success: true };
  }

  try {
    const { error } = await supabase.from("articles").insert([
      {
        slug: article.slug || `article-${Date.now()}`,
        title: article.title,
        excerpt: article.excerpt,
        category: article.category || "تربية إيمانية",
        date_label: article.date || "اليوم",
        read_time_label: article.readTime || "٥ دقائق",
        thumbnail_url: article.thumbnail || "/images/article1.jpg",
        is_featured: article.featured ?? true,
        tags: article.tags || [],
        full_content: article.fullContent || "",
      },
    ]);

    if (error) return { success: false, error: error.message };
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err?.message || "فشل إضافة المقال" };
  }
}

export async function updateArticle(id: string, article: Partial<Article>): Promise<{ success: boolean; error?: string }> {
  if (!isSupabaseConfigured) return { success: true };

  try {
    const { error } = await supabase
      .from("articles")
      .update({
        slug: article.slug,
        title: article.title,
        excerpt: article.excerpt,
        category: article.category,
        date_label: article.date,
        read_time_label: article.readTime,
        thumbnail_url: article.thumbnail,
        is_featured: article.featured,
        tags: article.tags,
        full_content: article.fullContent,
      })
      .eq("id", id);

    if (error) return { success: false, error: error.message };
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err?.message || "فشل تعديل المقال" };
  }
}

export async function deleteArticle(id: string): Promise<{ success: boolean; error?: string }> {
  if (!isSupabaseConfigured) return { success: true };

  try {
    const { error } = await supabase.from("articles").delete().eq("id", id);
    if (error) return { success: false, error: error.message };
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err?.message || "فشل حذف المقال" };
  }
}
