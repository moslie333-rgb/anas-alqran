"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Sparkles, Menu, X } from "lucide-react";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { SocialIcons } from "@/components/ui/SocialIcons";

const WHATSAPP_URL = "https://wa.me/+96890618718";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "لماذا نحن", href: "/#why-us", anchorId: "why-us" },
    { name: "الباقات والأسعار", href: "/#pricing", anchorId: "pricing" },
    { name: "كيف نعمل", href: "/#how-it-works", anchorId: "how-it-works" },
    { name: "آراء الأسر", href: "/#reviews", anchorId: "reviews" },
    { name: "المقالات", href: "/articles", anchorId: null },
    { name: "الأسئلة الشائعة", href: "/#faq", anchorId: "faq" },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, anchorId: string | null) => {
    if (anchorId && pathname === "/") {
      e.preventDefault();
      setMobileMenuOpen(false);
      const element = document.getElementById(anchorId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
        window.history.pushState(null, "", `#${anchorId}`);
      }
    } else if (anchorId && pathname !== "/") {
      setMobileMenuOpen(false);
    }
  };

  return (
    <header
      className={`fixed top-0 right-0 left-0 z-40 transition-all duration-300 ${
        scrolled ? "glass-header py-3 shadow-xl shadow-black/20" : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo with Official Image */}
        <BrandLogo size="md" />

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7 bg-white/5 border border-white/10 rounded-full px-6 py-2 backdrop-blur-md">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href, link.anchorId)}
              className="text-xs font-medium text-[#B8C3D9] hover:text-[#7EC8FF] transition-colors relative py-1"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Action Buttons & Social Icons */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Social Icons */}
          <SocialIcons size="sm" />

          {/* WhatsApp Direct */}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 rounded-xl text-xs font-semibold text-white bg-white/5 hover:bg-emerald-500/20 border border-white/10 hover:border-emerald-500/40 transition-all flex items-center gap-2"
          >
            <MessageCircle className="w-4 h-4 text-emerald-400" />
            <span>واتساب</span>
          </a>

          {/* Book Trial Button */}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-[#4A7DFF] to-[#6E5BFF] hover:shadow-lg hover:shadow-blue-500/20 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2"
          >
            <span>احجز حصة تجريبية</span>
            <Sparkles className="w-3.5 h-3.5 text-[#D8B15B]" />
          </a>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-xl bg-white/5 border border-white/10 text-white/80 hover:text-white transition-colors"
          aria-label="القائمة"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#0C1829] border-b border-white/10 px-4 pt-4 pb-6 space-y-3"
          >
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href, link.anchorId)}
                  className="px-4 py-2.5 rounded-xl text-sm font-medium text-[#B8C3D9] hover:text-white hover:bg-white/5 transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-[#4A7DFF] to-[#6E5BFF] flex items-center justify-center gap-2"
              >
                <span>احجز حصة تجريبية مجانية</span>
                <Sparkles className="w-4 h-4 text-[#D8B15B]" />
              </a>

              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-xl text-sm font-semibold text-white bg-white/5 border border-white/10 flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>تواصل عبر واتساب المباشر</span>
              </a>

              {/* Mobile Social Icons */}
              <div className="pt-3 flex items-center justify-center">
                <SocialIcons size="md" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
