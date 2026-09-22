"use client";

import React, { useState } from "react";
import {
  Layers,
  Server,
  ShoppingBag,
  Database,
  ChevronDown,
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
    title: "Sites Web Vitrines & Rapides",
    badge: "Next.js & React",
    skills: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Mobile First", "SEO Google 100/100"],
    icon: Layers,
    tagline: "Des sites élégants, fluides et ultra-rapides (< 0.4s)",
    description:
      "Votre vitrine sur internet : un design sur-mesure valorisant votre savoir-faire, parfaitement lisible sur smartphone et optimisé pour le référencement naturel.",
    highlights: [
      "Affichage instantané sans attente (< 0.4s)",
      "Score Google PageSpeed 100/100 garanti",
      "Formulaires de contact et devis sécurisés",
    ],
  },
  {
    id: "ecommerce",
    title: "Boutiques E-Commerce",
    badge: "Expert PrestaShop",
    skills: ["PrestaShop 9", "Paiements Sécurisés", "Modules Sur-Mesure", "Migration de Données", "Gestion Stocks"],
    icon: ShoppingBag,
    tagline: "Vente en ligne fluide & encaissement sécurisé",
    description:
      "Création, modernisation et maintenance de boutiques en ligne. Spécialiste PrestaShop reconnu (migration v1.6 vers v9, modules de paiement, gestion de catalogue).",
    highlights: [
      "Panier fluide pensé pour éviter les abandons",
      "Paiements Stripe, Bancontact, PayPal & Cartes",
      "Migration de boutique sans interruption de vente",
    ],
  },
  {
    id: "backend",
    title: "Outils Métier & Automatisation",
    badge: "PHP, Symfony & Node.js",
    skills: ["PHP 8", "Symfony", "Node.js", "Connexions API", "Génération PDF", "Exports Excel"],
    icon: Server,
    tagline: "Gagnez du temps sur vos tâches répétitives",
    description:
      "Développement d'outils web sur-mesure pour votre entreprise : tunnels de réservation, espaces membres, génération d'attestations ou synchronisation avec vos logiciels.",
    highlights: [
      "Fin de la paperasse et des fichiers Excel désynchronisés",
      "Génération automatique de PDF, devis et factures",
      "Notifications email et rappels automatiques",
    ],
  },
  {
    id: "database",
    title: "Hébergement & Sérénité",
    badge: "Sécurité & Zéro Panne",
    skills: ["Bases de Données", "Hébergement Cloud", "Certificats SSL", "Sauvegardes Auto", "Maintenance"],
    icon: Database,
    tagline: "Un site sécurisé, sauvegardé et toujours en ligne",
    description:
      "Je configure et sécurise votre infrastructure : hébergement haute performance, nom de domaine, messagerie professionnelle, sauvegardes et certificat HTTPS inclus.",
    highlights: [
      "Sauvegardes régulières et protection anti-piratage",
      "Zéro maintenance complexe pour vous",
      "Assistance technique réactive et directe",
    ],
  },
];

