import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getDbProjects, getDbProjectBySlug } from "@/lib/projects-service";
import { CtaBanner } from "@/components/home/cta-banner";
import { GithubIcon } from "@/components/ui/icons";
import {
  ArrowLeft,
  ArrowUpRight,
  CheckCircle2,
  Code2,
  Globe,
  Award,
  Target,
  Lightbulb,
} from "lucide-react";
import { ProjectVisual } from "@/components/projects/project-visual";

interface ProjectDetailProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const projects = await getDbProjects();
  return projects.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProjectDetailProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getDbProjectBySlug(slug);

  if (!project) {
    return {
      title: "Projet non trouvé",
    };
  }

  return {
    title: `${project.title} — Étude de cas | Gauthier Minor`,
    description: project.tagline || project.description,
  };
}

export default async function ProjectDetailPage({ params }: ProjectDetailProps) {
  const { slug } = await params;
  const project = await getDbProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="flex-1 py-16 sm:py-24 bg-[#fafaf8]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-16">
        {/* Back Link */}
        <div>
          <Link
            href="/projets"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#555765] hover:text-[#18191f] transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-emerald-600" />
            <span>Retour à tous les projets</span>
          </Link>
        </div>

        {/* Header / Intro */}
        <div className="space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3 py-1 rounded-md text-xs font-mono uppercase tracking-wider font-semibold bg-white text-[#18191f] border border-[#e6e6df] shadow-xs">
              {project.categoryLabel}
            </span>
            <span className="text-xs font-mono text-[#555765]">
              Année : {project.year}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#18191f] font-sans leading-tight">
            {project.title}
          </h1>

          <p className="text-lg sm:text-xl text-[#555765] leading-relaxed font-normal">
            {project.tagline}
          </p>

          {/* Action Links */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider text-white bg-[#18191f] hover:bg-[#2d2e38] transition-all shadow-md active:scale-95"
              >
                <Globe className="w-4 h-4" />
                <span>Visiter le site en direct</span>
                <ArrowUpRight className="w-4 h-4 text-emerald-400" />
              </a>
            )}

            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl text-xs font-semibold text-[#18191f] bg-white border border-[#e6e6df] hover:border-[#18191f]/40 transition-colors shadow-xs"
              >
                <GithubIcon className="w-4 h-4" />
                <span>Code source technique (GitHub)</span>
              </a>
            )}
          </div>
        </div>

        {/* Hero Visual Presentation */}
        <div className="group relative rounded-3xl bg-white border border-[#e6e6df] overflow-hidden shadow-card p-4 sm:p-6">
          <ProjectVisual
            slug={project.slug}
            title={project.title}
            category={project.category}
            categoryLabel={project.categoryLabel}
            imageUrl={project.imageUrl}
            aspectRatio="aspect-[16/9]"
            className="w-full h-72 sm:h-96 md:h-[480px]"
          />
        </div>

        {/* Project Meta Details Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 p-6 sm:p-8 rounded-3xl bg-white border border-[#e6e6df] shadow-card">
          <div className="space-y-1">
            <span className="text-xs text-[#555765] block font-mono uppercase">
              Rôle / Mission
            </span>
            <span className="text-sm sm:text-base font-bold text-[#18191f]">
              {project.role}
            </span>
          </div>

          {project.client && (
            <div className="space-y-1">
              <span className="text-xs text-[#555765] block font-mono uppercase">
                Client
              </span>
              <span className="text-sm sm:text-base font-bold text-[#18191f]">
                {project.client}
              </span>
            </div>
          )}

          <div className="space-y-1">
            <span className="text-xs text-[#555765] block font-mono uppercase">
              Catégorie
            </span>
            <span className="text-sm sm:text-base font-bold text-[#18191f]">
              {project.categoryLabel}
            </span>
          </div>
        </div>

        {/* Key Metrics / Impact Box */}
        {project.metrics && project.metrics.length > 0 && (
          <div className="space-y-4">
            <span className="text-xs font-mono uppercase tracking-wider text-[#555765] font-semibold block">
              IMPACT &amp; RÉSULTATS CHIFFRÉS
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {project.metrics.map((m, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-white border border-[#e6e6df] space-y-1.5 shadow-card"
                >
                  <span className="text-xs text-[#555765] block font-mono">
                    {m.label}
                  </span>
                  <span className="text-2xl sm:text-3xl font-extrabold text-[#18191f] font-mono">
                    {m.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Narrative & Case Study Sections (Storytelling Défi ➔ Tournant ➔ Impact) */}
        <div className="space-y-8 pt-6 border-t border-[#e6e6df]">
          {/* Challenge */}
          {project.challenge && (
            <div className="group relative rounded-3xl bg-white border border-[#e6e6df] hover:border-emerald-500/40 p-6 sm:p-8 space-y-4 transition-all duration-300 overflow-hidden shadow-card">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-700 font-bold px-2.5 py-1 rounded-md bg-emerald-50 border border-emerald-200">
                  Étape 01 • Le Défi Initial
                </span>
                <Target className="w-5 h-5 text-emerald-600" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#18191f] tracking-tight">
                La problématique &amp; le point de friction
              </h2>
              <p className="text-sm sm:text-base text-[#555765] leading-relaxed font-normal">
                {project.challenge}
              </p>
            </div>
          )}

          {/* Solution */}
          {project.solution && (
            <div className="group relative rounded-3xl bg-white border border-[#e6e6df] hover:border-emerald-500/40 p-6 sm:p-8 space-y-4 transition-all duration-300 overflow-hidden shadow-card">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-700 font-bold px-2.5 py-1 rounded-md bg-emerald-50 border border-emerald-200">
                  Étape 02 • Le Tournant Technique
                </span>
                <Lightbulb className="w-5 h-5 text-emerald-600" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#18191f] tracking-tight">
                L&apos;architecture logicielle sur-mesure déployée
              </h2>
              <p className="text-sm sm:text-base text-[#555765] leading-relaxed font-normal">
                {project.solution}
              </p>
            </div>
          )}

          {/* Deep Architecture & Modules Grid (If available) */}
          {project.modules && project.modules.length > 0 && (
            <div className="space-y-6 pt-4">
              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-700 font-bold px-2.5 py-1 rounded-md bg-emerald-50 border border-emerald-200 inline-block">
                  Ingénierie &amp; Capacités Système
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-[#18191f] tracking-tight pt-2">
                  Ce que la plateforme accomplit au quotidien
                </h2>
                <p className="text-xs sm:text-sm text-[#555765]">
                  Une suite de modules interconnectés conçus pour absorber des flux logistiques, administratifs et d&apos;impression industriels.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {project.modules.map((mod, idx) => (
                  <div
                    key={idx}
                    className="group relative rounded-3xl bg-white border border-[#e6e6df] hover:border-[#18191f]/40 p-6 sm:p-7 space-y-4 shadow-card transition-all duration-300 overflow-hidden"
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono text-[#555765] font-bold">
                          MODULE 0{idx + 1}
                        </span>
                        <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                          {mod.subtitle}
                        </span>
                      </div>
                      <h3 className="text-base sm:text-lg font-bold text-[#18191f] group-hover:text-emerald-700 transition-colors">
                        {mod.title}
                      </h3>
                    </div>

                    <p className="text-xs sm:text-sm text-[#555765] leading-relaxed font-normal">
                      {mod.description}
                    </p>

                    {mod.highlights && mod.highlights.length > 0 && (
                      <ul className="space-y-2 pt-2 border-t border-[#e6e6df]">
                        {mod.highlights.map((item, hIdx) => (
                          <li key={hIdx} className="flex items-start gap-2 text-xs text-[#555765] font-mono">
                            <span className="text-emerald-600 font-bold shrink-0 mt-0.5">&bull;</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Results Checklist */}
          {project.results && project.results.length > 0 && (
            <div className="group relative rounded-3xl bg-white border border-[#e6e6df] hover:border-emerald-500/40 p-6 sm:p-8 space-y-4 transition-all duration-300 overflow-hidden shadow-card">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-700 font-bold px-2.5 py-1 rounded-md bg-emerald-50 border border-emerald-200">
                  Étape 03 • L&apos;Impact Mesuré
                </span>
                <Award className="w-5 h-5 text-emerald-600" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#18191f] tracking-tight">
                Les résultats concrets pour le client
              </h2>
              <ul className="space-y-3 pt-1">
                {project.results.map((res, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 text-sm text-[#555765]"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{res}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Tech Stack Breakdown */}
          {project.techStack && project.techStack.length > 0 && (
            <div className="space-y-4 pt-6 border-t border-[#e6e6df]">
              <span className="text-xs font-mono uppercase tracking-wider text-[#18191f] font-bold flex items-center gap-2">
                <Code2 className="w-4 h-4 text-[#18191f]" />
                <span>Technologies &amp; Outils déployés</span>
              </span>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 rounded-xl text-xs font-mono bg-white border border-[#e6e6df] text-[#555765] shadow-xs"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* CTA */}
        <CtaBanner />
      </div>
    </main>
  );
}
