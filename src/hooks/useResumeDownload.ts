"use client";
import { useCallback, useState } from "react";

export const RESUME_EXPORT_URL = "https://docs.google.com/document/d/1vkqkk_midPK4CG6Gkv2u9O9fghq2FPsRhuV8c2XKb68/export?format=pdf";

export function useResumeDownload(filename = "Sarayu_Ramdas_Resume.pdf") {
  const [isDownloading, setIsDownloading] = useState(false);

  const downloadResume = useCallback(async () => {
    if (isDownloading) return;

    try {
      setIsDownloading(true);
      const response = await fetch(RESUME_EXPORT_URL, {
        method: "GET",
        cache: "no-store",
        mode: "cors",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch resume");
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Resume download failed", error);
      window.open(RESUME_EXPORT_URL, "_blank", "noopener");
    } finally {
      setIsDownloading(false);
    }
  }, [filename, isDownloading]);

  return { isDownloading, downloadResume };
}
