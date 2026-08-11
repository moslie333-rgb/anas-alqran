"use client";

import React from "react";
import { motion } from "framer-motion";
import { UserPlus, Sparkles, CalendarCheck, Rocket } from "lucide-react";

const WHATSAPP_URL = "https://wa.me/+96890618718";

export function HowItWorks() {
  const steps = [
    {
      number: "01",
      icon: UserPlus,
      title: "طلب الحصة التجريبية",
      desc: "تعبئة نموذج بسيط في أقل من دقيقة لتحديد عمر طفلك ومستواه المبدئي.",
    },
    {
      number: "02",
      icon: Sparkles,
      title: "الحصة التجريبية 1 لـ 1",
      desc: "لقاء ممتع أونلاين يتعرف فيه المعلم على الطفل ويحدد خطته الدراسية.",
    },
    {
      number: "03",
      icon: CalendarCheck,
      title: "اختيار الجدول والمعلم",
      desc: "تحديد المواعيد الأنسب لأوقات أسرتك واختيار المعلم المفضل.",
    },
    {
      number: "04",
      icon: Rocket,
      title: "انطلاق الرحلة القرأنية",
      desc: "بدء الدروس بانتظام مع تلقي تقارير متابعة دورية عبر الواتساب.",
    },
  ];

  return (
    <section id="how-it-works" className="py-28 relative z-10 overflow-hidden scroll-mt-24">
      {/* Background Accent Glow */}
      <div className="absolute top-0 right-1/2 translate-x-1/2 w-[600px] h-[600px] rounded-full bg-[#4A7DFF]/8 blur-[200px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-20 space-y-3">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-white/5 border border-white/10 text-[#7EC8FF] inline-block"
          >
            خطوات بسيطة
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl font-extrabold text-white"
          >
            كيف تبدأ رحلة طفلك مع{" "}
            <span className="gradient-text-blue">أنس القرآن؟</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-sm text-[#B8C3D9]"
          >
            4 خطوات سريعة ونبدأ في صناعة الأثر الإيجابي الإيماني في حياة طفلك.
          </motion.p>
        </div>

        {/* Steps Grid — No images, clean layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          
          {/* Subtle Connecting Line on Desktop */}
          <div className="hidden lg:block absolute top-[60px] left-16 right-16 h-[1px] bg-gradient-to-r from-[#4A7DFF]/30 via-[#6E5BFF]/30 to-[#D8B15B]/20 z-0" />

          {steps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.12 }}
                className="glass-card rounded-3xl p-6 relative z-10 flex flex-col group hover:border-[#7EC8FF]/40 transition-all"
              >
                {/* Step Number Badge */}
                <div className="w-10 h-10 rounded-xl bg-[#07111F]/80 backdrop-blur-xl border border-white/15 flex items-center justify-center shadow-lg shadow-black/40 mb-5">
                  <span className="text-sm font-black text-[#D8B15B] font-mono">{step.number}</span>
                </div>

                {/* 3D Glassmorphism Icon */}
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#4A7DFF]/25 to-[#6E5BFF]/15 border border-white/15 flex items-center justify-center text-[#7EC8FF] mb-5 shadow-inner shadow-blue-500/5 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-blue-500/20 transition-all backdrop-blur-sm">
                  <IconComponent className="w-5 h-5" />
                </div>

                <h3 className="text-base font-bold text-white mb-2 group-hover:text-[#7EC8FF] transition-colors">
                  {step.title}
                </h3>

                <p className="text-xs text-[#B8C3D9] leading-relaxed font-light flex-1">
                  {step.desc}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-14"
        >
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 rounded-2xl text-sm font-bold text-white bg-gradient-to-r from-[#4A7DFF] via-[#6E5BFF] to-[#4A7DFF] hover:shadow-xl hover:shadow-blue-500/25 transition-all inline-flex items-center gap-2.5 border border-white/10 transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <span>ابدأ الخطوة الأولى الآن (مجاناً)</span>
            <Sparkles className="w-4 h-4 text-[#D8B15B]" />
          </a>
        </motion.div>

      </div>
    </section>
  );
}
