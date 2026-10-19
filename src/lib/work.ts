export type Stat = { value: string; label: string };

export type CaseSection = {
  heading: string;
  body?: string;
  bullets?: string[];
};

export type CaseStudy = {
  slug: string;
  name: string;
  oneLiner: string;
  role: string;
  status: string;
  /** Accent used for the card and case-study header. */
  tone: { bg: string; ink: string; chip: string };
  live?: string;
  repo?: string;
  cover?: string;
  /** User-testing clips in /public/work. */
  videos?: { src: string; poster: string; caption: string }[];
  /** Extra screenshots shown after the main sections. */
  gallery?: { src: string; caption: string }[];
  stats: Stat[];
  stack: string[];
  sections: CaseSection[];
};

export type SmallProject = {
  name: string;
  what: string;
  tag: string;
  href?: string;
  cover?: string;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "milomi",
    name: "Milomi",
    oneLiner:
      "A storybook play app for 3–5 year olds, built as a research MVP to find out what parents actually want from screen time.",
    role: "Solo: research, product, design, build, analytics",
    status: "Live · problem still being sharpened",
    tone: { bg: "#FFE7C2", ink: "#3B2414", chip: "#F7C77A" },
    live: "https://milomi.vercel.app",
    cover: "/work/milomi-home.png",
    stats: [
      { value: "32", label: "devices in the first 5 days" },
      { value: "44%", label: "started an activity" },
      { value: "25%", label: "came back on another day" },
      { value: "7s", label: "median session (the problem)" },
    ],
    stack: ["Next.js", "TypeScript", "Supabase", "PostHog", "Zustand", "Howler.js", "Rigged SVG"],
    sections: [
      {
        heading: "Where it came from",
        body: "At OAKS EdTech, Milomi started as a growth hunt. Instead of writing a deck about the problem space we were working on, I shipped something small and real so I could watch how families behaved with it.",
      },
      {
        heading: "The bet",
        body: "Most kids' apps optimise for minutes watched. My bet was that a character who notices things, gets them wrong and figures them out with the child, and who keeps sending them off-screen to draw, fold, count and move, turns screen time into something a parent can join in on.",
      },
      {
        heading: "What I built",
        bullets: [
          "Milo, a rigged SVG pigeon with an expression layer and an action layer, plus four supporting characters on the same state API.",
          "11 activities running on one generic step engine. Content is data, so adding an activity doesn't need new UI.",
          "A world that grows: rooms unlock as the child plays, and Milo notices what's new.",
          "A parent area behind a hold-to-open gate, with reduced motion, sound mix, progress and a feedback survey.",
          "Anonymous PostHog analytics (no profiles, no IPs), Supabase feedback and an /admin dashboard I use to read the funnel.",
          "Every sound is synthesised in the browser, so no audio files ship and there's no licensing risk.",
        ],
      },
      {
        heading: "What the data said",
        body: "I took a baseline before doing any marketing. It covers five days, and it includes some team testing, so real families are fewer than these numbers.",
        bullets: [
          "44% of devices started an activity, but only 22% finished one. The home page isn't doing its job yet.",
          "The median session was 7 seconds. Most visits are a look-and-leave.",
          "Shadow Mystery, the flagship activity, was the most played and the most abandoned: 11 of 19 starts ended early.",
          "There were 5 feedback responses and none of them were per-activity, so the ask isn't landing.",
        ],
      },
      {
        heading: "What I'm doing about it",
        body: "Traction is weak, and I'd rather say that plainly. The honest diagnosis is that the problem statement is still too wide: '3–5 year olds and their grown-ups' covers too many moments and two different users. Before building more content I'm narrowing who the user is and which moment Milomi is for. Then I'll re-cut Shadow Mystery and the home page against that, and compare the result to this baseline.",
      },
      {
        heading: "How it evolved",
        bullets: [
          "v1: MILO, a frontend-only Vite prototype with a continuous forest journey.",
          "v2: a landing page to test the character and the tone.",
          "v3: Milomi, an instrumented Next.js research MVP with a parent area and feedback loop.",
        ],
      },
    ],
  },
  {
    slug: "astra-buddies",
    name: "Astra Buddies",
    oneLiner:
      "A 3D adventure that kids control with their whole body through a laptop camera. Computer vision that feels like play, not a test.",
    role: "Solo: concept, game design, 3D, CV integration, user testing",
    status: "Live · tested with kids",
    tone: { bg: "#D9E4FF", ink: "#121A3D", chip: "#9DB4FF" },
    live: "https://astrocity-alpha.vercel.app/",
    cover: "/work/astra-world.png",
    videos: [
      {
        src: "/work/astra-test-1.mp4",
        poster: "/work/astra-test-1-poster.jpg",
        caption: "Star Stone Run: the game coaches the child back to the middle of the frame before the next obstacle.",
      },
      {
        src: "/work/astra-test-2.mp4",
        poster: "/work/astra-test-2-poster.jpg",
        caption: "Arms up to lift the stone, then jump and hold. The pose overlay shows the child what the camera sees.",
      },
    ],
    stats: [
      { value: "~20 min", label: "first playable chapter" },
      { value: "0", label: "fail states" },
      { value: "10", label: "story + movement steps" },
    ],
    stack: ["three.js", "Pose estimation", "JavaScript", "Web camera APIs"],
    sections: [
      {
        heading: "Why",
        body: "At OAKS EdTech I wanted to explore our computer-vision direction with one question in mind: what would CV for kids look like if it were built around fun and learning first? Kids move, jump and lose focus, and most camera experiences punish all of that.",
      },
      {
        heading: "What I built",
        bullets: [
          "One continuous story chapter in a floating-island world, not a menu of mini-games.",
          "The child's real movements (stepping, jumping, ducking, arms out like wings, freezing in poses) operate the world's machinery.",
          "Three game modes: a runner, a pilot mode where you fly with your arms, and 'copy Mimi' trials.",
          "No fail states. A missed obstacle is a stumble and the run goes on. If the child steps out of view, the game pauses until they're back.",
        ],
      },
      {
        heading: "Testing it with kids",
        body: "I put it in front of kids at home on an ordinary laptop. The clips above show what I was watching for: whether a child can follow on-screen pose coaching without an adult translating, and whether they stay in the game between obstacles. They did. The camera inset with a live stick figure turned out to matter, because it shows kids what the computer sees.",
      },
      {
        heading: "Side quest: Astra Render Lab",
        body: "While building this I kept copying rendering settings I didn't understand (SSAO, SMAA, tone mapping, bloom). So I built a small lab where each setting is a live dial with a plain-English explanation and a before/after split view. It's how I learn: build the tool that makes the concept visible.",
      },
    ],
  },
  {
    slug: "corner-cafe",
    name: "Corner Cafe",
    oneLiner:
      "A voice order-taker for a small cafe. You talk, it answers out loud, tracks your order, reads it back and places it.",
    role: "Solo: agent design, build, deploy",
    status: "Live",
    tone: { bg: "#E9DCCB", ink: "#2A1C12", chip: "#C9A27E" },
    live: "https://cornercafe-chi.vercel.app/",
    cover: "/work/cornercafe-scene.png",
    gallery: [
      { src: "/work/cornercafe-how.png", caption: "The /how page: the whole agent explained with clickable diagrams, written for non-engineers." },
    ],
    stats: [
      { value: "~100", label: "visitors (Vercel)" },
      { value: "3", label: "graph nodes: LLM, tools, farewell" },
    ],
    stack: ["LangGraph", "LiveKit Agents", "Groq", "FastAPI", "Postgres", "Vercel"],
    sections: [
      {
        heading: "How it works",
        body: "LangGraph is the brain: an LLM node, a tools node that holds menu and order state, and a plain Python farewell node, connected by conditional edges. LiveKit is the ears and mouth, handling speech-to-text, text-to-speech, turn-taking and interruptions. It uses the compiled graph as its LLM.",
      },
      {
        heading: "Product touches",
        bullets: [
          "A pixel-art cafe web app with a clickable menu and a live order ticket, so it works even without a mic.",
          "A /how page that explains the architecture with diagrams, written for non-engineers.",
          "A /analytics page showing orders, revenue, items sold and orders per day.",
          "An offline smoke test with a scripted fake LLM, so the wiring can be checked without API keys.",
        ],
      },
    ],
  },
];

