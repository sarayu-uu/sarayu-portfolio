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
          I am in my final year of Bachelor of Technology in Computer Science and Engineering at ICFAI Tech School, Hyderabad. Over the course of my studies, I have built a strong foundation in software development and problem-solving, while internships and projects have shown me how to translate those concepts into practical, impactful solutions. Beginning with frontend development as a way to combine creativity with logic, I am now focused on expanding my skills toward full-stack and software development.
        </p>
        <p className="text-lg leading-relaxed text-neutral-700">
          I believe that learning never stops, and the best progress happens when working with teams that share ideas and solve challenges together. My experiences have taught me that every project is more than a deliverable — it is an opportunity to grow, adapt, and refine both technical and collaborative skills. I see my journey as one of continuous improvement, preparing myself to contribute meaningfully to products and systems that matter.
        </p>
      </motion.div>
    </section>
  );
}
