import type { Metadata } from "next";
import Link from "next/link";
import { AffiliateCopyButton } from "@/components/AffiliateCopyButton";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { getAffiliate } from "@/content/affiliate";
import { siteConfig } from "@/content/site";
import { absoluteUrl, createBreadcrumbJsonLd, createFaqJsonLd, getOgImageUrl } from "@/lib/seo";

const faqItems = [
  { question: "겜스고 할인 코드는 어디에 입력하나요?", answer: "겜스고에서 원하는 상품을 선택한 뒤 결제 또는 프로모션 코드 입력 단계에서 할인 코드를 입력합니다. 화면과 정책은 상품에 따라 달라질 수 있으니 결제 전 적용 금액을 확인하세요." },
  { question: "겜스고 할인 코드는 모든 AI 서비스에 적용되나요?", answer: "할인 코드 적용 여부와 할인율은 서비스, 상품 유형, 기간에 따라 달라질 수 있습니다. ChatGPT, Claude, Gemini 등 상품별 결제 화면에서 실제 적용 여부를 확인해야 합니다." },
  { question: "겜스고 이용 시 계정 공유 조건을 확인해야 하나요?", answer: "네. 공유 구독 상품은 로그인 방식, 프로필 사용, 동시 접속, 보증 및 교체 조건이 상품마다 다를 수 있습니다. 구매 전에 해당 상품의 이용 조건을 읽어보세요." },
  { question: "겜스고 할인 가격은 계속 동일한가요?", answer: "아닙니다. 환율, 판매처, 상품 재고, 프로모션 기간에 따라 가격과 할인 조건이 바뀔 수 있습니다. 실제 결제 화면을 최종 기준으로 확인하세요." },
  { question: "공식 AI 구독과 겜스고 상품은 무엇이 다른가요?", answer: "공식 구독은 각 AI 서비스가 직접 제공하는 결제 방식이고, 겜스고 상품은 판매처의 공유 또는 별도 이용 방식이 적용될 수 있습니다. 기능, 지원, 계정 관리가 다를 수 있으므로 사용 목적에 맞게 비교해야 합니다." },
];

const relatedGuides = [
  { href: "/chatgpt-price", title: "ChatGPT 가격과 할인 방법 비교" },
  { href: "/claude", title: "Claude 사용법과 구독 정보" },
  { href: "/gemini", title: "Gemini 가격과 활용 방법" },
  { href: "/topics/pricing", title: "AI 구독 가격·할인 정보 모음" },
];

const aiDiscountLinks = [
  { name: "ChatGPT 구독 할인", category: "AI 챗봇", icon: "✦" },
  { name: "Claude 구독 할인", category: "AI 챗봇", icon: "C" },
  { name: "Gemini 구독 할인", category: "AI 챗봇", icon: "✧" },
  { name: "Cursor AI 구독 할인", category: "AI 코딩", icon: "⌘" },
  { name: "Perplexity 구독 할인", category: "AI 검색", icon: "P" },
  { name: "Midjourney 구독 할인", category: "이미지 생성", icon: "◈" },
  { name: "젠스파크 AI 할인", category: "AI 검색", icon: "G" },
  { name: "그록 구독 할인", category: "AI 챗봇", icon: "X" },
  { name: "미리캔버스 구독 할인", category: "디자인 도구", icon: "M" },
  { name: "일레븐랩스 구독 할인", category: "음성 생성", icon: "11" },
  { name: "감마 구독 할인", category: "프레젠테이션", icon: "γ" },
  { name: "마누스 구독 할인", category: "AI 에이전트", icon: "M" },
  { name: "Replit 구독 할인", category: "AI 개발", icon: "R" },
];

