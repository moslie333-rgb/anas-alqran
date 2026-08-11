"use client";

import React from "react";
import { MessageCircle } from "lucide-react";

const WHATSAPP_URL = "https://wa.me/+96890618718";

export function FloatingWhatsApp() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="تواصل معنا عبر الواتساب"
      className="fixed bottom-6 left-6 z-50 w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-lg shadow-[#25D366]/30 animate-whatsapp-pulse hover:scale-110 hover:shadow-xl hover:shadow-[#25D366]/40 transition-all duration-300 group"
    >
      <MessageCircle className="w-7 h-7 fill-current group-hover:scale-110 transition-transform" />
      
      {/* Tooltip */}
      <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-3 py-1.5 rounded-lg bg-[#0C1829] border border-white/10 text-xs font-semibold text-white whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300 shadow-lg">
        تواصل عبر الواتساب
      </span>
    </a>
  );
}
