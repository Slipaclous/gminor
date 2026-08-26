"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  X,
  ArrowRight,
  FolderGit2,
  Sparkles,
  Layers,
  HelpCircle,
  Mail,
  Copy,
  Check,
  Calendar,
  ExternalLink,
  Code2,
  Sliders,
} from "lucide-react";

interface CommandItem {
  id: string;
  title: string;
  category: "Navigation" | "Projets Réalisés" | "Actions Rapides";
  subtitle?: string;
  href?: string;
  action?: () => void;
  icon: React.ComponentType<{ className?: string }>;
}

const STATIC_COMMANDS: CommandItem[] = [
  // Navigation
  {
    id: "nav-home",
    title: "Accueil",
    category: "Navigation",
    subtitle: "Page principale du portfolio",
    href: "/",
    icon: Sparkles,
  },
  {
    id: "nav-projects",
    title: "Réalisations & Études de cas",
    category: "Navigation",
    subtitle: "Explorer tous les projets livrés",
    href: "/projets",
    icon: FolderGit2,
  },
  {
    id: "nav-services",
    title: "Services & Tarifs",
    category: "Navigation",
    subtitle: "Offres logicielles et simulateur de devis",
    href: "/services",
    icon: Sliders,
  },
  {
    id: "nav-faq",
    title: "Foire Aux Questions (FAQ)",
    category: "Navigation",
    subtitle: "Processus, délais, lien de staging et support",
    href: "/faq",
    icon: HelpCircle,
  },
  {
    id: "nav-contact",
    title: "Demander un devis / Contact",
    category: "Navigation",
    subtitle: "Formulaire direct avec réponse sous 24h",
    href: "/contact",
    icon: Mail,
  },

  // Projets clés
  {
    id: "proj-solera",
    title: "Solera Platform",
    category: "Projets Réalisés",
    subtitle: "Plateforme SaaS B2B • Next.js & PostgreSQL",
    href: "/projets/solera-platform",
    icon: Code2,
  },
  {
    id: "proj-rentabook",
    title: "Rent a Book",
    category: "Projets Réalisés",
    subtitle: "E-Commerce Scolaris • +90k commandes • PrestaShop",
    href: "/projets/rent-a-book",
    icon: Code2,
  },
  {
    id: "proj-volley",
    title: "Volley Club Enghien",
    category: "Projets Réalisés",
    subtitle: "Plateforme club & gestion d'inscriptions • Next.js",
    href: "/projets/vb-enghien",
    icon: Code2,
  },
  {
    id: "proj-villadolce",
    title: "Villa Dolce Gelateria",
    category: "Projets Réalisés",
    subtitle: "Site vitrine haute conversion • UI & SEO",
    href: "/projets/villa-dolce",
    icon: Code2,
  },
];

export function CommandMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  // Global Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (e.key === "Escape" && isOpen) {
        e.preventDefault();
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery("");
      setSelectedIndex(0);
    }
  }, [isOpen]);

  // Dynamic actions
  const allCommands: CommandItem[] = [
    ...STATIC_COMMANDS,
    {
      id: "act-copy-email",
      title: copiedEmail ? "Email copié dans le presse-papier !" : "Copier mon adresse email",
      category: "Actions Rapides",
      subtitle: "contact@gauthierminor.com",
      action: async () => {
        try {
          await navigator.clipboard.writeText("contact@gauthierminor.com");
          setCopiedEmail(true);
          setTimeout(() => {
            setCopiedEmail(false);
            setIsOpen(false);
          }, 1000);
        } catch (e) {
          console.error(e);
        }
      },
      icon: copiedEmail ? Check : Copy,
    },
    {
      id: "act-cal",
      title: "Prendre un rendez-vous direct (30 min)",
      category: "Actions Rapides",
      subtitle: "Échange visio gratuit pour cadrer votre projet",
      action: () => {
        window.open("https://cal.com", "_blank");
        setIsOpen(false);
      },
      icon: Calendar,
    },
  ];

  const filteredCommands = allCommands.filter((cmd) => {
    const q = query.toLowerCase().trim();
    if (!q) return true;
    return (
      cmd.title.toLowerCase().includes(q) ||
      (cmd.subtitle && cmd.subtitle.toLowerCase().includes(q)) ||
      cmd.category.toLowerCase().includes(q)
    );
  });

  const handleSelect = (item: CommandItem) => {
    if (item.action) {
      item.action();
    } else if (item.href) {
      setIsOpen(false);
      router.push(item.href);
    }
  };

  // Keyboard navigation within list
  const handleListKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredCommands.length));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % Math.max(1, filteredCommands.length));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const current = filteredCommands[selectedIndex];
      if (current) handleSelect(current);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[120] bg-black/80 backdrop-blur-md flex items-start justify-center p-4 pt-16 sm:pt-24 animate-in fade-in duration-150"
      onClick={() => setIsOpen(false)}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="w-full max-w-xl rounded-3xl bg-[#0e0f15] border border-white/[0.15] shadow-2xl overflow-hidden flex flex-col max-h-[80vh] animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleListKeyDown}
      >
        {/* Search Header */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-white/[0.08] bg-[#12131a]">
          <Search className="w-5 h-5 text-zinc-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Rechercher une page, un projet, une action..."
            className="w-full bg-transparent text-sm text-white placeholder:text-zinc-500 focus:outline-none font-sans"
          />
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="p-1 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="overflow-y-auto p-2 space-y-1 divide-y divide-white/[0.04] no-scrollbar">
          {filteredCommands.length === 0 ? (
            <div className="py-12 text-center text-xs text-zinc-500 font-mono">
              Aucun résultat trouvé pour &quot;{query}&quot;
            </div>
          ) : (
            filteredCommands.map((item, idx) => {
              const isSelected = selectedIndex === idx;
              const Icon = item.icon;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleSelect(item)}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`w-full p-3 rounded-2xl flex items-center justify-between gap-3 text-left transition-all cursor-pointer ${
                    isSelected
                      ? "bg-zinc-900 text-white border border-white/[0.12] shadow-sm"
                      : "text-zinc-300 hover:bg-zinc-900/50"
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`w-9 h-9 rounded-xl border flex items-center justify-center shrink-0 ${
                        isSelected
                          ? "bg-emerald-950/80 border-emerald-500/40 text-emerald-400"
                          : "bg-black border-white/[0.08] text-zinc-400"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs sm:text-sm font-semibold truncate text-white">
                          {item.title}
                        </span>
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400 hidden sm:inline-block">
                          {item.category}
                        </span>
                      </div>
                      {item.subtitle && (
                        <span className="text-[11px] text-zinc-400 truncate block font-normal">
                          {item.subtitle}
                        </span>
                      )}
                    </div>
                  </div>

                  <ArrowRight
                    className={`w-4 h-4 shrink-0 transition-transform ${
                      isSelected ? "text-emerald-400 translate-x-0.5" : "text-zinc-600 opacity-0"
                    }`}
                  />
                </button>
              );
            })
          )}
        </div>

        {/* Footer shortcuts helper */}
        <div className="px-5 py-3 bg-[#0a0a0d] border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-zinc-500">
          <div className="flex items-center gap-3">
            <span>↑↓ pour naviguer</span>
            <span>↵ pour ouvrir</span>
          </div>
          <span>Échap pour quitter</span>
        </div>
      </div>
    </div>
  );
}
