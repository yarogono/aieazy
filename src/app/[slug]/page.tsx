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
    title: page.title,
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

          {affiliate ? <AffiliateBox affiliate={affiliate} /> : null}

          {showTableOfContents ? (
            <nav className="table-of-contents" aria-labelledby="table-of-contents-title">
              <strong id="table-of-contents-title">[목차]</strong>
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
