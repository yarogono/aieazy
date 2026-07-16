import { ImageResponse } from "next/og";
import { compareHub } from "@/content/topics";
import { getOgFonts, OgCard } from "@/lib/ogImage";
import { ogImageSize } from "@/lib/seo";

export const alt = "AI 쉬움 compare image";
export const size = ogImageSize;
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    <OgCard title={compareHub.title} description={compareHub.description} label={compareHub.label} />,
    { ...size, fonts: await getOgFonts() },
  );
}
