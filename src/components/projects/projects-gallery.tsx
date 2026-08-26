"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { ProjectItem } from "@/data/projects";
import {
  ArrowUpRight,
  ExternalLink,
  Sparkles,
  Terminal,
  Search,
  Layers,
  CheckCircle2,
  Code2,
  Zap,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ProjectsGalleryProps {
  initialProjects: ProjectItem[];
}

const CATEGORIES = [
  { key: "ALL", label: "Toutes les réalisations" },
  { key: "SAAS", label: "SaaS & Web Apps" },
  { key: "ECOMMERCE", label: "E-Commerce" },
  { key: "FULLSTACK", label: "Outils & Full-Stack" },
  { key: "WEBSITE", label: "Sites Entreprise & PME" },
];

export function ProjectsGallery({ initialProjects }: ProjectsGalleryProps) {
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  const sortedProjects = useMemo(() => {
    return [...initialProjects].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  }, [initialProjects]);

  const filteredProjects = useMemo(() => {
    return sortedProjects.filter((project) => {
      const matchesCategory =
        activeCategory === "ALL" || project.category === activeCategory;

      const query = searchQuery.toLowerCase().trim();
      if (!query) return matchesCategory;

      const matchesSearch =
        project.title.toLowerCase().includes(query) ||
        project.tagline.toLowerCase().includes(query) ||
        (project.client && project.client.toLowerCase().includes(query)) ||
        project.techStack.some((tech) => tech.toLowerCase().includes(query));

      return matchesCategory && matchesSearch;
    });
  }, [sortedProjects, activeCategory, searchQuery]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {
      ALL: initialProjects.length,
      SAAS: 0,
      ECOMMERCE: 0,
      FULLSTACK: 0,
      WEBSITE: 0,
    };
    initialProjects.forEach((p) => {
      if (counts[p.category] !== undefined) {
        counts[p.category]++;
      }
    });
    return counts;
  }, [initialProjects]);

  return (
    <div className="space-y-12">
      {/* Metrics Banner Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 rounded-3xl bg-[#0d0d10] border border-white/[0.08] shadow-2xl">
        <div className="flex items-center gap-3.5 p-2">
          <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-extrabold text-white font-mono">
              {initialProjects.length}
            </div>
            <div className="text-xs text-zinc-400 font-medium">Projets livrés</div>
          </div>
        </div>

        <div className="flex items-center gap-3.5 p-2">
          <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-extrabold text-white font-mono">
              90k+
            </div>
            <div className="text-xs text-zinc-400 font-medium">Commandes / an</div>
          </div>
        </div>

        <div className="flex items-center gap-3.5 p-2">
          <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-extrabold text-white font-mono">
              &lt; 0.3s
            </div>
            <div className="text-xs text-zinc-400 font-medium">Vitesse moyenne</div>
          </div>
        </div>

        <div className="flex items-center gap-3.5 p-2">
          <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
            <Code2 className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-extrabold text-white font-mono">
              100%
            </div>
            <div className="text-xs text-zinc-400 font-medium">Code sur-mesure</div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar Toolbar */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-[#0d0d10] border border-white/[0.08] shadow-md">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.key;
            const count = categoryCounts[cat.key] || 0;
            return (
              <button
                key={cat.key}
                type="button"
                onClick={() => setActiveCategory(cat.key)}
                className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-150 cursor-pointer flex items-center gap-2 ${
                  isActive
                    ? "bg-white text-black font-bold shadow-md"
                    : "text-zinc-400 hover:text-white hover:bg-zinc-900"
                }`}
              >
                <span>{cat.label}</span>
                <span
                  className={`text-[10px] font-mono px-1.5 py-0.5 rounded-md ${
                    isActive
                      ? "bg-black text-white font-bold"
                      : "bg-zinc-800 text-zinc-400"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search Box */}
        <div className="relative min-w-[260px] sm:min-w-[300px]">
          <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Rechercher par techno, client..."
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-[#0d0d10] border border-white/[0.08] text-xs sm:text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-emerald-400/80 transition-colors shadow-inner"
          />
        </div>
      </div>

      {/* Grid of Projects */}
      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, idx) => {
            const isSvg = Boolean(project.imageUrl?.toLowerCase().includes(".svg"));
            const isTopHero = activeCategory === "ALL" && !searchQuery && idx === 0;

            return (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, delay: idx * 0.03 }}
                className={isTopHero ? "md:col-span-2 lg:col-span-3" : ""}
              >
                {isTopHero ? (
                  /* Hero Project Card for #1 (Solera Platform) */
                  <div className="group relative rounded-3xl bg-[#0d0d10] border border-white/[0.08] hover:border-white/[0.22] transition-all duration-300 overflow-hidden shadow-2xl p-6 sm:p-8 lg:p-10">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/[0.04] rounded-full blur-3xl pointer-events-none" />

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
                      {/* Left: Info & Metrics */}
                      <div className="lg:col-span-7 space-y-6 flex flex-col justify-between">
                        <div className="space-y-4">
                          <div className="flex flex-wrap items-center gap-3">
                            <span className="px-3 py-1 rounded-lg text-xs font-mono uppercase tracking-wider font-bold bg-emerald-950/80 text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5 shadow-sm">
                              <Sparkles className="w-3.5 h-3.5" />
                              <span>Projet Héro</span>
                            </span>
                            <span className="px-3 py-1 rounded-lg text-xs font-mono uppercase tracking-wider font-semibold bg-zinc-900 text-zinc-300 border border-white/[0.08]">
                              {project.categoryLabel}
                            </span>
                            <span className="text-xs font-mono text-zinc-400">
                              {project.client ? `${project.client} • ` : ""}
                              {project.year}
                            </span>
                          </div>

                          <div className="space-y-2">
                            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
                              <Link
                                href={`/projets/${project.slug}`}
                                className="hover:underline flex items-center gap-3 group/link"
                              >
                                <span>{project.title}</span>
                                <ArrowUpRight className="w-6 h-6 text-zinc-500 group-hover/link:text-emerald-400 group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-all" />
                              </Link>
                            </h2>
                            <p className="text-sm sm:text-base text-zinc-300 leading-relaxed max-w-xl">
                              {project.tagline}
                            </p>
                          </div>

                          {/* 3 Impact Metrics */}
                          {project.metrics && project.metrics.length > 0 && (
                            <div className="grid grid-cols-3 gap-3 pt-2">
                              {project.metrics.slice(0, 3).map((m, mIdx) => (
                                <div
                                  key={mIdx}
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

                          {/* Tech Stack */}
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

                        <div className="pt-2 flex items-center gap-4">
                          <Link
                            href={`/projets/${project.slug}`}
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white hover:bg-zinc-200 text-black font-bold uppercase tracking-wider text-xs transition-colors shadow-md"
                          >
                            <span>Étude de cas complète</span>
                            <ArrowUpRight className="w-4 h-4" />
                          </Link>

                          {project.liveUrl && (
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-zinc-900/80 hover:bg-zinc-800 border border-white/[0.1] text-zinc-300 hover:text-white transition-colors font-mono text-xs"
                            >
                              <span>Voir en ligne</span>
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          )}
                        </div>
                      </div>

                      {/* Right: Window Preview */}
                      <div className="lg:col-span-5 w-full">
                        <div className="rounded-2xl bg-black/90 border border-white/[0.1] overflow-hidden shadow-2xl relative">
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

                          <div className="relative w-full h-64 sm:h-72 lg:h-80 bg-[#08080a] overflow-hidden flex items-center justify-center p-3">
                            {project.imageUrl ? (
                              <Image
                                src={project.imageUrl}
                                alt={project.title}
                                fill
                                className={`object-contain p-4 opacity-90 group-hover:opacity-100 transition-opacity duration-500 ${
                                  isSvg
                                    ? "brightness-0 invert drop-shadow-[0_0_12px_rgba(255,255,255,0.2)]"
                                    : "filter contrast-105"
                                }`}
                                sizes="(max-width: 1024px) 100vw, 500px"
                              />
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
                ) : (
                  /* Standard Visual Showcase Card */
                  <div className="group h-full rounded-3xl bg-[#0d0d10] border border-white/[0.08] hover:border-white/[0.22] transition-all duration-300 p-6 sm:p-7 flex flex-col justify-between overflow-hidden shadow-xl">
                    <div className="space-y-5">
                      {/* Discrete Miniature Window Frame */}
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

                        {/* Image / Canvas */}
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

                      {/* Category & Year */}
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

                      {/* Key Metrics Strip */}
                      {project.metrics && project.metrics.length > 0 && (
                        <div className="grid grid-cols-2 gap-2 p-3 rounded-xl bg-black/80 border border-white/[0.06]">
                          {project.metrics.slice(0, 2).map((m, mIdx) => (
                            <div key={mIdx} className="space-y-0.5">
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
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {/* Empty State */}
      {filteredProjects.length === 0 && (
        <div className="py-20 text-center rounded-3xl bg-[#0d0d10] border border-white/[0.08] text-zinc-400 space-y-3">
          <Layers className="w-10 h-10 mx-auto text-zinc-600" />
          <p className="text-base font-semibold text-white">
            Aucun projet ne correspond à votre recherche.
          </p>
          <p className="text-xs text-zinc-500">
            Essayez de modifier votre terme de recherche ou sélectionnez une autre catégorie.
          </p>
        </div>
      )}
    </div>
  );
}
