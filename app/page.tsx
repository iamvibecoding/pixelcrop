// app/page.tsx
"use client";

import React, { useState, useEffect } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Features } from '@/components/sections/Features';
import { HowItWorks } from '@/components/sections/HowItWorks';
import { BackgroundRemoverTool } from '@/components/BackgroundRemoverTool';
import { Spinner } from '@/components/ui/Spinner';

export default function LandingPage() {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return (
      <div className="bg-[#EEEEEE] min-h-screen flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    // Note: The <style> tag is removed, font is in layout.tsx
    // The global styles (like .eng-grid-bg) are in globals.css
    <div className="min-h-screen relative overflow-x-hidden bg-[#EEEEEE] eng-grid-bg">
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-[#F25912]/20 to-[#F2s912]/20 rounded-full blur-3xl animate-blob"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-[#F25912]/20 to-[#F25912]/20 rounded-full blur-3xl animate-blob" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10">
        <Header />

        <section className="relative pt-32 pb-20">
          <div className="w-full max-w-6xl mx-auto relative z-10 px-4">
            <header className="text-center mb-12">
              <h1 className="text-5xl md:text-7xl font-black tracking-tight text-[#1D1616] mb-4">
                Remove Image Backgrounds
              </h1>
              <h2 className="text-5xl md:text-7xl font-black tracking-tight bg-gradient-to-r from-[#F25912] via-[#F25912] to-[#1D1616] bg-clip-text text-transparent mb-6">
                100% Automatically.
              </h2>
              <p className="text-gray-600 mt-6 text-xl max-w-3xl mx-auto leading-relaxed">
                Instantly remove the background from any image with a single click, powered by cutting-edge AI.
              </p>
            </header>
            <BackgroundRemoverTool />
          </div>
        </section>

        <Features />
        <HowItWorks />
        <Footer />
      </div>
    </div>
  );
}