export function TechStrip() {
  // Tous les domaines sont pliés par défaut sur mobile pour une navigation épurée
  const [openDomain, setOpenDomain] = useState<string | null>(null);

  const toggleDomain = (id: string) => {
    setOpenDomain((prev) => (prev === id ? null : id));
  };

  return (
    <section className="border-b border-[#e6e6df] bg-[#fafaf8] py-14 sm:py-20 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-8 sm:space-y-12">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2.5 max-w-2xl">
            <span className="text-[11px] font-mono uppercase tracking-widest text-emerald-800 font-bold flex items-center gap-2">
              <Cpu className="w-3.5 h-3.5" />
              <span>EXPERTISE &amp; SOLUTIONS CONCRÈTES</span>
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#18191f] tracking-tight font-sans leading-tight">
              Des solutions concrètes pour développer votre activité
            </h2>
            <p className="text-xs sm:text-sm text-[#555765] leading-relaxed font-normal">
              Cliquez sur un domaine pour découvrir comment je peux vous aider à moderniser et développer votre présence digitale.
            </p>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-xs font-medium text-[#555765] bg-white border border-[#e6e6df] px-3.5 py-2 rounded-xl shrink-0 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>4 Pôles d&apos;expertise au service de votre entreprise</span>
          </div>
        </div>

        {/* Mobile Accordion View */}
        <div className="block lg:hidden space-y-3">
          {SKILL_DOMAINS.map((domain) => {
            const Icon = domain.icon;
            const isOpen = openDomain === domain.id;

            return (
              <div
                key={domain.id}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden shadow-xs ${
                  isOpen
                    ? "bg-white border-emerald-500/40 shadow-md"
                    : "bg-white border-[#e6e6df] hover:border-[#d5d5cc]"
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
                          ? "bg-emerald-50 border-emerald-300 text-emerald-700"
                          : "bg-[#f7f7f4] border-[#e6e6df] text-[#18191f]"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-sm font-bold text-[#18191f] tracking-tight truncate">
                          {domain.title}
                        </h3>
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-[#f4f4f0] text-[#555765] border border-[#e6e6df]">
                          {domain.badge}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#555765] truncate mt-0.5 font-normal">
                        {domain.tagline}
                      </p>
                    </div>
                  </div>

                  <div
                    className={`w-8 h-8 rounded-lg bg-[#f4f4f0] border border-[#e6e6df] flex items-center justify-center text-[#555765] shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180 text-emerald-700 border-emerald-300" : ""
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {/* Collapsible Content */}
                {isOpen && (
                  <div className="px-4 sm:px-5 pb-5 pt-1 space-y-4 border-t border-[#e6e6df] animate-in fade-in-50 duration-200">
                    <p className="text-xs text-[#555765] leading-relaxed pt-2 font-normal">
                      {domain.description}
                    </p>

                    {/* Highlights */}
                    <div className="space-y-2 bg-[#fafaf8] p-3.5 rounded-xl border border-[#e6e6df]">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-700 font-bold block">
                        Livrables &amp; Spécificités clés :
                      </span>
                      <ul className="space-y-1.5">
                        {domain.highlights.map((h, hIdx) => (
                          <li
                            key={hIdx}
                            className="flex items-start gap-2 text-xs text-[#18191f] leading-snug"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Skill Badges */}
                    <div className="space-y-2">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[#7c7e8c] font-bold block">
                        Technologies &amp; Standards :
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {domain.skills.map((skill) => (
                          <span
                            key={skill}
                            className="px-2.5 py-1 rounded-lg text-xs font-medium text-[#18191f] bg-[#f4f4f0] border border-[#e6e6df]"
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

        {/* Desktop 4-Column Grid View */}
        <div className="hidden lg:grid grid-cols-4 gap-5">
          {SKILL_DOMAINS.map((domain) => {
            const Icon = domain.icon;
            return (
              <div
                key={domain.id}
                className="group relative rounded-2xl bg-white border border-[#e6e6df] hover:border-emerald-500/40 p-6 space-y-4 transition-all duration-300 shadow-card flex flex-col justify-between overflow-hidden hover:shadow-lg"
              >
                <div className="space-y-3.5">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-[#f7f7f4] border border-[#e6e6df] flex items-center justify-center text-[#18191f] group-hover:text-emerald-700 group-hover:bg-emerald-50 transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-[#f4f4f0] text-[#555765] border border-[#e6e6df]">
                      {domain.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-[#18191f] tracking-tight">
                      {domain.title}
                    </h3>
                    <p className="text-xs text-[#555765] mt-1.5 leading-relaxed">
                      {domain.description}
                    </p>
                  </div>
                </div>

                <div className="space-y-3 pt-3 border-t border-[#e6e6df]">
                  <ul className="space-y-1.5">
                    {domain.highlights.slice(0, 2).map((h, hIdx) => (
                      <li
                        key={hIdx}
                        className="flex items-start gap-1.5 text-[11px] text-[#18191f] leading-tight"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="truncate">{h}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {domain.skills.slice(0, 3).map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-0.5 rounded-md text-[10px] font-medium text-[#555765] bg-[#fafaf8] border border-[#e6e6df]"
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
