"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Header } from "./header";
import { ToastProvider } from "../ui/toast";
import { CommandMenu } from "../ui/command-menu";

interface SiteShellProps {
  children: React.ReactNode;
  footer: React.ReactNode;
}

export function SiteShell({ children, footer }: SiteShellProps) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) {
    return (
      <ToastProvider>
        <div className="flex-1 flex flex-col">{children}</div>
      </ToastProvider>
    );
  }

  return (
    <ToastProvider>
      <Header />
      <div className="flex-1 flex flex-col">{children}</div>
      {footer}
      <CommandMenu />
    </ToastProvider>
  );
}
