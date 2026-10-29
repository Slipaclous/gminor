import fs from "fs";
import path from "path";
import { prisma, type Prisma } from "@/lib/prisma";

export interface HeroMetric {
  value: string;
  label: string;
}

export interface HeroSettings {
  available: boolean;
  /** Intro paragraph under the hero title. */
  intro: string;
  /** Terminal script, one line per entry. "$ " = command, "✓ " = success, "★ " = highlighted result, otherwise plain output. */
  terminal: string[];
  metrics: HeroMetric[];
}

export interface ExpertiseItem {
  title: string;
  text: string;
  tags: string[];
}

export interface AboutSettings {
  title: string;
  titleAccent: string;
  paragraphs: string[];
  stack: string[];
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface ContactInfoSettings {
  email: string;
  phone?: string;
  location: string;
  githubUrl: string;
  linkedinUrl: string;
  twitterUrl?: string;
  instagramUrl?: string;
  calcomUrl?: string;
  availabilityText: string;
  workingHours?: string;
}

export interface SiteSettings {
  hero: HeroSettings;
  expertise: ExpertiseItem[];
  about: AboutSettings;
  faqs: FaqItem[];
  contactInfo: ContactInfoSettings;
}

export const DEFAULT_SITE_SETTINGS: SiteSettings = {
  hero: {
    available: true,
    intro:
      "Je suis Gauthier Minor. Je conçois et développe des sites rapides, beaux et solides.",
    terminal: [
      "$ npx create-next-app@latest client-site",
      "✓ Projet créé — Next.js · TypeScript · Tailwind",
      "$ git commit -m \"feat: maquette intégrée au pixel\"",
      "[main 4f2c9a1] 38 files changed",
      "$ git push origin main",
      "Build en cours…",
      "✓ Build terminé en 4.2s",
      "✓ Déployé en production",
      "$ npx lighthouse https://client-site.be",
      "★ Performance 100 · Accessibilité 100 · SEO 100",
    ],
    metrics: [
      { value: "< 0.4s", label: "Temps de chargement moyen" },
      { value: "100%", label: "Score de performance Google" },
      { value: "5+ ans", label: "Pratique Full-Stack" },
    ],
  },
  expertise: [
    {
      title: "Développement sur mesure",
      text: "Sites Next.js rapides, animés et faciles à gérer.",
      tags: ["Next.js", "CMS", "SEO"],
    },
    {
      title: "E-commerce & SaaS",
      text: "Boutiques et outils métier qui tiennent la charge.",
      tags: ["PrestaShop", "PostgreSQL", "Stripe"],
    },
    {
      title: "UI / UX design",
      text: "Maquettes testées sur mobile avant de coder.",
      tags: ["Wireframes", "Prototypes", "Responsive"],
    },
    {
      title: "Direction artistique",
      text: "Une identité visuelle qui vous ressemble.",
      tags: ["Logo & identité", "Moodboard", "Design system"],
    },
  ],
  about: {
    title: "Développeur d'abord,",
    titleAccent: "exigeant sur le design.",
    paragraphs: ["Je code tout moi-même, du serveur à l'interface. Et je dessine chaque écran avec le même soin."],
    stack: ["Next.js", "React", "TypeScript", "Node", "PHP / Symfony", "PrestaShop", "PostgreSQL", "MySQL", "Prisma", "Figma"],
  },
  faqs: [
    {
      question: "Je n'ai pas de compétences techniques, est-ce un frein ?",
      answer:
        "Pas du tout. Je prends en charge l'ensemble des aspects techniques (hébergement, nom de domaine, base de données, code) et je vous explique chaque étape avec des termes simples.",
    },
    {
      question: "Travaillez-vous aussi sur des technologies comme PHP, Symfony ou PrestaShop ?",
      answer:
        "Oui, tout à fait. J'ai une solide expérience sur l'écosystème PHP (Symfony, PrestaShop avec des migrations de v1.6 à v9, création de modules et intégrations MySQL) ainsi que sur les stacks modernes (Next.js, React, Node.js). Je m'adapte à votre existant technique.",
    },
    {
      question: "Comment puis-je suivre l'avancement et tester le projet pendant le développement ?",
      answer:
        "En totale transparence : dès le lancement, vous disposez d'un lien privé de prévisualisation en ligne (environnement de staging sécurisé). Vous pouvez ainsi tester en direct chaque nouvelle version, valider les fonctionnalités au fur et à mesure et me partager vos retours en continu jusqu'à la livraison finale.",
    },
    {
      question: "Puis-je modifier mes textes et photos moi-même après livraison ?",
      answer:
        "Oui. Chaque projet intègre un espace d'administration épuré et sécurisé vous permettant de mettre à jour vos coordonnées, réalisations et textes en toute autonomie.",
    },
    {
      question: "Combien coûte la création ou la refonte d'un projet ?",
      answer:
        "Le tarif varie selon le périmètre fonctionnel. Vous pouvez utiliser le simulateur interactif ci-dessous pour obtenir une estimation immédiate et transparente.",
    },
    {
      question: "Que se passe-t-il après la mise en production ?",
      answer:
        "Vous bénéficiez d'une période de garantie et de support de 30 jours pour tout ajustement. Je propose également des contrats de maintenance pour assurer la sécurité et les évolutions futures.",
    },
  ],
  contactInfo: {
    email: "contact@gauthierminor.com",
    phone: "+32 470 00 00 00",
    location: "Belgique (Bruxelles / Enghien / Wallonie) • Remote",
    githubUrl: "https://github.com/Slipaclous",
    linkedinUrl: "https://linkedin.com/in/gauthier-minor",
    twitterUrl: "",
    instagramUrl: "",
    calcomUrl: "",
    availabilityText: "Disponible pour nouveaux projets",
    workingHours: "Du lundi au vendredi • 9h00 - 18h30",
  },
};

/** Fills fields missing from settings saved before the redesign. */
function withDefaults(stored: Partial<SiteSettings>): SiteSettings {
  const d = DEFAULT_SITE_SETTINGS;
  return {
    hero: { ...d.hero, ...stored.hero },
    expertise: stored.expertise?.length ? stored.expertise : d.expertise,
    about: { ...d.about, ...stored.about },
    faqs: stored.faqs ?? d.faqs,
    contactInfo: { ...d.contactInfo, ...stored.contactInfo },
  };
}

const SETTINGS_FILE_PATH = path.join(process.cwd(), "src/data/settings.json");

export async function getSiteSettings(): Promise<SiteSettings> {
  // 1. Essayer depuis Neon DB en priorité
  try {
    if (process.env.DATABASE_URL && !process.env.DATABASE_URL.includes("localhost:5432")) {
      const dbSetting = await prisma.siteSetting.findUnique({
        where: { id: "default" },
      });
      if (dbSetting?.data) {
        return withDefaults(dbSetting.data as unknown as Partial<SiteSettings>);
      }
    }
  } catch (err) {
    console.warn("Neon DB SiteSetting read fallback:", err);
  }

  // 2. Fallback vers settings.json local
  try {
    if (fs.existsSync(SETTINGS_FILE_PATH)) {
      const data = fs.readFileSync(SETTINGS_FILE_PATH, "utf-8");
      return withDefaults(JSON.parse(data) as Partial<SiteSettings>);
    }
  } catch (err) {
    console.warn("Could not read settings.json:", err);
  }

  return DEFAULT_SITE_SETTINGS;
}

export async function updateSiteSettings(
  updated: Partial<SiteSettings>
): Promise<SiteSettings> {
  const current = await getSiteSettings();
  const merged: SiteSettings = {
    ...current,
    ...updated,
    hero: updated.hero ? { ...current.hero, ...updated.hero } : current.hero,
    contactInfo: updated.contactInfo
      ? { ...current.contactInfo, ...updated.contactInfo }
      : current.contactInfo,
    about: updated.about ? { ...current.about, ...updated.about } : current.about,
  };

  // 1. Sauvegarder dans Neon PostgreSQL
  let savedToDb = false;
  try {
    if (process.env.DATABASE_URL && !process.env.DATABASE_URL.includes("localhost:5432")) {
      await prisma.siteSetting.upsert({
        where: { id: "default" },
        update: { data: merged as unknown as Prisma.InputJsonValue },
        create: { id: "default", data: merged as unknown as Prisma.InputJsonValue },
      });
      savedToDb = true;
    }
  } catch (err) {
    console.error("Neon DB SiteSetting write error:", err);
  }

  // 2. Fichier local uniquement en secours : il vit dans src/, donc l'écrire à chaque
  // sauvegarde relance `next dev` en pleine réponse et le bouton reste bloqué.
  if (savedToDb) return merged;
  try {
    const dir = path.dirname(SETTINGS_FILE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(SETTINGS_FILE_PATH, JSON.stringify(merged, null, 2), "utf-8");
  } catch (err) {
    console.error("Could not write settings.json:", err);
  }

  return merged;
}
