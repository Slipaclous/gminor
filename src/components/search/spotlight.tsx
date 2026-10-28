"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { searchEntries, type SearchEntry } from "@/lib/search";
import { getLenis } from "../motion/smooth-scroll";

export const OPEN_SEARCH_EVENT = "gminor:open-search";

export function openSearch() {
  window.dispatchEvent(new Event(OPEN_SEARCH_EVENT));
}

const GROUP_ORDER: SearchEntry["group"][] = ["Pages", "Projets", "FAQ", "Actions"];

export function Spotlight({ entries }: { entries: SearchEntry[] }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const results = useMemo(() => searchEntries(entries, query), [entries, query]);
  // Grouped for display, but keyboard order follows the flat grouped order.
  const ordered = useMemo(
    () => GROUP_ORDER.flatMap((g) => results.filter((r) => r.group === g)),
    [results]
  );
  const current = ordered[Math.min(active, ordered.length - 1)];

  const close = () => {
    setOpen(false);
    setQuery("");
    setActive(0);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const typing = (e.target as HTMLElement)?.closest("input, textarea, [contenteditable]");
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      } else if (e.key === "/" && !typing) {
        e.preventDefault();
        setOpen(true);
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener(OPEN_SEARCH_EVENT, onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(OPEN_SEARCH_EVENT, onOpen);
    };
  }, []);

  useEffect(() => {
    const lenis = getLenis();
    if (open) {
      lenis?.stop();
      requestAnimationFrame(() => inputRef.current?.focus());
    } else {
      lenis?.start();
    }
  }, [open]);

  useEffect(() => {
    listRef.current?.querySelector('[data-active="true"]')?.scrollIntoView({ block: "nearest" });
  }, [active]);

  const go = (entry: SearchEntry | undefined) => {
    if (!entry) return;
    close();
    if (entry.href.startsWith("http") || entry.href.startsWith("mailto:")) window.open(entry.href, "_blank");
    else router.push(entry.href);
  };

  const onInputKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => Math.min(i + 1, ordered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      go(current);
    } else if (e.key === "Escape") {
      close();
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="spotlight"
          className="fixed inset-0 z-[90] flex items-start justify-center px-4 pt-[14vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="absolute inset-0 bg-ink/50 backdrop-blur-sm" onClick={close} aria-hidden />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Recherche"
            className="relative w-full max-w-3xl overflow-hidden rounded-2xl border border-white/10 bg-ink-3/75 backdrop-blur-2xl shadow-2xl shadow-black/60"
            initial={{ scale: 0.96, y: -10 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.97, y: -6 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-4 px-5 h-16 border-b border-white/10">
              <svg aria-hidden viewBox="0 0 24 24" className="w-5 h-5 text-paper-dim shrink-0" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" />
              </svg>
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setActive(0);
                }}
                onKeyDown={onInputKey}
                placeholder="Rechercher un projet, une page, une question…"
                aria-label="Rechercher sur le site"
                className="flex-1 bg-transparent outline-none text-xl placeholder:text-paper-mute"
              />
              <kbd className="hidden sm:block font-mono text-[11px] text-paper-mute border border-white/10 rounded px-1.5 py-0.5">esc</kbd>
            </div>

            <div className="grid sm:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] h-[min(60vh,26rem)]">
              <div ref={listRef} className="overflow-y-auto py-2 sm:border-r border-white/10">
                {ordered.length === 0 && <p className="px-5 py-6 text-paper-dim">Aucun résultat pour « {query} ».</p>}
                {GROUP_ORDER.map((group) => {
                  const items = ordered.filter((r) => r.group === group);
                  if (items.length === 0) return null;
                  return (
                    <div key={group} className="pb-2">
                      <p className="px-5 pt-3 pb-1 text-[11px] font-medium text-paper-mute">{group}</p>
                      {items.map((entry) => {
                        const index = ordered.indexOf(entry);
                        const isActive = index === active;
                        return (
                          <button
                            key={entry.id}
                            type="button"
                            data-active={isActive}
                            onMouseMove={() => setActive(index)}
                            onClick={() => go(entry)}
                            className={`mx-2 w-[calc(100%-1rem)] flex items-center gap-3 rounded-lg px-3 py-2 text-left transition-colors ${
                              isActive ? "bg-signal text-ink" : "text-paper"
                            }`}
                          >
                            <EntryIcon entry={entry} />
                            <span className="truncate">{entry.title}</span>
                          </button>
                        );
                      })}
                    </div>
                  );
                })}
              </div>

              <div className="hidden sm:block overflow-y-auto p-6">
                {current && (
                  <div key={current.id} className="space-y-4">
                    {current.image ? (
                      <div className="relative aspect-[16/10] overflow-hidden rounded-lg bg-ink-2">
                        <Image src={current.image} alt="" fill sizes="360px" className="object-cover object-top" />
                      </div>
                    ) : (
                      <div className="aspect-[16/10] rounded-lg bg-ink-2 flex items-center justify-center">
                        <EntryIcon entry={current} large />
                      </div>
                    )}
                    <div>
                      <p className="text-xl font-medium tracking-tight">{current.title}</p>
                      {current.subtitle && <p className="mt-1 text-sm text-paper-mute">{current.subtitle}</p>}
                    </div>
                    {current.body && <p className="text-sm text-paper-dim leading-relaxed line-clamp-6">{current.body}</p>}
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center gap-5 px-5 h-10 border-t border-white/10 text-[11px] text-paper-mute">
              <span><kbd className="font-mono">↑↓</kbd> naviguer</span>
              <span><kbd className="font-mono">↵</kbd> ouvrir</span>
              <span className="ml-auto"><kbd className="font-mono">⌘K</kbd> rechercher partout</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function EntryIcon({ entry, large = false }: { entry: SearchEntry; large?: boolean }) {
  const size = large ? "w-10 h-10" : "w-4 h-4";
  const common = { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8, className: `${size} shrink-0 opacity-70` };
  if (entry.group === "Projets")
    return (
      <svg aria-hidden {...common}>
        <rect x="3" y="4" width="18" height="14" rx="2" />
        <path d="M3 8h18" />
      </svg>
    );
  if (entry.group === "FAQ")
    return (
      <svg aria-hidden {...common}>
        <circle cx="12" cy="12" r="9" />
        <path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .8-1 1.5v.7M12 17h.01" />
      </svg>
    );
  if (entry.group === "Actions")
    return (
      <svg aria-hidden {...common}>
        <path d="M5 12h14M13 6l6 6-6 6" />
      </svg>
    );
  return (
    <svg aria-hidden {...common}>
      <path d="M6 3h8l4 4v14H6z" />
      <path d="M14 3v4h4" />
    </svg>
  );
}
