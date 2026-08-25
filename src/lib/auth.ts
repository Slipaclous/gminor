import { cookies } from "next/headers";

const ADMIN_COOKIE_NAME = "gm_admin_session";
const DEFAULT_ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";

// Simple signature token based on configured password
function getExpectedToken(): string {
  return Buffer.from(`gm_admin_authenticated_${DEFAULT_ADMIN_PASSWORD}`).toString("base64");
}

export async function verifyAdminSession(): Promise<boolean> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(ADMIN_COOKIE_NAME);
  if (!sessionCookie || !sessionCookie.value) {
    return false;
  }
  return sessionCookie.value === getExpectedToken();
}

export async function setAdminSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(ADMIN_COOKIE_NAME, getExpectedToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 jours
  });
}

export async function clearAdminSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_COOKIE_NAME);
}

export function validatePassword(password: string): boolean {
  return password === DEFAULT_ADMIN_PASSWORD;
}
