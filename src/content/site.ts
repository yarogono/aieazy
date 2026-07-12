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
  name: "AI 쉬움",
  description:
    "AI 도구를 처음 쓰는 사람을 위한 쉬운 사용법, 가격, 오류 해결, 비교 정보입니다.",
  url: getSiteUrl(),
};
