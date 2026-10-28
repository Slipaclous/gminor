"use client";

import React from "react";
import Link from "next/link";
import { Magnetic } from "../motion/magnetic";
import { SplitText } from "../motion/split-text";

export function CtaBanner() {
  return (
    <section className="relative px-5 sm:px-10 py-32 sm:py-44 border-t border-line overflow-hidden">
      <h2 className="text-[16vw] sm:text-[12vw] leading-[0.85] tracking-[-0.06em] font-medium">
        <SplitText text="Parlons" />
        <br />
        <span className="font-serif italic font-normal">
          <SplitText text="de vous." delay={0.15} />
        </span>
      </h2>

      <div className="mt-16 flex flex-wrap items-center gap-10">
        <Magnetic>
          <Link
            href="/questionnaire"
            className="group relative flex items-center justify-center w-44 h-44 sm:w-56 sm:h-56 rounded-full bg-signal text-ink overflow-hidden"
          >
            <span className="absolute inset-0 rounded-full bg-paper scale-0 transition-transform duration-700 ease-expo group-hover:scale-100" />
            <span className="relative text-lg font-medium text-center leading-tight">
              Démarrer
              <br />
              <span className="font-serif italic text-2xl">un projet</span>
            </span>
          </Link>
        </Magnetic>
        <div className="space-y-2 text-paper-dim max-w-xs">
          <p>Un questionnaire de 2 minutes pour cadrer votre besoin. Réponse personnelle sous 24h.</p>
          <Link href="/contact" className="inline-block text-paper border-b border-paper pb-0.5 hover:text-signal hover:border-signal transition-colors">
            Ou m&apos;écrire directement →
          </Link>
        </div>
      </div>
    </section>
  );
}
