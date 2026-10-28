"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

let lenisInstance: Lenis | null = null;

export function getLenis() {
  return lenisInstance;
}

export function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 1 });
    lenisInstance = lenis;
    let frame = requestAnimationFrame(function raf(time) {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    });

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
      lenisInstance = null;
    };
  }, []);

  useEffect(() => {
    lenisInstance?.scrollTo(0, { immediate: true });
  }, [pathname]);

  return null;
}
