"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { getLenis } from "../motion/smooth-scroll";

export interface CaseStudySection {
  id: string;
  label: string;
}

/**
 * Reading aids for case studies: a hairline progress bar on top and a
 * floating table of contents that highlights the chapter in view.
 */
export function CaseStudyNav({ sections }: { sections: CaseStudySection[] }) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 40, restDelta: 0.001 });
  const [active, setActive] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const els = sections.map((s) => document.getElementById(s.id)).filter((el): el is HTMLElement => !!el);
    if (els.length === 0) return;

    // A chapter is "current" once it crosses the upper third of the viewport.
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id);
      },
      { rootMargin: "-30% 0px -60% 0px" },
    );
    els.forEach((el) => io.observe(el));

    // Show the pill between the first chapter and the end of the last one.
    const first = els[0];
    const last = els[els.length - 1];
    const onScroll = () => {
      const top = first.getBoundingClientRect().top;
      const bottom = last.getBoundingClientRect().bottom;
      setVisible(top < window.innerHeight * 0.8 && bottom > window.innerHeight * 0.4);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [sections]);

  const goTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(el, { offset: -80 });
    else el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <motion.div aria-hidden style={{ scaleX }} className="fixed inset-x-0 top-0 z-[55] h-0.5 origin-left bg-signal" />

      <AnimatePresence>
        {visible && (
          <motion.nav
            aria-label="Sommaire de l'étude de cas"
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-5 inset-x-0 z-40 flex justify-center px-5 pointer-events-none"
          >
            <ol className="pointer-events-auto flex items-center gap-1 max-w-full overflow-x-auto rounded-full border border-line bg-ink-2/80 backdrop-blur-xl p-1 shadow-lg shadow-black/20 [scrollbar-width:none]">
              {sections.map((s, i) => {
                const current = active === s.id;
                return (
                  <li key={s.id} className="relative shrink-0">
                    {current && (
                      <motion.span
                        layoutId="case-nav-active"
                        className="absolute inset-0 rounded-full bg-paper"
                        transition={{ type: "spring", stiffness: 400, damping: 35 }}
                      />
                    )}
                    <button
                      type="button"
                      onClick={() => goTo(s.id)}
                      aria-current={current ? "true" : undefined}
                      className={`relative flex items-center gap-2 rounded-full px-4 py-2 text-sm transition-colors ${current ? "text-ink" : "text-paper-dim hover:text-paper"}`}
                    >
                      <span className="font-mono text-[10px] opacity-60">{String(i + 1).padStart(2, "0")}</span>
                      {s.label}
                    </button>
                  </li>
                );
              })}
            </ol>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
