import React from "react";
import type { Metadata } from "next";
import { getDbProjects } from "@/lib/projects-service";
import { Badge } from "@/components/ui/badge";
import { ProjectsGallery } from "@/components/projects/projects-gallery";
import { CtaBanner } from "@/components/home/cta-banner";

export const metadata: Metadata = {
  title: "Projets & Réalisations — Gauthier Minor",
  description:
    "Découvrez mes réalisations concrètes : sites vitrines pour entreprises, plateformes e-commerce et applications SaaS robustes.",
};

export default async function ProjectsPage() {
  const projects = await getDbProjects();

  return (
    <main className="flex-1 py-16 sm:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-16">
        {/* Page Header */}
        <div className="space-y-4 max-w-3xl">
          <Badge variant="emerald" size="md">
            Portfolio & Réalisations
          </Badge>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white font-sans leading-tight">
            Des réalisations concrètes et des résultats mesurables.
          </h1>
          <p className="text-lg sm:text-xl text-zinc-200 leading-relaxed font-normal">
            Voici quelques exemples de sites web d&apos;entreprises et d&apos;applications
            développés sur-mesure. Filtrez selon votre secteur pour voir les détails.
          </p>
        </div>

        {/* Gallery with Filters */}
        <ProjectsGallery initialProjects={projects} />

        {/* Call to Action */}
        <CtaBanner />
      </div>
    </main>
  );
}
