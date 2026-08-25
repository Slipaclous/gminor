import React from "react";
import { verifyAdminSession } from "@/lib/auth";
import { redirect, notFound } from "next/navigation";
import { getDbProjectById } from "@/lib/projects-service";
import { ProjectForm } from "@/components/admin/project-form";

interface AdminEditProjectPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function AdminEditProjectPage({
  params,
}: AdminEditProjectPageProps) {
  const isAuth = await verifyAdminSession();
  if (!isAuth) {
    redirect("/admin/login");
  }

  const { id } = await params;
  const project = await getDbProjectById(id);

  if (!project) {
    notFound();
  }

  return (
    <div className="p-6 sm:p-10">
      <ProjectForm initialData={project} isEdit={true} />
    </div>
  );
}
