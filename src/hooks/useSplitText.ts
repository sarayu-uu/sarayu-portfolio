"use client";
import { useEffect } from "react";
import gsap from "gsap";

export function useSplitText(selector: string) {
  useEffect(() => {
    const el = document.querySelector(selector);
    if (!el) return;

    const text = el.textContent || "";
    el.textContent = "";

    const fragment = document.createDocumentFragment();
    [...text].forEach((char) => {
      const span = document.createElement("span");
      span.textContent = char;
      span.style.display = "inline-block";
      span.style.transform = "translateY(100%)";
      fragment.appendChild(span);
    });

    el.appendChild(fragment);

    gsap.to(`${selector} span`, {
      y: 0,
      duration: 0.6,
      ease: "power3.out",
      stagger: 0.04,
      delay: 0.15,
    });
  }, [selector]);
}
