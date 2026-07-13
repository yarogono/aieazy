import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { siteConfig } from "@/content/site";
import { createBreadcrumbJsonLd, createCollectionPageJsonLd, getOgImageUrl } from "@/lib/seo";
import { aiTools, getTool, getToolArticles } from "@/content/tools";

type ToolPageProps = {
  params: Promise<{
    tool: string;
  }>;
};

export function generateStaticParams() {
  return aiTools.map((tool) => ({
    tool: tool.slug,
  }));
}

export async function generateMetadata({ params }: ToolPageProps): Promise<Metadata> {
  const { tool: toolSlug } = await params;
  const tool = getTool(toolSlug);

  if (!tool) {
    return {};
  }

  return {
    title: `${tool.name} 가이드 모음`,
    description: tool.description,
    alternates: {
      canonical: `/tools/${tool.slug}`,
    },
    openGraph: {
      title: `${tool.name} 가이드 모음`,
      description: tool.description,
      type: "website",
      locale: "ko_KR",
      url: "/tools/" + tool.slug,
      siteName: siteConfig.name,
      images: [{ url: getOgImageUrl("/tools/" + tool.slug), width: 1200, height: 630, alt: `${tool.name} 가이드 모음` }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${tool.name} 가이드 모음`,
      description: tool.description,
      images: [getOgImageUrl("/tools/" + tool.slug)],
    },
  };
}

export default async function ToolPage({ params }: ToolPageProps) {
  const { tool: toolSlug } = await params;
  const tool = getTool(toolSlug);

  if (!tool) {
    notFound();
  }

  const articles = getToolArticles(tool);
  const collectionJsonLd = createCollectionPageJsonLd(tool, articles);
  const breadcrumbJsonLd = createBreadcrumbJsonLd([
    { name: siteConfig.name, item: "/" },
    { name: tool.name, item: "/tools/" + tool.slug },
  ]);

  return (
    <>
      <JsonLd data={collectionJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      <Header />
      <main>
        <section className="tool-hero">
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <Link href="/">홈</Link>
            <span>/</span>
            <span>{tool.name}</span>
          </nav>
          <p className="eyebrow">{tool.badge}</p>
          <h1>{tool.name} 가이드 모음</h1>
          <p>{tool.description}</p>
        </section>

        <section className="section">
          <div className="section-heading">
            <p className="eyebrow">글 목록</p>
            <h2>{tool.name}에 대해 궁금한 내용을 선택하세요</h2>
          </div>
          <div className="article-list">
            {articles.map((article, index) => (
              <Link className="article-list-item" key={article.slug} href={`/${article.slug}`}>
                <span className="guide-rank">{index + 1}</span>
                <span className="guide-copy">
                  <span className="guide-meta">
                    {article.category} · {article.intent} · 업데이트 {article.updatedAt}
                  </span>
                  <strong>{article.title}</strong>
                  <p>{article.description}</p>
                </span>
                <span className="guide-cta">보기</span>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
