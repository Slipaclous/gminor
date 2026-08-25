import fs from "fs";
import path from "path";

export interface HeroMetric {
  value: string;
  label: string;
}

export interface HeroSettings {
  badge: string;
  title: string;
  subtitle: string;
  available: boolean;
  metrics: HeroMetric[];
}

export interface PillarItem {
  id: number;
  title: string;
  tagline: string;
  description: string;
  points: string[];
}

export interface ServiceItem {
  id: string;
  badge: string;
  title: string;
  tagline: string;
  features: string[];
  idealFor: string;
  deliveryTime: string;
}

export interface EstimatorOption {
  id: string;
  name: string;
  price: number;
  days: number;
}

export interface EstimatorSettings {
  projectTypes: EstimatorOption[];
  addons: EstimatorOption[];
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface ContactInfoSettings {
  email: string;
  location: string;
  githubUrl: string;
  linkedinUrl: string;
  availabilityText: string;
}

export interface SiteSettings {
  hero: HeroSettings;
  pillars: PillarItem[];
  services: ServiceItem[];
  estimator: EstimatorSettings;
  faqs: FaqItem[];
  contactInfo: ContactInfoSettings;
}

export const DEFAULT_SITE_SETTINGS: SiteSettings = {
  hero: {
    badge: "Gauthier Minor • Ingénieur Full-Stack & UI Architect",
    title: "Ingénierie logicielle & design web d'exception.",
    subtitle:
      "Je conçois des sites vitrines pour entreprises et des applications SaaS scalables. Zéro compromis sur la vitesse, la lisibilité et l'acquisition client.",
    available: true,
    metrics: [
      { value: "< 0.4s", label: "Temps de chargement moyen" },
      { value: "100%", label: "Score de performance Google" },
      { value: "5+ ans", label: "Expérience Full-Stack" },
    ],
  },
  pillars: [
    {
      id: 1,
      title: "Performance & Vitesse Radicale",
      tagline: "Un site qui se charge en moins de 0.4 seconde",
      description:
        "Chaque milliseconde compte pour votre référencement Google et le taux de conversion de vos prospects. Optimisation complète des Core Web Vitals.",
      points: [
        "Score Lighthouse 100/100 garanti",
        "Architecture Next.js 15 & Server Components",
        "Zéro perte de prospects due aux lenteurs",
      ],
    },
    {
      id: 2,
      title: "Architecture & Données Robustes",
      tagline: "Prisma ORM & PostgreSQL sans dette technique",
      description:
        "Des schémas de bases de données stricts, sécurisés et scalables pour vos applications SaaS et vos flux de données métier.",
      points: [
        "Typage TypeScript strict de bout en bout",
        "Migrations de données sécurisées (Neon & Prisma)",
        "Code prêt pour l'intégration d'équipe",
      ],
    },
    {
      id: 3,
      title: "Design d'Exception & Conversion",
      tagline: "Une identité visuelle sur-mesure et mémorable",
      description:
        "Zéro template impersonnel. Une interface soignée, responsive et pensée pour guider l'utilisateur vers la prise de contact ou l'achat.",
      points: [
        "Direction artistique sur-mesure et moderne",
        "Ergonomie fluide sur mobile, tablette et desktop",
        "Parcours utilisateur axé sur la conversion",
      ],
    },
    {
      id: 4,
      title: "Autonomie Totale & Back-Office",
      tagline: "Modifiez vos contenus sans dépendre d'un tiers",
      description:
        "Chaque projet est livré avec un espace d'administration intuitif et sécurisé pour actualiser vos réalisations, tarifs et contenus en 1 clic.",
      points: [
        "Panneau d'administration épuré et sécurisé",
        "Gestion des demandes de contact et devis",
        "Garantie et support technique inclus 30 jours",
      ],
    },
  ],
  services: [
    {
      id: "entreprises",
      badge: "Sites Vitrines & PME",
      title: "Site Web Haute Performance & CMS",
      tagline:
        "Un site vitrine sur-mesure, ultra-rapide et conçu pour convertir vos visiteurs en clients.",
      features: [
        "Design 100% sur-mesure adapté à votre marque (zéro template)",
        "Affichage fluide sur smartphones, tablettes et ordinateurs",
        "Vitesse de chargement inférieure à 0.4 seconde",
        "Optimisation technique pour le référencement Google (SEO)",
        "Panneau d'administration épuré pour modifier vos contenus en autonomie",
        "Formulaire de devis avec notification email instantanée",
        "Hébergement sécurisé, nom de domaine & certificat SSL inclus",
      ],
      idealFor: "Artisans, commerces, cabinets d'expertise, PME et marques.",
      deliveryTime: "2 à 4 semaines",
    },
    {
      id: "tech",
      badge: "Startups, SaaS & Métier",
      title: "Développement Application Web & SaaS",
      tagline:
        "Une architecture moderne, robuste et scalable pour concrétiser vos projets complexes.",
      features: [
        "Stacks maîtrisées : Next.js 15, React, TypeScript ou PHP 8 / Symfony",
        "Bases de données relationnelles : PostgreSQL & MySQL (modélisation stricte)",
        "Authentification sécurisée, rôles (RBAC) & dashboards temps réel",
        "Intégration de paiements (Stripe), webhooks & APIs tierces",
        "Code documenté, structuré et prêt pour l'intégration d'équipe",
      ],
      idealFor: "Fondateurs de SaaS, plateformes métier, outils internes.",
      deliveryTime: "3 à 8 semaines",
    },
    {
      id: "audit",
      badge: "E-Commerce & Modernisation",
      title: "PrestaShop, Migration & Optimisation",
      tagline:
        "Refonte de boutique e-commerce, migration de version ou optimisation de base de données.",
      features: [
        "Expertise e-commerce : PrestaShop (migration v1.6 vers v9, modules personnalisés)",
        "Diagnostic complet des lenteurs et requêtes SQL bloquantes",
        "Plan d'action concret pour booster votre score Google PageSpeed",
        "Sécurisation des paiements, serveurs (cPanel / Linux) et flux de commandes",
        "Garantie de continuité de service pendant la migration",
      ],
      idealFor: "Boutiques en ligne, sites vieillissants ou lents à fort trafic.",
      deliveryTime: "1 à 4 semaines",
    },
  ],
  estimator: {
    projectTypes: [
      { id: "vitrine", name: "Site Vitrine & Entreprise", price: 2500, days: 14 },
      { id: "saas", name: "Application Web / SaaS", price: 6500, days: 30 },
      { id: "ecommerce", name: "Boutique E-Commerce", price: 4500, days: 21 },
      { id: "refonte", name: "Refonte & Modernisation", price: 2000, days: 10 },
    ],
    addons: [
      { id: "admin", name: "Espace Admin & Back-office sur-mesure", price: 800, days: 5 },
      { id: "seo", name: "Optimisation SEO & Vitesse Google (Score 98+)", price: 500, days: 3 },
      { id: "stripe", name: "Paiement en ligne / Abonnements (Stripe)", price: 900, days: 4 },
      { id: "cms", name: "Gestionnaire de contenus dynamique", price: 600, days: 3 },
    ],
  },
  faqs: [
    {
      question: "Je n'ai pas de compétences techniques, est-ce un frein ?",
      answer:
        "Pas du tout. Je prends en charge l'ensemble des aspects techniques (hébergement, nom de domaine, base de données, code) et je vous explique chaque étape avec des termes simples.",
    },
    {
      question: "Puis-je modifier mes textes et photos moi-même après livraison ?",
      answer:
        "Oui. Chaque projet intègre un espace d'administration épuré et sécurisé vous permettant de mettre à jour vos coordonnées, réalisations et textes en toute autonomie.",
    },
    {
      question: "Combien coûte la création d'un projet ?",
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
    email: "contact@gauthierminor.dev",
    location: "Paris, France (Disponible en remote partout)",
    githubUrl: "https://github.com",
    linkedinUrl: "https://linkedin.com",
    availabilityText: "Ouvert aux nouveaux projets",
  },
};

const SETTINGS_FILE_PATH = path.join(process.cwd(), "src/data/settings.json");

let memorySettings: SiteSettings | null = null;

export async function getSiteSettings(): Promise<SiteSettings> {
  if (memorySettings) {
    return memorySettings;
  }

  try {
    if (fs.existsSync(SETTINGS_FILE_PATH)) {
      const data = fs.readFileSync(SETTINGS_FILE_PATH, "utf-8");
      memorySettings = JSON.parse(data);
      return memorySettings as SiteSettings;
    }
  } catch (err) {
    console.warn("Could not read settings.json:", err);
  }

  memorySettings = DEFAULT_SITE_SETTINGS;
  return memorySettings;
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
    estimator: updated.estimator
      ? { ...current.estimator, ...updated.estimator }
      : current.estimator,
  };

  memorySettings = merged;

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
