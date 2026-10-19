import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { experience } from "@/lib/work";
import { RESUME_VIEW_URL } from "@/lib/links";
import { SectionTitle } from "./SectionTitle";

const EMAIL = "sarayu.ramdas04@gmail.com";

export function About() {
  return (
    <>
      <section id="about" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-16 sm:px-6">
        <SectionTitle kicker="05 · About" title="Designer who ships, developer who talks to users" />
        <div className="mt-10 grid gap-10 md:grid-cols-[1fr_1fr]">
          <p className="text-xl leading-relaxed text-muted">
            I started in front-end and Figma, moved into Python, data and LLM systems, and now sit
            in the gap between them. I can whiteboard an agent architecture with engineers, explain it
            to a non-technical buyer, and then go watch a five-year-old break it. I&rsquo;m looking for
            roles in AI product design and development, solutions engineering, or growth, where
            building and understanding users are the same job.
          </p>
          <ul className="divide-y divide-line border-y border-line">
            {experience.map((job) => (
              <li key={job.company} className="py-4">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-lg font-semibold">
                    {job.company} <span className="font-normal text-muted">· {job.role}</span>
                    {"paid" in job && job.paid && (
                      <span
                        className="ml-2 inline-block -rotate-3 rounded-md border border-[#15803d]/40 bg-[#dcfce7] px-2 py-0.5 align-middle text-xs font-bold uppercase tracking-wider text-[#15803d]"
                        title="Yes, real money"
                      >
                        💸 paid
                      </span>
                    )}
                  </h3>
                  <span className="text-base text-muted">{job.period}</span>
                </div>
                <p className="mt-1 text-base text-muted">{job.line}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="contact" className="bg-ink text-paper">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <h2 className="font-display text-[clamp(2.4rem,6vw,4.5rem)] leading-[1]">
            Building something with AI?
            <br />
            <em className="text-[#fdba74]">Let&rsquo;s talk.</em>
          </h2>
          <a
            href={`mailto:${EMAIL}`}
            className="mt-8 inline-block break-all text-xl underline underline-offset-4 sm:text-3xl"
          >
            {EMAIL}
          </a>
          <div className="mt-8 flex flex-wrap gap-5 text-base text-paper/75">
            <a href="https://linkedin.com/in/sarayu-ramdas/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:text-paper">
              <FaLinkedinIn /> LinkedIn
            </a>
            <a href="https://github.com/sarayu-uu" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:text-paper">
              <FaGithub /> GitHub
            </a>
            <a href={RESUME_VIEW_URL} target="_blank" rel="noreferrer" className="hover:text-paper">
              Resume (PDF) ↗
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
