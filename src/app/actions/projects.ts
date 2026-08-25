"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { verifyAdminSession } from "@/lib/auth";
import { getDbProjects, updateMemoryProjects, getCategoryLabel } from "@/lib/projects-service";
import { ProjectItem } from "@/data/projects";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export interface ProjectFormState {
  error?: string;
  success?: boolean;
}

export async function createProjectAction(
  _prevState: ProjectFormState | null,
  formData: FormData
): Promise<ProjectFormState> {
  const isAuth = await verifyAdminSession();
  if (!isAuth) {
    return { error: "Non autorisé. Veuillez vous connecter." };
  }

  const title = (formData.get("title") as string)?.trim();
  const rawSlug = (formData.get("slug") as string)?.trim();
  const slug = rawSlug ? slugify(rawSlug) : slugify(title);
  const tagline = (formData.get("tagline") as string)?.trim();
  const description = (formData.get("description") as string)?.trim();
  const category = (formData.get("category") as ProjectItem["category"]) || "FULLSTACK";
  const client = (formData.get("client") as string)?.trim() || null;
  const role = (formData.get("role") as string)?.trim() || "Lead Développeur";
  const year = (formData.get("year") as string)?.trim() || new Date().getFullYear().toString();
  const imageUrl = (formData.get("imageUrl") as string)?.trim() || "/images/projects/nexusflow.webp";
  const liveUrl = (formData.get("liveUrl") as string)?.trim() || null;
  const githubUrl = (formData.get("githubUrl") as string)?.trim() || null;
  const featured = formData.get("featured") === "on" || formData.get("featured") === "true";
  const challenge = (formData.get("challenge") as string)?.trim() || "";
  const solution = (formData.get("solution") as string)?.trim() || "";

  // Parse tech stack & results from comma/newline separated
  const techStackRaw = (formData.get("techStack") as string) || "";
  const techStack = techStackRaw
    .split(/[\n,]+/)
    .map((s) => s.trim())
    .filter(Boolean);

  const resultsRaw = (formData.get("results") as string) || "";
  const results = resultsRaw
    .split(/[\n]+/)
    .map((s) => s.trim())
    .filter(Boolean);

  // Parse 3 key metrics
  const metric1Label = (formData.get("metric1Label") as string)?.trim();
  const metric1Val = (formData.get("metric1Val") as string)?.trim();
  const metric2Label = (formData.get("metric2Label") as string)?.trim();
  const metric2Val = (formData.get("metric2Val") as string)?.trim();
  const metric3Label = (formData.get("metric3Label") as string)?.trim();
  const metric3Val = (formData.get("metric3Val") as string)?.trim();

  const metrics: { label: string; value: string }[] = [];
  if (metric1Label && metric1Val) metrics.push({ label: metric1Label, value: metric1Val });
  if (metric2Label && metric2Val) metrics.push({ label: metric2Label, value: metric2Val });
  if (metric3Label && metric3Val) metrics.push({ label: metric3Label, value: metric3Val });

  if (!title || title.length < 2) {
    return { error: "Veuillez renseigner un titre valide." };
  }

  if (!tagline) {
    return { error: "Veuillez renseigner une courte accroche." };
  }

  try {
    const newId = `proj_${Date.now()}`;
    const all = await getDbProjects();
    const order = all.length + 1;

    // Database write to Neon PostgreSQL
    if (process.env.DATABASE_URL && !process.env.DATABASE_URL.includes("localhost:5432")) {
      await prisma.project.create({
        data: {
          slug,
          title,
          tagline,
          description: description || tagline,
          category: category as any,
          client,
          role,
          year,
          imageUrl,
          techStack,
          liveUrl,
          githubUrl,
          featured,
          order,
          challenge,
          solution,
          results,
          metrics: metrics as any,
        },
      });
    }

    // Update memory
    const newProject: ProjectItem = {
      id: newId,
      slug,
      title,
      tagline,
      description: description || tagline,
      category,
      categoryLabel: getCategoryLabel(category),
      client: client || undefined,
      role,
      year,
      imageUrl,
      techStack,
      liveUrl: liveUrl || undefined,
      githubUrl: githubUrl || undefined,
      featured,
      order,
      challenge,
      solution,
      results,
      metrics,
    };
    updateMemoryProjects([...all, newProject]);

    revalidatePath("/");
    revalidatePath("/projets");
    revalidatePath("/admin/projets");
  } catch (error) {
    console.error("Erreur création projet:", error);
    return { error: "Une erreur est survenue lors de l'enregistrement." };
  }

  redirect("/admin/projets");
}

