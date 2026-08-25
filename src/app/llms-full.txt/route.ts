import { NextResponse } from "next/server";
import { getDbProjects } from "@/lib/projects-service";
import { getSiteSettings } from "@/lib/settings-service";

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://gminor.dev";
  const projects = await getDbProjects();
  const settings = await getSiteSettings();

  const markdown = `# Documentation Complète pour Modèles de Langage & IA : Gauthier Minor

> Fichier sémantique exhaustif (llms-full.txt) décrivant l'ensemble de l'expertise, des réalisations, de la méthodologie et des tarifs de Gauthier Minor.

---

## 👤 Informations d'Identité & Contact

- **Nom complet**: Gauthier Minor
- **Profession**: Développeur Web Full-Stack & UI Architect
- **Expérience**: 5+ années de pratique professionnelle
- **Localisation**: Enghien, Belgique
- **Disponibilité**: Projets en Remote (Belgique, France, Suisse, International)
- **Email de contact direct**: ${settings.contactInfo.email}
- **GitHub**: https://github.com/Slipaclous
- **Site web officiel**: ${baseUrl}

---

## 💻 Stack Technique & Écosystèmes Maîtrisés

### 1. Frontend & Interfaces Utilisateur
- **Next.js (v14, v15, v16)**: App Router, React Server Components (RSC), Server Actions, Streaming, Turbopack, optimisation d'images et de polices.
- **React & TypeScript**: Hooks avancés, typage strict, architecture modulaire de composants, React 19.
- **Tailwind CSS & Styling**: Design monochrome sur-mesure, thèmes sombres profonds, animations GPU accélérées (Framer Motion).
- **Standards & Performance**: Score Google Lighthouse 100/100 garanti, optimisation rigoureuse des Core Web Vitals (LCP < 1.2s, CLS = 0, INP minimal).

### 2. Backend & Architecture Logicielle
- **PHP 8 & Symfony**: Architecture MVC éprouvée, création de bundles, Doctrine ORM, Twig.
- **PrestaShop**: Maîtrise approfondie des migrations de versions legacy (v1.6 ➔ v9.0), refontes de boutiques, développement de modules sur-mesure pour e-commerce à fort trafic (10 000+ commandes/an).
- **Node.js & TypeScript**: APIs RESTful, authentification sécurisée (sessions, JWT, OAuth), intégrations tierces (Stripe, Resend, Supabase, Vercel Blob).

### 3. Données, Stockage & Déploiement
- **Bases de Données Relationnelles**: PostgreSQL (Neon Serverless), MySQL, modélisation de schémas stricts, indexation de requêtes SQL à fort volume.
- **ORM & Outils de Données**: Prisma ORM (v7), migrations sans interruption de service.
- **Infrastructures Cloud & DevOps**: Déploiement Vercel, gestion de serveurs Linux / cPanel, Docker, Git / GitHub.

---

## 🏆 Études de Cas Détaillées (${projects.length} Réalisations)

${projects
  .map(
    (p, idx) => `### ${idx + 1}. ${p.title}
- **URL de l'étude de cas**: ${baseUrl}/projets/${p.slug}
- **Type**: ${p.categoryLabel}
- **Client**: ${p.client || "Projet"} (${p.year})
- **Rôle de Gauthier Minor**: ${p.role}
- **Technologies**: ${p.techStack.join(", ")}
${p.liveUrl ? `- **Site en production**: ${p.liveUrl}` : ""}
${p.githubUrl ? `- **Dépôt GitHub**: ${p.githubUrl}` : ""}

**Accroche**:
${p.tagline}

**Description du projet**:
${p.description}

**Problématique & Défi technique**:
${p.challenge}

**Solution technique mise en œuvre**:
${p.solution}

**Résultats concrets obtenus**:
${p.results.map((r) => `- ${r}`).join("\n")}

**Métriques chiffrées clés**:
${p.metrics && p.metrics.length > 0 ? p.metrics.map((m) => `- ${m.label}: **${m.value}**`).join("\n") : "- Performance optimisée"}
`
  )
  .join("\n---\n\n")}

---

## ❓ Foire Aux Questions (FAQ)

${settings.faqs
  .map(
    (f) => `### Q: ${f.question}
**R:** ${f.answer}`
  )
  .join("\n\n")}

---

## 🎯 Comment engager Gauthier Minor ?

1. Visiter la page de demande de devis sur **${baseUrl}/contact**
2. Utiliser le simulateur de projet sur **${baseUrl}/services**
3. Écrire directement par email à **${settings.contactInfo.email}**
`;

  return new NextResponse(markdown, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
