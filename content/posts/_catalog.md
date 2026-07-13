# Posts Catalog

이 파일은 `content/posts` 폴더를 관리하기 위한 내부 카탈로그입니다.
실제 URL은 각 글 폴더명인 `content/posts/{slug}/index.md`의 `{slug}`로 결정됩니다.

중요: Search Console에 제출한 URL을 유지하려면 기존 글 폴더명을 바꾸지 않습니다.

## URL Slug 목록

| Slug | 대표 분류 | 관리 메모 |
| --- | --- | --- |
| `ai-email-writing` | AI 활용 | 이메일 작성, 업무 메일, 프롬프트 |
| `ai-summary-tools` | AI 활용 | 요약, 문서, 회의록 |
| `chatgpt` | ChatGPT | 대표 허브 글 |
| `chatgpt-login-error` | ChatGPT | 로그인 오류 해결 |
| `chatgpt-price` | ChatGPT | 가격, 요금제 |
| `chatgpt-prompts` | ChatGPT | 프롬프트 작성법 |
| `chatgpt-prompts-for-blog` | ChatGPT | 블로그 프롬프트 |
| `chatgpt-prompts-for-office` | ChatGPT | 업무용 프롬프트 |
| `chatgpt-prompts-for-students` | ChatGPT | 학생용 프롬프트 |
| `claude` | Claude | Claude 기본 가이드 |
| `claude-vs-chatgpt` | 비교 | Claude와 ChatGPT 비교 |
| `copilot` | Copilot | Microsoft Copilot |
| `cursor-ai` | Cursor AI | Cursor AI 기본 가이드 |
| `cursor-ai-discount` | Cursor AI | 할인 정보 |
| `cursor-ai-student-discount` | Cursor AI | 학생 할인 |
| `cursor-ai-vs-windsurf` | 비교 | Cursor AI와 Windsurf 비교 |
| `gemini` | Gemini | Gemini 기본 가이드 |
| `midjourney` | Midjourney | 이미지 생성 |
| `notion-ai` | Notion AI | 문서, 메모, 생산성 |
| `perplexity` | Perplexity | AI 검색, 출처 확인 |

## 도구별 묶음

### ChatGPT

- `chatgpt`
- `chatgpt-price`
- `chatgpt-login-error`
- `claude-vs-chatgpt`
- `chatgpt-prompts`
- `chatgpt-prompts-for-blog`
- `chatgpt-prompts-for-office`
- `chatgpt-prompts-for-students`
- `ai-email-writing`
- `ai-summary-tools`

### Gemini

- `gemini`

### Claude

- `claude`
- `claude-vs-chatgpt`

### Copilot

- `copilot`

### Perplexity

- `perplexity`

### Cursor AI

- `cursor-ai`
- `cursor-ai-discount`
- `cursor-ai-student-discount`
- `cursor-ai-vs-windsurf`

### Midjourney

- `midjourney`

### Notion AI

- `notion-ai`

## 주제별 묶음

### 프롬프트

- `chatgpt-prompts`
- `chatgpt-prompts-for-blog`
- `chatgpt-prompts-for-office`
- `chatgpt-prompts-for-students`
- `ai-email-writing`
- `ai-summary-tools`

### 가격과 할인

- `chatgpt-price`
- `cursor-ai-discount`
- `cursor-ai-student-discount`

### 오류 해결

- `chatgpt-login-error`

### 비교

- `claude-vs-chatgpt`
- `cursor-ai-vs-windsurf`

## 새 글 추가 체크리스트

1. 새 폴더는 `content/posts/{new-slug}/index.md` 형식으로 만듭니다.
2. Search Console에 제출한 기존 slug와 겹치거나 기존 slug를 변경하지 않습니다.
3. `src/content/tools.ts`의 적절한 `articleSlugs` 목록에 새 slug를 추가합니다.
4. 이 카탈로그의 `URL Slug 목록`, `도구별 묶음`, `주제별 묶음`을 함께 업데이트합니다.
5. 관련 글을 노출하려면 새 글의 `related`와 기존 글의 `related`를 함께 점검합니다.
