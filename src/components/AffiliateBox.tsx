import type { AffiliateConfig } from "@/content/affiliate";

type AffiliateBoxProps = {
  affiliate: AffiliateConfig;
  eyebrow?: string;
  title?: string;
  description?: string;
  buttonLabel?: string;
  variant?: "default" | "compact" | "mid";
};

export function AffiliateBox({
  affiliate,
  eyebrow,
  title,
  description,
  buttonLabel,
  variant = "default",
}: AffiliateBoxProps) {
  const descriptionLines = (description ?? affiliate.description).split("\n").filter(Boolean);

  return (
    <aside className={`affiliate-box affiliate-box-${variant}`} aria-label={`${affiliate.brand} 제휴 안내`}>
      <div className="affiliate-copy">
        <span>{eyebrow ?? `${affiliate.brand} 제휴 안내`}</span>
        <h2>{title ?? affiliate.title}</h2>
        {descriptionLines.map((line) => (
          <p key={line}>{line}</p>
        ))}
        {affiliate.code ? (
          <p className="affiliate-code">
            할인 코드 <strong>{affiliate.code}</strong>
          </p>
        ) : null}
      </div>
      <div className="affiliate-action">
        <a href={affiliate.href} rel="sponsored nofollow" target="_blank">
          {buttonLabel ?? affiliate.buttonLabel}
        </a>
      </div>
      <p className="affiliate-disclosure">{affiliate.disclosure}</p>
    </aside>
  );
}
