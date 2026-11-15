export type CaseStudyTier = "flagship" | "supporting";

const fitwardrobeCover = "/assets/fitwardrobe.webp";
const mithivoicesCover = "/assets/mithivoices.webp";
const seoGeoCover = "/assets/seo-geo-optimizer.webp";
const aiCrmCover = "/assets/ai-crm-hcp.webp";
const credexCover = "/assets/credex-spend-audit.webp";
const evChargerCover = "/assets/evcharger.webp";
const staircaseCover = "/assets/staircase.webp";

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
  status?: "Shipped" | "In Progress" | "Concept" | "Prototype";
  publishedAtISO?: string;
  /** Date of the last significant content edit. Feeds dateModified and the sitemap. */
  updatedAtISO?: string;
  metaDescription?: string;
  /** Search-result title; defaults to "<title>: AI Product Case Study". */
  seoTitle?: string;
  /** Month the case study content was last revised, e.g. "October 2026". */
  updatedLabel?: string;
  /** One-line "try it" command shown under the header, for tool case studies. */
  quickStart?: { command: string; note: string };
  result?: string;
  tldr?: string[];
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
    results?: string;
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
    tagline: "A wardrobe app for people who already own enough clothes but have no time to remember them all or work out what goes together.",
    role: "Founder",
    platform: "Android · iOS · Web (pre-launch) · Cloud AI",
    timeline: "2025 - Present",
    publishedAtISO: "2026-03-04",
    updatedAtISO: "2026-11-16",
    problem:
      "Most people own more clothes than they can keep track of. McKinsey reported that clothing purchases rose about 60% over 15 years (mckinsey.com), and Movinga's survey of 18,000+ households found most wardrobes hold items unworn for 12 months or more (movinga.com, 2018). The hard part isn't buying. It's remembering what you have and working out what goes together, usually at 8am or the night before an event. A dated M&S survey of women put weekday outfit choice at about 17 minutes.",
    solution:
      "Add your clothes once, by photo or by sharing a shop link or product image. FitWardrobe remembers them and puts a full outfit together from your own wardrobe for the occasion you pick: work, an interview, a date, a wedding or party, travel, the gym or an everyday day. Each outfit comes with one or two alternatives and a short reason.",
    cover: fitwardrobeCover,
    featured: true,
    status: "In Progress",
    metaDescription: "FitWardrobe product case study: framing the wardrobe problem as memory and time, not storage, choosing cloud AI with on-device wardrobe storage, and scoping the pre-launch build.",
    result: "Pre-launch · 20.8K search impressions in 6 months (to Sep 2026)",
    tldr: [
      "Problem: people have the clothes but not the time or memory to combine them. Published research (McKinsey, Movinga) points the same way: the bottleneck is remembering, not owning.",
      "Decision: clothes are added once (photo or shop link) and the app plans whole outfits per occasion. Image analysis runs in the cloud (Gemini) and styling uses an LLM via Groq, while the wardrobe itself stays stored on the phone.",
      "Status: in development and not launched yet, so there are no user metrics. What is real so far is the marketing site's search traction: about 20.8K impressions and 315 clicks in the six months to September 2026, with no paid spend.",
    ],
    liveUrl: "https://fitwardrobe.me/",
    updatedLabel: "November 2026",
    repoUrl: "https://github.com/fitwardrobe/fitwardrobe",
    extraLinks: [
      {
        label: "FitWardrobe site",
        url: "https://fitwardrobe.me/",
      },
    ],
    sections: {
      overview:
        "FitWardrobe is a wardrobe app I'm building as founder. You add your clothes once, and it puts outfits together from what you already own for the occasion you choose. It is pre-launch: launch is planned on Android, iOS and the web together. This case study covers the framing, the architecture decision and the scope. There are no usage results yet, and I don't present any.",
      problemStatement:
        "Wardrobe apps tend to solve organisation: a neat catalogue of everything you own. The problem people describe is different. They can't remember what they have, and they don't have time to work out combinations, especially before work or an event. The answer isn't a better catalogue. It's an app that does the remembering and the combining for you.",
      marketNeed:
        "McKinsey reported that clothing purchases rose about 60% over 15 years (mckinsey.com), and Movinga's 2018 survey of 18,000+ households found that most wardrobes hold clothes unworn for a year or more (movinga.com). Cloud vision models are now cheap and accurate enough to tag a garment from a single photo, which removes the data-entry work that made earlier wardrobe apps feel like homework.",
      targetUsers:
        "People in their twenties who dress for work, interviews, dates and events, own enough clothes, and are short on time. My research so far is informal: conversations with friends about the last time they got stuck choosing an outfit. It's a starting hypothesis, not validated segmentation.",
      research:
        "Desk research came first: published work on clothing use, including the PLATE conference papers on how people keep and forget clothes (plateconference.org). Then informal chats with friends. The pattern in both was the same: the pain is memory and time, and manual cataloguing is where people give up. That pushed the design toward adding each item once with as little effort as possible.",
      insights: [
        "People don't want more outfit ideas. They want one good outfit and a couple of alternatives.",
        "The occasion matters more than the day: a wedding next week needs planning, a Tuesday at work needs speed.",
        "Cataloguing feels like homework. Adding an item has to take one photo or one shared link.",
      ],
      opportunity:
        "Plan the outfit before the moment it's needed, the night before work or a week before the wedding, so the morning scramble goes away.",
      scope: [
        "Add clothes by photo or by sharing a shop link or product image (cloud image analysis; wardrobe stored on the device)",
        "Occasion-based outfit planning: work, interview, date, wedding or party, everyday, travel, gym",
        "One or two alternatives per outfit, plus keep / swap feedback",
      ],
      outOfScope: [
        "Accessories (planned for a later phase)",
        "Social sharing feed",
        "Multi-user closets",
      ],
      assumptions:
        "The riskiest assumption is that people will accept one outfit plus one or two alternatives instead of an endless scroll. Everything I'd built before gave users more options, not fewer. This is untested with real users and is the first thing launch has to check.",
      successCriteria: [
        "Target (post-launch): most new users add enough items to get a first outfit in their first session.",
        "Target (post-launch): kept-outfit rate above half of suggestions, a sign of trust rather than variety.",
        "Kill condition: if users correct the outfit more often than they swap it, the app is creating cleanup work instead of saving time.",
      ],
      expectedBehaviour:
        "Pick the occasion → see a full outfit from your own clothes with a reason and one or two alternatives → keep or swap → done. (Target experience; not measured yet.)",
      northStar: "Weekly kept outfits per active user. I chose it over DAU because it captures trust: a user can open the app daily and reject everything, which is a failing product that looks fine on the wrong metric.",
      supportingMetrics: ["Planned: time to first outfit", "Planned: swap rate", "Planned: correction rate", "Planned: D7 / D30 retention", "Real (marketing site): 20.8K impressions / 315 clicks in the 6 months to Sep 2026; 258 clicks / 23.9K impressions in the 90 days to 14 Nov 2026"],
      prioritization:
        "RICE across the backlog, with Confidence replaced by an evidence label (research-backed, anecdotal or a guess). Outfit quality and easy item entry ranked first; social features ranked last.",
      wireframes:
        "Early screens answer one question, \"what should I wear for this?\", with no catalogue view in front. I showed them to a few friends to check that the answer, not the archive, was what caught their attention.",
      prd:
        "One page per release. I took the non-goals section most seriously: it has to name what I'm choosing not to build. If I can't say why something is out of scope, it isn't really out of scope.",
      prototype:
        "The build is still in development. The most useful early lesson came from friends looking at the screens: they reacted to the outfit suggestion before they cared about the wardrobe list.",
      finalSolution:
        "Planned for launch: quick item entry (photo or shop link), an occasion picker, full outfits with alternatives and a reason, and keep/swap feedback that the app will learn from.",
      results:
        "No product results yet: FitWardrobe hasn't launched. The real number so far is search demand for the marketing site: about 20,800 Google impressions and 315 clicks in the six months to September 2026, and 258 clicks from 23,900 impressions in the 90 days to 14 November 2026, all unpaid.",
      reflection:
        "The biggest change was in the problem statement, not the feature list. I started out thinking about a smarter closet and ended up with a planning tool for the moments when getting dressed matters. The architecture followed from that: use the best cloud model for tagging, and keep the wardrobe itself on the user's phone.",
      lessons: [
        "The cataloguing feature I started with matters less than the outfit at the end. The product gets simpler when the catalogue stays in the background.",
        "Discovery before building is a habit, not a phase. I keep having to remind myself of this on every new project.",
        "The catalogue was the wrong hero. Apps that demand upfront data entry lose people (the cold-start problem), so adding an item has to cost one photo or one link.",
      ],
    },
  },
  {
    slug: "mithivoices",
    tier: "flagship",
    title: "Mithivoices",
    tagline: "An open-source, local voice AI platform: text-to-speech, speech-to-text and a swappable LLM, so small teams can prototype voice features without per-minute API fees.",
    role: "Product Manager & Contributor",
    platform: "Open Source · Python · Web",
    timeline: "Dec 2025 – Jan 2026",
    publishedAtISO: "2026-03-04",
    updatedAtISO: "2026-07-21",
    problem:
      "Small teams who want to build voice AI features have two options: pay per-minute to closed APIs (Deepgram, ElevenLabs) that can change pricing any time, or dig through research code that never actually ships.",
    solution:
      "A self-hostable stack - text-to-speech with Piper voices, speech-to-text, and a pluggable LLM (Gemini or Ollama) - behind a FastAPI backend and a React web app.",
    cover: mithivoicesCover,
    featured: false,
    status: "Shipped",
    metaDescription: "How I built and open-sourced a local voice AI platform - Piper text-to-speech, speech-to-text and a swappable LLM - so small teams can prototype voice features without per-minute API fees.",
    result: "Open source · v0.2.0 released",
    tldr: [
      "Small teams building voice features had two options: pay per-minute to closed APIs like Deepgram or ElevenLabs, or dig through research code that never ships.",
      "I built Mithivoices and open-sourced it under MIT: text-to-speech with downloadable Piper voices, a speech-to-text endpoint, and an LLM layer that can switch between Gemini and Ollama.",
      "v0.2.0 shipped in January 2026 with a README-first quickstart. Real-time voice agents and telephony are not built yet.",
    ],
    repoUrl: "https://github.com/mithivoices/ai-voice-platform",
    sections: {
      overview:
        "Mithivoices is an opinionated open-source voice platform that runs locally. It optimises for swap-ability and a simple setup over completeness.",
      problemStatement:
        "The gap between a voice demo and a production voice agent is measured in months. Latency, interruption handling, and cost per minute kill most builds.",
      marketNeed:
        "The closed-API problem was getting worse, not better. Builders who could afford hosted providers were fine. Everyone else was building on top of things that could change terms at any time. An open, swappable stack felt like infrastructure that was missing.",
      targetUsers:
        "Indie hackers, small SaaS teams, and researchers who want to ship, not train.",
      research:
        "Read through open-source voice projects that had stalled, looking for where they broke. Setup pain and single-provider lock-in came up again and again, so those became the two things to design against.",
      insights: [
        "Builders don't want more models - they want opinionated defaults that let them skip the research phase entirely.",
        "Working belief: sub-500ms end-to-end latency is the line between a demo and something usable. This version doesn't measure it yet.",
        "Swap-ability of STT/LLM/TTS is a hard requirement. Projects built on single-provider stacks break the moment pricing changes.",
      ],
      opportunity:
        "Ship the fastest, most swappable OSS voice stack - and let community modules cover the long tail.",
      scope: [
        "Text-to-speech with downloadable Piper voices",
        "Speech-to-text endpoint",
        "Pluggable LLM providers (Gemini, Ollama) behind one interface",
      ],
      outOfScope: [
        "Hosted SaaS layer",
        "Voice cloning",
        "Custom model training",
      ],
      assumptions:
        "The biggest bet was that contributors would show up if the core was opinionated enough. Open-source projects that try to please everyone often end up serving no one. I picked a default stack and was prepared to be wrong about the choices.",
      successCriteria: [
        "Target: first voice agent shipped by a stranger within 30 days of v1 - if someone outside the project can install and run it, the quickstart is good enough.",
        "Target: median end-to-end latency under 500ms in the reference agent.",
        "Kill condition: if the quickstart takes longer than 15 minutes for a developer who reads the README once, the defaults are not sane enough.",
      ],
      expectedBehaviour:
        "Clone the repo → download the voices → start the backend and web app → generate speech or transcribe audio → switch the LLM provider in config.",
      northStar: "Voice Agents Shipped by External Users",
      supportingMetrics: ["Median E2E Latency", "External Contributors", "GitHub Stars-to-Fork Ratio"],
      prioritization:
        "Every roadmap item was scored against 'does this reduce time-to-first-agent?' Anything that didn't was closed without ceremony.",
      wireframes:
        "The README was the prototype. I wrote it before I wrote any code - describing how a developer would install and run it in an afternoon. If the README made it sound easy, the API needed to make it easy. Everything I built was measured against whether the quickstart stayed honest.",
      prd:
        "A PRD and design notes in the repo's docs folder, written alongside the code: what each part exposes, what it doesn't do, and the open questions.",
      prototype:
        "A local web app on a FastAPI backend: pick a voice, generate audio, transcribe a clip. Everything had to run on one laptop, so a stranger could try it without cloud keys.",
      finalSolution:
        "An MIT-licensed platform with provider adapters for the LLM, Piper voices for speech, and a README-first quickstart.",
      reflection:
        "I built Mithivoices myself and then open-sourced it - which changed the design from day one. When you open-source something, every part has to work on its own. You can't have a messy monolith if strangers are going to use it. That's a product decision as much as an engineering one. The thing I didn't expect about OSS PM: contributors take the project in directions you didn't plan, and some of those directions are better than yours. I ran the module backlog through a RICE score and thought I had the reach estimates right. A contributor working on a deprioritised STT adapter pointed out I'd undercounted how many downstream modules depended on it - I'd scored from the roadmap, not the dependency graph, and he was right. I revised the score, shipped v0.2.0 on the adjusted priorities, and he stayed active on the project afterward. The framework didn't make me right. It made my reasoning visible enough for someone else to catch what I'd missed.",
      lessons: [
        "The quickstart is the marketing site for developer tools. If setup takes more than a few minutes, most people don't get to the product.",
        "I was tempted to build a hosted tier early. Not doing it was the right call - but it was a harder call than I expected, because the hosted tier would have made the demo much easier to show.",
      ],
    },
  },
  {
    slug: "seo-geo-optimizer",
    // Matches what Search Console shows people searching for (GEO case study, geo optimizer).
    seoTitle: "SEO-GEO Optimizer: A Generative Engine Optimization Case Study",
    updatedLabel: "October 2026",
    quickStart: { command: "npx seo-geo-optimizer", note: "Run it in your project folder. Add --help for IDE-specific options." },
    tier: "flagship",
    title: "SEO-GEO Optimizer",
    tagline: "Stop AI IDEs giving stale SEO advice - a 14-phase agentic skill for Cursor, Windsurf, and Copilot.",
    role: "Creator & PM",
    platform: "npm · Node · Cursor · Windsurf · Copilot",
    timeline: "2026",
    publishedAtISO: "2026-03-04",
    updatedAtISO: "2026-10-16",
    problem:
      "AI IDEs give outdated SEO advice. When Windsurf told me to optimize for FID - a Core Web Vital Google deprecated in March 2024 - I realized LLMs have no reliable way to stay current with search standards. Meanwhile, the $1B+ Generative Engine Optimization (GEO) market is growing rapidly, but developer tooling is lagging behind.",
    solution:
      "I built `seo-geo-optimizer`, an agent-native npm package. Instead of a passive library, it's a 14-phase agentic workflow. Running `npx seo-geo-optimizer` auto-detects the IDE (Cursor, Windsurf, Copilot) and installs strict instruction files that guide the AI through technical SEO, schema generation, and AI legibility audits.",
    cover: seoGeoCover,
    status: "Shipped",
    metaDescription: "I built a 14-phase agentic npm skill to stop AI IDEs giving stale SEO advice. Covers technical SEO, schema, and Generative Engine Optimization (GEO). 500+ npm downloads.",
    result: "500+ npm downloads with no paid promotion. The package is now listed on PrimeSkills AI Store and mcpskills.io, providing developers a 'one prompt, full audit' solution for AI search visibility.",
    tldr: [
      "Built a 14-phase agentic npm skill that auto-installs SEO/GEO rules into Cursor, Windsurf, and Copilot.",
      "Solved AI hallucination: prevents IDEs from giving outdated SEO advice (like optimizing for deprecated FID).",
      "500+ npm downloads with no paid promotion; listed on PrimeSkills AI Store."
    ],
    repoUrl: "https://github.com/Aryanpanwar10005/seo-geo-optimizer",
    extraLinks: [
      { label: "npm package", url: "https://www.npmjs.com/package/seo-geo-optimizer" },
      { label: "GitHub Repo", url: "https://github.com/Aryanpanwar10005/seo-geo-optimizer" },
      { label: "Dev.to Writeup", url: "https://dev.to/aryanpanwar1/how-i-built-an-seo-skill-for-ai-ides-because-my-cursor-kept-getting-it-wrong-5hd1" },
      { label: "Product Hunt", url: "https://www.producthunt.com/products/seo-geo-optmization/launches/seo-geo-optimizer" }
    ],
    sections: {
      overview:
        "SEO-GEO Optimizer is a developer-first library for the AI-search era, built as a 14-phase agentic workflow with human-in-the-loop validation gates rather than a single-pass script. It treats LLMs as first-class crawlers, not accidents.",
      problemStatement:
        "SEO best-practice is optimised for click-through; GEO (Generative Engine Optimization) is optimised for citation. Most sites are optimised for neither.",
      marketNeed:
        "I searched for my own portfolio on Perplexity and it returned someone else's work. Not a paraphrased version - a different person entirely. That was the immediate problem. The deeper one: I had no reliable way to make a site legible to something that wasn't a traditional crawler.",
      targetUsers:
        "Indie devs and small teams shipping content-heavy sites - docs, blogs, marketing pages - who want AI citations without hiring an SEO agency.",
      research:
        "Spent time with pages that were getting cited by AI engines and pages that weren't, looking for the difference. The pattern that appeared most consistently: cited pages gave the answer in the first paragraph. Not a teaser - the actual answer. The rest of the page could elaborate.",
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
        "14-phase agentic execution pipeline - a 32-question discovery intake through technical SEO, schema, content strategy, and GEO optimisation, with a human-in-the-loop validation gate between phases so nothing commits without review",
      ],
      outOfScope: [
        "Full analytics dashboard",
        "Hosted SaaS tier",
        "Manual keyword research tools",
      ],
      assumptions:
        "The bet was that developers would install an npm package rather than read a blog post and implement manually. That's not obvious - the blog-and-copy approach has always won for SEO tooling. I believed the developer-native packaging would convert better for this audience specifically.",
      successCriteria: [
        "Target: weekly downloads trending upward within 90 days - not a specific number, but evidence that word was spreading without paid distribution.",
        "Target: at least one case study of a user site cited by an AI engine within 60 days of launch.",
        "Kill condition: if install-to-first-citation takes longer than a month for the median user, the defaults aren't doing enough.",
      ],
      expectedBehaviour:
        "npm install → wrap layout → done. First AI citation within a month.",
      northStar: "Sites Cited by AI Engines After Install - not downloads, not stars. Citations are the proof of value.",
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
        "A single package, three exports, and a 14-phase agentic pipeline underneath - each phase gated by a human-in-the-loop validation step - covering Article, FAQ, and HowTo pages out of the box.",
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
    tagline: "A prototype CRM module where a pharma field rep logs a doctor visit by form or by chat, and the two stay in sync.",
    result: "Working prototype on sample data. Not yet tested with real reps.",
    tldr: [
      "Built in April 2026 to a brief: a CRM module for pharma field reps that logs healthcare-professional (HCP) visits by form or by chat, with the two kept in sync.",
      "A LangGraph pipeline with five assistant tools fills the form from the chat. Every AI-filled field is highlighted and stays editable, so the rep has the final say.",
      "I have not put it in front of reps. The metrics and kill condition below are the plan for a pilot, not results.",
    ],
    role: "Solo build (product and code)",
    platform: "Web · FastAPI · LangGraph · React",
    timeline: "April 2026",
    publishedAtISO: "2026-07-14",
    updatedAtISO: "2026-10-18",
    problem:
      "Field reps log each doctor visit by hand after the fact, often hours later and from memory. Notes get lost, follow-ups slip, and the CRM becomes homework instead of help.",
    solution:
      "Let the rep describe the visit in plain language and have the system draft the structured record, with a normal form beside it for anyone who prefers to type.",
    cover: aiCrmCover,
    status: "Prototype",
    repoUrl: "https://github.com/Aryanpanwar10005/AI_CRM_HCP",
    sections: {
      overview:
        "A working prototype that reframes CRM data entry as something the system drafts and the rep confirms, not a chore the rep does alone.",
      problemStatement:
        "Traditional CRMs demand structured input from users under time pressure. The value arrives later, in reports and follow-ups; the friction arrives now.",
      marketNeed:
        "The brief asked for an AI-first way to log HCP interactions. The design question I cared about was not whether a model can extract fields, but whether a rep would trust what it extracted.",
      targetUsers:
        "Field reps in life-sciences sales who log visits between appointments, and the managers who read the reports downstream.",
      research:
        "No access to reps for this build. The design rests on the brief and on how field-sales CRMs are usually filled in. The assumptions below are what I would test first with real reps.",
      insights: [
        "Hypothesis: the best CRM is one the rep barely types into, but trust has to be earned before they stop typing.",
        "Hypothesis: trust in AI-drafted notes is set in the first few uses, so early accuracy matters more than average accuracy.",
      ],
      opportunity:
        "Move the CRM from a system of record to a system that drafts the record: the rep talks, the system captures, the rep confirms.",
      scope: [
        "Form and chat logging, kept in sync (AI-filled fields highlight for 1.5 seconds)",
        "Five LangGraph assistant tools, including logging an interaction and an HCP profile lookup",
        "A compliance check the rep can ask for in chat (a monthly cap on in-person visits per HCP), plus a confirmation box that must be ticked before the form saves",
      ],
      outOfScope: ["Full CRM replacement", "Native mobile app", "Voice logging", "Multi-tenant admin"],
      assumptions:
        "The most uncertain bet: that reps would trust a draft they can edit more than a form they control. If that is wrong, the chat becomes a typewriter and reps re-type everything into the form.",
      successCriteria: [
        "Pilot target: note capture time per visit drops enough that reps notice without being told.",
        "Pilot target: draft acceptance above 80%, meaning fewer than 3 significant edits per note. Below that, the model creates cleanup work.",
        "Kill condition: if reps re-type the AI draft instead of editing it, the review surface has failed regardless of accuracy.",
      ],
      expectedBehaviour:
        "Rep finishes a visit → describes it in the chat → the assistant logs it and fills the form, highlighting what changed → rep corrects anything wrong in the form or by asking in chat. In the prototype the chat saves as soon as it understands the visit; the pilot version would hold it as a draft until the rep confirms.",
      northStar: "Rep-confirmed interactions per week (proposed) - not model accuracy, because an accurate model that reps don't use changes nothing.",
      supportingMetrics: ["Draft acceptance rate", "Note capture time", "Re-typing rate"],
      prioritization:
        "Everything was judged by expected rep time saved per visit. Manager dashboards, voice logging and offline sync were cut from the first version.",
      wireframes:
        "Form and chat side by side, so the rep always sees what the assistant changed. Highlighting AI-filled fields was the simplest way to make the draft inspectable.",
      prd:
        "Worked from the brief. The README documents each assistant tool: what it takes in, what it returns, and whether it calls an LLM.",
      prototype:
        "FastAPI and LangGraph backend with a Groq-hosted Llama model, React and Redux frontend, SQLite by default, tested on seeded sample HCP data.",
      finalSolution:
        "A LangGraph assistant that logs the visit from a plain-language description, an editable form that stays in sync with it, and a compliance check the rep can ask for.",
      reflection:
        "What I would do next is the part this build skipped: sit with a few reps, watch them log real visits, and measure how often they edit the draft versus re-type it. The first code change would be a real draft step: today the chat saves a visit immediately, and pressing Save on the form afterwards creates a second record. Until then, this is a well-reasoned prototype, not a validated product.",
      lessons: [
        "The review surface is the product. The same model behind a worse confirmation UI would earn less trust.",
        "Writing the kill condition before building kept the scope honest: anything that didn't help a rep confirm a draft faster was cut.",
      ],
    },
  },
  {
    slug: "credex-spend-audit",
    tier: "supporting",
    title: "Credex - AI Spend Audit",
    tagline: "An AI auditor that reads a company’s SaaS invoices and flags every dollar leaking out of the stack.",
    result: "Concept. Scoped to a forwardable CFO report rather than a dashboard.",
    tldr: [
      "An AI auditor that reads a company's SaaS invoices and flags spend leaking out of the stack: duplicate tools, unused seats, silent renewals.",
      "The north star is Dollars of Verified Savings Surfaced, because that is the number that earns a second conversation with a CFO.",
      "The decision that shaped v1 was refusing to build a dashboard. A report gets forwarded to a CFO and a dashboard does not, so the artifact is the growth loop.",
    ],
    role: "Product & AI Engineer",
    platform: "Web · LLM Pipelines",
    timeline: "2025",
    publishedAtISO: "2026-07-14",
    updatedAtISO: "2026-10-16",
    problem:
      "Companies waste an estimated 30% of their SaaS spend on unused seats, duplicated tools, and forgotten renewals - and nobody has time to audit line-by-line.",
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
        "The enterprise SaaS management category (Vendr, Zylo) works well for large companies. For teams too small for those platforms but too big for spreadsheets, there was nothing purpose-built. That gap had always existed - the new thing was that AI could now read and reconcile invoices without manual extraction.",
      targetUsers:
        "Ops leads, fractional CFOs, and finance managers at 50–500 person companies - people who know they're overspending but don't have the bandwidth to prove it line by line.",
      research:
        "I built this to a brief from Credex, so the research was desk research: how SaaS-management platforms such as Vendr and Zylo work, who they serve, and where smaller teams fall back to spreadsheets. I didn't run formal discovery calls. The insights below are hypotheses that a pilot with real ops leads would need to confirm.",
      insights: [
        "The blocker isn't insight - it's the effort to produce it. Everyone knows they're overpaying. Nobody has three hours to reconcile it.",
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
        "The central bet: that an ops lead would connect read-only integrations if the payoff was shown as a specific dollar number. People protect their data. Whether 'estimated savings' is compelling enough to get past that is untested. It's the first thing a pilot would have to prove.",
      successCriteria: [
        "Target: each audit surfaces a meaningful savings opportunity - enough that forwarding the report to a CFO feels worth doing.",
        "Target: most pilots who run a full audit convert to monthly monitoring without prompting.",
        "Kill condition: if the report doesn't get forwarded in the first week, the artifact isn't valuable enough to drive organic growth.",
      ],
      expectedBehaviour:
        "Connect integrations → run audit → get a ranked list of savings within 24 hours.",
      northStar: "Dollars of Verified Savings Surfaced - because this is the number that earns a second conversation with the CFO.",
      supportingMetrics: ["Audit Completion Rate", "Time to First Report", "Conversion to Monitoring"],
      prioritization:
        "Every feature was scored against 'does this add another verified savings line?' Everything else waited.",
      wireframes:
        "Report-first design from the start. I built what the report would look like before I built the pipeline that would generate it. The layout was designed to be forwarded - scannable in under two minutes, with a clear headline number.",
      prd:
        "One-page PRD per pipeline stage plus a shared savings-rubric doc. The rubric was the most debated artifact: what counts as a verified saving versus an estimate.",
      prototype:
        "Report-first: I worked through a sample reconciliation by hand and laid out the report in a spreadsheet before writing the pipeline, to see which numbers the report needed and which edge cases would break the matching.",
      finalSolution:
        "A read-only integration layer, an LLM-assisted reconciler, and a report designed to be forwarded to a CFO.",
      reflection:
        "The decision I'm most confident about: not building a dashboard for v1. The report is what gets forwarded to a CFO. A dashboard doesn't get forwarded. The artifact is the growth loop, not the app.",
      lessons: [
        "For B2B AI, the artifact matters more than the app. If the output is worth forwarding, you have distribution.",
        "Working the process by hand before automating it was the most valuable part of this project. The manual version showed which edge cases mattered and which didn't.",
      ],
    },
  },
];

