export type CaseStudyTier = "flagship" | "supporting";

import fitwardrobeCover from "@/assets/fitwardrobe.webp";
import mithivoicesCover from "@/assets/mithivoices.webp";
import seoGeoCover from "@/assets/seo-geo-optimizer.webp";
import aiCrmCover from "@/assets/ai-crm-hcp.webp";
import credexCover from "@/assets/credex-spend-audit.webp";
import evChargerCover from "@/assets/evcharger.webp";
import robotCover from "@/assets/robot.webp";
import staircaseCover from "@/assets/staircase.webp";

export type CaseStudy = {
  slug: string;
  tier: CaseStudyTier;
  title: string;
  tagline: string;
  role: string;
  platform: string;
  timeline: string;
  problem: string;
  solution: string;
  cover: string;
  featured?: boolean;
  status?: "Shipped" | "In Progress" | "Concept";
  liveUrl?: string;
  repoUrl?: string;
  extraLinks?: { label: string; url: string }[];
  sections: {
    overview: string;
    problemStatement: string;
    marketNeed: string;
    targetUsers: string;
    research: string;
    insights: string[];
    opportunity: string;
    scope: string[];
    outOfScope: string[];
    assumptions: string | string[];
    successCriteria: string[];
    expectedBehaviour: string;
    northStar: string;
    supportingMetrics: string[];
    prioritization: string;
    wireframes: string;
    prd: string;
    prototype: string;
    finalSolution: string;
    reflection: string;
    lessons: string[];
  };
};

