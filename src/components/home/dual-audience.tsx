import React from "react";
import { PillarItem } from "@/lib/settings-service";
import { ScrollReveal, StaggerContainer, StaggerItem } from "../ui/scroll-reveal";
import {
  Zap,
  Database,
  Layout,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

interface DualAudienceProps {
  pillars?: PillarItem[];
}

const DEFAULT_ICONS = [Zap, Database, Layout, ShieldCheck];

export function DualAudience({ pillars }: DualAudienceProps) {
  const displayPillars =
    pillars && pillars.length > 0
      ? pillars
      : [
          {
            id: 1,
            title: "Performance & Vitesse Radicale",
            tagline: "Un site qui se charge en moins de 0.4 seconde",
            description:
              "Chaque milliseconde compte pour votre référencement Google et le taux de conversion de vos prospects. Optimisation complète des Core Web Vitals.",
            points: [
              "Score Lighthouse 100/100 garanti",
              "Architecture Next.js 15 & Server Components",
              "Zéro perte de prospects due aux lenteurs",
            ],
          },
          {
            id: 2,
            title: "Architecture & Données Robustes",
            tagline: "Prisma ORM & PostgreSQL sans dette technique",
            description:
              "Des schémas de bases de données stricts, sécurisés et scalables pour vos applications SaaS et vos flux de données métier.",
            points: [
              "Typage TypeScript strict de bout en bout",
              "Migrations de données sécurisées (Neon & Prisma)",
              "Code prêt pour l'intégration d'équipe",
            ],
          },
          {
            id: 3,
            title: "Design d'Exception & Conversion",
            tagline: "Une identité visuelle sur-mesure et mémorable",
            description:
              "Zéro template impersonnel. Une interface soignée, responsive et pensée pour guider l'utilisateur vers la prise de contact ou l'achat.",
            points: [
              "Direction artistique sur-mesure et moderne",
              "Ergonomie fluide sur mobile, tablette et desktop",
              "Parcours utilisateur axé sur la conversion",
            ],
          },
          {
            id: 4,
            title: "Autonomie Totale & Back-Office",
            tagline: "Modifiez vos contenus sans dépendre d'un tiers",
            description:
              "Chaque projet est livré avec un espace d'administration intuitif et sécurisé pour actualiser vos réalisations, tarifs et contenus en 1 clic.",
            points: [
              "Panneau d'administration épuré et sécurisé",
              "Gestion des demandes de contact et devis",
              "Garantie et support technique inclus 30 jours",
            ],
          },
        ];

  return (
    <section className="py-24 max-w-6xl mx-auto px-4 sm:px-6 border-b border-white/[0.08]">
      {/* Header with reveal */}
      <ScrollReveal className="space-y-4 max-w-3xl mb-16">
        <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 block">
          // MÉTHODE &amp; VALEUR AJOUTÉE
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white font-sans leading-tight">
          L&apos;exigence de l&apos;ingénierie au service de votre image.
        </h2>
        <p className="text-base sm:text-lg text-zinc-300 leading-relaxed font-normal">
          Que vous soyez une entreprise cherchant à moderniser sa présence ou une startup lançant un produit SaaS, je combine rigueur technique et sens du détail.
        </p>
      </ScrollReveal>

      {/* 4 Pillars Grid with Stagger */}
      <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {displayPillars.map((pillar, idx) => {
          const Icon = DEFAULT_ICONS[idx % DEFAULT_ICONS.length];
          return (
            <StaggerItem key={pillar.id || idx}>
              <div className="group rounded-3xl bg-[#0d0d10] border border-white/[0.08] p-8 flex flex-col justify-between space-y-6 hover:border-white/[0.25] transition-all duration-300 shadow-xl h-full">
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-white/[0.1] flex items-center justify-center text-white">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-mono text-zinc-500 font-bold">
                      0{pillar.id || idx + 1}
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    <h3 className="text-xl font-bold text-white tracking-tight">
                      {pillar.title}
                    </h3>
                    <span className="text-xs font-mono text-zinc-400 block">
                      {pillar.tagline}
                    </span>
                  </div>

                  <p className="text-sm text-zinc-300 leading-relaxed font-normal">
                    {pillar.description}
                  </p>

                  <ul className="space-y-2 pt-2 border-t border-white/[0.06]">
                    {pillar.points.map((pt, pIdx) => (
                      <li
                        key={pIdx}
                        className="flex items-center gap-2.5 text-xs text-zinc-300"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </StaggerItem>
          );
        })}
      </StaggerContainer>
    </section>
  );
}
