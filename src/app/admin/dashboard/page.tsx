"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { AdminLayout } from "@/components/admin/AdminLayout";
import {
  FileText,
  DollarSign,
  MessageSquareQuote,
  HelpCircle,
  Users,
  FolderOpen,
  ArrowLeft,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { fetchTrialLeads } from "@/lib/services/leadsService";
import { fetchAllArticles } from "@/lib/services/articlesService";
import { fetchFAQs } from "@/lib/services/faqService";
import { fetchReviews } from "@/lib/services/reviewsService";

export default function AdminDashboardOverview() {
  const [stats, setStats] = useState({
    leadsCount: 0,
    articlesCount: 0,
    reviewsCount: 0,
    faqsCount: 0,
  });

  useEffect(() => {
    async function loadStats() {
      const [leads, articles, reviews, faqs] = await Promise.all([
        fetchTrialLeads(),
        fetchAllArticles(),
        fetchReviews(),
        fetchFAQs(),
      ]);

      setStats({
        leadsCount: leads.length,
        articlesCount: articles.length,
        reviewsCount: reviews.length,
        faqsCount: faqs.length,
      });
    }
    loadStats();
  }, []);

  const statCards = [
    { title: "طلبات الحصص التجريبية", value: stats.leadsCount, icon: Users, href: "/admin/leads", color: "from-emerald-500/20 to-emerald-500/5", textColor: "text-emerald-400" },
    { title: "المقالات المنشورة", value: stats.articlesCount, icon: FileText, href: "/admin/articles", color: "from-[#4A7DFF]/20 to-[#6E5BFF]/5", textColor: "text-[#7EC8FF]" },
    { title: "تقييمات أولياء الأمور", value: stats.reviewsCount, icon: MessageSquareQuote, href: "/admin/testimonials", color: "from-[#D8B15B]/20 to-[#D8B15B]/5", textColor: "text-[#D8B15B]" },
    { title: "الأسئلة الشائعة", value: stats.faqsCount, icon: HelpCircle, href: "/admin/faq", color: "from-purple-500/20 to-purple-500/5", textColor: "text-purple-400" },
  ];

  const quickActions = [
    { title: "إدارة الباقات والأسعار", desc: "تعديل أسعار الباقات الـ 30 و45 و60 دقيقة بالريال العماني", href: "/admin/pricing", icon: DollarSign },
    { title: "رفع التقييمات والصور", desc: "إضافة لقطات شاشة واتساب جديدة للمنتج", href: "/admin/testimonials", icon: MessageSquareQuote },
    { title: "إعدادات الأكاديمية والـ Hero", desc: "تعديل نصوص واجهة الموقع والإحصائيات وروابط التواصل", href: "/admin/settings", icon: Sparkles },
    { title: "مكتبة الوسائط والصور", desc: "رفع وإدارة الصور والمستندات", href: "/admin/media", icon: FolderOpen },
  ];

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Welcome Header */}
        <div className="p-6 sm:p-8 rounded-3xl glass-card border border-white/10 relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-[#7EC8FF]">
              <Sparkles className="w-3.5 h-3.5 text-[#D8B15B]" />
              <span>مرحباً بك في لوحة تحكم أنس القرآن</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">إدارة المحتوى وقاعدة البيانات</h1>
            <p className="text-xs text-[#B8C3D9]">تحكم كاملاً في محتوى الموقع، الباقات، المقالات، والطلبات بشكل مباشر ومحدث.</p>
          </div>

          <Link
            href="/admin/leads"
            className="px-5 py-3 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-[#4A7DFF] to-[#6E5BFF] hover:shadow-lg transition-all flex items-center justify-center gap-2 shrink-0"
          >
            <TrendingUp className="w-4 h-4" />
            <span>عرض طلبات الحصص التجريبية</span>
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {statCards.map((card) => {
            const IconComp = card.icon;
            return (
              <Link
                key={card.title}
                href={card.href}
                className="p-6 rounded-3xl glass-card border border-white/10 hover:border-[#7EC8FF]/40 transition-all group flex flex-col justify-between"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${card.color} border border-white/15 flex items-center justify-center ${card.textColor}`}>
                    <IconComp className="w-6 h-6" />
                  </div>
                  <ArrowLeft className="w-4 h-4 text-white/40 group-hover:text-white group-hover:-translate-x-1 transition-all" />
                </div>
                <div>
                  <span className="text-3xl font-extrabold text-white">{card.value}</span>
                  <p className="text-xs text-[#B8C3D9] mt-1 font-medium">{card.title}</p>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Quick Actions Grid */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-white">إجراءات سريعة</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {quickActions.map((action) => {
              const IconComp = action.icon;
              return (
                <Link
                  key={action.title}
                  href={action.href}
                  className="p-6 rounded-3xl bg-white/[0.03] border border-white/10 hover:bg-white/[0.06] hover:border-white/20 transition-all flex items-start gap-4 group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#7EC8FF] shrink-0 group-hover:scale-110 transition-all">
                    <IconComp className="w-6 h-6" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <h3 className="text-sm font-bold text-white group-hover:text-[#7EC8FF] transition-colors">{action.title}</h3>
                    <p className="text-xs text-[#B8C3D9] leading-relaxed">{action.desc}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
