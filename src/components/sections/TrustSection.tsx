"use client";

import React from "react";
import { motion } from "framer-motion";
import { Award, Clock, ShieldCheck, FileCheck2 } from "lucide-react";

export function TrustSection() {
  const trustItems = [
    {
      icon: Award,
      title: "معلمون معتمدون بالإجازة",
      desc: "نُخبة مختارة بعناية من خريجي الأزهر الشريف أصحاب الإجازات القرآنية.",
      color: "from-[#D8B15B]/20 to-[#D8B15B]/5",
      iconColor: "text-[#D8B15B]",
      borderHover: "hover:border-[#D8B15B]/30",
    },
    {
      icon: ShieldCheck,
      title: "دروس فردية 1 لـ 1",
      desc: "تركيز كامل مع طفلك في بيئة تعليمية خاصة تراعي قدراته الفردية.",
      color: "from-[#4A7DFF]/20 to-[#6E5BFF]/5",
      iconColor: "text-[#7EC8FF]",
      borderHover: "hover:border-[#7EC8FF]/30",
    },
    {
      icon: Clock,
      title: "مواعيد مرنة للخليج",
      desc: "جداول دراسية متكاملة تتماشى تماماً مع أوقات المدارس في دول الخليج.",
      color: "from-[#6E5BFF]/20 to-[#4A7DFF]/5",
      iconColor: "text-[#A8B8FF]",
      borderHover: "hover:border-[#A8B8FF]/30",
    },
    {
      icon: FileCheck2,
      title: "تقارير إنجاز دورية",
      desc: "تقرير شهري شامل يصل ولي الأمر لمتابعة مستوى الحفظ والتجويد خطوة بخطوة.",
      color: "from-emerald-500/20 to-emerald-500/5",
      iconColor: "text-emerald-400",
      borderHover: "hover:border-emerald-400/30",
    },
  ];

  return (
    <section className="py-14 relative z-10 border-y border-white/5 bg-[#0C1829]/40 backdrop-blur-md overflow-hidden">
      {/* Subtle Background Accent */}
      <div className="absolute right-0 top-0 w-[400px] h-[200px] bg-[#4A7DFF]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {trustItems.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className={`p-5 rounded-2xl bg-white/[0.03] border border-white/10 ${item.borderHover} transition-all flex items-start gap-4 group relative overflow-hidden`}
              >
                {/* Subtle Top Glow Line */}
                <div className="absolute top-0 right-0 left-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                {/* 3D Glassmorphism Icon */}
                <div className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${item.color} border border-white/15 flex items-center justify-center shrink-0 group-hover:scale-110 transition-all group-hover:shadow-lg shadow-inner backdrop-blur-sm`}>
                  <IconComponent className={`w-5 h-5 ${item.iconColor}`} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white mb-1 group-hover:text-[#7EC8FF] transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-xs text-[#B8C3D9] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
