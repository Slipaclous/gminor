import React from "react";
import Link from "next/link";
import { getDbProjects } from "@/lib/projects-service";
import { SectionHeader } from "../ui/section-header";
import { ProjectCard } from "../ui/project-card";
import { ScrollReveal, StaggerContainer, StaggerItem } from "../ui/scroll-reveal";
import { ArrowUpRight } from "lucide-react";

export async function BentoGrid() {
  const allProjects = await getDbProjects();
  const featuredProjects = allProjects
    .filter((p) => p.featured)
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  const displayProjects = featuredProjects.length > 0 ? featuredProjects : allProjects.slice(0, 3);

  return (
    <section className="py-24 max-w-6xl mx-auto px-4 sm:px-6">
      <ScrollReveal className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
        <SectionHeader
          eyebrow="Réalisations & Cas d'études"
          title="Des projets conçus pour performer."
          description="Une sélection de réalisations récentes montrant l'impact concret sur les performances, l'acquisition client et l'expérience utilisateur."
        />

        <Link
          href="/projets"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-900 border border-white/[0.1] text-xs font-semibold text-zinc-300 hover:text-white hover:border-white/[0.25] transition-colors shrink-0 shadow-sm"
        >
          <span>Voir tous les projets ({allProjects.length})</span>
          <ArrowUpRight className="w-4 h-4 text-emerald-400" />
        </Link>
      </ScrollReveal>

      {/* Grid of Projects with Smooth Stagger Entrance */}
      <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {displayProjects.map((project, index) => (
          <StaggerItem
            key={project.id}
            className={index === 0 ? "md:col-span-2 lg:col-span-3" : ""}
          >
            <ProjectCard project={project} featuredLayout={index === 0} />
          </StaggerItem>
        ))}
      </StaggerContainer>
    </section>
  );
}
