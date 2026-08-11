"use client";

import React, { useState, useEffect } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { fetchAllArticles, createArticle, updateArticle, deleteArticle } from "@/lib/services/articlesService";
import { uploadMediaFile } from "@/lib/services/mediaService";
import { Article } from "@/data/articles";
import { ConfirmModal } from "@/components/admin/ConfirmModal";
import { Toast } from "@/components/admin/Toast";
import { Plus, Edit2, Trash2, Search, Upload, X, Eye } from "lucide-react";
import Image from "next/image";

export default function AdminArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);
  const [uploading, setUploading] = useState(false);

  const [form, setForm] = useState<{
    slug: string;
    title: string;
    excerpt: string;
    category: Article["category"];
    date: string;
    readTime: string;
    thumbnail: string;
    featured: boolean;
    fullContent: string;
  }>({
    slug: "",
    title: "",
    excerpt: "",
    category: "تربية إيمانية",
    date: "اليوم",
    readTime: "٥ دقائق",
    thumbnail: "/images/article1.jpg",
    featured: true,
    fullContent: "",
  });

  const loadArticles = async () => {
    const data = await fetchAllArticles();
    setArticles(data);
  };

  useEffect(() => {
    loadArticles();
  }, []);

  const openCreateModal = () => {
    setEditingId(null);
    setForm({
      slug: `article-${Date.now()}`,
      title: "",
      excerpt: "",
      category: "تربية إيمانية",
      date: "اليوم",
      readTime: "٥ دقائق",
      thumbnail: "/images/article1.jpg",
      featured: true,
      fullContent: "",
    });
    setModalOpen(true);
  };

  const openEditModal = (art: Article) => {
    setEditingId(art.id);
    setForm({
      slug: art.slug,
      title: art.title,
      excerpt: art.excerpt,
      category: art.category,
      date: art.date,
      readTime: art.readTime,
      thumbnail: art.thumbnail,
      featured: art.featured,
      fullContent: art.fullContent,
    });
    setModalOpen(true);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    setUploading(true);
    const { url, error } = await uploadMediaFile(file);
    setUploading(false);
    if (url) {
      setForm((prev) => ({ ...prev, thumbnail: url }));
      setToast({ msg: "تم رفع صورة المقال بنجاح!", type: "success" });
    } else {
      setToast({ msg: error || "فشل رفع الصورة", type: "error" });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      const { success, error } = await updateArticle(editingId, form);
      if (success) {
        setToast({ msg: "تم تعديل المقال بنجاح!", type: "success" });
        setModalOpen(false);
        loadArticles();
      } else {
        setToast({ msg: error || "فشل التعديل", type: "error" });
      }
    } else {
      const { success, error } = await createArticle(form);
      if (success) {
        setToast({ msg: "تم حفظ المقال الجديد بنجاح!", type: "success" });
        setModalOpen(false);
        loadArticles();
      } else {
        setToast({ msg: error || "فشل الإضافة", type: "error" });
      }
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTargetId) return;
    const { success, error } = await deleteArticle(deleteTargetId);
    if (success) {
      setToast({ msg: "تم حذف المقال بنجاح!", type: "success" });
      loadArticles();
    } else {
      setToast({ msg: error || "فشل الحذف", type: "error" });
    }
    setDeleteTargetId(null);
  };

  const filtered = articles.filter(
    (a) => a.title.includes(search) || a.excerpt.includes(search) || a.slug.includes(search)
  );

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-white">إدارة المقالات والمدونة</h1>
            <p className="text-xs text-[#B8C3D9] mt-1">إضافة وتعديل وحذف المقالات التربوية الموجهة لأولياء الأمور</p>
          </div>
          <button
            onClick={openCreateModal}
            className="px-5 py-2.5 rounded-xl font-semibold text-xs text-white bg-gradient-to-r from-[#4A7DFF] to-[#6E5BFF] hover:shadow-lg transition-all flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>إضافة مقال جديد</span>
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-md">
          <input
            type="text"
            placeholder="بحث عن عنوان مقال..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 pr-9 text-xs text-white focus:outline-none focus:border-[#4A7DFF]"
          />
          <Search className="w-4 h-4 text-[#7EC8FF] absolute right-3 top-1/2 -translate-y-1/2" />
        </div>

        {/* Articles Table */}
        <div className="rounded-3xl glass-card border border-white/10 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-right text-xs text-[#B8C3D9]">
              <thead className="bg-white/5 text-white font-bold border-b border-white/10">
                <tr>
                  <th className="p-4">الصورة</th>
                  <th className="p-4">العنوان</th>
                  <th className="p-4">التصنيف</th>
                  <th className="p-4">الرابط الفرعي (Slug)</th>
                  <th className="p-4">الحالة</th>
                  <th className="p-4 text-center">التحكم</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filtered.length > 0 ? (
                  filtered.map((art) => (
                    <tr key={art.id} className="hover:bg-white/[0.02]">
                      <td className="p-4">
                        <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-white/5">
                          <Image src={art.thumbnail} alt={art.title} fill className="object-cover" />
                        </div>
                      </td>
                      <td className="p-4 font-bold text-white max-w-xs truncate">{art.title}</td>
                      <td className="p-4">
                        <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-white">
                          {art.category}
                        </span>
                      </td>
                      <td className="p-4 font-mono text-[11px] text-[#7EC8FF]">{art.slug}</td>
                      <td className="p-4">
                        {art.featured ? (
                          <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                            منشور
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded text-[10px] bg-white/10 text-white/60">
                            مسودة
                          </span>
                        )}
                      </td>
                      <td className="p-4">
                        <div className="flex items-center justify-center gap-2">
                          <a
                            href={`/articles/${art.slug}`}
                            target="_blank"
                            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-[#7EC8FF]"
                            title="معاينة"
                          >
                            <Eye className="w-4 h-4" />
                          </a>
                          <button
                            onClick={() => openEditModal(art)}
                            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white"
                            title="تعديل"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setDeleteTargetId(art.id)}
                            className="p-2 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400"
                            title="حذف"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-[#7E8C9E]">
                      لا توجد مقالات مطابقة
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
            <div className="relative w-full max-w-2xl bg-[#0C1829] border border-white/10 rounded-3xl p-6 shadow-2xl z-10 space-y-4 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <h3 className="text-lg font-bold text-white">
                  {editingId ? "تعديل مقال" : "إضافة مقال جديد"}
                </h3>
                <button onClick={() => setModalOpen(false)} className="p-1 rounded-lg hover:bg-white/10 text-white/60">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block font-semibold text-[#B8C3D9] mb-1">عنوان المقال</label>
                  <input
                    type="text"
                    required
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-[#4A7DFF]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-[#B8C3D9] mb-1">الرابط الفرعي (Slug)</label>
                    <input
                      type="text"
                      required
                      value={form.slug}
                      onChange={(e) => setForm({ ...form, slug: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-[#4A7DFF]"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-[#B8C3D9] mb-1">التصنيف</label>
                    <select
                      value={form.category}
                      onChange={(e) => setForm({ ...form, category: e.target.value as Article["category"] })}
                      className="w-full bg-[#0C1829] border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-[#4A7DFF]"
                    >
                      <option value="تربية إيمانية">تربية إيمانية</option>
                      <option value="طرق الدراسة">طرق الدراسة</option>
                      <option value="دليل أولياء الأمور">دليل أولياء الأمور</option>
                      <option value="التجويد والقرآن">التجويد والقرآن</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-[#B8C3D9] mb-1">صورة المقال (Thumbnail)</label>
                  <div className="flex items-center gap-3">
                    <input
                      type="text"
                      value={form.thumbnail}
                      onChange={(e) => setForm({ ...form, thumbnail: e.target.value })}
                      className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-[#4A7DFF]"
                    />
                    <label className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold cursor-pointer flex items-center gap-2">
                      <Upload className="w-4 h-4 text-[#7EC8FF]" />
                      <span>{uploading ? "جاري الرفع..." : "رفع صورة"}</span>
                      <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-[#B8C3D9] mb-1">نبذة قصيرة (Excerpt)</label>
                  <textarea
                    rows={2}
                    required
                    value={form.excerpt}
                    onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-[#4A7DFF]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#B8C3D9] mb-1">المحتوى الكامل (Full Content)</label>
                  <textarea
                    rows={8}
                    required
                    value={form.fullContent}
                    onChange={(e) => setForm({ ...form, fullContent: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-[#4A7DFF] font-mono text-xs leading-relaxed"
                  />
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-white/10">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.featured}
                      onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                      className="rounded bg-white/10 border-white/20 text-[#4A7DFF]"
                    />
                    <span className="text-white font-semibold">مقال مُميز (Featured)</span>
                  </label>

                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-[#4A7DFF] to-[#6E5BFF] hover:shadow-lg transition-all"
                  >
                    حفظ المقال
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        <ConfirmModal
          isOpen={Boolean(deleteTargetId)}
          title="تأكيد حذف المقال"
          message="هل أنت تأكد من إرادة حذف هذا المقال من قاعدة البيانات؟ لا يمكن التراجع عن هذا الإجراء."
          onConfirm={handleDeleteConfirm}
          onCancel={() => setDeleteTargetId(null)}
        />

        <Toast message={toast?.msg || null} type={toast?.type} onClose={() => setToast(null)} />
      </div>
    </AdminLayout>
  );
}
