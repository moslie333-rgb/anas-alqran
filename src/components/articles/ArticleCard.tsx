"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Clock, Calendar, ArrowLeft } from "lucide-react";
import { Article } from "@/data/articles";

interface ArticleCardProps {
  article: Article;
  index?: number;
}

export function ArticleCard({ article, index = 0 }: ArticleCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
    >
      <Link
        href={`/articles/${article.slug}`}
        className="glass-card rounded-3xl overflow-hidden flex flex-col justify-between group border border-white/10 hover:border-[#7EC8FF]/40 transition-all cursor-pointer h-full"
      >
        <div>
          {/* Thumbnail Container */}
          <div className="relative aspect-[16/10] overflow-hidden">
            <Image
              src={article.thumbnail}
              alt={article.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0C1829] via-transparent to-transparent" />
            
            {/* Category Pill */}
            <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-[#07111F]/80 backdrop-blur-md border border-white/10 text-[11px] text-[#7EC8FF] font-medium">
              {article.category}
            </div>
          </div>

          {/* Body Content */}
          <div className="p-6 space-y-3">
            {/* Meta bar */}
            <div className="flex items-center justify-between text-[11px] text-[#B8C3D9]">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#7EC8FF]" />
                <span>{article.date}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#D8B15B]" />
                <span>زمن القراءة: {article.readTime}</span>
              </div>
            </div>

            {/* Title */}
            <h3 className="text-base font-bold text-white leading-snug group-hover:text-[#7EC8FF] transition-colors">
              {article.title}
            </h3>

            {/* Excerpt */}
            <p className="text-xs text-[#B8C3D9] leading-relaxed line-clamp-2">
              {article.excerpt}
            </p>
          </div>
        </div>

        {/* Card Footer - No author info */}
        <div className="p-6 pt-0 mt-2 flex items-center justify-end border-t border-white/5 pt-4">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-[#7EC8FF] group-hover:text-white transition-colors">
            <span>اقرأ المقال</span>
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
