"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { MessageCircle, Star, Sparkles } from "lucide-react";
import { fetchReviews, DEFAULT_REVIEWS, ReviewItem } from "@/lib/services/reviewsService";

export function ReviewsSection() {
  const [reviews, setReviews] = useState<ReviewItem[]>(DEFAULT_REVIEWS);

  useEffect(() => {
    fetchReviews().then((data) => {
      if (data && data.length > 0) {
        setReviews(data);
      }
    });
  }, []);

  // Doubling the review items for seamless infinite marquee scroll
  const marqueeItems = [...reviews, ...reviews];

  return (
    <section id="reviews" className="py-28 relative z-10 overflow-hidden scroll-mt-20">
      {/* Section Ambient Background */}
      <div className="absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-emerald-500/5 blur-[200px] pointer-events-none" />
      <div className="absolute top-[20%] left-[5%] w-3 h-3 rounded-full bg-emerald-400/30 blur-[1px] animate-pulse" />
      <div className="absolute bottom-[25%] right-[8%] w-2.5 h-2.5 rounded-full bg-[#D8B15B]/30 blur-[1px] animate-pulse" style={{ animationDelay: "1.5s" }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
            <MessageCircle className="w-3.5 h-3.5" />
            <span>آراء أولياء الأمور الحقيقية</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            ماذا يقول <span className="gradient-text-gold">أولياء الأمور</span> في الخليج؟
          </h2>
          <p className="text-sm text-[#B8C3D9]">
            شهادات حية ورسائل شكر حقيقية تصلنا يومياً عبر محادثات الواتساب المباشرة.
          </p>

          {/* Trust Stars */}
          <div className="flex items-center justify-center gap-1 pt-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 text-[#D8B15B] fill-current" />
            ))}
            <span className="text-sm font-bold text-white mr-2">4.9 / 5</span>
            <span className="text-xs text-[#B8C3D9]">تقييم عام من أهالي الخليج</span>
          </div>
        </div>
      </div>

      {/* Infinite Horizontal Marquee Slider */}
      <div className="relative w-full overflow-hidden py-4 group">
        {/* Edge Gradient Fades */}
        <div className="absolute top-0 bottom-0 right-0 w-24 sm:w-36 bg-gradient-to-l from-[#07111F] to-transparent z-20 pointer-events-none" />
        <div className="absolute top-0 bottom-0 left-0 w-24 sm:w-36 bg-gradient-to-r from-[#07111F] to-transparent z-20 pointer-events-none" />

        {/* Marquee Track */}
        <div className="flex gap-6 w-max animate-marquee group-hover:[animation-play-state:paused]">
          {marqueeItems.map((review, index) => (
            <div
              key={`${review.src}-${index}`}
              className="w-[280px] sm:w-[320px] md:w-[360px] shrink-0 rounded-3xl overflow-hidden glass-card p-3 border border-white/10 shadow-xl transition-all duration-300 hover:border-[#7EC8FF]/40 hover:scale-[1.02]"
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-[#0C1829]">
                <Image
                  src={review.src}
                  alt={review.alt}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-105"
                  sizes="(max-width: 640px) 280px, 360px"
                  loading="lazy"
                />

                {/* Subtle overlay badge */}
                <div className="absolute bottom-3 right-3 left-3 p-2.5 rounded-xl bg-[#0C1829]/90 backdrop-blur-md border border-white/10 flex items-center justify-between shadow-lg">
                  <div className="flex items-center gap-2">
                    <MessageCircle className="w-4 h-4 text-emerald-400 fill-current shrink-0" />
                    <span className="text-[11px] text-white font-medium">محادثة موثقة</span>
                  </div>
                  <Sparkles className="w-3.5 h-3.5 text-[#D8B15B]" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
