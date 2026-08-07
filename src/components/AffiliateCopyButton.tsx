"use client";

import { useEffect, useRef, useState } from "react";

type AffiliateCopyButtonProps = {
  href: string;
  code: string;
  label?: string;
};

async function copyText(value: string) {
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(value);
      return;
    } catch {
      // 일부 모바일 브라우저에서는 Clipboard API가 거부될 수 있어 아래 방식으로 재시도합니다.
    }
  }

  const textarea = document.createElement("textarea");
  textarea.value = value;
  textarea.setAttribute("readonly", "true");
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();
  const copied = document.execCommand("copy");
  textarea.remove();

  if (!copied) {
    throw new Error("copy_failed");
  }
}

export function AffiliateCopyButton({ href, code, label = "할인 쿠폰 링크 바로가기" }: AffiliateCopyButtonProps) {
  const [isCopied, setIsCopied] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (closeTimer.current) {
        clearTimeout(closeTimer.current);
      }
    };
  }, []);

  async function handleClick() {
    setIsCopied(false);
    window.open(href, "_blank", "noopener,noreferrer");

    try {
      await copyText(code);
      setIsCopied(true);
      if (closeTimer.current) {
        clearTimeout(closeTimer.current);
      }
      closeTimer.current = setTimeout(() => setIsCopied(false), 2400);
    } catch {
      setIsCopied(false);
      window.alert(`할인 코드 ${code}를 복사하지 못했습니다. 직접 복사해 주세요.`);
    }
  }

  return (
    <>
      <a
        href={href}
        target="_blank"
        rel="sponsored nofollow noopener noreferrer"
        className="deal-coupon-button"
        onClick={(event) => {
          event.preventDefault();
          void handleClick();
        }}
      >
        {label} <span aria-hidden="true">↗</span>
      </a>
      {isCopied ? (
        <div className="copy-success-toast" role="status" aria-live="polite">
          <strong>할인 코드가 복사되었습니다</strong>
          <span>{code} · 새 탭에서 할인 페이지를 열었습니다.</span>
        </div>
      ) : null}
    </>
  );
}
