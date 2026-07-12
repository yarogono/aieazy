import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

export type FaqItem = {
  question: string;
  answer: string;
};

export type SeoPage = {
  slug: string;
  title: string;
  description: string;
  category: string;
  intent: string;
  aliases: string[];
  updatedAt: string;
  summary: string;
  image?: string;
  faq: FaqItem[];
  related: string[];
};

export type Post = SeoPage & {
  content: string;
};

const postsDirectory = path.join(process.cwd(), "content", "posts");

function getPostFile(slug: string) {
  return path.join(postsDirectory, slug, "index.md");
}

function toStringArray(value: unknown): string[] {
  return Array.isArray(value) ? value.map(String) : [];
}

function toFaq(value: unknown): FaqItem[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((item) => {
      if (!item || typeof item !== "object") {
        return null;
      }

      const faq = item as Record<string, unknown>;
      return {
        question: String(faq.question ?? ""),
        answer: String(faq.answer ?? ""),
      };
    })
    .filter((item): item is FaqItem => Boolean(item?.question && item.answer));
}

function readPost(slug: string): Post {
  const source = fs.readFileSync(getPostFile(slug), "utf8");
  const { data, content } = matter(source);

  return {
    slug,
    title: String(data.title ?? slug),
    description: String(data.description ?? ""),
    category: String(data.category ?? "AI"),
    intent: String(data.intent ?? "가이드"),
    aliases: toStringArray(data.aliases),
    updatedAt: String(data.updatedAt ?? new Date().toISOString().slice(0, 10)),
    summary: String(data.summary ?? ""),
    image: data.image ? String(data.image) : undefined,
    faq: toFaq(data.faq),
    related: toStringArray(data.related),
    content,
  };
}

export function getAllPosts(): Post[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  return fs
    .readdirSync(postsDirectory, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .filter((slug) => fs.existsSync(getPostFile(slug)))
    .map(readPost)
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
}

export const pages = getAllPosts();

export function getPage(slug: string) {
  return pages.find((page) => page.slug === slug);
}

export function getRelatedPages(page: SeoPage): SeoPage[] {
  return page.related.flatMap((slug) => {
    const relatedPage = getPage(slug);
    return relatedPage ? [relatedPage] : [];
  });
}

export async function getPostHtml(slug: string) {
  const page = getPage(slug);

  if (!page) {
    return null;
  }

  const processedContent = await remark().use(html).process(page.content);
  return processedContent.toString();
}
