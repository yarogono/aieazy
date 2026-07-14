import { getPage, getPages, type Post } from "./pages";

export type AiTool = {
  slug: string;
  name: string;
  label: string;
  badge: string;
  description: string;
  articleSlugs: string[];
};

export const aiTools: AiTool[] = [
  {
    slug: "chatgpt",
    name: "ChatGPT",
    label: "가장 많이 쓰는 대화형 AI",
    badge: "입문 추천",
    description:
      "챗GPT 사용법, 가격, 로그인 오류, Claude와의 차이처럼 처음 쓰는 사람이 많이 찾는 글을 모았습니다.",
    articleSlugs: [
      "chatgpt",
      "chatgpt-price",
      "chatgpt-refund-cancel-subscription",
      "chatgpt-archive",
      "chatgpt-image-upload-error",
      "chatgpt-login-error",
      "claude-vs-chatgpt",
      "chatgpt-prompts",
      "chatgpt-prompts-for-blog",
      "chatgpt-prompts-for-office",
      "chatgpt-prompts-for-students",
      "ai-email-writing",
      "ai-summary-tools",
    ],
  },
  {
    slug: "gemini",
    name: "Gemini",
    label: "구글 계정과 함께 쓰기 좋은 AI",
    badge: "구글 AI",
    description:
      "Gemini 기본 사용법과 구글 서비스와 함께 활용할 때 확인할 내용을 정리합니다.",
    articleSlugs: ["gemini"],
  },
  {
    slug: "claude",
    name: "Claude",
    label: "긴 글과 문서 작업에 강한 AI",
    badge: "문서 작업",
    description:
      "Claude 사용법, ChatGPT와의 차이, 문서 작업 활용법을 쉽게 확인할 수 있습니다.",
    articleSlugs: ["claude", "claude-vs-chatgpt"],
  },
  {
    slug: "copilot",
    name: "Copilot",
    label: "윈도우와 오피스에서 만나는 AI",
    badge: "업무용",
    description:
      "Microsoft Copilot을 윈도우와 오피스 업무에 활용할 때 필요한 기본 정보를 정리합니다.",
    articleSlugs: ["copilot"],
  },
  {
    slug: "perplexity",
    name: "Perplexity",
    label: "검색과 출처 확인에 강한 AI",
    badge: "AI 검색",
    description:
      "Perplexity로 출처를 확인하며 AI 검색을 하는 방법과 ChatGPT와의 차이를 정리합니다.",
    articleSlugs: ["perplexity"],
  },
  {
    slug: "cursor-ai",
    name: "Cursor AI",
    label: "개발자를 위한 AI 코딩 도구",
    badge: "코딩",
    description:
      "Cursor AI 사용법, 할인, 학생 할인, Windsurf 비교 등 개발자용 AI 코딩 도구 글을 모았습니다.",
    articleSlugs: [
      "cursor-ai",
      "cursor-ai-discount",
      "cursor-ai-student-discount",
      "cursor-ai-vs-windsurf",
    ],
  },
  {
    slug: "midjourney",
    name: "Midjourney",
    label: "이미지 생성이 필요할 때",
    badge: "이미지",
    description:
      "Midjourney로 AI 이미지를 만들 때 알아야 할 기본 사용법과 주의할 점을 정리합니다.",
    articleSlugs: ["midjourney"],
  },
  {
    slug: "notion-ai",
    name: "Notion AI",
    label: "메모와 문서 정리를 돕는 AI",
    badge: "생산성",
    description:
      "Notion AI로 메모, 회의록, 문서 정리를 쉽게 하는 방법을 정리합니다.",
    articleSlugs: ["notion-ai"],
  },
];

export function getTool(slug: string) {
  return aiTools.find((tool) => tool.slug === slug);
}

export function getToolArticles(tool: AiTool): Post[] {
  const selectedPages = tool.articleSlugs.flatMap((slug) => {
    const page = getPage(slug);
    return page ? [page] : [];
  });

  if (selectedPages.length > 0) {
    return selectedPages;
  }

  return getPages().filter((page) => page.category === tool.name);
}
