type OgCardProps = {
  title: string;
  description?: string;
  label?: string;
};

const highlightRules = [
  {
    terms: ["프롬프트 모음"],
    lines: (title: string) => ["챗지피티", "프롬프트 모음", title.includes("10가지") ? "10가지" : "복사 예시"],
  },
  {
    terms: ["아카이브"],
    lines: () => ["챗지피티", "아카이브", "보는 법"],
  },
  {
    terms: ["로그인", "오류"],
    lines: () => ["챗GPT", "로그인 오류", "해결법"],
  },
  {
    terms: ["가격", "요금제"],
    lines: () => ["ChatGPT", "가격 비교", "요금제"],
  },
  {
    terms: ["환불", "구독"],
    lines: () => ["챗지피티", "환불 구독", "해지 방법"],
  },
  {
    terms: ["이미지", "업로드"],
    lines: () => ["챗지피티", "이미지 업로드", "오류 해결"],
  },
  {
    terms: ["음성대화"],
    lines: () => ["챗지피티", "음성대화", "사용법"],
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

    if (chunks.length === 2) {
      break;
    }
  }

  if (current && chunks.length < 3) {
    chunks.push(current);
  }

  return chunks.slice(0, 3);
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
      background: "#ff7a00",
      border: "#111827",
      chip: "#0f172a",
      title: "#111827",
      note: "#fff7ed",
    };
  }

  if (label.includes("문제") || label.includes("오류")) {
    return {
      background: "#ef4444",
      border: "#111827",
      chip: "#111827",
      title: "#111827",
      note: "#fef2f2",
    };
  }

  return {
    background: "#2563eb",
    border: "#111827",
    chip: "#111827",
    title: "#111827",
    note: "#eff6ff",
  };
}

export function OgCard({ title, description, label = "AI Guide" }: OgCardProps) {
  const titleLines = getTitleLines(title);
  const accent = getAccent(label);
  const note = description ? cleanTitle(description).slice(0, 28) : "AI 쉬움";

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        background: accent.background,
        color: accent.title,
        padding: "54px",
        boxSizing: "border-box",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "#ffffff",
          border: `18px solid ${accent.border}`,
          borderRadius: "42px",
          padding: "52px 58px 44px",
          boxSizing: "border-box",
          boxShadow: "22px 24px 0 rgba(0, 0, 0, 0.22)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "20px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: accent.chip,
              color: "#ffffff",
              borderRadius: "999px",
              padding: "14px 30px",
              fontSize: "34px",
              fontWeight: 900,
              lineHeight: 1,
            }}
          >
            {label}
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "92px",
              height: "92px",
              background: "#fde047",
              border: `10px solid ${accent.border}`,
              borderRadius: "26px",
              color: "#111827",
              fontSize: "42px",
              fontWeight: 900,
            }}
          >
            AI
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            flex: 1,
            gap: "10px",
            marginTop: "20px",
          }}
        >
          {titleLines.map((line) => (
            <div
              key={line}
              style={{
                display: "flex",
                fontSize: line.length > 8 ? "86px" : "104px",
                fontWeight: 900,
                lineHeight: 0.98,
                letterSpacing: 0,
                color: accent.title,
                textShadow: "0 8px 0 #fde047",
                whiteSpace: "nowrap",
              }}
            >
              {line}
            </div>
          ))}
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "28px" }}>
          <div
            style={{
              display: "flex",
              flex: 1,
              alignItems: "center",
              background: accent.note,
              border: `8px solid ${accent.border}`,
              borderRadius: "22px",
              padding: "16px 22px",
              fontSize: "30px",
              fontWeight: 800,
              lineHeight: 1.12,
              overflow: "hidden",
              whiteSpace: "nowrap",
            }}
          >
            {note}
          </div>
          <div style={{ display: "flex", fontSize: "30px", fontWeight: 900, color: accent.title }}>AI 쉬움</div>
        </div>
      </div>
    </div>
  );
}
