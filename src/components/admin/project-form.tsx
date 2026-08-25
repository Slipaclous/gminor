"use client";

import React, { useActionState, useState } from "react";
import {
  createProjectAction,
  updateProjectAction,
  ProjectFormState,
} from "@/app/actions/projects";
import { ProjectItem } from "@/data/projects";
import Link from "next/link";
import { ImageUpload } from "./image-upload";
import {
  Save,
  ArrowLeft,
  Loader2,
  Sparkles,
  ExternalLink,
  Globe,
  Layers,
  Target,
  Lightbulb,
} from "lucide-react";

interface ProjectFormProps {
  initialData?: ProjectItem | null;
  isEdit?: boolean;
}

export function ProjectForm({ initialData, isEdit = false }: ProjectFormProps) {
  const actionToRun = isEdit && initialData
    ? updateProjectAction.bind(null, initialData.id)
    : createProjectAction;

  const [state, formAction, isPending] = useActionState<ProjectFormState | null, FormData>(
    actionToRun,
    null
  );

  const [title, setTitle] = useState(initialData?.title || "");
  const [slug, setSlug] = useState(initialData?.slug || "");
  const [featured, setFeatured] = useState(initialData?.featured || false);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setTitle(val);
    if (!isEdit) {
      const generated = val
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");
      setSlug(generated);
    }
  };

  return (
    <form action={formAction} className="space-y-10 max-w-4xl">
      {/* Top Header & Actions */}
      <div className="flex items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/projets"
            className="p-2 rounded-xl bg-zinc-900 border border-white/[0.1] text-zinc-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">
              {isEdit ? `Modifier : ${initialData?.title}` : "Ajouter un nouveau projet"}
            </h1>
            <p className="text-xs text-zinc-400">
              {isEdit
                ? "Mettez à jour les informations et l'étude de cas"
                : "Créez une nouvelle réalisation pour votre portfolio"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/projets"
            className="px-4 py-2.5 rounded-xl text-xs font-semibold text-zinc-400 hover:text-white bg-zinc-900 border border-white/[0.1] transition-colors"
          >
            Annuler
          </Link>

          <button
            type="submit"
            disabled={isPending}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-zinc-950 bg-emerald-400 hover:bg-emerald-300 transition-colors shadow-md disabled:opacity-50 cursor-pointer"
          >
            {isPending ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Enregistrement...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>{isEdit ? "Mettre à jour" : "Publier le projet"}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {state?.error && (
        <div className="p-4 rounded-xl bg-red-950/60 border border-red-500/40 text-red-200 text-sm">
          {state.error}
        </div>
      )}

      {/* Section 1: Informations Générales */}
      <div className="rounded-3xl bg-zinc-900/80 border border-white/[0.1] p-6 sm:p-8 space-y-6 shadow-xl">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-emerald-400" />
          <span>Informations Générales</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300">
              Titre du projet *
            </label>
            <input
              name="title"
              type="text"
              required
              value={title}
              onChange={handleTitleChange}
              placeholder="ex: NexusFlow Analytics"
              className="w-full px-4 py-3 rounded-xl bg-zinc-950/90 border border-white/[0.12] text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-emerald-400 font-sans"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300">
              Slug URL (identifiant web) *
            </label>
            <input
              name="slug"
              type="text"
              required
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="ex: nexusflow-analytics"
              className="w-full px-4 py-3 rounded-xl bg-zinc-950/90 border border-white/[0.12] text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-emerald-400 font-mono"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300">
            Accroche / Tagline (courte phrase d&apos;impact) *
          </label>
          <input
            name="tagline"
            type="text"
            required
            defaultValue={initialData?.tagline || ""}
            placeholder="ex: Plateforme SaaS d'orchestration et d'analyse prédictive de flux B2B"
            className="w-full px-4 py-3 rounded-xl bg-zinc-950/90 border border-white/[0.12] text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-emerald-400"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300">
              Catégorie *
            </label>
            <select
              name="category"
              defaultValue={initialData?.category || "FULLSTACK"}
              className="w-full px-4 py-3 rounded-xl bg-zinc-950/90 border border-white/[0.12] text-sm text-white focus:outline-none focus:border-emerald-400 cursor-pointer"
            >
              <option value="WEBSITE">Site Entreprise & PME</option>
              <option value="SAAS">SaaS & Web App</option>
              <option value="FULLSTACK">Outils & Full-Stack</option>
              <option value="ECOMMERCE">E-Commerce</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300">
              Client / Organisation
            </label>
            <input
              name="client"
              type="text"
              defaultValue={initialData?.client || ""}
              placeholder="ex: Maison Vermeil"
              className="w-full px-4 py-3 rounded-xl bg-zinc-950/90 border border-white/[0.12] text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-emerald-400"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300">
              Année de réalisation
            </label>
            <input
              name="year"
              type="text"
              defaultValue={initialData?.year || new Date().getFullYear().toString()}
              placeholder="2025"
              className="w-full px-4 py-3 rounded-xl bg-zinc-950/90 border border-white/[0.12] text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-emerald-400 font-mono"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300">
              Rôle assuré *
            </label>
            <input
              name="role"
              type="text"
              required
              defaultValue={initialData?.role || "Direction Technique & Développement"}
              placeholder="ex: Lead Dév Full-Stack"
              className="w-full px-4 py-3 rounded-xl bg-zinc-950/90 border border-white/[0.12] text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-emerald-400"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300">
              Client / Contexte
            </label>
            <input
              name="client"
              type="text"
              defaultValue={initialData?.client || ""}
              placeholder="ex: Rent a Book / PME"
              className="w-full px-4 py-3 rounded-xl bg-zinc-950/90 border border-white/[0.12] text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-emerald-400"
            />
          </div>
        </div>

        {/* Vercel Blob Image Upload */}
        <div className="pt-2">
          <ImageUpload initialValue={initialData?.imageUrl || ""} />
        </div>

        {/* Featured switch */}
        <div className="pt-2 flex items-center gap-3">
          <input
            type="checkbox"
            id="featured"
            name="featured"
            checked={featured}
            onChange={(e) => setFeatured(e.target.checked)}
            className="w-4 h-4 rounded text-emerald-400 focus:ring-emerald-400 bg-zinc-950 border-white/[0.2] cursor-pointer"
          />
          <label htmlFor="featured" className="text-sm font-semibold text-white cursor-pointer">
            Mettre ce projet en avant sur la page d&apos;accueil (Featured Bento Grid)
          </label>
        </div>
      </div>

      {/* Section 2: Liens & Stack */}
      <div className="rounded-3xl bg-zinc-900/80 border border-white/[0.1] p-6 sm:p-8 space-y-6 shadow-xl">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <Layers className="w-5 h-5 text-emerald-400" />
          <span>Liens Externes & Technologies</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300">
              Lien du site en ligne (Live URL)
            </label>
            <input
              name="liveUrl"
              type="url"
              defaultValue={initialData?.liveUrl || ""}
              placeholder="https://mon-projet.com"
              className="w-full px-4 py-3 rounded-xl bg-zinc-950/90 border border-white/[0.12] text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-emerald-400 font-mono"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300">
              Lien GitHub / Code Source
            </label>
            <input
              name="githubUrl"
              type="url"
              defaultValue={initialData?.githubUrl || ""}
              placeholder="https://github.com/gminor/repo"
              className="w-full px-4 py-3 rounded-xl bg-zinc-950/90 border border-white/[0.12] text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-emerald-400 font-mono"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300">
            Stack Technique (séparée par des virgules)
          </label>
          <input
            name="techStack"
            type="text"
            defaultValue={initialData?.techStack.join(", ") || "Next.js, TypeScript, Tailwind CSS, Prisma, PostgreSQL"}
            placeholder="Next.js, TypeScript, Prisma, Tailwind CSS, Stripe..."
            className="w-full px-4 py-3 rounded-xl bg-zinc-950/90 border border-white/[0.12] text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-emerald-400 font-mono"
          />
        </div>
      </div>

      {/* Section 3: Métriques Chiffrées Clés */}
      <div className="rounded-3xl bg-zinc-900/80 border border-white/[0.1] p-6 sm:p-8 space-y-6 shadow-xl">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-emerald-400" />
          <span>Métriques d&apos;Impact (Affichées sur les Cartes &amp; Étude de Cas)</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-black/60 border border-white/[0.08] space-y-3">
            <span className="text-xs font-mono uppercase text-zinc-400 font-bold block">Métrique 1</span>
            <input
              name="metric1Val"
              type="text"
              defaultValue={initialData?.metrics?.[0]?.value || ""}
              placeholder="ex: -75%"
              className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-white/[0.1] text-sm text-white font-mono"
            />
            <input
              name="metric1Label"
              type="text"
              defaultValue={initialData?.metrics?.[0]?.label || ""}
              placeholder="ex: Gain de temps"
              className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-white/[0.1] text-xs text-zinc-300"
            />
          </div>

          <div className="p-4 rounded-2xl bg-black/60 border border-white/[0.08] space-y-3">
            <span className="text-xs font-mono uppercase text-zinc-400 font-bold block">Métrique 2</span>
            <input
              name="metric2Val"
              type="text"
              defaultValue={initialData?.metrics?.[1]?.value || ""}
              placeholder="ex: < 0.3s"
              className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-white/[0.1] text-sm text-white font-mono"
            />
            <input
              name="metric2Label"
              type="text"
              defaultValue={initialData?.metrics?.[1]?.label || ""}
              placeholder="ex: Temps de chargement"
              className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-white/[0.1] text-xs text-zinc-300"
            />
          </div>

          <div className="p-4 rounded-2xl bg-black/60 border border-white/[0.08] space-y-3">
            <span className="text-xs font-mono uppercase text-zinc-400 font-bold block">Métrique 3</span>
            <input
              name="metric3Val"
              type="text"
              defaultValue={initialData?.metrics?.[2]?.value || ""}
              placeholder="ex: 100% digital"
              className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-white/[0.1] text-sm text-white font-mono"
            />
            <input
              name="metric3Label"
              type="text"
              defaultValue={initialData?.metrics?.[2]?.label || ""}
              placeholder="ex: Processus dématérialisé"
              className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-white/[0.1] text-xs text-zinc-300"
            />
          </div>
        </div>
      </div>

      {/* Section 4: Étude de Cas Approfondie */}
      <div className="rounded-3xl bg-zinc-900/80 border border-white/[0.1] p-6 sm:p-8 space-y-6 shadow-xl">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <Target className="w-5 h-5 text-emerald-400" />
          <span>Étude de Cas &amp; Résultats</span>
        </h2>

        <div className="space-y-2">
          <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300">
            Le Défi / Problématique initiale
          </label>
          <textarea
            name="challenge"
            rows={3}
            defaultValue={initialData?.challenge || ""}
            placeholder="Décrivez les contraintes techniques ou business du client au démarrage..."
            className="w-full px-4 py-3 rounded-xl bg-zinc-950/90 border border-white/[0.12] text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-emerald-400"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300">
            La Solution & Architecture mise en place
          </label>
          <textarea
            name="solution"
            rows={3}
            defaultValue={initialData?.solution || ""}
            placeholder="Expliquez comment vous avez résolu le problème..."
            className="w-full px-4 py-3 rounded-xl bg-zinc-950/90 border border-white/[0.12] text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-emerald-400"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300">
            Résultats clés & Chiffres d&apos;impact (1 par ligne)
          </label>
          <textarea
            name="results"
            rows={3}
            defaultValue={initialData?.results.join("\n") || ""}
            placeholder="-70% de temps de chargement&#10;+140% de conversion sur les devis&#10;Score Lighthouse 98/100"
            className="w-full px-4 py-3 rounded-xl bg-zinc-950/90 border border-white/[0.12] text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-emerald-400"
          />
        </div>
      </div>

      {/* Bottom Action Bar */}
      <div className="flex items-center justify-end gap-3 pt-4">
        <button
          type="submit"
          disabled={isPending}
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-sm font-bold uppercase tracking-wider text-zinc-950 bg-emerald-400 hover:bg-emerald-300 transition-colors shadow-lg disabled:opacity-50 cursor-pointer"
        >
          {isPending ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Enregistrement en cours...</span>
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              <span>{isEdit ? "Enregistrer les modifications" : "Créer le projet"}</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
