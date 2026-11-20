import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
dotenv.config();

import { PrismaClient, type Prisma } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import { PROJECTS_DATA } from "../src/data/projects";

// Ajoute ou met à jour UN projet de src/data/projects.ts en base, sans toucher aux autres
// (contrairement au seed, qui vide la table). Usage : npm run project:upsert -- <slug>
const slug = process.argv[2];
const project = PROJECTS_DATA.find((p) => p.slug === slug);

if (!project) {
  console.error(`❌ Aucun projet avec le slug « ${slug ?? ""} » dans src/data/projects.ts`);
  process.exit(1);
}

const pool = new Pool({ connectionString: process.env.DATABASE_URL || "" });
const prisma = new PrismaClient({ adapter: new PrismaPg(pool) });

const data = {
  title: project.title,
  tagline: project.tagline,
  description: project.description,
  category: project.category,
  client: project.client,
  role: project.role,
  year: project.year,
  imageUrl: project.imageUrl,
  gallery: project.gallery || [],
  techStack: project.techStack,
  liveUrl: project.liveUrl,
  githubUrl: project.githubUrl,
  featured: project.featured,
  order: project.order,
  challenge: project.challenge,
  solution: project.solution,
  results: project.results,
  metrics: project.metrics as unknown as Prisma.InputJsonValue,
  modules: (project.modules || []) as unknown as Prisma.InputJsonValue,
};

prisma.project
  .upsert({ where: { slug: project.slug }, update: data, create: { slug: project.slug, ...data } })
  .then(() => console.log(`✅ Projet « ${project.title} » enregistré en base`))
  .catch((e) => {
    console.error("❌ Erreur :", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
