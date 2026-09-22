import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { getSiteSettings } from "@/lib/settings-service";
import { PricingOffers } from "@/components/home/pricing-offers";
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
    <main className="flex-1 py-16 sm:py-24 bg-[#fafaf8]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-24">
        {/* Page Header */}
        <div className="space-y-4 max-w-3xl">
          <span className="text-xs font-mono uppercase tracking-wider text-[#555765] block font-semibold">
            SERVICES &amp; OFFRES SUR-MESURE
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[#18191f] font-sans leading-tight">
            Des solutions web conçues pour développer votre entreprise.
          </h1>
          <p className="text-lg sm:text-xl text-[#555765] leading-relaxed font-normal">
            Sites vitrines ultra-rapides, boutiques e-commerce performantes et outils de gestion sur-mesure pour PME et indépendants.
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
                className="group relative rounded-3xl bg-white border border-[#e6e6df] p-8 flex flex-col justify-between space-y-8 hover:border-emerald-500/40 transition-all duration-300 shadow-card hover:shadow-lg overflow-hidden"
              >
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-[#f4f4f0] border border-[#e6e6df] flex items-center justify-center text-[#18191f]">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-mono text-[#555765] font-semibold px-2.5 py-1 rounded-md bg-[#fafaf8] border border-[#e6e6df]">
                      {service.badge}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <h2 className="text-2xl font-bold text-[#18191f] tracking-tight">
                      {service.title}
                    </h2>
                    <p className="text-sm sm:text-base text-[#555765] leading-relaxed font-normal">
                      {service.tagline}
                    </p>
                  </div>

                  {/* Feature list */}
                  <div className="space-y-3 pt-2">
                    <span className="text-xs font-mono uppercase tracking-wider text-[#18191f] font-bold block">
                      Livrables inclus :
                    </span>
                    <ul className="space-y-2.5">
                      {service.features.map((feat, fIdx) => (
                        <li
                          key={fIdx}
                          className="flex items-start gap-2.5 text-xs sm:text-sm text-[#555765] leading-relaxed"
                        >
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Bottom details & action */}
                <div className="space-y-4 pt-6 border-t border-[#e6e6df]">
                  <div className="flex items-center justify-between text-xs sm:text-sm font-semibold text-[#555765]">
                    <span>Délai moyen :</span>
                    <span className="text-[#18191f] font-bold font-mono">
                      {service.deliveryTime}
                    </span>
                  </div>

                  <Link
                    href={`/contact?service=${encodeURIComponent(service.title)}`}
                    className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl text-xs font-bold uppercase tracking-wider bg-[#18191f] hover:bg-[#2d2e38] text-white transition-all shadow-md active:scale-[0.98]"
                  >
                    <span>Demander un devis gratuit</span>
                    <ArrowUpRight className="w-4 h-4 text-emerald-400" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pricing Packages Table */}
        <PricingOffers />

        {/* Process Section */}
        <div className="rounded-3xl bg-white border border-[#e6e6df] p-8 sm:p-12 md:p-16 space-y-12 shadow-card">
          <div className="space-y-3 max-w-2xl">
            <span className="text-xs font-mono uppercase tracking-wider text-[#555765] block font-semibold">
              MÉTHODE DE TRAVAIL
            </span>
            <h2 className="text-3xl font-extrabold text-[#18191f] tracking-tight">
              Une méthode transparente en 4 étapes.
            </h2>
            <p className="text-sm sm:text-base text-[#555765] leading-relaxed">
              Un suivi rigoureux et une visibilité complète à chaque étape de votre projet.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PROCESS_STEPS.map((step) => (
              <div
                key={step.step}
                className="p-6 rounded-2xl bg-[#fafaf8] border border-[#e6e6df] space-y-3"
              >
                <span className="text-3xl font-extrabold font-mono text-[#18191f]">
                  {step.step}
                </span>
                <h3 className="text-lg font-bold text-[#18191f] tracking-tight">
                  {step.title}
                </h3>
                <p className="text-sm text-[#555765] leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Teaser Section */}
        <div className="rounded-3xl bg-white border border-[#e6e6df] p-8 sm:p-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-card">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#f4f4f0] border border-[#e6e6df] flex items-center justify-center text-[#18191f] shrink-0">
              <HelpCircle className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-xl font-bold text-[#18191f] tracking-tight">
                Une question sur la méthode, les tarifs ou la suite ?
              </h3>
              <p className="text-sm text-[#555765] max-w-xl leading-relaxed">
                Consultez notre foire aux questions complète pour tout comprendre sur l&apos;hébergement, les modifications après livraison et le support.
              </p>
            </div>
          </div>

          <Link
            href="/faq"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-[#18191f] hover:bg-[#2d2e38] text-white transition-all shrink-0 shadow-md active:scale-[0.98]"
          >
            <span>Consulter la FAQ complète</span>
            <ArrowUpRight className="w-4 h-4 text-emerald-400" />
          </Link>
        </div>

        {/* CTA */}
        <CtaBanner />
      </div>
    </main>
  );
}
