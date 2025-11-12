export type Project = {
  title: string;
  summary?: string;
  stack: string;
  desc: string;
  bullets?: string[];
  github: string;
  linkType?: "github" | "figma" | "external";
  linkLabel?: string;
  image?: string;
  images?: string[];
  defaultOpen?: boolean;
};

export const projects: Project[] = [
  {
    title: "MyOrigins Website",
    summary:
      "My first project built using HTML, CSS, and JavaScript. Focused on animations and creative layouts.",
    stack: "HTML | CSS | JavaScript",
    desc: "A simple, responsive, and visually appealing website focused on experimenting with animations and creative layouts.",
    bullets: [
      "Gained hands-on experience with front-end development basics.",
      "Practiced implementing animations and parallax effects.",
      "Improved understanding of responsive web design principles.",
    ],
    github: "https://github.com/sarayu-uu",
    images: [
      "/myorigin/myorigins1.jpg",
      "/myorigin/myorigins2.jpg",
      "/myorigin/myorigins3.jpg",
      "/myorigin/myorigins4.jpg",
    ],
  },
  {
    title: "Ride Smart – Online Tutoring Website",
    summary: "Online tutoring platform concept with interactive UI elements and layouts.",
    stack: "HTML | CSS | JavaScript",
    desc: "An online tutoring platform concept focused on experimenting with interactive UI elements and layouts.",
    bullets: [
      "Learned how to implement card flip animations with CSS/JS.",
      "Experimented with background image usage for section design.",
      "Gained experience in designing a custom footer layout.",
      "Improved knowledge of UI/UX principles for online platforms.",
    ],
    github: "https://github.com/sarayu-uu",
    images: [
      "/ride-smart/ride-smart1.jpg",
      "/ride-smart/ride-smart2.jpg",
      "/ride-smart/ride-smart3.jpg",
      "/ride-smart/ride-smart4.jpg",
    ],
  },
  {
    title: "Breast Cancer Risk Assessment & AI Planner",
    summary:
      "Healthcare-focused web app with Streamlit, ML explainability, and AI for breast cancer prevention.",
    stack: "Streamlit | Python (Scikit-learn, Pandas, NumPy) | SHAP | Google Generative AI API",
    desc: "A healthcare-focused web app built with Streamlit, combining machine learning explainability, AI, and interactive UI to provide early risk assessment and personalized lifestyle guidance for breast cancer prevention.",
    bullets: [
      "Gained first experience with Streamlit for deploying ML apps.",
      "Learned to generate and interpret SHAP plots for model explainability.",
      "Explored AI API integration into real-world applications.",
      "Practiced designing a user-facing ML tool with healthcare focus.",
    ],
    github: "https://github.com/sarayu-uu",
    images: [
      "/HBCR/breastcancer-riskassessment.jpg",
      "/HBCR/breastcancer-riskassessment1.jpg",
      "/HBCR/breastcancer-riskassessment3.jpg",
      "/HBCR/breastcancer-riskassessment4.jpg",
    ],
  },
  {
    title: "CV-AI Showdown: Rock-Paper-Scissors",
    summary:
      "A computer vision + AI-powered game built with Python & OpenCV for real-time hand gesture detection.",
    stack: "Python 3.x | OpenCV | NumPy | JSON/CSV",
    desc: "A computer vision + AI-powered game built with Python & OpenCV that detects real-time hand gestures (Rock, Paper, Scissors) using your webcam and features a multi-strategy AI opponent for an engaging gameplay experience.",
    bullets: [
      "Implemented gesture recognition pipeline using contours & convexity defects.",
      "Learned adaptive hand detection techniques for varying lighting conditions.",
      "Designed and built a multi-strategy AI opponent.",
      "Created a custom OpenCV-based interactive UI with menus and animations.",
      "Explored statistics visualization for gameplay analytics.",
    ],
    github: "https://github.com/sarayu-uu",
    images: ["/RPS/rps1.jpg", "/RPS/rps2.jpg", "/RPS/rps3.jpg", "/RPS/rps4.jpg"],
  },
  {
    title: "Yashashvi Collection",
    summary: "Modern e-commerce frontend with responsive UI. Backend development is currently in progress.",
    stack: "Next.js | React | TypeScript | Tailwind CSS",
    desc: "Modern e-commerce frontend. Features: catalog, cart, wishlist, authentication, admin panel. Context API for global state. Currently working on finishing the backend part.",
    bullets: [
      "Developed product catalog, cart, and wishlist flows with state management.",
      "Implemented authentication scaffolding and basic admin views.",
      "Designed clean, responsive UI with Tailwind and reusable UI primitives.",
    ],
    github: "https://github.com/sarayu-uu",
    images: ["/yashashvi/y1.jpg", "/yashashvi/y2.jpg", "/yashashvi/y3.jpg", "/yashashvi/y4.jpg"],
  },
  {
    title: "Pix",
    summary: "Storytelling-driven SPA with GSAP animations.",
    stack: "Next.js | React | GSAP | TypeScript",
    desc: "Storytelling-driven SPA with GSAP animations. Modular components for problem-solution, services, case studies, CTA.",
    bullets: [
      "Built modular sections (problem/solution, services, case studies, CTA) with reusable components.",
      "Implemented GSAP timelines for smooth, narrative-driven scroll animations.",
      "Optimized performance and layout for responsive devices.",
    ],
    github: "https://github.com/sarayu-uu",
    images: ["/pix/pix.jpg", "/pix/pix2.jpg", "/pix/pix3.jpg", "/pix/pix4.jpg"],
  },
  {
  "title": "Case Study Generator",
  "summary": "A Next.js application that drafts structured case studies and tracks Gemini Flash token usage. It supports exporting the generated case study to Google Docs.",
  "stack": "Next.js | React | TypeScript | Google Generative AI | Google APIs",
  "desc": "A web app that integrates with Google's Gemini Flash API to generate structured case studies and manage token usage efficiently, with an option to export results directly to Google Docs.",
  "bullets": [
    "Built a platform that generates business case studies, canvases, and Google Docs",
    "Integrated Gemini API, Google Apps Script, and Markdown editor.",
    "Monitors and displays Gemini Flash token usage against a hobby allowance.",
    "Automated report creation, cutting manual work time by about 80%",
  ],
  "github": "https://github.com/sarayu-uu/casestudy-generator",
   images: ["/casestudy generator/cs1.jpg", "/casestudy generator/cs2.jpg", "/casestudy generator/cs3.jpg", "/casestudy generator/cs4.jpg"],
  },
  {
    title: "Portfolio Website [this very one]",
    summary: "Personal portfolio showcasing projects and skills.",
    stack: "Next.js | React | TypeScript | Tailwind CSS | Framer Motion | GSAP",
    desc: "A personal portfolio website designed to showcase my projects, skills, and experience in a clean and interactive manner.",
    bullets: [
      "Developed a responsive and visually appealing portfolio website.",
      "Integrated Framer Motion and GSAP for smooth animations and transitions.",
      "Designed and implemented a minimalistic contact section with animated icons.",
    ],
    github: "https://github.com/sarayu-uu",
  },
  {
    title: "athENA (SIH hackathon)",
    summary: "Figma exploration for a student-focused productivity companion.",
    stack: "Figma | Product Design | UI/UX",
    desc: "A multi-screen Figma prototype that maps the athENA experience - from onboarding flows to daily focus sessions - highlighting typography, color systems, and interaction states tailored for learners.",
    bullets: [
      "Documented user journeys for planning, tracking, and reflection loops.",
      "Applied auto-layout and design tokens for consistent cards, stats, and modals.",
      "Linked screens with micro-interactions to simulate a polished prototype demo.",
    ],
    github: "https://www.figma.com/design/VftKwPLGOEm6bsu2aeoJUo/athENA?node-id=0-1&t=hwoycZvbEopDjBuR-1",
    linkType: "figma",
    linkLabel: "Open athENA in Figma",
  },
  {
    title: "Conversational Agent UI",
    summary: "Chatbot interface concept exploring chat flows and quick actions.",
    stack: "Figma | UI/UX | Interaction Design",
    desc: "A minimalist chatbot UI designed entirely in Figma, focusing on message hierarchy, smart suggestions, and responsive spacing that can be carried into a real build.",
    bullets: [
      "Crafted desktop layouts with shared components.",
      "Experimented with chip-based prompts and shortcut rows for efficiency.",
    ],
    github: "https://www.figma.com/design/9yeLk4F4mUxXhFolcdBDoq/Untitled?node-id=0-1&t=Y4MoEYFSavCAcPGQ-1",
    linkType: "figma",
    linkLabel: "Open chatbot UI in Figma",
  },
  {
    title: "myorigins.ai",
    summary: "Figma system for the MyOrigins AI storytelling brand.",
    stack: "Figma | Design Systems",
    desc: "A complementary Figma file to the MyOrigins build that explores the visual identity, component library, and hero storytelling frames before development.",
    bullets: [
      "Built a reusable hero, testimonial, and feature section kit.",
      "Defined color ramps, gradients, and type scales for both light/dark use.",
    ],
    github: "https://www.figma.com/design/GxXo8ryxF2Cuh9XpnC3XR8/myorigins.ai?node-id=0-1&t=pXuMnAZEtdBfSCjP-1",
    linkType: "figma",
    linkLabel: "Open myorigins.ai in Figma",
  },
  {
    title: "My Family (Playful Attempt)",
    summary: "A light-hearted Figma attempt that experiments with illustration grids.",
    stack: "Figma | Visual Exploration",
    desc: "A fun exploratory file that uses Figma components to capture family stories through bright color blocking, simple avatars, and caption cards.",
    bullets: [
      "Practiced creating reusable avatar components with swap-able features.",
      "Added playful annotations so the prototype tells a narrative on scroll.",
    ],
    github: "https://www.figma.com/design/4EU7OtIrncQwUMkNXnNUw8/my-family?node-id=0-1&t=8sNFNlk0SL7PHp3G-1",
    linkType: "figma",
    linkLabel: "Open My Family in Figma",
  },

];
