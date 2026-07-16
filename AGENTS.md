<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Project Marketing Skills

Marketing, SEO, AdSense, analytics, conversion, copywriting, content strategy, schema, programmatic SEO, and growth-related work should use the local marketing skills copied from `D:\project\marketingskills`.

Before answering or editing for those topics:

1. Read `.agents/marketing/README.md` for the skill system overview when needed.
2. Choose the relevant skill under `.agents/marketing/skills/<skill-name>/SKILL.md`.
3. Read that `SKILL.md` completely before acting.
4. If the selected skill references files under its `references/` directory, read only the references needed for the current task.
5. For broad marketing work, check `.agents/marketing/skills/product-marketing/SKILL.md` first if the selected skill depends on product, audience, or positioning context.
6. For policy-sensitive topics such as AdSense, ads, tracking, privacy, or platform rules, combine the local skill guidance with current official documentation.

Useful starting skills for this project:

- SEO/content: `seo-audit`, `ai-seo`, `content-strategy`, `schema`, `programmatic-seo`
- AdSense/analytics/experiments: `analytics`, `ads`, `ab-testing`, `cro`
- Article quality: `copywriting`, `copy-editing`, `marketing-psychology`
- Site growth: `marketing-plan`, `marketing-ideas`, `free-tools`, `marketing-loops`

## Content Writing Structure

When creating or editing article content, use a front-loaded, search-intent-first structure.

The title usually promises several core keywords or outcomes, such as `사용법`, `가격`, `비교`, `안됨`, `해결`, `환불`, `취소`, `복구`, `프롬프트`, `설정`, `영어회화`, or `번역`. The first visible section must answer those title keywords immediately.

Required structure for articles:

1. Start with 1-3 short sentences that give the conclusion or quickest solution first.
2. Make the first `##` heading match the title intent, using a pattern like `[핵심 키워드] 먼저 보기` or `[프롬프트/템플릿] 바로 복사하기`.
3. In that first section, map each title keyword to the direct answer or action. Use short paragraphs or bullets by default. Use a table only when it genuinely makes scanning easier.
4. Put definitions, background, explanations, and "what is it?" sections after the quick-solution section, not before it.
5. Keep the tone natural and helpful. Avoid stiff, generic AI-sounding introductions.
6. For problem-solving articles, lead with the fix order before explaining causes.
7. For comparison or pricing articles, lead with a summary table and recommendation criteria before detailed plan descriptions.
8. For prompt/template articles, show copy-ready examples near the top before explaining theory.
9. Avoid repetitive, template-like table headers such as `찾는 내용`, `바로 하는 방법`, `바로 해결하는 방법`, `바로 확인할 것`, or `바로 답`. These make the article feel AI-generated. If a table is useful, write headers that fit the topic naturally, such as `로그인할 때 보이는 문제 / 먼저 해볼 조치`, `결제 경로 / 해지나 환불을 진행할 곳`, or `노션에서 할 작업 / Notion AI에 요청할 말`.
10. Do not force the same opening layout across every article. The structure should be consistent in intent, but the wording and formatting should vary like a human editor wrote it.

Preferred article opening pattern:

```md
[핵심 결론 또는 가장 빠른 해결 방법 1-3문장]

## [제목 핵심 키워드] 먼저 보기

먼저 이렇게 해보세요.

1. [가장 먼저 할 일]
2. [다음 확인할 일]
3. [안 되면 확인할 일]

필요할 때만 주제에 맞는 자연스러운 표를 추가합니다.

| [상황에 맞는 구체적인 헤더] | [상황에 맞는 구체적인 헤더] |
| --- | --- |
| [독자가 겪는 실제 상황] | [짧고 구체적인 조치] |

## [자세한 사용법/해결 방법]
## [원인/주의사항/비교/정의]
```

Do not open articles with broad background, market commentary, or a definition such as `무엇인가요?` unless the title itself is primarily a definition query. Even then, give the practical answer first.
