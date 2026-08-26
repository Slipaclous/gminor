import React from "react";
import { ScrollReveal } from "../ui/scroll-reveal";
import {
  FileText,
  Eye,
  Rocket,
  Headphones,
  CheckCircle2,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

const JOURNEY_STEPS = [
  {
    step: "01",
    title: "Cadrage & Devis Sous 24h",
    subtitle: "Zéro surprise financière",
    description:
      "Nous échangeons sur vos objectifs business, vos contraintes techniques et votre calendrier. Vous recevez un devis clair, forfaitaire et sans coûts cachés.",
    icon: FileText,
    badge: "Forfait garanti",
  },
  {
    step: "02",
    title: "Lien de Staging Privé en Direct",
    subtitle: "Transparence totale du développement",
    description:
      "Dès la première semaine, vous disposez d'un lien privé sécurisé pour tester l'application en direct, valider les étapes et ajuster vos retours en continu.",
    icon: Eye,
    badge: "Accès 24/7",
  },
  {
    step: "03",
    title: "Mise en Production Zéro Downtime",
    subtitle: "Rigueur chirurgicale",
    description:
      "Déploiement sur infrastructure cloud haute disponibilité (Vercel, AWS, Neon). Migrations de données et bascule DNS sans la moindre interruption pour vos utilisateurs.",
    icon: Rocket,
    badge: "100% sécurisé",
  },
  {
    step: "04",
    title: "Autonomie & Support 30 Jours",
    subtitle: "Sérénité post-lancement",
    description:
      "Prise en main guidée de votre panneau d'administration sur-mesure, livraison du code source complet et support technique dédié inclus pour répondre à toutes vos questions.",
    icon: Headphones,
    badge: "Support inclus",
  },
];

export function CollaborationJourney() {
  return (
    <section className="py-16 sm:py-24 max-w-6xl mx-auto px-4 sm:px-6 border-b border-white/[0.08]">
      <ScrollReveal className="space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <span className="text-[11px] font-mono uppercase tracking-widest text-emerald-400 font-bold flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>// VOTRE EXPÉRIENCE CLIENT &amp; SÉRÉNITÉ</span>
            </span>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white font-sans leading-tight">
              Comment se déroule notre collaboration.
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 leading-relaxed font-normal">
              Un processus transparent et sans mauvaise surprise, de la première discussion jusqu&apos;à la mise en ligne.
            </p>
          </div>

          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-black font-bold text-xs uppercase tracking-wider hover:bg-zinc-200 transition-colors shrink-0 shadow-lg active:scale-95 cursor-pointer"
          >
            <span>Démarrer un projet</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* 4 Steps Timeline Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {JOURNEY_STEPS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="group relative rounded-3xl bg-[#0d0d10] border border-white/[0.08] hover:border-emerald-500/30 p-6 space-y-4 transition-all duration-300 shadow-xl flex flex-col justify-between overflow-hidden hover:shadow-[0_0_24px_rgba(16,185,129,0.04)]"
              >
                {/* Subtle top border highlight */}
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-white/[0.1] flex items-center justify-center text-emerald-400">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-mono font-bold text-zinc-500">
                      Étape {item.step}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-base font-bold text-white tracking-tight">
                      {item.title}
                    </h3>
                    <span className="text-[11px] font-mono text-emerald-400 block font-semibold">
                      {item.subtitle}
                    </span>
                  </div>

                  <p className="text-xs text-zinc-400 leading-relaxed font-normal">
                    {item.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-[10px] font-mono text-zinc-400">
                  <span className="px-2 py-0.5 rounded bg-black border border-white/[0.08] text-zinc-300 font-semibold">
                    {item.badge}
                  </span>
                  <span className="text-zinc-600">0{idx + 1}/04</span>
                </div>
              </div>
            );
          })}
        </div>
      </ScrollReveal>
    </section>
  );
}
