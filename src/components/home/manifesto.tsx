"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ScrollReveal } from "../ui/scroll-reveal";
import { ShieldCheck, Zap, Code2, CheckCircle2, Terminal } from "lucide-react";

export function Manifesto() {
  return (
    <section className="py-16 sm:py-24 max-w-6xl mx-auto px-4 sm:px-6 border-b border-[#e6e6df] bg-[#fafaf8]">
      <ScrollReveal className="space-y-12">
        {/* Editorial Headline */}
        <div className="space-y-4 max-w-3xl">
          <span className="text-[11px] font-mono uppercase tracking-widest text-emerald-700 font-bold flex items-center gap-2">
            <Terminal className="w-3.5 h-3.5" />
            <span>ENGAGEMENTS &amp; PHILOSOPHIE DE TRAVAIL</span>
          </span>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#18191f] font-sans leading-tight">
            Le refus des usines à gaz. La garantie de résultats concrets.
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-[#555765] leading-relaxed font-normal">
            Le web regorge de sites lents, alourdis par des dizaines de plugins fragiles qui tombent en panne à la première mise à jour. Je propose une approche saine : un site sur-mesure, rapide, sécurisé et pensé pour faire grandir votre entreprise.
          </p>
        </div>

        {/* 3 Strong Conviction Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {/* Card 1 */}
          <div className="group relative rounded-3xl bg-white border border-[#e6e6df] hover:border-emerald-500/40 p-7 sm:p-9 space-y-6 transition-all duration-300 shadow-card flex flex-col justify-between hover:shadow-lg">
            <div className="space-y-6">
              <div className="w-12 h-12 rounded-2xl bg-[#f7f7f4] border border-[#e6e6df] flex items-center justify-center text-emerald-700">
                <Zap className="w-5 h-5" />
              </div>

              <div className="space-y-3">
                <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-700 font-bold block">
                  01 • Vitesse &amp; Conversion
                </span>
                <h3 className="text-xl font-bold text-[#18191f] tracking-tight leading-snug">
                  La vitesse génère du chiffre d&apos;affaires
                </h3>
                <p className="text-sm text-[#555765] leading-relaxed font-normal">
                  Chaque seconde de chargement en trop fait chuter vos conversions. Code épuré et optimisation poussée pour un affichage en moins de 0.4s.
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-[#e6e6df] text-[11px] font-mono text-[#18191f] flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>Score Google Lighthouse 100/100</span>
            </div>
          </div>

          {/* Card 2 */}
          <div className="group relative rounded-3xl bg-white border border-[#e6e6df] hover:border-emerald-500/40 p-7 sm:p-9 space-y-6 transition-all duration-300 shadow-card flex flex-col justify-between hover:shadow-lg">
            <div className="space-y-6">
              <div className="w-12 h-12 rounded-2xl bg-[#f7f7f4] border border-[#e6e6df] flex items-center justify-center text-emerald-700">
                <ShieldCheck className="w-5 h-5" />
              </div>

              <div className="space-y-3">
                <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-700 font-bold block">
                  02 • Zéro Bricolage
                </span>
                <h3 className="text-xl font-bold text-[#18191f] tracking-tight leading-snug">
                  Un code robuste conçu pour durer
                </h3>
                <p className="text-sm text-[#555765] leading-relaxed font-normal">
                  Fini les pannes inexpliquées. Votre site est bâti selon les meilleurs standards de l&apos;industrie pour fonctionner sans accroc durant des années.
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-[#e6e6df] text-[11px] font-mono text-[#18191f] flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>Pérennité &amp; Évolutivité garantie</span>
            </div>
          </div>

          {/* Card 3 */}
          <div className="group relative rounded-3xl bg-white border border-[#e6e6df] hover:border-emerald-500/40 p-7 sm:p-9 space-y-6 transition-all duration-300 shadow-card flex flex-col justify-between hover:shadow-lg">
            <div className="space-y-6">
              <div className="w-12 h-12 rounded-2xl bg-[#f7f7f4] border border-[#e6e6df] flex items-center justify-center text-emerald-700">
                <Code2 className="w-5 h-5" />
              </div>

              <div className="space-y-3">
                <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-700 font-bold block">
                  03 • Autonomie Complète
                </span>
                <h3 className="text-xl font-bold text-[#18191f] tracking-tight leading-snug">
                  Propriétaire et autonome à 100%
                </h3>
                <p className="text-sm text-[#555765] leading-relaxed font-normal">
                  Aucun verrouillage fournisseur. Espace d&apos;administration sur-mesure pour modifier vos textes, médias et tarifs sans frais récurrents.
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-[#e6e6df] text-[11px] font-mono text-[#18191f] flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>Back-office intuitif &amp; Code source livré</span>
            </div>
          </div>
        </div>

        {/* Human Touch / About Gauthier Card */}
        <div className="rounded-3xl bg-white border border-[#e6e6df] p-6 sm:p-10 shadow-card flex flex-col md:flex-row items-center gap-6 sm:gap-8">
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden bg-[#fafaf8] border-2 border-[#e6e6df] shrink-0 flex items-center justify-center shadow-sm">
            <Image
              src="/images/gauthier.jpg"
              alt="Gauthier Minor"
              width={112}
              height={112}
              className="object-cover w-full h-full"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
            <span className="text-xl font-extrabold text-[#18191f] select-none">GM</span>
          </div>

          <div className="space-y-2 text-center md:text-left">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
              <h3 className="text-xl font-extrabold text-[#18191f]">
                Gauthier Minor
              </h3>
              <span className="text-xs font-mono text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 font-semibold">
                Votre interlocuteur unique
              </span>
            </div>
            <p className="text-sm text-[#555765] max-w-2xl leading-relaxed">
              Développeur web basé à <strong>Enghien (Belgique)</strong>. Pas d&apos;intermédiaires commerciaux, pas de sous-traitance à l&apos;autre bout du monde : vous échangez directement avec la personne qui conçoit, programme et assure le suivi de votre outil au quotidien.
            </p>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
