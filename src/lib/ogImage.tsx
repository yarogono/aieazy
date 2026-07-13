type OgCardProps = {
  title: string;
  description?: string;
  label?: string;
};

export function OgCard({ title, description, label = "AI Guide" }: OgCardProps) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#f8fafc",
        color: "#111827",
        padding: "72px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <div
          style={{
            width: "54px",
            height: "54px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "12px",
            background: "#2563eb",
            color: "white",
            fontSize: "28px",
            fontWeight: 800,
          }}
        >
          AI
        </div>
        <div style={{ fontSize: "28px", fontWeight: 700, color: "#334155" }}>AI \uC26C\uC6C0</div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        <div style={{ fontSize: "28px", fontWeight: 700, color: "#2563eb" }}>{label}</div>
        <div
          style={{
            fontSize: title.length > 36 ? "58px" : "68px",
            fontWeight: 800,
            lineHeight: 1.12,
            letterSpacing: 0,
          }}
        >
          {title}
        </div>
        {description ? (
          <div style={{ fontSize: "30px", lineHeight: 1.35, color: "#475569", maxWidth: "960px" }}>
            {description}
          </div>
        ) : null}
      </div>

      <div style={{ fontSize: "24px", color: "#64748b" }}>aieazy</div>
    </div>
  );
}