export type SystemProject = SmallProject & { problem: string; credit: string };

export const systems: SystemProject[] = [
  {
    name: "WatchTower",
    problem: "How does a company let people use LLMs without leaking data or losing track of spend?",
    what: "A control plane around Open WebUI covering who can chat, which models they can use, PII masking before data leaves the org, provider routing and a full audit log.",
    tag: "Enterprise AI governance",
    credit: "Contributed",
    cover: "/work/watchtower-map.svg",
  },
  {
    name: "RAG Workspace",
    problem: "Teams want answers from their documents, but only the ones they're allowed to see, with sources.",
    what: "Multi-format ingestion, chunking and vector search (Chroma), grounded chat with citations, document-level permissions, JWT and OTP auth, and a telemetry dashboard.",
    tag: "Retrieval · FastAPI · React",
    credit: "Built",
    cover: "/work/rag-pipeline.png",
  },
  {
    name: "Move",
    problem: "Do small, flexible movement breaks, plus visible progress and a squad, keep desk workers active?",
    what: "An experiment built to answer one hypothesis. It has a typed analytics event schema, SQL funnel queries, and no calorie targets or punishing streaks.",
    tag: "Experiment · Supabase · PostHog-style events",
    credit: "Built",
    cover: "/work/move-dashboard.png",
    // TODO: add the live URL
    href: undefined,
  },
];

