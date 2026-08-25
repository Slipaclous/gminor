import React from "react";
import Link from "next/link";

interface LogoProps {
  className?: string;
}

export function Logo({ className = "" }: LogoProps) {
  return (
    <Link
      href="/"
      className={`group inline-flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-xl transition-all ${className}`}
      aria-label="Accueil - Gauthier Minor"
    >
      {/* Option 1: Terminal Code Minimalist <GM/> */}
      <div className="relative flex items-center justify-center h-10 px-3.5 rounded-xl bg-zinc-900 border border-white/[0.14] transition-all duration-300 group-hover:border-emerald-500/50 group-hover:bg-zinc-800 shadow-sm group-hover:shadow-[0_0_20px_rgba(16,185,129,0.15)]">
        <svg
          viewBox="0 0 110 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-6.5 w-auto"
        >
          {/* Left Bracket < */}
          <path
            d="M10 8L3 16L10 24"
            stroke="#10b981"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-transform duration-200 group-hover:-translate-x-0.5"
          />

          {/* GM Typography */}
          <text
            x="44"
            y="22.5"
            textAnchor="middle"
            fill="#ffffff"
            fontSize="17"
            fontWeight="800"
            fontFamily="var(--font-geist-sans), system-ui, -apple-system, sans-serif"
            letterSpacing="0.06em"
            className="select-none transition-colors group-hover:fill-emerald-300"
          >
            GM
          </text>

          {/* Closing Slash / */}
          <path
            d="M78 24L84 8"
            stroke="#10b981"
            strokeWidth="2.4"
            strokeLinecap="round"
          />

          {/* Right Bracket > */}
          <path
            d="M94 8L101 16L94 24"
            stroke="#10b981"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-transform duration-200 group-hover:translate-x-0.5"
          />
        </svg>
      </div>
    </Link>
  );
}
