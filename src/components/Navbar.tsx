"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

// Sticky navbar with links and responsive hamburger behaviour
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

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const mobileMenuId = "primary-navigation-mobile";

  useEffect(() => {
    if (!isVisible) {
      setIsMenuOpen(false);
    }
  }, [isVisible]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <motion.nav
      className="relative sticky top-4 z-50 mx-auto flex w-full max-w-4xl items-center justify-end gap-4 rounded-full border border-black/10 bg-white/80 px-4 py-2 shadow-md backdrop-blur-sm md:justify-center md:px-8"
      aria-label="Primary"
      variants={variants}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      transition={{ duration: 0.3 }}
    >
      <ul className="hidden items-center gap-6 md:flex">
        {navLinks.map((link) => (
          <li key={link.name}>
            <Link
              href={link.href}
              className="text-base font-semibold tracking-tight text-black transition-colors hover:text-red-500 md:text-lg"
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>

      <button
        type="button"
        className="ml-auto inline-flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-white text-black shadow-sm transition hover:bg-black/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-black/40 md:hidden"
        aria-label="Toggle navigation menu"
        aria-expanded={isMenuOpen}
        aria-controls={mobileMenuId}
        onClick={toggleMenu}
      >
        <span className="relative flex w-6 flex-col items-center justify-center gap-1.5">
          <span
            className={`h-0.5 w-full rounded-full bg-current transition duration-200 ${isMenuOpen ? "translate-y-2 rotate-45" : ""}`}
          />
          <span
            className={`h-0.5 w-4/5 rounded-full bg-current transition duration-200 ${isMenuOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`h-0.5 w-full rounded-full bg-current transition duration-200 ${isMenuOpen ? "-translate-y-2 -rotate-45" : ""}`}
          />
        </span>
      </button>

      <div
        id={mobileMenuId}
        className={`absolute left-4 right-4 top-full mt-3 origin-top rounded-3xl border border-black/10 bg-white/95 p-4 shadow-xl backdrop-blur transition-all duration-200 md:hidden ${
          isMenuOpen ? "scale-100 opacity-100" : "pointer-events-none -translate-y-2 scale-95 opacity-0"
        }`}
        role="menu"
        aria-hidden={!isMenuOpen}
      >
        <ul className="flex flex-col gap-2">
          {navLinks.map((link) => (
            <li key={`mobile-${link.name}`}>
              <Link
                href={link.href}
                className="block rounded-2xl px-4 py-2 text-base font-semibold text-black transition hover:bg-black/5"
                onClick={closeMenu}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </motion.nav>
  );
}
