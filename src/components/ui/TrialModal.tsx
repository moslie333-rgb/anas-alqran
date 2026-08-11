"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, Sparkles, MessageCircle, Calendar, ShieldCheck, User, Phone, BookOpen, Loader2 } from "lucide-react";
import { submitTrialLead } from "@/lib/services/leadsService";

interface TrialModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function TrialModal({ isOpen, onClose }: TrialModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    parentName: "",
    phone: "",
    country: "KSA",
    studentAge: "7-10 سنوات",
    program: "تحفيظ وتجويد",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    await submitTrialLead({
      parent_name: formData.parentName,
      phone: formData.phone,
      country: formData.country,
      student_age: formData.studentAge,
      program: formData.program,
    });

    setSubmitting(false);
    setSubmitted(true);
  };

  const resetForm = () => {
    setSubmitted(false);
    setSubmitting(false);
    onClose();
  };

  const whatsappMessage = encodeURIComponent(
    `السلام عليكم، أود حجز حصة تجريبية مجانية لـ أنس القرآن.\nالاسم: ${formData.parentName || "ولي أمر"}\nرقم التواصل: ${formData.phone}\nعمر الطفل: ${formData.studentAge}\nالبرنامج: ${formData.program}`
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={resetForm}
            className="fixed inset-0 bg-[#07111F]/80 backdrop-blur-md"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative w-full max-w-lg bg-[#0C1829] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-blue-900/30 z-10 overflow-hidden"
          >
            {/* Ambient Corner Glow */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-[#4A7DFF]/20 to-transparent rounded-bl-full pointer-events-none" />
            
            {/* Close Button */}
            <button
              onClick={resetForm}
              className="absolute top-5 left-5 p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors"
              aria-label="إغلاق"
            >
              <X className="w-5 h-5" />
            </button>

            {!submitted ? (
              <div>
                {/* Header */}
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-3 py-1 text-xs font-semibold rounded-full bg-[#D8B15B]/10 text-[#D8B15B] border border-[#D8B15B]/20 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    حصة تجريبية مجانية 100%
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  احجز حصة طفلك التجريبية الآن
                </h3>
                <p className="text-sm text-[#B8C3D9] mb-6 leading-relaxed">
                  احصل على تقييم مباشر مع معلم معتمد مجاناً وبدون أي التزام.
                </p>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Parent Name */}
                  <div>
                    <label className="block text-xs font-medium text-[#B8C3D9] mb-1.5 flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-[#7EC8FF]" />
                      اسم ولي الأمر
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="أدخل اسمك الكريم"
                      value={formData.parentName}
                      onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#4A7DFF] focus:ring-1 focus:ring-[#4A7DFF] transition-all"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-xs font-medium text-[#B8C3D9] mb-1.5 flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-[#7EC8FF]" />
                      رقم الواتساب (لإرسال موعد الحصة)
                    </label>
                    <div className="flex gap-2">
                      <select
                        value={formData.country}
                        onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                        className="bg-white/5 border border-white/10 rounded-xl px-3 py-3 text-xs text-white focus:outline-none focus:border-[#4A7DFF]"
                      >
                        <option value="KSA" className="bg-[#0C1829]">🇸🇦 السعودية (+966)</option>
                        <option value="UAE" className="bg-[#0C1829]">🇦🇪 الإمارات (+971)</option>
                        <option value="QAT" className="bg-[#0C1829]">🇶🇦 قطر (+974)</option>
                        <option value="KWT" className="bg-[#0C1829]">🇰🇼 الكويت (+965)</option>
                        <option value="OMN" className="bg-[#0C1829]">🇴🇲 عمان (+968)</option>
                        <option value="BHR" className="bg-[#0C1829]">🇧🇭 البحرين (+973)</option>
                      </select>
                      <input
                        type="tel"
                        required
                        placeholder="5X XXX XXXX"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#4A7DFF] focus:ring-1 focus:ring-[#4A7DFF] transition-all"
                      />
                    </div>
                  </div>

                  {/* Student Age */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-[#B8C3D9] mb-1.5 flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-[#7EC8FF]" />
                        عمر الطفل
                      </label>
                      <select
                        value={formData.studentAge}
                        onChange={(e) => setFormData({ ...formData, studentAge: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-3 text-xs text-white focus:outline-none focus:border-[#4A7DFF]"
                      >
                        <option value="4-6 سنوات" className="bg-[#0C1829]">4 - 6 سنوات (براعم)</option>
                        <option value="7-10 سنوات" className="bg-[#0C1829]">7 - 10 سنوات</option>
                        <option value="11-15 سنة" className="bg-[#0C1829]">11 - 15 سنة</option>
                        <option value="أكبر من 15" className="bg-[#0C1829]">ناشئة وكبار</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-[#B8C3D9] mb-1.5 flex items-center gap-1.5">
                        <BookOpen className="w-3.5 h-3.5 text-[#7EC8FF]" />
                        البرنامج
                      </label>
                      <select
                        value={formData.program}
                        onChange={(e) => setFormData({ ...formData, program: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-3 text-xs text-white focus:outline-none focus:border-[#4A7DFF]"
                      >
                        <option value="القاعدة النورانية" className="bg-[#0C1829]">القاعدة النورانية</option>
                        <option value="تحفيظ وتجويد" className="bg-[#0C1829]">حفظ وتجويد القرآن</option>
                        <option value="اللغة العربية القرأنية" className="bg-[#0C1829]">اللغة العربية القرأنية</option>
                      </select>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full mt-4 py-4 px-6 rounded-xl font-semibold text-white bg-gradient-to-r from-[#4A7DFF] via-[#6E5BFF] to-[#4A7DFF] bg-size-200 hover:shadow-lg hover:shadow-blue-500/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-white" />
                        <span>جاري حفظ الطلب...</span>
                      </>
                    ) : (
                      <>
                        <span>تاكيد حجز الحصة المجانية</span>
                        <Sparkles className="w-4 h-4 text-[#D8B15B]" />
                      </>
                    )}
                  </button>

                  <div className="flex items-center justify-center gap-2 pt-2 text-xs text-[#B8C3D9]">
                    <ShieldCheck className="w-4 h-4 text-[#7EC8FF]" />
                    <span>خصوصية تامّة • لا يلزم وجود بطاقة إئتمان</span>
                  </div>
                </form>
              </div>
            ) : (
              /* Success State */
              <div className="text-center py-6">
                <div className="w-16 h-16 rounded-full bg-[#4A7DFF]/20 border border-[#4A7DFF]/40 text-[#7EC8FF] flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-[#7EC8FF]" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">تم استلام طلبكم بنجاح!</h3>
                <p className="text-sm text-[#B8C3D9] mb-6 max-w-sm mx-auto leading-relaxed">
                  سيقوم مشرف الأكاديمية بالتواصل معكم عبر الواتساب خلال دقائق لتأكيد الموعد المناسب لطفلكم.
                </p>

                <div className="space-y-3">
                  <a
                    href={`https://wa.me/+96890618718?text=${whatsappMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 px-6 rounded-xl font-semibold text-white bg-emerald-600 hover:bg-emerald-500 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/30"
                  >
                    <MessageCircle className="w-5 h-5 fill-current" />
                    <span>فتح محادثة الواتساب المباشرة الآن</span>
                  </a>

                  <button
                    onClick={resetForm}
                    className="w-full py-3 px-6 rounded-xl text-xs font-medium text-[#B8C3D9] hover:text-white transition-colors"
                  >
                    العودة للموقع الرئيسي
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
