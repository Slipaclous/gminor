"use server";

import { revalidatePath } from "next/cache";
import { verifyAdminSession } from "@/lib/auth";
import {
  updateSiteSettings,
  ExpertiseItem,
  FaqItem,
  HeroMetric,
} from "@/lib/settings-service";

export interface SettingsFormState {
  error?: string;
  success?: boolean;
}

/** Settings feed the layout (footer, global search), so refresh every page. */
function revalidateSite() {
  revalidatePath("/", "layout");
}

function lines(value: FormDataEntryValue | null): string[] {
  return String(value ?? "")
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);
}

function parseJson<T>(value: FormDataEntryValue | null): T | null {
  try {
    return JSON.parse(String(value ?? "")) as T;
  } catch {
    return null;
  }
}

export async function saveHeroSettingsAction(
  _prevState: SettingsFormState | null,
  formData: FormData
): Promise<SettingsFormState> {
  const isAuth = await verifyAdminSession();
  if (!isAuth) {
    return { error: "Non autorisé" };
  }

  const intro = (formData.get("intro") as string)?.trim();
  const terminal = lines(formData.get("terminal"));
  const metrics = parseJson<HeroMetric[]>(formData.get("metricsJson"));

  if (!intro) return { error: "Le texte d'introduction est obligatoire." };
  if (terminal.length === 0) return { error: "Le terminal doit contenir au moins une ligne." };
  if (!metrics) return { error: "Format des chiffres invalide." };

  await updateSiteSettings({
    hero: {
      available: formData.get("available") === "on",
      intro,
      terminal,
      metrics: metrics.filter((m) => m.value.trim() && m.label.trim()).slice(0, 4),
    },
  });

  revalidateSite();
  return { success: true };
}

export async function saveExpertiseSettingsAction(
  _prevState: SettingsFormState | null,
  formData: FormData
): Promise<SettingsFormState> {
  const isAuth = await verifyAdminSession();
  if (!isAuth) {
    return { error: "Non autorisé" };
  }

  const items = parseJson<ExpertiseItem[]>(formData.get("expertiseJson"));
  if (!items) return { error: "Format invalide pour le savoir-faire." };

  const expertise = items
    .map((item) => ({
      title: item.title.trim(),
      text: item.text.trim(),
      tags: item.tags.map((t) => t.trim()).filter(Boolean),
    }))
    .filter((item) => item.title);
  if (expertise.length === 0) return { error: "Gardez au moins un savoir-faire." };

  await updateSiteSettings({ expertise });

  revalidateSite();
  return { success: true };
}

export async function saveAboutSettingsAction(
  _prevState: SettingsFormState | null,
  formData: FormData
): Promise<SettingsFormState> {
  const isAuth = await verifyAdminSession();
  if (!isAuth) {
    return { error: "Non autorisé" };
  }

  const title = (formData.get("title") as string)?.trim();
  const titleAccent = (formData.get("titleAccent") as string)?.trim() ?? "";
  const paragraphs = String(formData.get("paragraphs") ?? "")
    .split(/\n\s*\n/)
    .map((p) => p.replace(/\s*\n\s*/g, " ").trim())
    .filter(Boolean);
  const stack = String(formData.get("stack") ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  if (!title) return { error: "Le titre est obligatoire." };

  await updateSiteSettings({ about: { title, titleAccent, paragraphs, stack } });

  revalidateSite();
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

  revalidateSite();
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
  const phone = (formData.get("phone") as string)?.trim() || "";
  const location = (formData.get("location") as string)?.trim();
  const githubUrl = (formData.get("githubUrl") as string)?.trim();
  const linkedinUrl = (formData.get("linkedinUrl") as string)?.trim();
  const twitterUrl = (formData.get("twitterUrl") as string)?.trim() || "";
  const instagramUrl = (formData.get("instagramUrl") as string)?.trim() || "";
  const calcomUrl = (formData.get("calcomUrl") as string)?.trim() || "";
  const availabilityText = (formData.get("availabilityText") as string)?.trim();
  const workingHours = (formData.get("workingHours") as string)?.trim() || "";

  await updateSiteSettings({
    contactInfo: {
      email: email || "contact@gauthierminor.com",
      phone,
      location: location || "Belgique (Bruxelles / Enghien / Wallonie) • Remote",
      githubUrl: githubUrl || "https://github.com/Slipaclous",
      linkedinUrl: linkedinUrl || "https://linkedin.com/in/gauthier-minor",
      twitterUrl,
      instagramUrl,
      calcomUrl,
      availabilityText: availabilityText || "Disponible pour nouveaux projets",
      workingHours,
    },
  });

  revalidateSite();
  return { success: true };
}
