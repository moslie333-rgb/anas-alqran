import { Article, ARTICLES_DATA } from "@/data/articles";

export async function fetchAllArticles(): Promise<Article[]> {
  return ARTICLES_DATA;
}

export async function fetchArticleBySlug(slug: string): Promise<Article | undefined> {
  const articles = await fetchAllArticles();
  return articles.find((a) => a.slug === slug);
}

export async function fetchFeaturedArticles(): Promise<Article[]> {
  const articles = await fetchAllArticles();
  return articles.filter((a) => a.featured);
}

export async function createArticle(_article: Partial<Article>): Promise<{ success: boolean; error?: string }> {
  return { success: true };
}

export async function updateArticle(_id: string, _article: Partial<Article>): Promise<{ success: boolean; error?: string }> {
  return { success: true };
}

export async function deleteArticle(_id: string): Promise<{ success: boolean; error?: string }> {
  return { success: true };
}
