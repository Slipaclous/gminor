"use client";

import React, { useEffect, useRef, useState, ViewTransition } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import type { ProjectItem } from "@/data/projects";
import { SplitText } from "../motion/split-text";
import { projectShot } from "@/lib/project-shots";

interface WorksScrollProps {
  projects: ProjectItem[];
  total: number;
}

/** Pinned section: vertical scroll drives a horizontal strip of projects. */
export function WorksScroll({ projects, total }: WorksScrollProps) {
  const ref = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);

  useEffect(() => {
    const measure = () => {
      const track = trackRef.current;
      if (track) setDistance(Math.max(0, track.scrollWidth - window.innerWidth + 40));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [projects.length]);
  const progress = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={ref} id="travaux" style={{ height: `${(projects.length + 1) * 80}vh` }} className="relative">
      <div className="sticky top-0 h-svh overflow-hidden flex flex-col justify-center">
        <motion.div ref={trackRef} style={{ x }} className="flex items-center gap-[4vw] pl-5 sm:pl-10 w-max">
          <div className="w-[80vw] sm:w-[42vw] shrink-0 pr-[4vw]">
            <h2 className="text-[13vw] sm:text-[7vw] leading-[0.9] tracking-[-0.05em] font-medium">
              <SplitText text="Travaux" />
              <br />
              <span className="font-serif italic font-normal text-signal">
                <SplitText text="récents" delay={0.2} />
              </span>
            </h2>
            <p className="mt-8 max-w-sm text-paper-dim">
              Sites vitrines, e-commerce et plateformes SaaS. Chaque projet est pensé, dessiné et développé de A à Z.
            </p>
            <Link href="/projets" className="mt-8 inline-flex items-center gap-2 border-b border-paper pb-1 hover:text-signal hover:border-signal transition-colors">
              Voir les {total} projets →
            </Link>
          </div>

          {projects.map((project, i) => (
            <Link
              key={project.id}
              href={`/projets/${project.slug}`}
              data-cursor="Voir"
              className="group shrink-0 w-[80vw] sm:w-[52vw] lg:w-[44vw]"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-ink-3">
                <ViewTransition name={`project-${project.slug}`}>
                  <Image
                    src={projectShot(project)}
                    alt={project.title}
                    fill
                    sizes="(min-width: 1024px) 44vw, 80vw"
                    className="object-cover object-top transition-transform duration-[1.2s] ease-expo group-hover:scale-[1.06]"
                  />
                </ViewTransition>
                <span className="absolute top-4 left-4 font-mono text-xs bg-ink/70 backdrop-blur px-2 py-1">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <div className="mt-5 flex items-baseline justify-between gap-6">
                <h3 className="text-2xl sm:text-4xl tracking-tight font-medium transition-all duration-500 group-hover:font-serif group-hover:italic">
                  {project.title}
                </h3>
                <span className="shrink-0 font-mono text-xs text-paper-mute">
                  {project.categoryLabel} — {project.year}
                </span>
              </div>
            </Link>
          ))}
        </motion.div>

        <div className="absolute bottom-8 inset-x-5 sm:inset-x-10 h-px bg-line">
          <motion.div style={{ width: progress }} className="h-full bg-signal" />
        </div>
      </div>
    </section>
  );
}
