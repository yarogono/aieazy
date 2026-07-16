import { ImageResponse } from "next/og";
import { notFound } from "next/navigation";
import { aiTools, getTool } from "@/content/tools";
import { getOgFonts, OgCard } from "@/lib/ogImage";
import { ogImageSize } from "@/lib/seo";

export const alt = "AI \uC26C\uC6C0 tool guide image";
export const size = ogImageSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return aiTools.map((tool) => ({ tool: tool.slug }));
}

export default async function Image({ params }: { params: Promise<{ tool: string }> }) {
  const { tool: toolSlug } = await params;
  const tool = getTool(toolSlug);

  if (!tool) {
    notFound();
  }

  return new ImageResponse(
    <OgCard title={tool.name + " \uAC00\uC774\uB4DC \uBAA8\uC74C"} description={tool.description} label={tool.badge} />,
    { ...size, fonts: await getOgFonts() },
  );
}
