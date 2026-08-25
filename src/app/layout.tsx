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
  metadataBase: new URL("https://gminor.dev"),
  title: {
    default: "Gauthier Minor — Développeur Full-Stack & UI Architect",
    template: "%s | Gauthier Minor",
  },
  description:
    "Développeur Full-Stack & Architecte Web. Création d'applications SaaS robustes, plateformes e-commerce PrestaShop à fort trafic et sites vitrines haute performance (Next.js, Symfony, PostgreSQL, MySQL).",
  keywords: [
    "Gauthier Minor",
    "Développeur Full-Stack",
    "Développeur PrestaShop",
    "Développeur Next.js",
    "Expert Symfony PHP",
    "Création site web entreprise",
    "Développement SaaS",
    "Migration PrestaShop 9",
    "PostgreSQL Prisma",
  ],
  authors: [{ name: "Gauthier Minor", url: "https://gminor.dev" }],
  creator: "Gauthier Minor",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://gminor.dev",
    siteName: "Gauthier Minor Portfolio",
    title: "Gauthier Minor — Développeur Full-Stack & Solutions Web",
    description:
      "Applications SaaS modernes, boutiques PrestaShop à fort trafic & sites vitrines haute performance. Rigueur d'ingénierie et design d'exception.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gauthier Minor — Développeur Full-Stack",
    description:
      "Conception de plateformes SaaS, boutiques PrestaShop & sites d'entreprises haute performance.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
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

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Gauthier Minor — Développeur Web Full-Stack",
  image: "https://gminor.dev/opengraph-image",
  description:
    "Développement d'applications SaaS, boutiques e-commerce PrestaShop et sites vitrines haute performance sur-mesure.",
  url: "https://gminor.dev",
  telephone: "",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Enghien",
    addressCountry: "BE",
  },
  priceRange: "€€",
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "09:00",
    closes: "18:00",
  },
  sameAs: [
    "https://github.com",
    "https://linkedin.com",
  ],
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
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-black text-zinc-100">
        <SiteShell footer={<Footer />}>
          {children}
        </SiteShell>
      </body>
    </html>
  );
}
