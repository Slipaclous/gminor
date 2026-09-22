import fs from "fs";
import path from "path";
import { prisma, type Prisma } from "@/lib/prisma";

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
  pillars: PillarItem[];
  services: ServiceItem[];
  estimator: EstimatorSettings;
  faqs: FaqItem[];
  contactInfo: ContactInfoSettings;
}

export const DEFAULT_SITE_SETTINGS: SiteSettings = {
  hero: {
    badge: "Gauthier Minor • Créateur de Sites & Solutions Web pour PME",
    title: "Un site web moderne, ultra-rapide et conçu pour attirer vos clients.",
    subtitle:
      "Artisans, commerçants, PME et structures locales : je conçois votre présence en ligne sur-mesure, performante sur Google et simple à gérer, sans abonnement ni frais cachés.",
    available: true,
    metrics: [
      { value: "< 0.4s", label: "Affichage instantané" },
      { value: "100%", label: "Visibilité & SEO Google" },
      { value: "5+ ans", label: "Expertise technique" },
    ],
  },
  pillars: [
    {
      id: 1,
      title: "Vitesse d'Affichage & Conversion",
      tagline: "Un site qui s'ouvre en un éclair sur smartphone",
      description:
        "Vos clients n'attendent pas. Un chargement sous 0.4s garantit un meilleur positionnement sur Google et maximise vos demandes de contact et devis.",
      points: [
        "Score Google PageSpeed 100/100 garanti",
        "Expérience fluide sur mobile, tablette et PC",
        "Zéro perte de prospects due aux lenteurs",
      ],
    },
    {
      id: 2,
      title: "Fiabilité & Zéro Panne",
      tagline: "Un développement robuste conçu pour durer",
      description:
        "Fini les usines à gaz et les plugins fragiles qui cassent à la moindre mise à jour. Votre site est bâti sur des technologies modernes, stables et sécurisées.",
      points: [
        "Code soigné sans bricolage ni dépendances superflues",
        "Sécurisation maximale contre le piratage et les spams",
        "Continuité de service et sauvegardes automatiques",
      ],
    },
    {
      id: 3,
      title: "Design Sur-Mesure & Image Pro",
      tagline: "Une identité visuelle qui inspire confiance",
      description:
        "Zéro template générique vu partout. Votre site reflète fidèlement la qualité de votre travail et met en valeur vos prestations et réalisations.",
      points: [
        "Conception graphique soignée et personnalisée",
        "Mise en valeur de vos avis clients et coordonnées",
        "Parcours clair pour transformer les visiteurs en clients",
      ],
    },
    {
      id: 4,
      title: "Autonomie Totale & Zéro Frais Cachés",
      tagline: "Modifiez vos textes et photos sans payer un prestataire",
      description:
        "Vous restez 100% propriétaire de votre site et disposez d'un espace d'administration simple pour actualiser vos tarifs, horaires et photos en quelques clics.",
      points: [
        "Panneau d'administration épuré et facile à prendre en main",
        "Aucun abonnement mensuel obligatoire imposé",
        "Accompagnement et support technique inclus 30 jours",
      ],
    },
  ],
  services: [
    {
      id: "entreprises",
      badge: "Indépendants, Artisans & PME",
      title: "Site Web Vitrine Haute Performance",
      tagline:
        "Présentez votre activité, valorisez votre savoir-faire et recevez des demandes de devis qualifiées.",
      features: [
        "Design 100% sur-mesure adapté à votre image de marque (zéro template)",
        "Affichage ultra-rapide sur smartphones, tablettes et ordinateurs (< 0.4s)",
        "Optimisation technique complète pour le référencement Google local (SEO)",
        "Espace d'administration simple pour modifier vos textes, photos et tarifs",
        "Formulaire de devis / contact sécurisé avec notification email instantanée",
        "Hébergement rapide, nom de domaine & certificat de sécurité SSL inclus",
        "Accompagnement, formation à l'utilisation et support 30 jours offerts",
      ],
      idealFor: "Artisans, commerces de proximité, cabinets libéraux, PME et prestataires.",
      deliveryTime: "2 à 4 semaines",
    },
    {
      id: "audit",
      badge: "Commerce & Vente en Ligne",
      title: "Boutique E-Commerce & PrestaShop",
      tagline:
        "Vendez vos produits en ligne avec un parcours d'achat fluide, sécurisé et pensé pour maximiser les ventes.",
      features: [
        "Spécialiste PrestaShop reconnu (création, refonte ou migration v1.6 à v9)",
        "Paiements sécurisés (cartes bancaires, Bancontact, Apple Pay, Stripe, PayPal)",
        "Gestion simple du catalogue, des stocks, des transporteurs et des factures",
        "Optimisation de la vitesse pour réduire les abandons de panier",
        "Possibilité de développement de modules personnalisés selon vos besoins métier",
      ],
      idealFor: "Boutiques physiques se lançant en ligne, marques et e-commerçants établis.",
      deliveryTime: "3 à 6 semaines",
    },
    {
      id: "tech",
      badge: "Gestion & Digitalisation",
      title: "Outils Métier & Espaces Clients Sur-Mesure",
      tagline:
        "Automatisez vos processus chronophages : réservations, inscriptions, devis en ligne et gestion interne.",
      features: [
        "Remplacement des formulaires papier et fichiers Excel complexes",
        "Espaces membres sécurisés pour vos clients ou collaborateurs",
        "Génération automatique de devis, factures ou attestations au format PDF",
        "Connexion avec vos outils existants (agenda, logiciel de caisse, CRM, webhooks)",
        "Interface intuitive développée sur-mesure selon votre métier",
      ],
      idealFor: "PME souhaitant gagner du temps, clubs, hôtels, centres de formation et services.",
      deliveryTime: "3 à 8 semaines",
    },
  ],
  estimator: {
    projectTypes: [
      {
        id: "vitrine",
        name: "Site Vitrine & Entreprise",
        price: 1500,
        days: 10,
      },
      {
        id: "refonte",
        name: "Refonte, Migration & Optimisation",
        price: 1200,
        days: 7,
      },
      {
        id: "ecommerce",
        name: "Boutique E-Commerce (PrestaShop / Custom)",
        price: 3200,
        days: 18,
      },
      {
        id: "saas",
        name: "Application Web / SaaS",
        price: 4800,
        days: 25,
      },
    ],
    addons: [
      {
        id: "admin",
        name: "Espace Admin & Back-office sur-mesure",
        price: 600,
        days: 4,
      },
      {
        id: "seo",
        name: "Optimisation SEO & Vitesse Google (Score 98+)",
        price: 400,
        days: 2,
      },
      {
        id: "stripe",
        name: "Paiement en ligne / Abonnements (Stripe)",
        price: 600,
        days: 3,
      },
      {
        id: "cms",
        name: "Gestionnaire de contenus dynamique",
        price: 450,
        days: 2,
      },
    ],
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

const SETTINGS_FILE_PATH = path.join(process.cwd(), "src/data/settings.json");

export async function getSiteSettings(): Promise<SiteSettings> {
  // 1. Essayer depuis Neon DB en priorité
  try {
    if (process.env.DATABASE_URL && !process.env.DATABASE_URL.includes("localhost:5432")) {
      const dbSetting = await prisma.siteSetting.findUnique({
        where: { id: "default" },
      });
      if (dbSetting?.data) {
        return dbSetting.data as unknown as SiteSettings;
      }
    }
  } catch (err) {
    console.warn("Neon DB SiteSetting read fallback:", err);
  }

  // 2. Fallback vers settings.json local
  try {
    if (fs.existsSync(SETTINGS_FILE_PATH)) {
      const data = fs.readFileSync(SETTINGS_FILE_PATH, "utf-8");
      return JSON.parse(data) as SiteSettings;
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
    estimator: updated.estimator
      ? { ...current.estimator, ...updated.estimator }
      : current.estimator,
  };

  // 1. Sauvegarder dans Neon PostgreSQL
  try {
    if (process.env.DATABASE_URL && !process.env.DATABASE_URL.includes("localhost:5432")) {
      await prisma.siteSetting.upsert({
        where: { id: "default" },
        update: { data: merged as unknown as Prisma.InputJsonValue },
        create: { id: "default", data: merged as unknown as Prisma.InputJsonValue },
      });
    }
  } catch (err) {
    console.error("Neon DB SiteSetting write error:", err);
  }

  // 2. Sauvegarder dans le fichier local
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
