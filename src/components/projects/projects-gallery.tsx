"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { ProjectItem } from "@/data/projects";
import {
  ArrowUpRight,
  ExternalLink,
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
import { ProjectVisual } from "./project-visual";

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
    <div className="space-y-8 sm:space-y-12">
      {/* Metrics Banner Strip (Mobile optimized) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-white border border-[#e6e6df] shadow-card">
        <div className="flex items-center gap-3 p-1.5 sm:p-2">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 shrink-0">
            <Layers className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <div>
            <div className="text-lg sm:text-2xl font-extrabold text-[#18191f] font-mono">
              {initialProjects.length}
            </div>
            <div className="text-[11px] sm:text-xs text-[#555765] font-medium">Projets livrés</div>
          </div>
        </div>

        <div className="flex items-center gap-3 p-1.5 sm:p-2">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 shrink-0">
            <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <div>
            <div className="text-lg sm:text-2xl font-extrabold text-[#18191f] font-mono">
              90k+
            </div>
            <div className="text-[11px] sm:text-xs text-[#555765] font-medium">Commandes / an</div>
          </div>
        </div>

        <div className="flex items-center gap-3 p-1.5 sm:p-2">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 shrink-0">
            <Zap className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <div>
            <div className="text-lg sm:text-2xl font-extrabold text-[#18191f] font-mono">
              &lt; 0.4s
            </div>
            <div className="text-[11px] sm:text-xs text-[#555765] font-medium">Temps de chargement</div>
          </div>
        </div>

        <div className="flex items-center gap-3 p-1.5 sm:p-2">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 shrink-0">
            <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <div>
            <div className="text-lg sm:text-2xl font-extrabold text-[#18191f] font-mono">
              100%
            </div>
            <div className="text-[11px] sm:text-xs text-[#555765] font-medium">Code sur-mesure</div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar Toolbar (Swipeable on mobile) */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
        {/* Category Pills (Horizontal Scroll on mobile) */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar p-1.5 rounded-2xl bg-white border border-[#e6e6df] shadow-xs scroll-smooth">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.key;
            const count = categoryCounts[cat.key] || 0;
            return (
              <button
                key={cat.key}
                type="button"
                onClick={() => setActiveCategory(cat.key)}
                className={`px-3 sm:px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-150 cursor-pointer flex items-center gap-2 shrink-0 ${
                  isActive
                    ? "bg-[#18191f] text-white font-bold shadow-xs"
                    : "text-[#555765] hover:text-[#18191f] hover:bg-[#fafaf8]"
                }`}
              >
                <span>{cat.label}</span>
                <span
                  className={`text-[10px] font-mono px-1.5 py-0.5 rounded-md ${
                    isActive
                      ? "bg-white/20 text-white font-bold"
                      : "bg-[#f4f4f0] text-[#555765]"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search Box */}
        <div className="relative min-w-[240px] sm:min-w-[300px]">
          <Search className="w-4 h-4 text-[#555765] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Rechercher par techno, client..."
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white border border-[#e6e6df] text-xs sm:text-sm text-[#18191f] placeholder:text-[#555765]/50 focus:outline-none focus:border-[#18191f] transition-colors shadow-xs"
          />
        </div>
      </div>      {/* Grid of Projects — Option A : Grille Studio 2 Colonnes Généreuse */}
      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10"
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, idx) => {
            const isSvg = Boolean(project.imageUrl?.toLowerCase().includes(".svg"));
            const primaryMetric = project.metrics?.[0];

            return (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, delay: idx * 0.03 }}
                className="h-full"
              >
                <div className="group h-full flex flex-col justify-between rounded-3xl bg-white border border-[#e6e6df] hover:border-[#18191f]/40 p-5 sm:p-7 shadow-card hover:shadow-xl transition-all duration-300 overflow-hidden">
                  <div>
                    {/* 1. Tailored Artistic Visual (Zero crop, brand & UI fidelity) */}
                    <Link
                      href={`/projets/${project.slug}`}
                      className="block relative w-full overflow-hidden rounded-2xl cursor-pointer"
                    >
                      <ProjectVisual
                        slug={project.slug}
                        title={project.title}
                        category={project.category}
                        categoryLabel={project.categoryLabel}
                        imageUrl={project.imageUrl}
                        aspectRatio="aspect-[16/10]"
                      />
                    </Link>

                    {/* 2. Editorial Information & Impact */}
                    <div className="pt-6 space-y-3">
                      <div className="flex items-center justify-between text-xs text-[#555765] font-mono">
                        <span>{project.client || "Client Confidentiel"}</span>
                        <span>{project.year}</span>
                      </div>

                      <h3 className="text-xl sm:text-2xl font-extrabold text-[#18191f] tracking-tight">
                        <Link
                          href={`/projets/${project.slug}`}
                          className="hover:underline flex items-center justify-between gap-3 group/title"
                        >
                          <span>{project.title}</span>
                          <ArrowUpRight className="w-5 h-5 text-[#555765] group-hover/title:text-[#18191f] group-hover/title:translate-x-1 group-hover/title:-translate-y-1 transition-all shrink-0" />
                        </Link>
                      </h3>

                      <p className="text-sm text-[#555765] leading-relaxed line-clamp-2">
                        {project.tagline}
                      </p>

                      {/* Tech Stack Pills */}
                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {project.techStack.slice(0, 4).map((tech) => (
                          <span
                            key={tech}
                            className="px-2.5 py-1 rounded-md text-[11px] font-mono text-[#555765] bg-[#fafaf8] border border-[#e6e6df]"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.techStack.length > 4 && (
                          <span className="px-2 py-1 rounded-md text-[11px] font-mono text-[#555765]">
                            +{project.techStack.length - 4}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* 3. Bottom Action Strip */}
                  <div className="pt-5 mt-5 border-t border-[#e6e6df] flex items-center justify-between gap-4">
                    <Link
                      href={`/projets/${project.slug}`}
                      className="inline-flex items-center gap-2 text-xs font-bold font-mono uppercase tracking-wider text-[#18191f] hover:text-emerald-700 transition-colors"
                    >
                      <span>Consulter l&apos;étude</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>

                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs text-[#555765] hover:text-[#18191f] transition-colors font-mono"
                      >
                        <span>Visiter le site</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {/* Empty State */}
      {filteredProjects.length === 0 && (
        <div className="py-20 text-center rounded-3xl bg-white border border-[#e6e6df] text-[#555765] space-y-3 shadow-card">
          <Layers className="w-10 h-10 mx-auto text-[#d5d5cc]" />
          <p className="text-base font-semibold text-[#18191f]">
            Aucun projet ne correspond à votre recherche.
          </p>
          <p className="text-xs text-[#555765]">
            Essayez de modifier votre terme de recherche ou sélectionnez une autre catégorie.
          </p>
        </div>
      )}
    </div>
  );
}
