"use client";

import React, { useState, useEffect } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { fetchAllMedia, uploadMediaFile, deleteMediaItem, MediaItem } from "@/lib/services/mediaService";
import { ConfirmModal } from "@/components/admin/ConfirmModal";
import { Toast } from "@/components/admin/Toast";
import { FolderOpen, Upload, Trash2, Copy, Check, ExternalLink, Image as ImageIcon, Loader2 } from "lucide-react";
import Image from "next/image";

export default function AdminMediaLibraryPage() {
  const [mediaList, setMediaList] = useState<MediaItem[]>([]);
  const [uploading, setUploading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<{ id: string; filePath: string } | null>(null);
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);

  const loadMedia = async () => {
    const data = await fetchAllMedia();
    setMediaList(data);
  };

  useEffect(() => {
    let ignore = false;
    fetchAllMedia().then((data) => {
      if (!ignore) setMediaList(data);
    });
    return () => {
      ignore = true;
    };
  }, []);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    setUploading(true);
    const { url, error } = await uploadMediaFile(file);
    setUploading(false);
    if (url) {
      setToast({ msg: "تم رفع الملف بنجاح!", type: "success" });
      loadMedia();
    } else {
      setToast({ msg: error || "فشل رفع الملف", type: "error" });
    }
  };

  const copyUrlToClipboard = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    const ok = await deleteMediaItem(deleteTarget.id, deleteTarget.filePath);
    if (ok) {
      setToast({ msg: "تم حذف الملف من Storage بنجاح!", type: "success" });
      loadMedia();
    } else {
      setToast({ msg: "فشل حذف الملف", type: "error" });
    }
    setDeleteTarget(null);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-white">مكتبة الوسائط (Media Library)</h1>
            <p className="text-xs text-[#B8C3D9] mt-1">رفع وإدارة الصور والملفات المخزنة سحابياً</p>
          </div>

          <label className="px-5 py-2.5 rounded-xl font-semibold text-xs text-white bg-gradient-to-r from-[#4A7DFF] to-[#6E5BFF] hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer border border-white/15">
            {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4 text-[#D8B15B]" />}
            <span>{uploading ? "جاري الرفع..." : "رفع ملف جديد"}</span>
            <input type="file" accept="image/*" className="hidden" onChange={handleFileUpload} disabled={uploading} />
          </label>
        </div>

        {/* Media Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {mediaList.length > 0 ? (
            mediaList.map((item) => (
              <div
                key={item.id}
                className="p-3 rounded-2xl glass-card border border-white/10 space-y-2 group hover:border-[#7EC8FF]/40 transition-all flex flex-col justify-between"
              >
                <div className="relative aspect-square rounded-xl overflow-hidden bg-white/5 border border-white/5">
                  <Image src={item.file_url} alt={item.file_name} fill className="object-cover" />
                </div>

                <p className="text-[11px] font-medium text-white truncate px-1">{item.file_name}</p>

                <div className="flex items-center justify-between pt-2 border-t border-white/5">
                  <button
                    onClick={() => copyUrlToClipboard(item.file_url, item.id)}
                    className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-[#7EC8FF] text-[10px] flex items-center gap-1"
                    title="نسخ رابط الصورة"
                  >
                    {copiedId === item.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedId === item.id ? "نسخ!" : "رابط"}</span>
                  </button>

                  <div className="flex items-center gap-1">
                    <a
                      href={item.file_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white"
                      title="فتح"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                    <button
                      onClick={() => setDeleteTarget({ id: item.id, filePath: item.file_path })}
                      className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400"
                      title="حذف"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full p-12 text-center glass-card rounded-3xl space-y-3">
              <FolderOpen className="w-10 h-10 text-[#7EC8FF] mx-auto opacity-50" />
              <p className="text-xs text-[#B8C3D9]">لا توجد ملفات وسائط مرفوعة حتى الآن.</p>
            </div>
          )}
        </div>

        <ConfirmModal
          isOpen={Boolean(deleteTarget)}
          title="تأكيد حذف الملف"
          message="هل أنت متأكد من حذف هذا الملف نهائياً؟"
          onConfirm={handleDeleteConfirm}
          onCancel={() => setDeleteTarget(null)}
        />

        <Toast message={toast?.msg || null} type={toast?.type} onClose={() => setToast(null)} />
      </div>
    </AdminLayout>
  );
}
