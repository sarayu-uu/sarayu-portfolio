import { SectionTitle } from "./SectionTitle";

const LOOP = [
  {
    step: "Notice",
    body: "Start from a real moment: a kid who won't sit still, a cafe that misses phone orders, a team scared of leaking data.",
    tools: "User interviews · playtests · competitor teardown",
  },
  {
    step: "Build",
    body: "Get to something people can touch within days, not a deck. Design and code are the same job.",
    tools: "Next.js · React · three.js · Figma · FastAPI",
  },
  {
    step: "Make it smart",
    body: "Add AI where it removes a step for the user, with guardrails, citations and fallbacks.",
    tools: "LangGraph · RAG · LiveKit · Groq · Gemini · CV",
  },
  {
    step: "Measure & rewrite",
    body: "Instrument from day one, read the funnel, say plainly what isn't working, then change it.",
    tools: "PostHog · Supabase · SQL · Python",
  },
];

export function HowIWork() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <SectionTitle kicker="03 · How I work" title="A loop, not a handoff" />
      <ol className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
        {LOOP.map((item, index) => (
          <li key={item.step} className="bg-paper p-6">
            <span className="font-display text-6xl text-[#c2410c]">{index + 1}</span>
            <h3 className="mt-3 text-xl font-semibold">{item.step}</h3>
            <p className="mt-2 text-base leading-relaxed text-muted">{item.body}</p>
            <p className="mt-4 text-sm font-medium text-ink/70">{item.tools}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
