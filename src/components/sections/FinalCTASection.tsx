"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Sparkles, MessageCircle, ShieldCheck, Heart } from "lucide-react";

const WHATSAPP_URL = "https://wa.me/+96890618718";

export function FinalCTASection() {
  return (
    <section className="py-28 relative z-10 overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Emotional CTA Box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative rounded-3xl overflow-hidden border border-white/15 shadow-2xl shadow-blue-950/80"
        >
          {/* Background Cinematic Image */}
          <div className="absolute inset-0">
            <Image
              src="/images/hero.jpg"
              alt=""
              fill
              className="object-cover"
              aria-hidden="true"
              loading="lazy"
            />
            {/* Dark Overlay for Readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#07111F] via-[#07111F]/90 to-[#07111F]/80" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#4A7DFF]/10 to-[#6E5BFF]/10" />
          </div>

          {/* Background Ambient Glow Lights */}
          <div className="absolute top-0 right-1/2 translate-x-1/2 w-96 h-96 bg-[#4A7DFF]/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-[#6E5BFF]/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-1/4 left-0 w-48 h-48 bg-[#D8B15B]/8 rounded-full blur-2xl pointer-events-none" />

          {/* Floating 3D Accents */}
          <div className="absolute top-8 right-8 w-3 h-3 rounded-full bg-[#D8B15B]/50 blur-[1px] animate-pulse" />
          <div className="absolute bottom-12 left-12 w-2.5 h-2.5 rounded-full bg-[#7EC8FF]/40 blur-[1px] animate-pulse" style={{ animationDelay: "1.5s" }} />
          <div className="absolute top-1/3 right-[10%] w-2 h-2 rounded-full bg-[#6E5BFF]/40 blur-[1px] animate-pulse" style={{ animationDelay: "2s" }} />

          <div className="relative z-10 p-8 sm:p-14 text-center space-y-6 max-w-2xl mx-auto">
            {/* Top Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-[#D8B15B]/30 backdrop-blur-md text-xs font-semibold text-[#D8B15B] shadow-inner">
              <Heart className="w-3.5 h-3.5 fill-current text-[#D8B15B]" />
              <span>استثمارك الأعظم في مستقبل طفلك الإيماني</span>
            </div>

            {/* Emotional Headline */}
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white leading-tight">
              ابدأ اليوم رحلة القرآن التي{" "}
              <span className="gradient-text-gold block mt-1">
                تظلُّ نَفعُها مَدى العُمُر
              </span>
            </h2>

            {/* Short Subtitle */}
            <p className="text-sm sm:text-base text-[#B8C3D9] leading-relaxed font-light">
              احجز حصة تجريبية مجانية الآن لتعرف كيف يمكن لأنس القرآن أن يجعل حفظ التلاوة عادة يومية محببة لطفلك.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl font-bold text-sm text-white bg-gradient-to-r from-[#4A7DFF] via-[#6E5BFF] to-[#4A7DFF] hover:shadow-xl hover:shadow-blue-500/30 transition-all transform hover:-translate-y-1 active:translate-y-0 flex items-center justify-center gap-2.5 cursor-pointer border border-white/15 shadow-lg shadow-blue-900/30"
              >
                <span>احجز الحصة التجريبية المجانية</span>
                <Sparkles className="w-4 h-4 text-[#D8B15B]" />
              </a>

              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl font-semibold text-sm text-white bg-white/5 hover:bg-emerald-500/20 border border-white/15 hover:border-emerald-500/40 transition-all flex items-center justify-center gap-2 backdrop-blur-md shadow-lg shadow-black/20"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400 fill-current" />
                <span>محادثة واتساب مباشرة</span>
              </a>
            </div>

            {/* Bottom Reassurance */}
            <div className="flex items-center justify-center gap-4 text-xs text-[#B8C3D9] pt-4">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#7EC8FF]" />
                بدون أي التزام مالـي
              </span>
              <span>•</span>
              <span>تقييم مجاني 100%</span>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
