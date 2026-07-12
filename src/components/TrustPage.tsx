import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { siteConfig } from "@/content/site";
import type { TrustPage as TrustPageType } from "@/content/trustPages";

type TrustPageProps = {
  page: TrustPageType;
};

export function TrustPage({ page }: TrustPageProps) {
  const canonicalUrl = `${siteConfig.url}/${page.slug}`;

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: page.title,
          description: page.description,
          inLanguage: "ko-KR",
          url: canonicalUrl,
          dateModified: page.updatedAt,
        }}
      />
      <Header />
      <main>
        <article className="article trust-page">
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <Link href="/">홈</Link>
            <span>/</span>
            <span>{page.title}</span>
          </nav>

          <header className="article-header">
            <p className="eyebrow">사이트 정보 · 업데이트 {page.updatedAt}</p>
            <h1>{page.title}</h1>
            <p>{page.description}</p>
          </header>

          {page.sections.map((section) => (
            <section className="article-section" key={section.title}>
              <h2>{section.title}</h2>
              {section.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </section>
          ))}
        </article>
      </main>
      <Footer />
    </>
  );
}
