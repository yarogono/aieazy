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
      <div className="site-footer-links">
        <nav aria-label="사이트 정보">
          {trustPages.map((page) => (
            <Link key={page.slug} href={`/${page.slug}`}>
              {page.title}
            </Link>
          ))}
        </nav>
        <div className="site-footer-related">
          <span>관련 AI 서비스</span>
          <nav aria-label="관련 AI 서비스">
            {siteConfig.relatedServices.map((service) => (
              <a
                key={service.url}
                href={service.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {service.name}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
