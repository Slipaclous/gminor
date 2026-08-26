"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface LogoProps {
  className?: string;
}

export function Logo({ className = "" }: LogoProps) {
  const pathname = usePathname();

  const handleClick = () => {
    if (pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <Link
      href="/"
      onClick={handleClick}
      className={`group inline-flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-xl transition-all select-none ${className}`}
      aria-label="Accueil - G-Minor"
    >
      {/* Pure Typographic Studio Wordmark (G-Minor.) */}
      <div className="flex items-center text-lg sm:text-xl font-extrabold tracking-tight text-white font-sans leading-none">
        <span className="transition-colors group-hover:text-zinc-200">G</span>
        <span className="text-emerald-400 font-bold mx-0.5">-</span>
        <span className="transition-colors group-hover:text-zinc-200">Minor</span>
        <span className="text-emerald-400 font-extrabold text-xl group-hover:scale-125 transition-transform origin-bottom inline-block">.</span>
      </div>
    </Link>
  );
}
