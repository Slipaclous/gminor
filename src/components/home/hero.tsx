"use client";

import React, { useState } from "react";
import Link from "next/link";
import { HeroSettings } from "@/lib/settings-service";
import { ArrowUpRight } from "lucide-react";

interface HeroProps {
  settings?: HeroSettings;
}

export function Hero({ settings }: HeroProps) {
  const [activeTab, setActiveTab] = useState<"arch" | "stack" | "perf">("arch");

  const badge = settings?.badge || "Gauthier Minor • Développeur Web Full-Stack";
  const title = settings?.title || "Ingénierie logicielle & solutions web sur-mesure.";
  const subtitle =
    settings?.subtitle ||
    "Je développe des applications SaaS, des sites d'entreprises et des plateformes e-commerce à fort trafic. Solide maîtrise de l'écosystème web moderne (React/Next.js, PHP/Symfony, PrestaShop, PostgreSQL & MySQL).";
  const metrics = settings?.metrics || [
    { value: "< 0.4s", label: "Temps de chargement moyen" },
    { value: "100%", label: "Score de performance Google" },
    { value: "5+ ans", label: "Pratique Full-Stack" },
  ];

  return (
    <section className="relative pt-8 pb-16 sm:pt-16 sm:pb-24 md:pt-20 md:pb-28 overflow-hidden border-b border-white/[0.08]">
      {/* Subtle background grid pattern */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(#1f1f23_1px,transparent_1px)] [background-size:20px_20px] sm:[background-size:24px_24px] opacity-35" />

      {/* Mobile-optimized radiant ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-72 sm:w-96 h-72 sm:h-96 bg-emerald-500/[0.06] rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-8 items-center">
          {/* Left Column: Authoritative Editorial Presentation */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900/90 border border-white/[0.1] text-xs shadow-sm">
              <span className="flex h-2 w-2 relative shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-zinc-200 font-medium font-mono text-[11px] sm:text-xs truncate">
                {badge}
              </span>
            </div>

            {/* Main Marquee Headline */}
            <div className="space-y-3 sm:space-y-4">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white font-sans leading-[1.12] sm:leading-[1.08]">
                {title}
              </h1>
              <p className="text-sm sm:text-base lg:text-lg text-zinc-300 max-w-2xl leading-relaxed font-normal">
                {subtitle}
              </p>
            </div>

            {/* Action Buttons (Full-width on mobile, responsive flex on desktop) */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-1">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider text-black bg-white hover:bg-zinc-200 transition-all duration-150 active:scale-95 shadow-xl cursor-pointer"
              >
                <span>Démarrer un projet</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>

              <Link
                href="/projets"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-xs sm:text-sm font-semibold text-zinc-200 bg-zinc-900/90 hover:bg-zinc-800 border border-white/[0.1] hover:border-white/[0.2] transition-all duration-150 cursor-pointer text-center"
              >
                <span>Voir les réalisations</span>
              </Link>
            </div>

            {/* Proof Points Strip (Touch-friendly card metrics on mobile) */}
            <div className="pt-4 border-t border-white/[0.08] grid grid-cols-3 gap-2 sm:gap-4">
              {metrics.map((m, idx) => (
                <div
                  key={idx}
                  className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-black/40 sm:bg-transparent border border-white/[0.06] sm:border-0 space-y-0.5 sm:space-y-1 text-center sm:text-left"
                >
                  <span className="text-lg sm:text-2xl lg:text-3xl font-extrabold text-white font-mono block">
                    {m.value}
                  </span>
                  <span className="text-[10px] sm:text-xs text-zinc-400 block leading-tight font-sans">
                    {m.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Live Interactive Architecture & Code Card */}
          <div className="lg:col-span-5">
            <div className="group relative rounded-2xl sm:rounded-3xl bg-[#0a0a0d] border border-white/[0.12] hover:border-emerald-500/30 overflow-hidden shadow-2xl transition-all duration-300">
              {/* Subtle top border beam */}
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent pointer-events-none" />

              {/* Window Bar Header */}
              <div className="flex items-center justify-between px-3.5 sm:px-4 py-2.5 sm:py-3 bg-[#111116] border-b border-white/[0.08]">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-zinc-700 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-zinc-700 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-zinc-700 inline-block" />
                  <span className="ml-1.5 text-[11px] font-mono text-zinc-400 truncate max-w-[110px] sm:max-w-none">
                    gminor-stack.ts
                  </span>
                </div>

                {/* Tab Switcher */}
                <div className="flex items-center gap-1 bg-black/60 p-0.5 sm:p-1 rounded-lg border border-white/[0.06]">
                  <button
                    type="button"
                    onClick={() => setActiveTab("arch")}
                    className={`px-2 sm:px-2.5 py-1 rounded-md text-[10px] sm:text-[11px] font-mono transition-colors cursor-pointer ${
                      activeTab === "arch"
                        ? "bg-zinc-800 text-white font-semibold shadow-sm"
                        : "text-zinc-400 hover:text-white"
                    }`}
                  >
                    Stack
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab("stack")}
                    className={`px-2 sm:px-2.5 py-1 rounded-md text-[10px] sm:text-[11px] font-mono transition-colors cursor-pointer ${
                      activeTab === "stack"
                        ? "bg-zinc-800 text-white font-semibold shadow-sm"
                        : "text-zinc-400 hover:text-white"
                    }`}
                  >
                    Backend
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab("perf")}
                    className={`px-2 sm:px-2.5 py-1 rounded-md text-[10px] sm:text-[11px] font-mono transition-colors cursor-pointer ${
                      activeTab === "perf"
                        ? "bg-zinc-800 text-white font-semibold shadow-sm"
                        : "text-zinc-400 hover:text-white"
                    }`}
                  >
                    Audits
                  </button>
                </div>
              </div>

              {/* Card Content (Mobile-Friendly Visual Presentation + Desktop Code Highlighting) */}
              <div className="p-4 sm:p-5 font-mono text-xs text-zinc-300 leading-relaxed min-h-[260px] flex flex-col justify-between">
                {activeTab === "arch" && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-[11px] text-zinc-400 border-b border-white/[0.06] pb-2">
                      <span className="text-emerald-400 font-semibold">// Profil &amp; Polyvalence Full-Stack</span>
                      <span className="px-1.5 py-0.5 rounded bg-emerald-950/80 text-emerald-400 text-[10px] border border-emerald-500/30">Actif</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-sans text-xs">
                      <div className="p-2.5 rounded-xl bg-black/60 border border-white/[0.06] space-y-1">
                        <span className="text-[10px] font-mono text-zinc-400 block uppercase">Frontend</span>
                        <span className="font-bold text-white block">Next.js 15, React 19, TypeScript</span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-black/60 border border-white/[0.06] space-y-1">
                        <span className="text-[10px] font-mono text-zinc-400 block uppercase">Backend</span>
                        <span className="font-bold text-white block">PHP 8, Symfony, Node.js</span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-black/60 border border-white/[0.06] space-y-1">
                        <span className="text-[10px] font-mono text-zinc-400 block uppercase">E-Commerce</span>
                        <span className="font-bold text-emerald-300 block">PrestaShop (v1.6 ➔ v9)</span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-black/60 border border-white/[0.06] space-y-1">
                        <span className="text-[10px] font-mono text-zinc-400 block uppercase">Databases</span>
                        <span className="font-bold text-white block">PostgreSQL, MySQL, Prisma</span>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "stack" && (
                  <div className="space-y-3">
                    <div className="text-[11px] text-zinc-400 border-b border-white/[0.06] pb-2">
                      <span className="text-blue-400 font-semibold">// Architecture Backend &amp; Données</span>
                    </div>
                    <ul className="space-y-2 font-sans text-xs">
                      <li className="p-2.5 rounded-xl bg-black/60 border border-white/[0.06] flex items-center gap-2 text-zinc-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                        <span>Migration de bases legacy (MySQL / PostgreSQL)</span>
                      </li>
                      <li className="p-2.5 rounded-xl bg-black/60 border border-white/[0.06] flex items-center gap-2 text-zinc-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                        <span>Modules personnalisés PrestaShop &amp; Symfony</span>
                      </li>
                      <li className="p-2.5 rounded-xl bg-black/60 border border-white/[0.06] flex items-center gap-2 text-zinc-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                        <span>Intégration d&apos;APIs sécurisées &amp; Webhooks</span>
                      </li>
                    </ul>
                  </div>
                )}

                {activeTab === "perf" && (
                  <div className="space-y-3">
                    <span className="text-zinc-400 block text-[11px] font-mono">// Standards de livraison &amp; Performance :</span>
                    <div className="grid grid-cols-2 gap-2 font-sans">
                      <div className="p-2.5 rounded-xl bg-black/60 border border-white/[0.06] flex items-center justify-between">
                        <span className="text-zinc-300 text-xs">Performance</span>
                        <span className="text-emerald-400 font-bold font-mono text-xs sm:text-sm">100/100</span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-black/60 border border-white/[0.06] flex items-center justify-between">
                        <span className="text-zinc-300 text-xs">Accessibilité</span>
                        <span className="text-emerald-400 font-bold font-mono text-xs sm:text-sm">100/100</span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-black/60 border border-white/[0.06] flex items-center justify-between">
                        <span className="text-zinc-300 text-xs">Best Practices</span>
                        <span className="text-emerald-400 font-bold font-mono text-xs sm:text-sm">100/100</span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-black/60 border border-white/[0.06] flex items-center justify-between">
                        <span className="text-zinc-300 text-xs">SEO Google</span>
                        <span className="text-emerald-400 font-bold font-mono text-xs sm:text-sm">100/100</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Bottom Terminal Status */}
                <div className="pt-3.5 border-t border-white/[0.06] flex items-center justify-between text-[10px] sm:text-[11px] text-zinc-400">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span>Multi-stack &bull; Prêt pour production</span>
                  </span>
                  <span className="text-zinc-500 font-mono hidden sm:inline">Next.js &bull; Symfony &bull; PrestaShop</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
