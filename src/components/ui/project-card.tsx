import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ProjectItem } from "@/data/projects";
import { ArrowUpRight, ExternalLink, Sparkles, Terminal } from "lucide-react";

interface ProjectCardProps {
  project: ProjectItem;
  featuredLayout?: boolean;
}

export function ProjectCard({
  project,
  featuredLayout = false,
}: ProjectCardProps) {
  const isSvg = Boolean(project.imageUrl?.toLowerCase().includes(".svg"));

  // Featured Project Card Layout (2-Column Hero Card)
  if (featuredLayout) {
    return (
      <div className="group relative rounded-3xl bg-[#0d0d10] border border-white/[0.08] hover:border-emerald-500/40 transition-all duration-300 overflow-hidden shadow-2xl p-6 sm:p-8 lg:p-10 hover:shadow-[0_0_35px_rgba(16,185,129,0.07)]">
        {/* Subtle top border beam highlight on hover */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        {/* Glow ambient background effect */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/[0.05] rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
          {/* Left Column: Project Info & Metrics (7 cols) */}
          <div className="lg:col-span-7 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              {/* Category Badge + Featured Indicator */}
              <div className="flex flex-wrap items-center gap-3">
                <span className="px-3 py-1 rounded-lg text-xs font-mono uppercase tracking-wider font-bold bg-emerald-950/80 text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5 shadow-sm">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Projet à la une</span>
                </span>
                <span className="px-3 py-1 rounded-lg text-xs font-mono uppercase tracking-wider font-semibold bg-zinc-900 text-zinc-300 border border-white/[0.08]">
                  {project.categoryLabel}
                </span>
                <span className="text-xs font-mono text-zinc-400">
                  {project.client ? `${project.client} • ` : ""}
                  {project.year}
                </span>
              </div>

              {/* Title & Tagline */}
              <div className="space-y-2">
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
                  <Link
                    href={`/projets/${project.slug}`}
                    className="hover:underline flex items-center gap-3 group/link"
                  >
                    <span>{project.title}</span>
                    <ArrowUpRight className="w-6 h-6 text-zinc-500 group-hover/link:text-emerald-400 group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-all" />
                  </Link>
                </h3>
                <p className="text-sm sm:text-base text-zinc-300 leading-relaxed max-w-xl">
                  {project.tagline}
                </p>
              </div>

              {/* 3 Impact Metrics Grid */}
              {project.metrics && project.metrics.length > 0 && (
                <div className="grid grid-cols-3 gap-3 pt-2">
                  {project.metrics.slice(0, 3).map((m, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-2xl bg-black/60 border border-white/[0.08] space-y-1"
                    >
                      <span className="text-[11px] text-zinc-400 block font-mono">
                        {m.label}
                      </span>
                      <span className="text-base sm:text-lg font-extrabold text-white font-mono tracking-tight">
                        {m.value}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* Tech Stack Badges */}
              <div className="flex flex-wrap gap-2 pt-2">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 rounded-md text-xs font-mono bg-zinc-900/90 text-zinc-300 border border-white/[0.08]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Action link */}
            <div className="pt-2">
              <Link
                href={`/projets/${project.slug}`}
                className="inline-flex items-center gap-2 text-xs font-bold font-mono uppercase tracking-wider text-emerald-400 hover:text-emerald-300 transition-colors"
              >
                <span>Lire l&apos;étude de cas complète</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right Column: Discrete Window Frame Mockup (5 cols) */}
          <div className="lg:col-span-5 w-full">
            <div className="rounded-2xl bg-black/90 border border-white/[0.1] overflow-hidden shadow-2xl relative">
              {/* Browser/Window Header */}
              <div className="px-4 py-3 bg-[#13141a] border-b border-white/[0.08] flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-zinc-700 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-zinc-700 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-zinc-700 inline-block" />
                </div>
                <span className="text-[11px] font-mono text-zinc-400 truncate max-w-[200px]">
                  {project.liveUrl?.replace(/^https?:\/\//, "") || project.title}
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
              </div>

              {/* Discreet Image Canvas with Dark Gradient Tint */}
              <div className="relative w-full h-64 sm:h-72 lg:h-80 bg-[#08080a] overflow-hidden flex items-center justify-center p-3">
                {project.imageUrl ? (
                  <>
                    <Image
                      src={project.imageUrl}
                      alt={project.title}
                      fill
                      className={`object-contain p-4 opacity-85 group-hover:opacity-100 transition-opacity duration-500 ${
                        isSvg
                          ? "brightness-0 invert drop-shadow-[0_0_12px_rgba(255,255,255,0.2)]"
                          : "filter contrast-105"
                      }`}
                      sizes="(max-width: 1024px) 100vw, 500px"
                    />
                    {/* Subtle bottom gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#090a0f] via-transparent to-transparent pointer-events-none opacity-40" />
                  </>
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-zinc-600 font-mono text-xs">
                    Interface sur-mesure
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Standard Card Layout (Discrete, High Craft Design)
  return (
    <div className="group relative rounded-3xl bg-[#0d0d10] border border-white/[0.08] hover:border-white/[0.22] hover:border-emerald-500/30 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-xl p-6 sm:p-7 hover:shadow-[0_0_24px_rgba(16,185,129,0.04)]">
      {/* Subtle top border beam highlight on hover */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      <div className="space-y-5">
        {/* Discreet Miniature Window Bar */}
        <div className="rounded-2xl bg-black/90 border border-white/[0.08] overflow-hidden relative">
          <div className="px-3 py-2 bg-[#121318] border-b border-white/[0.06] flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-zinc-700 inline-block" />
              <span className="w-2 h-2 rounded-full bg-zinc-700 inline-block" />
              <span className="w-2 h-2 rounded-full bg-zinc-700 inline-block" />
            </div>
            <span className="text-[10px] font-mono text-zinc-500 truncate max-w-[140px]">
              {project.client || project.title}
            </span>
          </div>

          {/* Discreet Image Canvas */}
          <div className="relative w-full h-44 sm:h-48 bg-[#08080a] overflow-hidden flex items-center justify-center p-2">
            {project.imageUrl ? (
              <>
                <Image
                  src={project.imageUrl}
                  alt={project.title}
                  fill
                  className={`object-contain p-3 opacity-80 group-hover:opacity-100 transition-opacity duration-300 ${
                    isSvg
                      ? "brightness-0 invert drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]"
                      : "filter contrast-105"
                  }`}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d10] via-transparent to-transparent opacity-40 pointer-events-none" />
              </>
            ) : (
              <div className="w-full h-full flex items-center justify-center text-zinc-600 font-mono text-xs">
                Aperçu
              </div>
            )}
          </div>
        </div>

        {/* Top Bar: Category & Year */}
        <div className="flex items-center justify-between gap-4">
          <span className="px-2.5 py-1 rounded-md text-[11px] font-mono uppercase tracking-wider font-semibold bg-zinc-900 text-zinc-300 border border-white/[0.08]">
            {project.categoryLabel}
          </span>
          <span className="text-xs font-mono text-zinc-400">
            {project.year}
          </span>
        </div>

        {/* Title & Tagline */}
        <div className="space-y-1.5">
          <h3 className="text-xl font-bold text-white tracking-tight">
            <Link
              href={`/projets/${project.slug}`}
              className="hover:underline flex items-center justify-between gap-2"
            >
              <span>{project.title}</span>
              <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-emerald-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
            </Link>
          </h3>
          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed line-clamp-2">
            {project.tagline}
          </p>
        </div>

        {/* Key Metrics */}
        {project.metrics && project.metrics.length > 0 && (
          <div className="grid grid-cols-2 gap-2 p-3 rounded-xl bg-black/80 border border-white/[0.06]">
            {project.metrics.slice(0, 2).map((m, idx) => (
              <div key={idx} className="space-y-0.5">
                <span className="text-[10px] text-zinc-400 block font-mono">
                  {m.label}
                </span>
                <span className="text-xs sm:text-sm font-extrabold text-white font-mono">
                  {m.value}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Tech Stack Pills */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {project.techStack.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 rounded-md text-[11px] font-mono text-zinc-400 bg-zinc-900 border border-white/[0.05]"
            >
              {tech}
            </span>
          ))}
          {project.techStack.length > 4 && (
            <span className="px-2 py-0.5 rounded-md text-[11px] font-mono text-zinc-500">
              +{project.techStack.length - 4}
            </span>
          )}
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="pt-5 mt-5 border-t border-white/[0.08] flex items-center justify-between gap-3 text-xs">
        <Link
          href={`/projets/${project.slug}`}
          className="font-bold text-white hover:text-zinc-300 flex items-center gap-1 transition-colors"
        >
          <span>Étude de cas</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>

        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-400 hover:text-white flex items-center gap-1 transition-colors font-mono text-[11px]"
          >
            <span>Démo Live</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        )}
      </div>
    </div>
  );
}
