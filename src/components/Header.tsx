import Link from "next/link";

const navItems = [
  { href: "/#popular-deals", label: "할인코드" },
  { href: "/topics/pricing", label: "서비스별 할인" },
  { href: "/compare", label: "구독 비교" },
  { href: "/topics/errors", label: "결제·적용 문제" },
  { href: "/disclaimer", label: "이용 전 확인" },
];

export function Header() {
  return (
    <header className="site-header-wrap">
      <div className="site-header-top">
        <Link href="/#popular-deals" className="header-pill">
          <span aria-hidden="true">% </span>
          오늘의 AI 할인코드
        </Link>
        <Link href="/" className="brand" aria-label="AI EAZY 홈">
          <span aria-hidden="true">AI</span>
          AI EAZY
        </Link>
        <a
          href="https://www.gamsgo.com/partner/xV82m"
          className="header-promo"
          target="_blank"
          rel="sponsored nofollow"
        >
          겜스고 할인코드 JMHR5 확인 ↗
        </a>
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
