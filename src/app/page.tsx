import React from "react";
import { getSiteSettings } from "@/lib/settings-service";
import { Hero } from "@/components/home/hero";
import { TechStrip } from "@/components/home/tech-strip";
import { Manifesto } from "@/components/home/manifesto";
import { BentoGrid } from "@/components/home/bento-grid";
import { CollaborationJourney } from "@/components/home/collaboration-journey";
import { DualAudience } from "@/components/home/dual-audience";
import { CtaBanner } from "@/components/home/cta-banner";

export default async function HomePage() {
  const settings = await getSiteSettings();

  return (
    <main className="flex flex-col flex-1">
      <Hero settings={settings.hero} />
      <TechStrip />
      <Manifesto />
      <BentoGrid />
      <CollaborationJourney />
      <DualAudience pillars={settings.pillars} />
      <CtaBanner />
    </main>
  );
}
