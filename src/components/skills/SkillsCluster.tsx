"use client";
import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";

type Skill = {
  id: string;
  name: string;
  size: number;
  since: string;
  projects: string[];
};

const SKILLS: Skill[] = [
  { id: "html", name: "HTML", size: 95, since: "Since early-2022", projects: ["Cloudbox-99", "Other projects"] },
  { id: "css", name: "CSS", size: 95, since: "Since early-2022", projects: ["Cloudbox-99", "Other projects"] },
  { id: "javascript", name: "JavaScript", size: 105, since: "Since early-2022", projects: ["Cloudbox-99", "Pix", "Yashashvi Collection"] },
  { id: "react", name: "React.js", size: 120, since: "Since mid-2023", projects: ["Pix", "Yashashvi Collection"] },
  { id: "next", name: "Next.js", size: 110, since: "Since 2023", projects: ["Pix", "Yashashvi Collection"] },
  { id: "ts", name: "TypeScript", size: 100, since: "Since 2023", projects: ["Pix", "Yashashvi Collection"] },
  { id: "tailwind", name: "Tailwind", size: 100, since: "Since 2023", projects: ["Pix", "Yashashvi Collection"] },
  { id: "gsap", name: "GSAP", size: 90, since: "Since 2024", projects: ["Pix"] },
  { id: "python", name: "Python", size: 90, since: "Since 2022", projects: ["OpenCV mini-projects"] },
  { id: "node", name: "Node.js", size: 86, since: "Since 2024", projects: ["Yashashvi Collection (tooling)"] },
  { id: "git", name: "Git", size: 80, since: "Since 2022", projects: ["Most projects"] },
  { id: "figma", name: "Figma", size: 78, since: "Since 2023", projects: ["Cloudbox-99", "Pix"] },
];

export function SkillsCluster() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const bgRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState<Skill | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const bubbles = gsap.utils.toArray<HTMLButtonElement>(".skill-bubble");
      bubbles.forEach((el) => {
        const dx = gsap.utils.random(-14, 14, 1, true);
        const dy = gsap.utils.random(10, 22, 1, true);
        gsap.to(el, {
          x: dx,
          y: dy,
          duration: gsap.utils.random(3.5, 6, 0.1),
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          delay: Math.random() * 0.6,
        });
      });

      const onMove = (event: MouseEvent) => {
        if (!wrapRef.current) return;
        const rect = wrapRef.current.getBoundingClientRect();
        const rx = ((event.clientX - (rect.left + rect.width / 2)) / rect.width) * 10;
        const ry = ((event.clientY - (rect.top + rect.height / 2)) / rect.height) * 10;
        gsap.to(".skill-bubble", {
          xPercent: rx,
          yPercent: ry,
          duration: 0.6,
          ease: "power2.out",
          overwrite: "auto",
        });
      };
      wrapRef.current?.addEventListener("mousemove", onMove);

      const onScroll = () => {
        if (!sectionRef.current || !bgRef.current) return;
        const rect = sectionRef.current.getBoundingClientRect();
        const translate = -rect.top * 0.08;
        gsap.to(bgRef.current, { y: translate, duration: 0.4, ease: "power2.out" });
      };

      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll);
      onScroll();

      return () => {
        wrapRef.current?.removeEventListener("mousemove", onMove);
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", onScroll);
      };
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="relative border-y border-black/10 rounded-none overflow-hidden">
      <div
        ref={bgRef}
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(0,0,0,0.25) 1px, transparent 1.5px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 py-6">
        <p className="text-center text-sm text-neutral-600 mb-6">
          These are the tools I’ve tamed (or still fighting with 🥲 ). Click a bubble to learn the gossip.
        </p>

        <div
          ref={wrapRef}
          className="relative mx-auto min-h-[160px] sm:min-h-[180px] md:min-h-[220px] flex flex-wrap items-center justify-center gap-3 sm:gap-3.5"
        >
          {SKILLS.map((skill) => (
            <motion.button
              key={skill.id}
              layoutId={`bubble-${skill.id}`}
              className="skill-bubble group relative isolate rounded-lg bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/70 border border-black/10 shadow-sm text-xs sm:text-sm flex items-center justify-center select-none outline-none"
              style={{ width: skill.size + 56, height: Math.round(skill.size * 0.52) }}
              whileHover={{ scale: 1.06, boxShadow: "0 12px 30px rgba(0,0,0,0.10)" }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              onClick={() => setActive(skill)}
            >
              <span className="px-4 text-center text-neutral-800 font-medium drop-shadow-[0_1px_0_rgba(255,255,255,0.7)]">
                {skill.name}
              </span>
              <span className="pointer-events-none absolute inset-0 rounded-lg ring-0 group-hover:ring-6 group-hover:ring-sky-200/40 transition duration-200" />
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
          >
            <div className="h-full w-full flex items-start justify-center">
              <motion.div
                layoutId={`bubble-${active.id}`}
                className="mt-[12vh] w-[min(92vw,560px)] rounded-3xl bg-white border border-black/10 shadow-xl"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ type: "spring", stiffness: 180, damping: 22 }}
                onClick={(event) => event.stopPropagation()}
              >
                <div className="p-6 sm:p-7">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-xl sm:text-2xl font-semibold">? {active.name}</div>
                      <div className="text-sm text-neutral-600 mt-1">Experience: {active.since}</div>
                    </div>
                    <button
                      className="rounded-full border border-black/10 px-3 py-1 text-sm text-neutral-700 hover:bg-neutral-50"
                      onClick={() => setActive(null)}
                    >
                      Close
                    </button>
                  </div>

                  <div className="mt-5">
                    <div className="text-sm font-medium text-neutral-700 mb-2">Used in:</div>
                    <ul className="list-disc pl-5 space-y-1 text-neutral-800">
                      {active.projects.map((project) => (
                        <li key={project}>{project}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
