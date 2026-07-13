import Link from "next/link";

const navItems = [
  { href: "/tools/chatgpt", label: "ChatGPT" },
  { href: "/topics/prompts", label: "프롬프트" },
  { href: "/topics/pricing", label: "가격" },
  { href: "/topics/errors", label: "오류" },
  { href: "/compare", label: "비교" },
];

export function Header() {
  return (
    <header className="site-header-wrap">
      <div className="site-header-top">
        <Link href="/tools/chatgpt" className="header-pill">
          <span>1</span>
          ChatGPT 입문 가이드
        </Link>
        <Link href="/" className="brand" aria-label="AI 쉬움 홈">
          <span aria-hidden="true">AI</span>
          AI 쉬움
        </Link>
        <Link href="/compare" className="header-promo">
          AI 도구 비교 바로가기
        </Link>
      </div>
      <nav className="site-header-nav" aria-label="주요 메뉴">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href}>
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
