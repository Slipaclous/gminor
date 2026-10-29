import React from "react";
import type { Metadata } from "next";
import { getSiteSettings } from "@/lib/settings-service";
import { FaqAccordion } from "@/components/faq/faq-accordion";
import { CtaBanner } from "@/components/home/cta-banner";
import { SplitText } from "@/components/motion/split-text";
import { PageHeader } from "@/components/layout/page-header";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Foire Aux Questions (FAQ) — Gauthier Minor",
  description:
    "Toutes les réponses à vos questions sur la création de site internet, le développement SaaS, les tarifs, délais et garanties.",
};

export default async function FaqPage() {
  const settings = await getSiteSettings();

  return (
    <main className="flex-1">
      <section className="px-5 sm:px-10 pt-40 pb-24">
        <PageHeader
          className="mb-20"
          title={
            <>
              <SplitText text="Les réponses" immediate />
              <br />
              <span className="font-serif italic font-normal text-paper-dim">
                <SplitText text="avant de se lancer." immediate delay={0.2} />
              </span>
            </>
          }
          aside={<p>Méthode, technique, tarifs et suivi après la mise en ligne : l&apos;essentiel pour démarrer sereinement.</p>}
        />
        <FaqAccordion faqs={settings.faqs} />
      </section>
      <CtaBanner />
    </main>
  );
}
