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

/** Pin only where it feels good: wide screens with a wheel/trackpad and motion allowed. */
function usePinnedLayout() {
  const [pinned, setPinned] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
    const update = () => setPinned(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return pinned;
}

/**
 * Desktop: pinned section where vertical scroll drives a horizontal strip.
 * Touch, small screens and reduced motion: native swipe with scroll snap.
 */
export function WorksScroll({ projects, total }: WorksScrollProps) {
  const ref = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const pinned = usePinnedLayout();
  const [distance, setDistance] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);

  useEffect(() => {
    if (!pinned) return;
    const measure = () => {
      const track = trackRef.current;
      if (track) setDistance(Math.max(0, track.scrollWidth - window.innerWidth + 40));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [projects.length, pinned]);
  const progress = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      ref={ref}
      id="travaux"
      style={pinned ? { height: `${(projects.length + 1) * 70}vh` } : undefined}
      className={pinned ? "relative" : "relative py-16 sm:py-24"}
    >
      <div className={pinned ? "sticky top-0 h-svh overflow-hidden flex flex-col justify-center" : "relative"}>
        <motion.div
          ref={trackRef}
          style={pinned ? { x } : undefined}
          className={
            pinned
              ? "flex items-center gap-[4vw] pl-5 sm:pl-10 w-max"
              : "flex items-start gap-6 px-5 sm:px-10 overflow-x-auto snap-x snap-mandatory overscroll-x-contain scroll-px-5 sm:scroll-px-10 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          }
        >
          <div className="w-[80vw] sm:w-[42vw] shrink-0 pr-[4vw] snap-start">
            <h2 className="text-[13vw] sm:text-[7vw] leading-[0.9] tracking-[-0.05em] font-medium">
              <SplitText text="Travaux" />
              <br />
              <span className="font-serif italic font-normal text-signal">
                <SplitText text="récents" delay={0.2} />
              </span>
            </h2>
            <Link href="/projets" className="mt-8 inline-flex items-center gap-2 border-b border-paper pb-1 hover:text-signal hover:border-signal transition-colors">
              Voir les {total} projets →
            </Link>
          </div>

          {projects.map((project, i) => (
            <Link
              key={project.id}
              href={`/projets/${project.slug}`}
              data-cursor="Voir"
              className="group shrink-0 w-[80vw] sm:w-[52vw] lg:w-[44vw] snap-start"
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
                <span className="absolute top-4 left-4 font-mono text-xs text-moss bg-ink/70 backdrop-blur px-2 py-1">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <div className="mt-5 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                <h3 className="text-2xl sm:text-4xl tracking-tight font-medium transition-all duration-500 group-hover:font-serif group-hover:italic">
                  {project.title}
                </h3>
                <span className="shrink-0 font-mono text-xs text-moss/80">
                  {project.categoryLabel} — {project.year}
                </span>
              </div>
            </Link>
          ))}
        </motion.div>

        {pinned && (
          <div className="absolute bottom-8 inset-x-5 sm:inset-x-10 h-px bg-line">
            <motion.div style={{ width: progress }} className="h-full bg-signal" />
          </div>
        )}
      </div>
    </section>
  );
}
