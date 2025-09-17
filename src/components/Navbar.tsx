"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

// New Navbar with links to sections and glass effect
interface NavbarProps {
  isVisible: boolean;
}

export default function Navbar({ isVisible }: NavbarProps) {
  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Experience", href: "#experience" },
    { name: "Projects", href: "#projects" },
    { name: "Skills", href: "#skills" },
    { name: "Contact", href: "#contact" },
  ];

  const variants = {
    visible: { opacity: 1, y: 0 },
    hidden: { opacity: 0, y: -100 },
  };

  return (
    <motion.nav
      className="max-w-md mx-auto flex items-center justify-center px-60 py-2 border-b border-black/10 sticky top-4 z-50 bg-white/80 backdrop-blur-sm rounded-full shadow-md"
      aria-label="Primary"
      variants={variants}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      transition={{ duration: 0.3 }}
    >
      <ul className="flex items-center gap-6">
        {navLinks.map((link) => (
          <li key={link.name}>
            <Link
              href={link.href}
              className="text-base md:text-lg font-semibold tracking-tight text-black hover:text-blue-500 transition-colors"
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </motion.nav>
  );
}
