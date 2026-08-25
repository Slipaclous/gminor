import React from "react";
import Link from "next/link";
import { verifyAdminSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getDbProjects } from "@/lib/projects-service";
import { prisma } from "@/lib/prisma";
import {
  FolderGit2,
  Sparkles,
  Mail,
  PlusCircle,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  Eye,
} from "lucide-react";

export default async function AdminDashboardPage() {
  const isAuth = await verifyAdminSession();
  if (!isAuth) {
    redirect("/admin/login");
  }

  const projects = await getDbProjects();
  const featuredProjects = projects.filter((p) => p.featured);

  let messageCount = 0;
  let unreadMessageCount = 0;
  try {
    if (process.env.DATABASE_URL && !process.env.DATABASE_URL.includes("localhost:5432")) {
      messageCount = await prisma.contactMessage.count();
      unreadMessageCount = await prisma.contactMessage.count({
        where: { status: "UNREAD" },
      });
    }
  } catch (err) {
    console.warn("DB messages count fallback:", err);
  }

  return (
    <div className="p-6 sm:p-10 space-y-10 max-w-6xl">
      {/* Top Welcome Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Tableau de bord Administrateur
          </h1>
          <p className="text-sm text-zinc-400">
            Bienvenue Gauthier. Gérez vos projets et suivez l&apos;activité de votre portfolio.
          </p>
        </div>

        <Link
          href="/admin/projets/nouveau"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-zinc-950 bg-emerald-400 hover:bg-emerald-300 transition-colors shadow-md shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Ajouter un projet</span>
        </Link>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="p-6 rounded-3xl bg-zinc-900/90 border border-white/[0.1] space-y-3">
          <div className="flex items-center justify-between text-zinc-400">
            <span className="text-xs font-semibold uppercase tracking-wider">
              Total Projets
            </span>
            <FolderGit2 className="w-5 h-5 text-emerald-400" />
          </div>
          <div className="text-3xl font-extrabold text-white">
            {projects.length}
          </div>
          <span className="text-xs text-zinc-400 block">
            {featuredProjects.length} mis en avant sur la page d&apos;accueil
          </span>
        </div>

        <div className="p-6 rounded-3xl bg-zinc-900/90 border border-white/[0.1] space-y-3">
          <div className="flex items-center justify-between text-zinc-400">
            <span className="text-xs font-semibold uppercase tracking-wider">
              Projets à la une
            </span>
            <Sparkles className="w-5 h-5 text-emerald-400" />
          </div>
          <div className="text-3xl font-extrabold text-emerald-400">
            {featuredProjects.length}
          </div>
          <span className="text-xs text-zinc-400 block">
            Visibles immédiatement dans le bento grid
          </span>
        </div>

        <div className="p-6 rounded-3xl bg-zinc-900/90 border border-white/[0.1] space-y-3">
          <div className="flex items-center justify-between text-zinc-400">
            <span className="text-xs font-semibold uppercase tracking-wider">
              Messages Reçus
            </span>
            <Mail className="w-5 h-5 text-emerald-400" />
          </div>
          <div className="text-3xl font-extrabold text-white">
            {messageCount}
          </div>
          <span className="text-xs text-zinc-400 block">
            {unreadMessageCount} non lus à traiter
          </span>
        </div>
      </div>

      {/* Recent Projects Table Overview */}
      <div className="rounded-3xl bg-zinc-900/80 border border-white/[0.1] p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-white tracking-tight">
              Projets récents
            </h2>
            <p className="text-xs text-zinc-400">
              Aperçu des derniers projets enregistrés dans votre portfolio
            </p>
          </div>

          <Link
            href="/admin/projets"
            className="text-xs font-bold text-emerald-400 hover:underline flex items-center gap-1"
          >
            <span>Voir toute la liste</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="text-xs uppercase text-zinc-400 border-b border-white/[0.08] font-mono">
              <tr>
                <th className="pb-3 font-semibold">Titre & Catégorie</th>
                <th className="pb-3 font-semibold">Client / Année</th>
                <th className="pb-3 font-semibold">À la une</th>
                <th className="pb-3 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.06]">
              {projects.slice(0, 5).map((project) => (
                <tr key={project.id} className="group hover:bg-zinc-800/40 transition-colors">
                  <td className="py-4">
                    <div className="font-bold text-white group-hover:text-emerald-400 transition-colors">
                      {project.title}
                    </div>
                    <span className="text-xs text-zinc-400">
                      {project.categoryLabel}
                    </span>
                  </td>
                  <td className="py-4 text-xs text-zinc-300">
                    <div>{project.client || "Personnel"}</div>
                    <span className="text-zinc-500 font-mono">{project.year}</span>
                  </td>
                  <td className="py-4">
                    {project.featured ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-950/70 border border-emerald-500/30 text-[11px] font-semibold text-emerald-400">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>En avant</span>
                      </span>
                    ) : (
                      <span className="text-xs text-zinc-500">—</span>
                    )}
                  </td>
                  <td className="py-4 text-right">
                    <Link
                      href={`/admin/projets/${project.id}`}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs font-semibold text-white transition-colors"
                    >
                      <span>Modifier</span>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
