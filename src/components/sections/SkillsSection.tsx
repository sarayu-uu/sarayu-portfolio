"use client";
import { SkillsCluster } from "@/components/skills/SkillsCluster";

export function SkillsSection() {
  return (
    <section id="skills" className="max-w-6xl mx-auto px-6 py-10">
      <h2 className="text-2xl font-semibold mb-6">Skills</h2>
      <SkillsCluster />
    </section>
  );
}
