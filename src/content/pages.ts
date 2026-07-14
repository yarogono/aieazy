import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { Heading, Node, PhrasingContent, Root } from "mdast";
import { remark } from "remark";
import html from "remark-html";
import type { Plugin } from "unified";

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
  affiliate?: string;
  faq: FaqItem[];
  related: string[];
};

export type Post = SeoPage & {
  content: string;
};

export type TableOfContentsItem = {
  id: string;
  text: string;
  depth: 2 | 3;
};

const postsDirectory = path.join(process.cwd(), "content", "posts");

type PostFile = {
  slug: string;
  filePath: string;
};

function getPostSlug(filePath: string) {
  return path.basename(path.dirname(filePath));
}

function getPostFiles(directory = postsDirectory): PostFile[] {
  if (!fs.existsSync(directory)) {
    return [];
  }

  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const entryPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      return getPostFiles(entryPath);
    }

    if (entry.isFile() && entry.name === "index.md") {
      return [{ slug: getPostSlug(entryPath), filePath: entryPath }];
    }

    return [];
  });
}

function assertUniqueSlugs(postFiles: PostFile[]) {
  const slugMap = new Map<string, string[]>();

  for (const postFile of postFiles) {
    const filePaths = slugMap.get(postFile.slug) ?? [];
    filePaths.push(postFile.filePath);
    slugMap.set(postFile.slug, filePaths);
  }

  const duplicates = [...slugMap.entries()].filter(([, filePaths]) => filePaths.length > 1);

  if (duplicates.length > 0) {
    const message = duplicates
      .map(([slug, filePaths]) => `${slug}: ${filePaths.map((filePath) => path.relative(postsDirectory, filePath)).join(", ")}`)
      .join("; ");

    throw new Error(`Duplicate post slugs found. Each post folder name must be unique. ${message}`);
  }
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

function readPost(postFile: PostFile): Post {
  const source = fs.readFileSync(postFile.filePath, "utf8");
  const { data, content } = matter(source);

  return {
    slug: postFile.slug,
    title: String(data.title ?? postFile.slug),
    description: String(data.description ?? ""),
    category: String(data.category ?? "AI"),
    intent: String(data.intent ?? "가이드"),
    aliases: toStringArray(data.aliases),
    updatedAt: String(data.updatedAt ?? new Date().toISOString().slice(0, 10)),
    summary: String(data.summary ?? ""),
    image: data.image ? String(data.image) : undefined,
    affiliate: data.affiliate ? String(data.affiliate) : undefined,
    faq: toFaq(data.faq),
    related: toStringArray(data.related),
    content,
  };
}

export function getAllPosts(): Post[] {
  const postFiles = getPostFiles();
  assertUniqueSlugs(postFiles);

  return postFiles
    .map(readPost)
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
}

export function getPages(): Post[] {
  return getAllPosts();
}

export const pages = getPages();

export function getPage(slug: string) {
  return getPages().find((page) => page.slug === slug);
}

function scoreRelatedPage(source: SeoPage, candidate: SeoPage) {
  let score = 0;

  if (source.category === candidate.category) {
    score += 30;
  }

  if (source.intent === candidate.intent) {
    score += 10;
  }

  const candidateText = (candidate.title + " " + candidate.description + " " + candidate.aliases.join(" ")).toLowerCase();
  const sourceTerms = [
    ...source.aliases,
    ...source.title.split(/[\s,.:;!?()]+/),
    ...source.description.split(/[\s,.:;!?()]+/),
  ]
    .map((term) => term.trim().toLowerCase())
    .filter((term) => term.length > 1);

  for (const term of new Set(sourceTerms)) {
    if (candidateText.includes(term)) {
      score += 2;
    }
  }

  return score;
}

export function getRelatedPages(page: SeoPage, limit = 4): SeoPage[] {
  const allPages = getPages().filter((candidate) => candidate.slug !== page.slug);
  const usedSlugs = new Set<string>();
  const explicit = page.related.flatMap((slug) => {
    const relatedPage = getPage(slug);

    if (!relatedPage || relatedPage.slug === page.slug || usedSlugs.has(relatedPage.slug)) {
      return [];
    }

    usedSlugs.add(relatedPage.slug);
    return [relatedPage];
  });

  const automatic = allPages
    .filter((candidate) => !usedSlugs.has(candidate.slug))
    .map((candidate) => ({ page: candidate, score: scoreRelatedPage(page, candidate) }))
    .filter((candidate) => candidate.score > 0)
    .sort((a, b) => b.score - a.score || b.page.updatedAt.localeCompare(a.page.updatedAt))
    .map((candidate) => candidate.page);

  return [...explicit, ...automatic].slice(0, limit);
}

function getNodeText(node: PhrasingContent): string {
  if ("value" in node && typeof node.value === "string") {
    return node.value;
  }

  if ("children" in node && Array.isArray(node.children)) {
    return node.children.map((child) => getNodeText(child as PhrasingContent)).join("");
  }

  return "";
}

function createHeadingId(text: string, usedIds: Map<string, number>) {
  const base =
    text
      .trim()
      .toLowerCase()
      .replace(/[\s_]+/g, "-")
      .replace(/[^a-z0-9가-힣ㄱ-ㅎㅏ-ㅣ一-龥-]/g, "")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "") || "section";
  const count = usedIds.get(base) ?? 0;

  usedIds.set(base, count + 1);
  return count === 0 ? base : `${base}-${count + 1}`;
}

function addTableOfContents(tableOfContents: TableOfContentsItem[]): Plugin<[], Root> {
  const usedIds = new Map<string, number>();

  return () => (tree) => {
    visitHeadings(tree, (heading) => {
      if (heading.depth !== 2 && heading.depth !== 3) {
        return;
      }

      const text = heading.children.map(getNodeText).join("").trim();

      if (!text) {
        return;
      }

      const id = createHeadingId(text, usedIds);
      heading.data = {
        ...heading.data,
        hProperties: {
          ...(heading.data?.hProperties as Record<string, unknown> | undefined),
          id,
        },
      };
      if (heading.depth === 2) {
        tableOfContents.push({ id: `user-content-${id}`, text, depth: heading.depth });
      }
    });
  };
}

function visitHeadings(node: Node, callback: (heading: Heading) => void) {
  if (node.type === "heading") {
    callback(node as Heading);
  }

  if ("children" in node && Array.isArray(node.children)) {
    for (const child of node.children) {
      visitHeadings(child as Node, callback);
    }
  }
}

export async function getPostHtml(slug: string) {
  const page = getPage(slug);

  if (!page) {
    return null;
  }

  const tableOfContents: TableOfContentsItem[] = [];
  const processedContent = await remark().use(addTableOfContents(tableOfContents)).use(html).process(page.content);

  return {
    html: processedContent.toString(),
    tableOfContents,
  };
}
