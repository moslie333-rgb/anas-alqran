"use client";

import React, { useState, useEffect, useMemo } from "react";
import { IslamicBackgroundPattern } from "@/components/background/IslamicBackgroundPattern";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ArticleCard } from "@/components/articles/ArticleCard";
import { Search, BookOpen, Filter } from "lucide-react";
import { FloatingWhatsApp } from "@/components/ui/FloatingWhatsApp";
import { fetchAllArticles } from "@/lib/services/articlesService";
import { Article, ARTICLES_DATA } from "@/data/articles";

export default function ArticlesCatalogPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("الكل");
  const [articles, setArticles] = useState<Article[]>(ARTICLES_DATA);

  useEffect(() => {
    fetchAllArticles().then((data) => {
      if (data && data.length > 0) {
        setArticles(data);
      }
    });
  }, []);

  const categories = ["الكل", "تربية إيمانية", "طرق الدراسة", "دليل أولياء الأمور", "التجويد والقرآن"];

  const filteredArticles = useMemo(() => {
    return articles.filter((article) => {
      const matchesCategory =
        selectedCategory === "الكل" || article.category === selectedCategory;
      const matchesSearch =
        searchQuery.trim() === "" ||
        article.title.includes(searchQuery) ||
        article.excerpt.includes(searchQuery) ||
        article.tags.some((tag) => tag.includes(searchQuery));

      return matchesCategory && matchesSearch;
    });
  }, [articles, selectedCategory, searchQuery]);

  return (
    <main className="relative min-h-screen bg-[#07111F] text-white selection:bg-[#4A7DFF] selection:text-white">
      <IslamicBackgroundPattern />

      {/* Navigation */}
      <Navbar />

      {/* Catalog Hero Section */}
      <section className="pt-32 pb-16 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-[#7EC8FF]">
              <BookOpen className="w-3.5 h-3.5" />
              <span>مكتبة ومقالات أنس القرآن التربوية</span>
            </div>
            
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white leading-tight">
              مقالات وإرشادات تربوية{" "}
              <span className="gradient-text-blue block mt-1">
                لبناء الجيل القرآني
              </span>
            </h1>

            <p className="text-sm sm:text-base text-[#B8C3D9] leading-relaxed max-w-xl mx-auto font-light">
              نصائح موجهة لأولياء الأمور في الخليج لمساعدة الأبناء على حفظ وإتقان كتاب الله بمحبة وسهولة.
            </p>

            {/* Search Bar */}
            <div className="pt-4 max-w-xl mx-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="ابحث عن عنوان مقال أو كلمة مفتاحية..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#0C1829]/90 border border-white/15 rounded-2xl px-5 py-4 pr-12 text-sm text-white placeholder-white/40 focus:outline-none focus:border-[#4A7DFF] focus:ring-1 focus:ring-[#4A7DFF] shadow-2xl transition-all"
                />
                <Search className="w-5 h-5 text-[#7EC8FF] absolute right-4 top-1/2 -translate-y-1/2" />
              </div>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-gradient-to-r from-[#4A7DFF] to-[#6E5BFF] text-white shadow-lg shadow-blue-900/30 border border-white/20"
                    : "bg-white/5 hover:bg-white/10 text-[#B8C3D9] hover:text-white border border-white/10"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Articles Grid */}
          {filteredArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArticles.map((article, index) => (
                <ArticleCard key={article.id} article={article} index={index} />
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="text-center py-16 p-8 rounded-3xl glass-card max-w-md mx-auto space-y-4">
              <Filter className="w-10 h-10 text-[#7EC8FF] mx-auto opacity-60" />
              <h3 className="text-lg font-bold text-white">لم نجد مقالات تطابق بحثك</h3>
              <p className="text-xs text-[#B8C3D9]">جرب استخدام كلمات بحث أخرى أو اختر تصنيفاً مختلفاً.</p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("الكل");
                }}
                className="px-4 py-2 rounded-xl bg-white/10 text-xs font-semibold text-white hover:bg-white/20 transition-colors"
              >
                إعادة ضبط البحث
              </button>
            </div>
          )}

        </div>
      </section>

      {/* Footer */}
      <Footer />

      {/* Floating WhatsApp Button */}
      <FloatingWhatsApp />
    </main>
  );
}
