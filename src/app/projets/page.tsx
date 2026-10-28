import React from "react";
import type { Metadata } from "next";
import { getDbProjects } from "@/lib/projects-service";
import { ProjectsGallery } from "@/components/projects/projects-gallery";
import { CtaBanner } from "@/components/home/cta-banner";
import { SplitText } from "@/components/motion/split-text";

export const metadata: Metadata = {
  title: "Réalisations & Études de cas — Gauthier Minor",
  description:
    "Sites vitrines, boutiques e-commerce et plateformes SaaS conçus et développés sur mesure. Découvrez les études de cas.",
};

export default async function ProjectsPage() {
  const projects = await getDbProjects();

  return (
    <main className="flex-1">
      <section className="px-5 sm:px-10 pt-40 pb-16">
        <h1 className="text-[17vw] sm:text-[12vw] leading-[0.85] tracking-[-0.06em] font-medium">
          <SplitText text="Réalisations" immediate />
        </h1>
        <p className="mt-10 max-w-xl text-lg text-paper-dim">
          Chaque projet est une étude de cas : le contexte, les choix de design, la technique et les résultats.
        </p>
      </section>
      <section className="px-5 sm:px-10 pb-24">
        <ProjectsGallery initialProjects={projects} />
      </section>
      <CtaBanner />
    </main>
  );
}
