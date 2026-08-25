"use server";

import { validatePassword, setAdminSession, clearAdminSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export interface LoginState {
  error?: string;
  success?: boolean;
}

export async function loginAdminAction(
  _prevState: LoginState | null,
  formData: FormData
): Promise<LoginState> {
  const password = (formData.get("password") as string)?.trim();

  if (!password) {
    return { error: "Veuillez saisir votre mot de passe administrateur." };
  }

  if (!validatePassword(password)) {
    return { error: "Mot de passe incorrect." };
  }

  await setAdminSession();
  redirect("/admin");
}

export async function logoutAdminAction() {
  await clearAdminSession();
  redirect("/admin/login");
}
