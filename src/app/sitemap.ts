import type { MetadataRoute } from "next";
import { pages } from "@/content/pages";
import { aiTools } from "@/content/tools";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...pages.map((page) => ({
      url: `${siteUrl}/${page.slug}`,
      lastModified: new Date(page.updatedAt),
      changeFrequency: "monthly" as const,
      priority: page.intent === "허브" ? 0.9 : 0.75,
    })),
    ...aiTools.map((tool) => ({
      url: `${siteUrl}/tools/${tool.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.85,
    })),
  ];
}
