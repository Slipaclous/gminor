"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  FileText,
  Eye,
  Rocket,
  Headphones,
  CheckCircle2,
  ArrowRight,
  ChevronRight,
  Play,
  Pause,
  Clock,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const JOURNEY_STEPS = [
  {
    step: "01",
    phase: "Phase 1 : Cadrage",
    duration: "Sous 24h",
    title: "Cadrage Stratégique & Devis Forfaitaire",
    subtitle: "Zéro surprise financière, vision claire dès le départ",
    description:
      "Nous échangeons sur vos objectifs métier, vos besoins d'acquisition et votre calendrier. Vous recevez un devis détaillé, ferme et sans le moindre coût caché.",
    icon: FileText,
    badge: "Forfait garanti",
    deliverables: [
      "Appel de cadrage direct de 30 min",
      "Spécifications fonctionnelles synthétiques",
      "Calendrier de livraison ferme et engagement de délai",
    ],
    timelineNote: "Jour 1 — Démarrage immédiat après validation",
  },
  {
    step: "02",
    phase: "Phase 2 : Développement",
    duration: "Semaines 1-2",
    title: "Accès Staging Privé en Direct",
    subtitle: "Transparence totale, vous suivez l'avancement en temps réel",
    description:
      "Dès les premiers jours, vous disposez d'un lien privé sécurisé pour tester votre site ou application en direct, valider les écrans et faire vos ajustements sans attendre la fin.",
    icon: Eye,
    badge: "Accès 24/7",
    deliverables: [
      "Lien de test privé sécurisé sur Vercel",
      "Validation interactive du design et de l'ergonomie mobile",
      "Échanges directs sans filtre d'intermédiaire",
    ],
    timelineNote: "En continu — Feedback et validations interactives",
  },
  {
    step: "03",
    phase: "Phase 3 : Lancement",
    duration: "Jour J",
    title: "Mise en Production & Optimisation 100/100",
    subtitle: "Rigueur chirurgicale sans aucune interruption de service",
    description:
      "Déploiement sur infrastructure cloud haute performance. Configuration de votre nom de domaine, sécurisation SSL, bascule DNS fluide et vérification des Core Web Vitals.",
    icon: Rocket,
    badge: "Zéro downtime",
    deliverables: [
      "Bascule DNS transparente sans coupure",
      "Score Google PageSpeed 100/100 garanti",
      "Configuration du référencement naturel local (SEO) et sécurité SSL",
    ],
    timelineNote: "Jour J — Votre présence en ligne passe à la vitesse supérieure",
  },
  {
    step: "04",
    phase: "Phase 4 : Pérennité",
    duration: "30 Jours inclus",
    title: "Autonomie Complète & Support Dédié",
    subtitle: "Vous êtes 100% propriétaire, en toute sérénité",
    description:
      "Formation vidéo simple pour modifier vos contenus en autonomie, remise du code source et assistance technique prioritaire de 30 jours incluse pour répondre à toutes vos questions.",
    icon: Headphones,
    badge: "30j d'assistance",
    deliverables: [
      "Tutoriel vidéo personnalisé de prise en main",
      "Code source complet remis, zéro redevance propriétaire",
      "Assistance directe et support prioritaire 30 jours",
    ],
    timelineNote: "Mois 1 — Sérénité garantie pour vos premiers pas",
  },
];

const AUTOPLAY_INTERVAL = 6500; // 6.5s per step

