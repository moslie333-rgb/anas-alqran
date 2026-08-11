"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Sparkles, MessageCircle, ShieldCheck, Award, Users, Star } from "lucide-react";
import { fetchAcademySettings, DEFAULT_ACADEMY_SETTINGS, AcademySettings } from "@/lib/services/academyService";

export function HeroSection() {
  const [settings, setSettings] = useState<AcademySettings>(DEFAULT_ACADEMY_SETTINGS);

  useEffect(() => {
    fetchAcademySettings().then((data) => {
      if (data) setSettings(data);
    });
  }, []);

  const whatsappUrl = settings.whatsapp_url || "https://wa.me/+96890618718";

  const renderHeroTitle = (title: string) => {
    if (!title) return null;

    const highlightPhrases = [
      "بصُحبَةِ مُعَلِّمينَ مُعتَمَدين",
      "بصحبة معلمين معتمدين",
      "مُعَلِّمينَ مُعتَمَدين",
      "معلمين معتمدين"
    ];

    for (const phrase of highlightPhrases) {
      if (title.includes(phrase)) {
        const parts = title.split(phrase);
        return (
          <>
            {parts[0]}
            <span className="bg-gradient-to-r from-[#D8B15B] via-[#F5D061] to-[#E6B84A] bg-clip-text text-transparent inline-block">
              {phrase}
            </span>
            {parts[1]}
          </>
        );
      }
    }

    const companionMatch = title.match(/(بصُ?حْ?بَ?ةِ?\s+.*)/);
    if (companionMatch && companionMatch[0]) {
      const phrase = companionMatch[0];
      const parts = title.split(phrase);
      return (
        <>
          {parts[0]}
          <span className="bg-gradient-to-r from-[#D8B15B] via-[#F5D061] to-[#E6B84A] bg-clip-text text-transparent inline-block">
            {phrase}
          </span>
          {parts[1] || ""}
        </>
      );
    }

    return title;
  };

  return (
    <section className="relative min-h-screen pt-28 pb-16 lg:pt-36 lg:pb-24 flex items-center justify-center overflow-hidden">
      {/* Hero Background Ambient Accents */}
      <div className="absolute top-[10%] right-[5%] w-[500px] h-[500px] rounded-full bg-[#4A7DFF]/10 blur-[180px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[10%] w-[400px] h-[400px] rounded-full bg-[#6E5BFF]/8 blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Text Content Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 space-y-6 text-center lg:text-right"
          >
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md shadow-inner shadow-white/5">
              <span className="w-2 h-2 rounded-full bg-[#D8B15B] animate-pulse" />
              <span className="text-xs font-semibold text-[#B8C3D9]">
                الأكاديمية القرأنية الأولى لأسر الخليج العربي
              </span>
              <Sparkles className="w-3.5 h-3.5 text-[#D8B15B]" />
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-extrabold text-white leading-[1.25] tracking-tight">
              {renderHeroTitle(settings.hero_title)}
            </h1>

            {/* Paragraph Subtitle */}
            <p className="text-base sm:text-lg text-[#B8C3D9] max-w-2xl mx-auto lg:mx-0 leading-relaxed font-light">
              {settings.hero_subtitle}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl font-bold text-sm text-white bg-gradient-to-r from-[#4A7DFF] via-[#6E5BFF] to-[#4A7DFF] hover:shadow-xl hover:shadow-blue-500/25 transition-all transform hover:-translate-y-1 active:translate-y-0 flex items-center justify-center gap-2.5 cursor-pointer border border-white/15 shadow-lg shadow-blue-900/30"
              >
                <span>احجز حصة تجريبية مجانية</span>
                <Sparkles className="w-4 h-4 text-[#D8B15B]" />
              </a>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-7 py-4 rounded-2xl font-semibold text-sm text-white bg-white/5 hover:bg-emerald-500/15 border border-white/12 hover:border-emerald-500/30 transition-all flex items-center justify-center gap-2 backdrop-blur-md shadow-lg shadow-black/20"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400 fill-current" />
                <span>تواصل عبر الواتساب</span>
              </a>
            </div>

            {/* Dynamic Micro Trust Indicators */}
            <div className="pt-6 grid grid-cols-3 gap-4 border-t border-white/10 max-w-xl mx-auto lg:mx-0">
              <div className="flex flex-col items-center lg:items-start">
                <div className="flex items-center gap-1 text-[#D8B15B]">
                  <Award className="w-4 h-4" />
                  <span className="text-sm font-bold text-white">{settings.trust_certified_teachers_count}</span>
                </div>
                <span className="text-xs text-[#B8C3D9] mt-0.5">من الأزهر الشريف</span>
              </div>

              <div className="flex flex-col items-center lg:items-start">
                <div className="flex items-center gap-1 text-[#7EC8FF]">
                  <Users className="w-4 h-4" />
                  <span className="text-sm font-bold text-white">{settings.trust_completed_lessons_count}</span>
                </div>
                <span className="text-xs text-[#B8C3D9] mt-0.5">ناجحة في الخليج</span>
              </div>

              <div className="flex flex-col items-center lg:items-start">
                <div className="flex items-center gap-1 text-emerald-400">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="text-sm font-bold text-white">تقييم {settings.trust_satisfaction_rating}</span>
                </div>
                <span className="text-xs text-[#B8C3D9] mt-0.5">رضا أولياء الأمور</span>
              </div>
            </div>
          </motion.div>

          {/* Visual Column - Cinematic Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Floating 3D Geometric Islamic Accent */}
              <motion.div
                animate={{ y: [-5, 5, -5] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-6 -right-4 w-14 h-14 rounded-2xl bg-gradient-to-br from-[#D8B15B]/25 to-[#D8B15B]/5 border border-[#D8B15B]/30 flex items-center justify-center backdrop-blur-sm shadow-lg shadow-black/30 z-20"
              >
                <span className="text-lg">📖</span>
              </motion.div>

              {/* Floating 3D Orb - Bottom Left */}
              <motion.div
                animate={{ y: [3, -6, 3] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-4 -left-6 w-10 h-10 rounded-xl bg-gradient-to-br from-[#4A7DFF]/20 to-[#6E5BFF]/10 border border-white/15 flex items-center justify-center backdrop-blur-sm shadow-lg shadow-black/30 z-20"
              >
                <Sparkles className="w-4 h-4 text-[#7EC8FF]" />
              </motion.div>

              {/* Glass Frame Container with 3D Depth */}
              <div className="relative rounded-3xl overflow-hidden border border-white/15 p-2 bg-[#0C1829]/60 backdrop-blur-xl shadow-2xl shadow-blue-950/80 group">
                
                {/* Dynamic Hero Image */}
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                  <Image
                    src={settings.hero_image_url || "/images/hero.jpg"}
                    alt="طفل يتعلم القرآن الكريم مع معلم أنس القرآن عبر الإنترنت"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                  />
                  
                  {/* Premium Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#07111F] via-[#07111F]/20 to-transparent opacity-70" />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#4A7DFF]/5 to-transparent opacity-50" />

                  {/* Floating Overlay Badge */}
                  <div className="absolute bottom-4 right-4 left-4 p-3 rounded-xl bg-[#0C1829]/80 border border-white/12 backdrop-blur-xl flex items-center justify-between shadow-lg shadow-black/30">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shadow-inner">
                        <ShieldCheck className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-white">جلسة تعليمية مباشرة 1 لـ 1</p>
                        <p className="text-[10px] text-[#B8C3D9]">بيئة تفاعلية آمنة ومشجعة</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-1 rounded bg-[#D8B15B]/20 text-[#D8B15B] border border-[#D8B15B]/30 animate-pulse">
                      مباشر
                    </span>
                  </div>
                </div>
              </div>

              {/* Decorative Accent Glow Behind Frame */}
              <div className="absolute -inset-4 bg-gradient-to-r from-[#4A7DFF]/20 via-[#6E5BFF]/15 to-[#D8B15B]/8 rounded-3xl blur-2xl -z-10 opacity-70" />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
