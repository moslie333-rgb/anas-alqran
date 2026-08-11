"use client";

import React, { useState, useEffect } from "react";
import { List, Sparkles } from "lucide-react";

interface TOCItem {
  id: string;
  title: string;
}

interface TableOfContentsProps {
  items: TOCItem[];
}

export function TableOfContents({ items }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>(items[0]?.id || "");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      for (const item of items) {
        const element = document.getElementById(item.id);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height + 300) {
            setActiveId(item.id);
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [items]);

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offsetTop = element.getBoundingClientRect().top + window.pageYOffset - 120;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
      setActiveId(id);
    }
  };

  if (!items || items.length === 0) return null;

  return (
    <div className="glass-card p-6 rounded-3xl border border-white/10 sticky top-28 space-y-4">
      <div className="flex items-center gap-2 pb-3 border-b border-white/10">
        <List className="w-4 h-4 text-[#7EC8FF]" />
        <h4 className="text-sm font-bold text-white">محتويات المقال</h4>
      </div>

      <nav className="space-y-2 text-xs">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => scrollToHeading(item.id)}
            className={`w-full text-right py-2 px-3 rounded-xl transition-all flex items-center justify-between cursor-pointer ${
              activeId === item.id
                ? "bg-[#4A7DFF]/20 text-[#7EC8FF] border border-[#4A7DFF]/40 font-semibold"
                : "text-[#B8C3D9] hover:text-white hover:bg-white/5"
            }`}
          >
            <span className="line-clamp-1">{item.title}</span>
            {activeId === item.id && <Sparkles className="w-3 h-3 text-[#D8B15B]" />}
          </button>
        ))}
      </nav>
    </div>
  );
}
