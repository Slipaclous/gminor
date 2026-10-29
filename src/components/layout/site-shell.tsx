"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { MotionConfig } from "framer-motion";
import { Header } from "./header";
import { ToastProvider } from "../ui/toast";
import { SmoothScroll } from "../motion/smooth-scroll";
import { Cursor } from "../motion/cursor";

interface SiteShellProps {
  children: React.ReactNode;
  footer: React.ReactNode;
  search: React.ReactNode;
  /** A booking link is configured: show the main "Réserver un appel" CTA. */
  canBook: boolean;
}

export function SiteShell({ children, footer, search, canBook }: SiteShellProps) {
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
    <MotionConfig reducedMotion="user">
      <ToastProvider>
        <SmoothScroll />
        <Cursor />
        <div className="grain" aria-hidden />
        {search}
        <Header canBook={canBook} />
        <div className="flex-1 flex flex-col">{children}</div>
        {footer}
      </ToastProvider>
    </MotionConfig>
  );
}
