import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import { siteConfig } from "@/content/site";
import { getOgImageUrl } from "@/lib/seo";
import "./globals.css";
import { GoogleAnalytics } from "@next/third-parties/google";
import { adsenseConfig } from "@/content/ads";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description:
    "ChatGPT, Cursor AI, Claude, Gemini 같은 AI 도구를 어렵지 않게 이해할 수 있도록 가격, 사용법, 오류 해결, 비교 정보를 정리합니다.",
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    type: "website",
    locale: "ko_KR",
    url: "/",
    siteName: siteConfig.name,
    images: [{ url: getOgImageUrl(""), width: 1200, height: 630, alt: siteConfig.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [getOgImageUrl("")],
  },
  alternates: {
    canonical: "/",
  },
  verification: {
      google: 'LZPIpa762YBaEvnn4vlmglSsBX9nDQxkyXwp1Mmowzc', // 구글 서치 콘솔 식별 코드
  },
  other: {
    'naver-site-verification': '80d0f57f72199173b7b48c71990074b791ec99f8', // 네이버 서치 어드바이저 식별 코드
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
      <head>
        <link rel="preconnect" href="https://pagead2.googlesyndication.com" />
        <link rel="preconnect" href="https://googleads.g.doubleclick.net" />
        <link rel="preconnect" href="https://fundingchoicesmessages.google.com" />
      </head>
      <body suppressHydrationWarning>
        {children}
        <Script
          id="google-adsense"
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseConfig.client}`}
          crossOrigin="anonymous"
          strategy="lazyOnload"
        />
      </body>
      <GoogleAnalytics gaId="G-GG8TZHG4GT" />
    </html>
  );
}
