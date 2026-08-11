"use client";

import React from "react";
import { motion } from "framer-motion";
import { Heart, Sparkles, Smile, ShieldAlert, Target, Award } from "lucide-react";

export function WhyUsSection() {
  const features = [
    {
      icon: Heart,
      title: "منهج تربوي ودود",
      desc: "نعتمد أسلوب التشجيع والمحبة لبناء علاقة إيمانية متينة بين طفلك والقرآن الكريم.",
      gradient: "from-rose-500/20 to-rose-500/5",
      glowColor: "rgba(244,63,94,0.15)",
    },
    {
      icon: Smile,
      title: "معلمون صبورون متخصصون",
      desc: "اختيار دقيق لمعلمين يمتلكون مهارات التعامل التربوي مع الأطفال بمختلف الأعمار.",
      gradient: "from-[#4A7DFF]/20 to-[#6E5BFF]/5",
      glowColor: "rgba(74,125,255,0.15)",
    },
    {
      icon: Target,
      title: "خطة حفظ وتجويد فردية",
      desc: "نصمم لكل طفل جدولاً يتناسب تماماً مع قدراته ومستواه الحالي لضمان الإتقان.",
      gradient: "from-[#D8B15B]/20 to-[#D8B15B]/5",
      glowColor: "rgba(216,177,91,0.15)",
    },
    {
      icon: ShieldAlert,
      title: "متابعة وتقييم مستمر",
      desc: "نحيط أولياء الأمور علما بكل تفاصيل الحفظ والتجويد عبر تقارير دورية منظمة.",
      gradient: "from-emerald-500/20 to-emerald-500/5",
      glowColor: "rgba(16,185,129,0.15)",
    },
    {
      icon: Sparkles,
      title: "أساليب تفاعلية حديثة",
      desc: "استخدام أدوات رقمية وسرد قصصي ممتع يجعل الحصة القرأنية تشويقاً ينتظره الطفل.",
      gradient: "from-[#7EC8FF]/20 to-[#4A7DFF]/5",
      glowColor: "rgba(126,200,255,0.15)",
    },
    {
      icon: Award,
      title: "مرونة كاملة في المواعيد",
      desc: "إمكانية اختيار الأوقات الأنسب لجدول أسرتك مع إمكانية التعديل بكل سهولة.",
      gradient: "from-[#6E5BFF]/20 to-[#A8B8FF]/5",
      glowColor: "rgba(110,91,255,0.15)",
    },
  ];

  return (
    <section id="why-us" className="py-28 relative z-10 overflow-hidden scroll-mt-24">
      {/* Section Background Glow */}
      <div className="absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-[#6E5BFF]/5 blur-[200px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-white/5 border border-white/10 text-[#7EC8FF] inline-block"
          >
            لماذا أنس القرآن؟
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl font-extrabold text-white"
          >
            تجربة قرأنية راقية تُراعي{" "}
            <span className="gradient-text-blue">طفلك وأسرتك</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-sm text-[#B8C3D9] leading-relaxed"
          >
            صممنا أنس القرآن لتكون الخيار الآمن والأرقى لأولياء الأمور الباحثين عن جودة التعليم الإيماني.
          </motion.p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="glass-card p-7 rounded-3xl relative group overflow-hidden"
              >
                {/* Subtle Hover Glow Line */}
                <div className="absolute top-0 right-0 left-0 h-[2px] bg-gradient-to-r from-transparent via-[#4A7DFF] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Inner Radial Glow on Hover */}
                <div
                  className="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                  style={{ background: `radial-gradient(circle, ${feature.glowColor} 0%, transparent 70%)` }}
                />

                {/* 3D Glassmorphism Icon */}
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${feature.gradient} border border-white/15 flex items-center justify-center mb-5 text-[#7EC8FF] group-hover:scale-110 group-hover:shadow-lg transition-all shadow-inner backdrop-blur-sm relative`}>
                  <IconComponent className="w-5 h-5 relative z-10" />
                  {/* Tiny gold dot accent */}
                  <div className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-[#D8B15B]/70" />
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#7EC8FF] transition-colors">
                  {feature.title}
                </h3>

                {/* Description (1 sentence) */}
                <p className="text-xs text-[#B8C3D9] leading-relaxed font-light">
                  {feature.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
