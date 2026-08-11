"use client";

import React, { useState, useEffect } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { fetchAcademySettings, updateAcademySettings, AcademySettings, DEFAULT_ACADEMY_SETTINGS } from "@/lib/services/academyService";
import { uploadMediaFile } from "@/lib/services/mediaService";
import { Toast } from "@/components/admin/Toast";
import { Settings, Sparkles, Phone, MessageCircle, Upload, Save, Award, Users, Star, Loader2 } from "lucide-react";
import Image from "next/image";

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<AcademySettings>(DEFAULT_ACADEMY_SETTINGS);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);

  useEffect(() => {
    fetchAcademySettings().then((data) => {
      if (data) setSettings(data);
    });
  }, []);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    setUploading(true);
    const { url, error } = await uploadMediaFile(file);
    setUploading(false);
    if (url) {
      setSettings((prev) => ({ ...prev, hero_image_url: url }));
      setToast({ msg: "تم رفع صورة الـ Hero بنجاح!", type: "success" });
    } else {
      setToast({ msg: error || "فشل رفع الصورة", type: "error" });
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { success, error } = await updateAcademySettings(settings);
    setLoading(false);
    if (success) {
      setToast({ msg: "تم حفظ إعدادات الأكاديمية بنجاح!", type: "success" });
    } else {
      setToast({ msg: error || "فشل الحفظ", type: "error" });
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6 max-w-4xl">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-extrabold text-white">إعدادات الأكاديمية والموقع</h1>
          <p className="text-xs text-[#B8C3D9] mt-1">تعديل نصوص الـ Hero، الإحصائيات، أرقام الواتساب وروابط التواصل الاجتماعي المباشرة</p>
        </div>

        <form onSubmit={handleSave} className="space-y-6">
          {/* Section 1: Hero Section Content */}
          <div className="p-6 rounded-3xl glass-card border border-white/10 space-y-4">
            <h2 className="text-base font-bold text-white flex items-center gap-2 border-b border-white/10 pb-3">
              <Sparkles className="w-5 h-5 text-[#D8B15B]" />
              <span>محتوى الواجهة الرئيسية (Hero Section)</span>
            </h2>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-[#B8C3D9] mb-1">العنوان الرئيسي (Hero Title)</label>
                <input
                  type="text"
                  required
                  value={settings.hero_title}
                  onChange={(e) => setSettings({ ...settings, hero_title: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-[#4A7DFF]"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#B8C3D9] mb-1">الوصف الفرعي (Hero Subtitle)</label>
                <textarea
                  rows={3}
                  required
                  value={settings.hero_subtitle}
                  onChange={(e) => setSettings({ ...settings, hero_subtitle: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-[#4A7DFF] leading-relaxed"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#B8C3D9] mb-1">صورة الـ Hero الرئيسية</label>
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    required
                    value={settings.hero_image_url}
                    onChange={(e) => setSettings({ ...settings, hero_image_url: e.target.value })}
                    className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-[#4A7DFF]"
                  />
                  <label className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold cursor-pointer flex items-center gap-2">
                    <Upload className="w-4 h-4 text-[#7EC8FF]" />
                    <span>{uploading ? "جاري الرفع..." : "رفع صورة"}</span>
                    <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Academy Statistics */}
          <div className="p-6 rounded-3xl glass-card border border-white/10 space-y-4">
            <h2 className="text-base font-bold text-white flex items-center gap-2 border-b border-white/10 pb-3">
              <Award className="w-5 h-5 text-[#7EC8FF]" />
              <span>إحصائيات الأكاديمية ومؤشرات الثقة</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div>
                <label className="block font-semibold text-[#B8C3D9] mb-1">المعلمون المعتمدون</label>
                <input
                  type="text"
                  required
                  value={settings.trust_certified_teachers_count}
                  onChange={(e) => setSettings({ ...settings, trust_certified_teachers_count: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-[#4A7DFF]"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#B8C3D9] mb-1">عدد الحصص المكتملة</label>
                <input
                  type="text"
                  required
                  value={settings.trust_completed_lessons_count}
                  onChange={(e) => setSettings({ ...settings, trust_completed_lessons_count: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-[#4A7DFF]"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#B8C3D9] mb-1">نسبة التقييم العام</label>
                <input
                  type="text"
                  required
                  value={settings.trust_satisfaction_rating}
                  onChange={(e) => setSettings({ ...settings, trust_satisfaction_rating: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-[#4A7DFF]"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Contact & Social Media Links */}
          <div className="p-6 rounded-3xl glass-card border border-white/10 space-y-4">
            <h2 className="text-base font-bold text-white flex items-center gap-2 border-b border-white/10 pb-3">
              <MessageCircle className="w-5 h-5 text-emerald-400" />
              <span>بيانات التواصل الاجتماعي والواتساب</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-semibold text-[#B8C3D9] mb-1">رقم الواتساب الرسمي</label>
                <input
                  type="text"
                  required
                  value={settings.whatsapp_number}
                  onChange={(e) => setSettings({ ...settings, whatsapp_number: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-[#4A7DFF]"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#B8C3D9] mb-1">رابط الواتساب (https://wa.me/...)</label>
                <input
                  type="text"
                  required
                  value={settings.whatsapp_url}
                  onChange={(e) => setSettings({ ...settings, whatsapp_url: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-[#4A7DFF]"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#B8C3D9] mb-1">رابط الانستغرام (Instagram URL)</label>
                <input
                  type="text"
                  required
                  value={settings.instagram_url}
                  onChange={(e) => setSettings({ ...settings, instagram_url: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-[#4A7DFF]"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#B8C3D9] mb-1">رابط الفيسبوك (Facebook URL)</label>
                <input
                  type="text"
                  required
                  value={settings.facebook_url}
                  onChange={(e) => setSettings({ ...settings, facebook_url: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-[#4A7DFF]"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-3.5 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-[#4A7DFF] via-[#6E5BFF] to-[#4A7DFF] hover:shadow-xl transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>جاري الحفظ...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>حفظ جميع الإعدادات</span>
                </>
              )}
            </button>
          </div>
        </form>

        <Toast message={toast?.msg || null} type={toast?.type} onClose={() => setToast(null)} />
      </div>
    </AdminLayout>
  );
}
