"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowUpRight, ExternalLink, ChevronRight, Play, Pause } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ProjectItem } from "@/data/projects";
import { ProjectVisual } from "@/components/projects/project-visual";

interface MagazineShowcaseProps {
  projects: ProjectItem[];
  totalProjectsCount?: number;
}

const AUTOPLAY_INTERVAL = 6000; // 6 seconds per project

export function MagazineShowcase({
  projects,
  totalProjectsCount,
}: MagazineShowcaseProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progressKey, setProgressKey] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const displayCount = totalProjectsCount || projects.length;
  const currentProject = projects[activeIndex] || projects[0];
  const primaryMetric = currentProject?.metrics?.[0];

  // Autoplay loop with smooth cadence
  useEffect(() => {
    if (isPaused || projects.length <= 1) return;

    timerRef.current = setTimeout(() => {
      setActiveIndex((prev) => (prev + 1) % projects.length);
      setProgressKey((k) => k + 1);
    }, AUTOPLAY_INTERVAL);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [activeIndex, isPaused, projects.length]);

  const handleManualSelect = (idx: number) => {
    setActiveIndex(idx);
    setProgressKey((k) => k + 1);
  };

  return (
    <section
      className="py-20 sm:py-28 border-b border-[#e6e6df] bg-[#fafaf8]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12 sm:space-y-16">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <span className="text-[11px] font-mono uppercase tracking-widest text-emerald-800 font-bold block">
              RÉALISATIONS PHARES &amp; ÉTUDES DE CAS
            </span>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#18191f] font-sans leading-tight">
              Des réalisations concrètes. Des résultats mesurables.
            </h2>
            <p className="text-sm sm:text-base text-[#555765] leading-relaxed font-normal">
              Explorez nos réalisations étape par étape pour découvrir comment chaque projet répond aux enjeux concrets d&apos;une entreprise.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {/* Autoplay Pause/Play toggle indicator */}
            <button
              type="button"
              onClick={() => setIsPaused((p) => !p)}
              className="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-xl bg-white border border-[#e6e6df] text-[11px] font-mono text-[#555765] hover:text-[#18191f] transition-colors shadow-2xs cursor-pointer"
              title={isPaused ? "Reprendre le défilement automatique" : "Mettre en pause"}
            >
              {isPaused ? (
                <>
                  <Play className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="hidden sm:inline">Reprendre</span>
                </>
              ) : (
                <>
                  <Pause className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="hidden sm:inline">Défilement auto</span>
                </>
              )}
            </button>

            {/* View Full Portfolio Button with Exact Real Count */}
            <Link
              href="/projets"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white hover:bg-[#f4f4f0] border border-[#e6e6df] text-xs font-bold uppercase tracking-wider text-[#18191f] transition-all shadow-xs"
            >
              <span>Voir tout le portfolio ({displayCount})</span>
              <ArrowUpRight className="w-4 h-4 text-emerald-600" />
            </Link>
          </div>
        </div>

        {/* Interactive Step Navigator — Reduces Visual Clutter */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 p-1.5 sm:p-2 rounded-2xl bg-white border border-[#e6e6df] shadow-xs">
          {projects.map((project, idx) => {
            const isActive = activeIndex === idx;
            const stepNum = String(idx + 1).padStart(2, "0");

            return (
              <button
                key={project.id}
                type="button"
                onClick={() => handleManualSelect(idx)}
                className={`group relative text-left p-3.5 sm:p-4 rounded-xl transition-all duration-200 cursor-pointer flex flex-col justify-between space-y-2 overflow-hidden ${
                  isActive
                    ? "bg-[#18191f] text-white shadow-md"
                    : "hover:bg-[#fafaf8] text-[#555765]"
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span
                    className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-md ${
                      isActive
                        ? "bg-white/20 text-white"
                        : "bg-[#f4f4f0] text-[#555765]"
                    }`}
                  >
                    Projet {stepNum}
                  </span>
                  <span
                    className={`text-[10px] font-mono uppercase tracking-wider hidden sm:inline ${
                      isActive ? "text-emerald-400 font-semibold" : "text-[#7c7e8c]"
                    }`}
                  >
                    {project.categoryLabel}
                  </span>
                </div>

                <div>
                  <h3
                    className={`text-sm sm:text-base font-extrabold tracking-tight truncate ${
                      isActive ? "text-white" : "text-[#18191f] group-hover:text-emerald-700"
                    }`}
                  >
                    {project.title}
                  </h3>
                  <p
                    className={`text-xs truncate ${
                      isActive ? "text-white/70" : "text-[#7c7e8c]"
                    }`}
                  >
                    {project.client || "Client Confidentiel"} &bull; {project.year}
                  </p>
                </div>

                {/* Progress bar line for active item */}
                {isActive && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
                    <motion.div
                      key={progressKey}
                      className="h-full bg-emerald-400"
                      initial={{ width: "0%" }}
                      animate={{ width: isPaused ? "100%" : "100%" }}
                      transition={{
                        duration: isPaused ? 0 : AUTOPLAY_INTERVAL / 1000,
                        ease: "linear",
                      }}
                    />
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Focused Step Display with Smooth Animated Transition */}
        <div className="relative rounded-3xl bg-white border border-[#e6e6df] shadow-card overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentProject.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 p-6 sm:p-10 items-center"
            >
              {/* Left Column: Visual Showcase (6 cols) */}
              <div className="lg:col-span-6 w-full">
                <Link
                  href={`/projets/${currentProject.slug}`}
                  className="block relative w-full overflow-hidden rounded-2xl cursor-pointer"
                >
                  <ProjectVisual
                    slug={currentProject.slug}
                    title={currentProject.title}
                    category={currentProject.category}
                    categoryLabel={currentProject.categoryLabel}
                    imageUrl={currentProject.imageUrl}
                    aspectRatio="aspect-[16/10]"
                  />
                </Link>
              </div>

              {/* Right Column: Detailed Context, Metrics & Actions (6 cols) */}
              <div className="lg:col-span-6 space-y-6 flex flex-col justify-between">
                <div className="space-y-4">
                  {/* Step breadcrumb & meta */}
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2.5 py-1 rounded-md text-[11px] font-mono uppercase tracking-wider font-bold bg-[#18191f] text-white">
                      Étape 0{activeIndex + 1} / 0{projects.length}
                    </span>
                    <span className="px-2.5 py-1 rounded-md text-[11px] font-mono uppercase tracking-wider font-semibold bg-[#f4f4f0] text-[#555765] border border-[#e6e6df]">
                      {currentProject.categoryLabel}
                    </span>
                    <span className="text-xs font-mono text-[#555765]">
                      {currentProject.client ? `${currentProject.client} • ` : ""}
                      {currentProject.year}
                    </span>
                  </div>

                  {/* Title & Tagline */}
                  <div className="space-y-2">
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#18191f] tracking-tight">
                      <Link
                        href={`/projets/${currentProject.slug}`}
                        className="hover:underline flex items-center justify-between gap-3 group/link"
                      >
                        <span>{currentProject.title}</span>
                        <ArrowUpRight className="w-6 h-6 text-[#555765] group-hover/link:text-emerald-600 group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-all shrink-0" />
                      </Link>
                    </h3>
                    <p className="text-sm sm:text-base text-[#555765] leading-relaxed font-normal">
                      {currentProject.tagline}
                    </p>
                  </div>

                  {/* Key Metrics Strip */}
                  {currentProject.metrics && currentProject.metrics.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-2">
                      {currentProject.metrics.slice(0, 3).map((m, idx) => (
                        <div
                          key={idx}
                          className="p-3 rounded-xl bg-[#fafaf8] border border-[#e6e6df] space-y-0.5"
                        >
                          <span className="text-[10px] sm:text-[11px] text-[#555765] font-mono block">
                            {m.label}
                          </span>
                          <span className="text-sm sm:text-base font-extrabold text-[#18191f] font-mono">
                            {m.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Tech Stack Pills */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {currentProject.techStack.slice(0, 5).map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded-md text-[11px] font-mono text-[#555765] bg-[#fafaf8] border border-[#e6e6df]"
                      >
                        {tech}
                      </span>
                    ))}
                    {currentProject.techStack.length > 5 && (
                      <span className="px-2 py-1 rounded-md text-[11px] font-mono text-[#7c7e8c]">
                        +{currentProject.techStack.length - 5}
                      </span>
                    )}
                  </div>
                </div>

                {/* Bottom Action Strip & Quick Navigation */}
                <div className="pt-6 border-t border-[#e6e6df] flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <Link
                      href={`/projets/${currentProject.slug}`}
                      className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#18191f] hover:bg-[#2d2e38] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md active:scale-95"
                    >
                      <span>Consulter l&apos;étude de cas</span>
                      <ArrowUpRight className="w-4 h-4 text-emerald-400" />
                    </Link>

                    {currentProject.liveUrl && (
                      <a
                        href={currentProject.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-3 rounded-xl bg-[#fafaf8] hover:bg-[#f4f4f0] border border-[#e6e6df] text-xs font-mono text-[#555765] hover:text-[#18191f] transition-colors shadow-2xs"
                      >
                        <span>Visiter en direct</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>

                  {/* Next Step Shortcut Button */}
                  <button
                    type="button"
                    onClick={() => {
                      setActiveIndex((prev) => (prev + 1) % projects.length);
                      setProgressKey((k) => k + 1);
                    }}
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-[#555765] hover:text-[#18191f] transition-colors cursor-pointer"
                  >
                    <span>Projet suivant</span>
                    <ChevronRight className="w-4 h-4 text-emerald-600" />
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
