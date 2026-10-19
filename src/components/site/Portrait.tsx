"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

// Swap for a generated PNG (e.g. "/me.png"). The cursor-following eyes are drawn
// for the illustration only, so they switch off automatically for any other image.
const PORTRAIT_SRC = "/me-illustration.svg";
const HAS_LIVE_EYES = PORTRAIT_SRC === "/me-illustration.svg";

// In the illustration's 600×700 viewBox.
const EYES = [
  { id: "l", cx: 270, white: "M248 292 Q268 276 291 290 Q268 302 248 292 Z", lid: "M245 292 Q268 272 293 289" },
  { id: "r", cx: 330, white: "M309 290 Q332 276 352 292 Q332 302 309 290 Z", lid: "M307 289 Q332 272 355 292" },
];
const EYE_Y = 290;
const MAX_LOOK = { x: 7, y: 3.5 };

const LINES = [
  "Is this an AI problem… or a spreadsheet problem?",
  "Built an AI pigeon for toddlers. Median session: 7 seconds. Tough crowd.",
  "Shadow Mystery: my most played activity AND my most abandoned. Very on brand.",
  "Milo the pigeon has better character rigging than my LinkedIn.",
  "11 activities on one engine. Kids picked counting cups. Of course they did.",
  "Every sound in Milomi is synthesised in the browser. Licensing lawyers hate this one trick.",
  "Got ~100 visitors to a cafe that serves zero actual food.",
  "My voice agent takes cafe orders. I still order pani puri by pointing.",
  "\"Robot voice? Too broke for LiveKit.\" An actual line from my actual app.",
  "Corner Cafe has a farewell node. I'm still working on mine.",
  "Zorp, my three-eyed cafe customer, checks if you're online on Slack. Relatable.",
  "Astra Buddies has zero fail states. My first portfolio had several.",
  "Built a game where kids jump to win. My knees did the QA.",
  "Kids are the only users who say \"this is boring\" to your face. Respect.",
  "Pose detection, but for five-year-olds who refuse to stand still.",
  "Copied 'N8AO' settings for weeks. Then built an entire lab to learn what it means.",
  "Learned what tone mapping is by building a museum for it.",
  "Helped build guardrails so companies can use LLMs safely. My own guardrails: none.",
  "WatchTower masks your PII. It cannot mask my screen time.",
  "My RAG bot cites its sources. My group chat doesn't.",
  "RAG with citations, because \"trust me bro\" isn't a source.",
  "Designed a fitness app with no streaks. Because I'd break mine.",
  "Move counts stair breaks as exercise. I designed it for me, honestly.",
  "Wrote a hash-linked audit trail for a backhoe loader. Normal Tuesday.",
  "RoadShare's hour meter can't go backwards. Unlike my sleep schedule.",
  "My case study generator saved 80% of the work. I spent it building more generators.",
  "Trained three models to prove degrees and jobs don't match. LinkedIn could've told me.",
  "LR vs GBR vs Random Forest. Random Forest won. It always wins. Rigged.",
  "Taught OpenCV to read rock-paper-scissors. It still beats me.",
  "My RPS bot has an 'adaptive' mode. It adapted to the fact that I always throw rock.",
  "Ask me about convexity defects. Actually, don't. I will draw them.",
  "There's a .sql file of string functions on my desktop. I wrote it for fun. 'Fun.'",
  "SQL by day, LangGraph by night, pani puri in between.",
  "Fixed the re-renders. Caused new re-renders. That's frontend.",
  "useEffect and I have a complicated relationship.",
  "My first website had parallax. I've since recovered.",
  "Removed nine projects from this portfolio. They know what they did.",
  "This site used to have a heart that chased your cursor. Growth.",
  "Found a hackathon repo on my laptop. Zero commits by me. Plot twist.",
  "Found an AI job-swipe app on my laptop. Don't remember building it. Agents, probably.",
];

function LiveEyes({ smooth }: { smooth: boolean }) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [look, setLook] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let frame = 0;
    const onMove = (event: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const svg = svgRef.current;
        if (!svg) return;
        const rect = svg.getBoundingClientRect();
        const scale = rect.width / 600;
        const dx = event.clientX - (rect.left + 300 * scale);
        const dy = event.clientY - (rect.top + EYE_Y * scale);
        const dist = Math.hypot(dx, dy);
        if (dist < 1) return setLook({ x: 0, y: 0 });
        const reach = Math.min(dist / 250, 1);
        setLook({ x: (dx / dist) * MAX_LOOK.x * reach, y: (dy / dist) * MAX_LOOK.y * reach });
      });
    };
    window.addEventListener("pointermove", onMove);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 600 700"
      preserveAspectRatio="xMidYMid slice"
      className="pointer-events-none absolute inset-0 h-full w-full"
      aria-hidden
    >
      <defs>
        {EYES.map((eye) => (
          <clipPath key={eye.id} id={`eye-${eye.id}`}>
            <path d={eye.white} />
          </clipPath>
        ))}
      </defs>
      {EYES.map((eye) => (
        <g key={eye.id}>
          <g clipPath={`url(#eye-${eye.id})`}>
            <g
              style={{
                transform: `translate(${look.x}px, ${look.y}px)`,
                transition: smooth ? "transform 120ms ease-out" : undefined,
              }}
            >
              <circle cx={eye.cx} cy={EYE_Y} r={9.5} fill="#2a1810" />
              <circle cx={eye.cx + 3.5} cy={EYE_Y - 4} r={3} fill="#ffffff" />
            </g>
          </g>
          <path d={eye.lid} stroke="#1a0f0a" strokeWidth={4.5} fill="none" strokeLinecap="round" />
        </g>
      ))}
    </svg>
  );
}

export function Portrait() {
  const [index, setIndex] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    setIndex(Math.floor(Math.random() * LINES.length));
    const id = window.setInterval(() => setIndex((i) => (i + 1) % LINES.length), 4200);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="relative mx-auto w-full max-w-[440px]">
      <div className="relative aspect-[6/7] overflow-hidden rounded-[2rem] border border-line shadow-[0_30px_60px_-30px_rgba(20,20,20,0.35)]">
        <Image
          src={PORTRAIT_SRC}
          alt="Illustration of Sarayu at her desk"
          fill
          priority
          unoptimized={PORTRAIT_SRC.endsWith(".svg")}
          sizes="(min-width: 1024px) 440px, 90vw"
          className="object-cover"
        />
        {HAS_LIVE_EYES && <LiveEyes smooth={!reduceMotion} />}
      </div>

      <button
        type="button"
        onClick={() => setIndex((i) => (i + 1) % LINES.length)}
        className="absolute -top-6 left-1/2 w-[min(88%,320px)] -translate-x-1/2 text-left sm:-left-10 sm:translate-x-0"
        aria-label="Next thought"
      >
        <div className="relative rounded-2xl border-2 border-ink bg-white px-5 py-4 shadow-[4px_4px_0_0_#141414]">
          <AnimatePresence mode="wait" initial={false}>
            <motion.p
              key={index}
              initial={reduceMotion ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -6 }}
              transition={{ duration: 0.25 }}
              className="min-h-[3.25rem] text-base font-medium leading-snug text-ink"
              aria-live="polite"
            >
              {LINES[index]}
            </motion.p>
          </AnimatePresence>
          <span className="mt-1 block text-xs text-muted">tap for another thought</span>
          <span
            aria-hidden
            className="absolute -bottom-[11px] right-16 h-5 w-5 rotate-45 border-b-2 border-r-2 border-ink bg-white"
          />
        </div>
      </button>
    </div>
  );
}
