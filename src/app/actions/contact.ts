"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { sendContactNotificationEmail } from "@/lib/resend";
import { verifyRecaptchaToken } from "@/lib/recaptcha";

export interface ContactState {
  errors?: {
    name?: string[];
    email?: string[];
    message?: string[];
  };
  message?: string;
  success?: boolean;
}

export async function submitContactForm(
  _prevState: ContactState | null,
  formData: FormData
): Promise<ContactState> {
  const name = (formData.get("name") as string)?.trim();
  const email = (formData.get("email") as string)?.trim();
  const company = (formData.get("company") as string)?.trim() || null;
  const budget = (formData.get("budget") as string)?.trim() || null;
  const service = (formData.get("service") as string)?.trim() || null;
  const message = (formData.get("message") as string)?.trim();
  const contactPref = (formData.get("contactPref") as string)?.trim() || null;
  const availabilityPref = (formData.get("availabilityPref") as string)?.trim() || null;
  const recaptchaToken =
    (formData.get("g-recaptcha-response") as string) ||
    (formData.get("recaptchaToken") as string) ||
    null;

  // 1. Validation de sécurité anti-spam Google reCAPTCHA v3
  const recaptchaCheck = await verifyRecaptchaToken(recaptchaToken, "contact_form");
  if (!recaptchaCheck.success) {
    return {
      success: false,
      message: recaptchaCheck.error || "Validation de sécurité reCAPTCHA échouée.",
    };
  }

  // 2. Validation basique des champs
  const errors: { name?: string[]; email?: string[]; message?: string[] } = {};

  if (!name || name.length < 2) {
    errors.name = ["Veuillez renseigner votre nom (au moins 2 caractères)."];
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = ["Veuillez renseigner une adresse email valide."];
  }

  if (!message || message.length < 5) {
    errors.message = ["Veuillez préciser votre demande (au moins 5 caractères)."];
  }

  if (Object.keys(errors).length > 0) {
    return {
      errors,
      message: "Veuillez corriger les erreurs dans le formulaire.",
      success: false,
    };
  }

  try {
    // 1. Sauvegarde en Base de Données Neon PostgreSQL
    if (process.env.DATABASE_URL && !process.env.DATABASE_URL.includes("localhost:5432")) {
      await prisma.contactMessage.create({
        data: {
          name,
          email,
          company,
          budget,
          service,
          message,
          contactPref,
          availabilityPref,
          status: "UNREAD",
        },
      });
    }

    // 2. Envoi de l'email de notification via Resend
    await sendContactNotificationEmail({
      name,
      email,
      company,
      service,
      budget,
      message,
      contactPref: contactPref || undefined,
      availabilityPref: availabilityPref || undefined,
    });

    revalidatePath("/admin/messages");
    revalidatePath("/admin");

    return {
      success: true,
      message:
        "Votre demande a bien été transmise ! Je vous recontacte personnellement sous 24h selon vos disponibilités.",
    };
  } catch (error) {
    console.error("Erreur enregistrement contact:", error);
    return {
      success: false,
      message:
        "Une erreur est survenue lors de l'envoi. Vous pouvez m'écrire directement à contact@gauthierminor.dev.",
    };
  }
}
