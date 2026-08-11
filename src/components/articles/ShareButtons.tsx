"use client";

import React, { useState } from "react";
import { MessageCircle, Share2, Copy, Check } from "lucide-react";

interface ShareButtonsProps {
  title: string;
  slug: string;
}

export function ShareButtons({ title, slug }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const getShareUrl = () => {
    if (typeof window !== "undefined") {
      return `${window.location.origin}/articles/${slug}`;
    }
    return `https://anasquran.com/articles/${slug}`;
  };

  const shareUrl = getShareUrl();
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(`مقال رائع من أنس القرآن: ${title}`);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-wrap items-center gap-3 py-6 border-y border-white/10 my-8">
      <div className="flex items-center gap-2 text-xs font-semibold text-white">
        <Share2 className="w-4 h-4 text-[#7EC8FF]" />
        <span>مشاركة المقال:</span>
      </div>

      <div className="flex items-center gap-2">
        {/* WhatsApp Share */}
        <a
          href={`https://wa.me/?text=${encodedTitle}%20${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="px-3.5 py-2 rounded-xl text-xs font-medium bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 transition-colors flex items-center gap-1.5"
          aria-label="مشاركة عبر الواتساب"
        >
          <MessageCircle className="w-4 h-4 fill-current" />
          <span>واتساب</span>
        </a>

        {/* X / Twitter Share */}
        <a
          href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="px-3.5 py-2 rounded-xl text-xs font-medium bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-colors flex items-center gap-1.5"
          aria-label="مشاركة عبر منصة إكس"
        >
          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
          </svg>
          <span>منصة X</span>
        </a>

        {/* Copy Link Button */}
        <button
          onClick={copyToClipboard}
          className="px-3.5 py-2 rounded-xl text-xs font-medium bg-white/5 hover:bg-white/10 text-[#7EC8FF] border border-white/10 transition-colors flex items-center gap-1.5 cursor-pointer"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-emerald-400" />
              <span className="text-emerald-400">تم النسخ!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              <span>نسخ الرابط</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
