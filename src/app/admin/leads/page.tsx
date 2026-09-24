"use client";

import React, { useState, useEffect } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { fetchTrialLeads, updateLeadStatus, deleteTrialLead, TrialLeadData } from "@/lib/services/leadsService";
import { ConfirmModal } from "@/components/admin/ConfirmModal";
import { Toast } from "@/components/admin/Toast";
import { Users, Search, Trash2, MessageCircle, Phone, Calendar, User, BookOpen } from "lucide-react";

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<TrialLeadData[]>([]);
  const [search, setSearch] = useState("");
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);

  const loadLeads = async () => {
    const data = await fetchTrialLeads();
    setLeads(data);
  };

  useEffect(() => {
    let ignore = false;
    fetchTrialLeads().then((data) => {
      if (!ignore) setLeads(data);
    });
    return () => {
      ignore = true;
    };
  }, []);

  const handleStatusChange = async (id: string, newStatus: string) => {
    const ok = await updateLeadStatus(id, newStatus);
    if (ok) {
      setToast({ msg: "تم تحديث حالة الطلب بنجاح", type: "success" });
      loadLeads();
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTargetId) return;
    const ok = await deleteTrialLead(deleteTargetId);
    if (ok) {
      setToast({ msg: "تم حذف الطلب بنجاح", type: "success" });
      loadLeads();
    } else {
      setToast({ msg: "فشل حذف الطلب", type: "error" });
    }
    setDeleteTargetId(null);
  };

  const filtered = leads.filter(
    (l) =>
      l.parent_name.includes(search) ||
      l.phone.includes(search) ||
      l.country.includes(search) ||
      l.program.includes(search)
  );

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-white">طلبات الحصص التجريبية (Trial Leads)</h1>
            <p className="text-xs text-[#B8C3D9] mt-1">عرض وإدارة طلبات التسجيل للحصص التجريبية المجانية الواردة من الموقع</p>
          </div>
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <input
            type="text"
            placeholder="بحث باسم ولي الأمر أو رقم الهاتف..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 pr-9 text-xs text-white focus:outline-none focus:border-[#4A7DFF]"
          />
          <Search className="w-4 h-4 text-[#7EC8FF] absolute right-3 top-1/2 -translate-y-1/2" />
        </div>

        {/* Leads Table */}
        <div className="rounded-3xl glass-card border border-white/10 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-right text-xs text-[#B8C3D9]">
              <thead className="bg-white/5 text-white font-bold border-b border-white/10">
                <tr>
                  <th className="p-4">اسم ولي الأمر</th>
                  <th className="p-4">رقم التواصل</th>
                  <th className="p-4">الدولة</th>
                  <th className="p-4">عمر الطفل</th>
                  <th className="p-4">البرنامج</th>
                  <th className="p-4">تاريخ الطلب</th>
                  <th className="p-4">الحالة</th>
                  <th className="p-4 text-center">تواصل / تحكم</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filtered.length > 0 ? (
                  filtered.map((lead) => (
                    <tr key={lead.id} className="hover:bg-white/[0.02]">
                      <td className="p-4 font-bold text-white flex items-center gap-2">
                        <User className="w-4 h-4 text-[#7EC8FF]" />
                        <span>{lead.parent_name}</span>
                      </td>
                      <td className="p-4 font-mono dir-ltr text-right text-[#7EC8FF]">{lead.phone}</td>
                      <td className="p-4">{lead.country}</td>
                      <td className="p-4">{lead.student_age}</td>
                      <td className="p-4">
                        <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-white">
                          {lead.program}
                        </span>
                      </td>
                      <td className="p-4 text-[11px] text-[#7E8C9E]">
                        {lead.created_at ? new Date(lead.created_at).toLocaleDateString("ar-EG") : "اليوم"}
                      </td>
                      <td className="p-4">
                        <select
                          value={lead.status || "new"}
                          onChange={(e) => lead.id && handleStatusChange(lead.id, e.target.value)}
                          className="bg-[#0C1829] border border-white/10 rounded-lg px-2 py-1 text-[11px] text-white focus:outline-none focus:border-[#4A7DFF]"
                        >
                          <option value="new">جديد 🟢</option>
                          <option value="contacted">تم التواصل 🟡</option>
                          <option value="converted">تم الاشتراك 🔵</option>
                        </select>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center justify-center gap-2">
                          <a
                            href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, "")}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 flex items-center gap-1 text-[11px]"
                            title="تواصل عبر الواتساب"
                          >
                            <MessageCircle className="w-4 h-4 fill-current" />
                            <span>واتساب</span>
                          </a>
                          {lead.id && (
                            <button
                              onClick={() => setDeleteTargetId(lead.id!)}
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
                    <td colSpan={8} className="p-8 text-center text-[#7E8C9E]">
                      لا توجد طلبات أونلاين مسجلة بعد
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <ConfirmModal
          isOpen={Boolean(deleteTargetId)}
          title="تأكيد حذف طلب الحصة"
          message="هل أنت متأكد من حذف هذا الطلب من السجل؟"
          onConfirm={handleDeleteConfirm}
          onCancel={() => setDeleteTargetId(null)}
        />

        <Toast message={toast?.msg || null} type={toast?.type} onClose={() => setToast(null)} />
      </div>
    </AdminLayout>
  );
}
