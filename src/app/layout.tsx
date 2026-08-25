import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SiteShell } from "@/components/layout/site-shell";
import { Footer } from "@/components/layout/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Gauthier Minor — Développeur Full-Stack & Solutions Web",
    template: "%s | Gauthier Minor",
  },
  description:
    "Développeur Full-Stack. Créateur d'applications SaaS robustes et de sites d'entreprises haute performance (Next.js, TypeScript, PostgreSQL, Prisma).",
  keywords: [
    "Gauthier Minor",
    "Développeur Full-Stack",
    "Next.js",
    "Prisma",
    "React",
    "PostgreSQL",
    "Création site web entreprise",
    "Développement SaaS",
    "Freelance Tech Paris",
  ],
  authors: [{ name: "Gauthier Minor" }],
  creator: "Gauthier Minor",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://gauthierminor.dev",
    siteName: "Gauthier Minor Portfolio",
    title: "Gauthier Minor — Développeur Full-Stack & Solutions Web",
    description:
      "Applications SaaS modernes & sites d'entreprises performants. Alliez rigueur technique et design d'impact.",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable} dark antialiased scroll-smooth`}
    >
      <body className="min-h-screen flex flex-col bg-black text-zinc-100">
        <SiteShell footer={<Footer />}>
          {children}
        </SiteShell>
      </body>
    </html>
  );
}
