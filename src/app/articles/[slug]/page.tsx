import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { IslamicBackgroundPattern } from "@/components/background/IslamicBackgroundPattern";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ShareButtons } from "@/components/articles/ShareButtons";
import { ArticleCard } from "@/components/articles/ArticleCard";
import { getArticleBySlug, getRelatedArticles, ARTICLES_DATA } from "@/data/articles";
import { Clock, Calendar, ChevronRight, Sparkles, ArrowLeft, ArrowRight, BookOpen } from "lucide-react";
import { FloatingWhatsApp } from "@/components/ui/FloatingWhatsApp";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return ARTICLES_DATA.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    return {
      title: "المقال غير موجود | أنس القرآن",
    };
  }

  return {
    title: `${article.title} | مدونة أنس القرآن`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: [article.thumbnail],
    },
  };
}

export default async function ArticleDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const relatedArticles = getRelatedArticles(article.slug, article.category);

  const currentIndex = ARTICLES_DATA.findIndex((a) => a.slug === slug);
  const prevArticle = currentIndex > 0 ? ARTICLES_DATA[currentIndex - 1] : null;
  const nextArticle = currentIndex < ARTICLES_DATA.length - 1 ? ARTICLES_DATA[currentIndex + 1] : null;

  // Function to render markdown-like article content
  const renderParagraphs = (content: string) => {
    const lines = content.split("\n\n");
    return lines.map((paragraph, idx) => {
      const trimmed = paragraph.trim();
      if (trimmed.startsWith("## ")) {
        return (
          <h2
            key={idx}
            className="text-xl sm:text-2xl font-bold text-white pt-6 pb-2 border-b border-white/10 gradient-text-blue scroll-mt-28"
          >
            {trimmed.replace("## ", "")}
          </h2>
        );
      }
      if (trimmed.startsWith("- ")) {
        const items = trimmed.split("\n").map(item => item.replace("- ", "").trim());
        return (
          <ul key={idx} className="space-y-2 my-4 pr-4 border-r-2 border-[#7EC8FF]/40 text-[#B8C3D9]">
            {items.map((it, i) => (
              <li key={i} className="text-base leading-relaxed">
                {it}
              </li>
            ))}
          </ul>
        );
      }
      return (
        <p key={idx} className="text-base sm:text-lg text-[#B8C3D9] leading-relaxed font-light my-4">
          {trimmed}
        </p>
      );
    });
  };

  return (
    <main className="relative min-h-screen bg-[#07111F] text-white selection:bg-[#4A7DFF] selection:text-white">
      <IslamicBackgroundPattern />

      {/* Header */}
      <Navbar />

      <article className="pt-28 pb-20 relative z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Back to Articles Button */}
          <div className="mb-6">
            <Link
              href="/articles"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-[#7EC8FF] transition-all group"
            >
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              <span>العودة إلى المقالات</span>
            </Link>
          </div>

          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-2 text-xs text-[#B8C3D9] mb-8">
            <Link href="/" className="hover:text-white transition-colors">الرئيسية</Link>
            <ChevronRight className="w-3.5 h-3.5 text-white/30 rotate-180" />
            <Link href="/articles" className="hover:text-white transition-colors">المقالات</Link>
            <ChevronRight className="w-3.5 h-3.5 text-white/30 rotate-180" />
            <span className="text-[#7EC8FF] truncate max-w-xs">{article.title}</span>
          </nav>

          {/* Article Header Container */}
          <div className="space-y-4 mb-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-[#7EC8FF]">
              <BookOpen className="w-3.5 h-3.5" />
              <span>{article.category}</span>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
              {article.title}
            </h1>

            {/* Metadata Row: Date & Read Time only (NO Author) */}
            <div className="flex flex-wrap items-center gap-6 text-xs text-[#B8C3D9] border-y border-white/10 py-4">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-[#7EC8FF]" />
                <span>تاريخ النشر: {article.date}</span>
              </div>

              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#D8B15B]" />
                <span>زمن القراءة: {article.readTime}</span>
              </div>
            </div>
          </div>

          {/* Large Hero Featured Image */}
          <div className="relative aspect-[21/9] sm:aspect-[16/9] rounded-3xl overflow-hidden mb-12 border border-white/10 shadow-2xl shadow-black/50">
            <Image
              src={article.thumbnail}
              alt={article.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#07111F]/80 via-transparent to-transparent" />
          </div>

          {/* Article Body Content Area */}
          <div className="article-content space-y-6 text-white glass-card p-6 sm:p-10 rounded-3xl border border-white/10">
            {renderParagraphs(article.fullContent)}

            {/* Social Share Buttons */}
            <ShareButtons title={article.title} slug={article.slug} />

            {/* Previous / Next Navigation */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-white/10">
              {prevArticle ? (
                <Link
                  href={`/articles/${prevArticle.slug}`}
                  className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-[#7EC8FF]/30 transition-all flex items-center gap-3 group"
                >
                  <ArrowRight className="w-5 h-5 text-[#7EC8FF] group-hover:translate-x-1 transition-transform" />
                  <div>
                    <span className="text-[10px] text-[#B8C3D9]">المقال السابق</span>
                    <p className="text-xs font-bold text-white line-clamp-1 group-hover:text-[#7EC8FF] transition-colors">
                      {prevArticle.title}
                    </p>
                  </div>
                </Link>
              ) : <div />}

              {nextArticle && (
                <Link
                  href={`/articles/${nextArticle.slug}`}
                  className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-[#7EC8FF]/30 transition-all flex items-center justify-end text-left gap-3 group"
                >
                  <div className="text-right">
                    <span className="text-[10px] text-[#B8C3D9]">المقال التالي</span>
                    <p className="text-xs font-bold text-white line-clamp-1 group-hover:text-[#7EC8FF] transition-colors">
                      {nextArticle.title}
                    </p>
                  </div>
                  <ArrowLeft className="w-5 h-5 text-[#7EC8FF] group-hover:-translate-x-1 transition-transform" />
                </Link>
              )}
            </div>
          </div>

          {/* Related Articles Section */}
          {relatedArticles.length > 0 && (
            <div className="mt-16 pt-12 border-t border-white/10 space-y-8">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold text-white">مقالات ذات صلة</h3>
                <Link href="/articles" className="text-xs text-[#7EC8FF] font-semibold hover:underline">
                  عرض كل المقالات
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedArticles.map((relArt, idx) => (
                  <ArticleCard key={relArt.id} article={relArt} index={idx} />
                ))}
              </div>
            </div>
          )}

        </div>
      </article>

      <Footer />
      <FloatingWhatsApp />
    </main>
  );
}
