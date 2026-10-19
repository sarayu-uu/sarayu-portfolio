import Image from "next/image";
import Link from "next/link";
import { caseStudies } from "@/lib/work";
import { SectionTitle } from "./SectionTitle";

export function FeaturedWork() {
  return (
    <section id="work" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-16 sm:px-6">
      <SectionTitle kicker="01 · Shipped & tested" title="Things real people have used" />
      <div className="mt-10 space-y-6">
        {caseStudies.map((study, index) => (
          <article
            key={study.slug}
            className="group grid gap-8 rounded-3xl p-6 sm:p-10 md:grid-cols-[1.4fr_1fr]"
            style={{ background: study.tone.bg, color: study.tone.ink }}
          >
            <div>
              <div className="flex flex-wrap items-center gap-2 text-sm font-semibold uppercase tracking-wider">
                <span className="opacity-60">0{index + 1}</span>
                <span className="rounded-full px-2.5 py-1" style={{ background: study.tone.chip }}>
                  {study.status}
                </span>
              </div>
              <h3 className="mt-4 font-display text-6xl leading-none sm:text-7xl">{study.name}</h3>
              <p className="mt-4 max-w-xl text-xl leading-relaxed opacity-85">{study.oneLiner}</p>
              <p className="mt-3 text-base opacity-60">{study.role}</p>
              <div className="mt-8 flex flex-wrap gap-3 text-base font-semibold">
                <Link
                  href={`/work/${study.slug}`}
                  className="rounded-full px-5 py-2.5 transition hover:opacity-85"
                  style={{ background: study.tone.ink, color: study.tone.bg }}
                >
                  Read the case study →
                </Link>
                {study.live && (
                  <a
                    href={study.live}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full border px-5 py-2.5 transition hover:opacity-70"
                    style={{ borderColor: study.tone.ink }}
                  >
                    Try it live ↗
                  </a>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-6">
              {study.cover && (
                <div
                  className="relative aspect-[16/10] overflow-hidden rounded-2xl shadow-lg transition duration-500 group-hover:-rotate-1 group-hover:scale-[1.02]"
                  style={{ boxShadow: `0 20px 40px -18px ${study.tone.ink}66` }}
                >
                  <Image
                    src={study.cover}
                    alt={`${study.name} screenshot`}
                    fill
                    sizes="(min-width: 768px) 40vw, 100vw"
                    className="object-cover object-top"
                  />
                </div>
              )}
              <dl className="mt-auto grid grid-cols-2 gap-x-6 gap-y-5">
                {study.stats.map((stat) => (
                  <div key={stat.label} className="border-t pt-3" style={{ borderColor: `${study.tone.ink}33` }}>
                    <dt className="font-display text-4xl leading-none sm:text-5xl">{stat.value}</dt>
                    <dd className="mt-1 text-base opacity-70">{stat.label}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