export type ArchiveProject = {
  slug: string;
  title: string;
  problem: string;
  stack: string[];
  year: string;
  tag?: string;
  metric?: string;
  cover?: string;
  links?: { label: string; url: string }[];
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "fitwardrobe",
    tier: "flagship",
    title: "FitWardrobe",
    tagline: "An AI wardrobe stylist that turns a closet full of clothes into daily outfits people actually wear.",
    role: "Founder & Product Manager",
    platform: "iOS · Web · On-device Vision",
    timeline: "2025 — Present",
    problem:
      "Everyone I talked to had a version of the same complaint: they had nothing to wear. Their closets were full. The real problem wasn't the closet — it was the 23-second mental tax on a Tuesday morning when they were already running late.",
    solution:
      "A vision-first wardrobe that catalogs every item from a photo, learns fit and occasion rules from real usage, and recommends outfits pre-scored for weather, calendar, and confidence.",
    cover: fitwardrobeCover,
    featured: true,
    status: "In Progress",
    liveUrl: "https://fitwardrobe.me/",
    repoUrl: "https://github.com/fitwardrobe/fitwardrobe",
    extraLinks: [
      {
        label: "Dev.to Case Essay",
        url: "https://dev.to/aryan_panwar1/how-i-built-an-seo-skill-for-ai-ides-because-my-cursor-kept-getting-it-wrong-3dki",
      },
    ],
    sections: {
      overview:
        "FitWardrobe is a fashion assistant that classifies clothing on-device and recommends daily outfits. The wedge is the recommendation loop; everything else — cataloguing, weather, calendar — exists to make that recommendation trustworthy.",
      problemStatement:
        "Existing wardrobe apps solve organisation, not styling. Users abandon them because they still have to compose outfits themselves — the hard part is unchanged.",
      marketNeed:
        "On-device vision had just become fast enough to feel real. That changed the economics: you could classify a garment in under two seconds without a server. The moment the technical constraint lifted, the product became worth building.",
      targetUsers:
        "I assumed I was building for fashion-conscious people. Discovery interviews said otherwise. The people who engaged most were time-constrained and mildly anxious about social presentation — not particularly interested in fashion, but very interested in fewer decisions per morning.",
      research:
        "Problem-space interviews before building anything. Diary studies where participants texted me each morning with what they wore and why. Most stopped texting by day 4 — which was data: the logging friction was too high for a daily habit. I hadn't expected that.",
      insights: [
        "Users don't want more outfit ideas — they want fewer, and confident ones.",
        "'Fit' is emotional: the same shirt gets rejected on a Monday and picked on a Friday.",
        "Cataloguing feels like homework. If it takes more than 10 seconds per item, it doesn't happen.",
      ],
      opportunity:
        "The right surface isn't a better closet — it's a morning ritual. Get a user a good outfit in under 30 seconds after opening the app.",
      scope: [
        "Photo-to-item vision pipeline (on-device background removal + attributes)",
        "Daily outfit generator with weather + calendar signals",
        "Feedback loop: keep / swap / never-again",
      ],
      outOfScope: [
        "Marketplace / shopping integration for v1",
        "Social sharing feed",
        "Multi-user closets",
      ],
      assumptions:
        "The riskiest assumption was that people would accept 3–5 recommendations instead of an infinite scroll. Everything I'd built before had given users more options, not fewer. I wasn't sure the constraint would feel like confidence rather than limitation until I watched a pilot user tap 'keep' without scrolling.",
      successCriteria: [
        "Target: D7 return rate meaningfully above the onboarding cohort baseline.",
        "Target: kept-outfit rate above half of daily recommendations — the model earning trust, not just generating variety.",
        "Kill condition: if correction rate rises above swap rate, the model is creating cleanup work, not saving time.",
      ],
      expectedBehaviour:
        "Open app → see today's outfit in under 5 seconds → tap keep or swap → move on with the morning.",
      northStar: "Weekly Kept Outfits per Active User — chosen over DAU because it captures actual model trust. A user can open the app daily and reject everything. That's a failing product that looks good in the wrong metric.",
      supportingMetrics: ["Time to First Outfit", "Swap Rate", "Correction Rate", "D7 / D30 Retention"],
      prioritization:
        "RICE across the backlog, with Confidence replaced by an evidence-class label. Vision quality and outfit-generation confidence won every round; social features consistently lost to retention bets.",
      wireframes:
        "A Figma clickthrough showing a single 'what should I wear?' response — no catalog, no UI chrome, just an answer. I measured one thing: whether the test user tapped again without being asked. Most did. That was enough to start building.",
      prd:
        "One-page per release. The non-goals section was the one I took most seriously — it had to name the things I was explicitly choosing not to build. If I couldn't articulate why something was out of scope, it wasn't actually out of scope.",
      prototype:
        "A clickable mock shown to a handful of people before any model code existed. The biggest thing I learned: users engaged with the recommendation before they engaged with the catalog. They cared about the answer, not the archive.",
      finalSolution:
        "A vision-first onboarding, a daily home screen that opens on today's outfit, and a feedback loop that quietly trains the model on every keep or swap.",
      reflection:
        "The hardest PM call was cutting the social feed. It would have made the demo pretty. It would have made the retention worse. I still believe it was right, but I had to sit with the discomfort of a less impressive demo for a while.",
      lessons: [
        "The classifier — my original headline feature — became invisible in the final product. Not because it didn't work, but because the product worked better when it wasn't visible. That was a strange thing to accept.",
        "Discovery before building is a habit, not a phase. I keep having to remind myself of this on every new project.",
      ],
    },
  },
  {
    slug: "mithivoices",
    tier: "flagship",
    title: "Mithivoices",
    tagline: "An open-source voice AI toolkit that lets small teams ship real-time voice agents without a research team.",
    role: "Product Manager & Contributor",
    platform: "Open Source · Python · Web",
    timeline: "2025",
    problem:
      "Real-time voice AI is stuck behind two walls: closed APIs from big providers, and research code that never ships. Small teams can’t compete.",
    solution:
      "A modular, self-hostable stack — STT, LLM routing, TTS, telephony — packaged so a two-person team can ship a production voice agent in a weekend.",
    cover: mithivoicesCover,
    status: "Shipped",
    repoUrl: "https://github.com/mithivoices/ai-voice-platform",
    sections: {
      overview:
        "Mithivoices is an OSS opinionated stack for real-time voice agents. It optimises for latency and swap-ability over completeness.",
      problemStatement:
        "The gap between a voice demo and a production voice agent is measured in months. Latency, interruption handling, and cost per minute kill most builds.",
      marketNeed:
        "The closed-API problem was getting worse, not better. Builders who could afford hosted providers were fine. Everyone else was building on top of things that could change terms at any time. An open, swappable stack felt like infrastructure that was missing.",
      targetUsers:
        "Indie hackers, small SaaS teams, and researchers who want to ship, not train.",
      research:
        "Went deep on a stack of GitHub repos that had stalled — looking for where they broke. Talked to builders who had abandoned voice projects mid-way. Interruption handling and latency were the two things that killed otherwise-working demos, across almost every conversation.",
      insights: [
        "Builders don't want more models — they want opinionated defaults that let them skip the research phase entirely.",
        "Sub-500ms end-to-end latency is the difference between 'demo' and 'usable.'",
        "Swap-ability of STT/LLM/TTS is a hard requirement. Projects built on single-provider stacks break the moment pricing changes.",
      ],
      opportunity:
        "Ship the fastest, most swappable OSS voice stack — and let community modules cover the long tail.",
      scope: [
        "Latency-first pipeline architecture",
        "Pluggable STT / LLM / TTS providers",
        "Interruption + barge-in handling out of the box",
      ],
      outOfScope: [
        "Hosted SaaS layer",
        "Voice cloning",
        "Custom model training",
      ],
      assumptions:
        "The biggest bet was that contributors would show up if the core was opinionated enough. Open-source projects that try to please everyone often end up serving no one. I picked a default stack and was prepared to be wrong about the choices.",
      successCriteria: [
        "Target: first voice agent shipped by a stranger within 30 days of v1 — if someone outside the project can install and run it, the quickstart is good enough.",
        "Target: median end-to-end latency under 500ms in the reference agent.",
        "Kill condition: if the quickstart takes longer than 15 minutes for a developer who reads the README once, the defaults are not sane enough.",
      ],
      expectedBehaviour:
        "Clone repo → run the reference agent → swap one provider → ship a branded agent in a weekend.",
      northStar: "Voice Agents Shipped by External Users",
      supportingMetrics: ["Median E2E Latency", "External Contributors", "GitHub Stars-to-Fork Ratio"],
      prioritization:
        "Every roadmap item was scored against 'does this reduce time-to-first-agent?' Anything that didn't was closed without ceremony.",
      wireframes:
        "The README was the prototype. I wrote it before I wrote any code — describing how a developer would install and run a voice agent in a weekend. If the README made it sound easy, the API needed to make it easy. Everything I built was measured against whether the quickstart stayed honest.",
      prd:
        "Module-level RFCs in the repo rather than a top-level PRD. Each module — STT adapter, interruption handler, TTS wrapper — had its own one-pager: the interface it exposed, what it didn't do, and what the open questions were.",
      prototype:
        "A live agent on a real phone number. Every architectural decision had to survive an actual call. If it felt wrong on a call, it didn't matter that it looked right in a spec.",
      finalSolution:
        "A clean pipeline, provider adapters, and a 5-minute quickstart that puts a working agent on a phone number.",
      reflection:
        "The thing I didn't expect about OSS PM: contributors take the project in directions you didn't plan, and some of those directions are better than yours. The hardest skill is knowing when to get out of the way of work that's going somewhere good.",
      lessons: [
        "The quickstart is the marketing site for developer tools. If setup takes more than a few minutes, most people don't get to the product.",
        "I was tempted to build a hosted tier early. Not doing it was the right call — but it was a harder call than I expected, because the hosted tier would have made the demo much easier to show.",
      ],
    },
  },
  {
    slug: "seo-geo-optimizer",
    tier: "flagship",
    title: "SEO-GEO Optimizer",
    tagline: "An npm package that makes any site legible to both Google and the new generation of AI answer engines.",
    role: "Creator & PM",
    platform: "npm · Node · Next.js",
    timeline: "2026",
    problem:
      "AI answer engines (Perplexity, ChatGPT search, Google AI Overviews) are quietly becoming the front page of the web — but almost no site is optimised for them.",
    solution:
      "A drop-in library that generates GEO-aware structured data, llms.txt, semantic anchors, and citation-friendly content blocks — with zero config for the common case.",
    cover: seoGeoCover,
    status: "Shipped",
    extraLinks: [
      { label: "npm package", url: "https://www.npmjs.com/package/seo-geo-optimizer" },
    ],
    sections: {
      overview:
        "SEO-GEO Optimizer is a developer-first library for the AI-search era. It treats LLMs as first-class crawlers, not accidents.",
      problemStatement:
        "SEO best-practice is optimised for click-through; GEO (Generative Engine Optimization) is optimised for citation. Most sites are optimised for neither.",
      marketNeed:
        "I searched for my own portfolio on Perplexity and it returned someone else's work. Not a paraphrased version — a different person entirely. That was the immediate problem. The deeper one: I had no reliable way to make a site legible to something that wasn't a traditional crawler.",
      targetUsers:
        "Indie devs and small teams shipping content-heavy sites — docs, blogs, marketing pages — who want AI citations without hiring an SEO agency.",
      research:
        "Spent time with pages that were getting cited by AI engines and pages that weren't, looking for the difference. The pattern that appeared most consistently: cited pages gave the answer in the first paragraph. Not a teaser — the actual answer. The rest of the page could elaborate.",
      insights: [
        "AI engines reward clarity, not keyword density. This sounds obvious until you realise most content is optimised for the latter.",
        "Structured data is the floor now, not the differentiator. What the data says is still the question.",
        "I still don't fully understand why some pages get cited and others don't, even with identical markup. Answer-density matters, but I haven't proven the mechanism cleanly.",
      ],
      opportunity:
        "Package the 80% of GEO best-practice as sane defaults, and expose the 20% as opt-in knobs.",
      scope: [
        "Auto JSON-LD for Article / FAQ / HowTo / Product",
        "llms.txt generator",
        "Answer-block components for React frameworks",
      ],
      outOfScope: [
        "Full analytics dashboard",
        "Hosted SaaS tier",
        "Manual keyword research tools",
      ],
      assumptions:
        "The bet was that developers would install an npm package rather than read a blog post and implement manually. That's not obvious — the blog-and-copy approach has always won for SEO tooling. I believed the developer-native packaging would convert better for this audience specifically.",
      successCriteria: [
        "Target: weekly downloads trending upward within 90 days — not a specific number, but evidence that word was spreading without paid distribution.",
        "Target: at least one case study of a user site cited by an AI engine within 60 days of launch.",
        "Kill condition: if install-to-first-citation takes longer than a month for the median user, the defaults aren't doing enough.",
      ],
      expectedBehaviour:
        "npm install → wrap layout → done. First AI citation within a month.",
      northStar: "Sites Cited by AI Engines After Install — not downloads, not stars. Citations are the proof of value.",
      supportingMetrics: ["Weekly Downloads", "GitHub Issues Closed / Opened", "Time-to-First-Structured-Page"],
      prioritization:
        "Everything was scored against 'does this show up in a real answer engine result?' Citations were the only currency.",
      wireframes:
        "The API surface was the design. Every export was named for the answer it enabled, not the mechanism underneath it.",
      prd:
        "One-page RFCs in-repo per major surface. Kept close to the code so they didn't drift from what was actually built.",
      prototype:
        "Dogfooded on this portfolio and my own blog before any public release. Iterated the API until it fit a real site in under 30 minutes. If I couldn't use it myself in half an hour, the defaults weren't sane enough.",
      finalSolution:
        "A single package, three exports, and a 'just works' default that covers Article, FAQ, and HowTo pages out of the box.",
      reflection:
        "The best PM work here was aggressive scope-cutting. I said no to a hosted SaaS tier three times. Each time it would have delayed the first real user shipping by months.",
      lessons: [
        "Developer tools are UX products. The API is the interface, and the quickstart is the first impression.",
        "For emerging categories, ship early and let the docs grow with the use cases. A perfect spec for a category that doesn't exist yet is a waste of time.",
      ],
    },
  },
  {
    slug: "ai-first-crm-hcp",
    tier: "supporting",
    title: "AI-First CRM (HCP)",
    tagline: "A LangGraph-powered CRM that treats every healthcare-provider conversation as a stateful agent workflow.",
    role: "Product & AI Engineer",
    platform: "Web · LangGraph · Python",
    timeline: "2025",
    problem:
      "Field reps talking to HCPs (healthcare providers) juggle 4+ tools per visit. Notes get lost, follow-ups slip, and the CRM becomes homework instead of a co-pilot.",
    solution:
      "A LangGraph-backed workflow where the CRM is an agent that listens, drafts notes, and proactively surfaces the next best action.",
    cover: aiCrmCover,
    status: "Shipped",
    repoUrl: "https://github.com/Aryanpanwar10005/AI_CRM_HCP",
    sections: {
      overview:
        "A working prototype that reframes CRM data entry as an outcome the system delivers, not a chore the user performs.",
      problemStatement:
        "Traditional CRMs demand structured input from users under time pressure. Adoption is bad because the value is delayed and the friction is immediate.",
      marketNeed:
        "Pharma sales ops teams are actively piloting AI-first CRMs. The teams that win will make reps faster in the field, not just give managers prettier dashboards.",
      targetUsers:
        "Field reps in life-sciences sales who are on the road between visits, plus their managers who live in the reports downstream.",
      research:
        "Shadowed reps between visits. The pattern that appeared across every conversation: the CRM was filled at night, from memory, hours after the visits. One rep said this at 11am, while actively typing notes into his phone to transcribe later. He didn't see the irony until I pointed it out.",
      insights: [
        "The best CRM is one the user never types into — but trust has to be earned before they'll stop typing.",
        "Trust in AI notes is earned in the first few interactions, or not at all. Early accuracy matters more than average accuracy.",
      ],
      opportunity:
        "Move CRM from a system of record to a system of action — the rep talks, the system captures and drafts the next step.",
      scope: [
        "LangGraph agent for note capture + summarisation",
        "Next-best-action recommendation surface",
        "Human-in-the-loop review UI",
      ],
      outOfScope: ["Full CRM replacement", "Native mobile app", "Multi-tenant admin"],
      assumptions:
        "The most uncertain bet: that reps would trust a draft they could edit more than a form they controlled. That trust is earned quickly or not at all — the research said the first three interactions determined whether a rep adopted the tool or worked around it.",
      successCriteria: [
        "Target: note capture time per visit drops meaningfully — enough that reps notice without being told to notice.",
        "Target: draft acceptance rate above 80% — meaning fewer than 3 significant edits per note. Below that, the model is creating cleanup work.",
        "Kill condition: if reps are re-typing the AI draft instead of editing it, the review surface has failed regardless of accuracy.",
      ],
      expectedBehaviour:
        "Rep finishes visit → opens app → reviews and confirms a pre-drafted summary → next-best-action is queued.",
      northStar: "Rep-Confirmed Interactions per Week — not model accuracy, because a highly accurate model that reps don't use changes nothing.",
      supportingMetrics: ["Draft Acceptance Rate", "Note Capture Time", "Next-Action Follow-Through"],
      prioritization:
        "Everything was measured against rep time saved per visit. Manager dashboards were explicitly deprioritised for v1.",
      wireframes:
        "Two rounds of flows with reps. The confirm-vs-edit ratio drove every layout choice — we measured how often a rep accepted a draft versus edited it, and used that to decide how much to surface versus hide.",
      prd:
        "One-page PRDs per agent node, plus a shared eval spec for the whole graph. Keeping the eval spec separate meant we could update it without touching the product spec.",
      prototype:
        "Live agent tested against recorded visit transcripts before any rep saw it. Iterated on prompt and graph until the acceptance pattern looked right. Then showed it to reps.",
      finalSolution:
        "A stateful LangGraph agent, a light review UI, and a next-best-action queue synced to the existing CRM of record.",
      reflection:
        "The hardest call was turning off a feature reps actually liked — the assistant would sometimes add context it had inferred from previous visits. Accurate. Creepy. We turned it off because trust was more important than capability in month one.",
      lessons: [
        "The review surface is the product. The same model weights, with a bad confirmation UI, would have had a fraction of the adoption.",
        "I spent two weeks improving accuracy by a few points. Those points were invisible to users. The read-back UI — one day of work — moved adoption more than those two weeks did.",
      ],
    },
  },
  {
    slug: "credex-spend-audit",
    tier: "supporting",
    title: "Credex — AI Spend Audit",
    tagline: "An AI auditor that reads a company’s SaaS invoices and flags every dollar leaking out of the stack.",
    role: "Product & AI Engineer",
    platform: "Web · LLM Pipelines",
    timeline: "2025",
    problem:
      "Companies waste an estimated 30% of their SaaS spend on unused seats, duplicated tools, and forgotten renewals — and nobody has time to audit line-by-line.",
    solution:
      "An AI pipeline that ingests invoices and usage exports, reconciles them against seats and features, and produces a ranked list of savings opportunities.",
    cover: credexCover,
    status: "Concept",
    liveUrl: "https://credex-ai-spent-audit.vercel.app/",
    repoUrl: "https://github.com/Aryanpanwar10005/credex_AI_spent_audit",
    sections: {
      overview:
        "A wedge product aimed at ops leaders at 50–500 person companies who feel the spend but can't prove it.",
      problemStatement:
        "Finance sees the invoices; IT sees the usage; nobody joins the two. The result is quiet, compounding waste.",
      marketNeed:
        "The enterprise SaaS management category (Vendr, Zylo) works well for large companies. For teams too small for those platforms but too big for spreadsheets, there was nothing purpose-built. That gap had always existed — the new thing was that AI could now read and reconcile invoices without manual extraction.",
      targetUsers:
        "Ops leads, fractional CFOs, and finance managers at 50–500 person companies — people who know they're overspending but don't have the bandwidth to prove it line by line.",
      research:
        "Discovery calls with ops leads at companies of roughly the right size. Every single one had a version of a SaaS audit spreadsheet. None of them had looked at it recently. The blocker wasn't insight — it was that the audit required time they didn't have.",
      insights: [
        "The blocker isn't insight — it's the effort to produce it. Everyone knows they're overpaying. Nobody has three hours to reconcile it.",
        "A ranked list of specific dollar savings beats a dashboard. The report is what gets forwarded to the CFO.",
      ],
      opportunity:
        "Automate the audit that everyone knows they should do and nobody does.",
      scope: [
        "Invoice ingestion + normalisation",
        "Usage reconciliation for top-20 SaaS tools",
        "Ranked savings report with dollar amounts",
      ],
      outOfScope: [
        "Contract negotiation",
        "Procurement workflow",
      ],
      assumptions:
        "The central bet: that an ops lead would connect read-only integrations if the payoff was shown as a specific dollar number. People protect their data. I wasn't sure 'estimated savings' would be compelling enough until a pilot user forwarded their report to their CFO on the same day they ran it.",
      successCriteria: [
        "Target: each audit surfaces a meaningful savings opportunity — enough that forwarding the report to a CFO feels worth doing.",
        "Target: most pilots who run a full audit convert to monthly monitoring without prompting.",
        "Kill condition: if the report doesn't get forwarded in the first week, the artifact isn't valuable enough to drive organic growth.",
      ],
      expectedBehaviour:
        "Connect integrations → run audit → get a ranked list of savings within 24 hours.",
      northStar: "Dollars of Verified Savings Surfaced — because this is the number that earns a second conversation with the CFO.",
      supportingMetrics: ["Audit Completion Rate", "Time to First Report", "Conversion to Monitoring"],
      prioritization:
        "Every feature was scored against 'does this add another verified savings line?' Everything else waited.",
      wireframes:
        "Report-first design from the start. I built what the report would look like before I built the pipeline that would generate it. The layout was designed to be forwarded — scannable in under two minutes, with a clear headline number.",
      prd:
        "One-page PRD per pipeline stage plus a shared savings-rubric doc. The rubric was the most debated artifact: what counts as a verified saving versus an estimate.",
      prototype:
        "Manual audit for two people before writing any code. I ran the reconciliation by hand, produced the report in a spreadsheet, and asked whether they'd pay for it. They said yes. Then I automated it.",
      finalSolution:
        "A read-only integration layer, an LLM-assisted reconciler, and a report designed to be forwarded to a CFO.",
      reflection:
        "The decision I'm most confident about: not building a dashboard for v1. The report is what gets forwarded to a CFO. A dashboard doesn't get forwarded. The artifact is the growth loop, not the app.",
      lessons: [
        "For B2B AI, the artifact matters more than the app. If the output is worth forwarding, you have distribution.",
        "Running the process manually before automating it was the most valuable week I spent on this project. The manual version taught me which edge cases mattered and which didn't.",
      ],
    },
  },
];

