import type { AffiliateConfig } from "@/content/affiliate";

type AffiliateBoxProps = {
  affiliate: AffiliateConfig;
};

export function AffiliateBox({ affiliate }: AffiliateBoxProps) {
  return (
    <aside className="affiliate-box" aria-label={`${affiliate.brand} 제휴 안내`}>
      <div>
        <span>{affiliate.brand} 제휴 안내</span>
        <h2>{affiliate.title}</h2>
        <p>{affiliate.description}</p>
        {affiliate.code ? (
          <p className="affiliate-code">
            할인 코드 <strong>{affiliate.code}</strong>
          </p>
        ) : null}
      </div>
      <a href={affiliate.href} rel="sponsored nofollow" target="_blank">
        {affiliate.buttonLabel}
      </a>
      <p className="affiliate-disclosure">{affiliate.disclosure}</p>
    </aside>
  );
}
