import { prisma } from "@/lib/prisma";
import { PROJECTS_DATA, ProjectItem } from "@/data/projects";

// In-memory runtime cache for fallback
let memoryProjects: ProjectItem[] = [...PROJECTS_DATA];

export async function getDbProjects(): Promise<ProjectItem[]> {
  try {
    if (process.env.DATABASE_URL && !process.env.DATABASE_URL.includes("localhost:5432")) {
      const dbItems = await prisma.project.findMany({
        orderBy: { order: "asc" },
      });

      if (dbItems && dbItems.length > 0) {
        return dbItems.map((p) => {
          let parsedMetrics: { label: string; value: string }[] = [];
          if (p.metrics) {
            if (Array.isArray(p.metrics)) {
              parsedMetrics = p.metrics as any;
            } else if (typeof p.metrics === "string") {
              try {
                parsedMetrics = JSON.parse(p.metrics);
              } catch {
                parsedMetrics = [];
              }
            }
          }

          return {
            id: p.id,
            slug: p.slug,
            title: p.title,
            tagline: p.tagline,
            description: p.description,
            category: p.category as ProjectItem["category"],
            categoryLabel: getCategoryLabel(p.category),
            client: p.client || undefined,
            role: p.role,
            year: p.year,
            imageUrl: p.imageUrl,
            gallery: p.gallery,
            techStack: p.techStack,
            liveUrl: p.liveUrl || undefined,
            githubUrl: p.githubUrl || undefined,
            featured: p.featured,
            order: p.order,
            challenge: p.challenge || "",
            solution: p.solution || "",
            results: p.results,
            metrics: parsedMetrics.length > 0 ? parsedMetrics : (PROJECTS_DATA.find((item) => item.slug === p.slug)?.metrics || []),
            modules: PROJECTS_DATA.find((item) => item.slug === p.slug)?.modules,
          };
        });
      }
    }
  } catch (error) {
    console.warn("Prisma query fallback:", error);
  }

  return memoryProjects.sort((a, b) => a.order - b.order);
}

export async function getDbProjectBySlug(slug: string): Promise<ProjectItem | null> {
  const all = await getDbProjects();
  return all.find((p) => p.slug === slug) || null;
}

export async function getDbProjectById(id: string): Promise<ProjectItem | null> {
  const all = await getDbProjects();
  return all.find((p) => p.id === id) || null;
}

export function updateMemoryProjects(updatedList: ProjectItem[]) {
  memoryProjects = updatedList;
}

export function getCategoryLabel(cat: string): string {
  switch (cat) {
    case "SAAS":
      return "SaaS & Web App";
    case "WEBSITE":
      return "Site Entreprise & PME";
    case "ECOMMERCE":
      return "E-Commerce";
    case "FULLSTACK":
      return "Outils & Full-Stack";
    default:
      return "Projet Web";
  }
}
