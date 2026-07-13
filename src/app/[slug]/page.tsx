import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { getPage, getPages, getPostHtml, getRelatedPages } from "@/content/pages";
import { siteConfig } from "@/content/site";
import { getHubsForArticle } from "@/content/topics";
import {
  createArticleJsonLd,
  createBreadcrumbJsonLd,
  createFaqJsonLd,
  getOgImageUrl,
} from "@/lib/seo";

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
  const postHtml = await getPostHtml(slug);

  if (!page || !postHtml) {
    notFound();
  }

  const relatedPages = getRelatedPages(page);
  const topicHubs = getHubsForArticle(page);
  const showFreshness = shouldShowFreshness(page);
  const articleJsonLd = createArticleJsonLd(page);
  const faqJsonLd = createFaqJsonLd(page.faq);
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
      <main>
        <article className="article">
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <Link href="/">{"\uD648"}</Link>
            <span>/</span>
            <span>{page.category}</span>
          </nav>

          <header className="article-header">
            <p className="eyebrow">
              {page.category} {"\u00B7"} {page.intent} {"\u00B7 \uC5C5\uB370\uC774\uD2B8"} {page.updatedAt}
            </p>
            <h1>{page.title}</h1>
            <p>{page.summary}</p>
          </header>

          {showFreshness ? (
            <aside className="freshness-box" aria-label="\uCD5C\uC885 \uD655\uC778\uC77C">
              <strong>{"\uCD5C\uC885 \uD655\uC778\uC77C"}</strong>
              <span>{page.updatedAt}</span>
              <p>{"\uAC00\uACA9, \uC815\uCC45, \uC624\uB958 \uBA54\uC2DC\uC9C0\uB294 \uC11C\uBE44\uC2A4 \uC81C\uACF5\uC0AC \uC0C1\uD669\uC5D0 \uB530\uB77C \uBC14\uB014 \uC218 \uC788\uC5B4 \uACF5\uC2DD \uD398\uC774\uC9C0\uC640 \uD568\uAED8 \uD655\uC778\uD558\uC138\uC694."}</p>
            </aside>
          ) : null}

          {topicHubs.length > 0 ? (
            <section className="topic-links" aria-label="\uAD00\uB828 \uC8FC\uC81C">
              <strong>{"\uAD00\uB828 \uC8FC\uC81C"}</strong>
              <div>
                {topicHubs.map((hub) => (
                  <Link key={hub.path} href={hub.path}>
                    {hub.label}
                  </Link>
                ))}
              </div>
            </section>
          ) : null}

          {page.aliases.length > 0 ? (
            <section className="alias-box" aria-label="\uAD00\uB828 \uAC80\uC0C9\uC5B4">
              <h2>{"\uD568\uAED8 \uAC80\uC0C9\uB418\uB294 \uD45C\uD604"}</h2>
              <div>
                {page.aliases.map((alias) => (
                  <span key={alias}>{alias}</span>
                ))}
              </div>
            </section>
          ) : null}

          <div className="markdown-body" dangerouslySetInnerHTML={{ __html: postHtml }} />

          <section className="article-section trust-note">
            <h2>{"\uC791\uC131\uACFC \uAC80\uC218 \uAE30\uC900"}</h2>
            <p>{"\uC774 \uAE00\uC740 \uCD08\uBCF4 \uC0AC\uC6A9\uC790\uAC00 \uBC14\uB85C \uD655\uC778\uD560 \uC218 \uC788\uB294 \uC9C8\uBB38, \uC694\uAE08, \uC624\uB958 \uD574\uACB0, \uC0AC\uC6A9 \uC0C1\uD669\uC744 \uAE30\uC900\uC73C\uB85C \uC815\uB9AC\uD588\uC2B5\uB2C8\uB2E4."}</p>
            <p>{"\uC694\uAE08\uC81C, \uC815\uCC45, \uAE30\uB2A5\uC740 \uBCC0\uACBD\uB420 \uC218 \uC788\uC73C\uBBC0\uB85C \uACB0\uC81C\uB098 \uC911\uC694\uD55C \uC5C5\uBB34 \uC801\uC6A9 \uC804\uC5D0\uB294 \uBC18\uB4DC\uC2DC \uAC01 \uC11C\uBE44\uC2A4\uC758 \uACF5\uC2DD \uBB38\uC11C\uB97C \uD568\uAED8 \uD655\uC778\uD574 \uC8FC\uC138\uC694."}</p>
          </section>

          {page.faq.length > 0 ? (
            <section className="article-section">
              <h2>{"\uC790\uC8FC \uBB3B\uB294 \uC9C8\uBB38"}</h2>
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
              <h2>{"\uB2E4\uC74C\uC5D0 \uC77D\uC744 \uAE00"}</h2>
              <div className="related-list">
                {relatedPages.map((relatedPage) => (
                  <Link key={relatedPage.slug} href={"/" + relatedPage.slug}>
                    {relatedPage.title}
                  </Link>
                ))}
              </div>
            </section>
          ) : null}
        </article>
      </main>
      <Footer />
    </>
  );
}
