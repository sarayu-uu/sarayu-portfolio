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
          Software Developer Intern with foundational expertise in React.js and Next.js, currently expanding into AI-driven application development. Experienced in building responsive, scalable web interfaces and integrating intelligent features using Python, SQL, and Generative AI technologies. Actively strengthening knowledge in database systems, agentic AI architectures, and end-to-end AI workflows, with a focus on developing production-ready, data-informed applications.
        </p>
        <p className="text-lg leading-relaxed text-neutral-700">
          Currently undergoing hands-on training in SQL, emphasizing efficient data querying, normalization principles, and performance optimization techniques. Enhancing Python proficiency through structured practice in scripting, data manipulation, and algorithmic problem-solving. Applying acquired concepts through mini-projects and task-based assignments to reinforce backend development capabilities and AI-assisted system design.
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
