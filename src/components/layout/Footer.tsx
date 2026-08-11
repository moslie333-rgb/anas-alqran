"use client";

import React from "react";
import Link from "next/link";
import { MessageCircle, Heart, Sparkles } from "lucide-react";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { SocialIcons } from "@/components/ui/SocialIcons";

const WHATSAPP_URL = "https://wa.me/+96890618718";

export function Footer() {
  return (
    <footer className="relative z-10 bg-[#07111F] border-t border-white/10 pt-16 pb-12 text-[#B8C3D9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand Info with Official Logo */}
          <div className="md:col-span-5 space-y-4">
            <BrandLogo size="lg" />

            <p className="text-xs text-[#B8C3D9] max-w-sm leading-relaxed font-light mt-3">
              أكاديمية إلكترونية دولية رائدة تُقدم أفضل خدمات تحفيظ وتعليم القرآن الكريم للأطفال والعائلات في الخليج العربي بأعلى معايير الإتقان والجودة التربوية.
            </p>

            {/* Social Media Icons */}
            <div className="pt-2">
              <SocialIcons size="md" />
            </div>

            <div className="pt-2">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#25D366]/10 border border-[#25D366]/20 text-xs font-semibold text-white hover:border-[#25D366]/40 hover:bg-[#25D366]/15 transition-all group"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366] fill-current group-hover:scale-110 transition-transform" />
                <span>تواصل مباشر عبر الواتساب الرسمي</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">روابط سريعة</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/#why-us" className="hover:text-[#7EC8FF] transition-colors">لماذا أنس القرآن؟</Link>
              </li>
              <li>
                <Link href="/#programs" className="hover:text-[#7EC8FF] transition-colors">البرامج والمسارات الدراسية</Link>
              </li>
              <li>
                <Link href="/#pricing" className="hover:text-[#7EC8FF] transition-colors">الباقات والأسعار</Link>
              </li>
              <li>
                <Link href="/#how-it-works" className="hover:text-[#7EC8FF] transition-colors">كيف تبدأ الرحلة؟</Link>
              </li>
              <li>
                <Link href="/#reviews" className="hover:text-[#7EC8FF] transition-colors">آراء وتقييمات الأسر</Link>
              </li>
              <li>
                <Link href="/articles" className="hover:text-[#7EC8FF] transition-colors">مدونة التربية القرآنية</Link>
              </li>
              <li>
                <Link href="/#faq" className="hover:text-[#7EC8FF] transition-colors">الأسئلة الشائعة</Link>
              </li>
            </ul>
          </div>

          {/* Gulf Coverage Countries */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">نخدم الأسر في جميع دول الخليج</h4>
            <p className="text-xs text-[#B8C3D9] leading-relaxed">
              نوفر مواعيد دراسية مخصصة تناسب التوقيت المحلي لجميع مناطق:
            </p>
            <div className="flex flex-wrap gap-2 text-[11px] pt-1">
              <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/5 text-white">🇸🇦 المملكة العربية السعودية</span>
              <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/5 text-white">🇦🇪 الإمارات العربية المتحدة</span>
              <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/5 text-white">🇶🇦 دولة قطر</span>
              <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/5 text-white">🇰🇼 دولة الكويت</span>
              <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/5 text-white">🇴🇲 سلطنة عمان</span>
              <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/5 text-white">🇧🇭 مملكة البحرين</span>
            </div>

            {/* CTA in footer */}
            <div className="pt-3">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-[#4A7DFF] to-[#6E5BFF] text-xs font-semibold text-white hover:shadow-lg hover:shadow-blue-500/20 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#D8B15B]" />
                <span>احجز حصتك التجريبية المجانية</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#B8C3D9]">
          <p>© {new Date().getFullYear()} أنس القرآن | جميع الحقوق محفوظة لأكاديمية أنس القرآن.</p>
          <div className="flex items-center gap-1 text-[11px]">
            <span>صُنعت بمحبة ورعاية للجيل القرآني القادم</span>
            <Heart className="w-3.5 h-3.5 text-[#D8B15B] fill-current inline" />
          </div>
        </div>
      </div>
    </footer>
  );
}
