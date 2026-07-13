export type AffiliateKey = "gamsgo";

export type AffiliateConfig = {
  key: AffiliateKey;
  brand: string;
  title: string;
  description: string;
  href: string;
  code?: string;
  buttonLabel: string;
  disclosure: string;
};

const affiliates: Record<AffiliateKey, AffiliateConfig> = {
  gamsgo: {
    key: "gamsgo",
    brand: "겜스고",
    title: "AI 구독을 더 저렴하게 이용하고 싶다면",
    description: "ChatGPT, Claude 등 AI 구독 서비스를 공유 구독 방식으로 확인할 수 있습니다.",
    href: "https://www.gamsgo.com/partner/xV82m",
    code: "JMHR5",
    buttonLabel: "겜스고에서 확인하기",
    disclosure:
      "위 링크(또는 코드)를 통해 구매가 이루어질 경우, 작성자에게 소정의 수수료가 지급됩니다.",
  },
};

export function getAffiliate(key?: string) {
  if (!key || !(key in affiliates)) {
    return null;
  }

  return affiliates[key as AffiliateKey];
}
