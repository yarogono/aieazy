import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { getPage, getPages, getPostHtml, getRelatedPages } from "@/content/pages";
import { siteConfig } from "@/content/site";

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
      canonical: `/${page.slug}`,
    },
    openGraph: {
      title: page.title,
      description: page.description,
      type: "article",
      locale: "ko_KR",
      publishedTime: page.updatedAt,
      modifiedTime: page.updatedAt,
      images: page.image ? [{ url: page.image }] : undefined,
    },
  };
}

export default async function DetailPage({ params }: PageProps) {
  const { slug } = await params;
  const page = getPage(slug);
  const postHtml = await getPostHtml(slug);

  if (!page || !postHtml) {
    notFound();
  }

  const relatedPages = getRelatedPages(page);
  const canonicalUrl = `${siteConfig.url}/${page.slug}`;

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: page.title,
          description: page.description,
          datePublished: page.updatedAt,
          dateModified: page.updatedAt,
          inLanguage: "ko-KR",
          image: page.image,
          mainEntityOfPage: canonicalUrl,
        }}
      />
      {page.faq.length > 0 ? (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: page.faq.map((item) => ({
              "@type": "Question",
              name: item.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: item.answer,
              },
            })),
          }}
        />
      ) : null}
      <Header />
      <main>
        <article className="article">
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <Link href="/">홈</Link>
            <span>/</span>
            <span>{page.category}</span>
          </nav>

          <header className="article-header">
            <p className="eyebrow">
              {page.category} · {page.intent} · 업데이트 {page.updatedAt}
            </p>
            <h1>{page.title}</h1>
            <p>{page.summary}</p>
          </header>

          {page.aliases.length > 0 ? (
            <section className="alias-box" aria-label="관련 검색어">
              <h2>함께 검색되는 표현</h2>
              <div>
                {page.aliases.map((alias) => (
                  <span key={alias}>{alias}</span>
                ))}
              </div>
            </section>
          ) : null}

          <div className="markdown-body" dangerouslySetInnerHTML={{ __html: postHtml }} />

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

          {relatedPages.length > 0 ? (
            <section className="article-section">
              <h2>다음에 읽을 글</h2>
              <div className="related-list">
                {relatedPages.map((relatedPage) => (
                  <Link key={relatedPage.slug} href={`/${relatedPage.slug}`}>
                    {relatedPage.title}
                  </Link>
                ))}
              </div>
            </section>
          ) : null}
        </article>
      </main>
    </>
  );
}
