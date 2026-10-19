import { Portrait } from "./Portrait";

const RECEIPTS = [
  "4 products live",
  "Kids user-tested on camera",
  "~100 visitors to a voice agent",
  "LangGraph · RAG · LLM governance",
];

export function Hero() {
  return (
    <section className="mx-auto grid max-w-6xl items-center gap-16 px-4 pb-16 pt-16 sm:px-6 sm:pt-24 lg:grid-cols-[1.25fr_1fr] lg:gap-10">
      <div>
      <p className="rise text-base font-medium uppercase tracking-[0.18em] text-muted">
        AI product designer &amp; developer
      </p>
      <h1
        className="rise mt-5 font-display text-[clamp(2.6rem,6vw,5.4rem)] leading-[0.95] tracking-tight"
        style={{ animationDelay: "80ms" }}
      >
        I build AI products,
        <br />
        then go find out
        <br />
        <em className="text-[#c2410c]">if people want them.</em>
      </h1>
      <p
        className="rise mt-8 max-w-2xl text-xl leading-relaxed text-muted"
        style={{ animationDelay: "160ms" }}
      >
        I take a fuzzy problem, ship something real, instrument it, sit with the people using it,
        and rewrite. Lately that has meant camera-controlled games for kids, a voice agent that
        takes cafe orders, and the guardrails that let a company use LLMs safely.
      </p>

      <ul className="rise mt-8 flex flex-wrap gap-2" style={{ animationDelay: "240ms" }}>
        {RECEIPTS.map((receipt) => (
          <li
            key={receipt}
            className="rounded-full border border-line bg-white/60 px-3 py-1 text-base text-ink"
          >
            {receipt}
          </li>
        ))}
      </ul>

      <div className="rise mt-10 flex flex-wrap gap-3" style={{ animationDelay: "320ms" }}>
        <a
          href="#work"
          className="rounded-full bg-ink px-6 py-3 text-base font-semibold text-paper transition hover:opacity-85"
        >
          See the work ↓
        </a>
        <a
          href="https://astrocity-alpha.vercel.app/"
          target="_blank"
          rel="noreferrer"
          className="rounded-full border border-ink px-6 py-3 text-base font-semibold transition hover:bg-ink hover:text-paper"
        >
          Play Astra Buddies ↗
        </a>
      </div>
      </div>
      <div className="rise pt-8 lg:pt-0" style={{ animationDelay: "200ms" }}>
        <Portrait />
      </div>
    </section>
  );
}
