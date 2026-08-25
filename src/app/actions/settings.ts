"use server";

import { revalidatePath } from "next/cache";
import { verifyAdminSession } from "@/lib/auth";
import {
  getSiteSettings,
  updateSiteSettings,
  PillarItem,
  ServiceItem,
  FaqItem,
} from "@/lib/settings-service";

export interface SettingsFormState {
  error?: string;
  success?: boolean;
}

export async function saveHeroSettingsAction(
  _prevState: SettingsFormState | null,
  formData: FormData
): Promise<SettingsFormState> {
  const isAuth = await verifyAdminSession();
  if (!isAuth) {
    return { error: "Non autorisé" };
  }

  const badge = (formData.get("badge") as string)?.trim();
  const title = (formData.get("title") as string)?.trim();
  const subtitle = (formData.get("subtitle") as string)?.trim();
  const available = formData.get("available") === "on" || formData.get("available") === "true";

  const metric1Val = (formData.get("metric1Val") as string)?.trim();
  const metric1Label = (formData.get("metric1Label") as string)?.trim();
  const metric2Val = (formData.get("metric2Val") as string)?.trim();
  const metric2Label = (formData.get("metric2Label") as string)?.trim();
  const metric3Val = (formData.get("metric3Val") as string)?.trim();
  const metric3Label = (formData.get("metric3Label") as string)?.trim();

  await updateSiteSettings({
    hero: {
      badge: badge || "Gauthier Minor • Ingénieur Full-Stack & UI Architect",
      title: title || "Ingénierie logicielle & design web d'exception.",
      subtitle: subtitle || "",
      available,
      metrics: [
        { value: metric1Val || "< 0.4s", label: metric1Label || "Temps de chargement moyen" },
        { value: metric2Val || "100%", label: metric2Label || "Score de performance Google" },
        { value: metric3Val || "5+ ans", label: metric3Label || "Expérience Full-Stack" },
      ],
    },
  });

  revalidatePath("/");
  return { success: true };
}

export async function savePillarsSettingsAction(
  _prevState: SettingsFormState | null,
  formData: FormData
): Promise<SettingsFormState> {
  const isAuth = await verifyAdminSession();
  if (!isAuth) {
    return { error: "Non autorisé" };
  }

  const pillars: PillarItem[] = [];

  for (let i = 1; i <= 4; i++) {
    const title = (formData.get(`pillar_${i}_title`) as string)?.trim();
    const tagline = (formData.get(`pillar_${i}_tagline`) as string)?.trim();
    const description = (formData.get(`pillar_${i}_description`) as string)?.trim();
    const pointsRaw = (formData.get(`pillar_${i}_points`) as string) || "";
    const points = pointsRaw
      .split("\n")
      .map((s: string) => s.trim())
      .filter(Boolean);

    pillars.push({
      id: i,
      title: title || `Pilier ${i}`,
      tagline: tagline || "",
      description: description || "",
      points: points.length > 0 ? points : ["Point standard 1", "Point standard 2"],
    });
  }

  await updateSiteSettings({ pillars });

  revalidatePath("/");
  return { success: true };
}

export async function saveServicesSettingsAction(
  _prevState: SettingsFormState | null,
  formData: FormData
): Promise<SettingsFormState> {
  const isAuth = await verifyAdminSession();
  if (!isAuth) {
    return { error: "Non autorisé" };
  }

  const services: ServiceItem[] = [
    {
      id: "entreprises",
      badge: (formData.get("srv_1_badge") as string)?.trim() || "Sites Vitrines & PME",
      title: (formData.get("srv_1_title") as string)?.trim() || "Site Web Haute Performance",
      tagline: (formData.get("srv_1_tagline") as string)?.trim() || "",
      idealFor: (formData.get("srv_1_idealFor") as string)?.trim() || "",
      deliveryTime: (formData.get("srv_1_deliveryTime") as string)?.trim() || "2 à 4 semaines",
      features: ((formData.get("srv_1_features") as string) || "")
        .split("\n")
        .map((s: string) => s.trim())
        .filter(Boolean),
    },
    {
      id: "tech",
      badge: (formData.get("srv_2_badge") as string)?.trim() || "Startups & SaaS",
      title: (formData.get("srv_2_title") as string)?.trim() || "Développement Application Web",
      tagline: (formData.get("srv_2_tagline") as string)?.trim() || "",
      idealFor: (formData.get("srv_2_idealFor") as string)?.trim() || "",
      deliveryTime: (formData.get("srv_2_deliveryTime") as string)?.trim() || "3 à 8 semaines",
      features: ((formData.get("srv_2_features") as string) || "")
        .split("\n")
        .map((s: string) => s.trim())
        .filter(Boolean),
    },
    {
      id: "audit",
      badge: (formData.get("srv_3_badge") as string)?.trim() || "Modernisation & Vitesse",
      title: (formData.get("srv_3_title") as string)?.trim() || "Audit & Optimisation Technique",
      tagline: (formData.get("srv_3_tagline") as string)?.trim() || "",
      idealFor: (formData.get("srv_3_idealFor") as string)?.trim() || "",
      deliveryTime: (formData.get("srv_3_deliveryTime") as string)?.trim() || "3 à 7 jours ouvrés",
      features: ((formData.get("srv_3_features") as string) || "")
        .split("\n")
        .map((s: string) => s.trim())
        .filter(Boolean),
    },
  ];

  await updateSiteSettings({ services });

  revalidatePath("/services");
  return { success: true };
}

