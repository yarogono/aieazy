import { ImageResponse } from "next/og";
import { getOgFonts, OgCard } from "@/lib/ogImage";
import { ogImageSize } from "@/lib/seo";
import { siteConfig } from "@/content/site";

export const alt = siteConfig.name;
export const size = ogImageSize;
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    <OgCard title={siteConfig.name} description={siteConfig.description} label="AI Guide" />,
    { ...size, fonts: await getOgFonts() },
  );
}
