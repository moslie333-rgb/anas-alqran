"use client";

import React, { useState, useEffect } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { fetchFAQs, createFAQ, updateFAQ, deleteFAQ, FAQItem } from "@/lib/services/faqService";
import { ConfirmModal } from "@/components/admin/ConfirmModal";
import { Toast } from "@/components/admin/Toast";
import { Plus, Edit2, Trash2, HelpCircle, X } from "lucide-react";

export default function AdminFAQPage() {
  const [faqs, setFaqs] = useState<FAQItem[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);

  const [form, setForm] = useState({
    q: "",
    a: "",
    display_order: 1,
  });

  const loadFAQs = async () => {
    const data = await fetchFAQs();
    setFaqs(data);
  };

  useEffect(() => {
    loadFAQs();
  }, []);

  const openCreateModal = () => {
    setEditingId(null);
    setForm({ q: "", a: "", display_order: faqs.length + 1 });
    setModalOpen(true);
  };

  const openEditModal = (faq: FAQItem) => {
    setEditingId(faq.id || null);
    setForm({ q: faq.q, a: faq.a, display_order: faq.display_order || 1 });
    setModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      const { success, error } = await updateFAQ(editingId, form);
      if (success) {
        setToast({ msg: "تم تعديل السؤال بنجاح!", type: "success" });
        setModalOpen(false);
        loadFAQs();
      } else {
        setToast({ msg: error || "فشل التعديل", type: "error" });
      }
    } else {
      const { success, error } = await createFAQ(form);
      if (success) {
        setToast({ msg: "تم إضافة السؤال بنجاح!", type: "success" });
        setModalOpen(false);
        loadFAQs();
      } else {
        setToast({ msg: error || "فشل الإضافة", type: "error" });
      }
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTargetId) return;
    const { success, error } = await deleteFAQ(deleteTargetId);
    if (success) {
      setToast({ msg: "تم حذف السؤال بنجاح!", type: "success" });
      loadFAQs();
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
            <h1 className="text-2xl font-extrabold text-white">إدارة الأسئلة الشائعة</h1>
            <p className="text-xs text-[#B8C3D9] mt-1">تعديل وإضافة الأسئلة والإجابات الشائعة لدى أولياء الأمور</p>
          </div>
          <button
            onClick={openCreateModal}
            className="px-5 py-2.5 rounded-xl font-semibold text-xs text-white bg-gradient-to-r from-[#4A7DFF] to-[#6E5BFF] hover:shadow-lg transition-all flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>إضافة سؤال جديد</span>
          </button>
        </div>

        {/* FAQs List */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={faq.id || idx}
              className="p-5 rounded-3xl glass-card border border-white/10 flex flex-col sm:flex-row sm:items-start justify-between gap-4"
            >
              <div className="space-y-2 flex-1">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-[#7EC8FF]" />
                  <span>{faq.q}</span>
                </h3>
                <p className="text-xs text-[#B8C3D9] leading-relaxed pr-6">{faq.a}</p>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-start">
                <button
                  onClick={() => openEditModal(faq)}
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white"
                  title="تعديل"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                {faq.id && (
                  <button
                    onClick={() => setDeleteTargetId(faq.id!)}
                    className="p-2 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400"
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
            <div className="relative w-full max-w-lg bg-[#0C1829] border border-white/10 rounded-3xl p-6 shadow-2xl z-10 space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <h3 className="text-lg font-bold text-white">
                  {editingId ? "تعديل سؤال" : "إضافة سؤال جديد"}
                </h3>
                <button onClick={() => setModalOpen(false)} className="p-1 rounded-lg hover:bg-white/10 text-white/60">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block font-semibold text-[#B8C3D9] mb-1">السؤال</label>
                  <input
                    type="text"
                    required
                    value={form.q}
                    onChange={(e) => setForm({ ...form, q: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-[#4A7DFF]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#B8C3D9] mb-1">الإجابة التفصيلية</label>
                  <textarea
                    rows={4}
                    required
                    value={form.a}
                    onChange={(e) => setForm({ ...form, a: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-[#4A7DFF] leading-relaxed"
                  />
                </div>

                <div className="pt-3 border-t border-white/10 flex justify-end">
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-[#4A7DFF] to-[#6E5BFF] hover:shadow-lg transition-all"
                  >
                    حفظ السؤال
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <ConfirmModal
          isOpen={Boolean(deleteTargetId)}
          title="تأكيد حذف السؤال"
          message="هل أنت متأكد من حذف هذا السؤال من قائمة الأسئلة الشائعة؟"
          onConfirm={handleDeleteConfirm}
          onCancel={() => setDeleteTargetId(null)}
        />

        <Toast message={toast?.msg || null} type={toast?.type} onClose={() => setToast(null)} />
      </div>
    </AdminLayout>
  );
}
