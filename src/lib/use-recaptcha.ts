"use client";

declare global {
  interface Window {
    grecaptcha?: {
      ready: (callback: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }
}

export async function getRecaptchaToken(action = "contact_form"): Promise<string | null> {
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  if (!siteKey || typeof window === "undefined") {
    return null;
  }

  if (!window.grecaptcha) {
    console.warn("reCAPTCHA script non encore chargé.");
    return null;
  }

  return new Promise((resolve) => {
    window.grecaptcha?.ready(async () => {
      try {
        const token = await window.grecaptcha?.execute(siteKey, { action });
        resolve(token || null);
      } catch (err) {
        console.error("Erreur exécution reCAPTCHA client:", err);
        resolve(null);
      }
    });
  });
}
