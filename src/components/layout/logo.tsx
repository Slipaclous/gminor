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
      className={`group inline-flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-xl transition-all select-none ${className}`}
      aria-label="Accueil - G-Minor"
    >
      {/* Pure Typographic Studio Wordmark (G-Minor.) */}
      <div className="flex flex-col">
        <div className="flex items-center text-lg sm:text-xl font-extrabold tracking-tight text-white font-sans leading-none">
          <span className="transition-colors group-hover:text-zinc-200">G</span>
          <span className="text-emerald-400 font-bold mx-0.5">-</span>
          <span className="transition-colors group-hover:text-zinc-200">Minor</span>
          <span className="text-emerald-400 font-extrabold text-xl group-hover:scale-125 transition-transform origin-bottom inline-block">.</span>
        </div>
        {showSubtitle ? (
          <span className="text-[10px] font-mono text-zinc-400 tracking-wider uppercase mt-1 font-medium">
            Développeur Web
          </span>
        ) : (
          <span className="text-[10px] font-mono text-zinc-500 tracking-wide mt-1 group-hover:text-zinc-400 transition-colors">
            dev &bull; studio
          </span>
        )}
      </div>
    </Link>
  );
}
