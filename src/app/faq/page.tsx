import React from "react";
import type { Metadata } from "next";
import { getSiteSettings } from "@/lib/settings-service";
import { FaqAccordion } from "@/components/faq/faq-accordion";
import { CtaBanner } from "@/components/home/cta-banner";
import { HelpCircle, MessageCircleQuestion } from "lucide-react";

export const metadata: Metadata = {
  title: "Foire Aux Questions (FAQ) — Gauthier Minor",
  description:
    "Toutes les réponses à vos questions sur la création de site internet, le développement SaaS, les tarifs, délais et garanties.",
};

export default async function FaqPage() {
  const settings = await getSiteSettings();
  const faqs = settings.faqs;

  return (
    <main className="flex-1 py-16 sm:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-16">
        {/* Page Header */}
        <div className="space-y-4 max-w-3xl">
          <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 block">
            // FOIRE AUX QUESTIONS
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white font-sans leading-tight">
            Tout ce que vous devez savoir avant de lancer votre projet.
          </h1>
          <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed font-normal">
            Des réponses claires et transparentes sur ma méthode de travail, les aspects techniques, les tarifs et l&apos;autonomie après livraison.
          </p>
        </div>

        {/* Dynamic Accordion */}
        <FaqAccordion faqs={faqs} />

        {/* Bottom CTA */}
        <CtaBanner />
      </div>
    </main>
  );
}
