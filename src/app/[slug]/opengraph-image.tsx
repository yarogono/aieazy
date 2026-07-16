import { ImageResponse } from "next/og";
import { notFound } from "next/navigation";
import { getPage, getPages } from "@/content/pages";
import { getOgFonts, OgCard } from "@/lib/ogImage";
import { ogImageSize } from "@/lib/seo";

export const alt = "AI \uC26C\uC6C0 article image";
export const size = ogImageSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return getPages().map((page) => ({ slug: page.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = getPage(slug);

  if (!page) {
    notFound();
  }

  return new ImageResponse(
    <OgCard title={page.title} description={page.description} label={page.category} />,
    { ...size, fonts: await getOgFonts() },
  );
}
