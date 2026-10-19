import Image from "next/image";
import { playground } from "@/lib/work";
import { SectionTitle } from "./SectionTitle";

export function Playground() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <SectionTitle kicker="04 · Playground" title="Side quests & take-homes" />
      <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {playground.map((project) => {
          const body = (
            <>
              {project.cover && (
                <div className="relative mb-4 aspect-[16/9] overflow-hidden rounded-lg border border-line">
                  <Image src={project.cover} alt={`${project.name} preview`} fill sizes="(min-width: 1024px) 33vw, 100vw" unoptimized={project.cover.endsWith(".svg")} className="object-cover" />
                </div>
              )}
              <p className="text-sm text-muted">{project.tag}</p>
              <h3 className="mt-1 text-lg font-semibold">
                {project.name}
                {project.href && <span className="ml-1 text-muted">↗</span>}
              </h3>
              <p className="mt-1 text-base leading-relaxed text-muted">{project.what}</p>
            </>
          );
          return (
            <li key={project.name} className="rounded-2xl border border-line bg-white/60 p-5 transition hover:bg-white">
              {project.href ? (
                <a href={project.href} target="_blank" rel="noreferrer" className="block">
                  {body}
                </a>
              ) : (
                body
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
