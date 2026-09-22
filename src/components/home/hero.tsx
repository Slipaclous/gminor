"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, CheckCircle2, Phone, ShieldCheck, MapPin } from "lucide-react";
import { HeroSettings } from "@/lib/settings-service";

interface HeroProps {
  settings?: HeroSettings;
}

export function Hero({ settings }: HeroProps) {
  return (
    <section className="relative pt-12 pb-20 sm:pt-20 sm:pb-28 border-b border-[#e6e6df] bg-[#fafaf8] overflow-hidden">
      {/* Editorial subtle pattern */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(#d5d5cc_1px,transparent_1px)] [background-size:24px_24px] opacity-35" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Big Editorial Statement & Craft Positioning */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Direct Local Anchor Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#f4f4f0] border border-[#e6e6df] text-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-700" />
              <span className="text-[#18191f] font-medium text-[11px] sm:text-xs">
                Enghien &bull; Déplacements en Wallonie, Bruxelles &amp; Hauts-de-France
              </span>
            </div>

            {/* Main Headline for SMEs */}
            <div className="space-y-5">
              <h1 className="text-3xl sm:text-5xl lg:text-[56px] font-extrabold tracking-tight text-[#18191f] leading-[1.1]">
                Votre entreprise mérite un site web rapide, clair et rentable.
              </h1>
              
              <p className="text-base sm:text-lg text-[#555765] max-w-xl leading-relaxed font-normal">
                Je conçois des sites vitrines, des boutiques en ligne et des outils de gestion pour les PME, artisans et commerçants. 
                <strong className="text-[#18191f] font-semibold"> Zéro abonnement forcé, zéro usine à gaz, 100% propriétaire.</strong>
              </p>
            </div>

            {/* Direct Action Bar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-1">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider text-white bg-[#18191f] hover:bg-[#2d2e38] transition-all shadow-md active:scale-95 cursor-pointer"
              >
                <span>Demander un devis gratuit</span>
                <ArrowUpRight className="w-4 h-4 text-emerald-400" />
              </Link>

              <Link
                href="/projets"
                className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl text-xs sm:text-sm font-semibold text-[#18191f] bg-white hover:bg-[#f4f4f0] border border-[#e6e6df] hover:border-[#18191f]/30 transition-all shadow-xs text-center"
              >
                <span>Découvrir les réalisations</span>
              </Link>
            </div>

            {/* Concrete Reassurances Strip */}
            <div className="pt-6 border-t border-[#e6e6df] grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex items-center gap-2.5 text-xs text-[#555765]">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Chargement ultra-rapide (&lt; 0.4s)</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-[#555765]">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Interlocuteur direct sans intermédiaire</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-[#555765]">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Garantie support 30 jours incluse</span>
              </div>
            </div>

          </div>

          {/* Right Column: Physical Studio Identity Card / Personal Representation */}
          <div className="lg:col-span-5">
            <div className="relative">
              {/* Background ambient card shadow layer */}
              <div className="absolute -inset-2 bg-gradient-to-tr from-emerald-500/10 via-amber-500/5 to-transparent rounded-3xl blur-xl opacity-60 -z-10" />

              {/* Physical Studio Business Card */}
              <div className="rounded-3xl bg-white border border-[#e6e6df] p-7 sm:p-9 shadow-card space-y-6">
                
                {/* Header with Photo & Badge */}
                <div className="flex items-center gap-4 pb-6 border-b border-[#e6e6df]">
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden bg-[#f4f4f0] border-2 border-[#e6e6df] shrink-0 flex items-center justify-center shadow-xs">
                    <Image
                      src="/images/gauthier.jpg"
                      alt="Gauthier Minor"
                      width={80}
                      height={80}
                      className="object-cover w-full h-full"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                    <span className="text-lg font-black text-[#18191f] select-none">GM</span>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h2 className="text-lg sm:text-xl font-extrabold text-[#18191f]">
                        Gauthier Minor
                      </h2>
                    </div>
                    <p className="text-xs text-[#555765] font-medium">
                      Concepteur &amp; Développeur Web Indépendant
                    </p>
                    <div className="flex items-center gap-1.5 text-[11px] text-[#555765] font-mono">
                      <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Enghien, Belgique</span>
                    </div>
                  </div>
                </div>

                {/* Key Pillars for Decision Makers */}
                <div className="space-y-3.5 text-xs text-[#555765]">
                  <div className="p-3.5 rounded-xl bg-[#fafaf8] border border-[#e6e6df] flex items-start gap-3">
                    <span className="text-base">🤝</span>
                    <div>
                      <strong className="text-[#18191f] block font-semibold">Une relation humaine et transparente</strong>
                      <span>Pas de jargon incompréhensible ni d&apos;agence opaque. On parle objectifs concrets et retours sur investissement.</span>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#fafaf8] border border-[#e6e6df] flex items-start gap-3">
                    <span className="text-base">⚡</span>
                    <div>
                      <strong className="text-[#18191f] block font-semibold">Des sites taillés pour convertir</strong>
                      <span>Optimisés pour le référencement naturel Google (SEO) et parfaitement adaptés aux smartphones de vos clients.</span>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#fafaf8] border border-[#e6e6df] flex items-start gap-3">
                    <span className="text-base">🔑</span>
                    <div>
                      <strong className="text-[#18191f] block font-semibold">Vous êtes 100% propriétaire</strong>
                      <span>Code source livré, hébergement à votre nom, liberté absolue de modifier vos textes et images sans facture surprise.</span>
                    </div>
                  </div>
                </div>

                {/* Quick Call / Meeting Button */}
                <div className="pt-2">
                  <Link
                    href="/contact"
                    className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#fafaf8] hover:bg-[#f4f4f0] border border-[#e6e6df] hover:border-[#18191f]/30 text-xs font-semibold text-[#18191f] transition-all shadow-xs"
                  >
                    <Phone className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Un projet en tête ? Parlons-en ensemble</span>
                  </Link>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
