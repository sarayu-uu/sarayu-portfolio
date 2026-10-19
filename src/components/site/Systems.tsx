import Image from "next/image";
import { systems } from "@/lib/work";
import { SectionTitle } from "./SectionTitle";

export function Systems() {
  return (
    <section id="systems" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-16 sm:px-6">
      <SectionTitle kicker="02 · AI systems" title="The plumbing behind useful AI" />
      <p className="mt-4 max-w-2xl text-muted">
        Each one starts from a question a team or customer actually asks, not from the tech.
      </p>
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {systems.map((system) => (
          <article
            key={system.name}
            className="flex flex-col overflow-hidden rounded-2xl border border-line bg-white"
          >
            {system.cover && (
              <div className="relative aspect-[16/10] border-b border-line bg-paper">
                <Image
                  src={system.cover}
                  alt={`${system.name} screenshot`}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  unoptimized={system.cover.endsWith(".svg")}
                  className="object-cover object-top"
                />
              </div>
            )}
            <div className="flex flex-1 flex-col p-6">
              <div className="flex items-center justify-between gap-2 text-sm text-muted">
                <span>{system.tag}</span>
                <span className="rounded-full border border-line px-2 py-0.5">{system.credit}</span>
              </div>
              <h3 className="mt-3 text-2xl font-semibold">{system.name}</h3>
              <p className="mt-3 font-display text-2xl italic leading-snug">&ldquo;{system.problem}&rdquo;</p>
              <p className="mt-3 text-base leading-relaxed text-muted">{system.what}</p>
              {system.href && (
                <a
                  href={system.href}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-auto pt-5 text-base font-semibold underline underline-offset-4"
                >
                  Open ↗
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
