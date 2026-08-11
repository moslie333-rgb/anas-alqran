"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  DollarSign,
  MessageSquareQuote,
  HelpCircle,
  Settings,
  Users,
  FolderOpen,
  LogOut,
  ExternalLink,
  BookOpen,
} from "lucide-react";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { logoutAdmin } from "@/lib/services/authService";

interface AdminSidebarProps {
  mobileOpen: boolean;
  onCloseMobile: () => void;
}

export function AdminSidebar({ mobileOpen, onCloseMobile }: AdminSidebarProps) {
  const pathname = usePathname();

  const menuItems = [
    { name: "لوحة التحكم (Overview)", href: "/admin/dashboard", icon: LayoutDashboard },
    { name: "طلب الحصص (Leads)", href: "/admin/leads", icon: Users },
    { name: "إدارة المقالات (Articles)", href: "/admin/articles", icon: FileText },
    { name: "إدارة الباقات (Pricing)", href: "/admin/pricing", icon: DollarSign },
    { name: "الآراء والشهادات (Reviews)", href: "/admin/testimonials", icon: MessageSquareQuote },
    { name: "الأسئلة الشائعة (FAQ)", href: "/admin/faq", icon: HelpCircle },
    { name: "مكتبة الوسائط (Media)", href: "/admin/media", icon: FolderOpen },
    { name: "إعدادات الأكاديمية (Settings)", href: "/admin/settings", icon: Settings },
  ];

  const handleLogout = async () => {
    await logoutAdmin();
    window.location.href = "/admin/login";
  };

  const navContent = (
    <div className="flex flex-col h-full justify-between p-4">
      <div className="space-y-6">
        {/* Brand Logo */}
        <div className="px-2 pt-2 flex items-center justify-between">
          <BrandLogo size="sm" />
          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#4A7DFF]/20 text-[#7EC8FF] border border-[#4A7DFF]/30">
            لوحة الإدارة
          </span>
        </div>

        {/* Navigation Links */}
        <nav className="space-y-1">
          {menuItems.map((item) => {
            const IconComp = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onCloseMobile}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? "bg-gradient-to-r from-[#4A7DFF] to-[#6E5BFF] text-white shadow-lg shadow-blue-900/30 border border-white/15"
                    : "text-[#B8C3D9] hover:text-white hover:bg-white/5"
                }`}
              >
                <IconComp className="w-4 h-4 shrink-0" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer Links & Logout */}
      <div className="space-y-2 pt-4 border-t border-white/10">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs text-[#B8C3D9] hover:text-white hover:bg-white/5 transition-colors"
        >
          <ExternalLink className="w-4 h-4 text-[#7EC8FF]" />
          <span>معاينة الموقع المباشر</span>
        </Link>

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs text-rose-400 hover:bg-rose-500/10 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>تسجيل الخروج</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-[#0C1829] border-l border-white/10 fixed top-0 bottom-0 right-0 z-30">
        {navContent}
      </aside>

      {/* Mobile Drawer Overlay */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            onClick={onCloseMobile}
            className="fixed inset-0 bg-[#07111F]/80 backdrop-blur-sm"
          />
          <aside className="relative w-64 bg-[#0C1829] border-l border-white/10 h-full z-10">
            {navContent}
          </aside>
        </div>
      )}
    </>
  );
}
