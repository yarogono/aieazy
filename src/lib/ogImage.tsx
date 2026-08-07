import { readFile } from "node:fs/promises";
import path from "node:path";

type OgCardProps = {
  title: string;
  description?: string;
  label?: string;
};

function cleanTitle(title: string) {
  return title
    .replace(/\([^)]*\)/g, " ")
    .replace(/[,:|]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function getTitleLines(title: string) {
  const words = cleanTitle(title).split(" ").filter(Boolean);
  const lines: string[] = [];
  let current = "";

  for (const word of words) {
    const next = current ? `${current} ${word}` : word;

    if (current && next.length > 12) {
      lines.push(current);
      current = word;
    } else {
      current = next;
    }

    if (lines.length === 1) {
      break;
    }
  }

  if (current) {
    lines.push(current);
  }

  return lines.slice(0, 2);
}

function getDescription(description = "") {
  const normalized = description.replace(/\s+/g, " ").trim();
  return normalized.length > 92 ? `${normalized.slice(0, 92)}…` : normalized;
}

export function OgCard({ title, description, label = "AI Guide" }: OgCardProps) {
  const titleLines = getTitleLines(title);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        position: "relative",
        overflow: "hidden",
        background: "linear-gradient(135deg, #f8fafc 0%, #eef2ff 56%, #e0f2fe 100%)",
        color: "#111827",
        padding: "58px 70px",
        boxSizing: "border-box",
        fontFamily: "OgKorean, Arial, sans-serif",
      }}
    >
      <div
        style={{
          position: "absolute",
          width: 330,
          height: 330,
          right: -80,
          top: -110,
          borderRadius: 999,
          background: "#c4b5fd",
          opacity: 0.45,
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 260,
          height: 260,
          right: 230,
          bottom: -170,
          borderRadius: 999,
          background: "#99f6e4",
          opacity: 0.5,
        }}
      />
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div
          style={{
            width: 760,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              color: "#6366f1",
              fontSize: 24,
              fontWeight: 900,
              letterSpacing: 1,
              marginBottom: 28,
            }}
          >
            AIEAZY · {label}
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 4,
              fontSize: titleLines.some((line) => line.length > 10) ? 66 : 78,
              lineHeight: 1.08,
              fontWeight: 900,
              letterSpacing: -2,
            }}
          >
            {titleLines.map((line, index) => (
              <div key={`${line}-${index}`} style={{ display: "flex", color: index === 1 ? "#4f46e5" : "#111827" }}>
                {line}
              </div>
            ))}
          </div>
          {description ? (
            <div
              style={{
                display: "flex",
                marginTop: 28,
                color: "#475467",
                fontSize: 25,
                lineHeight: 1.35,
                fontWeight: 500,
              }}
            >
              {getDescription(description)}
            </div>
          ) : null}
        </div>
        <div
          style={{
            width: 230,
            height: 230,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 36,
            background: "linear-gradient(145deg, #312e81 0%, #4f46e5 58%, #0f766e 100%)",
            color: "#ffffff",
            boxShadow: "0 24px 50px rgba(49, 46, 129, 0.24)",
          }}
        >
          <div style={{ display: "flex", fontSize: 64, fontWeight: 900, lineHeight: 1 }}>AI</div>
          <div style={{ display: "flex", marginTop: 16, color: "#ccfbf1", fontSize: 25, fontWeight: 900 }}>할인 가이드</div>
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
