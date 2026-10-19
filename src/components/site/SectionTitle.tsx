export function SectionTitle({ kicker, title }: { kicker: string; title: string }) {
  return (
    <div>
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted">{kicker}</p>
      <h2 className="mt-3 font-display text-5xl leading-tight sm:text-6xl">{title}</h2>
    </div>
  );
}
