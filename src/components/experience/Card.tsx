"use client";
import { useLayoutEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { container, item } from "@/lib/motion";

type ExperienceCardProps = {
  role: string;
  stack?: string;
  company: string;
  period: string;
  points: string[];
};

gsap.registerPlugin(ScrollTrigger);

export function ExperienceCard({ role, stack, company, period, points }: ExperienceCardProps) {
  const cardRef = useRef<HTMLElement | null>(null);
  const lineRef = useRef<HTMLDivElement | null>(null);
  const heartRef = useRef<HTMLSpanElement | null>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  useLayoutEffect(() => {
    const cardEl = cardRef.current;
    const lineEl = lineRef.current;
    const heartEl = heartRef.current;

    if (!cardEl || !lineEl || !heartEl) return;

    // Make sure heart starts at top (no transform)
    gsap.set(heartEl, { y: 0, clearProps: "opacity,scale" });

    // Lazily compute travel distance (px)
    const computeTravel = () => {
      const travel = Math.max(0, lineEl.offsetHeight - heartEl.offsetHeight);
      return travel;
    };

    // Kill previous if any (safety during HMR)
    if (tweenRef.current) {
      tweenRef.current.scrollTrigger && tweenRef.current.scrollTrigger.kill();
      tweenRef.current.kill();
    }

    tweenRef.current = gsap.to(heartEl, {
      y: () => computeTravel(),
      ease: "power3.out",
      // tie to scroll with scrub for smooth follow
      scrollTrigger: {
        trigger: cardEl,
        start: "center center", // start when card center hits viewport center
        end: () => `+=${computeTravel()}`, // end after travel px so movement maps exactly
        scrub: 0.6, // smooth scrubbing; increase for more smoothing
        invalidateOnRefresh: true, // recalc on resize
        onRefresh: () => {
          const newTravel = computeTravel();
          const currentY = Number(gsap.getProperty(heartEl, "y")) || 0;
          gsap.set(heartEl, { y: Math.min(newTravel, currentY) });
        },
        // markers: true, // enable for debugging
      },
      overwrite: true,
    });

    // ensure ScrollTrigger knows about layout changes
    ScrollTrigger.refresh();

    return () => {
    if (tweenRef.current) {
      tweenRef.current.scrollTrigger && tweenRef.current.scrollTrigger.kill();
      tweenRef.current.kill();
      tweenRef.current = null;
    }
    };
  }, []);

  return (
    <motion.article
      ref={cardRef}
      className="relative bg-white border border-black/10 rounded-xl p-6 hover:bg-neutral-50 transition-colors"
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
    >
      {/* Timeline container */}
      <div className="absolute left-0 top-6 bottom-6 flex justify-center pointer-events-none" aria-hidden>
        {/* vertical timeline line */}
        <div ref={lineRef} className="relative h-full w-px bg-black/10">
          {/* animated heart (plain span for GSAP) */}
          <span
            ref={heartRef}
            className="absolute left-1/2 -translate-x-1/2"
            style={{ top: 0, lineHeight: 0, display: "inline-block" }}
            aria-hidden
          >
            {/* small SVG heart (14x14) */}
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="#ef4444"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 21s-6.2-4.35-9.33-8.17C-1.24 7.62 1.39 2 6.2 2 8.55 2 10.4 3.44 12 5.35 13.6 3.44 15.45 2 17.8 2c4.81 0 7.44 5.62 3.53 10.83C18.2 16.65 12 21 12 21z" />
            </svg>
          </span>
        </div>
      </div>

      <div className="md:flex md:items-start md:justify-between">
        <div>
          <motion.h3
            variants={item}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.6 }}
            className="text-lg font-semibold mb-1"
          >
            {role}
            {stack && <span className="ml-2 text-sm font-normal text-neutral-500">- {stack}</span>}
          </motion.h3>
          <p className="italic text-neutral-700">{company}</p>
          <p className="text-sm text-neutral-500 mt-2 md:hidden">{period}</p>
        </div>
        <p className="text-sm text-neutral-500 hidden md:block">{period}</p>
      </div>

      <motion.ul
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        className="mt-4 list-disc pl-5 space-y-2 text-sm text-neutral-700"
      >
        {points.map((point, index) => (
          <motion.li key={index} variants={item}>
            {point}
          </motion.li>
        ))}
      </motion.ul>
    </motion.article>
  );
}
