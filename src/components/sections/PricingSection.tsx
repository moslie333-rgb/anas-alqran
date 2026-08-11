"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Clock, Sparkles, Star, ChevronLeft, CheckCircle } from "lucide-react";
import { fetchPricingPackages, DEFAULT_PACKAGES, DBPackageItem } from "@/lib/services/pricingService";

const WHATSAPP_URL = "https://wa.me/+96890618718";

const DURATION_TABS = [
  { label: "30 دقيقة", value: 30 },
  { label: "45 دقيقة", value: 45 },
  { label: "60 دقيقة", value: 60 },
];

export function PricingSection() {
  const [activeDuration, setActiveDuration] = useState(45);
  const [packages, setPackages] = useState<Record<number, DBPackageItem[]>>(DEFAULT_PACKAGES);

  useEffect(() => {
    fetchPricingPackages().then((data) => {
      if (data && Object.keys(data).length > 0) {
        setPackages(data);
      }
    });
  }, []);

  const currentPackages = packages[activeDuration] || DEFAULT_PACKAGES[activeDuration];

  return (
    <section id="pricing" className="py-28 relative z-10 overflow-hidden scroll-mt-20">
      {/* Background Accents */}
      <div className="absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-[#4A7DFF]/5 blur-[200px] pointer-events-none" />
      <div className="absolute bottom-0 left-[10%] w-[400px] h-[400px] bg-[#D8B15B]/5 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-white/5 border border-white/10 text-[#D8B15B] inline-block"
          >
            الباقات والأسعار
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl font-extrabold text-white"
          >
            باقاتنا{" "}
            <span className="gradient-text-gold">التعليمية</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-sm text-[#B8C3D9]"
          >
            اختر مدة الحصة المناسبة لطفلك وعدد الحصص الشهرية التي تناسب جدولكم.
          </motion.p>
        </div>

        {/* Duration Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex items-center justify-center gap-3 mb-14"
        >
          {DURATION_TABS.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveDuration(tab.value)}
              className={`px-5 py-3 rounded-xl text-sm font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                activeDuration === tab.value
                  ? "bg-gradient-to-r from-[#4A7DFF] to-[#6E5BFF] text-white shadow-lg shadow-blue-900/30 border border-white/20"
                  : "bg-white/5 hover:bg-white/10 text-[#B8C3D9] hover:text-white border border-white/10"
              }`}
            >
              <Clock className="w-4 h-4 text-[#7EC8FF]" />
              <span>باقة {tab.label}</span>
            </button>
          ))}
        </motion.div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {currentPackages.map((pkg, index) => (
            <motion.div
              key={`${activeDuration}-${pkg.sessions_count}-${index}`}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`rounded-3xl p-7 flex flex-col justify-between relative group transition-all ${
                pkg.is_featured
                  ? "pricing-card-featured shadow-2xl shadow-blue-900/30"
                  : "pricing-card"
              }`}
            >
              {/* Featured Glow */}
              {pkg.is_featured && (
                <div className="absolute -inset-[1px] bg-gradient-to-b from-[#4A7DFF]/40 via-transparent to-[#6E5BFF]/40 rounded-3xl -z-10 blur-[1px]" />
              )}

              {/* Badge */}
              {pkg.badge && (
                <div className={`absolute top-5 left-5 px-3 py-1.5 rounded-full text-[11px] font-bold text-white shadow-lg shadow-black/30 flex items-center gap-1.5 border border-white/20 ${
                  pkg.is_featured
                    ? "bg-gradient-to-r from-[#4A7DFF] to-[#6E5BFF]"
                    : "bg-gradient-to-r from-[#D8B15B] to-amber-600"
                }`}>
                  {pkg.is_featured ? <Sparkles className="w-3 h-3 text-[#D8B15B]" /> : <Star className="w-3 h-3" />}
                  {pkg.badge}
                </div>
              )}

              <div className="space-y-5">
                {/* Duration Icon */}
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#4A7DFF]/20 to-[#6E5BFF]/10 border border-white/15 flex items-center justify-center text-[#7EC8FF] group-hover:scale-110 transition-all mt-6">
                  <Clock className="w-6 h-6" />
                </div>

                {/* Package Title */}
                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-[#7EC8FF] transition-colors">
                    باقة {activeDuration} دقيقة
                  </h3>
                  <p className="text-sm text-[#B8C3D9] mt-1">{pkg.label}</p>
                </div>

                {/* Features */}
                <ul className="space-y-2.5 pt-2">
                  <li className="flex items-center gap-2 text-xs text-[#B8C3D9]">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>حصص فردية 1 لـ 1 مع معلم معتمد</span>
                  </li>
                  <li className="flex items-center gap-2 text-xs text-[#B8C3D9]">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{pkg.sessions_count} حصص × {activeDuration} دقيقة شهرياً</span>
                  </li>
                  <li className="flex items-center gap-2 text-xs text-[#B8C3D9]">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>تقرير متابعة شهري</span>
                  </li>
                  <li className="flex items-center gap-2 text-xs text-[#B8C3D9]">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>مرونة في المواعيد والتعديل</span>
                  </li>
                </ul>

                {/* Price */}
                <div className="pt-4 border-t border-white/10">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-extrabold text-white">{pkg.price}</span>
                    <span className="text-sm font-semibold text-[#D8B15B] mr-1">{pkg.price_note}</span>
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
                    pkg.is_featured
                      ? "bg-gradient-to-r from-[#4A7DFF] to-[#6E5BFF] text-white hover:shadow-xl hover:shadow-blue-500/25 border border-white/15 shadow-lg shadow-blue-900/20"
                      : "bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-white/20"
                  }`}
                >
                  <span>اشترك الآن</span>
                  <ChevronLeft className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center text-xs text-[#7E8C9E] mt-10"
        >
          جميع الباقات تشمل حصة تجريبية مجانية • يمكنك تغيير الباقة في أي وقت
        </motion.p>
      </div>
    </section>
  );
}
