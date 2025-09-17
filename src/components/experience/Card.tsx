"use client";
import { motion } from "framer-motion";
import { container, item } from "@/lib/motion";

type ExperienceCardProps = {
  role: string;
  stack?: string;
  company: string;
  period: string;
  points: string[];
};

export function ExperienceCard({ role, stack, company, period, points }: ExperienceCardProps) {
  return (
    <motion.article
      className="relative bg-white border border-black/10 rounded-xl p-6 hover:bg-neutral-50 transition-colors"
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="absolute left-0 top-6 bottom-6 w-px bg-black/10" aria-hidden />
      <div className="absolute left-0 top-6 -translate-x-1/2 size-2.5 rounded-full bg-neutral-300 border border-white" aria-hidden />

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
            {stack && <span className="ml-2 text-sm font-normal text-neutral-500">— {stack}</span>}
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
