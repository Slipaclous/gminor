import React from "react";
import Link from "next/link";

interface LogoProps {
  className?: string;
}

export function Logo({ className = "" }: LogoProps) {
  return (
    <Link
      href="/"
      className={`group inline-flex items-baseline select-none text-xl font-semibold tracking-[-0.05em] ${className}`}
      aria-label="Accueil - G-Minor"
    >
      <span className="leading-none">gminor</span>
      <span className="leading-none text-signal group-hover:[animation:caret-blink_1.1s_steps(1)_infinite]">_</span>
    </Link>
  );
}
