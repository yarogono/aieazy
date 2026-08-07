function normalizeSiteUrl(url: string) {
  return url.replace(/\/+$/, "");
}

function getSiteUrl() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

  if (siteUrl) {
    return normalizeSiteUrl(siteUrl);
  }

  if (process.env.NODE_ENV === "production") {
    throw new Error("NEXT_PUBLIC_SITE_URL is required for production builds.");
  }

  return "http://localhost:3000";
}

export const siteConfig = {
  name: "AI \uC26C\uC6C0",
  alternateName: "AIEazy",
  description:
    "AI 도구 사용법과 가격, 오류 해결, 비교 정보를 정리합니다. 겜스고 클로드, 겜스고 제미나이, 겜스고 챗GPT, 겜스고 수노 AI, 겜스고 젠스파크 AI, 겜스고 그록, 겜스고 미리캔버스, 겜스고 일레븐랩스, 겜스고 감마, 겜스고 마누스, 겜스고 Replit 할인과 구독 조건도 공식 출처를 확인해 안내합니다.",
  url: getSiteUrl(),
  sameAs: [
    "https://x.com/gongbuhaneunga1",
    "https://www.facebook.com/people/%EC%82%B4%EB%A6%BC%EA%B0%9C%EB%AF%B8/61576147899615/",
    "https://www.threads.com/@reviewant1?hl=ko",
  ],
  socialChannels: [
    { name: "X", url: "https://x.com/gongbuhaneunga1" },
    {
      name: "Facebook",
      url: "https://www.facebook.com/people/%EC%82%B4%EB%A6%BC%EA%B0%9C%EB%AF%B8/61576147899615/",
    },
    { name: "Threads", url: "https://www.threads.com/@reviewant1?hl=ko" },
  ],
  relatedServices: [
    { name: "ChatGPT", url: "https://chatgpt.com/" },
    { name: "Gemini", url: "https://gemini.google.com/" },
    { name: "Claude", url: "https://claude.ai/" },
  ],
};
