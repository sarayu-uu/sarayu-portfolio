"use client";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import {
  FiChevronDown,
  FiChevronLeft,
  FiChevronRight,
  FiExternalLink,
} from "react-icons/fi";
import { FaGithub } from "react-icons/fa";
import { SiHtml5, SiNextdotjs, SiOpencv, SiPython, SiReact } from "react-icons/si";
import { container, item } from "@/lib/motion";
import { useState } from "react";
import type { Project } from "@/lib/projects.data";

const FigmaBadgeIcon = ({ className }: { className?: string }) => (
  <svg
    width="12"
    height="16"
    viewBox="0 0 12 16"
    aria-hidden="true"
    className={`shrink-0${className ? ` ${className}` : ""}`}
  >
    <circle cx="4" cy="3" r="2.5" fill="#F24E1E" />
    <circle cx="8" cy="3" r="2.5" fill="#A259FF" />
    <circle cx="4" cy="8" r="2.5" fill="#FF7262" />
    <circle cx="8" cy="8" r="2.5" fill="#1ABCFE" />
    <circle cx="4" cy="13" r="2.5" fill="#0ACF83" />
  </svg>
);

type ProjectBadgeType = NonNullable<Project["badgeType"]>;

const getBadgeMeta = (badgeType: ProjectBadgeType) => {
  switch (badgeType) {
    case "figma":
      return { label: "Figma", icon: <FigmaBadgeIcon className="h-3" /> };
    case "html":
      return {
        label: "HTML/CSS/JS",
        icon: <SiHtml5 className="text-[#E34F26] text-sm" />,
      };
    case "reactNext":
      return {
        label: "Next.js + React",
        icon: (
          <span className="flex items-center gap-0.5">
            <SiNextdotjs className="text-[12px] text-neutral-900" />
            <SiReact className="text-[#61DAFB] text-[12px]" />
          </span>
        ),
      };
    case "opencv":
      return {
        label: "OpenCV",
        icon: <SiOpencv className="text-[#5C3EE8] text-sm" />,
      };
    case "python":
      return {
        label: "Python",
        icon: <SiPython className="text-[#3776AB] text-sm" />,
      };
    default:
      return null;
  }
};

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
  linkType = "github",
  linkLabel,
  badgeType,
}: Project) {
  const [open, setOpen] = useState(defaultOpen);
  const [currentPage, setCurrentPage] = useState(0);
  const numPages = images ? Math.ceil(images.length / 2) : 0;
  const resolvedLinkLabel =
    linkLabel ??
    (linkType === "figma"
      ? "Open in Figma"
      : linkType === "external"
      ? "Open Project"
      : "View on GitHub");
  const LinkIcon =
    linkType === "figma"
      ? FigmaBadgeIcon
      : linkType === "external"
      ? FiExternalLink
      : FaGithub;
  const resolvedBadgeType =
    badgeType ?? (linkType === "figma" ? "figma" : undefined);
  const badgeMeta = resolvedBadgeType ? getBadgeMeta(resolvedBadgeType) : null;

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
          <div className="flex items-center gap-2">
            <h3 className="text-base font-semibold">{title}</h3>
            {badgeMeta && (
              <span className="inline-flex items-center gap-1 rounded-full bg-black/5 px-2 py-0.5 text-[11px] font-medium uppercase tracking-wide text-neutral-700">
                {badgeMeta.icon}
                {badgeMeta.label}
              </span>
            )}
          </div>
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
                <LinkIcon className="mr-2 h-4 w-4" />
                {resolvedLinkLabel}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
