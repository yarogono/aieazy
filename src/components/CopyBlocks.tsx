"use client";

import { useEffect } from "react";

function getCopyText(element: Element) {
  const clone = element.cloneNode(true) as HTMLElement;
  clone.querySelectorAll(".copy-block-button").forEach((button) => button.remove());
  return clone.innerText.trim();
}

async function copyText(text: string) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.left = "-9999px";
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();
}

export function CopyBlocks() {
  useEffect(() => {
    const targets = document.querySelectorAll<HTMLElement>(".markdown-body pre, .markdown-body blockquote");
    const cleanups: Array<() => void> = [];

    targets.forEach((target) => {
      if (target.dataset.copyReady === "true") {
        return;
      }

      target.dataset.copyReady = "true";
      target.classList.add("copy-block");

      const button = document.createElement("button");
      button.type = "button";
      button.className = "copy-block-button";
      button.textContent = "복사";
      button.setAttribute("aria-label", "내용 복사");

      const handleClick = async () => {
        const originalLabel = button.textContent ?? "복사";

        try {
          await copyText(getCopyText(target));
          button.textContent = "복사됨";
          button.classList.add("is-copied");
        } catch {
          button.textContent = "실패";
        }

        window.setTimeout(() => {
          button.textContent = originalLabel;
          button.classList.remove("is-copied");
        }, 1400);
      };

      button.addEventListener("click", handleClick);
      target.appendChild(button);
      cleanups.push(() => {
        button.removeEventListener("click", handleClick);
        button.remove();
        target.classList.remove("copy-block");
        delete target.dataset.copyReady;
      });
    });

    return () => {
      cleanups.forEach((cleanup) => cleanup());
    };
  }, []);

  return null;
}
