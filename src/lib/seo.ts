import type { FaqItem, SeoPage } from "@/content/pages";
import { siteConfig } from "@/content/site";
import type { AiTool } from "@/content/tools";

export type JsonLdObject = Record<string, unknown>;

type BreadcrumbItem = {
  name: string;
  item: string;
};

export const ogImageSize = {
  width: 1200,
  height: 630,
};

export function absoluteUrl(pathOrUrl: string) {
  if (/^https?:\/\//i.test(pathOrUrl)) {
    return pathOrUrl;
  }

  return siteConfig.url + (pathOrUrl.startsWith("/") ? pathOrUrl : "/" + pathOrUrl);
}

export function getOgImageUrl(path: string) {
  const normalizedPath = path === "" ? "" : path.replace(/\/$/, "");
  return absoluteUrl(normalizedPath + "/opengraph-image");
}

export function cleanJsonLd<T>(value: T): T {
  if (Array.isArray(value)) {
    return value.map((item) => cleanJsonLd(item)).filter((item) => item !== undefined) as T;
  }

  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>)
        .filter(([, entry]) => entry !== undefined && entry !== null && entry !== "")
        .map(([key, entry]) => [key, cleanJsonLd(entry)]),
    ) as T;
  }

  return value;
}

function publisher() {
  return {
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    logo: {
      "@type": "ImageObject",
      url: absoluteUrl("/favicon.ico"),
    },
  };
}

export function createBreadcrumbJsonLd(items: BreadcrumbItem[]): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.item),
    })),
  };
}

export function createArticleJsonLd(page: SeoPage): JsonLdObject {
  const canonicalUrl = absoluteUrl("/" + page.slug);

  return cleanJsonLd({
    "@context": "https://schema.org",
    "@type": "Article",
    headline: page.title,
    description: page.description,
    datePublished: page.updatedAt,
    dateModified: page.updatedAt,
    inLanguage: "ko-KR",
    url: canonicalUrl,
    image: page.image ? absoluteUrl(page.image) : getOgImageUrl("/" + page.slug),
    articleSection: page.category,
    keywords: page.aliases.length > 0 ? page.aliases : undefined,
    author: publisher(),
    publisher: publisher(),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonicalUrl,
    },
  });
}

export function createFaqJsonLd(faq: FaqItem[]): JsonLdObject | null {
  if (faq.length === 0) {
    return null;
  }

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function createCollectionPageJsonLd(tool: AiTool, articles: SeoPage[]): JsonLdObject {
  const canonicalUrl = absoluteUrl("/tools/" + tool.slug);

  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: tool.name + " \uAC00\uC774\uB4DC \uBAA8\uC74C",
    description: tool.description,
    inLanguage: "ko-KR",
    url: canonicalUrl,
    isPartOf: {
      "@type": "WebSite",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: articles.map((article, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: article.title,
        url: absoluteUrl("/" + article.slug),
      })),
    },
  };
}

export function createWebPageJsonLd(page: SeoPage | { slug: string; title: string; description: string; updatedAt: string }): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: page.title,
    description: page.description,
    inLanguage: "ko-KR",
    url: absoluteUrl("/" + page.slug),
    dateModified: page.updatedAt,
    isPartOf: {
      "@type": "WebSite",
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };
}
