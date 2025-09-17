"use client";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { MdEmail, MdPhone } from "react-icons/md";

export function ContactSection({ windowWidth }: { windowWidth: number }) {
  return (
    <section id="contact" className="max-w-6xl mx-auto px-6 py-24 pb-28">
      <h2 className="text-2xl font-semibold mb-8">Contact</h2>
      <div className="flex flex-wrap justify-center gap-8 sm:gap-12">
        <motion.a
          href="mailto:sarayu.ramdas04@gmail.com"
          className="flex flex-col items-center text-neutral-700 hover:text-neutral-900 transition-colors duration-200 group"
          whileHover={{ y: -5, scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <MdEmail className="text-5xl mb-2 group-hover:text-neutral-900 transition-colors duration-200" />
          <span className="text-sm text-neutral-600 group-hover:text-neutral-800 transition-colors duration-200">Email</span>
          <span className="text-xs text-neutral-500 mt-1">sarayu.ramdas04@gmail.com</span>
        </motion.a>

        <motion.a
          href="tel:+917780210547"
          className="flex flex-col items-center text-neutral-700 hover:text-neutral-900 transition-colors duration-200 group"
          whileHover={{ y: -5, scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <MdPhone className="text-5xl mb-2 group-hover:text-neutral-900 transition-colors duration-200" />
          <span className="text-sm text-neutral-600 group-hover:text-neutral-800 transition-colors duration-200">Phone</span>
          <span className="text-xs text-neutral-500 mt-1">+91 7780210547</span>
        </motion.a>

        <motion.a
          href="https://linkedin.com/in/sarayu-ramdas/"
          target="_blank"
          rel="noreferrer"
          className="flex flex-col items-center text-neutral-700 hover:text-neutral-900 transition-colors duration-200 group"
          whileHover={{ y: -5, scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <FaLinkedinIn className="text-5xl mb-2 group-hover:text-neutral-900 transition-colors duration-200" />
          <span className="text-sm text-neutral-600 group-hover:text-neutral-800 transition-colors duration-200">LinkedIn</span>
          <span className="text-xs text-neutral-500 mt-1">sarayu-ramdas</span>
        </motion.a>

        <motion.a
          href="https://github.com/sarayu-uu"
          target="_blank"
          rel="noreferrer"
          className="flex flex-col items-center text-neutral-700 hover:text-neutral-900 transition-colors duration-200 group"
          whileHover={{ y: -5, scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <FaGithub className="text-5xl mb-2 group-hover:text-neutral-900 transition-colors duration-200" />
          <span className="text-sm text-neutral-600 group-hover:text-neutral-800 transition-colors duration-200">GitHub</span>
          <span className="text-xs text-neutral-500 mt-1">sarayu-uu</span>
        </motion.a>
      </div>

      {windowWidth > 0 && windowWidth < 768 && (
        <p className="text-center text-xs text-neutral-500 mt-8">
          P.S. — my website looks way cooler on a laptop.
        </p>
      )}
    </section>
  );
}
