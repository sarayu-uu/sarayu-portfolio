"use client";
import { motion } from "framer-motion";
import { container } from "@/lib/motion";
import { BentoCard } from "./BentoCard";
import { FaLinkedinIn, FaGithub } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import React, { forwardRef } from "react";
import { useResumeDownload } from "@/hooks/useResumeDownload";

interface BentoGridProps {
  windowWidth: number;
}

export const BentoGrid = forwardRef<HTMLElement, BentoGridProps>(
  ({ windowWidth }, ref) => {
    const { isDownloading, downloadResume } = useResumeDownload();

    return (
      <section id="hero" ref={ref} className="px-6 pt-8 pb-12">
        <div className="max-w-6xl mx-auto">
        {windowWidth > 0 && windowWidth < 768 && (
          <div className="bg-neutral-200 text-neutral-800 text-center py-2 text-sm font-medium">
            ⚡ Tip: View on desktop for best animations.
          </div>
        )}

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid gap-6 grid-cols-1 lg:grid-cols-3 lg:grid-rows-[1fr,1fr,auto] items-stretch"
        >
          <BentoCard
            onClick={() =>
              document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })
            }
            className="lg:col-start-1 lg:row-start-1 lg:col-span-2 lg:row-span-1"
          >
            <h2 className="text-xl font-semibold mb-4">About Me</h2>
            <p className="text-neutral-700 text-sm sm:text-base leading-relaxed">
              Hi, I am Sarayu, a CSE student from ICFAI Tech, Hyderabad, passionate about creating clean and intuitive digital experiences. I began with frontend development because it allowed me to combine creativity with logic, and my projects and internships helped me learn how to turn ideas into real solutions. I actively use <strong>AI tools</strong> to accelerate my learning, explore better approaches, and strengthen my skills as a developer. I am now looking to grow into full-stack and software development, and I hope to find an opportunity where I can learn, contribute, and build meaningful systems.
            </p>
          </BentoCard>

          <BentoCard
            onClick={() =>
              document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
            }
            className="lg:col-start-3 lg:row-start-1 lg:col-span-1 lg:row-span-2 flex flex-col min-h-[420px]"
          >
            <h2 className="text-xl font-semibold mb-2">Projects</h2>
            <p className="text-neutral-700 text-sm sm:text-base">
              Case studies in React, Next.js, and motion design.
            </p>
            <ul className="mt-4 text-base text-neutral-800 list-disc pl-5 space-y-1">
              <li> CV-AI Showdown: Rock-Paper-Scissors</li>
              <li> Breast Cancer Risk Assessment & AI Planner</li>
              <li> Ride Smart (Online Tutoring Website)</li>
              <li> Pix (SPA with GSAP animations)</li>
              <li> Ride-Smart (HTML, CSS & JavaScript)</li>
              <li> Yashasvi-Collection (frontend)</li>
              <li> Case Study Generator (API integration, Google Apps Script)</li>
              <li> MyOrigins (HTML, CSS & JavaScript)</li>
              <li> Figma designs</li>
            </ul>
          </BentoCard>

          <BentoCard
            onClick={() =>
              document.getElementById("skills")?.scrollIntoView({ behavior: "smooth" })
            }
            className="lg:col-start-1 lg:row-start-2 lg:col-span-1 lg:row-span-1 min-h-[180px]"
          >
            <h2 className="text-xl font-semibold mb-2">Skills</h2>
            <p className="text-neutral-700">
              React · Next.js · TypeScript · Tailwind · GSAP · FIGMA · Python · HTML · CSS · JavaScript · APIs · more to come
            </p>
          </BentoCard>

          <BentoCard
            onClick={() =>
              document.getElementById("experience")?.scrollIntoView({ behavior: "smooth" })
            }
            className="lg:col-start-2 lg:row-start-2 lg:col-span-1 lg:row-span-1 min-h-[180px]"
          >
            <h2 className="text-xl font-semibold mb-2">Experience</h2>
            <p className="text-neutral-700 text-sm sm:text-base">
              Software Developer Intern — <span className="text-xs sm:text-sm italic"><br />NorthNorth (Aug 2025 - Present)</span>
            </p>
            <p className="text-neutral-700 text-sm sm:text-base">
              Frontend Intern — <span className="text-xs sm:text-sm italic"><br />Cloudbox-99 (Jun 2024 - Aug 2024)</span>
            </p>
          </BentoCard>

          <BentoCard
            onClick={() =>
              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
            }
            className="lg:col-start-1 lg:row-start-3 lg:col-span-3 lg:row-span-1 p-2 overflow-hidden"
          >
            <h2 className="text-base font-semibold mb-0">Let&rsquo;s Connect</h2>
            <div className="text-neutral-700 flex flex-row flex-wrap items-center gap-3 justify-center">
              <a
                href="https://linkedin.com/in/sarayu-ramdas/"
                target="_blank"
                rel="noreferrer"
                className="underline hover:no-underline flex items-center"
              >
                <FaLinkedinIn className="mr-2" /> LinkedIn
              </a>
              <a
                href="https://github.com/sarayu-uu"
                target="_blank"
                rel="noreferrer"
                className="underline hover:no-underline flex items-center"
              >
                <FaGithub className="mr-2" /> GitHub
              </a>
              <a
                href="mailto:sarayu.ramdas04@gmail.com"
                className="underline hover:no-underline flex items-center"
              >
                <MdEmail className="mr-2" /> Email
              </a>
            </div>
            <button
              type="button"
              onClick={downloadResume}
              className="mt-4 inline-flex items-center justify-center gap-2 rounded-full border border-black/10 bg-black text-white px-4 py-2 text-xs font-semibold shadow-sm transition hover:-translate-y-0.5 hover:bg-black/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-black/40 disabled:cursor-not-allowed disabled:opacity-80"
              disabled={isDownloading}
            >
              {isDownloading ? "Preparing download..." : "Download Resume"}
            </button>
          </BentoCard>
        </motion.div>
      </div>
    </section>
    );
  }
);

BentoGrid.displayName = "BentoGrid";
