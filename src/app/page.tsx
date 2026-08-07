import { Fragment } from "react";
import Link from "next/link";
import { AffiliateCopyButton } from "@/components/AffiliateCopyButton";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { getAffiliate } from "@/content/affiliate";
import { pages } from "@/content/pages";
import { aiTools } from "@/content/tools";
import { allHubs } from "@/content/topics";
import { createSiteIdentityJsonLd } from "@/lib/seo";

const featuredDeals = [
  { name: "챗GPT 구독 할인", category: "AI 챗봇", icon: "✦", accent: "purple", href: "/tools/chatgpt" },
  { name: "클로드 구독 할인", category: "AI 챗봇", icon: "C", accent: "orange", href: "/tools/claude" },
  { name: "제미나이 구독 할인", category: "AI 챗봇", icon: "✧", accent: "blue", href: "/tools/gemini" },
  { name: "커서 AI 구독 할인", category: "개발 도구", icon: "⌘", accent: "dark", href: "/tools/cursor-ai" },
  { name: "퍼플렉시티 구독 할인", category: "검색형 AI", icon: "P", accent: "teal", href: "/tools/perplexity" },
  { name: "미드저니 구독 할인", category: "이미지 생성", icon: "◈", accent: "pink", href: "/tools/midjourney" },
  { name: "젠스파크 AI 구독 할인", category: "AI 검색", icon: "G", accent: "blue", href: "/topics/pricing" },
  { name: "그록 구독 할인", category: "AI 챗봇", icon: "X", accent: "dark", href: "/topics/pricing" },
  { name: "미리캔버스 구독 할인", category: "디자인 도구", icon: "M", accent: "purple", href: "/topics/pricing" },
  { name: "일레븐랩스 구독 할인", category: "음성 생성", icon: "11", accent: "orange", href: "/topics/pricing" },
  { name: "감마 구독 할인", category: "프레젠테이션", icon: "γ", accent: "teal", href: "/topics/pricing" },
  { name: "마누스 구독 할인", category: "AI 에이전트", icon: "M", accent: "pink", href: "/topics/pricing" },
  { name: "Replit 구독 할인", category: "개발 도구", icon: "R", accent: "dark", href: "/topics/pricing" },
];

const discountGuideSlugs = [
  "chatgpt-price",
  "chatgpt-foreign-payment-fee-cheap-subscription",
  "chatgpt-account-sharing",
  "cursor-ai-discount",
  "cursor-ai-student-discount",
  "chatgpt-vs-gemini-paid-price-comparison-discount",
];

