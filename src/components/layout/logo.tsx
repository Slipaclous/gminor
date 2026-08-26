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
      aria-label="Accueil - G-Minor"
    >
      {/* Emblème Badge Signature (Carré noir mat avec G- et diode émeraude) */}
      <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-[#0d0e12] border border-white/[0.12] group-hover:border-emerald-500/40 flex items-center justify-center transition-all duration-300 shadow-md group-hover:shadow-[0_0_20px_rgba(16,185,129,0.18)] shrink-0 overflow-hidden">
        {/* Subtle top shimmer */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-400/30 to-transparent pointer-events-none" />

        {/* Monogramme G- */}
        <span className="text-xs sm:text-sm font-black font-mono tracking-tight text-white group-hover:text-emerald-300 transition-colors flex items-center">
          <span>G</span>
          <span className="text-emerald-400 font-bold ml-0.5">-</span>
        </span>

        {/* Micro-diode émeraude pulsante */}
        <span className="absolute bottom-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_#10b981] group-hover:scale-125 transition-transform" />
      </div>

      {/* Mot-Symbole Typographique Studio (G-Minor.) */}
      <div className="flex flex-col">
        <div className="flex items-center text-base sm:text-lg font-extrabold tracking-tight text-white font-sans leading-none">
          <span>G</span>
          <span className="text-emerald-400 font-bold mx-0.5">-</span>
          <span>Minor</span>
          <span className="text-emerald-400 font-extrabold text-lg group-hover:animate-pulse">.</span>
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
