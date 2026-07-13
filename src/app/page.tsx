import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { pages } from "@/content/pages";
import { aiTools } from "@/content/tools";
import { allHubs } from "@/content/topics";
import { createSiteIdentityJsonLd } from "@/lib/seo";

export default function Home() {
  const featured = pages.slice(0, 6);
  const identityJsonLd = createSiteIdentityJsonLd();

  return (
    <>
      <JsonLd data={identityJsonLd} />
      <Header />
      <main>
        <section className="hero">
          <p className="eyebrow">{"쉬운 AI 가이드"}</p>
          <h1>{"AI 쉬움에서 필요한 AI 도구를 빠르게 확인하세요"}</h1>
          <p>
            {"ChatGPT, Gemini, Claude, Cursor AI처럼 사람들이 자주 찾는 AI 도구의 사용법, 가격, 오류 해결, 비교 정보를 쉽게 정리했습니다."}
          </p>
        </section>

        <section className="section tool-picker" aria-labelledby="tool-picker-title">
          <div className="section-heading">
            <p className="eyebrow">{"AI 선택하기"}</p>
            <h2 id="tool-picker-title">{"어떤 AI가 궁금하신가요?"}</h2>
            <p>
              {"많이 찾는 AI부터 순서대로 정리했습니다. 원하는 도구를 선택하면 관련 글 목록에서 사용법과 가격, 자주 묻는 질문을 볼 수 있습니다."}
            </p>
          </div>
          <div className="tool-grid">
            {aiTools.map((tool, index) => (
              <Link className="tool-button" key={tool.name} href={"/tools/" + tool.slug}>
                <span className="tool-rank">{index + 1}</span>
                <span className="tool-copy">
                  <strong>{tool.name}</strong>
                  <small>{tool.label}</small>
                </span>
                <span className="tool-badge">{tool.badge}</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="section">
          <div className="section-heading">
            <p className="eyebrow">{"주제별 가이드"}</p>
            <h2>{"목적에 맞게 AI 글을 찾아보세요"}</h2>
            <p>{"프롬프트, 가격, 오류 해결, 비교처럼 검색 의도별로 관련 글을 묶었습니다."}</p>
          </div>
          <div className="topic-grid">
            {allHubs.map((hub) => (
              <Link className="topic-card" key={hub.path} href={hub.path}>
                <span>{hub.label}</span>
                <strong>{hub.title}</strong>
                <p>{hub.description}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="section">
          <div className="section-heading">
            <p className="eyebrow">{"많이 찾는 가이드"}</p>
            <h2>{"지금 바로 확인하기 좋은 AI 도구 정보"}</h2>
          </div>
          <div className="card-grid">
            {featured.map((page) => (
              <Link className="card" key={page.slug} href={"/" + page.slug}>
                <span>{page.category}</span>
                <h3>{page.title}</h3>
                <p>{page.description}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="section split">
          <div>
            <p className="eyebrow">{"처음이라면 여기서 시작하세요"}</p>
            <h2>{"AI 도구를 고르기 전에 많이 헷갈리는 것들"}</h2>
          </div>
          <ul className="check-list">
            <li>{"무료로 시작할 수 있는지 확인하기"}</li>
            <li>{"유료 플랜을 결제하기 전에 차이 비교하기"}</li>
            <li>{"로그인, 결제, 설정 문제를 순서대로 해결하기"}</li>
            <li>{"내 목적에 맞는 AI 도구가 무엇인지 비교하기"}</li>
          </ul>
        </section>
      </main>
      <Footer />
    </>
  );
}
