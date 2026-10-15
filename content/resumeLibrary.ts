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
    tagline: "For APM, product analyst and AI product teams",
    bestFor: ["Associate PM", "Product Analyst", "Product Intern", "Founder's Office"],
    roleFit: "Strong",
    version: "v3.0",
    lastUpdated: "Oct 2026",
    recommended: true,
    pdfUrl: "/docs/Aryan_Panwar_PM_Resume.pdf",
    isPlaceholder: false,
    summary: {
      experience: [
        "Business Analyst Intern, Cloud Ingenious (Salesforce consulting partner) · Jun 2026 – present.",
        "Instrumentation Intern, Indian Potash Limited · Jun – Aug 2025.",
      ],
      projects: [
        "FitWardrobe - AI wardrobe styling app; on-device image recognition keeps user photos on the phone.",
        "SEO & GEO Optimizer - open-source npm workflow for AI coding assistants.",
      ],
      skills: [
        "Product discovery & JTBD framing",
        "PRDs, user stories & MVP scoping",
        "Prioritisation (RICE) & success metrics",
        "SQL, GA4 & funnel analysis",
        "AI product scoping (RAG, agents, evals)",
      ],
      education: ["B.Tech ECE - MIET Meerut (2022 - 2026)"],
      achievements: [
        "Four self-built products in public use.",
        "FitWardrobe: 20.8K Google Search impressions and 315 clicks in six months, no paid spend.",
      ],
      publications: ["Co-author, JETIR Vol 13 Issue 4 (Apr 2026): Automated Dual-Spot Wireless Charging for EVs."],
    },
  },
  {
    id: "business-analyst",
    role: "Business Analyst",
    tagline: "For BA, Salesforce and requirements-heavy teams",
    bestFor: ["Business Analyst", "Salesforce BA", "Process Analyst"],
    roleFit: "Strong",
    version: "v3.0",
    lastUpdated: "Oct 2026",
    pdfUrl: "/docs/Aryan_Panwar_BA_Resume.pdf",
    isPlaceholder: false,
    summary: {
      experience: [
        "Business Analyst Intern, Cloud Ingenious · stakeholder workshops to UAT on Salesforce projects.",
        "Designed a Salesforce data model for a Nonprofit Cloud engagement, revised after senior review.",
      ],
      projects: [
        "Careers-page-to-Salesforce workflow that removes manual re-keying of job applications.",
        "As-is map of an internal delivery process, surfacing hand-off gaps for process owners.",
      ],
      skills: [
        "Requirements gathering & BRDs",
        "User stories & acceptance criteria",
        "As-is / to-be process mapping",
        "Salesforce data modelling",
        "SQL, Excel & GA4",
      ],
      education: ["B.Tech ECE - MIET Meerut (2022 - 2026)"],
      achievements: ["Four self-built products in public use, from discovery to launch."],
      publications: ["Co-author, JETIR Vol 13 Issue 4 (Apr 2026): Automated Dual-Spot Wireless Charging for EVs."],
    },
  },
  {
    id: "technical-pm",
    role: "Technical Product Management",
    tagline: "For technical, platform and AI product roles",
    bestFor: ["Associate Technical PM", "AI Product Analyst", "Platform PM"],
    roleFit: "Solid",
    version: "v3.0",
    lastUpdated: "Oct 2026",
    pdfUrl: "/docs/Aryan_Panwar_TPM_Resume.pdf",
    isPlaceholder: false,
    summary: {
      experience: [
        "Business Analyst Intern, Cloud Ingenious · requirements and Salesforce data modelling.",
        "Scoped and shipped four products in public use, with AI-assisted development.",
      ],
      projects: [
        "SEO & GEO Optimizer - 10-phase workflow with human-in-the-loop validation; 500+ npm downloads.",
        "FitWardrobe - on-device image recognition with LLM outfit generation.",
      ],
      skills: [
        "API & integration requirements",
        "Data modelling (Salesforce)",
        "LLM product scoping (RAG, agents, evals)",
        "Latency, cost & quality trade-offs",
        "Python, SQL, TypeScript fluency",
      ],
      education: ["B.Tech ECE - MIET Meerut (2022 - 2026)"],
      achievements: ["NVIDIA DLI: Transformer-Based NLP Applications (Feb 2026)."],
      publications: ["Co-author, JETIR Vol 13 Issue 4 (Apr 2026): Automated Dual-Spot Wireless Charging for EVs."],
    },
  },
  {
    id: "software-engineering",
    role: "Generative AI Developer",
    tagline: "For AI application and builder roles",
    bestFor: ["GenAI Developer", "AI Application Builder", "Product Engineer (AI)"],
    roleFit: "Growing",
    version: "v3.0",
    lastUpdated: "Oct 2026",
    pdfUrl: "/docs/Aryan_Panwar_SWE_Resume.pdf",
    isPlaceholder: false,
    summary: {
      experience: [
        "Designs and ships AI applications with AI-assisted development (Cursor, Claude Code).",
        "Business Analyst Intern, Cloud Ingenious · Salesforce implementation projects.",
      ],
      projects: [
        "SEO & GEO Optimizer - open-source npm package, 500+ downloads, 13 GitHub stars.",
        "Digital Heroes Golf - live subscription product with Razorpay payments.",
      ],
      skills: [
        "Python (pandas) & SQL",
        "TypeScript, React & Next.js",
        "LLM APIs & prompt design",
        "Node.js & npm publishing",
        "Git, GitHub & Vercel",
      ],
      education: ["B.Tech ECE - MIET Meerut (2022 - 2026)"],
      achievements: ["Analysed 211,000+ trade records in Python and pandas."],
      publications: ["Co-author, JETIR Vol 13 Issue 4 (Apr 2026): Automated Dual-Spot Wireless Charging for EVs."],
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
        a: "I'm Aryan Panwar, an ECE graduate from MIET Meerut (2026). I started as a builder - shipping hardware projects, agentic AI systems, and web products - and gradually moved toward the problem-framing side of product work. Today I work as a Business Analyst Intern on Salesforce projects at Cloud Ingenious, and I'm building toward Product Management, especially in AI-first teams.",
      },
      {
        q: "What roles are you looking for?",
        a: "Each resume here is tailored to one kind of role: Associate Product Manager, Product Analyst, Business Analyst, or Technical PM. A Generative AI Developer version covers AI application roles.",
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
        a: "Yes. Every case study here is grounded in a product I built or worked on directly - FitWardrobe, Mithivoices, Credex, an AI-first HCP CRM, and the SEO-GEO Optimizer npm package. I include real metrics, discovery notes, and the tradeoffs I made along the way.",
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
        a: "If you're hiring for a PM, APM, Founder's Office, or product-adjacent role, start with the Product Management version. Use the Business Analyst version for BA or data-heavy roles, the Technical PM version for AI/platform PM seats, and the Generative AI Developer version for AI application roles.",
      },
      {
        q: "Why do you have multiple resumes?",
        a: "Different roles value different signals. A PM recruiter looks for problem framing, discovery, and outcomes. An engineering recruiter looks for shipping velocity, stack, and system design. Splitting the story means each reader sees the most relevant evidence first.",
      },
      {
        q: "Are your resumes ATS-friendly?",
        a: "Yes. They use standard section headings, clean single-column layouts, and avoid heavy graphics or tables that confuse parsers. They're also readable for humans - the only audience that actually matters.",
      },
    ],
  },
  {
    id: "working",
    label: "Working Together",
    questions: [
      {
        q: "Are you open to internships and full-time roles?",
        a: "I'm happy to talk about product roles and early-stage teams. I'm based in Delhi NCR and open to remote or hybrid arrangements.",
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