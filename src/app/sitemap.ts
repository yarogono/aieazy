import type { MetadataRoute } from "next";
import { getPages } from "@/content/pages";
import { siteConfig } from "@/content/site";
import { getOgImageUrl } from "@/lib/seo";
import { aiTools } from "@/content/tools";
import { trustPages } from "@/content/trustPages";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = getPages();
  const latestPostDate = pages.reduce((latest, page) => page.updatedAt > latest ? page.updatedAt : latest, "2026-07-12");

  return [
    {
      url: siteConfig.url,
      lastModified: new Date(latestPostDate),
      changeFrequency: "weekly",
      priority: 1,
      images: [getOgImageUrl("")],
    },
    ...pages.map((page) => ({
      url: `${siteConfig.url}/${page.slug}`,
      lastModified: new Date(page.updatedAt),
      changeFrequency: "monthly" as const,
      priority: page.related.length >= 3 ? 0.9 : 0.75,
      images: [page.image ?? getOgImageUrl("/" + page.slug)],
    })),
    ...aiTools.map((tool) => ({
      url: `${siteConfig.url}/tools/${tool.slug}`,
      lastModified: new Date(latestPostDate),
      changeFrequency: "weekly" as const,
      priority: 0.85,
      images: [getOgImageUrl("/tools/" + tool.slug)],
    })),
    ...trustPages.map((page) => ({
      url: `${siteConfig.url}/${page.slug}`,
      lastModified: new Date(page.updatedAt),
      changeFrequency: "yearly" as const,
      priority: 0.35,
    })),
  ];
}
