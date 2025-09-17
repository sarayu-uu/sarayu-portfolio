"use client";
import { ProjectRow } from "@/components/projects/ProjectRow";
import { projects } from "@/lib/projects.data";

export function ProjectsSection() {
  return (
    <section id="projects" className="max-w-6xl mx-auto px-6 py-24">
      <h2 className="text-2xl font-semibold mb-6">Projects</h2>
      <div className="divide-y divide-black/10 rounded-xl border border-black/10 bg-white">
        {projects.map((project) => (
          <ProjectRow key={project.title} {...project} />
        ))}
      </div>
    </section>
  );
}
