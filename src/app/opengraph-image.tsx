import { ImageResponse } from "next/og";
import { getOgFonts, OgCard } from "@/lib/ogImage";
import { ogImageSize } from "@/lib/seo";
import { siteConfig } from "@/content/site";

export const alt = "겜스고 AI 할인 가이드 | AIEazy";
export const size = ogImageSize;
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    <OgCard title="겜스고 AI 할인 가이드" description={siteConfig.description} label="겜스고 할인" />,
    { ...size, fonts: await getOgFonts() },
  );
}
