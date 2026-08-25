import React from "react";
import { verifyAdminSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { AdminSidebar } from "@/components/admin/admin-sidebar";

export const metadata = {
  title: "Back-Office Administration — Gauthier Minor",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isAuth = await verifyAdminSession();

  return (
    <div className="min-h-screen bg-[#0a0a0d] text-zinc-100 flex flex-col md:flex-row font-sans">
      {isAuth ? (
        <>
          <AdminSidebar />
          <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
            {children}
          </div>
        </>
      ) : (
        <div className="flex-1 flex flex-col">{children}</div>
      )}
    </div>
  );
}
