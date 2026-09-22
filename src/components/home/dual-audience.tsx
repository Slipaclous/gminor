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
    <section className="py-16 sm:py-24 max-w-6xl mx-auto px-4 sm:px-6 border-b border-[#e6e6df] bg-[#fafaf8]">
      {/* Header with reveal */}
      <ScrollReveal className="space-y-3 sm:space-y-4 max-w-3xl mb-10 sm:mb-16">
        <span className="text-xs font-mono uppercase tracking-wider text-emerald-700 font-bold block">
          {"// MÉTHODE & VALEUR AJOUTÉE"}
        </span>
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#18191f] font-sans leading-tight">
          L&apos;exigence technique au service de votre image de marque.
        </h2>
        <p className="text-sm sm:text-base lg:text-lg text-[#555765] leading-relaxed font-normal">
          Que vous soyez un commerce local, un artisan ou une PME en pleine croissance, vous bénéficiez de la même rigueur et du même sens du détail pour réussir en ligne.
        </p>
      </ScrollReveal>

      {/* 4 Pillars Grid with Stagger */}
      <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {displayPillars.map((pillar, idx) => {
          const Icon = DEFAULT_ICONS[idx % DEFAULT_ICONS.length];
          return (
            <StaggerItem key={pillar.id || idx}>
              <div className="group relative rounded-3xl bg-white border border-[#e6e6df] hover:border-emerald-500/40 p-7 sm:p-9 flex flex-col justify-between space-y-6 transition-all duration-300 shadow-card h-full overflow-hidden hover:shadow-lg">
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-[#f7f7f4] border border-[#e6e6df] flex items-center justify-center text-[#18191f] group-hover:text-emerald-700 group-hover:bg-emerald-50 transition-colors">
                      <Icon className="w-5 h-5 text-emerald-600" />
                    </div>
                    <span className="text-xs font-mono text-[#7c7e8c] font-bold">
                      0{pillar.id || idx + 1}
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    <h3 className="text-xl font-bold text-[#18191f] tracking-tight leading-snug">
                      {pillar.title}
                    </h3>
                    <span className="text-xs font-medium text-emerald-700 block">
                      {pillar.tagline}
                    </span>
                  </div>

                  <p className="text-sm text-[#555765] leading-relaxed font-normal">
                    {pillar.description}
                  </p>

                  <ul className="space-y-2.5 pt-3 border-t border-[#e6e6df]">
                    {pillar.points.map((pt, pIdx) => (
                      <li
                        key={pIdx}
                        className="flex items-center gap-2.5 text-xs text-[#18191f]"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
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
