"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "./logo";
import { ArrowUpRight, Menu, X, Search } from "lucide-react";

const NAV_LINKS = [
  { href: "/", label: "Accueil" },
  { href: "/services", label: "Services & Tarifs" },
  { href: "/projets", label: "Réalisations" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const openCommandMenu = () => {
    window.dispatchEvent(
      new KeyboardEvent("keydown", { key: "k", metaKey: true })
    );
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-200 ${
        scrolled
          ? "bg-black/90 backdrop-blur-md border-b border-white/[0.08] py-3.5"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Left: Clean Brand Logo */}
        <Logo />

        {/* Center: Minimalist, breathable text navigation */}
        <nav
          className="hidden md:flex items-center gap-8"
          aria-label="Navigation principale"
        >
          {NAV_LINKS.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  isActive
                    ? "text-white font-bold"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right: Quick Search Cmd+K & Sleek CTA Button */}
        <div className="hidden md:flex items-center gap-3">
          <button
            type="button"
            onClick={openCommandMenu}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-zinc-900/80 hover:bg-zinc-800 border border-white/[0.08] hover:border-white/[0.2] text-xs text-zinc-400 hover:text-white transition-all cursor-pointer shadow-sm"
            aria-label="Recherche rapide (Cmd + K)"
          >
            <Search className="w-3.5 h-3.5" />
            <span className="font-mono text-[11px]">Recherche</span>
            <kbd className="px-1.5 py-0.5 rounded bg-black border border-white/[0.15] text-[10px] font-mono text-zinc-400">
              ⌘K
            </kbd>
          </button>

          <Link
            href="/contact"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider text-black bg-white hover:bg-zinc-200 transition-all duration-150 shadow-md active:scale-95"
          >
            <span>Devis Gratuit</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            type="button"
            onClick={openCommandMenu}
            className="p-2 text-zinc-400 hover:text-white rounded-lg bg-zinc-900 border border-white/[0.08]"
            aria-label="Recherche"
          >
            <Search className="w-4 h-4" />
          </button>
          <Link
            href="/contact"
            className="px-3.5 py-1.5 rounded-xl text-xs font-bold uppercase text-black bg-white"
          >
            Devis
          </Link>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-zinc-400 hover:text-white focus:outline-none cursor-pointer"
            aria-label="Menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-white/[0.08] bg-[#0c0d12] px-6 py-6 space-y-4 shadow-xl">
          <nav className="flex flex-col space-y-3">
            {NAV_LINKS.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-base font-medium py-1.5 flex items-center justify-between ${
                    isActive ? "text-white font-bold" : "text-zinc-400 hover:text-white"
                  }`}
                >
                  <span>{link.label}</span>
                  <ArrowUpRight className="w-4 h-4 text-zinc-500" />
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}
