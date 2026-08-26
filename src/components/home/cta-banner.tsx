"use client";

import React from "react";
import Link from "next/link";
import { ScrollReveal } from "../ui/scroll-reveal";
import { ArrowUpRight, MessageSquare, Sparkles } from "lucide-react";

export function CtaBanner() {
  return (
    <section className="py-24 max-w-6xl mx-auto px-4 sm:px-6 w-full">
      <ScrollReveal className="group relative rounded-3xl bg-gradient-to-b from-[#111116] to-[#070709] border border-white/[0.12] hover:border-emerald-500/40 p-8 sm:p-12 md:p-16 overflow-hidden text-center space-y-8 shadow-2xl transition-all duration-300">
        {/* Subtle top border beam highlight */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent pointer-events-none" />

        {/* Ambient background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/[0.04] rounded-full blur-3xl pointer-events-none" />

        <div className="space-y-4 max-w-2xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-white/[0.1] text-xs font-mono text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Disponible pour nouveaux projets</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white font-sans leading-tight">
            Prêt à donner une nouvelle dimension à votre projet ?
          </h2>

          <p className="text-base sm:text-lg text-zinc-300 font-normal leading-relaxed">
            Discutons de vos objectifs, de votre planning et des solutions techniques les plus adaptées. Devis gratuit sous 24 heures.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 relative z-10 pt-2">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-7 py-4 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider text-black bg-white hover:bg-zinc-200 transition-all duration-150 shadow-xl active:scale-95 cursor-pointer"
          >
            <span>Démarrer un projet</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>

          <Link
            href="/services"
            className="inline-flex items-center gap-2 px-6 py-4 rounded-xl text-xs sm:text-sm font-semibold text-zinc-300 hover:text-white bg-zinc-900 hover:bg-zinc-800 border border-white/[0.1] hover:border-white/[0.25] transition-all duration-150 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>Simuler un devis en direct</span>
          </Link>
        </div>
      </ScrollReveal>
    </section>
  );
}
