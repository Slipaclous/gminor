"use client";

import React, { useMemo, useState, ViewTransition } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import type { ProjectItem } from "@/data/projects";
import { projectShot } from "@/lib/project-shots";

interface ProjectsGalleryProps {
  initialProjects: ProjectItem[];
}

const CATEGORIES = [
  { key: "ALL", label: "Tout" },
  { key: "WEBSITE", label: "Sites" },
  { key: "ECOMMERCE", label: "E-commerce" },
  { key: "SAAS", label: "SaaS" },
  { key: "FULLSTACK", label: "Full-stack" },
];

export function ProjectsGallery({ initialProjects }: ProjectsGalleryProps) {
  const [filter, setFilter] = useState("ALL");
  const [view, setView] = useState<"list" | "grid">("list");

  const projects = useMemo(
    () => (filter === "ALL" ? initialProjects : initialProjects.filter((p) => p.category === filter)),
    [filter, initialProjects]
  );
  const counts = useMemo(() => {
    const map: Record<string, number> = { ALL: initialProjects.length };
    initialProjects.forEach((p) => (map[p.category] = (map[p.category] ?? 0) + 1));
    return map;
  }, [initialProjects]);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-6 border-b border-line pb-6">
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.filter((c) => counts[c.key]).map((c) => (
            <button
              key={c.key}
              type="button"
              onClick={() => setFilter(c.key)}
              className={`px-4 py-2 rounded-full border text-sm transition-colors ${
                filter === c.key ? "bg-paper text-ink border-paper" : "border-line hover:border-paper"
              }`}
            >
              {c.label} <sup className="font-mono text-[10px]">{counts[c.key]}</sup>
            </button>
          ))}
        </div>
        <div className="flex gap-4 font-mono text-xs">
          {(["list", "grid"] as const).map((v) => (
            <button
              key={v}
              type="button"
              onClick={() => setView(v)}
              className={view === v ? "text-signal" : "text-paper-mute hover:text-paper"}
            >
              {v === "list" ? "Liste" : "Grille"}
            </button>
          ))}
        </div>
      </div>

      {view === "list" ? (
        <ul>
          {projects.map((project, i) => (
            <motion.li
              key={project.id}
              layout
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] }}
              className="border-b border-line"
            >
              <Link
                href={`/projets/${project.slug}`}
                data-cursor="Ouvrir"
                className="group grid grid-cols-12 items-baseline gap-4 py-6 sm:py-8 transition-opacity duration-500 [ul:hover_&]:opacity-40 hover:!opacity-100"
              >
                <span className="col-span-2 sm:col-span-1 font-mono text-xs text-paper-mute">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="col-span-10 sm:col-span-6 text-3xl sm:text-5xl lg:text-6xl tracking-[-0.04em] font-medium transition-transform duration-700 ease-expo group-hover:translate-x-3 group-hover:font-serif group-hover:italic">
                  {project.title}
                </span>
                <span className="hidden sm:block col-span-3 text-sm text-paper-dim">{project.categoryLabel}</span>
                <span className="hidden sm:block col-span-2 text-right font-mono text-xs text-moss/80">{project.year}</span>
              </Link>
            </motion.li>
          ))}
        </ul>
      ) : (
        <div className="grid sm:grid-cols-2 gap-x-6 gap-y-14 pt-10">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
              className={i % 2 === 1 ? "sm:mt-24" : ""}
            >
              <Link href={`/projets/${project.slug}`} data-cursor="Ouvrir" className="group block">
                <div className="relative aspect-[4/3] overflow-hidden bg-ink-3">
                  <ViewTransition name={`project-${project.slug}`}>
                    <Image
                      src={projectShot(project)}
                      alt={project.title}
                      fill
                      sizes="(min-width: 640px) 50vw, 100vw"
                      className="object-cover object-top transition-transform duration-[1.2s] ease-expo group-hover:scale-105"
                    />
                  </ViewTransition>
                </div>
                <div className="mt-4 flex justify-between gap-4">
                  <h2 className="text-2xl tracking-tight font-medium">{project.title}</h2>
                  <span className="font-mono text-xs text-moss/80">{project.year}</span>
                </div>
                <p className="mt-1 text-sm text-paper-dim line-clamp-2">{project.tagline}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      )}

    </div>
  );
}
