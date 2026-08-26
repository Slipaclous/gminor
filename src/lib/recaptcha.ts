interface RecaptchaVerifyResponse {
  success: boolean;
  score?: number;
  action?: string;
  challenge_ts?: string;
  hostname?: string;
  "error-codes"?: string[];
}

export async function verifyRecaptchaToken(
  token: string | null | undefined,
  expectedAction = "contact_form"
): Promise<{ success: boolean; score?: number; error?: string }> {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;

  // Si la clé secrète n'est pas encore configurée (ex: environnement local ou dev),
  // on autorise la soumission tout en avertissant dans les logs.
  if (!secretKey) {
    if (process.env.NODE_ENV === "development") {
      console.warn(
        "⚠️ RECAPTCHA_SECRET_KEY non configurée dans .env.local. Validation bypassée en dev."
      );
    }
    return { success: true, score: 1.0 };
  }

  if (!token) {
    return {
      success: false,
      error: "Token de sécurité reCAPTCHA manquant. Veuillez réessayer.",
    };
  }

  try {
    const params = new URLSearchParams({
      secret: secretKey,
      response: token,
    });

    const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params.toString(),
      cache: "no-store",
    });

    const data: RecaptchaVerifyResponse = await res.json();

    if (!data.success) {
      console.error("reCAPTCHA validation failed:", data["error-codes"]);
      return {
        success: false,
        error: "Échec de la validation de sécurité anti-spam.",
      };
    }

    // reCAPTCHA v3 renvoie un score de 0.0 (bot) à 1.0 (humain)
    const score = data.score ?? 0;
    if (score < 0.5) {
      console.warn(`reCAPTCHA score suspect (${score}) pour l'action ${data.action}`);
      return {
        success: false,
        score,
        error: "Activité suspecte détectée par le filtre anti-spam.",
      };
    }

    return { success: true, score };
  } catch (err: any) {
    console.error("Erreur appel API reCAPTCHA:", err);
    // En cas de panne temporaire des serveurs Google, on ne bloque pas les prospects légitimes
    return { success: true, score: 0.8 };
  }
}
