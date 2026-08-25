import React from "react";
import { Zap, ShieldCheck, Smartphone, Search, Database, Layout } from "lucide-react";

const STACK_ITEMS = [
  { name: "Next.js 15", benefit: "Vitesse d'affichage maximale", icon: Zap },
  { name: "Responsive Mobile", benefit: "Parfait sur tous les écrans", icon: Smartphone },
  { name: "PostgreSQL & Prisma", benefit: "Sécurité des données & fiabilité", icon: Database },
  { name: "SEO Technique", benefit: "Positionnement Google optimisé", icon: Search },
  { name: "Design Sur-Mesure", benefit: "Zéro modèle préconçu", icon: Layout },
  { name: "Code Garanti", benefit: "Suivi & maintenance inclus", icon: ShieldCheck },
];

export function TechStrip() {
  return (
    <section className="border-y border-white/[0.1] bg-zinc-950/80 py-8 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="text-xs font-semibold uppercase tracking-wider text-emerald-400 flex items-center gap-2 shrink-0">
            <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
            <span>Standards de qualité & Engagements</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:flex lg:flex-wrap items-center gap-3">
            {STACK_ITEMS.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.name}
                  className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-zinc-900/90 border border-white/[0.1] text-xs shadow-sm"
                >
                  <Icon className="w-4 h-4 text-emerald-400 shrink-0" />
                  <div>
                    <span className="font-bold text-white block">
                      {item.name}
                    </span>
                    <span className="text-[11px] text-zinc-300 block">
                      {item.benefit}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