export async function saveEstimatorSettingsAction(
  _prevState: SettingsFormState | null,
  formData: FormData
): Promise<SettingsFormState> {
  const isAuth = await verifyAdminSession();
  if (!isAuth) {
    return { error: "Non autorisé" };
  }

  const projectTypes = [
    {
      id: "vitrine",
      name: (formData.get("type_vitrine_name") as string)?.trim() || "Site Vitrine & Entreprise",
      price: Number(formData.get("type_vitrine_price")) || 2500,
      days: Number(formData.get("type_vitrine_days")) || 14,
    },
    {
      id: "saas",
      name: (formData.get("type_saas_name") as string)?.trim() || "Application Web / SaaS",
      price: Number(formData.get("type_saas_price")) || 6500,
      days: Number(formData.get("type_saas_days")) || 30,
    },
    {
      id: "ecommerce",
      name: (formData.get("type_ecommerce_name") as string)?.trim() || "Boutique E-Commerce",
      price: Number(formData.get("type_ecommerce_price")) || 4500,
      days: Number(formData.get("type_ecommerce_days")) || 21,
    },
    {
      id: "refonte",
      name: (formData.get("type_refonte_name") as string)?.trim() || "Refonte & Modernisation",
      price: Number(formData.get("type_refonte_price")) || 2000,
      days: Number(formData.get("type_refonte_days")) || 10,
    },
  ];

  const addons = [
    {
      id: "admin",
      name: (formData.get("addon_admin_name") as string)?.trim() || "Espace Admin & Back-office sur-mesure",
      price: Number(formData.get("addon_admin_price")) || 800,
      days: Number(formData.get("addon_admin_days")) || 5,
    },
    {
      id: "seo",
      name: (formData.get("addon_seo_name") as string)?.trim() || "Optimisation SEO & Vitesse Google (Score 98+)",
      price: Number(formData.get("addon_seo_price")) || 500,
      days: Number(formData.get("addon_seo_days")) || 3,
    },
    {
      id: "stripe",
      name: (formData.get("addon_stripe_name") as string)?.trim() || "Paiement en ligne / Abonnements (Stripe)",
      price: Number(formData.get("addon_stripe_price")) || 900,
      days: Number(formData.get("addon_stripe_days")) || 4,
    },
    {
      id: "cms",
      name: (formData.get("addon_cms_name") as string)?.trim() || "Gestionnaire de contenus dynamique",
      price: Number(formData.get("addon_cms_price")) || 600,
      days: Number(formData.get("addon_cms_days")) || 3,
    },
  ];

  await updateSiteSettings({
    estimator: {
      projectTypes,
      addons,
    },
  });

  revalidatePath("/services");
  return { success: true };
}

export async function saveFaqSettingsAction(
  _prevState: SettingsFormState | null,
  formData: FormData
): Promise<SettingsFormState> {
  const isAuth = await verifyAdminSession();
  if (!isAuth) {
    return { error: "Non autorisé" };
  }

  const rawJson = (formData.get("faqsJson") as string)?.trim();
  let faqs: FaqItem[] = [];

  try {
    if (rawJson) {
      faqs = JSON.parse(rawJson);
    }
  } catch (err) {
    return { error: "Format JSON invalide pour la FAQ" };
  }

  await updateSiteSettings({ faqs });

  revalidatePath("/faq");
  revalidatePath("/services");
  return { success: true };
}

export async function saveContactInfoSettingsAction(
  _prevState: SettingsFormState | null,
  formData: FormData
): Promise<SettingsFormState> {
  const isAuth = await verifyAdminSession();
  if (!isAuth) {
    return { error: "Non autorisé" };
  }

  const email = (formData.get("email") as string)?.trim();
  const location = (formData.get("location") as string)?.trim();
  const githubUrl = (formData.get("githubUrl") as string)?.trim();
  const linkedinUrl = (formData.get("linkedinUrl") as string)?.trim();
  const availabilityText = (formData.get("availabilityText") as string)?.trim();

  await updateSiteSettings({
    contactInfo: {
      email: email || "contact@gauthierminor.dev",
      location: location || "Paris, France (Disponible en remote partout)",
      githubUrl: githubUrl || "https://github.com",
      linkedinUrl: linkedinUrl || "https://linkedin.com",
      availabilityText: availabilityText || "Ouvert aux nouveaux projets",
    },
  });

  revalidatePath("/");
  revalidatePath("/contact");
  revalidatePath("/services");
  return { success: true };
}
