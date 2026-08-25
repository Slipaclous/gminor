"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/layout/logo";
import { logoutAdminAction } from "@/app/actions/auth";
import {
  LayoutDashboard,
  FolderGit2,
  Mail,
  PlusCircle,
  ExternalLink,
  LogOut,
  Sparkles,
} from "lucide-react";

const NAV_ITEMS = [
  {
    href: "/admin",
    label: "Tableau de bord",
    icon: LayoutDashboard,
    exact: true,
  },
  {
    href: "/admin/projets",
    label: "Gestion des Projets",
    icon: FolderGit2,
    exact: false,
  },
  {
    href: "/admin/contenu",
    label: "Contenus du Site",
    icon: Sparkles,
    exact: false,
  },
  {
    href: "/admin/messages",
    label: "Messages reçus",
    icon: Mail,
    exact: false,
  },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-zinc-950 border-r border-white/[0.08] flex flex-col justify-between p-5 min-h-screen shrink-0">
      <div className="space-y-8">
        {/* Brand & Admin Badge */}
        <div className="space-y-3">
          <Logo />
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-lg bg-zinc-900 border border-white/[0.08] text-[11px] font-mono text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>Panneau Administrateur</span>
          </div>
        </div>

        {/* Quick Action: New Project */}
        <div>
          <Link
            href="/admin/projets/nouveau"
            className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold uppercase tracking-wider bg-emerald-400 hover:bg-emerald-300 text-zinc-950 transition-colors shadow-md"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Nouveau Projet</span>
          </Link>
        </div>

        {/* Navigation Items */}
        <nav className="space-y-1">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500 px-3 block mb-2">
            Gestion
          </span>
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = item.exact
              ? pathname === item.href
              : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  isActive
                    ? "bg-zinc-800 text-white shadow-sm border border-white/[0.1]"
                    : "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-emerald-400" : "text-zinc-500"}`} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom links: View public site & Logout */}
      <div className="space-y-2 pt-6 border-t border-white/[0.08]">
        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-semibold text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors"
        >
          <span className="flex items-center gap-2">
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Voir le site public</span>
          </span>
        </Link>

        <form action={logoutAdminAction}>
          <button
            type="submit"
            className="w-full flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold text-red-400 hover:text-red-300 hover:bg-red-950/30 transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Se déconnecter</span>
          </button>
        </form>
      </div>
    </aside>
  );
}
