import { ImageResponse } from "next/og";
import { notFound } from "next/navigation";
import { getTopicHub, topicHubs } from "@/content/topics";
import { OgCard } from "@/lib/ogImage";
import { ogImageSize } from "@/lib/seo";

export const alt = "AI 쉬움 topic image";
export const size = ogImageSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return topicHubs.map((hub) => ({ topic: hub.slug }));
}

export default async function Image({ params }: { params: Promise<{ topic: string }> }) {
  const { topic } = await params;
  const hub = getTopicHub(topic);

  if (!hub || hub.path === "/compare") {
    notFound();
  }

  return new ImageResponse(<OgCard title={hub.title} description={hub.description} label={hub.label} />, size);
}
