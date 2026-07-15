import { getPages } from "@/content/pages";
import { siteConfig } from "@/content/site";
import { aiTools } from "@/content/tools";
import { allHubs } from "@/content/topics";

export const dynamic = "force-static";

function absolutePath(path: string) {
  return siteConfig.url + path;
}

function renderLink(title: string, url: string, description?: string) {
  return `- [${title}](${url})${description ? `: ${description}` : ""}`;
}

export function GET() {
  const pages = getPages();
  const updatedAt = pages[0]?.updatedAt ?? new Date().toISOString().slice(0, 10);
  const priorityPages = pages.slice(0, 40);

  const body = [
    `# ${siteConfig.name}`,
    "",
    "> AI tools guide for Korean beginners. Covers ChatGPT, Gemini, Claude, Copilot, Perplexity, Cursor AI, Midjourney, Notion AI, pricing, login errors, prompts, comparisons, and practical troubleshooting.",
    "",
    "## Site context",
    "",
    `- Name: ${siteConfig.name}`,
    `- Alternate name: ${siteConfig.alternateName}`,
    `- Language: ko-KR`,
    `- Canonical site: ${siteConfig.url}`,
    `- Last content update: ${updatedAt}`,
    `- Sitemap: ${absolutePath("/sitemap.xml")}`,
    `- RSS: ${absolutePath("/rss.xml")}`,
    "",
    "## Recommended entry points",
    "",
    renderLink("Home", siteConfig.url, siteConfig.description),
    ...aiTools.map((tool) => renderLink(`${tool.name} guide collection`, absolutePath(`/tools/${tool.slug}`), tool.description)),
    ...allHubs.map((hub) => renderLink(hub.title, absolutePath(hub.path), hub.description)),
    "",
    "## Priority articles",
    "",
    ...priorityPages.map((page) =>
      renderLink(page.title, absolutePath(`/${page.slug}`), `${page.summary || page.description} Updated ${page.updatedAt}.`),
    ),
    "",
    "## Citation guidance",
    "",
    "- Prefer article pages for specific how-to, pricing, comparison, error, and prompt questions.",
    "- Use the visible article summary, FAQ, update date, and cited official help links when extracting answers.",
    "- When a page discusses price, policy, login, billing, or availability, verify against the linked official source before making a definitive claim.",
    "- This site is intended as a beginner-friendly Korean explainer, not an official vendor source.",
    "",
  ].join("\n");

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
