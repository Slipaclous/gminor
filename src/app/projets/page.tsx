import React from "react";
import type { Metadata } from "next";
import { getDbProjects } from "@/lib/projects-service";
import { Badge } from "@/components/ui/badge";
import { ProjectsGallery } from "@/components/projects/projects-gallery";
import { CtaBanner } from "@/components/home/cta-banner";

export const metadata: Metadata = {
  title: "Réalisations & Cas d'Études — Gauthier Minor",
  description:
    "Découvrez 13 réalisations sur-mesure : architectures SaaS, refontes e-commerce haute charge (>90k commandes/an) et portails web haute performance.",
};

export default async function ProjectsPage() {
  const projects = await getDbProjects();

  return (
    <main className="flex-1 py-16 sm:py-24 relative overflow-hidden bg-[#fafaf8]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-16 relative z-10">
        {/* Page Header */}
        <div className="space-y-5 max-w-3xl">
          <Badge variant="emerald" size="md">
            <span>Portfolio &amp; Réalisations ({projects.length})</span>
          </Badge>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[#18191f] font-sans leading-[1.1]">
            Des réalisations concrètes. Des résultats mesurables.
          </h1>

          <p className="text-base sm:text-lg text-[#555765] leading-relaxed font-normal">
            Une sélection de sites internet professionnels, de boutiques e-commerce et d&apos;outils métier sur-mesure conçus pour maximiser l&apos;impact commercial et la visibilité locale.
          </p>
        </div>

        {/* Dynamic Interactive Gallery */}
        <ProjectsGallery initialProjects={projects} />

        {/* Call to Action */}
        <CtaBanner />
      </div>
    </main>
  );
}
