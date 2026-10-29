import React from "react";
import { getSiteSettings } from "@/lib/settings-service";
import { getDbProjects } from "@/lib/projects-service";
import { Hero } from "@/components/home/hero";
import { WorksScroll } from "@/components/home/works-scroll";
import { ServicesList } from "@/components/home/services-list";
import { About } from "@/components/home/about";
import { CtaBanner } from "@/components/home/cta-banner";

export default async function HomePage() {
  const settings = await getSiteSettings();
  const allProjects = await getDbProjects();

  const featuredProjects = allProjects
    .filter((p) => p.featured)
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  const displayProjects = (featuredProjects.length > 0 ? featuredProjects : allProjects).slice(0, 5);

  return (
    <main className="flex flex-col flex-1">
      <Hero available={settings.hero.available} intro={settings.hero.intro} />
      <WorksScroll projects={displayProjects} total={allProjects.length} />
      <ServicesList items={settings.expertise} />
      <About metrics={settings.hero.metrics.slice(0, 4)} about={settings.about} />
      <CtaBanner />
    </main>
  );
}
