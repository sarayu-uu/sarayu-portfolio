"use client";
import { useCallback } from "react";

export const RESUME_VIEW_URL =
  "https://docs.google.com/document/d/1vkqkk_midPK4CG6Gkv2u9O9fghq2FPsRhuV8c2XKb68/preview";
export const RESUME_EXPORT_URL =
  "https://docs.google.com/document/d/1vkqkk_midPK4CG6Gkv2u9O9fghq2FPsRhuV8c2XKb68/export?format=pdf";

export function useResumeDownload(filename = "Sarayu_Ramdas_Resume.pdf") {
  const viewResume = useCallback(() => {
    window.open(RESUME_VIEW_URL, "_blank", "noopener,noreferrer");
  }, []);

  const downloadResume = useCallback(() => {
    const link = document.createElement("a");
    link.href = RESUME_EXPORT_URL;
    link.download = filename;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    document.body.appendChild(link);
    link.click();
    link.remove();
  }, [filename]);

  return {
    viewResume,
    downloadResume,
    resumeUrl: RESUME_VIEW_URL,
    resumeDownloadUrl: RESUME_EXPORT_URL,
  };
}
