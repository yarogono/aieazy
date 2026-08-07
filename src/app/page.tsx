import { Fragment } from "react";
import Link from "next/link";
import { AdSenseUnit } from "@/components/AdSenseUnit";
import { AffiliateCopyButton } from "@/components/AffiliateCopyButton";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { adsenseConfig } from "@/content/ads";
import { getAffiliate } from "@/content/affiliate";
import { pages } from "@/content/pages";
import { siteConfig } from "@/content/site";
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

export default function Home() {
  const featured = pages.slice(0, 6);
  const identityJsonLd = createSiteIdentityJsonLd();
  const gamsgo = getAffiliate("gamsgo");

  return (
    <>
      <JsonLd data={identityJsonLd} />
      <Header />
      <main>
        <section className="deal-hero">
          <div className="deal-hero-copy">
            <p className="eyebrow">AI 구독 할인 비교</p>
            <h1>많이 쓰는 AI 구독,<br /><em>더 합리적인 가격</em>으로</h1>
            <p>ChatGPT, Claude, Gemini, Cursor 등 인기 AI 서비스의 할인 정보를 한눈에 비교하고, 나에게 맞는 구독을 찾아보세요.</p>
            <div className="hero-actions">
              <a className="button primary" href="#popular-deals">인기 할인 상품 보기</a>
              <Link className="button secondary" href="/compare">AI 요금 비교하기</Link>
            </div>
            <div className="deal-trust-row" aria-label="AIEazy 안내">
              <span>✓ 가격 비교</span><span>✓ 사용법 가이드</span><span>✓ 구매 전 체크</span>
            </div>
          </div>
          <div className="deal-hero-visual" aria-hidden="true">
            <div className="deal-orbit deal-orbit-one" /><div className="deal-orbit deal-orbit-two" />
            <div className="deal-hero-badge">SAVE<br /><strong>AI</strong></div>
            <div className="deal-floating-card deal-floating-card-top"><span>✦</span><strong>ChatGPT</strong><small>할인 가격 확인</small></div>
            <div className="deal-floating-card deal-floating-card-bottom"><span>⌘</span><strong>Cursor Pro</strong><small>개발자 추천</small></div>
          </div>
        </section>

        <section className="deal-section" id="popular-deals" aria-labelledby="popular-deals-title">
          <div className="section-heading deal-heading">
            <div><p className="eyebrow">지금 많이 찾는 상품</p><h2 id="popular-deals-title">인기 AI 구독 할인</h2></div>
            <p>가격은 판매처와 시점에 따라 달라질 수 있어요. 상품을 고른 뒤 최신 조건을 확인하세요.</p>
          </div>
          <nav className="deal-tabs" aria-label="상품 카테고리"><a className="is-active" href="#popular-deals">전체</a><a href="#popular-deals">AI 챗봇</a><a href="#popular-deals">개발 도구</a><a href="#popular-deals">이미지 생성</a></nav>
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

        <section className="section gamsgo-guide" aria-labelledby="gamsgo-guide-title">
          <div className="section-heading">
            <p className="eyebrow">겜스고 AI 구독 할인 가이드</p>
            <h2 id="gamsgo-guide-title">겜스고 클로드·제미나이·챗GPT 할인 정보</h2>
            <p>
              겜스고에서 AI 구독 상품을 확인할 때는 할인코드만 보지 말고 서비스별 이용 방식,
              보증 조건, 환불 규칙을 함께 비교해야 합니다. 겜스고 클로드, 겜스고 제미나이,
              겜스고 챗GPT뿐 아니라 겜스고 젠스파크 AI, 겜스고 그록, 겜스고 미리캔버스,
              겜스고 일레븐랩스, 겜스고 감마, 겜스고 마누스, 겜스고 Replit 상품도
              시점과 상품 유형에 따라 조건이 달라질 수 있습니다.
            </p>
          </div>
          <div className="gamsgo-guide-links" aria-label="겜스고 AI 관련 가이드">
            <Link href="/claude">겜스고 클로드 할인 조건 확인</Link>
            <Link href="/gemini">겜스고 제미나이 할인 조건 확인</Link>
            <Link href="/chatgpt-price">겜스고 챗GPT 가격·할인 비교</Link>
            <Link href="/topics/pricing">AI 구독 할인 가이드 전체 보기</Link>
          </div>
          <p className="gamsgo-guide-note">
            수노 AI를 포함한 각 서비스는 겜스고의 현재 상품 목록과 이용 조건을 확인한 뒤 안내하겠습니다.
            공식 서비스 정보는 {siteConfig.relatedServices.map((service, index) => (
              <Fragment key={service.url}>
                <a href={service.url} target="_blank" rel="noopener noreferrer">{service.name}</a>
                {index < siteConfig.relatedServices.length - 1 ? ", " : ""}
              </Fragment>
            ))}에서 확인할 수 있습니다.
          </p>
        </section>

        <section className="section tool-picker" aria-labelledby="tool-picker-title">
          <div className="section-heading"><p className="eyebrow">AI 도구 선택하기</p><h2 id="tool-picker-title">어떤 AI가 나에게 맞을까요?</h2><p>가격뿐 아니라 실제 사용 목적에 맞는 AI를 고를 수 있도록 사용법과 비교 가이드를 함께 정리했습니다.</p></div>
          <div className="tool-grid">{aiTools.map((tool, index) => <Link className="tool-button" key={tool.name} href={`/tools/${tool.slug}`}><span className="tool-rank">{index + 1}</span><span className="tool-logo" aria-hidden="true">{tool.name.slice(0, 1)}</span><span className="tool-copy"><strong>{tool.name}</strong><small>{tool.label}</small></span><span className="tool-meta"><span>{tool.badge}</span><small>{tool.articleSlugs.length}개 가이드</small></span></Link>)}</div>
        </section>

        <section className="section"><div className="section-heading"><p className="eyebrow">주제별 가이드</p><h2>목적에 맞게 AI 정보를 찾아보세요</h2><p>프롬프트, 가격, 오류 해결, 비교처럼 검색 목적별로 관련 글을 모았습니다.</p></div><div className="topic-grid">{allHubs.map((hub) => <Link className="topic-card" key={hub.path} href={hub.path}><span>{hub.label}</span><strong>{hub.title}</strong><p>{hub.description}</p></Link>)}</div></section>

        <section className="section"><div className="section-heading"><p className="eyebrow">많이 찾는 가이드</p><h2>구독하기 전에 먼저 확인하세요</h2></div><div className="guide-list">{featured.map((page, index) => <Fragment key={page.slug}><Link className="card" href={`/${page.slug}`}><span className="guide-rank">{index + 1}</span><span className="guide-copy"><span className="guide-meta">{page.category} · {page.intent} · {page.updatedAt}</span><h3>{page.title}</h3><p>{page.description}</p></span><span className="guide-cta">보기</span></Link>{index === 2 ? <AdSenseUnit className="ad-unit-feed" slot={adsenseConfig.slots.feed} format="fluid" layoutKey={adsenseConfig.feedLayoutKey} /> : null}</Fragment>)}</div></section>

        <section className="section split"><div><p className="eyebrow">처음이라면 이렇게 시작하세요</p><h2>AI 구독을 고르기 전에 많이 놓치는 것들</h2></div><ul className="check-list"><li>무료로 시작할 수 있는지 확인하기</li><li>월 요금과 연간 요금의 차이 비교하기</li><li>로그인, 결제, 계정 공유 조건 확인하기</li><li>내 목적에 맞는 AI인지 사용법 먼저 살펴보기</li></ul></section>
      </main>
      <Footer />
    </>
  );
}
