import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SiteShell } from "@/components/layout/site-shell";
import { Footer } from "@/components/layout/footer";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { FilmGrain } from "@/components/ui/film-grain";
import { RecaptchaScript } from "@/components/ui/recaptcha-script";
import { CommandMenu } from "@/components/ui/command-menu";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

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
    "Freelance Belgique",
    "Développeur Web Enghien",
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
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://gminor.dev/#person",
      name: "Gauthier Minor",
      jobTitle: "Développeur Full-Stack & UI Architect",
      url: "https://gminor.dev",
      image: "https://gminor.dev/opengraph-image",
      description:
        "Développeur Full-Stack expérimenté spécialisé dans Next.js, PrestaShop (migrations v1.6 à v9), Symfony, PostgreSQL et MySQL.",
      knowsAbout: [
        "Next.js",
        "React",
        "TypeScript",
        "PrestaShop",
        "PrestaShop Migration",
        "PHP",
        "Symfony",
        "PostgreSQL",
        "MySQL",
        "Prisma ORM",
        "E-Commerce Architecture",
        "SaaS Architecture",
        "Web Performance Optimization",
        "Core Web Vitals",
      ],
      address: {
        "@type": "PostalAddress",
        addressLocality: "Enghien",
        addressCountry: "BE",
      },
      sameAs: [
        "https://github.com/Slipaclous",
        "https://linkedin.com",
      ],
    },
    {
      "@type": "ProfessionalService",
      "@id": "https://gminor.dev/#service",
      name: "Gauthier Minor — Développement Web & Solutions Logiciel",
      url: "https://gminor.dev",
      image: "https://gminor.dev/opengraph-image",
      founder: { "@id": "https://gminor.dev/#person" },
      priceRange: "€€",
      areaServed: ["BE", "FR", "CH", "LU", "Remote"],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Services de Développement",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Site Web Haute Performance & CMS",
              description: "Création de sites vitrines sur-mesure rapides (<0.4s), optimisés SEO et administrables.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Développement Application Web & SaaS",
              description: "Conception d'architectures applicatives complètes (Next.js, Symfony, PostgreSQL, Stripe).",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "PrestaShop, Migration & Optimisation E-Commerce",
              description: "Migration de PrestaShop 1.6 vers v9, modules personnalisés et optimisation des requêtes SQL.",
            },
          },
        ],
      },
    },
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
        <link rel="alternate" type="text/markdown" href="/llms.txt" title="Documentation LLM" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-black text-zinc-100 relative selection:bg-[#c96442] selection:text-white">
        <ScrollProgress />
        <FilmGrain />
        <RecaptchaScript />
        <CommandMenu />
        <SiteShell footer={<Footer />}>
          {children}
        </SiteShell>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
