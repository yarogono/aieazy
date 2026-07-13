import type { Metadata } from "next";
import { TopicHubPage } from "@/components/TopicHubPage";
import { compareHub } from "@/content/topics";
import { siteConfig } from "@/content/site";
import { getOgImageUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: compareHub.title,
  description: compareHub.description,
  alternates: { canonical: compareHub.path },
  openGraph: {
    title: compareHub.title,
    description: compareHub.description,
    type: "website",
    locale: "ko_KR",
    url: compareHub.path,
    siteName: siteConfig.name,
    images: [{ url: getOgImageUrl(compareHub.path), width: 1200, height: 630, alt: compareHub.title }],
  },
  twitter: {
    card: "summary_large_image",
    title: compareHub.title,
    description: compareHub.description,
    images: [getOgImageUrl(compareHub.path)],
  },
};

export default function ComparePage() {
  return <TopicHubPage hub={compareHub} />;
}
