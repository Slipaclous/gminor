import React from "react";
import { getSiteSettings } from "@/lib/settings-service";
import { Hero } from "@/components/home/hero";
import { TechStrip } from "@/components/home/tech-strip";
import { DualAudience } from "@/components/home/dual-audience";
import { BentoGrid } from "@/components/home/bento-grid";
import { CtaBanner } from "@/components/home/cta-banner";

export default async function HomePage() {
  const settings = await getSiteSettings();

  return (
    <main className="flex flex-col flex-1">
      <Hero settings={settings.hero} />
      <TechStrip />
      <BentoGrid />
      <DualAudience pillars={settings.pillars} />
      <CtaBanner />
    </main>
  );
}
