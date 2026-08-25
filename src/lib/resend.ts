import { Resend } from "resend";

const resendApiKey = process.env.RESEND_API_KEY || "";
export const resend = resendApiKey ? new Resend(resendApiKey) : null;

interface SendContactEmailParams {
  name: string;
  email: string;
  company?: string | null;
  service?: string | null;
  budget?: string | null;
  message: string;
}

export async function sendContactNotificationEmail({
  name,
  email,
  company,
  service,
  budget,
  message,
}: SendContactEmailParams): Promise<{ success: boolean; error?: string }> {
  const recipientEmail =
    process.env.CONTACT_NOTIFICATION_EMAIL ||
    process.env.ADMIN_EMAIL ||
    "contact@gauthierminor.dev";

  if (!resend) {
    console.warn("⚠️ RESEND_API_KEY non configurée dans .env. L'email n'a pas été expédié en direct.");
    return { success: true };
  }

  try {
    const { data, error } = await resend.emails.send({
      from: "Portfolio Gauthier Minor <onboarding@resend.dev>",
      to: [recipientEmail],
      replyTo: email,
      subject: `🎯 Nouvelle demande de projet : ${service || "Contact"} - ${name}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0b0c10; color: #ffffff; padding: 40px 20px;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #13141c; border: 1px solid rgba(255,255,255,0.1); border-radius: 16px; padding: 32px;">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 24px; border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 16px;">
              <h2 style="margin: 0; color: #ffffff; font-size: 20px; font-weight: 700;">Nouvelle Demande Reçue</h2>
              <span style="background-color: #10b981; color: #000000; font-size: 11px; font-weight: 700; padding: 4px 10px; border-radius: 20px; text-transform: uppercase;">Direct Portfolio</span>
            </div>

            <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
              <tr>
                <td style="padding: 8px 0; color: #a1a1aa; font-size: 13px; width: 140px;">Nom du prospect :</td>
                <td style="padding: 8px 0; color: #ffffff; font-size: 14px; font-weight: 600;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #a1a1aa; font-size: 13px;">Adresse Email :</td>
                <td style="padding: 8px 0; color: #ffffff; font-size: 14px; font-weight: 600;"><a href="mailto:${email}" style="color: #10b981; text-decoration: none;">${email}</a></td>
              </tr>
              ${company ? `
              <tr>
                <td style="padding: 8px 0; color: #a1a1aa; font-size: 13px;">Entreprise / Activité :</td>
                <td style="padding: 8px 0; color: #ffffff; font-size: 14px; font-weight: 600;">${company}</td>
              </tr>` : ""}
              ${service ? `
              <tr>
                <td style="padding: 8px 0; color: #a1a1aa; font-size: 13px;">Prestation souhaitée :</td>
                <td style="padding: 8px 0; color: #ffffff; font-size: 14px; font-weight: 600;">${service}</td>
              </tr>` : ""}
              ${budget ? `
              <tr>
                <td style="padding: 8px 0; color: #a1a1aa; font-size: 13px;">Budget estimé :</td>
                <td style="padding: 8px 0; color: #10b981; font-size: 14px; font-weight: 700;">${budget}</td>
              </tr>` : ""}
            </table>

            <div style="background-color: #070709; border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 20px; margin-bottom: 24px;">
              <span style="display: block; color: #71717a; font-size: 11px; text-transform: uppercase; font-weight: 700; margin-bottom: 8px;">Détails & Préférences :</span>
              <p style="margin: 0; color: #f4f4f7; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${message}</p>
            </div>

            <div style="text-align: center;">
              <a href="mailto:${email}?subject=Re: Votre demande de projet - Gauthier Minor" style="display: inline-block; background-color: #ffffff; color: #000000; text-decoration: none; font-weight: 700; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px; padding: 12px 24px; border-radius: 10px;">
                Répondre au prospect
              </a>
            </div>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error("Erreur Resend:", error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err: any) {
    console.error("Erreur envoi email Resend:", err);
    return { success: false, error: err?.message || "Erreur inconnue" };
  }
}
