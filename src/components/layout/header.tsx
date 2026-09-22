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

  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setMobileMenuOpen(false);
  }

  const openCommandMenu = () => {
    window.dispatchEvent(
      new KeyboardEvent("keydown", { key: "k", metaKey: true })
    );
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-200 ${
        scrolled
          ? "bg-[#fafaf8]/90 backdrop-blur-md border-b border-[#e6e6df] shadow-xs py-3.5"
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
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className={`text-sm font-medium transition-colors ${
                  isActive
                    ? "text-[#18191f] font-bold"
                    : "text-[#555765] hover:text-[#18191f]"
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
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white hover:bg-[#f4f4f0] border border-[#e6e6df] text-xs text-[#555765] hover:text-[#18191f] transition-all cursor-pointer shadow-xs"
            aria-label="Recherche rapide (Cmd + K)"
          >
            <Search className="w-3.5 h-3.5 text-zinc-400" />
            <span className="text-[11px] font-medium">Recherche</span>
            <kbd className="px-1.5 py-0.5 rounded bg-[#f4f4f0] border border-[#e6e6df] text-[10px] font-mono text-[#7c7e8c]">
              ⌘K
            </kbd>
          </button>

          <Link
            href="/contact"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider bg-[#18191f] text-white hover:bg-[#2d2e38] transition-colors shadow-sm active:scale-95 cursor-pointer"
          >
            <span>Devis sous 24h</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-emerald-400" />
          </Link>
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            type="button"
            onClick={openCommandMenu}
            className="p-2 text-[#555765] hover:text-[#18191f] rounded-xl bg-white border border-[#e6e6df] active:scale-95 transition-all shadow-xs"
            aria-label="Recherche"
          >
            <Search className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#18191f] rounded-xl bg-white border border-[#e6e6df] active:scale-95 transition-all cursor-pointer shadow-xs"
            aria-label="Menu"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5 text-[#18191f]" />
            ) : (
              <Menu className="w-5 h-5 text-[#18191f]" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#e6e6df] bg-white/98 backdrop-blur-xl px-5 py-6 space-y-5 shadow-xl animate-in slide-in-from-top-3 duration-200">
          <nav className="flex flex-col space-y-1">
            {NAV_LINKS.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => {
                    setMobileMenuOpen(false);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className={`text-base font-semibold py-3 px-4 rounded-xl flex items-center justify-between transition-all ${
                    isActive
                      ? "bg-[#f4f4f0] text-[#18191f] font-bold border border-[#e6e6df]"
                      : "text-[#555765] hover:text-[#18191f] hover:bg-[#fafaf8]"
                  }`}
                >
                  <span>{link.label}</span>
                  <ArrowUpRight className={`w-4 h-4 ${isActive ? "text-emerald-600" : "text-zinc-400"}`} />
                </Link>
              );
            })}
          </nav>

          <div className="pt-3 border-t border-[#e6e6df] flex items-center justify-between gap-3">
            <Link
              href="/contact"
              onClick={() => {
                setMobileMenuOpen(false);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider bg-[#18191f] text-white shadow-md"
            >
              <span>Demander un devis gratuit</span>
              <ArrowUpRight className="w-4 h-4 text-emerald-400" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
