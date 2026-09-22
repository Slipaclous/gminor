"use client";

import React, { useState } from "react";
import Image from "next/image";

interface ProjectVisualProps {
  slug: string;
  title: string;
  category: string;
  categoryLabel: string;
  imageUrl?: string;
  aspectRatio?: string;
  className?: string;
}

// Light warm craft backgrounds & borders - No dark/black backgrounds
const PROJECT_THEMES: Record<
  string,
  {
    bg: string;
    border: string;
    badgeBg: string;
    badgeText: string;
    badgeBorder: string;
    type: "screenshot" | "brand";
    abstractMonogram: string;
    paletteSubtitle: string;
  }
> = {
  "solera-platform": {
    bg: "bg-[#f4f7fa]", // Soft slate blue light
    border: "border-[#d8e2ec]",
    badgeBg: "bg-blue-50",
    badgeText: "text-blue-800",
    badgeBorder: "border-blue-200",
    type: "screenshot",
    abstractMonogram: "SOL",
    paletteSubtitle: "Fleet & Warehouse Operations",
  },
  "rent-a-book": {
    bg: "bg-[#f0f7fc]", // Soft azure school light
    border: "border-[#d0e5f5]",
    badgeBg: "bg-sky-50",
    badgeText: "text-sky-800",
    badgeBorder: "border-sky-200",
    type: "brand",
    abstractMonogram: "RAB",
    paletteSubtitle: "Location Manuels Scolaires",
  },
  "vb-enghien": {
    bg: "bg-[#f4f3fb]", // Soft indigo light
    border: "border-[#dfdaf5]",
    badgeBg: "bg-indigo-50",
    badgeText: "text-indigo-800",
    badgeBorder: "border-indigo-200",
    type: "brand",
    abstractMonogram: "VBE",
    paletteSubtitle: "Volley-Ball Club Enghien",
  },
  "villa-dolce": {
    bg: "bg-[#faf6f0]", // Warm ivory luxury light
    border: "border-[#eadecc]",
    badgeBg: "bg-amber-50",
    badgeText: "text-amber-800",
    badgeBorder: "border-amber-200",
    type: "brand",
    abstractMonogram: "VD",
    paletteSubtitle: "Hôtel & Résidences d'Exception",
  },
  "marionnettes-saintes-en-fete": {
    bg: "bg-[#faf4f0]", // Warm terracotta cream
    border: "border-[#eedad0]",
    badgeBg: "bg-orange-50",
    badgeText: "text-orange-800",
    badgeBorder: "border-orange-200",
    type: "brand",
    abstractMonogram: "STES",
    paletteSubtitle: "ASBL Arts & Fêtes",
  },
  "jac-26": {
    bg: "bg-[#f3f7f2]", // Sage green light
    border: "border-[#d8e6d6]",
    badgeBg: "bg-emerald-50",
    badgeText: "text-emerald-800",
    badgeBorder: "border-emerald-200",
    type: "brand",
    abstractMonogram: "JAC",
    paletteSubtitle: "Fédération Confréries Wallonie",
  },
  "amarea": {
    bg: "bg-[#faf3f5]", // Pale rose light
    border: "border-[#eed8df]",
    badgeBg: "bg-rose-50",
    badgeText: "text-rose-800",
    badgeBorder: "border-rose-200",
    type: "brand",
    abstractMonogram: "AW",
    paletteSubtitle: "Wedding Planning d'Exception",
  },
  "mgevents": {
    bg: "bg-[#f6f3fa]", // Soft lavender light
    border: "border-[#e2daf0]",
    badgeBg: "bg-purple-50",
    badgeText: "text-purple-800",
    badgeBorder: "border-purple-200",
    type: "brand",
    abstractMonogram: "MGE",
    paletteSubtitle: "Location & Sonorisation Pro",
  },
  "focale-28": {
    bg: "bg-[#f4f4f4]", // Light neutral grey
    border: "border-[#dedede]",
    badgeBg: "bg-zinc-100",
    badgeText: "text-zinc-800",
    badgeBorder: "border-zinc-300",
    type: "brand",
    abstractMonogram: "F2.8",
    paletteSubtitle: "Portraits & Reportages d'Art",
  },
  "jlp-podologue": {
    bg: "bg-[#f0f8f8]", // Soft medical teal light
    border: "border-[#d0e8e8]",
    badgeBg: "bg-teal-50",
    badgeText: "text-teal-800",
    badgeBorder: "border-teal-200",
    type: "brand",
    abstractMonogram: "JLP",
    paletteSubtitle: "Posturologie & Soins Spécialisés",
  },
  "bruxelles-proprete": {
    bg: "bg-[#f2f8f4]", // Fresh green light
    border: "border-[#d2e8d8]",
    badgeBg: "bg-emerald-50",
    badgeText: "text-emerald-800",
    badgeBorder: "border-emerald-200",
    type: "brand",
    abstractMonogram: "BP",
    paletteSubtitle: "Région de Bruxelles-Capitale",
  },
  "garage-bosmans": {
    bg: "bg-[#f6f5f2]", // Warm automotive stone light
    border: "border-[#e0ded8]",
    badgeBg: "bg-amber-50",
    badgeText: "text-amber-800",
    badgeBorder: "border-amber-200",
    type: "brand",
    abstractMonogram: "BOS",
    paletteSubtitle: "Artisan & Entretien Automobile",
  },
  "fifty-one-enghien": {
    bg: "bg-[#f2f6fa]", // Classic light blue
    border: "border-[#d2e0f0]",
    badgeBg: "bg-blue-50",
    badgeText: "text-blue-800",
    badgeBorder: "border-blue-200",
    type: "brand",
    abstractMonogram: "FOE",
    paletteSubtitle: "Club Service International",
  },
};

