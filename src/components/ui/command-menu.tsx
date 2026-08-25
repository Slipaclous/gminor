"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "./toast";
import {
  Search,
  ArrowRight,
  FolderGit2,
  Sparkles,
  Calculator,
  HelpCircle,
  Mail,
  Copy,
  Terminal,
  X,
  ExternalLink,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./icons";

interface CommandItem {
  id: string;
  title: string;
  subtitle?: string;
  category: "Navigation" | "Projets" | "Actions";
  icon: React.ComponentType<{ className?: string }>;
  perform: () => void;
  shortcut?: string;
}

export function CommandMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();
  const { success } = useToast();
  const inputRef = useRef<HTMLInputElement>(null);

  const close = useCallback(() => {
    setIsOpen(false);
    setSearch("");
    setSelectedIndex(0);
  }, []);

  const copyEmail = useCallback(() => {
    navigator.clipboard.writeText("contact@gauthierminor.dev");
    success("Email contact@gauthierminor.dev copié !");
    close();
  }, [success, close]);

  const COMMANDS: CommandItem[] = [
    // Navigation
    {
      id: "nav-home",
      title: "Accueil",
      subtitle: "Page principale & architecture",
      category: "Navigation",
      icon: Terminal,
      perform: () => {
        router.push("/");
        close();
      },
    },
    {
      id: "nav-services",
      title: "Services & Tarifs",
      subtitle: "Offres vitrines, SaaS et audit",
      category: "Navigation",
      icon: Sparkles,
      perform: () => {
        router.push("/services");
        close();
      },
    },
    {
      id: "nav-projects",
      title: "Réalisations & Projets",
      subtitle: "Études de cas complètes",
      category: "Navigation",
      icon: FolderGit2,
      perform: () => {
        router.push("/projets");
        close();
      },
    },
    {
      id: "nav-faq",
      title: "Foire Aux Questions (FAQ)",
      subtitle: "Questions fréquentes & garanties",
      category: "Navigation",
      icon: HelpCircle,
      perform: () => {
        router.push("/faq");
        close();
      },
    },
    {
      id: "nav-contact",
      title: "Contact & Devis",
      subtitle: "Discuter d'un projet en direct",
      category: "Navigation",
      icon: Mail,
      perform: () => {
        router.push("/contact");
        close();
      },
    },

    // Projets Phares Réels
    {
      id: "proj-solera",
      title: "Solera Platform",
      subtitle: "Plateforme SaaS de gestion d'écoles & étudiants",
      category: "Projets",
      icon: FolderGit2,
      perform: () => {
        router.push("/projets/solera-platform");
        close();
      },
    },
    {
      id: "proj-rentabook",
      title: "Rent a Book / Scolaris",
      subtitle: "E-Commerce à fort trafic & Migration PrestaShop 9",
      category: "Projets",
      icon: FolderGit2,
      perform: () => {
        router.push("/projets/rent-a-book");
        close();
      },
    },
    {
      id: "proj-amarea",
      title: "Amarea Wedding",
      subtitle: "Site vitrine dynamique & CMS Next.js / Prisma",
      category: "Projets",
      icon: FolderGit2,
      perform: () => {
        router.push("/projets/amarea");
        close();
      },
    },
    {
      id: "proj-mgevents",
      title: "MgEvents",
      subtitle: "Concepteur SaaS multi-tenant d'invitations",
      category: "Projets",
      icon: FolderGit2,
      perform: () => {
        router.push("/projets/mgevents");
        close();
      },
    },
    {
      id: "proj-focale28",
      title: "Focale 2.8",
      subtitle: "Site portfolio sombre pour photographe d'art",
      category: "Projets",
      icon: FolderGit2,
      perform: () => {
        router.push("/projets/focale-28");
        close();
      },
    },

    // Actions
    {
      id: "act-copy-email",
      title: "Copier l'adresse email",
      subtitle: "contact@gauthierminor.dev",
      category: "Actions",
      icon: Copy,
      shortcut: "⌘C",
      perform: copyEmail,
    },
    {
      id: "act-estimator",
      title: "Lancer le simulateur de devis",
      subtitle: "Calculer son budget et ses délais en direct",
      category: "Actions",
      icon: Calculator,
      perform: () => {
        router.push("/services");
        close();
      },
    },
    {
      id: "act-github",
      title: "Ouvrir GitHub",
      subtitle: "Explorer les repositories open-source",
      category: "Actions",
      icon: GithubIcon,
      perform: () => {
        window.open("https://github.com", "_blank");
        close();
      },
    },
    {
      id: "act-linkedin",
      title: "Ouvrir LinkedIn",
      subtitle: "Consulter le profil professionnel",
      category: "Actions",
      icon: LinkedinIcon,
      perform: () => {
        window.open("https://linkedin.com", "_blank");
        close();
      },
    },
  ];

  const filteredCommands = COMMANDS.filter((cmd) => {
    const q = search.toLowerCase().trim();
    if (!q) return true;
    return (
      cmd.title.toLowerCase().includes(q) ||
      (cmd.subtitle && cmd.subtitle.toLowerCase().includes(q)) ||
      cmd.category.toLowerCase().includes(q)
    );
  });

  // Toggle on Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (e.key === "Escape" && isOpen) {
        e.preventDefault();
        close();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, close]);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Keyboard navigation
  const handleInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev < filteredCommands.length - 1 ? prev + 1 : 0
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev > 0 ? prev - 1 : filteredCommands.length - 1
      );
    } else if (e.key === "Enter") {
      e.preventDefault();
      const current = filteredCommands[selectedIndex];
      if (current) {
        current.perform();
      }
    }
  };

  return (
    <>
      {/* Floating or Header Trigger Helper Button */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-900/80 hover:bg-zinc-800 border border-white/[0.08] hover:border-white/[0.2] text-xs text-zinc-400 hover:text-white transition-all cursor-pointer shadow-sm"
        aria-label="Recherche rapide (Cmd + K)"
      >
        <Search className="w-3.5 h-3.5" />
        <span className="font-mono text-[11px]">Recherche</span>
        <kbd className="px-1.5 py-0.5 rounded bg-black border border-white/[0.15] text-[10px] font-mono text-zinc-400">
          ⌘K
        </kbd>
      </button>

      {/* Backdrop & Modal */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[150] flex items-start justify-center pt-16 sm:pt-28 px-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-150"
          onClick={close}
        >
          <div
            className="relative w-full max-w-xl rounded-2xl bg-[#0c0d12] border border-white/[0.15] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Search Input Bar */}
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/[0.08] bg-[#111218]">
              <Search className="w-4 h-4 text-zinc-400 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setSelectedIndex(0);
                }}
                onKeyDown={handleInputKeyDown}
                placeholder="Tapez une commande ou cherchez un projet..."
                className="w-full bg-transparent text-sm text-white placeholder-zinc-500 focus:outline-none font-sans"
              />
              <button
                type="button"
                onClick={close}
                className="p-1 text-zinc-500 hover:text-white rounded-md transition-colors cursor-pointer"
              >
                <kbd className="px-1.5 py-0.5 rounded bg-zinc-900 border border-white/[0.1] text-[10px] font-mono text-zinc-400">
                  ESC
                </kbd>
              </button>
            </div>

            {/* Results List */}
            <div className="max-h-[360px] overflow-y-auto p-2 space-y-1">
              {filteredCommands.length > 0 ? (
                filteredCommands.map((cmd, idx) => {
                  const isSelected = selectedIndex === idx;
                  const Icon = cmd.icon;

                  return (
                    <div
                      key={cmd.id}
                      onClick={() => cmd.perform()}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={`flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl text-xs transition-all cursor-pointer ${
                        isSelected
                          ? "bg-zinc-800 text-white font-semibold"
                          : "text-zinc-300 hover:bg-zinc-900"
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div
                          className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 border ${
                            isSelected
                              ? "bg-white text-black border-white"
                              : "bg-zinc-900 text-zinc-400 border-white/[0.06]"
                          }`}
                        >
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <div className="min-w-0">
                          <div className="truncate font-medium">{cmd.title}</div>
                          {cmd.subtitle && (
                            <div className="text-[11px] text-zinc-400 truncate">
                              {cmd.subtitle}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-[10px] font-mono text-zinc-500 uppercase px-1.5 py-0.5 rounded bg-zinc-900/60 border border-white/[0.04]">
                          {cmd.category}
                        </span>
                        {isSelected && (
                          <ArrowRight className="w-3.5 h-3.5 text-emerald-400" />
                        )}
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="py-10 text-center text-xs text-zinc-500">
                  Aucun résultat trouvé pour &quot;{search}&quot;
                </div>
              )}
            </div>

            {/* Command Footer Hints */}
            <div className="px-4 py-2.5 bg-[#08080a] border-t border-white/[0.06] flex items-center justify-between text-[11px] text-zinc-500 font-mono">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <kbd className="px-1 py-0.5 rounded bg-zinc-900 border border-white/[0.1]">↑↓</kbd> Naviguer
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1 py-0.5 rounded bg-zinc-900 border border-white/[0.1]">↵</kbd> Ouvrir
                </span>
              </div>
              <span className="text-zinc-600">Gauthier Minor</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
