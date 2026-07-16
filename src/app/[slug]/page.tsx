import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AdSenseUnit } from "@/components/AdSenseUnit";
import { AffiliateBox } from "@/components/AffiliateBox";
import { CopyBlocks } from "@/components/CopyBlocks";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { adsenseConfig } from "@/content/ads";
import { getAffiliate } from "@/content/affiliate";
import { getPage, getPages, getPostHtml, getRelatedPages } from "@/content/pages";
import { siteConfig } from "@/content/site";
import { aiTools } from "@/content/tools";
import { getHubsForArticle } from "@/content/topics";
import {
  createArticleJsonLd,
  createBreadcrumbJsonLd,
  createFaqJsonLd,
  getOgImageUrl,
} from "@/lib/seo";

function splitHtmlBeforeNthH2(html: string, headingNumber: number) {
  const matches = [...html.matchAll(/<h2\b/gi)];
  const target = matches[headingNumber - 1];

  if (!target?.index) {
    return [html, ""] as const;
  }

  return [html.slice(0, target.index), html.slice(target.index)] as const;
}

function shouldShowFreshness(page: { slug: string; title: string; description: string; intent: string }) {
  const text = [page.slug, page.title, page.description, page.intent].join(" ").toLowerCase();
  return [
    "price",
    "pricing",
    "discount",
    "student",
    "login",
    "error",
    "\uAC00\uACA9",
    "\uBE44\uC6A9",
    "\uD560\uC778",
    "\uC624\uB958",
    "\uB85C\uADF8\uC778",
    "\uC815\uCC45",
  ].some((term) => text.includes(term));
}

const officialSourceCatalog = [
  {
    terms: ["chatgpt", "openai", "\uCC57GPT", "\uCC57\uC9C0\uD53C\uD2F0"],
    name: "OpenAI Help Center",
    url: "https://help.openai.com/",
  },
  {
    terms: ["gemini", "\uC81C\uBBF8\uB098\uC774"],
    name: "Google Gemini Help",
    url: "https://support.google.com/gemini/",
  },
  {
    terms: ["claude", "\uD074\uB85C\uB4DC"],
    name: "Anthropic Claude Support",
    url: "https://support.anthropic.com/",
  },
  {
    terms: ["copilot", "\uCF54\uD30C\uC77C\uB7FF"],
    name: "Microsoft Copilot Support",
    url: "https://support.microsoft.com/copilot",
  },
  {
    terms: ["perplexity", "\uD37C\uD50C\uB809\uC2DC\uD2F0"],
    name: "Perplexity Help Center",
    url: "https://www.perplexity.ai/help",
  },
  {
    terms: ["cursor", "cursor ai", "\uCEE4\uC11C"],
    name: "Cursor Docs",
    url: "https://docs.cursor.com/",
  },
  {
    terms: ["windsurf", "\uC708\uB4DC\uC11C\uD504"],
    name: "Windsurf Docs",
    url: "https://docs.windsurf.com/",
  },
  {
    terms: ["midjourney", "\uBBF8\uB4DC\uC800\uB2C8"],
    name: "Midjourney Docs",
    url: "https://docs.midjourney.com/",
  },
  {
    terms: ["notion", "notion ai", "\uB178\uC158"],
    name: "Notion AI Help",
    url: "https://www.notion.com/help/category/notion-ai",
  },
];

function getAiCitationSources(page: { slug: string; title: string; description: string; category: string; aliases: string[] }) {
  const pageText = [page.slug, page.title, page.description, page.category, ...page.aliases].join(" ").toLowerCase();
  const sources = officialSourceCatalog.filter((source) =>
    source.terms.some((term) => pageText.includes(term.toLowerCase())),
  );

  return sources.length > 0 ? sources.slice(0, 4) : officialSourceCatalog.slice(0, 3);
}

