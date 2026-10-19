import Link from "next/link";
import { RESUME_VIEW_URL } from "@/lib/links";

const LINKS = [
  { href: "/#work", label: "Work" },
  { href: "/#systems", label: "AI systems" },
  { href: "/#about", label: "About" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/85 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link href="/" className="font-display text-2xl leading-none">
          Sarayu Ramdas
        </Link>
        <ul className="flex items-center gap-4 text-base sm:gap-6">
          {LINKS.map((link) => (
            <li key={link.href} className="hidden sm:block">
              <Link href={link.href} className="text-muted transition-colors hover:text-ink">
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <a
              href={RESUME_VIEW_URL}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-ink px-4 py-1.5 font-medium text-paper transition hover:opacity-85"
            >
              Resume
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
