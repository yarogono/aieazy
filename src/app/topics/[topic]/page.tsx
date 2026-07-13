import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TopicHubPage } from "@/components/TopicHubPage";
import { getTopicHub, topicHubs } from "@/content/topics";
import { siteConfig } from "@/content/site";
import { getOgImageUrl } from "@/lib/seo";

type TopicPageProps = {
  params: Promise<{ topic: string }>;
};

export function generateStaticParams() {
  return topicHubs.map((hub) => ({ topic: hub.slug }));
}

export async function generateMetadata({ params }: TopicPageProps): Promise<Metadata> {
  const { topic } = await params;
  const hub = getTopicHub(topic);

  if (!hub || hub.path === "/compare") {
    return {};
  }

  return {
    title: hub.title,
    description: hub.description,
    alternates: { canonical: hub.path },
    openGraph: {
      title: hub.title,
      description: hub.description,
      type: "website",
      locale: "ko_KR",
      url: hub.path,
      siteName: siteConfig.name,
      images: [{ url: getOgImageUrl(hub.path), width: 1200, height: 630, alt: hub.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: hub.title,
      description: hub.description,
      images: [getOgImageUrl(hub.path)],
    },
  };
}

export default async function TopicPage({ params }: TopicPageProps) {
  const { topic } = await params;
  const hub = getTopicHub(topic);

  if (!hub || hub.path === "/compare") {
    notFound();
  }

  return <TopicHubPage hub={hub} />;
}
