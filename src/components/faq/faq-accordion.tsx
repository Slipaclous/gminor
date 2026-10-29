"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { FaqItem } from "@/lib/settings-service";
import { normalize } from "@/lib/search";

interface FaqAccordionProps {
  faqs: FaqItem[];
}

export function FaqAccordion({ faqs }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [query, setQuery] = useState("");

  // Deep links from the global search: /faq#q-3 opens and scrolls to question 3.
  useEffect(() => {
    const openFromHash = () => {
      const match = window.location.hash.match(/^#q-(\d+)$/);
      if (!match) return;
      const idx = Number(match[1]);
      setQuery("");
      setOpenIndex(idx);
      setTimeout(() => document.getElementById(`q-${idx}`)?.scrollIntoView({ behavior: "smooth", block: "center" }), 100);
    };
    const t = setTimeout(openFromHash, 0);
    window.addEventListener("hashchange", openFromHash);
    return () => {
      clearTimeout(t);
      window.removeEventListener("hashchange", openFromHash);
    };
  }, []);

  const visible = useMemo(() => {
    const q = normalize(query);
    return faqs
      .map((faq, idx) => ({ faq, idx }))
      .filter(({ faq }) => !q || normalize(`${faq.question} ${faq.answer}`).includes(q));
  }, [faqs, query]);

  return (
    <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
      <aside className="lg:col-span-4 lg:sticky lg:top-28 self-start space-y-10">
        <div className="relative">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Filtrer les questions…"
            aria-label="Filtrer les questions"
            className="w-full bg-ink-2 border border-line rounded-xl pl-11 pr-4 py-4 outline-none focus:border-signal transition-colors placeholder:text-paper-mute"
          />
          <svg aria-hidden viewBox="0 0 24 24" className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-paper-mute" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </svg>
        </div>

        <div className="rounded-2xl border border-line p-6 space-y-3">
          <p className="text-xl font-medium tracking-tight">Votre question n&apos;y est pas ?</p>
          <p className="text-paper-dim">Écrivez-moi, je réponds personnellement sous 24h.</p>
          <Link href="/contact" className="inline-block pt-2 border-b border-paper pb-0.5 hover:text-signal hover:border-signal transition-colors">
            Poser ma question →
          </Link>
        </div>
      </aside>

      <div className="lg:col-span-8 space-y-3">
        {visible.length === 0 && (
          <p className="py-10 text-paper-dim">Aucune question ne correspond à « {query} ».</p>
        )}
        {visible.map(({ faq, idx }) => {
          const isOpen = openIndex === idx || (!!query && visible.length === 1);
          return (
            <motion.div
              key={idx}
              id={`q-${idx}`}
              layout
              className={`rounded-2xl border transition-colors duration-500 ${isOpen ? "bg-ink-2 border-line" : "border-line hover:border-paper/30"}`}
            >
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                aria-expanded={isOpen}
                className="w-full flex items-start gap-6 p-6 sm:p-8 text-left"
              >
                <span className="font-mono text-xs text-moss/80 pt-2 w-6 shrink-0">{String(idx + 1).padStart(2, "0")}</span>
                <span className="flex-1 text-xl sm:text-2xl tracking-[-0.02em] font-medium leading-snug">{faq.question}</span>
                <span
                  className={`shrink-0 w-9 h-9 rounded-full border flex items-center justify-center transition-all duration-500 ${
                    isOpen ? "rotate-45 bg-signal border-signal text-ink" : "border-line"
                  }`}
                >
                  +
                </span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 sm:px-8 pb-8 sm:pl-[5.5rem] text-lg text-paper-dim leading-relaxed max-w-3xl">{faq.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