export async function updateProjectAction(
  id: string,
  _prevState: ProjectFormState | null,
  formData: FormData
): Promise<ProjectFormState> {
  const isAuth = await verifyAdminSession();
  if (!isAuth) {
    return { error: "Non autorisé. Veuillez vous connecter." };
  }

  const title = (formData.get("title") as string)?.trim();
  const rawSlug = (formData.get("slug") as string)?.trim();
  const slug = rawSlug ? slugify(rawSlug) : slugify(title);
  const tagline = (formData.get("tagline") as string)?.trim();
  const description = (formData.get("description") as string)?.trim();
  const category = (formData.get("category") as ProjectItem["category"]) || "FULLSTACK";
  const client = (formData.get("client") as string)?.trim() || null;
  const role = (formData.get("role") as string)?.trim() || "Lead Développeur";
  const year = (formData.get("year") as string)?.trim() || new Date().getFullYear().toString();
  const imageUrl = (formData.get("imageUrl") as string)?.trim() || "/images/projects/nexusflow.webp";
  const liveUrl = (formData.get("liveUrl") as string)?.trim() || null;
  const githubUrl = (formData.get("githubUrl") as string)?.trim() || null;
  const featured = formData.get("featured") === "on" || formData.get("featured") === "true";
  const challenge = (formData.get("challenge") as string)?.trim() || "";
  const solution = (formData.get("solution") as string)?.trim() || "";

  const techStackRaw = (formData.get("techStack") as string) || "";
  const techStack = techStackRaw
    .split(/[\n,]+/)
    .map((s) => s.trim())
    .filter(Boolean);

  const resultsRaw = (formData.get("results") as string) || "";
  const results = resultsRaw
    .split(/[\n]+/)
    .map((s) => s.trim())
    .filter(Boolean);

  // Parse 3 key metrics
  const metric1Label = (formData.get("metric1Label") as string)?.trim();
  const metric1Val = (formData.get("metric1Val") as string)?.trim();
  const metric2Label = (formData.get("metric2Label") as string)?.trim();
  const metric2Val = (formData.get("metric2Val") as string)?.trim();
  const metric3Label = (formData.get("metric3Label") as string)?.trim();
  const metric3Val = (formData.get("metric3Val") as string)?.trim();

  const metrics: { label: string; value: string }[] = [];
  if (metric1Label && metric1Val) metrics.push({ label: metric1Label, value: metric1Val });
  if (metric2Label && metric2Val) metrics.push({ label: metric2Label, value: metric2Val });
  if (metric3Label && metric3Val) metrics.push({ label: metric3Label, value: metric3Val });

  if (!title) {
    return { error: "Veuillez renseigner un titre." };
  }

  try {
    if (process.env.DATABASE_URL && !process.env.DATABASE_URL.includes("localhost:5432")) {
      await prisma.project.update({
        where: { id },
        data: {
          slug,
          title,
          tagline,
          description: description || tagline,
          category: category as any,
          client,
          role,
          year,
          imageUrl,
          techStack,
          liveUrl,
          githubUrl,
          featured,
          challenge,
          solution,
          results,
          metrics: metrics as any,
        },
      });
    }

    const all = await getDbProjects();
    const updated = all.map((p) =>
      p.id === id
        ? {
            ...p,
            slug,
            title,
            tagline,
            description: description || tagline,
            category,
            categoryLabel: getCategoryLabel(category),
            client: client || undefined,
            role,
            year,
            imageUrl,
            techStack,
            liveUrl: liveUrl || undefined,
            githubUrl: githubUrl || undefined,
            featured,
            challenge,
            solution,
            results,
            metrics: metrics.length > 0 ? metrics : p.metrics,
          }
        : p
    );
    updateMemoryProjects(updated);

    revalidatePath("/");
    revalidatePath("/projets");
    revalidatePath(`/projets/${slug}`);
    revalidatePath("/admin/projets");
  } catch (error) {
    console.error("Erreur mise à jour projet:", error);
    return { error: "Erreur lors de la mise à jour." };
  }

  redirect("/admin/projets");
}

export async function deleteProjectAction(id: string) {
  const isAuth = await verifyAdminSession();
  if (!isAuth) {
    throw new Error("Non autorisé");
  }

  try {
    if (process.env.DATABASE_URL && !process.env.DATABASE_URL.includes("localhost:5432")) {
      await prisma.project.delete({ where: { id } });
    }
    const all = await getDbProjects();
    updateMemoryProjects(all.filter((p) => p.id !== id));

    revalidatePath("/");
    revalidatePath("/projets");
    revalidatePath("/admin/projets");
  } catch (error) {
    console.error("Erreur suppression projet:", error);
  }
}

export async function toggleFeaturedAction(id: string, currentFeatured: boolean) {
  const isAuth = await verifyAdminSession();
  if (!isAuth) {
    throw new Error("Non autorisé");
  }

  try {
    if (process.env.DATABASE_URL && !process.env.DATABASE_URL.includes("localhost:5432")) {
      await prisma.project.update({
        where: { id },
        data: { featured: !currentFeatured },
      });
    }
    const all = await getDbProjects();
    updateMemoryProjects(
      all.map((p) => (p.id === id ? { ...p, featured: !currentFeatured } : p))
    );

    revalidatePath("/");
    revalidatePath("/projets");
    revalidatePath("/admin/projets");
  } catch (error) {
    console.error("Erreur toggle featured:", error);
  }
}