export const playground: SmallProject[] = [
  { name: "Astra Render Lab", what: "Every 3D rendering term as a live dial with a plain-English explanation.", tag: "Learning tool", cover: "/work/astra-render-lab.png" },
  { name: "RoadShare", what: "Interview take-home: a shared equipment custody board for four towns, with offline mode and a hash-linked audit trail.", tag: "Take-home", href: "https://roadshare-app.onrender.com/", cover: "/work/roadshare-board.png" },
  { name: "Case Study Generator", what: "Drafts business case studies with Gemini and exports them to Google Docs. It cut manual report time by about 80%.", tag: "AI tool", href: "https://github.com/sarayu-uu/casestudy-generator", cover: "/work/csg-doc.svg" },
  { name: "Edu vs Employment", what: "ML pipeline and Streamlit dashboard mapping education–employment mismatch across Indian regions.", tag: "Data", href: "https://github.com/sarayu-uu/eduvsemp", cover: "/work/edu-heatmap.svg" },
  { name: "CV Rock-Paper-Scissors", what: "Webcam gesture recognition with OpenCV against a multi-strategy AI opponent.", tag: "Computer vision", cover: "/work/rps-contour.svg" },
];

export const experience = [
  {
    company: "OAKS EdTech",
    role: "AI Builder",
    paid: true,
    // TODO: confirm start date
    period: "2026 – Present",
    line: "Exploring early-learning problems by shipping: Milomi (research MVP with live analytics) and Astra Buddies (camera-controlled play, tested with kids).",
  },
  {
    company: "Bilvantis Technologies",
    role: "Intern",
    period: "Dec 2025 – Present",
    line: "Building AI-backed applications with Python, SQL and LLM tooling.",
  },
  {
    company: "NorthNorth",
    role: "Software Developer Intern",
    paid: true,
    period: "Aug 2025 – Dec 2025",
    line: "Shipped production front-ends for several client sites from Figma, with animation and render performance work.",
  },
  {
    company: "Cloudbox-99",
    role: "Frontend Intern",
    period: "Jun 2024 – Aug 2024",
    line: "Designed in Figma and rebuilt client websites.",
  },
];

export const getCaseStudy = (slug: string) => caseStudies.find((c) => c.slug === slug);
