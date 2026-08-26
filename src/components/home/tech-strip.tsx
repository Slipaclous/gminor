"use client";

import React, { useState } from "react";
import {
  Layers,
  Server,
  ShoppingBag,
  Database,
  ChevronDown,
  Sparkles,
  CheckCircle2,
  Cpu,
  ArrowUpRight,
} from "lucide-react";

interface SkillDomain {
  id: string;
  title: string;
  badge: string;
  skills: string[];
  icon: React.ComponentType<{ className?: string }>;
  tagline: string;
  description: string;
  highlights: string[];
}

const SKILL_DOMAINS: SkillDomain[] = [
  {
    id: "frontend",
    title: "Frontend & UI Moderne",
    badge: "Next.js & React 19",
    skills: ["React 19", "Next.js 15/16", "TypeScript", "Tailwind CSS", "Framer Motion", "HTML5 / Twig"],
    icon: Layers,
    tagline: "Interfaces réactives & design haute précision",
    description:
      "Conception d'expériences web immersives, fluides et ultra-rapides (< 0.4s). Respect strict des Core Web Vitals et ergonomie mobile-first.",
    highlights: [
      "Architecture App Router & Server Components",
      "Animations interactives & Micro-interactions",
      "Accessibilité WCAG & score SEO 100/100",
    ],
  },
  {
    id: "backend",
    title: "Backend & Architecture",
    badge: "PHP 8 & Symfony",
    skills: ["PHP 8.3", "Symfony", "Node.js", "APIs REST", "Webhooks", "Architecture MVC"],
    icon: Server,
    tagline: "Logique serveur robuste & flux automatisés",
    description:
      "Développement de serveurs fiables, sécurisés et scalables pour vos applications SaaS et vos outils de gestion d'entreprise.",
    highlights: [
      "Développement d'APIs RESTful sécurisées",
      "Intégration de passerelles Stripe, Resend, CRM",
      "Traitement asynchrone & tâches planifiées (Cron)",
    ],
  },
  {
    id: "ecommerce",
    title: "E-Commerce & PrestaShop",
    badge: "Expertise v1.6 à v9",
    skills: ["PrestaShop 9", "Modules Sur-Mesure", "Migration de Données", "Drupal", "Headless"],
    icon: ShoppingBag,
    tagline: "Boutiques à fort trafic & refontes complexes",
    description:
      "Spécialiste PrestaShop reconnu : création de modules personnalisés, interfaçage ERP et migration sans interruption de service.",
    highlights: [
      "Migration majeure v1.6 / 1.7 vers PrestaShop 8/9",
      "Modules de paiement, export et tarification sur-mesure",
      "Optimisation de bases e-commerce à +100 000 produits",
    ],
  },
  {
    id: "database",
    title: "Bases de Données & Infra",
    badge: "PostgreSQL & MySQL",
    skills: ["PostgreSQL", "MySQL", "Prisma ORM", "Docker", "Git", "Vercel / cPanel"],
    icon: Database,
    tagline: "Modélisation relationnelle & haute disponibilité",
    description:
      "Structuration stricte des données, indexation avancée pour requêtes instantanées et déploiement continu automatisé.",
    highlights: [
      "Schémas typés TypeScript avec Prisma ORM",
      "Optimisation et profiling des requêtes SQL lentes",
      "Pipelines CI/CD & environnements de staging",
    ],
  },
];

