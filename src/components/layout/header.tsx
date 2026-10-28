"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Logo } from "./logo";
import { getLenis } from "../motion/smooth-scroll";
import { openSearch } from "../search/spotlight";

const NAV_LINKS = [
  { href: "/", label: "Accueil", note: "Retour au début" },
  { href: "/projets", label: "Réalisations", note: "Études de cas" },
  { href: "/#services", label: "Savoir-faire", note: "Dev & design" },
  { href: "/#a-propos", label: "À propos", note: "Qui suis-je" },
  { href: "/questionnaire", label: "Votre projet", note: "Questionnaire" },
  { href: "/faq", label: "FAQ", note: "Questions fréquentes" },
  { href: "/contact", label: "Contact", note: "M'écrire" },
];

const ease = [0.76, 0, 0.24, 1] as const;

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [prevPathname, setPrevPathname] = useState(pathname);

  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setOpen(false);
  }

  useEffect(() => {
    const lenis = getLenis();
    if (open) lenis?.stop();
    else lenis?.start();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${open ? "text-ink" : "mix-blend-difference text-paper"}`}>
        <div className="flex items-center justify-between px-5 sm:px-10 py-6">
          <Logo />
          <nav className="hidden lg:flex items-center gap-8 xl:gap-10 text-sm" aria-label="Navigation principale">
            {NAV_LINKS.slice(1).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={pathname === link.href || (link.href.length > 1 && !link.href.includes("#") && pathname.startsWith(link.href)) ? "page" : undefined}
                className="group relative overflow-hidden after:absolute after:left-0 after:bottom-0 after:h-px after:w-full after:bg-paper after:origin-left after:scale-x-0 aria-[current=page]:after:scale-x-100 after:transition-transform after:duration-500"
              >
                <span className="block transition-transform duration-500 ease-expo group-hover:-translate-y-full">{link.label}</span>
                <span className="absolute inset-0 translate-y-full font-serif italic text-base transition-transform duration-500 ease-expo group-hover:translate-y-0">
                  {link.label}
                </span>
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={openSearch}
            aria-label="Rechercher (⌘K)"
            className="flex items-center gap-2 h-8 rounded-full border border-current/40 px-2.5 sm:px-3 text-sm hover:border-current transition-colors"
          >
            <svg aria-hidden viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>
            <kbd className="hidden sm:inline font-mono text-[11px] opacity-70">⌘K</kbd>
          </button>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            className="lg:hidden flex items-center gap-3 text-sm"
          >
            <span className="hidden sm:inline">{open ? "Fermer" : "Menu"}</span>
            <span className="relative w-8 h-8 rounded-full border border-current/40 flex items-center justify-center">
              <span className={`absolute w-3.5 h-px bg-current transition-transform duration-500 ${open ? "rotate-45" : "-translate-y-[3px]"}`} />
              <span className={`absolute w-3.5 h-px bg-current transition-transform duration-500 ${open ? "-rotate-45" : "translate-y-[3px]"}`} />
            </span>
          </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            key="menu"
            className="fixed inset-0 z-40 bg-signal text-ink flex flex-col justify-end overflow-y-auto px-5 sm:px-10 pb-10 pt-28"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(100% 0 0 0)" }}
            transition={{ duration: 0.8, ease }}
          >
            <nav className="flex flex-col" aria-label="Menu">
              {NAV_LINKS.map((link, i) => (
                <div key={link.href} className="overflow-hidden border-b border-ink/15">
                  <motion.div
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "-100%" }}
                    transition={{ duration: 0.8, ease, delay: 0.15 + i * 0.06 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="group flex items-baseline justify-between py-2 sm:py-3"
                    >
                      <span className="text-[11vw] sm:text-[7.5vw] lg:text-[5.2vw] leading-[0.95] font-medium tracking-[-0.04em] transition-all duration-500 ease-expo group-hover:font-serif group-hover:italic group-hover:translate-x-4">
                        {link.label}
                      </span>
                      <span className="hidden sm:inline text-sm font-mono">
                        0{i + 1} — {link.note}
                      </span>
                    </Link>
                  </motion.div>
                </div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
