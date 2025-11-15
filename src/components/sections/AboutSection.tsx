"use client";
import { motion } from "framer-motion";

export function AboutSection() {
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
        I'm Sarayu, a final-year CSE student at ICFAI Tech School, Hyderabad. I've just completed my exams and am now looking for an internship where I can apply what I've learned so far. I started with frontend development because it let me blend creativity with logic, and now I'm steadily expanding toward full-stack and broader software development.        </p>
        <p className="text-lg leading-relaxed text-neutral-700">
        I've realized that I learn best when I'm part of a team that shares ideas, mentors growth, and tackles challenges together. With the right guidance and environment, I'm confident I can excel - and I'm hoping to find a place where I can contribute meaningfully while continuing to grow.        </p>
      </motion.div>
    </section>
  );
}
