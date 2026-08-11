"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArticleCard } from "@/components/articles/ArticleCard";
import { ArrowLeft } from "lucide-react";
import { fetchFeaturedArticles } from "@/lib/services/articlesService";
import { Article, ARTICLES_DATA } from "@/data/articles";

export function ArticlesSection() {
  const [featuredArticles, setFeaturedArticles] = useState<Article[]>(
    ARTICLES_DATA.filter((a) => a.featured).slice(0, 3)
  );

  useEffect(() => {
    fetchFeaturedArticles().then((data) => {
      if (data && data.length > 0) {
        setFeaturedArticles(data.slice(0, 3));
      }
    });
  }, []);

  return (
    <section id="articles" className="py-24 relative z-10 bg-[#0C1829]/20 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-3">
            <span className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-white/5 border border-white/10 text-[#7EC8FF] inline-block">
              مدونة أنس القرآن
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              مقالات تهم <span className="gradient-text-blue">أولياء الأمور</span>
            </h2>
            <p className="text-sm text-[#B8C3D9]">
              إرشادات تربوية وتعليمية مبسطة لدعم رحلة طفلك القرآنية في المنزل.
            </p>
          </div>

          <Link
            href="/articles"
            className="hidden md:inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-white transition-all group"
          >
            <span>عرض جميع المقالات</span>
            <ArrowLeft className="w-4 h-4 text-[#7EC8FF] transition-transform group-hover:-translate-x-1" />
          </Link>
        </div>

        {/* 3 Featured Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredArticles.map((article, index) => (
            <ArticleCard key={article.id} article={article} index={index} />
          ))}
        </div>

        {/* Mobile View All Button */}
        <div className="mt-12 text-center md:hidden">
          <Link
            href="/articles"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white/10 border border-white/15 text-xs font-semibold text-white hover:bg-white/20 transition-all"
          >
            <span>عرض جميع المقالات</span>
            <ArrowLeft className="w-4 h-4 text-[#7EC8FF]" />
          </Link>
        </div>

      </div>
    </section>
  );
}
