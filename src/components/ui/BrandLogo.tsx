"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

interface BrandLogoProps {
  size?: "sm" | "md" | "lg";
  showSubtitle?: boolean;
  className?: string;
}

export function BrandLogo({ size = "md", showSubtitle = true, className = "" }: BrandLogoProps) {
  const sizeMap = {
    sm: { img: 36, text: "text-base", sub: "text-[9px]" },
    md: { img: 44, text: "text-lg", sub: "text-[10px]" },
    lg: { img: 56, text: "text-2xl", sub: "text-xs" },
  };

  const currentSize = sizeMap[size];

  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-[#4A7DFF] rounded-xl p-1 transition-transform active:scale-95 ${className}`}
      aria-label="أنس القرآن - الصفحة الرئيسية"
    >
      {/* Official Brand Logo Icon Frame */}
      <div className="relative rounded-2xl overflow-hidden p-[1px] bg-gradient-to-tr from-[#4A7DFF]/40 via-white/10 to-[#6E5BFF]/40 group-hover:scale-105 transition-transform duration-300 shadow-lg shadow-blue-950/40">
        <div className="bg-[#0C1829] rounded-[15px] p-1 flex items-center justify-center">
          <Image
            src="/images/logo.png"
            alt="أنس القرآن"
            width={currentSize.img}
            height={currentSize.img}
            className="object-contain w-auto h-auto max-h-full rounded-xl"
            priority
          />
        </div>
      </div>

      {/* Brand Text Identity */}
      <div className="flex flex-col text-right">
        <span className={`font-extrabold text-white tracking-tight leading-none group-hover:text-[#7EC8FF] transition-colors ${currentSize.text}`}>
          أنس القرآن
        </span>
        {showSubtitle && (
          <span className={`text-[#B8C3D9] tracking-wider font-light mt-1 ${currentSize.sub}`}>
            أكاديمية التعليم القرآني
          </span>
        )}
      </div>
    </Link>
  );
}
