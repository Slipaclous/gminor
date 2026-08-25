import React from "react";
import { verifyAdminSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { ProjectForm } from "@/components/admin/project-form";

export default async function AdminNewProjectPage() {
  const isAuth = await verifyAdminSession();
  if (!isAuth) {
    redirect("/admin/login");
  }

  return (
    <div className="p-6 sm:p-10">
      <ProjectForm isEdit={false} />
    </div>
  );
}
