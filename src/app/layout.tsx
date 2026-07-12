import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com"),
  title: {
    default: "AI 쉬움",
    template: "%s | AI 쉬움",
  },
  description:
    "ChatGPT, Cursor AI, Claude, Gemini 같은 AI 도구를 어렵지 않게 이해할 수 있도록 가격, 사용법, 오류 해결, 비교 정보를 정리합니다.",
  openGraph: {
    title: "AI 쉬움",
    description:
      "AI 도구를 처음 쓰는 사람을 위한 쉬운 가격, 사용법, 오류 해결, 비교 정보입니다.",
    type: "website",
    locale: "ko_KR",
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <body suppressHydrationWarning>
        {children}
        <Script
          id="google-adsense"
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5633731930294890"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
