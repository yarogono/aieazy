import { getPages, type Post } from "@/content/pages";

export type TopicHub = {
  slug: string;
  path: string;
  title: string;
  description: string;
  label: string;
  keywords: string[];
  match: (page: Post) => boolean;
};

function includesAny(text: string, terms: string[]) {
  const normalized = text.toLowerCase();
  return terms.some((term) => normalized.includes(term.toLowerCase()));
}

function pageText(page: Post) {
  return [page.slug, page.title, page.description, page.category, page.intent, page.aliases.join(" ")].join(" ");
}

export const topicHubs: TopicHub[] = [
  {
    slug: "prompts",
    path: "/topics/prompts",
    title: "AI 프롬프트 모음",
    description: "ChatGPT와 AI 도구를 더 잘 쓰기 위한 프롬프트 예시와 작성법을 모았습니다.",
    label: "프롬프트",
    keywords: ["prompt", "prompts", "프롬프트", "글쓰기", "이메일", "요약"],
    match: (page) => includesAny(pageText(page), ["prompt", "prompts", "프롬프트", "글쓰기", "이메일", "요약"]),
  },
  {
    slug: "errors",
    path: "/topics/errors",
    title: "AI 오류 해결 가이드",
    description: "로그인, 결제, 설정 문제처럼 AI 도구를 쓰다 막힐 때 확인할 글을 모았습니다.",
    label: "오류 해결",
    keywords: ["error", "login", "오류", "로그인", "문제", "해결"],
    match: (page) => includesAny(pageText(page), ["error", "login", "오류", "로그인", "문제", "해결"]),
  },
  {
    slug: "pricing",
    path: "/topics/pricing",
    title: "AI 가격과 할인 정보",
    description: "ChatGPT, Cursor AI 같은 AI 도구의 무료·유료 차이, 할인, 요금제 정보를 모았습니다.",
    label: "가격·할인",
    keywords: ["price", "pricing", "discount", "student", "가격", "비용", "할인", "학생"],
    match: (page) => includesAny(pageText(page), ["price", "pricing", "discount", "student", "가격", "비용", "할인", "학생"]),
  },
];

export const compareHub: TopicHub = {
  slug: "compare",
  path: "/compare",
  title: "AI 도구 비교 가이드",
  description: "ChatGPT, Claude, Gemini, Cursor AI 등 여러 AI 도구의 차이와 선택 기준을 비교한 글을 모았습니다.",
  label: "비교",
  keywords: ["vs", "compare", "comparison", "비교", "차이"],
  match: (page) => includesAny(pageText(page), ["vs", "compare", "comparison", "비교", "차이"]),
};

export const allHubs = [...topicHubs, compareHub];

export function getTopicHub(slug: string) {
  return allHubs.find((hub) => hub.slug === slug);
}

export function getTopicArticles(hub: TopicHub) {
  return getPages().filter(hub.match);
}

export function getHubsForArticle(page: Post) {
  return allHubs.filter((hub) => hub.match(page));
}
