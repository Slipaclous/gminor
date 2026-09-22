"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, X, Check, Search } from "lucide-react";

export function ComparisonSection() {
  const rows = [
    {
      criteria: "Propriété du site",
      agency: "Location déguisée ou abonnement 24 à 48 mois obligatoire",
      agencyBad: true,
      gminor: "Vous êtes propriétaire à 100% dès le premier jour",
      gminorGood: true,
    },
    {
      criteria: "Vitesse & Optimisation",
      agency: "Sites lents (3 à 6s), pénalisés par Google et bourrés de plugins",
      agencyBad: true,
      gminor: "Chargement instantané (< 0.4s), score Google 100/100 garanti",
      gminorGood: true,
    },
    {
      criteria: "Interlocuteur",
      agency: "Commercial au début, puis stagiaire ou support délocalisé",
      agencyBad: true,
      gminor: "Gauthier Minor en direct, du cadrage jusqu'au suivi",
      gminorGood: true,
    },
    {
      criteria: "Autonomie de modification",
      agency: "Facturation au moindre changement de texte ou de photo",
      agencyBad: true,
      gminor: "Espace d'administration simple pour modifier vos contenus en autonomie",
      gminorGood: true,
    },
    {
      criteria: "Transparence tarifaire",
      agency: "Frais cachés, licences mensuelles et reconductions tacites",
      agencyBad: true,
      gminor: "Devis clair, forfait net clé en main sans mauvaise surprise",
      gminorGood: true,
    },
  ];

  return (
    <section className="py-20 sm:py-28 border-b border-[#e6e6df] bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
        
        {/* Editorial Header */}
        <div className="space-y-4 max-w-3xl">
          <span className="text-xs font-mono uppercase tracking-wider text-emerald-700 font-bold block">
            COMPARATIF &amp; TRANSPARENCE
          </span>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#18191f] leading-tight">
            Pourquoi les chefs d&apos;entreprise évitent les agences classiques.
          </h2>
          <p className="text-sm sm:text-base text-[#555765] leading-relaxed">
            Trop d&apos;indépendants et de PME se retrouvent piégés par des contrats d&apos;agences opaques ou des sites WordPress bricolés. Voici la différence concrète d&apos;une approche artisanale.
          </p>
        </div>

        {/* Comparison Table / Cards Container */}
        <div className="rounded-3xl border border-[#e6e6df] bg-[#fafaf8] overflow-hidden shadow-card">
          
          {/* Table Header */}
          <div className="grid grid-cols-1 md:grid-cols-12 border-b border-[#e6e6df] bg-[#f4f4f0] text-xs font-mono uppercase tracking-wider text-[#555765]">
            <div className="p-4 sm:p-5 md:col-span-4 font-bold text-[#18191f]">
              Critères essentiels
            </div>
            <div className="p-4 sm:p-5 md:col-span-4 border-t md:border-t-0 md:border-l border-[#e6e6df] text-red-700 font-bold flex items-center gap-1.5">
              <X className="w-4 h-4 text-red-500" />
              <span>Agences web traditionnelles</span>
            </div>
            <div className="p-4 sm:p-5 md:col-span-4 border-t md:border-t-0 md:border-l border-[#e6e6df] bg-emerald-50 text-emerald-800 font-bold flex items-center gap-1.5">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>Avec Gauthier Minor</span>
            </div>
          </div>

          {/* Rows */}
          <div className="divide-y divide-[#e6e6df]">
            {rows.map((row, idx) => (
              <div
                key={idx}
                className="grid grid-cols-1 md:grid-cols-12 text-xs sm:text-sm hover:bg-white transition-colors"
              >
                {/* Criteria */}
                <div className="p-4 sm:p-5 md:col-span-4 font-bold text-[#18191f] flex items-center">
                  {row.criteria}
                </div>

                {/* Agency */}
                <div className="p-4 sm:p-5 md:col-span-4 border-t md:border-t-0 md:border-l border-[#e6e6df] text-[#555765] flex items-start gap-2 bg-[#fafaf8]/50">
                  <span className="text-red-500 font-bold shrink-0 mt-0.5">✕</span>
                  <span className="leading-relaxed">{row.agency}</span>
                </div>

                {/* Gminor */}
                <div className="p-4 sm:p-5 md:col-span-4 border-t md:border-t-0 md:border-l border-[#e6e6df] text-[#18191f] font-medium flex items-start gap-2 bg-emerald-50/40">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="leading-relaxed font-semibold">{row.gminor}</span>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Bottom Reassurance Banner */}
        <div className="p-6 rounded-2xl bg-[#fafaf8] border border-[#e6e6df] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center shrink-0">
              <Search className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-[#18191f] block">
                Vous avez déjà un site qui rame ou qui ne génère rien ?
              </span>
              <span className="text-xs text-[#555765]">
                Je réalise un audit gratuit et sans engagement de votre présence actuelle.
              </span>
            </div>
          </div>

          <Link
            href="/contact?service=Audit%20de%20site"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#18191f] hover:bg-[#2d2e38] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md active:scale-95 shrink-0"
          >
            <span>Demander un audit gratuit</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-emerald-400" />
          </Link>
        </div>

      </div>
    </section>
  );
}