export const archivedProjects: ArchiveProject[] = [
  {
    slug: "digital-heroes-golf",
    title: "Digital Heroes Golf",
    tag: "Live product",
    problem:
      "Subscription-based golf performance tracker with Game-of-Skill compliance and rolling-index math computed at the database layer. Razorpay payments live.",
    stack: ["Next.js 15", "Tailwind v4", "Supabase", "Razorpay"],
    metric: "Subscriptions live",
    year: "2025",
    links: [{ label: "Live", url: "https://golfheros.vercel.app/" }],
  },
  {
    slug: "webable-vendorshield",
    title: "WebAble AI — VendorShield",
    tag: "DevPost hackathon",
    problem:
      "Vendor-security audit platform that uses AI to generate and manage security reports with MongoDB persistence, PDF export, and a Docker-containerised full stack.",
    stack: ["Next.js", "MongoDB", "JWT", "Docker"],
    year: "2025",
    links: [
      { label: "GitHub", url: "https://github.com/Aryanpanwar10005/WebAble-AI" },
    ],
  },
  {
    slug: "hyperliquid-trader-analysis",
    title: "Hyperliquid Trader Analysis",
    tag: "Data science",
    problem:
      "Analysis of 211,000+ Hyperliquid trade records against the BTC Fear & Greed Index — surfacing market-regime edges and trader-performance patterns.",
    stack: ["Python", "Pandas", "Jupyter", "Matplotlib"],
    metric: "211K+ records",
    year: "2025",
    links: [
      { label: "GitHub", url: "https://github.com/Aryanpanwar10005/primetrade.ai" },
    ],
  },
  {
    slug: "esp32-differential-drive-robot",
    title: "ESP32 Differential Drive Robot",
    tag: "Embedded",
    problem:
      "Production firmware for an autonomous robot — GPS tracking, BLE authentication, WebSocket telemetry, and live ESP32-CAM video streaming.",
    stack: ["C++", "ESP32", "PlatformIO", "BLE", "GPS"],
    year: "2024",
    cover: robotCover,
    links: [
      {
        label: "GitHub",
        url: "https://github.com/Aryanpanwar10005/ESP32-differential-drive-robot",
      },
    ],
  },
  {
    slug: "wireless-ev-charging",
    title: "Wireless EV Charging Prototype",
    tag: "Published · JETIR",
    problem:
      "IPT-based wireless EV charging prototype with dual-spot parking management — 85% charging efficiency. 1st place at college branch expo, published in JETIR (IF 7.95).",
    stack: ["C++", "Arduino", "Power Electronics", "IPT"],
    metric: "85% efficiency",
    year: "2026",
    cover: evChargerCover,
    links: [
      { label: "Paper", url: "http://www.jetir.org/view?paper=JETIR2604872" },
    ],
  },
  {
    slug: "robotic-arm-4dof",
    title: "4-DOF Robotic Arm",
    tag: "Robotics",
    problem:
      "High-precision robotic arm using inverse-kinematics algorithms — 2 mm positioning accuracy for automated pick-and-place tasks with Arduino and servo motors.",
    stack: ["C++", "Arduino", "Servo Motors", "IK"],
    metric: "2 mm accuracy",
    year: "2024",
    links: [
      {
        label: "GitHub",
        url: "https://github.com/Aryanpanwar10005/robotic_arm_4dof",
      },
    ],
  },
  {
    slug: "smart-staircase-lighting",
    title: "Smart Staircase Lighting",
    tag: "Hardware",
    problem:
      "Automated IR motion-triggered lighting with Arduino control — 45% energy reduction versus always-on traditional systems.",
    stack: ["C++", "Arduino", "IR Sensors"],
    metric: "45% energy saved",
    year: "2023",
    cover: staircaseCover,
    links: [
      {
        label: "GitHub",
        url: "https://github.com/Aryanpanwar10005/smart_staircase_lighting_system",
      },
    ],
  },
];

export const flagshipCaseStudies = caseStudies.filter((c) => c.tier === "flagship");
export const supportingCaseStudies = caseStudies.filter((c) => c.tier === "supporting");

export const getCaseStudy = (slug: string) =>
  caseStudies.find((c) => c.slug === slug);