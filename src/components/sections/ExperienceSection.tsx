"use client";
import { ExperienceCard } from "@/components/experience/Card";

const EXPERIENCE_ITEMS = [
  {
    role: "Software Developer Intern",
    stack: "React.js | Next.js | TypeScript | Tailwind CSS | GSAP | Framer Motion",
    company: "NorthNorth",
    period: "Aug 2025 - Present",
    points: [
      "Implemented scalable front-end architecture using React hooks (useState, useEffect, useMemo, useRef) and Context API for shared global state.",
      "Built reusable UI components with Tailwind and ensured pixel-perfect implementation of Figma designs.",
      "Added GSAP/Framer-Motion animations to improve interactivity while maintaining high performance.",
      "Optimized rendering, reduced unnecessary re-renders, and improved page responsiveness across multiple client applications.",
    ],
  },
  {
    role: "Frontend Intern",
    stack: "HTML | CSS | JavaScript | Figma",
    company: "Cloudbox-99",
    period: "Jun 2024 – Aug 2024",
    points: [
      "Built and revamped websites using HTML, CSS, JavaScript.",
      "Designed UI/UX prototypes in Figma.",
      "Created responsive and user-friendly interfaces.",
      "Collaborated with team members to implement design ideas effectively.",
    ],
  },
];

export function ExperienceSection() {
  return (
    <section id="experience" className="max-w-6xl mx-auto px-6 py-24">
      <h2 className="text-2xl font-semibold mb-6">Experience</h2>
      <div className="mt-6 space-y-6">
        {EXPERIENCE_ITEMS.map((item) => (
          <ExperienceCard key={item.role} {...item} />
        ))}
      </div>
    </section>
  );
}
