type OgCardProps = {
  title: string;
  description?: string;
  label?: string;
};

function shortenText(text: string, maxLength: number) {
  return text.length > maxLength ? text.slice(0, maxLength - 1).trimEnd() + "..." : text;
}

export function OgCard({ title, description, label = "AI Guide" }: OgCardProps) {
  const safeTitle = shortenText(title, 56);
  const safeDescription = description ? shortenText(description, 78) : "";

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        background: "#f9fafb",
        color: "#111827",
        padding: "88px 104px 84px",
        boxSizing: "border-box",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
        <div
          style={{
            width: "48px",
            height: "48px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "10px",
            background: "#2563eb",
            color: "white",
            fontSize: "24px",
            fontWeight: 800,
          }}
        >
          AI
        </div>
        <div style={{ fontSize: "26px", fontWeight: 700, color: "#334155" }}>AI 쉬움</div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "20px", marginTop: "66px", maxWidth: "940px" }}>
        <div style={{ fontSize: "26px", fontWeight: 700, color: "#2563eb" }}>{label}</div>
        <div
          style={{
            fontSize: safeTitle.length > 38 ? "48px" : "58px",
            fontWeight: 800,
            lineHeight: 1.18,
            letterSpacing: 0,
          }}
        >
          {safeTitle}
        </div>
        {safeDescription ? (
          <div style={{ fontSize: "26px", lineHeight: 1.42, color: "#475569", maxWidth: "900px" }}>
            {safeDescription}
          </div>
        ) : null}
      </div>

      <div style={{ marginTop: "auto", fontSize: "24px", color: "#64748b" }}>aieazy</div>
    </div>
  );
}