export const archivedProjects: ArchiveProject[] = [
  {
    slug: "digital-heroes-golf",
    title: "Digital Heroes Golf",
    tag: "Prototype",
    problem:
      "Prototype subscription golf platform: a rolling five-score index computed in the database, weighted prize draws, and Razorpay in test mode.",
    stack: ["Next.js 16", "Tailwind v4", "Supabase", "Razorpay (test mode)"],
    metric: "Test-mode prototype",
    year: "2025",
    links: [{ label: "Live", url: "https://golfheros.vercel.app/" }],
  },
  {
    slug: "hyperliquid-trader-analysis",
    title: "Hyperliquid Trader Analysis",
    tag: "Data science",
    problem:
      "Analysis of 211,000+ Hyperliquid trade records against the BTC Fear & Greed Index - surfacing market-regime edges and trader-performance patterns.",
    stack: ["Python", "Pandas", "Jupyter", "Matplotlib"],
    metric: "211K+ records",
    year: "2025",
    links: [
      { label: "GitHub", url: "https://github.com/Aryanpanwar10005/primetrade.ai" },
    ],
  },
  {
    slug: "wireless-ev-charging",
    title: "Wireless EV Charging Prototype",
    tag: "Published · JETIR",
    problem:
      "IPT-based wireless EV charging prototype with dual-spot parking management. 1st place at the college branch expo; written up as a co-authored paper in JETIR.",
    stack: ["C++", "Arduino", "Power Electronics", "IPT"],
    metric: "1st place, branch expo",
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
      "Beginner 4-DOF servo arm on Arduino, driven by serial commands or push buttons.",
    stack: ["C++", "Arduino", "Servo Motors"],
    metric: "4 DOF",
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
      "IR sensors at both ends switch the lights on, and a timer switches them off, so the stairs are never left lit.",
    stack: ["C++", "Arduino", "IR Sensors"],
    metric: "Auto-off timer",
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