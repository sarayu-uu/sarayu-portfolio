"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, cubicBezier, type Variants } from "framer-motion";
import { FaLinkedinIn, FaGithub } from "react-icons/fa";
import Image from "next/image"; // Added Image import
import { FiChevronDown } from "react-icons/fi";
import { MdEmail, MdPhone } from "react-icons/md"; // Added MdPhone
import gsap from "gsap";
import { Inter } from "next/font/google";

// Custom font
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

// Hook: highlight active section in nav using IntersectionObserver
function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string>(ids[0]);
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) setActive(id);
          });
        },
        { rootMargin: "-40% 0px -55% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [ids.join(",")]);
  return active;
}

// Utility to split text into span-wrapped letters for GSAP reveal
function useSplitText(selector: string) {
  useEffect(() => {
    const el = document.querySelector(selector);
    if (!el) return;
    const text = el.textContent || "";
    el.textContent = "";
    const frag = document.createDocumentFragment();
    [...text].forEach((ch) => {
      const span = document.createElement("span");
      span.textContent = ch;
      span.style.display = "inline-block";
      span.style.transform = "translateY(100%)"; // start below
      frag.appendChild(span);
    });
    el.appendChild(frag);

    gsap.to(`${selector} span`, {
      y: 0,
      duration: 0.6,
      ease: "power3.out",
      stagger: 0.04,
      delay: 0.15,
    });
  }, [selector]);
}

// Motion variants for staggered reveal
const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 8, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

