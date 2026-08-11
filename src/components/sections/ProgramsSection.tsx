"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Clock, Users, ChevronLeft, Star, BookOpen, BookMarked, Languages, CheckCircle } from "lucide-react";

const WHATSAPP_URL = "https://wa.me/+96890618718";

/* ─── Easily editable program data ─── */
const PROGRAMS = [
  {
    title: "القاعدة النورانية والبراعم",
    icon: BookOpen,
    ageGroup: "4 - 8 سنوات",
    duration: "30 دقيقة / الحصة",
    desc: "تأسيس النطق الصحيح للحروف والقراءة القرأنية بأسلوب مبسط ومحبب للطفل.",
    tag: "تأسيس مبكر",
    tagColor: "from-emerald-500 to-emerald-600",
    iconGradient: "from-emerald-500/25 to-emerald-500/10",
    iconColor: "text-emerald-400",
    plans: ["القاعدة النورانية", "تهجئة الحروف", "تدريب مخارج الحروف"],
    /* Edit price here */
    price: "XX",
    currency: "ر.ع.",
    pricePer: "/ الحصة",
  },
  {
    title: "مسار التحفيظ والتجويد",
    icon: BookMarked,
    ageGroup: "8 - 15 سنة",
    duration: "45 دقيقة / الحصة",
    desc: "حفظ متقن مع تطبيق أحكام التجويد عملياً ومراجعة تثبيت دائم.",
    tag: "الأكثر إقبالاً",
    featured: true,
    tagColor: "from-[#4A7DFF] to-[#6E5BFF]",
    iconGradient: "from-[#4A7DFF]/25 to-[#6E5BFF]/10",
    iconColor: "text-[#7EC8FF]",
    plans: ["حفظ القرآن الكريم", "أحكام التجويد التطبيقي", "مراجعة وتثبيت الحفظ"],
    price: "XX",
    currency: "ر.ع.",
    pricePer: "/ الحصة",
  },
  {
    title: "اللغة العربية والفهم القرآني",
    icon: Languages,
    ageGroup: "جميع الأعمار",
    duration: "45 دقيقة / الحصة",
    desc: "فهم معاني الآيات وإتقان مفردات القرآن الكريم لتعميق الإيمان.",
    tag: "فهم وتدبر",
    tagColor: "from-[#D8B15B] to-amber-600",
    iconGradient: "from-[#D8B15B]/25 to-[#D8B15B]/10",
    iconColor: "text-[#D8B15B]",
    plans: ["اللغة العربية القرآنية", "فهم معاني الآيات", "التفسير الميسّر"],
    price: "XX",
    currency: "ر.ع.",
    pricePer: "/ الحصة",
  },
];

export function ProgramsSection() {
  return (
    <section id="programs" className="py-28 relative z-10 overflow-hidden">
      {/* Background Accents */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#6E5BFF]/5 rounded-full blur-[200px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#D8B15B]/5 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-white/5 border border-white/10 text-[#7EC8FF] inline-block"
          >
            البرامج التعليمية
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl font-extrabold text-white"
          >
            مسارات دراسية مُصممة{" "}
            <span className="gradient-text-purple">لكل مرحلة عمرية</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-sm text-[#B8C3D9]"
          >
            اختر المسار الأنسب لمستوى طفلك وابدأ الرحلة بحصة تجريبية مجانية.
          </motion.p>
        </div>

        {/* Programs Cards Grid — Icon-based, no images */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {PROGRAMS.map((program, index) => {
            const IconComponent = program.icon;
            return (
              <motion.div
                key={program.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`rounded-3xl flex flex-col justify-between relative group transition-all p-7 ${
                  program.featured
                    ? "pricing-card-featured shadow-2xl shadow-blue-900/30"
                    : "pricing-card"
                }`}
              >
                {/* Featured Border Glow */}
                {program.featured && (
                  <div className="absolute -inset-[1px] bg-gradient-to-b from-[#4A7DFF]/40 via-transparent to-[#6E5BFF]/40 rounded-3xl -z-10 blur-[1px]" />
                )}

                {/* Tag Badge */}
                <div className={`absolute top-5 left-5 z-10 px-3 py-1.5 rounded-full bg-gradient-to-r ${program.tagColor} text-[11px] font-bold text-white shadow-lg shadow-black/30 flex items-center gap-1.5 border border-white/20`}>
                  {program.featured ? <Sparkles className="w-3 h-3 text-[#D8B15B]" /> : <Star className="w-3 h-3" />}
                  {program.tag}
                </div>

                <div className="space-y-5">
                  {/* Icon */}
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${program.iconGradient} border border-white/15 flex items-center justify-center ${program.iconColor} group-hover:scale-110 group-hover:shadow-lg transition-all backdrop-blur-sm mt-6`}>
                    <IconComponent className="w-7 h-7" />
                  </div>

                  {/* Meta Pills */}
                  <div className="flex items-center gap-3 text-[11px] text-[#B8C3D9]">
                    <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-white/5 border border-white/10">
                      <Users className="w-3.5 h-3.5 text-[#7EC8FF]" />
                      <span>{program.ageGroup}</span>
                    </div>
                    <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-white/5 border border-white/10">
                      <Clock className="w-3.5 h-3.5 text-[#D8B15B]" />
                      <span>{program.duration}</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-white group-hover:text-[#7EC8FF] transition-colors">
                    {program.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-[#B8C3D9] leading-relaxed">
                    {program.desc}
                  </p>

                  {/* Plans List */}
                  <ul className="space-y-2 pt-2">
                    {program.plans.map((plan) => (
                      <li key={plan} className="flex items-center gap-2 text-xs text-[#B8C3D9]">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>{plan}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Price */}
                  <div className="pt-3 border-t border-white/10">
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-extrabold text-white">{program.price}</span>
                      <span className="text-sm text-[#B8C3D9]">{program.currency}</span>
                      <span className="text-xs text-[#7E8C9E]">{program.pricePer}</span>
                    </div>
                  </div>
                </div>

                {/* CTA Button */}
                <div className="pt-5">
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full py-3.5 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5 active:translate-y-0 ${
                      program.featured
                        ? "bg-gradient-to-r from-[#4A7DFF] to-[#6E5BFF] text-white hover:shadow-xl hover:shadow-blue-500/25 border border-white/15 shadow-lg shadow-blue-900/20"
                        : "bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-white/20"
                    }`}
                  >
                    <span>احجز حصتك التجريبية المجانية</span>
                    <ChevronLeft className="w-4 h-4" />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
