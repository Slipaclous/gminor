"use client";

import React, { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 320) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility, { passive: true });
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!isVisible) return null;

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Retourner en haut de la page"
      className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40 w-10 h-10 rounded-xl bg-[#0e0f15]/90 hover:bg-[#13141d] backdrop-blur-md border border-white/[0.12] hover:border-emerald-500/50 flex items-center justify-center text-zinc-400 hover:text-white shadow-2xl transition-all duration-300 hover:shadow-[0_0_20px_rgba(16,185,129,0.2)] active:scale-95 cursor-pointer group animate-in fade-in zoom-in-75 duration-200"
    >
      <ArrowUp className="w-4 h-4 text-zinc-400 group-hover:text-emerald-400 group-hover:-translate-y-0.5 transition-all" />
    </button>
  );
}
