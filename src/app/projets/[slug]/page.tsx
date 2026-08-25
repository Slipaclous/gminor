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
    <main className="flex-1 py-16 sm:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-16">
        {/* Back Link */}
        <div>
          <Link
            href="/projets"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-zinc-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-emerald-400" />
            <span>Retour à tous les projets</span>
          </Link>
        </div>

        {/* Header / Intro */}
        <div className="space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3 py-1 rounded-md text-xs font-mono uppercase tracking-wider font-semibold bg-zinc-900 text-zinc-200 border border-white/[0.1]">
              {project.categoryLabel}
            </span>
            <span className="text-xs font-mono text-zinc-400">
              Année : {project.year}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white font-sans leading-tight">
            {project.title}
          </h1>

          <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed font-normal">
            {project.tagline}
          </p>

          {/* Action Links */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider text-black bg-white hover:bg-zinc-200 transition-colors shadow-lg"
              >
                <Globe className="w-4 h-4" />
                <span>Visiter le site en direct</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            )}

            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl text-xs font-semibold text-zinc-200 bg-zinc-900 border border-white/[0.1] hover:border-white/[0.2] transition-colors"
              >
                <GithubIcon className="w-4 h-4" />
                <span>Code source technique (GitHub)</span>
              </a>
            )}
          </div>
        </div>

        {/* Refined Dark Canvas Screenshot Mockup */}
        {project.imageUrl && (
          <div className="rounded-3xl bg-[#0a0a0d] border border-white/[0.12] overflow-hidden shadow-2xl">
            {/* Window Top Bar */}
            <div className="px-4 py-3 bg-[#121318] border-b border-white/[0.08] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-zinc-700 inline-block" />
                <span className="w-3 h-3 rounded-full bg-zinc-700 inline-block" />
                <span className="w-3 h-3 rounded-full bg-zinc-700 inline-block" />
                <span className="ml-2 text-xs font-mono text-zinc-400">
                  {project.liveUrl?.replace(/^https?:\/\//, "") || `${project.slug}.preview`}
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] font-mono text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>Production</span>
              </div>
            </div>

            {/* Image Canvas with Subtle Vignette Overlay */}
            <div className="relative w-full h-72 sm:h-96 md:h-[460px] bg-zinc-950 overflow-hidden">
              <Image
                src={project.imageUrl}
                alt={project.title}
                fill
                priority
                className="object-cover object-top opacity-85 filter contrast-105"
                sizes="(max-width: 1024px) 100vw, 896px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0d] via-transparent to-transparent opacity-60 pointer-events-none" />
            </div>
          </div>
        )}

        {/* Project Meta Details Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 p-6 sm:p-8 rounded-3xl bg-[#0d0d10] border border-white/[0.08]">
          <div className="space-y-1">
            <span className="text-xs text-zinc-500 block font-mono uppercase">
              Rôle / Mission
            </span>
            <span className="text-sm sm:text-base font-bold text-white">
              {project.role}
            </span>
          </div>

          {project.client && (
            <div className="space-y-1">
              <span className="text-xs text-zinc-500 block font-mono uppercase">
                Client
              </span>
              <span className="text-sm sm:text-base font-bold text-white">
                {project.client}
              </span>
            </div>
          )}

          <div className="space-y-1">
            <span className="text-xs text-zinc-500 block font-mono uppercase">
              Catégorie
            </span>
            <span className="text-sm sm:text-base font-bold text-white">
              {project.categoryLabel}
            </span>
          </div>
        </div>

        {/* Key Metrics / Impact Box */}
        {project.metrics && project.metrics.length > 0 && (
          <div className="space-y-4">
            <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold block">
              // IMPACT &amp; RÉSULTATS CHIFFRÉS
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {project.metrics.map((m, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-[#0d0d10] border border-white/[0.08] space-y-1.5 shadow-md"
                >
                  <span className="text-xs text-zinc-400 block font-mono">
                    {m.label}
                  </span>
                  <span className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
                    {m.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Narrative & Case Study Sections */}
        <div className="space-y-8 pt-6 border-t border-white/[0.08]">
          {/* Challenge */}
          {project.challenge && (
            <div className="p-8 rounded-3xl bg-[#0d0d10] border border-white/[0.08] space-y-4">
              <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-3">
                <Target className="w-5 h-5 text-white" />
                <span>Le besoin &amp; la problématique</span>
              </h2>
              <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-normal">
                {project.challenge}
              </p>
            </div>
          )}

          {/* Solution */}
          {project.solution && (
            <div className="p-8 rounded-3xl bg-[#0d0d10] border border-white/[0.08] space-y-4">
              <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-3">
                <Lightbulb className="w-5 h-5 text-white" />
                <span>La solution apportée</span>
              </h2>
              <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-normal">
                {project.solution}
              </p>
            </div>
          )}

          {/* Results Checklist */}
          {project.results && project.results.length > 0 && (
            <div className="p-8 rounded-3xl bg-[#0d0d10] border border-white/[0.08] space-y-4">
              <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-3">
                <Award className="w-5 h-5 text-white" />
                <span>Ce que cela a changé concrètement</span>
              </h2>
              <ul className="space-y-3">
                {project.results.map((res, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 text-sm text-zinc-300"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{res}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Tech Stack Breakdown */}
          {project.techStack && project.techStack.length > 0 && (
            <div className="space-y-4 pt-6 border-t border-white/[0.08]">
              <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold flex items-center gap-2">
                <Code2 className="w-4 h-4 text-white" />
                <span>Technologies &amp; Outils déployés</span>
              </span>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 rounded-xl text-xs font-mono bg-[#0d0d10] border border-white/[0.08] text-zinc-300"
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
