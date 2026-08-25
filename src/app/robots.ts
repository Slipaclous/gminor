import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://gminor.dev";

  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/llms.txt", "/llms-full.txt"],
        disallow: ["/admin/", "/api/"],
      },
      {
        userAgent: [
          "GPTBot",
          "ChatGPT-User",
          "PerplexityBot",
          "ClaudeBot",
          "anthropic-ai",
          "Google-Extended",
          "GoogleOther",
          "Applebot-Extended",
          "CCBot",
        ],
        allow: ["/", "/llms.txt", "/llms-full.txt", "/projets/", "/services/", "/faq/", "/contact"],
        disallow: ["/admin/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
