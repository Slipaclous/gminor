import React from "react";
import { ScrollReveal } from "../ui/scroll-reveal";
import { ShieldCheck, Zap, Code2, Sparkles, CheckCircle2, Terminal } from "lucide-react";

export function Manifesto() {
  return (
    <section className="py-16 sm:py-24 max-w-6xl mx-auto px-4 sm:px-6 border-b border-white/[0.08]">
      <ScrollReveal className="space-y-12">
        {/* Editorial Headline */}
        <div className="space-y-4 max-w-3xl">
          <span className="text-[11px] font-mono uppercase tracking-widest text-emerald-400 font-bold flex items-center gap-2">
            <Terminal className="w-3.5 h-3.5" />
            <span>{"// MANIFESTE & PHILOSOPHIE D'INGÉNIERIE"}</span>
          </span>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white font-sans leading-tight">
            Le refus des usines à gaz. L&apos;exigence du code sur-mesure.
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-zinc-400 leading-relaxed font-normal">
            Le web moderne souffre d&apos;un mal récurrent : des sites alourdis par des dizaines de plugins fragiles, lents à charger et impossibles à maintenir. Je construis des solutions avec une approche opposée.
          </p>
        </div>

        {/* 3 Strong Conviction Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {/* Card 1 */}
          <div className="group relative rounded-3xl bg-[#0d0d10] border border-white/[0.08] hover:border-emerald-500/30 p-7 sm:p-9 space-y-6 transition-all duration-300 shadow-xl overflow-hidden hover:shadow-[0_0_25px_rgba(16,185,129,0.05)] flex flex-col justify-between">
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

            <div className="space-y-6">
              <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-white/[0.1] flex items-center justify-center text-emerald-400">
                <Zap className="w-5 h-5" />
              </div>

              <div className="space-y-3">
                <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400/90 font-bold block">
                  01 • Vitesse &amp; Conversion
                </span>
                <h3 className="text-xl font-bold text-white tracking-tight leading-snug">
                  La vitesse génère du chiffre d&apos;affaires
                </h3>
                <p className="text-sm text-zinc-400 leading-relaxed font-normal">
                  Chaque seconde de chargement en trop fait chuter vos conversions. Code épuré et Server Components pour un affichage en moins de 0.4s.
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-white/[0.06] text-[11px] font-mono text-zinc-300 flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Score Google Lighthouse 100/100</span>
            </div>
          </div>

          {/* Card 2 */}
          <div className="group relative rounded-3xl bg-[#0d0d10] border border-white/[0.08] hover:border-emerald-500/30 p-7 sm:p-9 space-y-6 transition-all duration-300 shadow-xl overflow-hidden hover:shadow-[0_0_25px_rgba(16,185,129,0.05)] flex flex-col justify-between">
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

            <div className="space-y-6">
              <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-white/[0.1] flex items-center justify-center text-emerald-400">
                <ShieldCheck className="w-5 h-5" />
              </div>

              <div className="space-y-3">
                <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400/90 font-bold block">
                  02 • Zéro Dette Technique
                </span>
                <h3 className="text-xl font-bold text-white tracking-tight leading-snug">
                  Un code robuste conçu pour durer
                </h3>
                <p className="text-sm text-zinc-400 leading-relaxed font-normal">
                  Zéro bricolage. TypeScript strict, architecture modulaire et bases de données relationnelles éprouvées (PostgreSQL &amp; MySQL).
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-white/[0.06] text-[11px] font-mono text-zinc-300 flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Pérennité &amp; Évolutivité garantie</span>
            </div>
          </div>

          {/* Card 3 */}
          <div className="group relative rounded-3xl bg-[#0d0d10] border border-white/[0.08] hover:border-emerald-500/30 p-7 sm:p-9 space-y-6 transition-all duration-300 shadow-xl overflow-hidden hover:shadow-[0_0_25px_rgba(16,185,129,0.05)] flex flex-col justify-between">
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

            <div className="space-y-6">
              <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-white/[0.1] flex items-center justify-center text-emerald-400">
                <Code2 className="w-5 h-5" />
              </div>

              <div className="space-y-3">
                <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400/90 font-bold block">
                  03 • Autonomie Complète
                </span>
                <h3 className="text-xl font-bold text-white tracking-tight leading-snug">
                  Propriétaire et autonome à 100%
                </h3>
                <p className="text-sm text-zinc-400 leading-relaxed font-normal">
                  Aucun verrouillage fournisseur. Espace d&apos;administration sur-mesure pour modifier vos textes, médias et tarifs sans frais récurrents.
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-white/[0.06] text-[11px] font-mono text-zinc-300 flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Back-office intuitif &amp; Code source livré</span>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
