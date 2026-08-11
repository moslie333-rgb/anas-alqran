"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle, MessageCircle } from "lucide-react";
import { fetchFAQs, DEFAULT_FAQS, FAQItem } from "@/lib/services/faqService";

const WHATSAPP_URL = "https://wa.me/+96890618718";

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [faqs, setFaqs] = useState<FAQItem[]>(DEFAULT_FAQS);

  useEffect(() => {
    fetchFAQs().then((data) => {
      if (data && data.length > 0) {
        setFaqs(data);
      }
    });
  }, []);

  return (
    <section id="faq" className="py-20 sm:py-28 relative z-10 scroll-mt-24 w-full">
      {/* Ambient Background */}
      <div className="absolute bottom-0 right-1/4 w-[300px] sm:w-[400px] h-[300px] sm:h-[400px] rounded-full bg-[#6E5BFF]/5 blur-[180px] pointer-events-none" />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        {/* Header */}
        <div className="text-center space-y-3 mb-10 sm:mb-16">
          <span className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-white/5 border border-white/10 text-[#7EC8FF] inline-block">
            إجابات شائعة
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
            الأسئلة الشائعة لدى <span className="gradient-text-purple">أولياء الأمور</span>
          </h2>
          <p className="text-xs sm:text-sm text-[#B8C3D9]">
            كل ما تود معرفته عن نظام الدراسة والحصص التجريبية في أنس القرآن.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3 sm:space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={`${faq.q}-${index}`}
                className="glass-card rounded-2xl overflow-hidden border border-white/10 transition-colors w-full"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full p-4 sm:p-6 text-right flex items-center justify-between gap-3 sm:gap-4 cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm sm:text-base font-bold text-white hover:text-[#7EC8FF] transition-colors leading-snug">
                    {faq.q}
                  </span>
                  <div
                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0 transition-transform ${
                      isOpen ? "rotate-180 bg-[#4A7DFF]/20 text-[#7EC8FF]" : "text-[#B8C3D9]"
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 pb-4 sm:px-6 sm:pb-6 text-xs sm:text-sm text-[#B8C3D9] leading-relaxed border-t border-white/5 pt-3 sm:pt-4">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Bottom Contact Help CTA */}
        <div className="mt-8 sm:mt-12 text-center p-5 sm:p-6 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-right">
            <HelpCircle className="w-5 h-5 sm:w-6 sm:h-6 text-[#7EC8FF] shrink-0" />
            <div>
              <p className="text-xs font-bold text-white">لديك سؤال آخر وتريد إجابة فورية؟</p>
              <p className="text-[11px] text-[#B8C3D9]">فريق الدعم القرآني متواجد عبر الواتساب للرد الفوري.</p>
            </div>
          </div>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-white/10 hover:bg-emerald-500/20 hover:border-emerald-500/30 border border-white/10 transition-all flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
            <span>تواصل عبر الواتساب</span>
          </a>
        </div>

      </div>
    </section>
  );
}
