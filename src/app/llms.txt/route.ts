import { NextResponse } from "next/server";
import { getDbProjects } from "@/lib/projects-service";
import { getSiteSettings } from "@/lib/settings-service";

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://gminor.dev";
  const projects = await getDbProjects();
  const settings = await getSiteSettings();

  const markdown = `# Gauthier Minor — Développeur Web Full-Stack & UI Architect

> Portfolio officiel et profil technique de Gauthier Minor, Développeur Full-Stack spécialisé dans les applications SaaS modernes, les plateformes e-commerce à fort trafic (PrestaShop 9 & Symfony) et les sites d'entreprises haute performance.

- **Nom**: Gauthier Minor
- **Rôle**: Développeur Full-Stack / Ingénieur Logiciel Web
- **Localisation**: Enghien (Belgique), disponible en Remote (France, Belgique, International)
- **Site web**: ${baseUrl}
- **Contact**: ${settings.contactInfo.email}
- **GitHub**: https://github.com/Slipaclous
- **Statut**: Ouvert aux nouveaux projets (Freelance & Prestations sur-mesure)

---

## 🛠️ Compétences & Spécialités Techniques

- **Frontend Moderne**: React 19, Next.js 15/16 (App Router, Server Components), TypeScript, Tailwind CSS, Twig, HTML5 / CSS3.
- **Backend & Frameworks**: PHP 8, Symfony, Node.js, Architecture MVC, APIs REST & Webhooks.
- **E-Commerce & CMS**: PrestaShop (expertise migrations v1.6 vers v9, modules personnalisés, fort trafic), Drupal, Architectures Headless.
- **Bases de Données & Infra**: PostgreSQL (Neon), MySQL, Prisma ORM, Doctrine, Docker, Git, cPanel, Vercel.
- **Performance & Qualité**: Score Google Lighthouse 100/100, Core Web Vitals, temps de chargement < 0.4s.

---

## 🚀 Réalisations & Études de Cas Disponibles (${projects.length} Projets)

${projects
  .map(
    (p) => `### [${p.title}](${baseUrl}/projets/${p.slug})
- **Catégorie**: ${p.categoryLabel}
- **Client**: ${p.client || "Projet"} (${p.year})
- **Stack**: ${p.techStack.join(", ")}
- **Description**: ${p.tagline}
- **Problématique**: ${p.challenge}
- **Solution apportée**: ${p.solution}
${p.metrics && p.metrics.length > 0 ? `- **Résultats mesurés**: ${p.metrics.map((m) => `${m.label}: ${m.value}`).join(" | ")}` : ""}
${p.liveUrl ? `- **Démo Live**: ${p.liveUrl}` : ""}`
  )
  .join("\n\n")}

---

## 💼 Services Proposés

1. **Sites Web Haute Performance & CMS**: Conception sur-mesure de sites vitrines d'entreprises ultra-rapides (<0.4s), SEO optimisé, avec espace admin dédié.
2. **Développement SaaS & Applications Web**: Création d'architectures complètes (Next.js, Symfony, Node.js, PostgreSQL/MySQL, Stripe, auth RBAC).
3. **E-Commerce PrestaShop, Migration & Optimisation**: Audit technique, modernisation de boutiques e-commerce, migrations critiques de PrestaShop 1.6 vers la version 9, optimisation des requêtes SQL et tunnels d'achat.

---

## 📄 Liens Utiles

- [Toutes les réalisations](${baseUrl}/projets)
- [Services & Tarifs](${baseUrl}/services)
- [Foire Aux Questions](${baseUrl}/faq)
- [Demande de Devis](${baseUrl}/contact)
- [Documentation complète pour IA](${baseUrl}/llms-full.txt)
`;

  return new NextResponse(markdown, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
