"use client";

import React, { useState, useEffect } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { fetchPricingPackages, createPricingPackage, updatePricingPackage, deletePricingPackage, DBPackageItem } from "@/lib/services/pricingService";
import { ConfirmModal } from "@/components/admin/ConfirmModal";
import { Toast } from "@/components/admin/Toast";
import { Plus, Edit2, Trash2, DollarSign, Clock, Sparkles, X } from "lucide-react";

export default function AdminPricingPage() {
  const [groupedPackages, setGroupedPackages] = useState<Record<number, DBPackageItem[]>>({ 30: [], 45: [], 60: [] });
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);

  const [form, setForm] = useState<DBPackageItem>({
    duration_minutes: 45,
    sessions_count: 8,
    label: "8 حصص شهرياً",
    price: "9.5",
    price_note: "ر.ع. / الشهر",
    badge: "الأكثر طلباً",
    is_featured: true,
    display_order: 1,
  });

  const loadPackages = async () => {
    const data = await fetchPricingPackages();
    setGroupedPackages(data);
  };

  useEffect(() => {
    loadPackages();
  }, []);

  const openCreateModal = () => {
    setEditingId(null);
    setForm({
      duration_minutes: 45,
      sessions_count: 8,
      label: "8 حصص شهرياً",
      price: "9.5",
      price_note: "ر.ع. / الشهر",
      badge: "الأكثر طلباً",
      is_featured: true,
      display_order: 1,
    });
    setModalOpen(true);
  };

  const openEditModal = (pkg: DBPackageItem) => {
    setEditingId(pkg.id || null);
    setForm({ ...pkg });
    setModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      const { success, error } = await updatePricingPackage(editingId, form);
      if (success) {
        setToast({ msg: "تم تعديل الباقة بنجاح!", type: "success" });
        setModalOpen(false);
        loadPackages();
      } else {
        setToast({ msg: error || "فشل التعديل", type: "error" });
      }
    } else {
      const { success, error } = await createPricingPackage(form);
      if (success) {
        setToast({ msg: "تم إضافة الباقة بنجاح!", type: "success" });
        setModalOpen(false);
        loadPackages();
      } else {
        setToast({ msg: error || "فشل الإضافة", type: "error" });
      }
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTargetId) return;
    const { success, error } = await deletePricingPackage(deleteTargetId);
    if (success) {
      setToast({ msg: "تم حذف الباقة بنجاح!", type: "success" });
      loadPackages();
    } else {
      setToast({ msg: error || "فشل الحذف", type: "error" });
    }
    setDeleteTargetId(null);
  };

  const allPackagesList = Object.entries(groupedPackages).flatMap(([dur, list]) =>
    list.map((p) => ({ ...p, duration_minutes: Number(dur) }))
  );

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-white">إدارة الباقات والأسعار</h1>
            <p className="text-xs text-[#B8C3D9] mt-1">تعديل وإضافة أسعار باقات الـ 30 و45 و60 دقيقة المباشرة على الموقع</p>
          </div>
          <button
            onClick={openCreateModal}
            className="px-5 py-2.5 rounded-xl font-semibold text-xs text-white bg-gradient-to-r from-[#4A7DFF] to-[#6E5BFF] hover:shadow-lg transition-all flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>إضافة باقة جديدة</span>
          </button>
        </div>

        {/* Packages Table */}
        <div className="rounded-3xl glass-card border border-white/10 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-right text-xs text-[#B8C3D9]">
              <thead className="bg-white/5 text-white font-bold border-b border-white/10">
                <tr>
                  <th className="p-4">مدة الحصة</th>
                  <th className="p-4">عدد الحصص</th>
                  <th className="p-4">الوصف</th>
                  <th className="p-4">السعر</th>
                  <th className="p-4">الشارة (Badge)</th>
                  <th className="p-4">مُميزة (Featured)</th>
                  <th className="p-4 text-center">التحكم</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {allPackagesList.length > 0 ? (
                  allPackagesList.map((pkg, idx) => (
                    <tr key={pkg.id || idx} className="hover:bg-white/[0.02]">
                      <td className="p-4 font-bold text-white">
                        <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 flex items-center gap-1.5 w-max">
                          <Clock className="w-3.5 h-3.5 text-[#7EC8FF]" />
                          <span>{pkg.duration_minutes} دقيقة</span>
                        </span>
                      </td>
                      <td className="p-4 font-bold text-white">{pkg.sessions_count} حصص</td>
                      <td className="p-4">{pkg.label}</td>
                      <td className="p-4 font-extrabold text-[#D8B15B]">
                        {pkg.price} {pkg.price_note}
                      </td>
                      <td className="p-4">
                        {pkg.badge ? (
                          <span className="px-2 py-0.5 rounded text-[10px] bg-amber-500/20 text-amber-300 border border-amber-500/30">
                            {pkg.badge}
                          </span>
                        ) : (
                          <span className="text-[#7E8C9E]">-</span>
                        )}
                      </td>
                      <td className="p-4">
                        {pkg.is_featured ? (
                          <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                            نعم
                          </span>
                        ) : (
                          <span className="text-[#7E8C9E]">لا</span>
                        )}
                      </td>
                      <td className="p-4">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => openEditModal(pkg)}
                            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white"
                            title="تعديل"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          {pkg.id && (
                            <button
                              onClick={() => setDeleteTargetId(pkg.id!)}
                              className="p-2 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400"
                              title="حذف"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="p-8 text-center text-[#7E8C9E]">
                      لا توجد باقات مضافة بعد
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal Form */}
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div onClick={() => setModalOpen(false)} className="fixed inset-0 bg-[#07111F]/80 backdrop-blur-md" />
            <div className="relative w-full max-w-lg bg-[#0C1829] border border-white/10 rounded-3xl p-6 shadow-2xl z-10 space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <h3 className="text-lg font-bold text-white">
                  {editingId ? "تعديل باقة" : "إضافة باقة جديدة"}
                </h3>
                <button onClick={() => setModalOpen(false)} className="p-1 rounded-lg hover:bg-white/10 text-white/60">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-[#B8C3D9] mb-1">مدة الحصة (بالدقيقة)</label>
                    <select
                      value={form.duration_minutes}
                      onChange={(e) => setForm({ ...form, duration_minutes: Number(e.target.value) })}
                      className="w-full bg-[#0C1829] border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-[#4A7DFF]"
                    >
                      <option value={30}>30 دقيقة</option>
                      <option value={45}>45 دقيقة</option>
                      <option value={60}>60 دقيقة</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-semibold text-[#B8C3D9] mb-1">عدد الحصص الشهري</label>
                    <input
                      type="number"
                      required
                      value={form.sessions_count}
                      onChange={(e) => setForm({ ...form, sessions_count: Number(e.target.value) })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-[#4A7DFF]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-[#B8C3D9] mb-1">عنوان الباقة (Label)</label>
                  <input
                    type="text"
                    required
                    value={form.label}
                    onChange={(e) => setForm({ ...form, label: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-[#4A7DFF]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-[#B8C3D9] mb-1">السعر (مثال: 9.5)</label>
                    <input
                      type="text"
                      required
                      value={form.price}
                      onChange={(e) => setForm({ ...form, price: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-[#4A7DFF]"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-[#B8C3D9] mb-1">ملاحظة السعر</label>
                    <input
                      type="text"
                      required
                      value={form.price_note}
                      onChange={(e) => setForm({ ...form, price_note: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-[#4A7DFF]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-[#B8C3D9] mb-1">الشارة الترويجية (Badge - اختياري)</label>
                  <input
                    type="text"
                    placeholder="مثال: الأكثر طلباً"
                    value={form.badge || ""}
                    onChange={(e) => setForm({ ...form, badge: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-[#4A7DFF]"
                  />
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-white/10">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.is_featured}
                      onChange={(e) => setForm({ ...form, is_featured: e.target.checked })}
                      className="rounded bg-white/10 border-white/20 text-[#4A7DFF]"
                    />
                    <span className="text-white font-semibold">باقة مُميزة (Featured)</span>
                  </label>

                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-[#4A7DFF] to-[#6E5BFF] hover:shadow-lg transition-all"
                  >
                    حفظ الباقة
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <ConfirmModal
          isOpen={Boolean(deleteTargetId)}
          title="تأكيد حذف الباقة"
          message="هل أنت متأكد من حذف هذه الباقة؟"
          onConfirm={handleDeleteConfirm}
          onCancel={() => setDeleteTargetId(null)}
        />

        <Toast message={toast?.msg || null} type={toast?.type} onClose={() => setToast(null)} />
      </div>
    </AdminLayout>
  );
}
