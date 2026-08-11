"use client";

import React from "react";
import { motion } from "framer-motion";

export function IslamicBackgroundPattern() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* Primary Blue Ambient Glow - Top Right */}
      <div 
        className="absolute -top-[10%] right-[10%] w-[900px] h-[900px] rounded-full blur-[160px] opacity-30"
        style={{
          background: "radial-gradient(circle, rgba(74,125,255,0.28) 0%, rgba(110,91,255,0.12) 50%, rgba(7,17,31,0) 80%)"
        }}
      />
      
      {/* Secondary Violet Ambient Glow - Mid Left */}
      <div 
        className="absolute top-[40%] left-[-12%] w-[750px] h-[750px] rounded-full blur-[180px] opacity-22"
        style={{
          background: "radial-gradient(circle, rgba(110,91,255,0.24) 0%, rgba(74,125,255,0.08) 50%, rgba(7,17,31,0) 80%)"
        }}
      />

      {/* Warm Gold Ambient Glow - Bottom Right */}
      <div 
        className="absolute bottom-[-8%] right-[15%] w-[650px] h-[650px] rounded-full blur-[170px] opacity-18"
        style={{
          background: "radial-gradient(circle, rgba(216,177,91,0.18) 0%, rgba(74,125,255,0.06) 50%, rgba(7,17,31,0) 80%)"
        }}
      />

      {/* Additional Highlight Glow - Center page */}
      <div 
        className="absolute top-[70%] right-[50%] translate-x-1/2 w-[500px] h-[500px] rounded-full blur-[200px] opacity-12"
        style={{
          background: "radial-gradient(circle, rgba(126,200,255,0.15) 0%, rgba(7,17,31,0) 70%)"
        }}
      />

      {/* Floating 3D Geometric Orbs */}
      <div className="absolute top-[20%] right-[8%] w-3 h-3 rounded-full bg-[#4A7DFF]/40 blur-[1px] animate-pulse" />
      <div className="absolute top-[35%] left-[5%] w-2 h-2 rounded-full bg-[#6E5BFF]/50 blur-[1px] animate-pulse" style={{ animationDelay: "1.5s" }} />
      <div className="absolute top-[60%] right-[15%] w-2.5 h-2.5 rounded-full bg-[#7EC8FF]/30 blur-[1px] animate-pulse" style={{ animationDelay: "2.2s" }} />
      <div className="absolute top-[80%] left-[12%] w-2 h-2 rounded-full bg-[#D8B15B]/35 blur-[1px] animate-pulse" style={{ animationDelay: "0.8s" }} />
      <div className="absolute top-[15%] left-[45%] w-1.5 h-1.5 rounded-full bg-[#4A7DFF]/25 blur-[0.5px] animate-pulse" style={{ animationDelay: "3s" }} />
      <div className="absolute top-[90%] right-[40%] w-2 h-2 rounded-full bg-[#6E5BFF]/30 blur-[1px] animate-pulse" style={{ animationDelay: "1s" }} />

      {/* Subtle Islamic Geometric Pattern (5% opacity) */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='120' height='120' viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M60 0 L120 60 L60 120 L0 60 Z' fill='none' stroke='%237EC8FF' stroke-width='0.6'/%3E%3Cpath d='M60 15 L105 60 L60 105 L15 60 Z' fill='none' stroke='%234A7DFF' stroke-width='0.4'/%3E%3Cpath d='M60 30 L90 60 L60 90 L30 60 Z' fill='none' stroke='%236E5BFF' stroke-width='0.4'/%3E%3Ccircle cx='60' cy='60' r='8' fill='none' stroke='%23D8B15B' stroke-width='0.5'/%3E%3Ccircle cx='60' cy='60' r='3' fill='none' stroke='%23D8B15B' stroke-width='0.3'/%3E%3Cpath d='M0 0 L60 60' fill='none' stroke='%234A7DFF' stroke-width='0.2'/%3E%3Cpath d='M120 0 L60 60' fill='none' stroke='%234A7DFF' stroke-width='0.2'/%3E%3Cpath d='M0 120 L60 60' fill='none' stroke='%234A7DFF' stroke-width='0.2'/%3E%3Cpath d='M120 120 L60 60' fill='none' stroke='%234A7DFF' stroke-width='0.2'/%3E%3C/svg%3E")`,
          backgroundSize: "120px 120px",
        }}
      />

      {/* Film Grain Noise Filter for Depth */}
      <div 
        className="absolute inset-0 opacity-[0.02] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}
