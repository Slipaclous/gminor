import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import "dotenv/config";
import { PROJECTS_DATA } from "../src/data/projects";

const connectionString = process.env.DATABASE_URL || "";
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Début du seed de la base de données Neon / Prisma...");

  // Nettoyage préalable si besoin
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
      },
    });
    console.log(`✅ Projet inséré : ${p.title}`);
  }

  console.log("🎉 Seed terminé avec succès !");
}

main()
  .catch((e) => {
    console.error("❌ Erreur pendant le seed :", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
