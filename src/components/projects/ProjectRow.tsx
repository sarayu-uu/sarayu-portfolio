"use client";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { FiChevronDown, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { FaGithub } from "react-icons/fa";
import { container, item } from "@/lib/motion";
import { useState } from "react";
import type { Project } from "@/lib/projects.data";

export function ProjectRow({
  title,
  summary,
  stack,
  desc,
  bullets,
  github,
  image,
  images,
  defaultOpen = false,
}: Project) {
  const [open, setOpen] = useState(defaultOpen);
  const [currentPage, setCurrentPage] = useState(0);

  const numPages = images ? Math.ceil(images.length / 2) : 0;

  const handlePrevImage = () => {
    if (images && numPages > 0) {
      setCurrentPage((prev) => (prev - 1 + numPages) % numPages);
    }
  };

  const handleNextImage = () => {
    if (images && numPages > 0) {
      setCurrentPage((prev) => (prev + 1) % numPages);
    }
  };

  const currentImageStartIndex = currentPage * 2;

  return (
    <div className="group">
      <button
        className="w-full px-4 py-4 flex items-center justify-between text-left hover:bg-neutral-50"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
      >
        <div>
          <h3 className="text-base font-semibold">{title}</h3>
          {summary && <p className="text-sm text-neutral-600">{summary}</p>}
          <p className="text-sm text-neutral-500">{stack}</p>
        </div>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="shrink-0 text-neutral-500"
        >
          <FiChevronDown size={18} />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="px-4 pb-5"
          >
            {images && images.length > 0 && (
              <div className="relative mb-4 rounded-lg overflow-hidden border border-black/10 flex space-x-2 p-2">
                <div className="w-1/2">
                  <Image
                    src={images[currentImageStartIndex]}
                    alt={`Screenshot of ${title} project ${currentImageStartIndex + 1}`}
                    width={400}
                    height={225}
                    className="rounded-lg h-auto w-full object-cover"
                  />
                </div>
                {images[currentImageStartIndex + 1] && (
                  <div className="w-1/2">
                    <Image
                      src={images[currentImageStartIndex + 1]}
                      alt={`Screenshot of ${title} project ${currentImageStartIndex + 2}`}
                      width={400}
                      height={225}
                      className="rounded-lg h-auto w-full object-cover"
                    />
                  </div>
                )}
                {images.length > 2 && (
                  <>
                    <button
                      onClick={handlePrevImage}
                      className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors z-10"
                    >
                      <FiChevronLeft size={24} />
                    </button>
                    <button
                      onClick={handleNextImage}
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors z-10"
                    >
                      <FiChevronRight size={24} />
                    </button>
                  </>
                )}
              </div>
            )}

            {image && !(images && images.length > 0) && (
              <div className="mb-4 rounded-lg overflow-hidden border border-black/10">
                <Image
                  src={image}
                  alt={`Screenshot of ${title} project`}
                  width={800}
                  height={450}
                  className="h-auto w-full object-cover"
                />
              </div>
            )}

            <div className="text-sm text-neutral-700 leading-relaxed">{desc}</div>

            {bullets && bullets.length > 0 && (
              <motion.ul
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                className="mt-3 list-disc pl-5 space-y-1 text-sm text-neutral-800"
              >
                {bullets.map((bullet, index) => (
                  <motion.li key={index} variants={item}>
                    {bullet}
                  </motion.li>
                ))}
              </motion.ul>
            )}

            <div className="mt-4">
              <a
                href={github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center text-sm underline text-neutral-800 hover:text-black"
              >
                <FaGithub className="mr-2" /> View on GitHub
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