export function ProjectVisual({
  slug,
  title,
  category,
  categoryLabel,
  imageUrl,
  aspectRatio = "aspect-[16/10]",
  className = "",
}: ProjectVisualProps) {
  const [hasError, setHasError] = useState(false);
  const theme = PROJECT_THEMES[slug] || {
    bg: "bg-[#fafaf8]",
    border: "border-[#e6e6df]",
    badgeBg: "bg-[#f4f4f0]",
    badgeText: "text-[#18191f]",
    badgeBorder: "border-[#e6e6df]",
    type: "brand",
    abstractMonogram: title.slice(0, 3).toUpperCase(),
    paletteSubtitle: categoryLabel,
  };

  const isSvg = Boolean(imageUrl?.toLowerCase().includes(".svg"));
  const isBrand = theme.type === "brand" || isSvg;
  const showImage = Boolean(imageUrl) && !hasError;

  return (
    <div
      className={`relative w-full ${aspectRatio} rounded-2xl overflow-hidden border ${theme.border} ${theme.bg} flex items-center justify-center select-none transition-all duration-300 ${className}`}
    >
      {/* Subtle fine light dot grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#d5d5cc_1px,transparent_1px)] [background-size:16px_16px] opacity-25 pointer-events-none" />

      {showImage ? (
        isBrand ? (
          /* Brand / Logo Presentation: Clean light background with generous padding, zero crop */
          <div className="relative z-10 flex flex-col items-center justify-center p-6 sm:p-8 w-full h-full">
            <div className="relative w-36 sm:w-48 md:w-56 h-28 sm:h-36 flex items-center justify-center transition-transform duration-500 ease-out group-hover:scale-105">
              <Image
                src={imageUrl!}
                alt={title}
                fill
                sizes="(max-width: 768px) 250px, 350px"
                className="object-contain"
                onError={() => setHasError(true)}
              />
            </div>

            {/* Subtle editorial subtitle below logo */}
            <div className="mt-3 text-center">
              <span className="text-[11px] font-mono tracking-wider uppercase text-[#555765]/70 block">
                {theme.paletteSubtitle}
              </span>
            </div>
          </div>
        ) : (
          /* Screenshot Presentation: Clean light frame */
          <div className="relative w-full h-full p-4 sm:p-6 overflow-hidden flex items-center justify-center">
            <div className="relative w-full h-full rounded-xl overflow-hidden shadow-xs border border-[#e6e6df]/70 bg-white">
              <Image
                src={imageUrl!}
                alt={title}
                fill
                sizes="(max-width: 768px) 100vw, 600px"
                className="object-contain object-top transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                onError={() => setHasError(true)}
              />
            </div>
          </div>
        )
      ) : (
        /* Typographic Monogram Card for missing images */
        <div className="relative z-10 flex flex-col items-center justify-center text-center p-6 space-y-3">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white border border-[#e6e6df] flex items-center justify-center shadow-xs">
            <span className="text-xl sm:text-2xl font-black font-mono text-[#18191f] tracking-widest">
              {theme.abstractMonogram}
            </span>
          </div>
          <div className="space-y-1">
            <div className="text-base sm:text-lg font-bold text-[#18191f] tracking-tight">
              {title}
            </div>
            <div className="text-xs font-mono text-[#555765] tracking-wider uppercase">
              {theme.paletteSubtitle}
            </div>
          </div>
        </div>
      )}

      {/* Top-Right Badge: Category / Specialization */}
      <div className="absolute top-3 right-3 z-20">
        <span
          className={`px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider font-semibold ${theme.badgeBg} ${theme.badgeText} border ${theme.badgeBorder} shadow-2xs`}
        >
          {categoryLabel}
        </span>
      </div>
    </div>
  );
}
