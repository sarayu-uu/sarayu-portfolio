"use client";
import { useEffect, useState, useRef } from "react";
import { Inter } from "next/font/google";

import { useActiveSection } from "@/hooks/useActiveSection";
import { useSplitText } from "@/hooks/useSplitText";
import { BentoGrid } from "@/components/bento/BentoGrid";
import { AboutSection } from "@/components/sections/AboutSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { BentoHeroHeader } from "@/components/sections/BentoHeroHeader";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const SECTION_IDS: string[] = ["hero", "about", "experience", "projects", "skills", "contact"];

export default function Home() {
  const [windowWidth, setWindowWidth] = useState(0);
  const [showNavbar, setShowNavbar] = useState(false);
  const bentoGridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);

    setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (bentoGridRef.current) {
        const bentoGridBottom = bentoGridRef.current.getBoundingClientRect().bottom;
        if (window.scrollY > bentoGridBottom) {
          setShowNavbar(true);
        } else {
          setShowNavbar(false);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const activeSection = useActiveSection(SECTION_IDS);
  useSplitText("#hero-name");

  return (
    <div
      className={`min-h-screen bg-white text-neutral-900 font-sans ${inter.variable}`}
      data-active-section={activeSection}
    >
      <Navbar isVisible={showNavbar} />
      <div className="px-6 pb-2 max-w-6xl mx-auto">
        <BentoHeroHeader />
      </div>
      <BentoGrid ref={bentoGridRef} windowWidth={windowWidth} />
      <AboutSection />
      <ExperienceSection />
      <ProjectsSection />
      <SkillsSection />
      <ContactSection windowWidth={windowWidth} />
    </div>
  );
}
