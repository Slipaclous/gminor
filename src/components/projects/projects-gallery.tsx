"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ProjectItem } from "@/data/projects";
import { ArrowUpRight, ExternalLink, Sparkles, Terminal, Activity, Layers, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ProjectsGalleryProps {
  initialProjects: ProjectItem[];
}

const CATEGORIES = [
  { key: "ALL", label: "Toutes les réalisations" },
  { key: "SAAS", label: "SaaS & Web Apps" },
  { key: "WEBSITE", label: "Sites Vitrines & PME" },
  { key: "ECOMMERCE", label: "E-Commerce" },
  { key: "FULLSTACK", label: "Outils & Full-Stack" },
];

export function ProjectsGallery({ initialProjects }: ProjectsGalleryProps) {
  const [activeCategory, setActiveCategory] = useState("ALL");

  const filteredProjects =
    activeCategory === "ALL"
      ? initialProjects
      : initialProjects.filter((p) => p.category === activeCategory);

  // Bento Span Mapping for dynamic visual rhythm
  const getBentoSpan = (index: number, total: number) => {
    if (activeCategory !== "ALL") {
      // In filtered view, clean 2-column or 3-column balance
      return "md:col-span-6 lg:col-span-6";
    }

    const patternIndex = index % 5;
    switch (patternIndex) {
      case 0:
        return "md:col-span-12 lg:col-span-8"; // Hero wide showcase
      case 1:
        return "md:col-span-12 lg:col-span-4"; // Metric / Focus box
      case 2:
        return "md:col-span-6 lg:col-span-4";  // Clean compact
      case 3:
        return "md:col-span-6 lg:col-span-4";  // Clean compact
      case 4:
        return "md:col-span-12 lg:col-span-4"; // Highlight box
      default:
        return "md:col-span-6 lg:col-span-6";
    }
  };

  return (
    <div className="space-y-10">
      {/* Category Pills */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-[#0d0d10] border border-white/[0.08] w-fit shadow-md">
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat.key;
          return (
            <button
              key={cat.key}
              type="button"
              onClick={() => setActiveCategory(cat.key)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-150 cursor-pointer ${
                isActive
                  ? "bg-white text-black font-bold shadow-sm"
                  : "text-zinc-400 hover:text-white hover:bg-zinc-900"
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Asymmetric Organic Bento Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-12 gap-6"
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, idx) => {
            const spanClass = getBentoSpan(idx, filteredProjects.length);
            const isWide = spanClass.includes("lg:col-span-8") || spanClass.includes("md:col-span-12");

            return (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, delay: idx * 0.04 }}
                className={spanClass}
              >
                <div className="group h-full rounded-3xl bg-[#0d0d10] border border-white/[0.08] hover:border-white/[0.22] transition-all duration-300 p-6 sm:p-7 flex flex-col justify-between overflow-hidden shadow-xl relative">
                  {/* Subtle Ambient Background image glow on wide cards */}
                  {isWide && project.imageUrl && (
                    <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 group-hover:opacity-20 blur-3xl pointer-events-none transition-opacity duration-500 overflow-hidden">
                      <Image
                        src={project.imageUrl}
                        alt=""
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}

                  <div className="space-y-4 relative z-10">
                    {/* Top Row: Category Badge + Year + Client */}
                    <div className="flex items-center justify-between gap-3">
                      <span className="px-2.5 py-0.5 rounded-md text-[10px] sm:text-[11px] font-mono uppercase tracking-wider font-semibold bg-zinc-900 text-zinc-300 border border-white/[0.08]">
                        {project.categoryLabel}
                      </span>
                      <span className="text-xs font-mono text-zinc-400">
                        {project.client ? `${project.client} • ` : ""}
                        {project.year}
                      </span>
                    </div>

                    {/* Title & Tagline */}
                    <div className="space-y-1.5">
                      <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
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

                    {/* Compact Metrics Grid (if present) */}
                    {project.metrics && project.metrics.length > 0 && (
                      <div className={`grid gap-2.5 p-3 rounded-2xl bg-black/80 border border-white/[0.06] ${
                        isWide ? "grid-cols-3 max-w-lg" : "grid-cols-2"
                      }`}>
                        {project.metrics.slice(0, isWide ? 3 : 2).map((m, mIdx) => (
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

                    {/* Tech Stack Badges */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {project.techStack.slice(0, isWide ? 6 : 4).map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 rounded-md text-[11px] font-mono text-zinc-400 bg-zinc-900/90 border border-white/[0.05]"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.techStack.length > (isWide ? 6 : 4) && (
                        <span className="px-2 py-0.5 rounded-md text-[11px] font-mono text-zinc-500">
                          +{project.techStack.length - (isWide ? 6 : 4)}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Bottom Action Footer */}
                  <div className="pt-4 mt-4 border-t border-white/[0.06] flex items-center justify-between gap-3 text-xs relative z-10">
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
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {filteredProjects.length === 0 && (
        <div className="py-16 text-center rounded-3xl bg-[#0d0d10] border border-white/[0.08] text-zinc-400 space-y-2">
          <Layers className="w-8 h-8 mx-auto text-zinc-600" />
          <p className="text-sm">Aucun projet dans cette catégorie pour le moment.</p>
        </div>
      )}
    </div>
  );
}