export default function Home() {
  const discountGuides = discountGuideSlugs.flatMap((slug) => {
    const page = pages.find((candidate) => candidate.slug === slug);
    return page ? [page] : [];
  });
  const identityJsonLd = createSiteIdentityJsonLd();
  const gamsgo = getAffiliate("gamsgo");

  return (
    <>
      <JsonLd data={identityJsonLd} />
      <Header />
      <main>
        <section className="deal-hero">
          <div className="deal-hero-copy">
            <p className="eyebrow">AI 할인·가격·사용법 정보</p>
            <h1>AI 구독 할인과<br /><em>사용 정보를 한곳에서</em></h1>
            <p>ChatGPT, Claude, Gemini, Cursor부터 젠스파크 AI와 Replit까지 AI 서비스의 할인 링크, 가격 비교, 사용법을 정리합니다.</p>
            <div className="hero-actions">
              <Link className="button primary" href="/gamsgo">겜스고 할인 코드 보기</Link>
              <Link className="button secondary" href="/topics/pricing">AI 할인 정보 보기</Link>
            </div>
            <div className="deal-trust-row" aria-label="AIEazy 안내">
              <span>✓ 가격 비교</span><span>✓ 사용법 가이드</span><span>✓ 구매 전 체크</span>
            </div>
          </div>
          <div className="deal-hero-visual" aria-hidden="true">
            <div className="deal-orbit deal-orbit-one" /><div className="deal-orbit deal-orbit-two" />
            <div className="deal-hero-badge">SAVE<br /><strong>AI</strong></div>
            <div className="deal-floating-card deal-floating-card-top"><span>✦</span><strong>ChatGPT</strong><small>구독 할인 정보</small></div>
            <div className="deal-floating-card deal-floating-card-bottom"><span>⌘</span><strong>Cursor AI</strong><small>가격·할인 비교</small></div>
          </div>
        </section>

        <section className="deal-section" id="popular-deals" aria-labelledby="popular-deals-title">
          <div className="section-heading deal-heading">
            <div><p className="eyebrow">서비스별 AI 할인 정보</p><h2 id="popular-deals-title">인기 AI 구독 할인</h2></div>
            <p>서비스를 선택하면 겜스고 할인 링크로 이동할 수 있습니다. 가격과 조건은 결제 전에 다시 확인하세요.</p>
          </div>
          <div className="deal-grid">
            {featuredDeals.map((deal, index) => (
              <article className={`deal-card deal-card-${deal.accent}`} key={deal.name}>
                {index < 3 ? <span className="deal-card-label">인기 {index + 1}</span> : null}
                <div className="deal-card-top"><span className="deal-icon" aria-hidden="true">{deal.icon}</span><h3>{deal.name}</h3></div>
                <div className="deal-card-actions">{gamsgo ? <AffiliateCopyButton href={gamsgo.href} code={gamsgo.code ?? ""} label="할인 링크 바로가기" /> : null}</div>
              </article>
            ))}
          </div>
          <p className="affiliate-note">일부 링크는 제휴 링크입니다. 링크를 통해 구매해도 이용자에게 추가 비용은 없습니다.</p>
        </section>

        <section className="section" aria-labelledby="discount-guides-title">
          <div className="section-heading">
            <p className="eyebrow">겜스고·AI 할인 정보</p>
            <h2 id="discount-guides-title">할인 전에 확인할 관련 글</h2>
            <p>AI 구독 가격, 할인 방법, 계정 공유와 결제 조건을 비교해 구매 전에 확인할 수 있습니다.</p>
          </div>
          <div className="guide-list">
            {discountGuides.map((page, index) => (
              <Link className="card" href={`/${page.slug}`} key={page.slug}>
                <span className="guide-rank">{index + 1}</span>
                <span className="guide-copy">
                  <span className="guide-meta">{page.category} · {page.intent} · {page.updatedAt}</span>
                  <h3>{page.title}</h3>
                  <p>{page.description}</p>
                </span>
                <span className="guide-cta">글 보기</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="section tool-picker" aria-labelledby="tool-picker-title">
          <div className="section-heading"><p className="eyebrow">AI 도구 선택하기</p><h2 id="tool-picker-title">어떤 AI가 나에게 맞을까요?</h2><p>가격뿐 아니라 실제 사용 목적에 맞는 AI를 고를 수 있도록 사용법과 비교 가이드를 함께 정리했습니다.</p></div>
          <div className="tool-grid">{aiTools.map((tool, index) => <Link className="tool-button" key={tool.name} href={`/tools/${tool.slug}`}><span className="tool-rank">{index + 1}</span><span className="tool-logo" aria-hidden="true">{tool.name.slice(0, 1)}</span><span className="tool-copy"><strong>{tool.name}</strong><small>{tool.label}</small></span><span className="tool-meta"><span>{tool.badge}</span><small>{tool.articleSlugs.length}개 가이드</small></span></Link>)}</div>
        </section>

        <section className="section"><div className="section-heading"><p className="eyebrow">주제별 가이드</p><h2>목적에 맞게 AI 정보를 찾아보세요</h2><p>프롬프트, 가격, 오류 해결, 비교처럼 검색 목적별로 관련 글을 모았습니다.</p></div><div className="topic-grid">{allHubs.map((hub) => <Link className="topic-card" key={hub.path} href={hub.path}><span>{hub.label}</span><strong>{hub.title}</strong><p>{hub.description}</p></Link>)}</div></section>

        </main>
      <Footer />
    </>
  );
}
