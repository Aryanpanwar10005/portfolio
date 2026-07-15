export type RoleFit = "Strong" | "Solid" | "Growing";

export type ResumeVariant = {
  id: "product-management" | "business-analyst" | "technical-pm" | "software-engineering";
  role: string;
  tagline: string;
  bestFor: string[];
  roleFit: RoleFit;
  version: string;
  lastUpdated: string;
  recommended?: boolean;
  pdfUrl: string;
  isPlaceholder: boolean;
  summary: {
    experience: string[];
    projects: string[];
    skills: string[];
    education: string[];
    achievements: string[];
    publications: string[];
  };
};

export const resumeVariants: ResumeVariant[] = [
  {
    id: "product-management",
    role: "Product Management",
    tagline: "For PM, APM, and Founder's Office hiring managers",
    bestFor: ["Associate PM", "Product Intern", "Product Analyst", "Founder's Office"],
    roleFit: "Strong",
    version: "v2.3",
    lastUpdated: "Jul 2026",
    recommended: true,
    pdfUrl: "/docs/Aryan_Panwar_PM_Resume.pdf",
    isPlaceholder: false,
    summary: {
      experience: [
        "Founder & PM — FitWardrobe · owned discovery, PRDs, and design QA end-to-end for an AI wardrobe stylist.",
        "Product & AI Engineer — Mithivoices, Credex, HCP CRM · shipped product direction and code across three AI wedges.",
      ],
      projects: [
        "FitWardrobe — AI wardrobe stylist, on-device vision-first PM case study.",
        "Credex — AI SaaS spend auditor validated with 5 ops-lead discovery calls.",
      ],
      skills: ["JTBD & discovery", "PRDs & scoping", "AI feature framing", "North-star & tree metrics", "Cross-functional shipping"],
      education: ["B.Tech ECE — MIET Meerut (2022 — 2026)"],
      achievements: [
        "20+ discovery interviews · 6 diary studies synthesised into a 3-insight product bet.",
        "Cut FitWardrobe onboarding from 8 screens to 3.",
      ],
      publications: ["JETIR — Automated Dual-Spot Wireless Charging (IF 7.95, 2026)."],
    },
  },
  {
    id: "business-analyst",
    role: "Business Analyst",
    tagline: "For BA, data & requirements-heavy teams",
    bestFor: ["Business Analyst", "Data-adjacent PM", "Ops Analyst"],
    roleFit: "Solid",
    version: "v1.4",
    lastUpdated: "Jul 2026",
    pdfUrl: "/docs/Aryan_Panwar_BA_Resume.pdf",
    isPlaceholder: false,
    summary: {
      experience: [
        "Credex — modelled SaaS spend deltas across 5 ops teams; framed the audit workflow into a repeatable playbook.",
        "FitWardrobe — built the analytics stack (event schema, activation funnel) from zero.",
      ],
      projects: [
        "Spend audit rubric — turned interview notes into a scored requirements matrix.",
        "Activation funnel teardown — pinpointed the drop between first outfit and daily use.",
      ],
      skills: ["Requirements gathering", "Process mapping", "SQL basics", "Excel / Sheets modelling", "Dashboarding (Amplitude / Mixpanel)"],
      education: ["B.Tech ECE — MIET Meerut (2022 — 2026)"],
      achievements: ["Documented 3 low-lift automations for plant ops during Indian Potash internship."],
      publications: ["JETIR — Automated Dual-Spot Wireless Charging (IF 7.95, 2026)."],
    },
  },
  {
    id: "technical-pm",
    role: "Technical Product Management",
    tagline: "For API, platform, and AI PM hiring bars",
    bestFor: ["Technical PM", "AI Product Manager", "Platform PM"],
    roleFit: "Strong",
    version: "v1.2",
    lastUpdated: "Jul 2026",
    pdfUrl: "/docs/Aryan_Panwar_TPM_Resume.pdf",
    isPlaceholder: false,
    summary: {
      experience: [
        "AI-first HCP CRM — LangGraph agent PM'd end-to-end; 80%+ AI-draft acceptance in internal testing.",
        "Mithivoices — set the latency budget (<500ms E2E) and eval strategy for an OSS voice stack.",
      ],
      projects: [
        "SEO-GEO Optimizer — npm package for making sites legible to answer engines.",
        "Eval harness for HCP CRM — grounded acceptance metric, hallucination guardrails.",
      ],
      skills: ["LLM feature scoping", "RAG & agent design", "Evals & guardrails", "Latency & cost budgets", "TypeScript / Python fluency"],
      education: ["B.Tech ECE — MIET Meerut (2022 — 2026)"],
      achievements: ["NVIDIA DLI — Transformer-based NLP certified.", "3 shipped LLM products with real users."],
      publications: ["JETIR — Automated Dual-Spot Wireless Charging (IF 7.95, 2026)."],
    },
  },
  {
    id: "software-engineering",
    role: "Software Engineering (GenAI)",
    tagline: "For engineering & founding-engineer teams",
    bestFor: ["GenAI Engineer", "Founding Engineer", "Full-stack + AI"],
    roleFit: "Solid",
    version: "v1.1",
    lastUpdated: "Jul 2026",
    pdfUrl: "/docs/Aryan_Panwar_SWE_Resume.pdf",
    isPlaceholder: false,
    summary: {
      experience: [
        "Mithivoices — real-time voice AI stack; streaming pipeline, TTS/STT plumbing, <500ms latency target.",
        "AI-first HCP CRM — LangGraph orchestration, Postgres + vector store, edge-function tools.",
      ],
      projects: [
        "SEO-GEO Optimizer — published npm package.",
        "FitWardrobe — on-device vision, TensorFlow Lite inference.",
      ],
      skills: ["TypeScript / React", "Python", "LangGraph / LangChain", "Vector search & RAG", "Supabase / Postgres", "Streaming & WebSockets"],
      education: ["B.Tech ECE — MIET Meerut (2022 — 2026)"],
      achievements: ["Shipped 9 real products across AI, hardware, and web."],
      publications: ["JETIR — Automated Dual-Spot Wireless Charging (IF 7.95, 2026)."],
    },
  },
];


