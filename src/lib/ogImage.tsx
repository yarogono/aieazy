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
      background: "#f97316",
      border: "#111827",
      chip: "#111827",
      title: "#111827",
      note: "#fde68a",
    };
  }

  if (label.includes("문제") || label.includes("오류")) {
    return {
      background: "#ef4444",
      border: "#111827",
      chip: "#111827",
      title: "#111827",
      note: "#fee2e2",
    };
  }

  return {
    background: "#2563eb",
    border: "#111827",
    chip: "#111827",
    title: "#111827",
    note: "#bfdbfe",
  };
}

export function OgCard({ title, description, label = "AI Guide" }: OgCardProps) {
  const titleLines = getTitleLines(title);
  const accent = getAccent(label);
  const note = cleanTitle(description || label).slice(0, 18);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        background: accent.background,
        color: accent.title,
        padding: "64px",
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
          border: `14px solid ${accent.border}`,
          borderRadius: "32px",
          padding: "54px 62px",
          boxSizing: "border-box",
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
              padding: "12px 26px",
              fontSize: "28px",
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
              width: "74px",
              height: "74px",
              background: accent.note,
              border: `7px solid ${accent.border}`,
              borderRadius: "18px",
              color: "#111827",
              fontSize: "32px",
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
            gap: "18px",
            marginTop: "8px",
            overflow: "hidden",
          }}
        >
          {titleLines.map((line) => (
            <div
              key={line}
              style={{
                display: "flex",
                fontSize: line.length > 8 ? "82px" : "96px",
                fontWeight: 900,
                lineHeight: 1,
                letterSpacing: 0,
                color: accent.title,
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
              alignItems: "center",
              background: "#ffffff",
              borderTop: `6px solid ${accent.border}`,
              padding: "18px 0 0",
              fontSize: "28px",
              fontWeight: 800,
              lineHeight: 1.12,
              overflow: "hidden",
              whiteSpace: "nowrap",
              color: "#374151",
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
