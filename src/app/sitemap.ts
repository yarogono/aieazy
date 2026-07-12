import type { MetadataRoute } from "next";
import { getPages } from "@/content/pages";
import { siteConfig } from "@/content/site";
import { aiTools } from "@/content/tools";
import { trustPages } from "@/content/trustPages";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = getPages();

  return [
    {
      url: siteConfig.url,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...pages.map((page) => ({
      url: `${siteConfig.url}/${page.slug}`,
      lastModified: new Date(page.updatedAt),
      changeFrequency: "monthly" as const,
      priority: page.intent === "허브" ? 0.9 : 0.75,
    })),
    ...aiTools.map((tool) => ({
      url: `${siteConfig.url}/tools/${tool.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.85,
    })),
    ...trustPages.map((page) => ({
      url: `${siteConfig.url}/${page.slug}`,
      lastModified: new Date(page.updatedAt),
      changeFrequency: "yearly" as const,
      priority: 0.35,
    })),
  ];
}
