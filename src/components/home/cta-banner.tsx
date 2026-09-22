"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, CheckCircle2, Phone } from "lucide-react";

export function CtaBanner() {
  return (
    <section className="py-20 max-w-6xl mx-auto px-4 sm:px-6">
      <div className="rounded-3xl bg-[#18191f] text-white p-8 sm:p-14 lg:p-16 shadow-2xl relative overflow-hidden">
        {/* Subtle accent corner glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-6">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Prêt à donner à votre entreprise le site qu&apos;elle mérite ?
          </h2>

          <p className="text-base sm:text-lg text-zinc-300 leading-relaxed font-normal">
            Parlons de vos objectifs, de votre budget et de vos délais. Je vous réponds sous 24 heures avec une proposition claire et transparente, sans aucun engagement.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider bg-white hover:bg-zinc-100 text-[#18191f] transition-all shadow-md active:scale-95 cursor-pointer"
            >
              <span>Demander mon devis gratuit</span>
              <ArrowUpRight className="w-4 h-4 text-emerald-600" />
            </Link>

            <a
              href="tel:0470123456"
              className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl text-xs sm:text-sm font-semibold text-white bg-white/10 hover:bg-white/15 border border-white/15 transition-all text-center"
            >
              <Phone className="w-4 h-4 text-emerald-400" />
              <span>Échanger par téléphone</span>
            </a>
          </div>

          {/* Micro assurances */}
          <div className="pt-6 border-t border-white/10 flex flex-wrap items-center gap-6 text-xs text-zinc-400 font-mono">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Devis gratuit sous 24h</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Aucun engagement</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Confidentialité assurée</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
