import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { verifyAdminSession } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const isAuth = await verifyAdminSession();
    if (!isAuth) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file || file.size === 0) {
      return NextResponse.json({ error: "Aucun fichier sélectionné" }, { status: 400 });
    }

    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { error: "Le fichier doit être une image valide (PNG, JPG, WebP, SVG)" },
        { status: 400 }
      );
    }

    // 5MB max
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: "L'image dépasse la limite de 5 Mo" },
        { status: 400 }
      );
    }

    const cleanName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
    const filename = `projects/${Date.now()}-${cleanName}`;

    const blob = await put(filename, file, {
      access: "public",
      addRandomSuffix: true,
    });

    return NextResponse.json({ url: blob.url });
  } catch (error: any) {
    console.error("Erreur API upload blob:", error);
    return NextResponse.json(
      { error: error?.message || "Erreur interne lors du téléversement" },
      { status: 500 }
    );
  }
}
