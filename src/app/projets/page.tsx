import React from "react";
import type { Metadata } from "next";
import { getDbProjects } from "@/lib/projects-service";
import { ProjectsGallery } from "@/components/projects/projects-gallery";
import { CtaBanner } from "@/components/home/cta-banner";
import { SplitText } from "@/components/motion/split-text";
import { PageHeader } from "@/components/layout/page-header";

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
        <PageHeader
          title={<SplitText text="Réalisations" immediate />}
          aside={
            <>
              <p>Chaque projet est une étude de cas : le contexte, les choix de design, la technique et les résultats.</p>
              <p className="font-mono text-sm text-moss">
                {projects.length} projets · {Math.min(...projects.map((p) => Number(p.year) || 9999))}–{Math.max(...projects.map((p) => Number(p.year) || 0))}
              </p>
            </>
          }
        />
      </section>
      <section className="px-5 sm:px-10 pb-24">
        <ProjectsGallery initialProjects={projects} />
      </section>
      <CtaBanner />
    </main>
  );
}
