import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ProjectItem } from "@/data/projects";
import { ArrowUpRight, ExternalLink, Sparkles, Terminal, Activity } from "lucide-react";

interface ProjectCardProps {
  project: ProjectItem;
  featuredLayout?: boolean;
}

export function ProjectCard({
  project,
  featuredLayout = false,
}: ProjectCardProps) {
  if (featuredLayout) {
    return (
      <div className="group relative rounded-3xl bg-gradient-to-b from-[#111116] to-[#0a0a0d] border border-white/[0.1] hover:border-white/[0.25] transition-all duration-300 p-6 sm:p-8 md:p-10 shadow-2xl overflow-hidden">
        {/* Subtle Ambient Background Image Glow (blurred & desaturated) */}
        {project.imageUrl && (
          <div className="absolute top-0 right-0 w-3/5 h-full opacity-15 group-hover:opacity-25 blur-3xl pointer-events-none transition-opacity duration-500 overflow-hidden">
            <Image
              src={project.imageUrl}
              alt=""
              fill
              className="object-cover"
            />
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          {/* Left Column: Context, Narrative & Details */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="px-2.5 py-1 rounded-md text-[11px] font-mono uppercase tracking-wider font-semibold bg-white text-black">
                  À la une
                </span>
                <span className="px-2.5 py-1 rounded-md text-[11px] font-mono uppercase tracking-wider font-semibold bg-zinc-900 text-zinc-300 border border-white/[0.08]">
                  {project.categoryLabel}
                </span>
                <span className="text-xs font-mono text-zinc-400">
                  {project.client ? `${project.client} • ` : ""}
                  {project.year}
                </span>
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  <Link
                    href={`/projets/${project.slug}`}
                    className="hover:underline flex items-center gap-2 group-hover:text-white"
                  >
                    <span>{project.title}</span>
                    <ArrowUpRight className="w-6 h-6 text-zinc-500 group-hover:text-emerald-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all shrink-0" />
                  </Link>
                </h3>
                <p className="text-sm sm:text-base text-zinc-300 leading-relaxed max-w-xl font-normal">
                  {project.description || project.tagline}
                </p>
              </div>

              {/* Key Metrics Strip */}
              {project.metrics && project.metrics.length > 0 && (
                <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-black/80 border border-white/[0.08] max-w-lg backdrop-blur-sm">
                  {project.metrics.slice(0, 3).map((m, idx) => (
                    <div key={idx} className="space-y-0.5">
                      <span className="text-[10px] text-zinc-400 block uppercase font-mono">
                        {m.label}
                      </span>
                      <span className="text-sm sm:text-base font-extrabold text-white font-mono">
                        {m.value}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* Tech Stack Pills */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 rounded-lg text-xs font-mono bg-black/60 border border-white/[0.08] text-zinc-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions Bar */}
            <div className="pt-4 border-t border-white/[0.08] flex items-center gap-4 text-xs font-semibold">
              <Link
                href={`/projets/${project.slug}`}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white hover:bg-zinc-200 text-black font-bold uppercase tracking-wider transition-colors shadow-md"
              >
                <span>Étude de cas complète</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>

              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-zinc-900/80 hover:bg-zinc-800 border border-white/[0.1] text-zinc-300 hover:text-white transition-colors font-mono"
                >
                  <span>Tester en direct</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>

          {/* Right Column: Sleek Discreet Glass Mockup Preview */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl bg-black/90 border border-white/[0.12] overflow-hidden shadow-2xl group-hover:border-white/[0.3] transition-all duration-300 relative">
              {/* Window Header */}
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
                      className="object-contain p-2 opacity-80 group-hover:opacity-100 transition-opacity duration-500 filter contrast-105"
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

                {/* Overlaid Architecture Pill Badge */}
                <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-black/85 backdrop-blur-md border border-white/[0.1] flex items-center justify-between text-xs font-mono">
                  <span className="text-zinc-300 flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Next.js 15 &bull; Production</span>
                  </span>
                  <span className="text-emerald-400 font-bold">100% Ops</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Standard Card Layout (Discrete, High Craft Design)
  return (
    <div className="group relative rounded-3xl bg-[#0d0d10] border border-white/[0.08] hover:border-white/[0.22] transition-all duration-200 flex flex-col justify-between overflow-hidden shadow-xl p-6 sm:p-7">
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
                  className="object-contain p-1.5 opacity-75 group-hover:opacity-100 transition-opacity duration-300 filter contrast-105"
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
