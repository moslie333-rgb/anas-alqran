"use client";

import React, { useState } from "react";
import { Menu, Search, Bell, User, Sun, Moon } from "lucide-react";

interface AdminTopbarProps {
  onToggleMobileSidebar: () => void;
  searchQuery?: string;
  onSearchChange?: (val: string) => void;
}

export function AdminTopbar({
  onToggleMobileSidebar,
  searchQuery = "",
  onSearchChange,
}: AdminTopbarProps) {
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  return (
    <header className="sticky top-0 z-20 bg-[#0C1829]/90 backdrop-blur-md border-b border-white/10 px-4 sm:px-6 py-3.5 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleMobileSidebar}
          className="lg:hidden p-2 rounded-xl bg-white/5 border border-white/10 text-white/80 hover:text-white"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Global Admin Search Bar */}
        <div className="relative hidden sm:block w-64 md:w-80">
          <input
            type="text"
            placeholder="بحث سريع في اللوحة..."
            value={searchQuery}
            onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 pr-9 text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#4A7DFF]"
          />
          <Search className="w-4 h-4 text-[#7EC8FF] absolute right-3 top-1/2 -translate-y-1/2" />
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Dark/Light mode toggle indicator */}
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="p-2 rounded-xl bg-white/5 border border-white/10 text-[#B8C3D9] hover:text-white transition-colors"
          title="تبديل المظهر"
        >
          {isDarkMode ? <Moon className="w-4 h-4 text-[#7EC8FF]" /> : <Sun className="w-4 h-4 text-[#D8B15B]" />}
        </button>

        {/* Notifications Dropdown Placeholder */}
        <div className="relative">
          <button
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className="p-2 rounded-xl bg-white/5 border border-white/10 text-[#B8C3D9] hover:text-white relative transition-colors"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          </button>

          {notificationsOpen && (
            <div className="absolute left-0 mt-2 w-72 bg-[#0C1829] border border-white/10 rounded-2xl p-4 shadow-2xl space-y-3 z-30 text-right">
              <h4 className="text-xs font-bold text-white border-b border-white/10 pb-2">التنبيهات الأخيرة</h4>
              <div className="space-y-2 text-xs text-[#B8C3D9]">
                <p className="p-2 rounded-lg bg-white/5 border border-white/5">طلب حصة تجريبية جديد تم استلامه للتو.</p>
                <p className="p-2 rounded-lg bg-white/5 border border-white/5">تم تحديث بيانات أسعار الباقات بنجاح.</p>
              </div>
            </div>
          )}
        </div>

        {/* Admin Profile Chip */}
        <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10">
          <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#4A7DFF] to-[#6E5BFF] flex items-center justify-center font-bold text-xs text-white">
            A
          </div>
          <span className="hidden sm:inline text-xs font-bold text-white">المسؤول</span>
        </div>
      </div>
    </header>
  );
}
