export type SkillCategory = {
  slug: string;
  title: string;
  blurb: string;
  items: string[];
};

export const skillCategories: SkillCategory[] = [
  {
    slug: "pm-toolkit",
    title: "PM Toolkit",
    blurb: "How I think, prioritise, and communicate with teams.",
    items: ["Notion", "Figma", "FigJam", "Linear", "Jira", "Amplitude", "Mixpanel", "Miro"],
  },
  {
    slug: "llm-gen-ai",
    title: "LLM & Gen AI",
    blurb: "The stack I reach for when a wedge needs a working prototype.",
    items: [
      "LangChain",
      "LangGraph",
      "OpenAI / Anthropic APIs",
      "Groq / Cerebras",
      "RAG pipelines",
      "Prompt engineering",
    ],
  },
  {
    slug: "ai-engineering",
    title: "AI Engineering",
    blurb: "Turning models into products that actually behave.",
    items: ["Fine-tuning", "Embeddings", "Vector DBs (Pinecone / pgvector)", "Agents", "Evals & guardrails"],
  },
  {
    slug: "full-stack",
    title: "Full Stack",
    blurb: "Shipping end-to-end so I can test hypotheses in-market.",
    items: ["TypeScript", "React / Next.js", "Node.js", "Python", "Tailwind CSS", "Supabase / Postgres"],
  },
  {
    slug: "on-device-ai",
    title: "On-Device AI",
    blurb: "Bringing inference to the edge, where latency and privacy matter.",
    items: ["TensorFlow Lite", "ONNX Runtime", "Edge inference", "Model compression"],
  },
  {
    slug: "product-seo-geo",
    title: "Product · SEO · GEO",
    blurb: "Growth loops for products that need to be found — by humans and by LLMs.",
    items: ["Analytics instrumentation", "A/B testing", "SEO-GEO strategy", "Content ops"],
  },
  {
    slug: "hardware-embedded",
    title: "Hardware & Embedded",
    blurb: "Where the builder background started — sensors, motors, firmware.",
    items: ["ESP32", "Arduino", "IR / ultrasonic sensors", "Inverse kinematics", "PCB prototyping"],
  },
];

export type Certification = {
  issuer: string;
  title: string;
  date: string;
  url?: string; // credential verify URL
};

export const certifications: Certification[] = [
  {
    issuer: "NVIDIA Deep Learning Institute",
    title: "Building Transformer-Based Natural Language Processing Applications",
    date: "Feb 2026",
    url: "https://learn.nvidia.com/certificates?id=GClvxekBT0SWUVCvjdGB5A",
  },
  {
    issuer: "Google",
    title: "Google AI Essentials",
    date: "Feb 2026",
    url: "https://coursera.org/verify/specialization/NJYHIPVRXNW5",
  },
  {
    issuer: "Google",
    title: "Google Prompting Essentials",
    date: "Mar 2026",
    url: "https://coursera.org/verify/specialization/IDOZ47GU0NPU",
  },
  {
    issuer: "Microsoft",
    title: "Product Management Fundamentals",
    date: "Mar 2026",
    url: "https://coursera.org/verify/A91HQWST6MOY",
  },
];