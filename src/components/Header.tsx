import Link from "next/link";

const navItems = [
  { href: "/tools/chatgpt", label: "ChatGPT" },
  { href: "/tools/cursor-ai", label: "Cursor AI" },
  { href: "/claude-vs-chatgpt", label: "비교" },
];

export function Header() {
  return (
    <header className="site-header">
      <Link href="/" className="brand" aria-label="AI 쉬움 홈">
        AI 쉬움
      </Link>
      <nav aria-label="주요 메뉴">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href}>
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
