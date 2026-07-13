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
    "AI \uB3C4\uAD6C\uB97C \uCC98\uC74C \uC4F0\uB294 \uC0AC\uB78C\uC744 \uC704\uD55C \uC26C\uC6B4 \uC0AC\uC6A9\uBC95, \uAC00\uACA9, \uC624\uB958 \uD574\uACB0, \uBE44\uAD50 \uC815\uBCF4\uC785\uB2C8\uB2E4.",
  url: getSiteUrl(),
  sameAs: [],
};
