"use client";

import { useEffect, useRef, useState } from "react";
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
  const containerRef = useRef<HTMLElement>(null);
  const pushedRef = useRef(false);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    if (!slot) {
      return;
    }

    const container = containerRef.current;

    if (!container || !("IntersectionObserver" in window)) {
      setShouldLoad(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "600px 0px" },
    );

    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  }, [slot]);

  useEffect(() => {
    if (!slot || !shouldLoad || pushedRef.current) {
      return;
    }

    try {
      window.adsbygoogle = window.adsbygoogle || [];
      window.adsbygoogle.push({});
      pushedRef.current = true;
    } catch {
      pushedRef.current = false;
    }
  }, [slot, shouldLoad]);

  if (!adsenseConfig.client || !slot) {
    return null;
  }

  return (
    <aside ref={containerRef} className={["ad-unit", className].filter(Boolean).join(" ")} aria-label="Advertisements">
      <span className="ad-unit-label">Advertisements</span>
      {shouldLoad ? (
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
      ) : null}
    </aside>
  );
}
