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

function Shot({ project, index, sizes }: { project: ProjectItem; index: number; sizes: string }) {
  return (
    <div className="relative aspect-[4/3] overflow-hidden bg-ink-3">
      <ViewTransition name={`project-${project.slug}`}>
        <Image
          src={projectShot(project)}
          alt={project.title}
          fill
          sizes={sizes}
          className="object-cover object-top transition-transform duration-[1.2s] ease-expo group-hover:scale-[1.06]"
        />
      </ViewTransition>
      <span className="absolute top-4 left-4 font-mono text-xs text-moss bg-ink/70 backdrop-blur px-2 py-1">
        {String(index + 1).padStart(2, "0")}
      </span>
    </div>
  );
}

function Heading({ total }: { total: number }) {
  return (
    <>
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
    </>
  );
}

/**
 * Touch, small screens and reduced motion: plain vertical scroll where
 * each card sticks and the next one slides over it, like a deck.
 */
function StackedWorks({ projects, total }: WorksScrollProps) {
  return (
    <section id="travaux" className="relative px-5 sm:px-10 py-16 sm:py-24">
      <Heading total={total} />
      <ol className="mt-12 sm:mt-16">
        {projects.map((project, i) => (
          <li
            key={project.id}
            className="sticky mb-6 last:mb-0"
            style={{ top: `calc(5.5rem + ${i * 0.75}rem)` }}
          >
            <Link
              href={`/projets/${project.slug}`}
              className="group block border border-line bg-ink-2 p-3 sm:p-4 shadow-[0_-12px_30px_-12px_rgba(0,0,0,0.35)]"
            >
              <Shot project={project} index={i} sizes="(min-width: 640px) 90vw, 100vw" />
              <div className="mt-4 mb-1 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                <h3 className="text-2xl sm:text-4xl tracking-tight font-medium">{project.title}</h3>
                <span className="font-mono text-xs text-moss/80">
                  {project.categoryLabel} — {project.year}
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ol>
    </section>
  );
}

/**
 * Desktop: pinned section where vertical scroll drives a horizontal strip.
 * Everything else gets the stacked deck above.
 */
export function WorksScroll(props: WorksScrollProps) {
  const pinned = usePinnedLayout();
  return pinned ? <PinnedWorks {...props} /> : <StackedWorks {...props} />;
}

function PinnedWorks({ projects, total }: WorksScrollProps) {
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
    <section ref={ref} id="travaux" style={{ height: `${(projects.length + 1) * 70}vh` }} className="relative">
      <div className="sticky top-0 h-svh overflow-hidden flex flex-col justify-center">
        <motion.div ref={trackRef} style={{ x }} className="flex items-center gap-[4vw] pl-10 w-max">
          <div className="w-[42vw] shrink-0 pr-[4vw]">
            <Heading total={total} />
          </div>

          {projects.map((project, i) => (
            <Link
              key={project.id}
              href={`/projets/${project.slug}`}
              data-cursor="Voir"
              className="group shrink-0 w-[44vw]"
            >
              <Shot project={project} index={i} sizes="44vw" />
              <div className="mt-5 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                <h3 className="text-4xl tracking-tight font-medium transition-all duration-500 group-hover:font-serif group-hover:italic">
                  {project.title}
                </h3>
                <span className="shrink-0 font-mono text-xs text-moss/80">
                  {project.categoryLabel} — {project.year}
                </span>
              </div>
            </Link>
          ))}
        </motion.div>

        <div className="absolute bottom-8 inset-x-10 h-px bg-line">
          <motion.div style={{ width: progress }} className="h-full bg-signal" />
        </div>
      </div>
    </section>
  );
}
