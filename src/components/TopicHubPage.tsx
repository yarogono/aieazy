import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { siteConfig } from "@/content/site";
import { getTopicArticles, type TopicHub } from "@/content/topics";
import { createBreadcrumbJsonLd, createTopicCollectionJsonLd } from "@/lib/seo";

type TopicHubPageProps = {
  hub: TopicHub;
};

export function TopicHubPage({ hub }: TopicHubPageProps) {
  const articles = getTopicArticles(hub);
  const collectionJsonLd = createTopicCollectionJsonLd(hub, articles);
  const breadcrumbJsonLd = createBreadcrumbJsonLd([
    { name: siteConfig.name, item: "/" },
    { name: hub.title, item: hub.path },
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
            <span>{hub.label}</span>
          </nav>
          <p className="eyebrow">{hub.label}</p>
          <h1>{hub.title}</h1>
          <p>{hub.description}</p>
        </section>

        <section className="section">
          <div className="section-heading">
            <p className="eyebrow">글 목록</p>
            <h2>{hub.label}에 맞는 가이드</h2>
          </div>
          <div className="article-list">
            {articles.map((article) => (
              <Link className="article-list-item" key={article.slug} href={"/" + article.slug}>
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
      <Footer />
    </>
  );
}
