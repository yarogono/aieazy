import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
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
  const canonicalUrl = `${process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com"}/tools/${tool.slug}`;

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: `${tool.name} 가이드 모음`,
          description: tool.description,
          inLanguage: "ko-KR",
          url: canonicalUrl,
          mainEntity: {
            "@type": "ItemList",
            itemListElement: articles.map((article, index) => ({
              "@type": "ListItem",
              position: index + 1,
              name: article.title,
              url: `${process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com"}/${article.slug}`,
            })),
          },
        }}
      />
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
            {articles.map((article) => (
              <Link className="article-list-item" key={article.slug} href={`/${article.slug}`}>
                <span>
                  {article.category} · {article.intent}
                </span>
                <strong>{article.title}</strong>
                <p>{article.description}</p>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
