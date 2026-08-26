"use server";

import { revalidatePath } from "next/cache";
import { verifyAdminSession } from "@/lib/auth";
import {
  getSiteSettings,
  updateSiteSettings,
  PillarItem,
  ServiceItem,
  FaqItem,
  EstimatorOption,
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

  const projectTypesJson = (formData.get("projectTypesJson") as string)?.trim();
  const addonsJson = (formData.get("addonsJson") as string)?.trim();

  let projectTypes: EstimatorOption[] = [];
  let addons: EstimatorOption[] = [];

  try {
    if (projectTypesJson) {
      projectTypes = JSON.parse(projectTypesJson);
    }
  } catch (err) {
    console.error("Erreur parsing projectTypesJson:", err);
  }

  try {
    if (addonsJson) {
      addons = JSON.parse(addonsJson);
    }
  } catch (err) {
    console.error("Erreur parsing addonsJson:", err);
  }

  if (projectTypes.length === 0) {
    return { error: "Vous devez conserver au moins un type de projet principal." };
  }

  await updateSiteSettings({
    estimator: {
      projectTypes,
      addons,
    },
  });

  revalidatePath("/services");
  revalidatePath("/admin/contenu");
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
