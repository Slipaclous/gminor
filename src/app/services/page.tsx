import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { getSiteSettings } from "@/lib/settings-service";
import { ProjectEstimator } from "@/components/services/project-estimator";
import { CtaBanner } from "@/components/home/cta-banner";
import {
  Globe,
  Layers,
  Zap,
  CheckCircle2,
  ArrowUpRight,
  HelpCircle,
} from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Services & Tarifs — Gauthier Minor",
  description:
    "Création de sites internet d'entreprise haute performance et développement d'applications SaaS sur-mesure (Next.js, Prisma, PostgreSQL).",
};

const SERVICE_ICONS = [Globe, Layers, Zap];

const PROCESS_STEPS = [
  {
    step: "01",
    title: "Cadrage & Devis",
    description:
      "Analyse de vos objectifs, de votre cible et de vos contraintes. Remise d'une proposition claire et chiffrée.",
  },
  {
    step: "02",
    title: "Architecture & Design",
    description:
      "Conception des parcours utilisateurs clés et de la direction visuelle avant de commencer le code.",
  },
  {
    step: "03",
    title: "Développement & Démo",
    description:
      "Développement itératif sur un lien privé accessible 24h/24 pour tester les fonctionnalités en temps réel.",
  },
  {
    step: "04",
    title: "Mise en ligne & Support",
    description:
      "Lancement en production sur votre nom de domaine, formation au back-office et garantie de support 30 jours.",
  },
];

export default async function ServicesPage() {
  const settings = await getSiteSettings();
  const services = settings.services;
  const faqs = settings.faqs;

  return (
    <main className="flex-1 py-16 sm:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-24">
        {/* Page Header */}
        <div className="space-y-4 max-w-3xl">
          <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 block">
            // SERVICES &amp; OFFRES
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white font-sans leading-tight">
            Des solutions logicielles sur-mesure pour votre activité.
          </h1>
          <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed font-normal">
            Sites internet haute vitesse pour entreprises et développement full-stack d&apos;applications SaaS.
          </p>
        </div>

        {/* Services Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {services.map((service, idx) => {
            const Icon = SERVICE_ICONS[idx % SERVICE_ICONS.length];
            return (
              <div
                key={service.id}
                id={service.id}
                className="group relative rounded-3xl bg-[#0d0d10] border border-white/[0.08] p-8 flex flex-col justify-between space-y-8 hover:border-emerald-500/30 transition-all duration-300 shadow-xl hover:shadow-[0_0_24px_rgba(16,185,129,0.04)] overflow-hidden"
              >
                {/* Subtle top border beam highlight on hover */}
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-white/[0.1] flex items-center justify-center text-white">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-mono text-zinc-400 font-semibold px-2.5 py-1 rounded-md bg-zinc-900 border border-white/[0.08]">
                      {service.badge}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <h2 className="text-2xl font-bold text-white tracking-tight">
                      {service.title}
                    </h2>
                    <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-normal">
                      {service.tagline}
                    </p>
                  </div>

                  {/* Feature list */}
                  <div className="space-y-3 pt-2">
                    <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold block">
                      Livrables inclus :
                    </span>
                    <ul className="space-y-2.5">
                      {service.features.map((feat, fIdx) => (
                        <li
                          key={fIdx}
                          className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-300 leading-relaxed"
                        >
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Bottom details & action */}
                <div className="space-y-4 pt-6 border-t border-white/[0.08]">
                  <div className="flex items-center justify-between text-xs sm:text-sm font-semibold text-zinc-300">
                    <span>Délai moyen :</span>
                    <span className="text-white font-bold font-mono">
                      {service.deliveryTime}
                    </span>
                  </div>

                  <Link
                    href={`/contact?service=${encodeURIComponent(service.title)}`}
                    className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl text-xs font-bold uppercase tracking-wider bg-white hover:bg-zinc-200 text-black transition-colors shadow-md"
                  >
                    <span>Demander un devis gratuit</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Interactive Estimator Component */}
        <ProjectEstimator settings={settings.estimator} />

        {/* Process Section */}
        <div className="rounded-3xl bg-[#0d0d10] border border-white/[0.1] p-8 sm:p-12 md:p-16 space-y-12 shadow-xl">
          <div className="space-y-3 max-w-2xl">
            <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 block">
              // PROCESSUS DE TRAVAIL
            </span>
            <h2 className="text-3xl font-extrabold text-white tracking-tight">
              Une méthode transparente en 4 étapes.
            </h2>
            <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
              Un suivi rigoureux et une visibilité complète à chaque étape de votre projet.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PROCESS_STEPS.map((step) => (
              <div
                key={step.step}
                className="p-6 rounded-2xl bg-black border border-white/[0.06] space-y-3"
              >
                <span className="text-3xl font-extrabold font-mono text-white">
                  {step.step}
                </span>
                <h3 className="text-lg font-bold text-white tracking-tight">
                  {step.title}
                </h3>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Teaser Section */}
        <div className="rounded-3xl bg-[#0d0d10] border border-white/[0.08] p-8 sm:p-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-xl">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-white/[0.1] flex items-center justify-center text-white shrink-0">
              <HelpCircle className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-xl font-bold text-white tracking-tight">
                Une question sur la méthode, les tarifs ou la suite ?
              </h3>
              <p className="text-sm text-zinc-400 max-w-xl leading-relaxed">
                Consultez notre foire aux questions complète pour tout comprendre sur l&apos;hébergement, les modifications après livraison et le support.
              </p>
            </div>
          </div>

          <Link
            href="/faq"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-zinc-900 hover:bg-zinc-800 text-white border border-white/[0.1] hover:border-white/[0.2] transition-colors shrink-0 shadow-sm"
          >
            <span>Consulter la FAQ complète</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {/* CTA */}
        <CtaBanner />
      </div>
    </main>
  );
}