export const metadata: Metadata = {
  title: "겜스고 할인 코드 및 AI 구독 할인 정보",
  description: "겜스고 할인 코드 사용 방법과 ChatGPT, Claude, Gemini 등 AI 구독 할인 정보를 정리했습니다. 할인 코드 입력, 이용 조건, 환불 및 FAQ를 확인하세요.",
  alternates: { canonical: "/gamsgo" },
  openGraph: {
    title: "겜스고 할인 코드 및 AI 구독 할인 정보",
    description: "겜스고 할인 코드와 AI 구독 상품 이용 조건을 한곳에서 확인하세요.",
    type: "article",
    locale: "ko_KR",
    url: "/gamsgo",
    siteName: siteConfig.name,
    images: [{ url: getOgImageUrl(""), width: 1200, height: 630, alt: "겜스고 할인 코드 및 AI 구독 할인 정보" }],
  },
};

export default function GamsgoPage() {
  const affiliate = getAffiliate("gamsgo");
  const code = affiliate?.code ?? "";
  const faqJsonLd = createFaqJsonLd(faqItems);
  const breadcrumbJsonLd = createBreadcrumbJsonLd([
    { name: siteConfig.name, item: "/" },
    { name: "겜스고 할인 코드", item: "/gamsgo" },
  ]);
  const pageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "겜스고 할인 코드 및 AI 구독 할인 정보",
    description: "겜스고 할인 코드 사용 방법과 AI 구독 할인 정보를 정리한 안내 페이지입니다.",
    url: absoluteUrl("/gamsgo"),
    inLanguage: "ko-KR",
    isPartOf: { "@type": "WebSite", name: siteConfig.name, url: siteConfig.url },
  };

  return (
    <>
      <JsonLd data={pageJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      {faqJsonLd ? <JsonLd data={faqJsonLd} /> : null}
      <Header />
      <main className="gamsgo-page">
        <article>
          <header className="gamsgo-hero">
            <p className="eyebrow">AI 구독 할인 안내</p>
            <h1>겜스고 할인 코드와<br /><em>AI 구독 할인 정보</em></h1>
            <p>ChatGPT, Claude, Gemini 등 AI 서비스를 겜스고에서 확인할 때 필요한 할인 코드, 이용 방법, 구매 전 체크사항을 정리했습니다.</p>
          </header>

          {affiliate ? (
            <section className="gamsgo-code-card" aria-labelledby="gamsgo-code-title">
              <div>
                <p className="eyebrow">현재 사용 가능한 할인 코드</p>
                <h2 id="gamsgo-code-title">겜스고 할인 코드</h2>
                <p>코드를 복사한 뒤 할인 링크로 이동해 적용 여부와 최종 가격을 확인하세요.</p>
              </div>
              <div className="gamsgo-code-action">
                <code>{code}</code>
                <AffiliateCopyButton href={affiliate.href} code={code} label="할인 링크 바로가기" />
              </div>
            </section>
          ) : null}

          {affiliate ? (
            <section className="gamsgo-ai-links-section" aria-labelledby="gamsgo-ai-links-title">
              <div className="section-heading">
                <p className="eyebrow">AI 서비스별 할인 바로가기</p>
                <h2 id="gamsgo-ai-links-title">원하는 AI 할인 링크를 선택하세요</h2>
                <p>서비스를 선택하면 겜스고로 이동하며, 할인 코드가 자동으로 복사됩니다. 상품의 실제 판매 여부와 적용 조건은 이동 후 확인하세요.</p>
              </div>
              <div className="gamsgo-ai-links">
                {aiDiscountLinks.map((service) => (
                  <div className="gamsgo-ai-link" key={service.name}>
                    <span className="gamsgo-ai-logo" aria-hidden="true">{service.icon}</span>
                    <div>
                      <span>{service.category}</span>
                      <strong>{service.name}</strong>
                    </div>
                    <AffiliateCopyButton href={affiliate.href} code={code} label="할인 링크 바로가기" />
                  </div>
                ))}
              </div>
            </section>
          ) : null}

          <nav className="gamsgo-toc" aria-labelledby="gamsgo-toc-title">
            <strong id="gamsgo-toc-title">목차</strong>
            <ol>
              <li><a href="#what-is-gamsgo">겜스고란?</a></li>
              <li><a href="#how-to-use">겜스고 할인 코드 사용 방법</a></li>
              <li><a href="#check-before-buying">구매 전 확인할 사항</a></li>
              <li><a href="#related-ai-discounts">AI 서비스별 할인 정보</a></li>
              <li><a href="#gamsgo-faq">자주 묻는 질문</a></li>
            </ol>
          </nav>

          <section className="gamsgo-content" id="what-is-gamsgo">
            <p className="eyebrow">겜스고 안내</p>
            <h2>겜스고란?</h2>
            <p>겜스고는 여러 디지털 구독 상품을 확인할 수 있는 판매 플랫폼입니다. AI 서비스 상품을 찾을 때는 표시된 가격만 보지 말고 로그인 방식, 이용 기간, 계정 공유 여부, 보증 및 환불 조건을 함께 확인해야 합니다.</p>
            <p>ChatGPT, Claude, Gemini, Cursor AI, Perplexity 같은 서비스는 상품별 조건이 다를 수 있습니다. 공식 구독과 겜스고 상품의 차이를 비교한 뒤 본인에게 맞는 방식을 선택하세요.</p>
          </section>

          <section className="gamsgo-content" id="how-to-use">
            <p className="eyebrow">할인 적용 방법</p>
            <h2>겜스고 할인 코드 사용 방법</h2>
            <ol className="gamsgo-steps">
              <li><strong>할인 코드 복사</strong><span>페이지 상단의 코드를 복사합니다.</span></li>
              <li><strong>할인 링크 이동</strong><span>원하는 AI 구독 상품을 선택합니다.</span></li>
              <li><strong>프로모션 코드 입력</strong><span>결제 단계에서 코드를 입력합니다.</span></li>
              <li><strong>최종 금액 확인</strong><span>할인 적용 여부와 이용 조건을 확인한 뒤 결제합니다.</span></li>
            </ol>
          </section>

          <section className="gamsgo-content" id="check-before-buying">
            <p className="eyebrow">결제 전 체크</p>
            <h2>겜스고 구매 전 확인할 사항</h2>
            <ul className="gamsgo-checklist">
              <li>할인 코드가 해당 상품과 결제 기간에 적용되는지 확인하기</li>
              <li>공유 계정인지 개인 계정인지 확인하기</li>
              <li>로그인 방식과 프로필 사용 조건 확인하기</li>
              <li>환불, 보증, 계정 교체 조건 확인하기</li>
              <li>AI 서비스의 공식 요금제와 기능 차이 비교하기</li>
            </ul>
          </section>

          <section className="gamsgo-content" id="related-ai-discounts">
            <p className="eyebrow">AI 할인 정보</p>
            <h2>AI 서비스별 할인 정보</h2>
            <div className="gamsgo-related-grid">
              {relatedGuides.map((guide) => (
                <Link key={guide.href} href={guide.href}>{guide.title}<span aria-hidden="true">↗</span></Link>
              ))}
            </div>
            <p>젠스파크 AI, 그록, 미리캔버스, 일레븐랩스, 감마, 마누스, Replit도 상품과 할인 조건이 달라질 수 있으므로 실제 결제 화면에서 최신 내용을 확인하세요.</p>
          </section>

          <section className="gamsgo-content gamsgo-faq" id="gamsgo-faq" aria-labelledby="gamsgo-faq-title">
            <p className="eyebrow">FAQ</p>
            <h2 id="gamsgo-faq-title">겜스고 할인 코드 자주 묻는 질문</h2>
            <div className="faq-list">
              {faqItems.map((item) => (
                <div key={item.question}>
                  <h3>{item.question}</h3>
                  <p>{item.answer}</p>
                </div>
              ))}
            </div>
          </section>
        </article>
      </main>
      <Footer />
    </>
  );
}
