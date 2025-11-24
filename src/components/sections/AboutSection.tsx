"use client";
import { motion } from "framer-motion";
import { useResumeDownload } from "@/hooks/useResumeDownload";

export function AboutSection() {
  const { resumeUrl, resumeDownloadUrl } = useResumeDownload();

  return (
    <section id="about" className="max-w-5xl mx-auto px-6 py-24">
      <motion.div
        initial={{ opacity: 0, x: -24 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="space-y-4"
      >
        <p className="text-lg leading-relaxed text-neutral-700">
          I&rsquo;m Sarayu, a final-year CSE student at ICFAI Tech School, Hyderabad. I&rsquo;ve just completed my exams and am now looking for an internship where I can apply what I&rsquo;ve learned so far. I started with frontend development because it let me blend creativity with logic, and now I&rsquo;m steadily expanding toward full-stack and broader software development.
        </p>
        <p className="text-lg leading-relaxed text-neutral-700">
          I&rsquo;ve realized that I learn best when I&rsquo;m part of a team that shares ideas, mentors growth, and tackles challenges together. With the right guidance and environment, I&rsquo;m confident I can excel - and I&rsquo;m hoping to find a place where I can contribute meaningfully while continuing to grow.
        </p>
        <div className="pt-4">
          <div className="flex flex-wrap items-center gap-3">
            <a
              href={resumeUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-black text-white px-5 py-2 text-sm font-semibold shadow-sm transition hover:-translate-y-0.5 hover:bg-black/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-black/40"
            >
              View Resume (PDF)
            </a>
            <a
              href={resumeDownloadUrl}
              download
              className="text-sm font-semibold text-neutral-700 underline hover:no-underline"
            >
              Download PDF
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