function getAiEntities(page: { category: string; intent: string; aliases: string[] }, hubLabels: string[]) {
  return [...new Set([siteConfig.name, siteConfig.alternateName, page.category, page.intent, ...page.aliases, ...hubLabels])]
    .filter(Boolean)
    .slice(0, 10);
}

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return getPages().map((page) => ({
    slug: page.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getPage(slug);

  if (!page) {
    return {};
  }

  return {
    title: page.searchTitle ? { absolute: page.searchTitle } : page.title,
    description: page.description,
    alternates: {
      canonical: "/" + page.slug,
    },
    authors: [{ name: siteConfig.name, url: siteConfig.url }],
    openGraph: {
      title: page.title,
      description: page.description,
      type: "article",
      locale: "ko_KR",
      url: "/" + page.slug,
      siteName: siteConfig.name,
      publishedTime: page.updatedAt,
      modifiedTime: page.updatedAt,
      images: [{ url: getOgImageUrl("/" + page.slug), width: 1200, height: 630, alt: page.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description,
      images: [getOgImageUrl("/" + page.slug)],
    },
  };
}

export default async function DetailPage({ params }: PageProps) {
  const { slug } = await params;
  const page = getPage(slug);
  const post = await getPostHtml(slug);

  if (!page || !post) {
    notFound();
  }

  const relatedPages = getRelatedPages(page);
  const topicHubs = getHubsForArticle(page);
  const showFreshness = shouldShowFreshness(page);
  const heroTags = [...page.aliases, ...topicHubs.map((hub) => hub.label)].slice(0, 10);
  const aiEntities = getAiEntities(page, topicHubs.map((hub) => hub.label));
  const citationSources = getAiCitationSources(page);
  const affiliate = getAffiliate(page.affiliate);
  const articleJsonLd = createArticleJsonLd(page);
  const faqJsonLd = createFaqJsonLd(page.faq);
  const tableOfContents = post.tableOfContents;
  const showTableOfContents = tableOfContents.length >= 3;
  const [htmlBeforeMiddleAd, htmlAfterMiddleAd] = splitHtmlBeforeNthH2(post.html, 3);
  const breadcrumbJsonLd = createBreadcrumbJsonLd([
    { name: siteConfig.name, item: "/" },
    { name: page.category, item: "/" + page.slug },
    { name: page.title, item: "/" + page.slug },
  ]);

  return (
    <>
      <JsonLd data={articleJsonLd} />
      {faqJsonLd ? <JsonLd data={faqJsonLd} /> : null}
      <JsonLd data={breadcrumbJsonLd} />
      <Header />
      <main className="article-shell">
        <div className="article-layout">
          <article className="article article-main">
          <header className="article-hero-card">
            <div className="article-type">
              <span>{page.category.slice(0, 1)}</span>
              <p>
                {page.category}
                <small>{page.intent}</small>
              </p>
            </div>
            <h1>{page.title}</h1>
            <div className="article-meta-row">
              <span>{page.updatedAt}</span>
              <span>최신 업데이트 {page.updatedAt}</span>
              <span>by {siteConfig.alternateName}</span>
            </div>
            {heroTags.length > 0 ? (
              <div className="article-tags" aria-label="관련 태그">
                {heroTags.map((tag) => (
                  <span key={tag}>#{tag}</span>
                ))}
              </div>
            ) : null}
          </header>

          <p className="article-lead">{page.summary || page.description}</p>

          <section className="ai-answer-brief" aria-labelledby="ai-answer-brief-title">
            <p className="eyebrow">AI citation brief</p>
            <h2 id="ai-answer-brief-title">핵심 요약</h2>
            <p>{page.summary || page.description}</p>
            <ul>
              <li>
                <strong>주제:</strong> {page.category} / {page.intent}
              </li>
              <li>
                <strong>업데이트:</strong> {page.updatedAt}
              </li>
              <li>
                <strong>검증 방식:</strong> 공식 도움말, 가격/정책 페이지, 실제 사용 흐름을 우선 확인합니다.
              </li>
            </ul>
            <div className="ai-entity-list" aria-label="주요 엔티티">
              {aiEntities.map((entity) => (
                <span key={entity}>{entity}</span>
              ))}
            </div>
            <div className="ai-source-list" aria-label="검증 출처">
              {citationSources.map((source) => (
                <a key={source.url} href={source.url} target="_blank" rel="noopener noreferrer">
                  {source.name}
                </a>
              ))}
            </div>
          </section>

          {showTableOfContents ? (
            <nav className="table-of-contents" aria-labelledby="table-of-contents-title">
              <strong id="table-of-contents-title">목차</strong>
              <ol>
                {tableOfContents.map((item) => (
                  <li key={item.id} className={item.depth === 3 ? "toc-depth-3" : undefined}>
                    <a href={"#" + item.id}>{item.text}</a>
                  </li>
                ))}
              </ol>
            </nav>
          ) : null}

          <AdSenseUnit className="ad-unit-article" slot={adsenseConfig.slots.articleTop} />

          <div className="markdown-body" dangerouslySetInnerHTML={{ __html: htmlBeforeMiddleAd }} />
          {htmlAfterMiddleAd ? (
            <>
              <AdSenseUnit className="ad-unit-article" slot={adsenseConfig.slots.articleMiddle} />
              <div className="markdown-body markdown-body-continuation" dangerouslySetInnerHTML={{ __html: htmlAfterMiddleAd }} />
            </>
          ) : null}
          <CopyBlocks />

          {affiliate ? <AffiliateBox affiliate={affiliate} /> : null}

          <section className="article-section trust-note">
            <h2>작성과 검수 기준</h2>
            <p>이 글은 초보 사용자가 바로 확인할 수 있는 질문, 요금, 오류 해결, 사용 상황을 기준으로 정리했습니다.</p>
            <p>요금제, 정책, 기능은 변경될 수 있으므로 결제나 중요한 업무 적용 전에는 반드시 각 서비스의 공식 문서를 함께 확인해 주세요.</p>
          </section>

          <AdSenseUnit className="ad-unit-article ad-unit-before-faq" slot={adsenseConfig.slots.articleBottom} />

          {page.faq.length > 0 ? (
            <section className="article-section">
              <h2>자주 묻는 질문</h2>
              <div className="faq-list">
                {page.faq.map((item) => (
                  <div key={item.question}>
                    <h3>{item.question}</h3>
                    <p>{item.answer}</p>
                  </div>
                ))}
              </div>
            </section>
          ) : null}

          {relatedPages.length > 0 || topicHubs.length > 0 ? (
            <section className="reader-path reader-path-bottom" aria-labelledby="reader-path-title">
              <div>
                <p className="eyebrow">다음에 함께 보면 좋은 글</p>
                <h2 id="reader-path-title">글을 다 읽었다면 이어서 확인하세요</h2>
              </div>
              {relatedPages.length > 0 ? (
                <div className="reader-path-grid">
                  {relatedPages.slice(0, 3).map((relatedPage) => (
                    <Link key={relatedPage.slug} href={"/" + relatedPage.slug}>
                      <span>{relatedPage.intent}</span>
                      <strong>{relatedPage.title}</strong>
                    </Link>
                  ))}
                </div>
              ) : null}
              {topicHubs.length > 0 ? (
                <div className="reader-hub-links" aria-label="관련 주제 모음">
                  {topicHubs.slice(0, 3).map((hub) => (
                    <Link key={hub.path} href={hub.path}>
                      {hub.label} 모음
                    </Link>
                  ))}
                </div>
              ) : null}
            </section>
          ) : null}
          </article>

          <aside className="article-sidebar" aria-label="추천 정보">
            <section className="sidebar-promo">
              <span>AI EASY PICK</span>
              <strong>처음 쓰는 AI, 목적별로 빠르게 고르기</strong>
              <p>가격, 오류, 프롬프트, 비교 글을 한 번에 확인하세요.</p>
            </section>

            {showFreshness ? (
              <section className="sidebar-card">
                <strong>최종 확인일</strong>
                <span className="sidebar-date">{page.updatedAt}</span>
                <p>가격, 정책, 오류 메시지는 서비스 제공사 상황에 따라 바뀔 수 있습니다.</p>
              </section>
            ) : null}

            <section className="sidebar-card">
              <strong>AI 도구 차트</strong>
              <div className="sidebar-link-list">
                {aiTools.slice(0, 6).map((tool, index) => (
                  <Link key={tool.slug} href={"/tools/" + tool.slug}>
                    <span>{index + 1}</span>
                    {tool.name}
                  </Link>
                ))}
              </div>
            </section>

            {relatedPages.length > 0 ? (
              <section className="sidebar-card">
                <strong>다음에 읽을 글</strong>
                <div className="sidebar-related">
                  {relatedPages.map((relatedPage) => (
                    <Link key={relatedPage.slug} href={"/" + relatedPage.slug}>
                      {relatedPage.title}
                    </Link>
                  ))}
                </div>
              </section>
            ) : null}
          </aside>
        </div>
      </main>
      <Footer />
    </>
  );
}
