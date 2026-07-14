"use client";

import { useEffect, useRef } from "react";
import { adsenseConfig } from "@/content/ads";

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

type AdSenseUnitProps = {
  slot: string;
  className?: string;
  format?: "auto" | "fluid";
  layout?: "in-article";
  layoutKey?: string;
};

export function AdSenseUnit({ slot, className, format = "auto", layout, layoutKey }: AdSenseUnitProps) {
  const pushedRef = useRef(false);

  useEffect(() => {
    if (!slot || pushedRef.current) {
      return;
    }

    try {
      window.adsbygoogle = window.adsbygoogle || [];
      window.adsbygoogle.push({});
      pushedRef.current = true;
    } catch {
      pushedRef.current = false;
    }
  }, [slot]);

  if (!adsenseConfig.client || !slot) {
    return null;
  }

  return (
    <aside className={["ad-unit", className].filter(Boolean).join(" ")} aria-label="Advertisements">
      <span className="ad-unit-label">Advertisements</span>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={adsenseConfig.client}
        data-ad-slot={slot}
        data-ad-format={format}
        data-ad-layout={layout}
        data-ad-layout-key={layoutKey || undefined}
        data-full-width-responsive="true"
      />
    </aside>
  );
}
