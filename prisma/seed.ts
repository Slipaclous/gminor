import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
dotenv.config();

import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import { PROJECTS_DATA } from "../src/data/projects";
import fs from "fs";
import path from "path";

const connectionString = process.env.DATABASE_URL || "";
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Début de la synchronisation complète avec Neon PostgreSQL...");

  // 1. Synchroniser tous les Projets
  await prisma.project.deleteMany();

  for (const p of PROJECTS_DATA) {
    await prisma.project.create({
      data: {
        slug: p.slug,
        title: p.title,
        tagline: p.tagline,
        description: p.description,
        category: p.category,
        client: p.client,
        role: p.role,
        year: p.year,
        imageUrl: p.imageUrl,
        gallery: p.gallery || [],
        techStack: p.techStack,
        liveUrl: p.liveUrl,
        githubUrl: p.githubUrl,
        featured: p.featured,
        order: p.order,
        challenge: p.challenge,
        solution: p.solution,
        results: p.results,
        metrics: (p.metrics as any) || [],
      },
    });
    console.log(`✅ Projet synchronisé en base : ${p.title}`);
  }

  // 2. Synchroniser les Réglages du Site (Hero, Piliers, Services, Estimator, FAQ)
  const settingsPath = path.join(process.cwd(), "src/data/settings.json");
  if (fs.existsSync(settingsPath)) {
    const settingsRaw = fs.readFileSync(settingsPath, "utf-8");
    const settingsJson = JSON.parse(settingsRaw);

    await prisma.siteSetting.upsert({
      where: { id: "default" },
      update: { data: settingsJson },
      create: { id: "default", data: settingsJson },
    });
    console.log("✅ Réglages du site (Contenu, FAQ, Services) synchronisés en base de données Neon !");
  }

  console.log("🎉 Synchronisation et Seed terminés avec succès !");
}

main()
  .catch((e) => {
    console.error("❌ Erreur pendant la synchronisation :", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