export function TechStrip() {
  // Sur mobile, on ouvre le 1er domaine par défaut, tout en permettant d'ouvrir/fermer chaque domaine
  const [openDomain, setOpenDomain] = useState<string | null>("frontend");

  const toggleDomain = (id: string) => {
    setOpenDomain((prev) => (prev === id ? null : id));
  };

  return (
    <section className="border-b border-white/[0.08] bg-[#070709] py-12 sm:py-16 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-8 sm:space-y-10">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2 max-w-2xl">
            <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>// MAÎTRISE TECHNIQUE MULTI-STACK</span>
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-sans">
              Une expertise polyvalente adaptée à vos enjeux
            </h2>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal">
              Touchez un domaine pour explorer les compétences détaillées, stacks et cas d&apos;application concrets.
            </p>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-zinc-400 bg-zinc-900 border border-white/[0.08] px-3.5 py-2 rounded-xl shrink-0">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>4 Pôles d&apos;ingénierie logicielle</span>
          </div>
        </div>

        {/* Mobile Accordion View (Sleek, Collapsible & Touch-Optimized for Phones) */}
        <div className="block lg:hidden space-y-3">
          {SKILL_DOMAINS.map((domain) => {
            const Icon = domain.icon;
            const isOpen = openDomain === domain.id;

            return (
              <div
                key={domain.id}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden shadow-lg ${
                  isOpen
                    ? "bg-[#0f1016] border-emerald-500/40 shadow-emerald-950/20"
                    : "bg-[#0b0c10] border-white/[0.08] hover:border-white/[0.18]"
                }`}
              >
                {/* Accordion Touch Trigger Button */}
                <button
                  type="button"
                  onClick={() => toggleDomain(domain.id)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-3 cursor-pointer select-none"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div
                      className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 transition-colors ${
                        isOpen
                          ? "bg-emerald-950/80 border-emerald-500/40 text-emerald-400"
                          : "bg-zinc-900 border-white/[0.1] text-zinc-300"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-sm sm:text-base font-bold text-white tracking-tight truncate">
                          {domain.title}
                        </h3>
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-zinc-900 text-zinc-300 border border-white/[0.08]">
                          {domain.badge}
                        </span>
                      </div>
                      <p className="text-[11px] text-zinc-400 truncate mt-0.5">
                        {domain.tagline}
                      </p>
                    </div>
                  </div>

                  <div
                    className={`w-8 h-8 rounded-lg bg-zinc-900/90 border border-white/[0.08] flex items-center justify-center text-zinc-400 shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180 text-emerald-400 border-emerald-500/30" : ""
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {/* Collapsible Content */}
                {isOpen && (
                  <div className="px-4 sm:px-5 pb-5 pt-1 space-y-4 border-t border-white/[0.06] animate-in fade-in-50 duration-200">
                    <p className="text-xs text-zinc-300 leading-relaxed pt-2">
                      {domain.description}
                    </p>

                    {/* Highlights */}
                    <div className="space-y-2 bg-black/40 p-3.5 rounded-xl border border-white/[0.06]">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 font-semibold block">
                        Livrables &amp; Spécificités clés :
                      </span>
                      <ul className="space-y-1.5">
                        {domain.highlights.map((h, hIdx) => (
                          <li
                            key={hIdx}
                            className="flex items-start gap-2 text-xs text-zinc-300 leading-snug"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Skill Badges */}
                    <div className="space-y-2">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 font-semibold block">
                        Technologies maîtrisées :
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {domain.skills.map((skill) => (
                          <span
                            key={skill}
                            className="px-2.5 py-1 rounded-lg text-xs font-mono text-zinc-200 bg-zinc-900 border border-white/[0.1] font-medium"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Desktop 4-Column Grid View (Stately & High-Craft for Larger Screens) */}
        <div className="hidden lg:grid grid-cols-4 gap-4">
          {SKILL_DOMAINS.map((domain) => {
            const Icon = domain.icon;
            return (
              <div
                key={domain.id}
                className="group relative rounded-2xl bg-[#0d0d10] border border-white/[0.08] hover:border-emerald-500/40 p-5 space-y-4 transition-all duration-300 shadow-xl flex flex-col justify-between overflow-hidden hover:shadow-[0_0_25px_rgba(16,185,129,0.06)]"
              >
                {/* Subtle top border beam highlight */}
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-white/[0.1] flex items-center justify-center text-white group-hover:text-emerald-400 transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-md bg-zinc-900 text-zinc-400 border border-white/[0.08]">
                      {domain.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-white tracking-tight">
                      {domain.title}
                    </h3>
                    <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                      {domain.description}
                    </p>
                  </div>
                </div>

                <div className="space-y-3 pt-3 border-t border-white/[0.06]">
                  <ul className="space-y-1">
                    {domain.highlights.slice(0, 2).map((h, hIdx) => (
                      <li
                        key={hIdx}
                        className="flex items-start gap-1.5 text-[11px] text-zinc-300 leading-tight"
                      >
                        <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0 mt-0.5" />
                        <span className="truncate">{h}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {domain.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-0.5 rounded-md text-[10px] font-mono text-zinc-300 bg-black border border-white/[0.08]"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
