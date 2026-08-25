import React from "react";
import Link from "next/link";
import { verifyAdminSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getDbProjects } from "@/lib/projects-service";
import { FeaturedToggleButton } from "@/components/admin/featured-toggle-button";
import { DeleteProjectButton } from "@/components/admin/delete-project-button";
import {
  FolderGit2,
  PlusCircle,
  Edit,
  ExternalLink,
  Search,
  CheckCircle2,
} from "lucide-react";

export default async function AdminProjectsPage() {
  const isAuth = await verifyAdminSession();
  if (!isAuth) {
    redirect("/admin/login");
  }

  const projects = await getDbProjects();

  return (
    <div className="p-6 sm:p-10 space-y-8 max-w-6xl">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Gestion des Projets ({projects.length})
          </h1>
          <p className="text-sm text-zinc-400">
            Ajoutez, modifiez ou retirez vos réalisations et études de cas
          </p>
        </div>

        <Link
          href="/admin/projets/nouveau"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-zinc-950 bg-emerald-400 hover:bg-emerald-300 transition-colors shadow-md shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Nouveau Projet</span>
        </Link>
      </div>

      {/* Projects Table Card */}
      <div className="rounded-3xl bg-zinc-900/80 border border-white/[0.1] p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="text-xs uppercase text-zinc-400 border-b border-white/[0.08] font-mono">
              <tr>
                <th className="pb-3.5 font-semibold">Titre & Accroche</th>
                <th className="pb-3.5 font-semibold">Catégorie</th>
                <th className="pb-3.5 font-semibold">Client / Année</th>
                <th className="pb-3.5 font-semibold">Mise en avant</th>
                <th className="pb-3.5 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.06]">
              {projects.map((project) => (
                <tr key={project.id} className="group hover:bg-zinc-800/40 transition-colors">
                  {/* Title & Tagline */}
                  <td className="py-4 pr-4">
                    <div className="font-bold text-white group-hover:text-emerald-400 transition-colors flex items-center gap-2">
                      <span>{project.title}</span>
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-zinc-500 hover:text-emerald-400"
                          title="Voir le site en ligne"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                    <p className="text-xs text-zinc-400 line-clamp-1 max-w-sm">
                      {project.tagline}
                    </p>
                  </td>

                  {/* Category */}
                  <td className="py-4 pr-4">
                    <span className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-zinc-800 border border-white/[0.08] text-zinc-200">
                      {project.categoryLabel}
                    </span>
                  </td>

                  {/* Client / Year */}
                  <td className="py-4 pr-4 text-xs text-zinc-300">
                    <div>{project.client || "Personnel"}</div>
                    <span className="text-zinc-500 font-mono">{project.year}</span>
                  </td>

                  {/* Featured toggle */}
                  <td className="py-4 pr-4">
                    <FeaturedToggleButton
                      id={project.id}
                      featured={project.featured}
                    />
                  </td>

                  {/* Actions */}
                  <td className="py-4 text-right space-x-1 whitespace-nowrap">
                    <Link
                      href={`/projets/${project.slug}`}
                      target="_blank"
                      className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 inline-block transition-colors"
                      title="Voir la page publique"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </Link>

                    <Link
                      href={`/admin/projets/${project.id}`}
                      className="p-2 rounded-lg text-zinc-400 hover:text-emerald-400 hover:bg-zinc-800 inline-block transition-colors"
                      title="Modifier ce projet"
                    >
                      <Edit className="w-4 h-4" />
                    </Link>

                    <DeleteProjectButton id={project.id} title={project.title} />
                  </td>
                </tr>
              ))}

              {projects.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-zinc-400">
                    Aucun projet pour le moment. Cliquez sur &quot;Nouveau Projet&quot; pour en créer un.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
