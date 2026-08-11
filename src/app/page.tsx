"use client";

import React from "react";
import { IslamicBackgroundPattern } from "@/components/background/IslamicBackgroundPattern";
import { Navbar } from "@/components/layout/Navbar";
import { HeroSection } from "@/components/sections/HeroSection";
import { TrustSection } from "@/components/sections/TrustSection";
import { WhyUsSection } from "@/components/sections/WhyUs";
import { PricingSection } from "@/components/sections/PricingSection";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { ReviewsSection } from "@/components/sections/ReviewsSection";
import { ArticlesSection } from "@/components/sections/ArticlesSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { FinalCTASection } from "@/components/sections/FinalCTASection";
import { Footer } from "@/components/layout/Footer";
import { FloatingWhatsApp } from "@/components/ui/FloatingWhatsApp";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#07111F] text-white selection:bg-[#4A7DFF] selection:text-white">
      {/* Background Texture & Ambient Lights */}
      <IslamicBackgroundPattern />

      {/* Navigation Bar */}
      <Navbar />

      {/* Hero Section */}
      <HeroSection />

      {/* Trust Metrics Section */}
      <TrustSection />

      {/* Why Us Section */}
      <WhyUsSection />

      {/* Pricing Packages Section */}
      <PricingSection />

      {/* How Learning Works (4 Steps) */}
      <HowItWorks />

      {/* Parents Reviews Marquee Gallery */}
      <ReviewsSection />

      {/* 3 Featured Parenting Articles */}
      <ArticlesSection />

      {/* FAQ Accordion Section */}
      <FAQSection />

      {/* Final Emotional Conversion CTA */}
      <FinalCTASection />

      {/* Footer */}
      <Footer />

      {/* Floating WhatsApp Button */}
      <FloatingWhatsApp />
    </main>
  );
}
