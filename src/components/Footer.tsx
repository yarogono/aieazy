import Link from "next/link";
import { siteConfig } from "@/content/site";
import { trustPages } from "@/content/trustPages";

export function Footer() {
  return (
    <footer className="site-footer">
      <div>
        <strong>{siteConfig.name}</strong>
        <p>AI 도구를 쉽게 이해하고 선택할 수 있도록 정리합니다.</p>
      </div>
      <nav aria-label="사이트 정보">
        {trustPages.map((page) => (
          <Link key={page.slug} href={`/${page.slug}`}>
            {page.title}
          </Link>
        ))}
      </nav>
    </footer>
  );
}
