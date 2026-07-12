import { getPages } from "@/content/pages";
import { siteConfig } from "@/content/site";

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function GET() {
  const posts = getPages();
  const latestPost = posts[0];
  const lastBuildDate = latestPost
    ? new Date(latestPost.updatedAt).toUTCString()
    : new Date().toUTCString();

  const items = posts
    .map((post) => {
      const postUrl = `${siteConfig.url}/${post.slug}`;

      return `
        <item>
          <title>${escapeXml(post.title)}</title>
          <link>${escapeXml(postUrl)}</link>
          <guid>${escapeXml(postUrl)}</guid>
          <description>${escapeXml(post.description)}</description>
          <pubDate>${new Date(post.updatedAt).toUTCString()}</pubDate>
        </item>`;
    })
    .join("");

  const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
  <channel>
    <title>${escapeXml(siteConfig.name)}</title>
    <link>${escapeXml(siteConfig.url)}</link>
    <description>${escapeXml(siteConfig.description)}</description>
    <language>ko-KR</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    ${items}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600",
    },
  });
}
