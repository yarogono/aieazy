# AI 쉬움 글 작성 가이드

블로그 글은 `content/posts/{slug}/index.md` 형식으로 작성합니다.

예시:

```text
content/posts/chatgpt-login-error/index.md
```

## URL 유지 규칙

`{slug}` 폴더명이 실제 URL이 됩니다.

예를 들어 아래 파일은 `/chatgpt-login-error` URL로 노출됩니다.

```text
content/posts/chatgpt-login-error/index.md
```

Search Console에 이미 제출한 글은 폴더명을 바꾸지 않습니다.
폴더명을 바꾸면 URL이 바뀌므로, 글을 정리할 때는 `content/posts/_catalog.md`만 업데이트합니다.

## 글 관리 카탈로그

`content/posts/_catalog.md`는 내부 관리용 파일입니다.

- URL에는 영향을 주지 않습니다.
- 기존 slug를 도구별, 주제별로 정리합니다.
- 새 글을 추가하면 `_catalog.md`와 `src/content/tools.ts`의 `articleSlugs`를 함께 업데이트합니다.

## 새 글 추가 순서

1. `content/posts/새-글-slug/` 폴더를 만듭니다.
2. 그 안에 `index.md` 파일을 만듭니다.
3. 아래 frontmatter를 복사해 제목, 설명, 카테고리, 관련 글을 수정합니다.
4. 본문은 일반 마크다운으로 작성합니다.
5. 도구별 목록에 넣고 싶으면 `src/content/tools.ts`의 `articleSlugs`에 slug를 추가합니다.
6. `content/posts/_catalog.md`에 새 slug를 추가합니다.

## 기본 템플릿

```md
---
title: "글 제목"
description: "검색 결과에 보일 설명입니다."
category: "ChatGPT"
intent: "사용법"
aliases: ["관련 검색어 1", "관련 검색어 2"]
updatedAt: "2026-07-12"
summary: "글 상단에 보일 요약 문장입니다."
image: "https://aieazy.s3.ap-northeast-2.amazonaws.com/posts/example/cover.webp"
related: ["chatgpt", "chatgpt-price"]
faq:
  - question: "질문입니다?"
    answer: "답변입니다."
---

## 첫 번째 소제목

본문을 작성합니다.

## 두 번째 소제목

- 목록도 사용할 수 있습니다.
- 표, 링크, 코드도 마크다운으로 작성할 수 있습니다.
```

## 이미지 경로 규칙

S3 버킷은 `aieazy`를 사용합니다.

```text
s3://aieazy/posts/{slug}/cover.webp
s3://aieazy/posts/{slug}/{image-name}.webp
s3://aieazy/tools/{tool-slug}/logo.webp
s3://aieazy/common/og-default.webp
```

공개 URL 예시:

```text
https://aieazy.s3.ap-northeast-2.amazonaws.com/posts/chatgpt-login-error/cover.webp
```

## SEO 작성 원칙

- 글마다 고유한 `title`과 `description`을 작성합니다.
- 하나의 글은 하나의 검색 의도를 다룹니다.
- `aliases`에는 실제로 사람들이 함께 검색하는 표현을 넣습니다.
- `faq`는 검색자가 바로 궁금해할 질문 위주로 작성합니다.
- URL slug는 영어 소문자와 하이픈을 사용합니다.
