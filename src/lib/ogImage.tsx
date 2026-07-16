import { readFile } from "node:fs/promises";
import path from "node:path";

type OgCardProps = {
  title: string;
  description?: string;
  label?: string;
};

type HighlightRule = {
  terms: string[];
  lines: (title: string) => string[];
};

const highlightRules: HighlightRule[] = [
  {
    terms: ["프롬프트 모음"],
    lines: () => ["챗지피티", "프롬프트 모음"],
  },
  {
    terms: ["아카이브"],
    lines: () => ["챗지피티", "아카이브"],
  },
  {
    terms: ["로그인", "오류"],
    lines: () => ["챗GPT", "로그인 오류"],
  },
  {
    terms: ["가격", "요금제"],
    lines: () => ["ChatGPT", "가격 비교"],
  },
  {
    terms: ["환불", "구독"],
    lines: () => ["챗지피티", "환불 방법"],
  },
  {
    terms: ["이미지", "업로드"],
    lines: () => ["이미지 업로드", "오류 해결"],
  },
  {
    terms: ["음성대화"],
    lines: () => ["챗지피티", "음성대화"],
  },
];

function cleanTitle(title: string) {
  return title
    .replace(/\([^)]*\)/g, " ")
    .replace(/[,:|]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function chunkTitle(title: string) {
  const words = cleanTitle(title).split(" ").filter(Boolean);
  const chunks: string[] = [];
  let current = "";

  for (const word of words) {
    const next = current ? `${current} ${word}` : word;

    if (next.length > 10 && current) {
      chunks.push(current);
      current = word;
    } else {
      current = next;
    }

    if (chunks.length === 1) {
      break;
    }
  }

  if (current && chunks.length < 2) {
    chunks.push(current);
  }

  return chunks.slice(0, 2);
}

function getTitleLines(title: string) {
  const normalizedTitle = cleanTitle(title).toLowerCase();
  const rule = highlightRules.find((item) => item.terms.every((term) => normalizedTitle.includes(term.toLowerCase())));

  if (rule) {
    return rule.lines(title);
  }

  return chunkTitle(title);
}

function getAccent(label: string) {
  if (label.includes("ChatGPT")) {
    return {
      background: "#123a8c",
      title: "#ffffff",
      highlight: "#ffe500",
      border: "#ffe500",
    };
  }

  if (label.includes("문제") || label.includes("오류")) {
    return {
      background: "#4f1d95",
      title: "#ffffff",
      highlight: "#ffe500",
      border: "#ff4d4d",
    };
  }

  return {
    background: "#123a8c",
    title: "#ffffff",
    highlight: "#ffe500",
    border: "#ffe500",
  };
}

export function OgCard({ title, label = "AI Guide" }: OgCardProps) {
  const titleLines = getTitleLines(title);
  const accent = getAccent(label);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: accent.background,
        color: accent.title,
        padding: "48px",
        boxSizing: "border-box",
        fontFamily: "OgKorean, Arial, sans-serif",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: accent.background,
          border: `22px solid ${accent.border}`,
          borderRadius: "24px",
          padding: "42px 56px",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "24px",
            overflow: "hidden",
          }}
        >
          {titleLines.map((line, index) => (
            <div
              key={line}
              style={{
                display: "flex",
                fontSize: line.length > 8 ? "116px" : "148px",
                fontWeight: 900,
                lineHeight: 0.9,
                letterSpacing: 0,
                color: index === 1 ? accent.highlight : accent.title,
                textShadow:
                  "4px 0 0 #000000, -4px 0 0 #000000, 0 4px 0 #000000, 0 -4px 0 #000000, 4px 4px 0 #000000, -4px -4px 0 #000000, 4px -4px 0 #000000, -4px 4px 0 #000000, 0 10px 0 rgba(0, 0, 0, 0.38)",
                whiteSpace: "nowrap",
              }}
            >
              {line}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export async function getOgFonts() {
  const fontData = await readFile(path.join(process.cwd(), "public", "fonts", "malgunbd.ttf"));
  const arrayBuffer = fontData.buffer.slice(fontData.byteOffset, fontData.byteOffset + fontData.byteLength);

  return [
    {
      name: "OgKorean",
      data: arrayBuffer,
      weight: 900 as const,
      style: "normal" as const,
    },
  ];
}
