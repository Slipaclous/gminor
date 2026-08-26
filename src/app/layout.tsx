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
    default: "Gauthier Minor — Développeur Web Freelance | Enghien, Bruxelles & Belgique",
    template: "%s | Gauthier Minor — Développeur Web",
  },
  description:
    "Développeur web freelance basé à Enghien (Hainaut). Création de sites internet sur-mesure ultra-rapides (<0.4s), applications SaaS et boutiques PrestaShop pour indépendants et PME en Belgique (Bruxelles, Mons, Ath, Tournai) et à distance.",
  keywords: [
    "Développeur web Enghien",
    "Création de site internet Enghien",
    "Développeur web Hainaut",
    "Développeur freelance Belgique",
    "Création site web Bruxelles",
    "Développeur Next.js Belgique",
    "Expert PrestaShop Belgique",
    "Développeur web Mons",
    "Développeur web Ath",
    "Développeur web Tournai",
    "Création site internet Braine-le-Comte",
    "Développeur web Soignies",
    "Développeur web Brabant Wallon",
    "Développeur SaaS freelance",
    "Gauthier Minor",
  ],
  authors: [{ name: "Gauthier Minor", url: "https://gminor.dev" }],
  creator: "Gauthier Minor",
  openGraph: {
    type: "website",
    locale: "fr_BE",
    url: "https://gminor.dev",
    siteName: "Gauthier Minor — Développeur Web Freelance",
    title: "Gauthier Minor — Développeur Web & Architecte Full-Stack | Enghien & Belgique",
    description:
      "Sites vitrines haute performance, plateformes SaaS & boutiques PrestaShop à fort trafic. Ingénierie sur-mesure à Enghien, Bruxelles et toute la Belgique.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gauthier Minor — Développeur Web Freelance (Enghien, Belgique)",
    description:
      "Conception de plateformes SaaS, boutiques PrestaShop & sites web haute performance en Belgique.",
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
      jobTitle: "Développeur Full-Stack & Concepteur Web",
      url: "https://gminor.dev",
      image: "https://gminor.dev/opengraph-image",
      description:
        "Développeur web freelance basé à Enghien (Belgique), expert Next.js, PrestaShop (v1.6 à v9), Symfony, PostgreSQL et MySQL.",
      knowsAbout: [
        "Création de sites internet",
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
        "SEO Local",
      ],
      address: {
        "@type": "PostalAddress",
        streetAddress: "Enghien",
        addressLocality: "Enghien",
        postalCode: "7850",
        addressRegion: "Hainaut",
        addressCountry: "BE",
      },
      sameAs: [
        "https://github.com/Slipaclous",
        "https://linkedin.com",
      ],
    },
    {
      "@type": ["LocalBusiness", "ProfessionalService"],
      "@id": "https://gminor.dev/#service",
      name: "Gauthier Minor — Développeur Web & Création de Sites",
      url: "https://gminor.dev",
      image: "https://gminor.dev/opengraph-image",
      founder: { "@id": "https://gminor.dev/#person" },
      priceRange: "€€",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Enghien",
        addressLocality: "Enghien",
        postalCode: "7850",
        addressRegion: "Hainaut",
        addressCountry: "BE",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 50.693,
        longitude: 4.041,
      },
      areaServed: [
        { "@type": "City", name: "Enghien" },
        { "@type": "City", name: "Bruxelles" },
        { "@type": "City", name: "Mons" },
        { "@type": "City", name: "Ath" },
        { "@type": "City", name: "Tournai" },
        { "@type": "City", name: "Braine-le-Comte" },
        { "@type": "City", name: "Soignies" },
        { "@type": "City", name: "Tubize" },
        { "@type": "City", name: "Nivelles" },
        { "@type": "AdministrativeArea", name: "Hainaut" },
        { "@type": "AdministrativeArea", name: "Brabant Wallon" },
        { "@type": "Country", name: "Belgique" },
        { "@type": "Country", name: "France" },
      ],
      availableLanguage: ["fr", "en"],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Services de Développement Web & Logiciel",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Création de Site Internet & CMS Sur-Mesure",
              description: "Création de sites vitrines sur-mesure rapides (<0.4s), optimisés SEO local et administrables à Enghien, Bruxelles et Wallonie.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Développement Application Web & SaaS",
              description: "Conception d'architectures applicatives robustes (Next.js, Symfony, PostgreSQL, Stripe).",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Expertise PrestaShop & Refonte E-Commerce",
              description: "Migration PrestaShop 1.6/1.7 vers v9, modules personnalisés et optimisation des ventes en ligne.",
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
