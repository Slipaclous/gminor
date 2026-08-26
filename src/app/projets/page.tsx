import React from "react";
import type { Metadata } from "next";
import { getDbProjects } from "@/lib/projects-service";
import { Badge } from "@/components/ui/badge";
import { ProjectsGallery } from "@/components/projects/projects-gallery";
import { CtaBanner } from "@/components/home/cta-banner";
import { Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Réalisations & Cas d'Études — Gauthier Minor",
  description:
    "Découvrez 13 réalisations sur-mesure : architectures SaaS, refontes e-commerce haute charge (>90k commandes/an) et portails web haute performance.",
};

export default async function ProjectsPage() {
  const projects = await getDbProjects();

  return (
    <main className="flex-1 py-16 sm:py-24 relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-emerald-500/[0.03] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-16 relative z-10">
        {/* Page Header */}
        <div className="space-y-5 max-w-3xl">
          <Badge variant="emerald" size="md">
            <Sparkles className="w-3.5 h-3.5 mr-1" />
            <span>Portfolio &amp; Études de Cas ({projects.length})</span>
          </Badge>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white font-sans leading-[1.1]">
            Des réalisations concrètes. Des résultats mesurables.
          </h1>

          <p className="text-base sm:text-lg text-zinc-300 leading-relaxed font-normal">
            Une sélection d&apos;architectures SaaS, d&apos;optimisations e-commerce haute charge et de portails web d&apos;entreprises conçus pour maximiser l&apos;impact commercial et la vitesse.
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
