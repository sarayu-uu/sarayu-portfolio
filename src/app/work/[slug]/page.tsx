import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { caseStudies, getCaseStudy } from "@/lib/work";
import { SiteHeader } from "@/components/site/SiteHeader";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const study = getCaseStudy((await params).slug);
  if (!study) return {};
  return { title: `${study.name} | Sarayu Ramdas`, description: study.oneLiner };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  const index = caseStudies.findIndex((c) => c.slug === slug);
  const next = caseStudies[(index + 1) % caseStudies.length];

  return (
    <>
      <SiteHeader />
      <main>
        <header style={{ background: study.tone.bg, color: study.tone.ink }}>
          <div className="mx-auto max-w-4xl px-4 pb-14 pt-12 sm:px-6 sm:pt-16">
            <Link href="/#work" className="text-base opacity-70 hover:opacity-100">
              ← All work
            </Link>
            <p className="mt-8 text-sm font-semibold uppercase tracking-wider">
              <span className="rounded-full px-2.5 py-1" style={{ background: study.tone.chip }}>
                {study.status}
              </span>
            </p>
            <h1 className="mt-5 font-display text-[clamp(3rem,10vw,6.5rem)] leading-[0.9]">{study.name}</h1>
            <p className="mt-6 max-w-2xl text-2xl leading-relaxed opacity-85">{study.oneLiner}</p>

            <dl className="mt-10 grid gap-6 text-base sm:grid-cols-3">
              <div>
                <dt className="opacity-60">Role</dt>
                <dd className="mt-1">{study.role}</dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="opacity-60">Stack</dt>
                <dd className="mt-1">{study.stack.join(" · ")}</dd>
              </div>
            </dl>

            {study.live && (
              <a
                href={study.live}
                target="_blank"
                rel="noreferrer"
                className="mt-10 inline-block rounded-full px-6 py-3 text-base font-semibold transition hover:opacity-85"
                style={{ background: study.tone.ink, color: study.tone.bg }}
              >
                Try it live ↗
              </a>
            )}
          </div>
        </header>

        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <dl className="grid grid-cols-2 gap-6 border-b border-line py-10 sm:grid-cols-4">
            {study.stats.map((stat) => (
              <div key={stat.label}>
                <dt className="font-display text-5xl leading-none sm:text-6xl">{stat.value}</dt>
                <dd className="mt-2 text-base text-muted">{stat.label}</dd>
              </div>
            ))}
          </dl>

          {study.cover && (
            <div className="relative my-10 aspect-[16/10] overflow-hidden rounded-2xl border border-line">
              <Image src={study.cover} alt={`${study.name} screenshot`} fill sizes="(min-width: 896px) 896px, 100vw" className="object-cover object-top" />
            </div>
          )}

          {study.videos && study.videos.length > 0 && (
            <div className="pb-4">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted">Real kids, real sessions</p>
              <div className="mt-4 grid gap-6 sm:grid-cols-2">
                {study.videos.map((video) => (
                  <figure key={video.src}>
                    <video
                      src={video.src}
                      poster={video.poster}
                      controls
                      muted
                      playsInline
                      preload="none"
                      className="aspect-video w-full rounded-2xl border border-line bg-ink object-cover"
                    />
                    <figcaption className="mt-2 text-base text-muted">{video.caption}</figcaption>
                  </figure>
                ))}
              </div>
            </div>
          )}

          <div className="space-y-14 py-14">
            {study.sections.map((section) => (
              <section key={section.heading} className="grid gap-4 md:grid-cols-[200px_1fr]">
                <h2 className="font-display text-3xl leading-tight">{section.heading}</h2>
                <div className="space-y-4 text-xl leading-relaxed text-ink/80">
                  {section.body && <p>{section.body}</p>}
                  {section.bullets && (
                    <ul className="space-y-2 text-lg">
                      {section.bullets.map((bullet) => (
                        <li key={bullet} className="flex gap-3">
                          <span aria-hidden className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#c2410c]" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </section>
            ))}
          </div>

          {study.gallery?.map((shot) => (
            <figure key={shot.src} className="pb-14">
              <div className="relative aspect-[1002/854] overflow-hidden rounded-2xl border border-line">
                <Image src={shot.src} alt={shot.caption} fill sizes="(min-width: 896px) 896px, 100vw" className="object-cover object-top" />
              </div>
              <figcaption className="mt-3 text-base text-muted">{shot.caption}</figcaption>
            </figure>
          ))}
        </div>

        <Link
          href={`/work/${next.slug}`}
          className="block border-t border-line transition hover:opacity-90"
          style={{ background: next.tone.bg, color: next.tone.ink }}
        >
          <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
            <p className="text-base opacity-60">Next case study</p>
            <p className="mt-2 font-display text-6xl">{next.name} →</p>
          </div>
        </Link>
      </main>
    </>
  );
}
