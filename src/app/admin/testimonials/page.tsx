"use client";

import React, { useState, useEffect } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { fetchReviews, createReview, deleteReview, ReviewItem } from "@/lib/services/reviewsService";
import { uploadMediaFile } from "@/lib/services/mediaService";
import { ConfirmModal } from "@/components/admin/ConfirmModal";
import { Toast } from "@/components/admin/Toast";
import { Plus, Trash2, Upload, MessageSquareQuote, Sparkles, X, Image as ImageIcon } from "lucide-react";
import Image from "next/image";

export default function AdminTestimonialsPage() {
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);
  const [uploading, setUploading] = useState(false);

  const [form, setForm] = useState({
    image_url: "",
    alt: "تقييم ولي أمر لأكاديمية أنس القرآن",
    parent_name: "",
    display_order: 1,
  });

  const loadReviews = async () => {
    const data = await fetchReviews();
    setReviews(data);
  };

  useEffect(() => {
    loadReviews();
  }, []);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    setUploading(true);
    const { url, error } = await uploadMediaFile(file);
    setUploading(false);
    if (url) {
      setForm((prev) => ({ ...prev, image_url: url }));
      setToast({ msg: "تم رفع صورة التقييم بنجاح!", type: "success" });
    } else {
      setToast({ msg: error || "فشل رفع الصورة", type: "error" });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.image_url) {
      setToast({ msg: "يرجى اختيار أو رفع صورة أولاً", type: "error" });
      return;
    }

    const { success, error } = await createReview(form);
    if (success) {
      setToast({ msg: "تم إضافة التقييم بنجاح!", type: "success" });
      setModalOpen(false);
      loadReviews();
    } else {
      setToast({ msg: error || "فشل الإضافة", type: "error" });
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTargetId) return;
    const { success, error } = await deleteReview(deleteTargetId);
    if (success) {
      setToast({ msg: "تم حذف التقييم بنجاح!", type: "success" });
      loadReviews();
    } else {
      setToast({ msg: error || "فشل الحذف", type: "error" });
    }
    setDeleteTargetId(null);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-white">إدارة تقييمات أولياء الأمور</h1>
            <p className="text-xs text-[#B8C3D9] mt-1">رفع وإدارة لقطات شاشة المحادثات المعروضة في شريط التقييمات التفاعلي</p>
          </div>
          <button
            onClick={() => {
              setForm({ image_url: "", alt: "تقييم ولي أمر لأكاديمية أنس القرآن", parent_name: "", display_order: reviews.length + 1 });
              setModalOpen(true);
            }}
            className="px-5 py-2.5 rounded-xl font-semibold text-xs text-white bg-gradient-to-r from-[#4A7DFF] to-[#6E5BFF] hover:shadow-lg transition-all flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>رفع تقييم جديد</span>
          </button>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {reviews.map((rev, idx) => (
            <div
              key={rev.id || idx}
              className="rounded-3xl glass-card border border-white/10 p-3 relative group space-y-3"
            >
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-white/5">
                <Image src={rev.src} alt={rev.alt} fill className="object-cover" />
              </div>
              <div className="flex items-center justify-between px-1">
                <span className="text-[11px] text-[#B8C3D9] font-medium truncate max-w-[150px]">
                  {rev.parent_name || rev.alt}
                </span>
                {rev.id && (
                  <button
                    onClick={() => setDeleteTargetId(rev.id!)}
                    className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 transition-colors"
                    title="حذف"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Modal Form */}
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div onClick={() => setModalOpen(false)} className="fixed inset-0 bg-[#07111F]/80 backdrop-blur-md" />
            <div className="relative w-full max-w-md bg-[#0C1829] border border-white/10 rounded-3xl p-6 shadow-2xl z-10 space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <h3 className="text-lg font-bold text-white">إضافة صورة تقييم جديدة</h3>
                <button onClick={() => setModalOpen(false)} className="p-1 rounded-lg hover:bg-white/10 text-white/60">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block font-semibold text-[#B8C3D9] mb-1">صورة التقييم (رابط أو رفع)</label>
                  <div className="flex items-center gap-3">
                    <input
                      type="text"
                      required
                      placeholder="/images/reviews/review-1.jpg"
                      value={form.image_url}
                      onChange={(e) => setForm({ ...form, image_url: e.target.value })}
                      className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-[#4A7DFF]"
                    />
                    <label className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold cursor-pointer flex items-center gap-2">
                      <Upload className="w-4 h-4 text-[#7EC8FF]" />
                      <span>{uploading ? "رفع..." : "اختر"}</span>
                      <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-[#B8C3D9] mb-1">اسم ولي الأمر / التوصيف</label>
                  <input
                    type="text"
                    placeholder="مثال: أم عبد الله - سلطنة عمان"
                    value={form.parent_name}
                    onChange={(e) => setForm({ ...form, parent_name: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-[#4A7DFF]"
                  />
                </div>

                <div className="pt-3 border-t border-white/10 flex justify-end">
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-[#4A7DFF] to-[#6E5BFF] hover:shadow-lg transition-all"
                  >
                    حفظ التقييم
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <ConfirmModal
          isOpen={Boolean(deleteTargetId)}
          title="تأكيد حذف التقييم"
          message="هل أنت متأكد من حذف صورة هذا التقييم؟"
          onConfirm={handleDeleteConfirm}
          onCancel={() => setDeleteTargetId(null)}
        />

        <Toast message={toast?.msg || null} type={toast?.type} onClose={() => setToast(null)} />
      </div>
    </AdminLayout>
  );
}
