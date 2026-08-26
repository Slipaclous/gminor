import React from "react";
import Link from "next/link";
import { verifyAdminSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getDbProjects } from "@/lib/projects-service";
import { prisma } from "@/lib/prisma";
import { DeleteMessageButton } from "@/components/admin/delete-message-button";
import {
  FolderGit2,
  Sparkles,
  Mail,
  PlusCircle,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  TrendingUp,
  ShieldCheck,
  Server,
  Layers,
  DollarSign,
  Activity,
  ExternalLink,
} from "lucide-react";

export default async function AdminDashboardPage() {
  const isAuth = await verifyAdminSession();
  if (!isAuth) {
    redirect("/admin/login");
  }

  const projects = await getDbProjects();
  const featuredProjects = projects.filter((p) => p.featured);

  let messages: Array<{
    id: string;
    name: string;
    email: string;
    company: string | null;
    budget: string | null;
    service: string | null;
    message: string;
    status: "UNREAD" | "READ" | "ARCHIVED";
    createdAt: Date;
  }> = [];

  try {
    if (process.env.DATABASE_URL && !process.env.DATABASE_URL.includes("localhost:5432")) {
      messages = await prisma.contactMessage.findMany({
        orderBy: { createdAt: "desc" },
      });
    }
  } catch (err) {
    console.warn("DB messages fetch fallback:", err);
  }

  const totalMessages = messages.length;
  const unreadMessages = messages.filter((m) => m.status === "UNREAD");

  // Analytics: Service breakdown
  const serviceCounts: Record<string, number> = {};
  const budgetCounts: Record<string, number> = {};

  messages.forEach((m) => {
    const s = m.service || "Non spécifié";
    serviceCounts[s] = (serviceCounts[s] || 0) + 1;

    const b = m.budget || "Non spécifié";
    budgetCounts[b] = (budgetCounts[b] || 0) + 1;
  });

  // Top tech stacks across projects
  const techCounts: Record<string, number> = {};
  projects.forEach((p) => {
    p.techStack.forEach((t) => {
      techCounts[t] = (techCounts[t] || 0) + 1;
    });
  });

  const sortedTechs = Object.entries(techCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 8);

  const topService = Object.entries(serviceCounts).sort(([, a], [, b]) => b - a)[0];

  return (
    <div className="p-6 sm:p-10 space-y-10 max-w-6xl">
      {/* Top Welcome Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Tableau de bord Administrateur
            </h1>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-950/80 text-emerald-400 border border-emerald-500/30 font-semibold">
              Live Production
            </span>
          </div>
          <p className="text-sm text-zinc-400">
            Vue d&apos;ensemble de l&apos;activité commerciale, des demandes entrantes et du catalogue de réalisations.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/"
            target="_blank"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-zinc-300 bg-zinc-900 border border-white/[0.1] hover:text-white hover:border-white/[0.25] transition-colors shadow-sm"
          >
            <span>Voir le site</span>
            <ExternalLink className="w-3.5 h-3.5 text-zinc-400" />
          </Link>

          <Link
            href="/admin/projets/nouveau"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-zinc-950 bg-emerald-400 hover:bg-emerald-300 transition-colors shadow-md shrink-0 active:scale-95"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Ajouter un projet</span>
          </Link>
        </div>
      </div>

      {/* 4 Main KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Messages */}
        <div className="p-6 rounded-3xl bg-[#0d0e14] border border-white/[0.1] space-y-3 relative overflow-hidden shadow-xl">
          <div className="flex items-center justify-between text-zinc-400">
            <span className="text-[11px] font-mono font-semibold uppercase tracking-wider">
              Demandes Reçues
            </span>
            <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-white/[0.08] flex items-center justify-center text-emerald-400">
              <Mail className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-white font-mono">
              {totalMessages}
            </span>
            {unreadMessages.length > 0 && (
              <span className="text-xs font-semibold font-mono text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded-md border border-emerald-500/30">
                {unreadMessages.length} non lu{unreadMessages.length > 1 ? "s" : ""}
              </span>
            )}
          </div>
          <span className="text-xs text-zinc-400 block">
            Formulaires et estimations reçus
          </span>
        </div>

        {/* Projects */}
        <div className="p-6 rounded-3xl bg-[#0d0e14] border border-white/[0.1] space-y-3 relative overflow-hidden shadow-xl">
          <div className="flex items-center justify-between text-zinc-400">
            <span className="text-[11px] font-mono font-semibold uppercase tracking-wider">
              Projets en Ligne
            </span>
            <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-white/[0.08] flex items-center justify-center text-emerald-400">
              <FolderGit2 className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-white font-mono">
              {projects.length}
            </span>
            <span className="text-xs font-semibold font-mono text-zinc-400">
              ({featuredProjects.length} à la une)
            </span>
          </div>
          <span className="text-xs text-zinc-400 block">
            Cas d&apos;études documentés
          </span>
        </div>

        {/* Top Demanded Service */}
        <div className="p-6 rounded-3xl bg-[#0d0e14] border border-white/[0.1] space-y-3 relative overflow-hidden shadow-xl">
          <div className="flex items-center justify-between text-zinc-400">
            <span className="text-[11px] font-mono font-semibold uppercase tracking-wider">
              Service Phare
            </span>
            <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-white/[0.08] flex items-center justify-center text-emerald-400">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-lg font-bold text-white truncate">
            {topService ? topService[0] : "Applications SaaS"}
          </div>
          <span className="text-xs text-zinc-400 block truncate">
            {topService ? `${topService[1]} demande(s) enregistrée(s)` : "Catégorie la plus sollicitée"}
          </span>
        </div>

        {/* System Health */}
        <div className="p-6 rounded-3xl bg-[#0d0e14] border border-white/[0.1] space-y-3 relative overflow-hidden shadow-xl">
          <div className="flex items-center justify-between text-zinc-400">
            <span className="text-[11px] font-mono font-semibold uppercase tracking-wider">
              Santé Système
            </span>
            <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-white/[0.08] flex items-center justify-center text-emerald-400">
              <Activity className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-lg font-extrabold text-emerald-400 font-mono">
              100% Opérationnel
            </span>
          </div>
          <span className="text-xs text-zinc-400 block">
            DB Neon • Vercel Europe • Resend
          </span>
        </div>
      </div>

      {/* Breakdown Stats Grid (Services, Budgets, Stacks) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Demandes par Service & Budget (7 cols) */}
        <div className="lg:col-span-7 space-y-8">
          {/* Services breakdown card */}
          <div className="rounded-3xl bg-[#0d0e14] border border-white/[0.1] p-6 sm:p-7 space-y-6 shadow-xl">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <h2 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
                  <Layers className="w-4 h-4 text-emerald-400" />
                  <span>Répartition des Demandes par Service</span>
                </h2>
                <p className="text-xs text-zinc-400">
                  Volume de prospects selon les prestations sélectionnées
                </p>
              </div>
              <span className="text-xs font-mono text-zinc-500">
                Total : {totalMessages}
              </span>
            </div>

            {totalMessages === 0 ? (
              <div className="py-8 text-center text-xs font-mono text-zinc-500">
                Aucun message reçu pour le moment. Les statistiques s&apos;afficheront automatiquement ici.
              </div>
            ) : (
              <div className="space-y-4">
                {Object.entries(serviceCounts).map(([svc, count]) => {
                  const percentage = Math.round((count / totalMessages) * 100);
                  return (
                    <div key={svc} className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-zinc-200">{svc}</span>
                        <span className="font-mono text-zinc-400">
                          {count} ({percentage}%)
                        </span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-zinc-800 overflow-hidden">
                        <div
                          className="h-full bg-emerald-400 rounded-full transition-all duration-500"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Budget distribution card */}
          <div className="rounded-3xl bg-[#0d0e14] border border-white/[0.1] p-6 sm:p-7 space-y-6 shadow-xl">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <h2 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-emerald-400" />
                  <span>Répartition par Tranches Budgétaires</span>
                </h2>
                <p className="text-xs text-zinc-400">
                  Enveloppes indiquées par les clients lors de la prise de contact
                </p>
              </div>
            </div>

            {totalMessages === 0 ? (
              <div className="py-8 text-center text-xs font-mono text-zinc-500">
                En attente des premières demandes clients.
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {Object.entries(budgetCounts).map(([budget, count]) => (
                  <div
                    key={budget}
                    className="p-3.5 rounded-2xl bg-black/60 border border-white/[0.08] space-y-1"
                  >
                    <span className="text-[10px] font-mono text-zinc-400 block truncate">
                      {budget}
                    </span>
                    <span className="text-lg font-extrabold text-white font-mono block">
                      {count}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right: Technologies & System Status (5 cols) */}
        <div className="lg:col-span-5 space-y-8">
          {/* Tech Stack Distribution */}
          <div className="rounded-3xl bg-[#0d0e14] border border-white/[0.1] p-6 sm:p-7 space-y-6 shadow-xl">
            <div className="space-y-0.5">
              <h2 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span>Technologies Maîtresses (Portfolio)</span>
              </h2>
              <p className="text-xs text-zinc-400">
                Nombre de projets exploitant chaque techno
              </p>
            </div>

            <div className="flex flex-wrap gap-2 pt-1">
              {sortedTechs.map(([tech, count]) => (
                <div
                  key={tech}
                  className="px-3 py-1.5 rounded-xl bg-zinc-900 border border-white/[0.08] text-xs font-mono flex items-center gap-2 text-zinc-200"
                >
                  <span>{tech}</span>
                  <span className="px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-400 text-[10px] font-bold">
                    {count}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Infrastructure Health Status */}
          <div className="rounded-3xl bg-[#0d0e14] border border-white/[0.1] p-6 sm:p-7 space-y-5 shadow-xl">
            <div className="space-y-0.5">
              <h2 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
                <Server className="w-4 h-4 text-emerald-400" />
                <span>État de l&apos;Infrastructure Cloud</span>
              </h2>
              <p className="text-xs text-zinc-400">
                Services connectés et latence de production
              </p>
            </div>

            <div className="space-y-3 pt-1 text-xs">
              <div className="p-3 rounded-2xl bg-black/60 border border-white/[0.06] flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span className="text-zinc-200 font-semibold">PostgreSQL (Neon)</span>
                </div>
                <span className="font-mono text-zinc-400 text-[11px]">eu-central-1 (0-5ms)</span>
              </div>

              <div className="p-3 rounded-2xl bg-black/60 border border-white/[0.06] flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span className="text-zinc-200 font-semibold">Vercel Edge &amp; Functions</span>
                </div>
                <span className="font-mono text-zinc-400 text-[11px]">fra1 / cdg1</span>
              </div>

              <div className="p-3 rounded-2xl bg-black/60 border border-white/[0.06] flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span className="text-zinc-200 font-semibold">Notifications Resend</span>
                </div>
                <span className="font-mono text-emerald-400 text-[11px]">Connecté</span>
              </div>

              <div className="p-3 rounded-2xl bg-black/60 border border-white/[0.06] flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span className="text-zinc-200 font-semibold">Google reCAPTCHA v3</span>
                </div>
                <span className="font-mono text-emerald-400 text-[11px]">Actif</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Messages Section */}
      <div className="rounded-3xl bg-[#0d0e14] border border-white/[0.1] p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
              <Mail className="w-5 h-5 text-emerald-400" />
              <span>Dernières Demandes de Contact Reçues</span>
            </h2>
            <p className="text-xs text-zinc-400">
              Messages soumis via le formulaire ou l&apos;estimateur
            </p>
          </div>

          <Link
            href="/admin/messages"
            className="text-xs font-bold text-emerald-400 hover:underline flex items-center gap-1"
          >
            <span>Gérer tous les messages ({totalMessages})</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {messages.length === 0 ? (
          <div className="py-10 text-center text-xs font-mono text-zinc-500">
            Aucun message reçu pour le moment.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="text-xs uppercase text-zinc-400 border-b border-white/[0.08] font-mono">
                <tr>
                  <th className="pb-3 font-semibold">Date</th>
                  <th className="pb-3 font-semibold">Expéditeur</th>
                  <th className="pb-3 font-semibold">Service Demandé</th>
                  <th className="pb-3 font-semibold">Budget</th>
                  <th className="pb-3 font-semibold">Statut</th>
                  <th className="pb-3 font-semibold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.06]">
                {messages.slice(0, 5).map((m) => (
                  <tr key={m.id} className="group hover:bg-zinc-800/40 transition-colors">
                    <td className="py-4 text-xs font-mono text-zinc-400 whitespace-nowrap">
                      {new Date(m.createdAt).toLocaleDateString("fr-FR", {
                        day: "2-digit",
                        month: "short",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                    <td className="py-4">
                      <div className="font-bold text-white">{m.name}</div>
                      <div className="text-xs text-zinc-400">{m.email}</div>
                    </td>
                    <td className="py-4 text-xs text-zinc-300">
                      {m.service || "—"}
                    </td>
                    <td className="py-4 text-xs font-mono text-zinc-300">
                      {m.budget || "—"}
                    </td>
                    <td className="py-4">
                      {m.status === "UNREAD" ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-[10px] font-bold text-emerald-400 font-mono">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          <span>NOUVEAU</span>
                        </span>
                      ) : (
                        <span className="text-xs font-mono text-zinc-500">Traité</span>
                      )}
                    </td>
                    <td className="py-4 text-right">
                      <div className="inline-flex items-center justify-end gap-2">
                        <a
                          href={`mailto:${m.email}?subject=${encodeURIComponent(`Suite à votre demande sur G-Minor (${m.service || "Projet"})`)}`}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs font-semibold text-white transition-colors"
                        >
                          <span>Répondre</span>
                        </a>
                        <DeleteMessageButton messageId={m.id} senderName={m.name} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Recent Projects Table Overview */}
      <div className="rounded-3xl bg-[#0d0e14] border border-white/[0.1] p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
              <FolderGit2 className="w-5 h-5 text-emerald-400" />
              <span>Projets Récents dans le Portfolio</span>
            </h2>
            <p className="text-xs text-zinc-400">
              Aperçu des derniers projets enregistrés dans votre portfolio
            </p>
          </div>

          <Link
            href="/admin/projets"
            className="text-xs font-bold text-emerald-400 hover:underline flex items-center gap-1"
          >
            <span>Voir toute la liste ({projects.length})</span>
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
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-950/70 border border-emerald-500/30 text-[11px] font-semibold text-emerald-400 font-mono">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>En avant</span>
                      </span>
                    ) : (
                      <span className="text-xs text-zinc-500 font-mono">—</span>
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
