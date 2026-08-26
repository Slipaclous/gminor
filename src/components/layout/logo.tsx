import React from "react";
import Link from "next/link";

interface LogoProps {
  className?: string;
  showSubtitle?: boolean;
}

export function Logo({ className = "", showSubtitle = false }: LogoProps) {
  return (
    <Link
      href="/"
      className={`group inline-flex items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-2xl transition-all select-none ${className}`}
      aria-label="Accueil - Gauthier Minor"
    >
      {/* Monogram Emblem (Black Obsidian Cube with Architectural GM & Radiant Emerald Accent) */}
      <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-[#0e0f14] border border-white/[0.14] group-hover:border-emerald-500/50 flex items-center justify-center transition-all duration-300 shadow-md group-hover:shadow-[0_0_20px_rgba(16,185,129,0.2)] shrink-0 overflow-hidden">
        {/* Subtle inner top glow */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent pointer-events-none" />

        <svg
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5 sm:w-5.5 sm:h-5.5"
        >
          {/* Architectural GM Monogram */}
          {/* Letter G */}
          <path
            d="M17 11.5H11.5C9.567 11.5 8 13.067 8 15V21C8 22.933 9.567 24.5 11.5 24.5H16.5C17.328 24.5 18 23.828 18 23V18H13.5"
            stroke="#ffffff"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-colors duration-200 group-hover:stroke-white"
          />

          {/* Letter M */}
          <path
            d="M20 24.5V11.5L24 18L28 11.5V24.5"
            stroke="#10b981"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-all duration-200 group-hover:stroke-emerald-300"
          />
        </svg>

        {/* Pulsing micro-dot in corner */}
        <span className="absolute bottom-1 right-1 w-1.5 h-1.5 rounded-full bg-emerald-400 opacity-80 group-hover:opacity-100 group-hover:scale-125 transition-all shadow-[0_0_6px_#10b981]" />
      </div>

      {/* Typographic Studio Wordmark (gminor.) */}
      <div className="flex flex-col">
        <div className="flex items-center text-base sm:text-lg font-extrabold tracking-tight text-white font-sans leading-none">
          <span>gminor</span>
          <span className="text-emerald-400 font-mono text-xl group-hover:animate-pulse">.</span>
        </div>
        {showSubtitle ? (
          <span className="text-[10px] font-mono text-zinc-400 tracking-wider uppercase mt-0.5 font-medium">
            Développeur Web
          </span>
        ) : (
          <span className="text-[10px] font-mono text-zinc-500 tracking-wide mt-0.5 group-hover:text-zinc-400 transition-colors">
            dev &bull; studio
          </span>
        )}
      </div>
    </Link>
  );
}
