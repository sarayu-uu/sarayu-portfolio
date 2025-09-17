"use client";
import { ExperienceCard } from "@/components/experience/Card";

const EXPERIENCE_ITEMS = [
  {
    role: "Software Developer Intern",
    stack: "React.js | Next.js | TypeScript | Tailwind CSS | GSAP",
    company: "NorthNorth",
    period: "Aug 2025 – Present",
    points: [
      "Contributing to client projects using React.js and modern web frameworks.",
      "Collaborating with teams to build scalable and responsive applications.",
      "Enhancing UI/UX and implementing best practices.",
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