export function CollaborationJourney() {
  const [activeStep, setActiveStep] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progressKey, setProgressKey] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const current = JOURNEY_STEPS[activeStep];
  const StepIcon = current.icon;

  // Autoplay progression
  useEffect(() => {
    if (isPaused) return;

    timerRef.current = setTimeout(() => {
      setActiveStep((prev) => (prev + 1) % JOURNEY_STEPS.length);
      setProgressKey((k) => k + 1);
    }, AUTOPLAY_INTERVAL);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [activeStep, isPaused]);

  const handleManualSelect = (idx: number) => {
    setActiveStep(idx);
    setProgressKey((k) => k + 1);
  };

  return (
    <section
      className="py-20 sm:py-28 max-w-6xl mx-auto px-4 sm:px-6 border-b border-[#e6e6df] bg-white"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="space-y-12 sm:space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <span className="text-[11px] font-mono uppercase tracking-widest text-emerald-800 font-bold block">
              MÉTHODE &amp; PROCESSUS CLIENT
            </span>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#18191f] font-sans leading-tight">
              Comment se déroule notre collaboration.
            </h2>
            <p className="text-sm sm:text-base text-[#555765] leading-relaxed font-normal">
              Un cheminement clair en 4 étapes clés, sans jargon et sans mauvaise surprise, de la première idée jusqu&apos;à votre autonomie complète.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {/* Autoplay Pause/Play toggle */}
            <button
              type="button"
              onClick={() => setIsPaused((p) => !p)}
              className="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-xl bg-[#fafaf8] border border-[#e6e6df] text-[11px] font-mono text-[#555765] hover:text-[#18191f] transition-colors shadow-2xs cursor-pointer"
              title={isPaused ? "Reprendre le défilement automatique" : "Mettre en pause"}
            >
              {isPaused ? (
                <>
                  <Play className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="hidden sm:inline">Reprendre</span>
                </>
              ) : (
                <>
                  <Pause className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="hidden sm:inline">Défilement auto</span>
                </>
              )}
            </button>

            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#18191f] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#2d2e38] transition-colors shadow-md active:scale-95 cursor-pointer"
            >
              <span>Démarrer un projet</span>
              <ArrowRight className="w-3.5 h-3.5 text-emerald-400" />
            </Link>
          </div>
        </div>

        {/* Linear Stepper Pipeline Design — Distinct from showcase cards */}
        <div className="relative">
          {/* Subtle connecting road line behind nodes (desktop) */}
          <div className="hidden md:block absolute top-7 left-12 right-12 h-0.5 bg-[#e6e6df] z-0" />

          {/* Stepper Nodes */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 relative z-10">
            {JOURNEY_STEPS.map((item, idx) => {
              const isActive = activeStep === idx;
              const isPast = activeStep > idx;
              const Icon = item.icon;

              return (
                <button
                  key={item.step}
                  type="button"
                  onClick={() => handleManualSelect(idx)}
                  className="group text-left cursor-pointer transition-all duration-200 focus:outline-none"
                >
                  <div className="flex flex-col space-y-3">
                    {/* Circle Node with Step Number and Status */}
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-12 h-12 rounded-2xl flex items-center justify-center font-mono text-xs font-bold transition-all duration-300 shadow-xs border ${
                          isActive
                            ? "bg-[#18191f] text-white border-[#18191f] scale-105 shadow-md"
                            : isPast
                            ? "bg-emerald-50 text-emerald-800 border-emerald-300"
                            : "bg-[#fafaf8] text-[#7c7e8c] border-[#e6e6df] group-hover:border-[#18191f]/30"
                        }`}
                      >
                        {isPast ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                        ) : (
                          <span>{item.step}</span>
                        )}
                      </div>

                      <div className="space-y-0.5">
                        <span
                          className={`text-[11px] font-mono font-bold block uppercase tracking-wider ${
                            isActive
                              ? "text-emerald-700"
                              : "text-[#7c7e8c] group-hover:text-[#18191f]"
                          }`}
                        >
                          {item.duration}
                        </span>
                        <span className="text-[10px] text-[#7c7e8c] font-mono block">
                          Phase 0{idx + 1}
                        </span>
                      </div>
                    </div>

                    {/* Node Title & Subtitle Card */}
                    <div
                      className={`p-3.5 rounded-xl border transition-all duration-200 relative overflow-hidden ${
                        isActive
                          ? "bg-[#fafaf8] border-emerald-600/50 shadow-xs"
                          : "bg-white border-[#e6e6df] hover:border-[#d5d5cc]"
                      }`}
                    >
                      <h3
                        className={`text-xs sm:text-sm font-bold tracking-tight truncate ${
                          isActive ? "text-[#18191f]" : "text-[#555765] group-hover:text-[#18191f]"
                        }`}
                      >
                        {item.title}
                      </h3>
                      <p className="text-[11px] text-[#7c7e8c] truncate font-mono mt-0.5">
                        {item.badge}
                      </p>

                      {/* Animated Progress Bar for Active Step */}
                      {isActive && (
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#e6e6df]">
                          <motion.div
                            key={progressKey}
                            className="h-full bg-emerald-600"
                            initial={{ width: "0%" }}
                            animate={{ width: isPaused ? "100%" : "100%" }}
                            transition={{
                              duration: isPaused ? 0 : AUTOPLAY_INTERVAL / 1000,
                              ease: "linear",
                            }}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Detailed Stage Execution Desk (Process Canvas) */}
        <div className="rounded-3xl bg-[#fafaf8] border border-[#e6e6df] shadow-card overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.step}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 p-6 sm:p-10 lg:p-12 items-center"
            >
              {/* Left Column: Stage Identity & Narrative (6 cols) */}
              <div className="lg:col-span-6 space-y-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                      {current.phase}
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-mono bg-white text-[#555765] border border-[#e6e6df]">
                      Délai : {current.duration}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#18191f] tracking-tight leading-tight">
                    {current.title}
                  </h3>

                  <p className="text-sm sm:text-base text-emerald-800 font-medium leading-relaxed">
                    {current.subtitle}
                  </p>
                </div>

                <p className="text-sm sm:text-base text-[#555765] leading-relaxed font-normal">
                  {current.description}
                </p>

                {/* Timeline Note */}
                <div className="flex items-center gap-2 text-xs font-mono text-[#555765] p-3 rounded-xl bg-white border border-[#e6e6df]">
                  <Clock className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{current.timelineNote}</span>
                </div>
              </div>

              {/* Right Column: Concrete Client Deliverables Checklist (6 cols) */}
              <div className="lg:col-span-6 bg-white p-6 sm:p-8 rounded-2xl border border-[#e6e6df] shadow-xs space-y-6">
                <div className="flex items-center justify-between pb-3 border-b border-[#e6e6df]">
                  <span className="text-xs font-mono uppercase tracking-wider font-bold text-[#18191f]">
                    Ce qui est concrètement livré :
                  </span>
                  <span className="text-[11px] font-mono text-emerald-700 font-semibold">
                    100% Transparent
                  </span>
                </div>

                <div className="space-y-3">
                  {current.deliverables.map((item, dIdx) => (
                    <div
                      key={dIdx}
                      className="flex items-start gap-3 p-3.5 rounded-xl bg-[#fafaf8] border border-[#e6e6df] text-xs sm:text-sm text-[#18191f] transition-all hover:border-[#d5d5cc]"
                    >
                      <div className="w-5 h-5 rounded-md bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700 shrink-0 mt-0.5">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </div>
                      <span className="leading-snug">{item}</span>
                    </div>
                  ))}
                </div>

                {/* Bottom Step Control Navigation */}
                <div className="pt-4 border-t border-[#e6e6df] flex items-center justify-between">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 text-xs font-bold font-mono uppercase tracking-wider text-[#18191f] hover:text-emerald-700 transition-colors"
                  >
                    <span>Poser une question sur cette étape</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  <button
                    type="button"
                    onClick={() => {
                      setActiveStep((prev) => (prev + 1) % JOURNEY_STEPS.length);
                      setProgressKey((k) => k + 1);
                    }}
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-[#555765] hover:text-[#18191f] transition-colors cursor-pointer"
                  >
                    <span>Étape suivante</span>
                    <ChevronRight className="w-4 h-4 text-emerald-600" />
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
