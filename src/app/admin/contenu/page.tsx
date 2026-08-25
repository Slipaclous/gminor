import React from "react";
import { verifyAdminSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getSiteSettings } from "@/lib/settings-service";
import { SettingsTabs } from "@/components/admin/settings-tabs";

export const metadata = {
  title: "Gestion des Contenus — Administration Gauthier Minor",
};

export default async function AdminContentPage() {
  const isAuth = await verifyAdminSession();
  if (!isAuth) {
    redirect("/admin/login");
  }

  const settings = await getSiteSettings();

  return (
    <div className="p-6 sm:p-10 space-y-8 max-w-6xl">
      {/* Top Header */}
      <div className="space-y-1 pb-6 border-b border-white/[0.08]">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Personnalisation des Contenus du Site
        </h1>
        <p className="text-sm text-zinc-400">
          Modifiez vos textes, métriques chiffrées, piliers de méthode, tarifs du simulateur et coordonnées en direct.
        </p>
      </div>

      <SettingsTabs initialSettings={settings} />
    </div>
  );
}
