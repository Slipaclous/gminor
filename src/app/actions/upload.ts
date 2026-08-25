"use server";

import { put } from "@vercel/blob";
import { verifyAdminSession } from "@/lib/auth";

export async function uploadImageAction(formData: FormData): Promise<{ url?: string; error?: string }> {
  const isAuth = await verifyAdminSession();
  if (!isAuth) {
    return { error: "Non autorisé" };
  }

  const file = formData.get("file") as File;
  if (!file || file.size === 0) {
    return { error: "Aucun fichier sélectionné" };
  }

  if (!file.type.startsWith("image/")) {
    return { error: "Le fichier doit être une image (PNG, JPG, WEBP, SVG)" };
  }

  // Max 5MB
  if (file.size > 5 * 1024 * 1024) {
    return { error: "L'image ne doit pas dépasser 5 Mo" };
  }

  try {
    const filename = `projects/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
    const blob = await put(filename, file, {
      access: "public",
      addRandomSuffix: true,
    });

    return { url: blob.url };
  } catch (err: any) {
    console.error("Erreur upload Vercel Blob:", err);
    return { error: err?.message || "Erreur lors de l'upload vers Vercel Blob" };
  }
}