export type ResumeFaqCategory = {
  id: string;
  label: string;
  questions: { q: string; a: string }[];
};

export const resumeFaqCategories: ResumeFaqCategory[] = [
  {
    id: "about",
    label: "About Aryan",
    questions: [
      {
        q: "Who are you?",
        a: "I'm Aryan Panwar, a final-year B.Tech Electronics & Communication student at MIET Meerut. I started as a builder — shipping hardware projects, AI apps, and web products — and gradually moved toward the problem-framing side of product work. Today I'm focused on breaking into Product Management, especially in AI-first teams.",
      },
      {
        q: "What roles are you looking for?",
        a: "I'm actively applying for Associate Product Manager, Product Intern, Product Analyst, Business Analyst, and Technical PM roles. I also keep a GenAI Engineering variant for founding-engineer or AI-engineering seats where product taste matters.",
      },
      {
        q: "Why Product Management?",
        a: "Building taught me how to ship. But the most satisfying parts were always the early calls where I understood why someone needed the thing in the first place, then figured out the smallest version that would matter. PM lets me scale that loop: understand users, define success, and align a team around it.",
      },
    ],
  },
  {
    id: "projects",
    label: "Projects & Case Studies",
    questions: [
      {
        q: "Are these real products?",
        a: "Yes. Every case study here is grounded in a product I built or worked on directly — FitWardrobe, Mithivoices, Credex, an AI-first HCP CRM, and the SEO-GEO Optimizer npm package. I include real metrics, discovery notes, and the tradeoffs I made along the way.",
      },
      {
        q: "Why are only a few projects featured?",
        a: "I deliberately curate the strongest evidence of PM thinking rather than listing every repo. A few well-explained case studies beat a long grid of screenshots when the goal is to show how I decide, prioritize, and measure outcomes.",
      },
      {
        q: "Can I access the full case studies?",
        a: "Absolutely. Each case study page includes the problem, discovery, solution, metrics, and lessons. Some also link to PRDs, user-interview summaries, and supporting artifacts. If you'd like a deeper walkthrough, email me and I'll share the full deck.",
      },
    ],
  },
  {
    id: "resume",
    label: "Resume & Hiring",
    questions: [
      {
        q: "Which resume should I download?",
        a: "If you're hiring for a PM, APM, Founder's Office, or product-adjacent role, start with the Product Management version. Use the Business Analyst version for BA or data-heavy roles, the Technical PM version for AI/platform PM seats, and the Software Engineering version for GenAI engineering roles.",
      },
      {
        q: "Why do you have multiple resumes?",
        a: "Different roles value different signals. A PM recruiter looks for problem framing, discovery, and outcomes. An engineering recruiter looks for shipping velocity, stack, and system design. Splitting the story means each reader sees the most relevant evidence first.",
      },
      {
        q: "Are your resumes ATS-friendly?",
        a: "Yes. They use standard section headings, clean single-column layouts, and avoid heavy graphics or tables that confuse parsers. They're also readable for humans — the only audience that actually matters.",
      },
    ],
  },
  {
    id: "working",
    label: "Working Together",
    questions: [
      {
        q: "Are you open to internships and full-time roles?",
        a: "Yes. I'm looking for internships, full-time APM/PM roles, and early-stage founding-team opportunities. I'm based in Meerut, UP, and open to remote or hybrid arrangements.",
      },
      {
        q: "How do you approach product problems?",
        a: "I follow a simple loop: understand the user and the job-to-be-done, define what success looks like, prioritize the highest-leverage bet, ship a small test, and measure the outcome. Then iterate. Evidence beats opinion every time.",
      },
      {
        q: "What's the best way to contact you?",
        a: "Email is fastest: aryanpanwar10005@gmail.com. You can also reach out on LinkedIn or use the contact form on the site. I usually reply within 24 hours.",
      },
    ],
  },
];

export const resumeTrustBadges = [
  "ATS Optimized",
  "Recruiter Friendly",
  "Role Focused",
  "Updated Frequently",
  "Privacy First",
];