export default function Home() {
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // Set initial width
    setWindowWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Reusable Bento card
  function BentoCard({
    children,
    onClick,
    className,
  }: {
    children: React.ReactNode;
    onClick: () => void;
    className?: string;
  }) {
    return (
      <motion.button
        type="button"
        variants={item}
        onClick={onClick}
        whileHover={{ scale: 1.02, boxShadow: "0 10px 30px rgba(0,0,0,0.08)" }}
        transition={{ type: "spring", stiffness: 300, damping: 22 }}
        className={`relative bg-white rounded-2xl p-6 focus:outline-none h-full overflow-hidden ${className ?? ""}`}
      >
        <div className="absolute inset-0 rounded-2xl border border-dashed border-black/20 pointer-events-none" />
        <div className="flex h-full w-full flex-col items-start justify-start text-left relative z-10">
          {children}
        </div>
      </motion.button>
    );
  }
  const ids = ["hero", "about", "experience", "projects", "skills", "contact"];
  const active = useActiveSection(ids);
  useSplitText("#hero-name");

  // Expandable projects list for future scalability
  const projects = [
    {
      title: "MyOrigins Website",
      summary: "My first project built using HTML, CSS, and JavaScript. Focused on animations and creative layouts.",
      stack: "HTML | CSS | JavaScript",
      desc: "A simple, responsive, and visually appealing website focused on experimenting with animations and creative layouts.",
      bullets: [
        "Gained hands-on experience with front-end development basics.",
        "Practiced implementing animations and parallax effects.",
        "Improved understanding of responsive web design principles.",
      ],
      github: "https://github.com/sarayu-uu", // Placeholder, update if a specific repo exists
      images: [
        "/myorigin/myorigins1.jpg",
        "/myorigin/myorigins2.jpg",
        "/myorigin/myorigins3.jpg",
        "/myorigin/myorigins4.jpg",
      ],
    },
    {
      title: "Ride Smart – Online Tutoring Website",
      summary: "Online tutoring platform concept with interactive UI elements and layouts.",
      stack: "HTML | CSS | JavaScript",
      desc: "An online tutoring platform concept focused on experimenting with interactive UI elements and layouts.",
      bullets: [
        "Learned how to implement card flip animations with CSS/JS.",
        "Experimented with background image usage for section design.",
        "Gained experience in designing a custom footer layout.",
        "Improved knowledge of UI/UX principles for online platforms.",
      ],
      github: "https://github.com/sarayu-uu", // Placeholder, update if a specific repo exists
      images: [
        "/ride-smart/ride-smart1.jpg",
        "/ride-smart/ride-smart2.jpg",
        "/ride-smart/ride-smart3.jpg",
        "/ride-smart/ride-smart4.jpg",
      ],
    },
    {
      title: "Breast Cancer Risk Assessment & AI Planner",
      summary: "Healthcare-focused web app with Streamlit, ML explainability, and AI for breast cancer prevention.",
      stack: "Streamlit | Python (Scikit-learn, Pandas, NumPy) | SHAP | Google Generative AI API",
      desc: "A healthcare-focused web app built with Streamlit, combining machine learning explainability, AI, and interactive UI to provide early risk assessment and personalized lifestyle guidance for breast cancer prevention.",
      bullets: [
        "Gained first experience with Streamlit for deploying ML apps.",
        "Learned to generate and interpret SHAP plots for model explainability.",
        "Explored AI API integration into real-world applications.",
        "Practiced designing a user-facing ML tool with healthcare focus.",
      ],
      github: "https://github.com/sarayu-uu", // Placeholder, update if a specific repo exists
      images: [
        "/HBCR/breastcancer-riskassessment.jpg",
        "/HBCR/breastcancer-riskassessment1.jpg",
        "/HBCR/breastcancer-riskassessment3.jpg",
        "/HBCR/breastcancer-riskassessment4.jpg",
      ],
    },
    {
      title: "CV-AI Showdown: Rock-Paper-Scissors",
      summary: "A computer vision + AI-powered game built with Python & OpenCV for real-time hand gesture detection.",
      stack: "Python 3.x | OpenCV | NumPy | JSON/CSV",
      desc: "A computer vision + AI-powered game built with Python & OpenCV that detects real-time hand gestures (Rock, Paper, Scissors) using your webcam and features a multi-strategy AI opponent for an engaging gameplay experience.",
      bullets: [
        "Implemented gesture recognition pipeline using contours & convexity defects.",
        "Learned adaptive hand detection techniques for varying lighting conditions.",
        "Designed and built a multi-strategy AI opponent.",
        "Created a custom OpenCV-based interactive UI with menus and animations.",
        "Explored statistics visualization for gameplay analytics.",
      ],
      github: "https://github.com/sarayu-uu", // Placeholder, update if a specific repo exists
      images: [
        "/RPS/rps1.jpg",
        "/RPS/rps2.jpg",
        "/RPS/rps3.jpg",
        "/RPS/rps4.jpg",
      ],
    },
    {
      title: "Yashashvi Collection [working]",
      summary: "Modern e-commerce frontend with responsive UI. Backend development is currently in progress.",
      stack: "Next.js | React | TypeScript | Tailwind CSS",
      desc: "Modern e-commerce frontend. Features: catalog, cart, wishlist, authentication, admin panel. Context API for global state. Currently working on finishing the backend part.",
      bullets: [
        "Developed product catalog, cart, and wishlist flows with state management.",
        "Implemented authentication scaffolding and basic admin views.",
        "Designed clean, responsive UI with Tailwind and reusable UI primitives.",
      ],
      github: "https://github.com/sarayu-uu",
      images: [
        "/yashashvi/y1.jpg",
        "/yashashvi/y2.jpg",
        "/yashashvi/y3.jpg",
        "/yashashvi/y4.jpg",
      ],
    },
    {
      title: "Pix",
      summary: "Storytelling-driven SPA with GSAP animations.",
      stack: "Next.js | React | GSAP | TypeScript",
      desc: "Storytelling-driven SPA with GSAP animations. Modular components for problem-solution, services, case studies, CTA.",
      bullets: [
        "Built modular sections (problem/solution, services, case studies, CTA) with reusable components.",
        "Implemented GSAP timelines for smooth, narrative-driven scroll animations.",
        "Optimized performance and layout for responsive devices.",
      ],
      github: "https://github.com/sarayu-uu",
      image: "/project-pix.png", // Placeholder image
      images: [
        "/pix/pix.jpg",
        "/pix/pix2.jpg",
        "/pix/pix3.jpg",
        "/pix/pix4.jpg",
      ],
    },
    
    {
      title: "Portfolio Website [this very one]",
      summary: "Personal portfolio showcasing projects and skills.",
      stack: "Next.js | React | TypeScript | Tailwind CSS | Framer Motion | GSAP",
      desc: "A personal portfolio website designed to showcase my projects, skills, and experience in a clean and interactive manner.",
      bullets: [
        "Developed a responsive and visually appealing portfolio website.",
        "Integrated Framer Motion and GSAP for smooth animations and transitions.",
        "Designed and implemented a minimalistic contact section with animated icons.",
      ],
      github: "https://github.com/sarayu-uu", // Assuming a repo for the portfolio itself
      
    },
  ];

  return (
    <div className={`min-h-screen bg-white text-neutral-900 font-sans ${inter.variable}`}>
      {windowWidth > 0 && windowWidth < 768 && (
        <div className="bg-neutral-200 text-neutral-800 text-center py-2 text-sm font-medium">
          💡 Tip: View on desktop for best animations.
        </div>
      )}
      {/* Hero (Bento Grid) */}
      <section id="hero" className="px-6 pt-8 pb-12">
        <div className="max-w-6xl mx-auto">
          {/* Title */}
          <h1 id="hero-name" className="text-4xl sm:text-6xl font-semibold tracking-tight mt-0 mb-8">
            Sarayu Ramdas
          </h1>

          {/* Bento Grid Desktop: 3 columns x 2 rows to match the sketch */}
          {/* col-span map (lg):
            - About: col-span-2 row-span-1 (top-left wide)
            - Projects: col-span-1 row-span-2 (entire right column)
            - Skills: col-span-1 row-span-1 (bottom-left square)
            - Experience: col-span-1 row-span-1 (bottom-center-left)
            - Contact: col-span-1 row-span-1 (bottom-right under Projects)
          */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid gap-6 grid-cols-1 lg:grid-cols-3 lg:grid-rows-[1fr,1fr,auto] items-stretch"
          >
            {/* About (Top-left wide) */}
<BentoCard
  onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
  className="lg:col-start-1 lg:row-start-1 lg:col-span-2 lg:row-span-1"
>
  <h2 className="text-xl font-semibold mb-4">About Me</h2>
  <p className="text-neutral-700 text-sm sm:text-base leading-relaxed">
    I am a Computer Science and Engineering student at ICFAI Tech, Hyderabad, driven by a passion for building intuitive and purposeful digital experiences. Starting with frontend development has allowed me to express my creativity through design and interactivity, while internships and projects have strengthened my ability to collaborate and deliver solutions in real-world settings. Looking ahead, I aspire to expand into full-stack and software development, growing beyond interfaces to craft complete, impactful systems that bridge design, engineering, and user needs.
  </p>
</BentoCard>

{/* Projects (Right column, top) */}
<BentoCard
  onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
  className="lg:col-start-3 lg:row-start-1 lg:col-span-1 lg:row-span-2 flex flex-col min-h-[420px]"
>
  <h2 className="text-xl font-semibold mb-2">Projects</h2>
  <p className="text-neutral-700 text-sm sm:text-base">Case studies in React, Next.js, and motion design.</p>
  <ul className="mt-4 text-base text-neutral-800 list-disc pl-5 space-y-1">
    <li> CV-AI Showdown: Rock-Paper-Scissors</li>
    <li> Breast Cancer Risk Assessment & AI Planner</li>
    <li> Ride Smart (Online Tutoring Website)</li>
    <li> Pix (SPA with GSAP animations)</li>
    
    <li> Ride-Smart (HTML, CSS & JavaScript)</li>
    <li> Yashashvi Collection (E-commerce frontend - backend in progress)</li>
    <li> MyOrigins (HTML, CSS & JavaScript)</li>
    <li> [working on more]</li>
  </ul>
</BentoCard>

{/* Skills (Bottom-left square) */}
<BentoCard
  onClick={() => document.getElementById("skills")?.scrollIntoView({ behavior: "smooth" })}
  className="lg:col-start-1 lg:row-start-2 lg:col-span-1 lg:row-span-1 min-h-[180px]"
>
  <h2 className="text-xl font-semibold mb-2">Skills</h2>
  <p className="text-neutral-700">React · Next.js · TypeScript · Tailwind · GSAP · FIGMA · Python · HTML · CSS · JavaScript more to come</p>
</BentoCard>

{/* Experience (Bottom center-left) */}
<BentoCard
  onClick={() => document.getElementById("experience")?.scrollIntoView({ behavior: "smooth" })}
  className="lg:col-start-2 lg:row-start-2 lg:col-span-1 lg:row-span-1 min-h-[180px]"
>
  <h2 className="text-xl font-semibold mb-2">Experience</h2>
  <p className="text-neutral-700 text-sm sm:text-base">Software Developer Intern  — <span className="text-xs sm:text-sm italic"><br></br>NorthNorth (Aug 2025 – Present)</span></p>
  <p className="text-neutral-700 text-sm sm:text-base">Frontend Intern  — <span className="text-xs sm:text-sm italic"><br></br>Cloudbox-99 (Jun 2024 – Aug 2024)</span></p>
</BentoCard>

{/* Contact (Bottom-right, very small height) */}
<BentoCard
  onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
  className="lg:col-start-1 lg:row-start-3 lg:col-span-3 lg:row-span-1 p-2 overflow-hidden"
>
  <h2 className="text-base font-semibold mb-0">Let’s Connect</h2>
  <div className="text-neutral-700 flex flex-row items-center gap-3 justify-center">
    <a href="https://linkedin.com/in/sarayu-ramdas/" target="_blank" rel="noreferrer" className="underline hover:no-underline flex items-center">
      <FaLinkedinIn className="mr-2" /> LinkedIn
    </a>
    <a href="https://github.com/sarayu-uu" target="_blank" rel="noreferrer" className="underline hover:no-underline flex items-center">
      <FaGithub className="mr-2" /> GitHub
    </a>
    <a href="mailto:sarayu.ramdas04@gmail.com" className="underline hover:no-underline flex items-center">
      <MdEmail className="mr-2" /> Email
    </a>
  </div>
</BentoCard>

          </motion.div>
        </div>
      </section>

      {/* Fixed overlay Floating Nav (reveals after slight scroll) */}
      <FloatingNav ids={ids} active={active} />

      {/* About */}
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

      {/* Experience - Vertical stacked list */}
      <section id="experience" className="max-w-6xl mx-auto px-6 py-24">
        <h2 className="text-2xl font-semibold mb-6">Experience</h2>
        <div className="mt-6 space-y-6">
          {[
            {
              role: "Software Developer Intern",
              stack: "React.js | Next.js | TypeScript | Tailwind CSS | GSAP",
              company: "NorthNorth",
              period: "Aug 2025 – Present",
              points: [
                "Contributing to client projects using React.js and modern web frameworks.",
                "Collaborating with teams to build scalable and responsive applications.",
                "Enhancing UI/UX and implementing best practices.",
              ],
            },
            {
              role: "Frontend Intern",
              stack: "HTML | CSS | JavaScript | Figma",
              company: "Cloudbox-99",
              period: "Jun 2024 – Aug 2024",
              points: [
                "Built and revamped websites using HTML, CSS, JavaScript.",
                "Designed UI/UX prototypes in Figma.",
                "Created responsive and user-friendly interfaces.",
                "Collaborated with team members to implement design ideas effectively.",
              ],
            },
          ].map((item, i) => (
            <Card key={i} {...item} />
          ))}
        </div>
      </section>

      {/* Projects - Expandable Case Studies (Accordion) */}
      <section id="projects" className="max-w-6xl mx-auto px-6 py-24">
        <h2 className="text-2xl font-semibold mb-6">Projects</h2>
        <div className="divide-y divide-black/10 rounded-xl border border-black/10 bg-white">
          {projects.map((p) => (
            <ProjectRow key={p.title} {...p} />
          ))}
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="max-w-6xl mx-auto px-6 py-10">
        <h2 className="text-2xl font-semibold mb-6">Skills</h2>
        <SkillsCluster />
      </section>

      {/* Contact */}
      <section id="contact" className="max-w-6xl mx-auto px-6 py-24 pb-28">
        <h2 className="text-2xl font-semibold mb-8">Contact</h2> {/* Increased mb for spacing */}
        <div className="flex flex-wrap justify-center gap-8 sm:gap-12">
          {/* Email */}
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

          {/* Phone */}
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

          {/* LinkedIn */}
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

          {/* GitHub */}
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
    </div>
  );
}

function Card({ role, stack, company, period, points }: { role: string; stack?: string; company: string; period: string; points: string[] }) {
  // Vertical card with animations and responsive date alignment
  return (
    <motion.article
      className="relative bg-white border border-black/10 rounded-xl p-6 hover:bg-neutral-50 transition-colors"
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
    >
      {/* Optional subtle left border + dot for timeline feel */}
      <div className="absolute left-0 top-6 bottom-6 w-px bg-black/10" aria-hidden />
      <div className="absolute left-0 top-6 -translate-x-1/2 size-2.5 rounded-full bg-neutral-300 border border-white" aria-hidden />

      {/* Header: Role + Stack, Company, Dates (right-aligned on md+) */}
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
          {/* On small screens, date below company */}
          <p className="text-sm text-neutral-500 mt-2 md:hidden">{period}</p>
        </div>
        {/* On md+, date right-aligned */}
        <p className="text-sm text-neutral-500 hidden md:block">{period}</p>
      </div>

      {/* Bullets with staggered reveal on scroll */}
      <motion.ul
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        className="mt-4 list-disc pl-5 space-y-2 text-sm text-neutral-700"
      >
        {points.map((p, i) => (
          <motion.li key={i} variants={item}>{p}</motion.li>
        ))}
      </motion.ul>
    </motion.article>
  );
}

// Expandable project row (accordion)
import { FiChevronLeft, FiChevronRight } from "react-icons/fi"; // Import carousel icons

// Expandable project row (accordion)
function ProjectRow({ title, summary, stack, desc, bullets, github, image, images, defaultOpen = false }: { title: string; summary?: string; stack: string; desc: string; bullets?: string[]; github: string; image?: string; images?: string[]; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  const [currentPage, setCurrentPage] = useState(0);

  const numPages = images ? Math.ceil(images.length / 2) : 0;

  const handlePrevImage = () => {
    if (images && numPages > 0) {
      setCurrentPage((prevPage) => (prevPage - 1 + numPages) % numPages);
    }
  };

  const handleNextImage = () => {
    if (images && numPages > 0) {
      setCurrentPage((prevPage) => (prevPage + 1) % numPages);
    }
  };

  const currentImageStartIndex = currentPage * 2;
  return (
    <div className="group">
      {/* Header row */}
      <button
        className="w-full px-4 py-4 flex items-center justify-between text-left hover:bg-neutral-50"
        onClick={() => setOpen((v) => !v)}
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

      {/* Content */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="px-4 pb-5"
          >
            {(images && images.length > 0) && (
              <div className="relative mb-4 rounded-lg overflow-hidden border border-black/10 flex space-x-2 p-2">
                {/* Display the first image */}
                <div className="w-1/2">
                  <Image
                    src={images[currentImageStartIndex]}
                    alt={`Screenshot of ${title} project ${currentImageStartIndex + 1}`}
                    width={400}
                    height={225}
                    layout="responsive"
                    objectFit="cover"
                    className="rounded-lg"
                  />
                </div>
                {/* Display the second image, if available */}
                {images[currentImageStartIndex + 1] && (
                  <div className="w-1/2">
                    <Image
                      src={images[currentImageStartIndex + 1]}
                      alt={`Screenshot of ${title} project ${currentImageStartIndex + 2}`}
                      width={400}
                      height={225}
                      layout="responsive"
                      objectFit="cover"
                      className="rounded-lg"
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
            {image && !(images && images.length > 0) && ( // Fallback for single image if 'images' array is not present
              <div className="mb-4 rounded-lg overflow-hidden border border-black/10">
                <Image
                  src={image}
                  alt={`Screenshot of ${title} project`}
                  width={800} // Adjust width as needed
                  height={450} // Adjust height as needed (e.g., 16:9 aspect ratio)
                  layout="responsive"
                  objectFit="cover"
                />
              </div>
            )}
            <div className="text-sm text-neutral-700 leading-relaxed">
              {desc}
            </div>

            {bullets && bullets.length > 0 && (
              <motion.ul
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                className="mt-3 list-disc pl-5 space-y-1 text-sm text-neutral-800"
              >
                {bullets.map((b, i) => (
                  <motion.li key={i} variants={item}>{b}</motion.li>
                ))}
              </motion.ul>
            )}

            <div className="mt-4">
              <a href={github} target="_blank" rel="noreferrer" className="inline-flex items-center text-sm underline text-neutral-800 hover:text-black">
                <FaGithub className="mr-2" /> View on GitHub
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

import { HiMenu, HiX } from "react-icons/hi"; // Import hamburger icons

function FloatingNav({ ids, active }: { ids: string[]; active: string }) {
  const [visible, setVisible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // State for mobile menu
  const navRef = useRef<HTMLElement>(null); // Ref for the nav element

  useEffect(() => {
    const computeThreshold = () => {
      const hero = document.getElementById("hero");
      return (hero?.offsetHeight || 0) - 8;
    };

    let threshold = computeThreshold();

    const onScroll = () => {
      setVisible(window.scrollY >= threshold);
    };
    const onResize = () => {
      threshold = computeThreshold();
      onScroll();
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  // Close menu when a link is clicked
  const handleNavLinkClick = () => {
    setMenuOpen(false);
  };

  // Close menu if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [navRef]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          ref={navRef}
          initial={{ y: -12, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -12, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed z-50"
        >
          {/* Mobile Hamburger Menu */}
          <div className="md:hidden fixed top-4 left-4">
            <div className="relative">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="size-12 rounded-full bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/50 border border-black/10 shadow-sm flex items-center justify-center text-neutral-600 hover:text-black hover:bg-neutral-100 transition-colors"
                aria-label="Toggle navigation menu"
              >
                {menuOpen ? <HiX size={24} /> : <HiMenu size={24} />}
              </button>

              <AnimatePresence>
                {menuOpen && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-0 left-full ml-4 bg-white border border-black/10 shadow-lg rounded-xl py-2 min-w-[160px]"
                  >
                    <div className="flex flex-col gap-2 text-sm">
                      {ids.map((id) => (
                        <a
                          key={id}
                          href={`#${id}`}
                          className={`block px-4 py-2 transition-colors ${active === id ? "text-black font-semibold bg-neutral-50" : "text-neutral-700 hover:bg-neutral-50"}`}
                          onClick={handleNavLinkClick}
                        >
                          {id[0].toUpperCase() + id.slice(1)}
                        </a>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Desktop Glass Navbar */}
          <div className="hidden md:block fixed top-3 inset-x-0">
            <div className="max-w-6xl mx-auto px-4">
              <div className="bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/50 border border-black/10 shadow-sm rounded-full px-4 py-2 flex items-center justify-center w-fit mx-auto">
                <div className="flex gap-4 text-sm">
                  {ids.map((id) => (
                    <a
                      key={id}
                      href={`#${id}`}
                      className={`px-1 transition-colors ${active === id ? "text-black" : "text-neutral-600 hover:text-black"}`}
                      onClick={handleNavLinkClick}
                    >
                      {id[0].toUpperCase() + id.slice(1)}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}

function SkillsCluster() {
  // Data: skills with size (px), since, and projects list
  type Skill = {
    id: string;
    name: string;
    size: number; // bubble diameter in px
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

  const sectionRef = useRef<HTMLDivElement | null>(null);
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const bgRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState<Skill | null>(null);

  // GSAP: floating animation + mouse parallax + scroll parallax background
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Gentle float for each bubble (x/y)
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

      // Cursor parallax: shift all bubbles slightly using xPercent/yPercent (won't fight x/y)
      const onMove = (e: MouseEvent) => {
        if (!wrapRef.current) return;
        const r = wrapRef.current.getBoundingClientRect();
        const rx = ((e.clientX - (r.left + r.width / 2)) / r.width) * 10; // -10 .. 10
        const ry = ((e.clientY - (r.top + r.height / 2)) / r.height) * 10;
        gsap.to(".skill-bubble", { xPercent: rx, yPercent: ry, duration: 0.6, ease: "power2.out", overwrite: "auto" });
      };
      wrapRef.current?.addEventListener("mousemove", onMove);

      // Scroll parallax for the background grid
      const onScroll = () => {
        if (!sectionRef.current || !bgRef.current) return;
        const rect = sectionRef.current.getBoundingClientRect();
        const translate = -rect.top * 0.08; // subtle move opposite to scroll
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
      {/* Parallax background: subtle dot grid */}
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
          These are the tools I’ve tamed (or still fighting with 🥲). Click a bubble to learn the gossip.
        </p>

        {/* Bubble cluster */}
        <div
          ref={wrapRef}
          className="relative mx-auto min-h-[160px] sm:min-h-[180px] md:min-h-[220px] flex flex-wrap items-center justify-center gap-3 sm:gap-3.5"
        >
          {SKILLS.map((s) => (
            <motion.button
              key={s.id}
              layoutId={`bubble-${s.id}`}
              className="skill-bubble group relative isolate rounded-lg bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/70 border border-black/10 shadow-sm text-xs sm:text-sm flex items-center justify-center select-none outline-none"
              style={{ width: s.size + 56, height: Math.round(s.size * 0.52) }}
              whileHover={{ scale: 1.06, boxShadow: "0 12px 30px rgba(0,0,0,0.10)" }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              onClick={() => setActive(s)}
            >
              <span className="px-4 text-center text-neutral-800 font-medium drop-shadow-[0_1px_0_rgba(255,255,255,0.7)]">
                {s.name}
              </span>
              {/* Glow on hover */}
              <span className="pointer-events-none absolute inset-0 rounded-lg ring-0 group-hover:ring-6 group-hover:ring-sky-200/40 transition duration-200" />
            </motion.button>
          ))}
        </div>
      </div>

      {/* Modal: expanded bubble */}
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
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-6 sm:p-7">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-xl sm:text-2xl font-semibold">⚡ {active.name}</div>
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
                      {active.projects.map((p) => (
                        <li key={p}>{p}</li>
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
