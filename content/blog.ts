const coverDiscovery = '/assets/blog/fitwardrobe-discovery.webp'
const coverEngineerToPm = '/assets/blog/engineer-to-pm.webp'
const coverPrioritize = '/assets/blog/prioritize-features.webp'
const coverMetrics = '/assets/blog/success-metrics.webp'
const coverFeaturesRemoved = '/assets/blog/features-removed.webp'
const coverLocalVsCloud = '/assets/blog/local-vs-cloud-ai.webp'
const coverAiTrust = '/assets/blog/ai-trust.webp'
const coverEngToProduct = '/assets/blog/engineering-to-product.webp'
const coverToolkit = '/assets/blog/product-toolkit.webp'
const coverRestart = '/assets/blog/restart-fitwardrobe.webp'
const coverDoubleClick = '/assets/blog/double-click-test-v2.webp'

export type SectionLabel = string

export type BodyBlock =
  | { type: 'p'; text: string }
  | { type: 'quote'; text: string }
  | { type: 'list'; items: string[] }

export type BlogCategory =
  | 'Discovery'
  | 'Career'
  | 'Prioritization'
  | 'Metrics'
  | 'AI Product'
  | 'Frameworks'
  | 'Reflection'

export type BlogPost = {
  slug: string
  title: string
  /** Search-result title when the on-page title is too long or misses the searched wording. */
  seoTitle?: string
  question: string
  takeaway: string
  summary: string
  category: BlogCategory
  tags: string[]
  readingTime: string
  publishedAt: string
  publishedAtISO: string
  /** Date of the last significant content edit (not typo fixes). Feeds dateModified and the sitemap. */
  updatedAtISO?: string
  cover: string
  coverAlt: string
  takeaways: string[]
  sections: { label: SectionLabel; body: BodyBlock[] }[]
  relatedCaseStudies?: string[]
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'double-click-test-ai-agent-payments',
    title: 'The Double-Click Test: The Requirement Every AI Agent That Pays Needs',
    seoTitle: 'Idempotency for AI Agents That Pay: A PM Checklist',
    question: 'What should a spec say before an AI agent can pay?',
    takeaway: 'He writes the boring requirement that stops duplicate payments before anyone writes a prompt.',
    summary:
      'A double-click created two donations in a system my team built. An AI agent paying over UPI can repeat that on every retry. The fix, and six spec questions.',
    category: 'AI Product',
    tags: ['AI Product', 'Agentic AI', 'Requirements', 'Acceptance Criteria', 'Payments'],
    readingTime: '4 min read',
    publishedAt: 'Oct 25, 2026',
    publishedAtISO: '2026-10-25',
    cover: coverDoubleClick,
    coverAlt: 'Illustration: a phone lock screen showing four identical ₹500 payment notifications, three of them marked retry',
    takeaways: [
      'Duplicate records usually trace back to a missing rule about what counts as the same request.',
      'People repeat a request by accident; many agents retry automatically whenever a call times out.',
      'One acceptance criterion covers both: given the same request twice, the system creates one record, not two.',
    ],
    sections: [
      {
        label: 'The bug',
        body: [
          { type: 'p', text: 'This came from an internal build challenge. Five of us built a donation and volunteer system on Salesforce for a fictional nonprofit, and I was the BA and team lead. Before the demo we wrote 107 test cases and fixed 9 real bugs.' },
          { type: 'p', text: 'The worst one looked small. On a slow connection, a donor clicks "Donate", nothing seems to happen, so they click again. Each click created a new gift and a new supporter, so every report built on that data would have counted the same donation twice.' },
        ],
      },
      {
        label: 'Why agents make it worse',
        body: [
          { type: 'p', text: 'A person double-clicks by accident, once. An [agent](/writing/agentic-ai-vs-ml) repeats a request on purpose. When a payment call times out, many agents simply try again, because from where they sit the first attempt might have failed. Sometimes it did. Often the payment went through and only the reply got lost.' },
          { type: 'p', text: 'Without a guard, every retry is another double-click, at machine speed, with nobody watching the screen.' },
          { type: 'p', text: 'For Indian users this is close. [UPI payments inside ChatGPT](https://www.onmanorama.com/news/business/2025/10/09/npci-razorpay-openai-chatgpt-payments.html) went into pilot in October 2025 with NPCI and Razorpay, starting with groceries. In September 2026, Reuters reported that [NPCI is working on a framework](https://inc42.com/buzz/npci-to-launch-agentic-payments-on-upi-report/) that would let agents make small payments without the user approving each one.' },
        ],
      },
      {
        label: 'The acceptance criterion we added',
        body: [
          { type: 'quote', text: 'Given the same request twice, the system creates one record, not two.' },
          { type: 'p', text: 'It reads like the most boring line in the spec, and it worked. It also forced the two questions that mattered: what makes two requests "the same", and what the donor should see the second time.' },
        ],
      },
      {
        label: 'Idempotency in plain words',
        body: [
          { type: 'p', text: 'Engineers call this idempotency: doing something twice has the same effect as doing it once. Pressing the lift button five times still brings one lift.' },
          { type: 'p', text: 'The usual way to build it is an idempotency key. The app attaches a unique ID to each request. The server remembers the IDs it has already handled, and when the same ID arrives again it returns the first result instead of doing the work again. Payment APIs such as [Stripe](https://docs.stripe.com/api/idempotent_requests) accept a key like this on payment requests.' },
          { type: 'p', text: 'As a BA or PM you do not need to pick the mechanism. You need to write down that it must exist, and what counts as a repeat.' },
        ],
      },
      {
        label: 'What it looks like in a spec',
        body: [
          { type: 'p', text: 'An example for an agent that pays a donation over UPI, written as acceptance criteria:' },
          {
            type: 'list',
            items: [
              'Given the agent sends a payment with key K, when the call times out and the agent retries with the same key K, then the donor is charged once and the agent gets the original result.',
              'Given two payments with different keys but the same payee and amount within 60 seconds, when the second arrives, then the system asks the donor to confirm before paying.',
              'Given a repeat is blocked, when the donor checks the app, then they see "Already paid ₹500 at 8:30" instead of an error.',
            ],
          },
        ],
      },
      {
        label: 'Six questions I would put in the spec for an agent that can pay',
        body: [
          {
            type: 'list',
            items: [
              'What makes two requests the same? The same key, payee and amount, within what time window?',
              'When a call times out, does the agent check the payment status before it retries?',
              'How many retries are allowed, and how far apart?',
              'What is the limit per payment and per day, and who set it: the user or the product?',
              'What does the user see when a repeat is blocked, so they do not try again by hand?',
              'Where is every attempt logged, and who can reverse a duplicate if one gets through?',
            ],
          },
        ],
      },
      {
        label: 'What I am taking from it',
        body: [
          { type: 'p', text: 'In that build challenge, finding the rules nobody had written down took more of my time than the screens did. Agents raise the stakes on those rules: an agent follows the spec exactly, and where the spec is silent it repeats the same mistake quickly.' },
          { type: 'p', text: 'If I were writing the spec for an agent that can pay, the double-click test would go in before any prompt.' },
        ],
      },
    ],
  },
  {
    slug: "fitwardrobe-product-discovery",
    title: "What Building FitWardrobe Taught Me About Product Discovery",
    question: "How do I discover the right problem?",
    takeaway: "He starts with the user's moment, not the feature.",
    summary:
      "FitWardrobe started as an image-tagging idea. It became a product idea only when I stopped thinking about what the model could recognise and started asking friends when getting dressed actually goes wrong.",
    category: "Discovery",
    tags: ["Discovery", "User Research", "MVP", "FitWardrobe", "AI Product"],
    readingTime: "4 min read",
    publishedAt: "Aug 4, 2026",
    publishedAtISO: "2026-08-04",
    updatedAtISO: "2026-11-16",
    cover: coverDiscovery,
    coverAlt: "Editorial illustration: hangers behind a magnifying lens on deep-wine background",
    takeaways: [
      "The clever technical part, tagging clothes from a photo, was never the product. Getting dressed for a specific moment was.",
      "A handful of informal chats with friends changed the plan more than weeks of building would have.",
      "The version I'm building now does less than my first spec, on purpose.",
    ],
    sections: [
      {
        label: "How it started",
        body: [
          { type: 'p', text: "FitWardrobe began with a technical idea: take a photo of a shirt and have the app tag it with type, colour and season. Image models had become good enough that this felt like a product. It wasn't. It was a capability." },
          { type: 'p', text: "When I described it to friends, the reaction was polite interest and nothing more. Nobody asked when they could use it." },
        ],
      },
      {
        label: "What I got wrong first",
        body: [
          { type: 'p', text: "Tagging tells you a shirt is a shirt. It doesn't tell you what to wear to an interview on Thursday. I had a capability and was calling it a product." },
          { type: 'p', text: "The pain people describe at 8 a.m. isn't \"I don't know what this garment is.\" It's \"I don't remember everything I own, and I can't work out what goes together for today.\" My first idea answered a question nobody was asking." },
          { type: 'p', text: "Surveys point at the same problem. A Marks & Spencer survey, several years old and of women only, put the time spent choosing a weekday outfit at about 17 minutes. I treat that as a signal rather than a fact about everyone: the problem is memory and combinations, not a lack of clothes." },
        ],
      },
      {
        label: "Talking before building",
        body: [
          { type: 'p', text: "So I talked to friends instead of building. Nothing formal: one question, \"walk me through the last time you couldn't decide what to wear\", and no app on the table." },
          { type: 'p', text: "The same things kept coming up: a specific event (an interview, a wedding, a trip), a safe outfit people fall back on when they're tired, and clothes they had forgotten they owned. Nobody said they wanted their phone to identify a garment." },
          { type: 'p', text: "These were informal chats with people I know, so they give me a starting hypothesis, not research I'd defend in a review. They were still enough to change the plan." },
        ],
      },
      {
        label: "The uncomfortable choice",
        body: [
          { type: 'p', text: "I had two products in front of me. One kept tagging as the hero and added outfits on top, which protected the work I'd already pictured. The other made tagging a silent helper and put one question first: what should I wear for this?" },
          { type: 'p', text: "I chose the second. Adding clothes became a one-time step, by photo or by sharing a shop link, and the main screen became an occasion picker: work, interview, date, wedding or party, travel, gym, everyday. Each outfit comes with one or two alternatives and a reason." },
        ],
      },
      {
        label: "Where it stands",
        body: [
          { type: 'p', text: "FitWardrobe is still pre-launch, so I don't have retention numbers, and I won't invent any. The first real test is whether people accept one outfit and a couple of alternatives instead of an endless scroll." },
          { type: 'p', text: "What I can measure today is demand. The FitWardrobe site earned about 20,800 Google impressions and 315 clicks in the six months to September 2026, with no ads. People are searching for help with this problem. That's a reason to build, not proof the build works." },
        ],
      },
      {
        label: "What I'm still figuring out",
        body: [
          { type: 'p', text: "The mistake I keep re-learning is falling for my own cleverness. Where the model runs and how it tags clothes are implementation details. People care whether the outfit is right for the moment, and whether adding their clothes felt like homework." },
          { type: 'p', text: "I still open editors too fast. Pausing to talk before building was the most useful thing I did on this project, and I had to make myself do it." },
        ],
      },
    ],
    relatedCaseStudies: ['fitwardrobe'],
  },
  {
    slug: 'stopped-thinking-like-engineer',
    title: "I Stopped Thinking Like an Engineer. Here's What Changed.",
    question: 'How did my mindset evolve from builder to PM?',
    takeaway: 'He understands the PM mindset shift.',
    summary:
      'The moment my technical instinct stopped being an asset and started being a tax - and the three questions I now ask before I let myself open a code editor.',
    category: 'Career',
    tags: ['PM Mindset', 'Career', 'Engineering to PM'],
    readingTime: '6 min read',
    publishedAt: 'Aug 7, 2026',
    publishedAtISO: '2026-08-07',
    updatedAtISO: '2026-10-18',
    cover: coverEngineerToPm,
    coverAlt: 'Editorial illustration: brain split between circuits and organic curves',
    takeaways: [
      'Engineering rewards building the right thing well. PM rewards deciding what "the right thing" even is.',
      'The habit that broke me: reaching for the editor before I could name the user, the metric, and the risk.',
      'A three-question check I now run before greenlighting any of my own ideas.',
    ],
    sections: [
      {
        label: 'The habit that kept breaking things',
        body: [
          { type: 'p', text: "I trained as an engineer. For four years, being useful meant shipping code. When I started scoping products end-to-end - Mithivoices, the CRM, FitWardrobe - my instinct was still to open an editor within an hour of hearing an idea. That instinct kept betraying me." },
        ],
      },
      {
        label: 'Mithivoices, or: what I built first',
        body: [
          { type: 'p', text: "On Mithivoices I built the whole voice loop first - speech-to-text, a language model, text-to-speech, a voice library, even sign-in and billing screens - before I had a single answer to 'who needs a voice assistant that runs on their own machine, and what breaks in their week because they don\'t have one?' The pipeline worked. Nobody I could name was waiting for it." },
          { type: 'p', text: "The engineering mindset - 'I can build this, therefore I should' - is a superpower when the problem is well-defined and a liability when it isn\'t. Most product problems aren't." },
        ],
      },
      {
        label: 'Two things that actually landed',
        body: [
          { type: 'p', text: "I read a lot of PM writing that felt hollow - vague talk about 'customer obsession' without a description of the muscle involved. Two things landed. First: Marty Cagan's framing of discovery and delivery as two different jobs, not two phases of the same job. Second: watching senior PMs reject strong technical answers in interviews because the candidate had skipped the user entirely." },
          { type: 'p', text: 'Neither gave me a framework. Both told me a habit was missing.' },
        ],
      },
      {
        label: 'The three questions',
        body: [
          { type: 'p', text: "I made a rule: before I open any editor or design tool, I write down three answers in a single paragraph. Who is this for, in a way I could point at? What behaviour would change in their week if this worked? What is the single riskiest assumption I'm about to make?" },
          { type: 'p', text: "If I can't finish that paragraph in ten minutes, the idea isn't ready. The editor stays closed." },
          { type: 'p', text: "Roughly half the ideas I would have coded never got past this check. The other half shipped faster and with sharper scope, because the constraints were already written down." },
        ],
      },
      {
        label: 'What changed',
        body: [
          { type: 'p', text: "I said no to myself earlier, which is cheaper than saying no to a team later. I threw away less work. And counterintuitively, my technical background became more useful, not less - once I stopped defaulting to 'can I build this?', I could use engineering intuition where it actually paid: spotting when a plan hid a hard latency problem, or when a 'simple' AI feature was one prompt away from an unbounded eval nightmare." },
        ],
      },
      {
        label: 'What I still get wrong',
        body: [
          { type: 'p', text: "I still build too fast sometimes. The habit is maybe two-thirds formed. What's different now is that I notice it happening - usually around the second hour of writing code for something I haven't validated yet. That awareness doesn't always stop me. But it means the damage is smaller." },
          { type: 'p', text: "The shift wasn't 'stop being technical.' It was 'stop leading with the part of the work I enjoy.' Those are very different instructions." },
        ],
      },
    ],
    relatedCaseStudies: ['mithivoices'],
  },
  {
    slug: 'prioritize-features-before-prd',
    title: 'How to Prioritize Product Features Before Writing a PRD',
    question: 'How do I decide what gets built?',
    takeaway: "He doesn't build everything.",
    summary:
      'The one-page pre-PRD I run before any spec - and why the "must-have" column is the one that decides whether the product ships on time.',
    category: 'Prioritization',
    tags: ['Prioritization', 'PRD', 'RICE', 'Trade-offs', 'Scope'],
    readingTime: '6 min read',
    publishedAt: 'Jul 14, 2026',
    publishedAtISO: '2026-07-14',
    updatedAtISO: '2026-10-18',
    cover: coverPrioritize,
    coverAlt: 'Editorial illustration: stack of index cards with one lifted priority card',
    takeaways: [
      'RICE is fine, but the number it produces is less useful than the argument it forces.',
      '"Must-have" without a specific user commitment is decoration.',
      'The features I cut before the PRD save more time than every optimization I add after.',
    ],
    sections: [
      {
        label: 'Twenty-odd features',
        body: [
          { type: 'p', text: "On the AI-First CRM prototype for pharma reps, I could list around twenty features before writing any code - voice logging, offline sync, physician deduping, compliance flags, an assistant, an audit trail, and more. Every one was defensible in isolation. I had a short, fixed build window and could not build all of them." },
          { type: 'p', text: "Compliance was the interesting one. In a regulated field it sounds mandatory, so it went on the list without a question. When I asked what it actually had to do in a first version, the answer was small: one hard rule (a cap on in-person meetings per doctor per month) that the rep can check in chat, and a confirmation the rep ticks before the form saves. That is what I built. Everything bigger waited." },
        ],
      },
      {
        label: 'The confidence column problem',
        body: [
          { type: 'p', text: "Prioritization frameworks are easy to name and hard to actually use. RICE gives you a spreadsheet. It does not tell you which cells were guesses and which were evidence. Left alone, the framework rewards whoever writes the confidence column with the most nerve." },
          { type: 'p', text: "I wanted a habit that made the disagreement visible before it made it into the PRD." },
        ],
      },
      {
        label: 'What actually changed how I worked',
        body: [
          { type: 'p', text: "Shape Up changed what I did in practice. Specifically the 'appetite' concept - you decide how much time something is worth before you estimate it. That reordering sounds small. It isn't. It forces a scope conversation instead of an estimate, which is a completely different meeting." },
          { type: 'p', text: "I also kept the discipline of writing a number from RICE - not for precision, but for commitment. Writing down an estimate forces you to have an opinion, which is the thing most feature discussions are quietly avoiding." },
        ],
      },
      {
        label: 'The pre-PRD',
        body: [
          { type: 'p', text: "I now run a one-page check before I open the PRD template. Four columns for every candidate feature." },
          { type: 'list', items: [
            "User commitment: the specific behaviour I'm asking a user to change or adopt. If I can't name it, the feature is cut.",
            'Evidence class: what I actually know - interview quote, analytics, competitor benchmark, or hunch. Hunches are allowed, but they get labelled honestly.',
            'Appetite: time the feature is worth, decided before we estimate. If the estimate exceeds appetite, we shrink scope, not schedule.',
            'Kill signal: the metric or observation that would make me drop it after launch.',
          ]},
          { type: 'p', text: "The kill signal column came later. I didn't start with it. I added it when I noticed that several items on my list had no condition under which I would ever drop them." },
          { type: 'p', text: "On the CRM, that page cut the list to a handful before I wrote the plan: logging by form or by chat with the two kept in sync, an editable form so every AI suggestion can be corrected, the compliance check, and a few helper tools such as an HCP profile lookup. Voice logging and offline sync were the painful cuts." },
        ],
      },
      {
        label: 'What I built',
        body: [
          { type: 'p', text: "The prototype has those features and nothing else. It has not been in front of real reps yet, so the next evidence has to come from a pilot, and the kill signals on the pre-PRD page are what I would watch first. The metric I care about stays the same: not a perfect roadmap, but no regrettable builds." },
        ],
      },
      {
        label: 'Where I still fail at this',
        body: [
          { type: 'p', text: "The hardest habit is being honest in the evidence column when I'm the one who wants the feature. I still catch myself inflating a hunch to 'preliminary research.' The mitigation is a peer: I ask an engineer or a fellow builder to read the page and only comment on the evidence column. It takes fifteen minutes and saves weeks." },
          { type: 'p', text: "If I started the CRM again, I'd write the pre-PRD on day one instead of after drafting the list. The list of twenty-odd features was itself a symptom - a sign I had collected every idea without weighing any of them." },
        ],
      },
    ],
    relatedCaseStudies: ['ai-first-crm-hcp'],
  },
  {
    slug: "success-metrics-before-features",
    title: "Why Every Product Needs Success Metrics Before Features",
    question: "How do I know a feature is successful?",
    takeaway: "He thinks in outcomes.",
    summary:
      "Writing the success metric for Credex's 'share this report' feature before building it, and the two-column table I now put at the top of every spec.",
    category: "Metrics",
    tags: ["Metrics", "North Star", "KPIs", "Outcomes", "Credex"],
    readingTime: "3 min read",
    publishedAt: "Jul 21, 2026",
    publishedAtISO: "2026-07-21",
    updatedAtISO: "2026-11-16",
    cover: coverMetrics,
    coverAlt: "Editorial illustration: bullseye target with an upward gold arrow",
    takeaways: [
      "A feature without a success metric is a feature that can't be paused.",
      "The metric belongs in the spec, not the retro. Metrics invented after launch tend to defend the outcome.",
      "Two numbers beat one: an outcome metric and a guardrail. One tells you if it worked; the other tells you what you broke.",
    ],
    sections: [
      {
        label: "The feature that looked obvious",
        body: [
          { type: 'p', text: "Credex is a spend-audit concept I built to a brief: connect your SaaS subscriptions and it flags overlap and savings, then produces a report. The core idea is that the report gets forwarded to a CFO. So a 'share this report' button looked like the most obvious feature on the list." },
          { type: 'p', text: "I nearly put it on the roadmap before I could say what it was for. That's the problem this post is about." },
        ],
      },
      {
        label: "The sentence I couldn't finish",
        body: [
          { type: 'p', text: "Before scoping it, I tried to finish one sentence: \"we'll know this worked if…\". I couldn't. I was about to build something I had no way to evaluate." },
          { type: 'p', text: "Without a success metric, 'worked' gets defined by whoever needed the feature to have worked. Usually that's the person who built it, a few weeks later, defending the build." },
        ],
      },
      {
        label: "Two different features wearing the same name",
        body: [
          { type: 'p', text: "I looked at the number I actually cared about, audits completed, and asked what a share feature was supposed to move. There were two candidates: more reports created by the teammates someone shares with, or more return visits from the person who shared. Those are two different products." },
          { type: 'p', text: "That was the moment the feature stopped being obvious. It had been carrying two jobs under one name." },
        ],
      },
      {
        label: "The two-column table",
        body: [
          { type: 'p', text: "I picked the first outcome, teammate-created reports, because it maps to the north star (audits completed per week). Then I wrote it into the spec as a two-column table: outcome metric on the left, guardrail on the right." },
          { type: 'list', items: [
            "Outcome: a meaningful increase in weekly reports created through a share link, measured three weeks after launch.",
            "Guardrail: no drop in report completion rate. If people share half-finished audits and never come back, the product feels worse.",
            "Kill decision: if the outcome misses and the guardrail regresses, the feature comes out. No debate.",
          ]},
          { type: 'p', text: "The guardrail is the part I'd expect a team to argue about, because 'no drop' can feel too strict. I'd still hold it for a first version. It's easier to relax a guardrail with data than to add one after the damage." },
        ],
      },
      {
        label: "What this is and isn't",
        body: [
          { type: 'p', text: "Credex is a concept, so this spec hasn't met real users and I have no launch data to report. What it gave me is a feature that can be tested instead of a feature that feels good, plus a clear follow-up question: if sharing works, where does the loop leak? My guess is the moment a recipient opens a report and has to start their own audit from scratch." },
        ],
      },
      {
        label: "The trade-off I still watch",
        body: [
          { type: 'p', text: "Defining a metric feels like tempting fate. If you don't name a number, nothing fails. That comfort is exactly why teams under-ship on outcomes." },
          { type: 'p', text: "I still find the conversation uncomfortable when it's a feature I want to build. The table doesn't fix that; it makes the discomfort visible, which is different. On any new product, it's the first block in the PRD, above the problem statement." },
        ],
      },
    ],
    relatedCaseStudies: ["credex-spend-audit"],
  },
  {
    slug: "features-removed-fitwardrobe",
    title: "The Features I Cut From FitWardrobe Before Launch",
    question: "Can I say \"no\"?",
    takeaway: "He understands prioritization.",
    summary:
      "The features I've cut from FitWardrobe's first version before anyone used it, and what each cut taught me about the difference between a capability and a product.",
    category: "Prioritization",
    tags: ["Prioritization", "Say No", "FitWardrobe", "Simplicity"],
    readingTime: "3 min read",
    publishedAt: "Jul 24, 2026",
    publishedAtISO: "2026-07-24",
    updatedAtISO: "2026-11-16",
    cover: coverFeaturesRemoved,
    coverAlt: "Editorial illustration: sculptor carving away pieces from a form",
    takeaways: [
      "Every feature that stays costs support, attention and roadmap space. Cutting one is progress.",
      "The feature I liked most on paper was the one most likely to confuse people.",
      "Saying no before launch is cheaper than saying no after. It's still the same job.",
    ],
    sections: [
      {
        label: "From six surfaces to three",
        body: [
          { type: 'p', text: "My early plan for FitWardrobe had six top-level surfaces. The version I'm building for launch has three: add your clothes, pick the occasion, get the outfit. This note covers what I cut and why, before any user has seen it." },
        ],
      },
      {
        label: "Impressive but not useful",
        body: [
          { type: 'p', text: "Several ideas would have made the app look capable without making it more useful: a manual outfit builder, a style score that grades each look, and a colour-palette tool. Each is reasonable on its own. Together they're three answers to a question people would ask once." },
          { type: 'p', text: "A pattern I've learned to watch for: when a product gets more impressive, people often take longer to do less." },
        ],
      },
      {
        label: "The test I used",
        body: [
          { type: 'p', text: "For each feature I asked one question: does this help someone get dressed for the moment in front of them? If the honest answer was \"sometimes, for some people\", it didn't make the first version." },
          { type: 'p', text: "I also showed early screens to a few friends. Their attention went straight to the outfit suggestion. Nobody went looking for tools to build or score an outfit themselves." },
        ],
      },
      {
        label: "What I cut and why",
        body: [
          { type: 'list', items: [
            "Manual outfit builder: cut. People come to be told what to wear, not to assemble outfits.",
            "Style score: cut. Grading someone's clothes is a quick way to lose them.",
            "Colour-palette tool: folded into the outfit logic as an input, not a separate tab.",
            "Social feed and shopping: not in the first version. Both pull attention away from the clothes people already own.",
          ]},
        ],
      },
      {
        label: "What I'll check after launch",
        body: [
          { type: 'p', text: "These are decisions made before launch, so they're bets. After launch I'll watch two things: whether people ask for the missing pieces, and whether the kept-outfit rate holds up without them. If people keep asking for the outfit builder, I was wrong about it, and it comes back." },
        ],
      },
      {
        label: "The pattern I keep watching for",
        body: [
          { type: 'p', text: "The feature I'm proudest of is often the one hiding the feature that does the work. My taste is a lagging indicator; what people actually do is the real one. Before launch, the closest I can get is watching where their attention goes when they see the screens." },
        ],
      },
    ],
    relatedCaseStudies: ['fitwardrobe'],
  },
  {
    slug: "local-vs-cloud-ai-fitwardrobe",
    title: "Local AI vs Cloud AI: Decisions Behind FitWardrobe",
    question: "How do I make AI product decisions?",
    takeaway: "He treats where the model runs as a product decision.",
    summary:
      "Why FitWardrobe sends photos to a cloud model but keeps the wardrobe itself on the phone: the trade-off table, and the risks that came with the choice.",
    category: "AI Product",
    tags: ["AI Product", "On-Device AI", "Trade-offs", "Privacy", "FitWardrobe"],
    readingTime: "3 min read",
    publishedAt: "Jul 28, 2026",
    publishedAtISO: "2026-07-28",
    updatedAtISO: "2026-11-16",
    cover: coverLocalVsCloud,
    coverAlt: "Editorial illustration: phone and cloud connected by a balance line",
    takeaways: [
      "Where the model runs is a product decision: which failures users can live with, and which ones break trust.",
      "I split it: cloud AI for tagging and styling, with the wardrobe stored on the device.",
      "The cloud's bad day isn't only an outage. It's a model being retired or a provider changing its terms.",
    ],
    sections: [
      {
        label: "Two real options",
        body: [
          { type: 'p', text: "FitWardrobe has to tag clothes from photos and then put outfits together. I had two broad options: run a small model on the phone, or call a larger model in the cloud. Neither is a moral position. Both have real costs." },
        ],
      },
      {
        label: "The four axes",
        body: [
          { type: 'p', text: "I compared them on four things, quality, latency, privacy and cost, plus one extra question I now ask about every AI feature: what happens on a bad day?" },
        ],
      },
      {
        label: "What I chose",
        body: [
          { type: 'p', text: "Cloud for the AI, the phone for the data." },
          { type: 'list', items: [
            "Quality: the cloud wins clearly. A large hosted vision model (Gemini) tags garments far better than anything I could ship on a phone as a solo builder, and putting outfits together needs a capable LLM (I use one via Groq).",
            "Latency: on-device would be faster. I accepted the network round trip, because a wrong outfit costs more than a slower one.",
            "Privacy: the wardrobe itself, meaning photos, items and outfits, is stored on the phone. Images go to the model for analysis. That's the honest line, and it's the one the product copy uses.",
            "Cost: hosted models charge per call. Early on that's small; at scale it becomes a pricing question.",
          ]},
        ],
      },
      {
        label: "The bad day",
        body: [
          { type: 'p', text: "The bad day I should have worried about with cloud AI wasn't an outage. It was providers retiring models. Google shut down gemini-2.0-flash in June 2026, and Groq retired its Llama 3 models between 2025 and 2026. An app pinned to one model ID simply stops working. So the model is now a setting I can change, not something baked into the app." },
          { type: 'p', text: "The other risk is terms. On the Gemini API's free tier, Google may use and review submitted content, and only the paid tier may serve users in the UK, the EU and Switzerland. That's a launch requirement for those markets, and it sits on the pre-launch checklist." },
        ],
      },
      {
        label: "Why the wording matters",
        body: [
          { type: 'p', text: "\"Your wardrobe is stored on your phone\" is true. \"The AI runs on your phone\" is not. The difference matters most to exactly the people who care about privacy, so the copy has to get it right." },
          { type: 'p', text: "Correction: an earlier version of this post said FitWardrobe runs its model on the phone. It doesn't. The AI runs in the cloud and the wardrobe is stored on the device." },
        ],
      },
      {
        label: "What I'd do on the next AI product",
        body: [
          { type: 'p', text: "Run the four axes on day one, before choosing a model, and add the bad-day question for each provider: what happens if this model disappears or the terms change? The argument you have while answering it is where the product decision lives." },
        ],
      },
    ],
    relatedCaseStudies: ['fitwardrobe'],
  },
  {
    slug: 'building-ai-features-users-trust',
    title: 'Building AI Features Users Actually Trust',
    question: 'How do I reduce user uncertainty in AI features?',
    takeaway: 'He thinks beyond the model.',
    summary:
      'Trust is a product surface, not a model property. Design notes from an AI-first CRM prototype: the four things I would add before asking a rep to rely on it.',
    category: 'AI Product',
    tags: ['AI Product', 'Trust', 'UX', 'Hallucinations', 'Explainability'],
    readingTime: '5 min read',
    publishedAt: 'Jul 17, 2026',
    publishedAtISO: '2026-07-17',
    updatedAtISO: '2026-10-18',
    cover: coverAiTrust,
    coverAlt: 'Editorial illustration: two hands meeting with a glowing node between them',
    takeaways: [
      'Trust is built by the surface, not the model. The same model behind a different UI earns a different level of trust.',
      'Showing where each logged field came from does more for trust than a few more points of accuracy.',
      'A confident wrong answer is worse than an honest uncertain one. Product surfaces have to make that choice explicit.',
    ],
    sections: [
      {
        label: 'Working is not the same as trusted',
        body: [
          { type: 'p', text: "The AI-First CRM prototype lets a pharma rep log a doctor visit by describing it in a chat instead of filling a form, and the form fills itself as the chat goes. A LangGraph pipeline does the extraction. On sample data, it works. But a logging tool can work and still not be trusted, and an untrusted one gets used as an expensive typewriter: the rep drafts with the assistant, then re-types everything into the form anyway." },
        ],
      },
      {
        label: 'Mostly right is not a promise',
        body: [
          { type: 'p', text: "Reps in a regulated industry cannot afford to log wrong information - a mis-classified interaction can breach compliance. A model that is right most of the time still leaves the rep with the job of finding the times it isn't. 'Mostly right' is not a promise a rep can carry into an audit." },
        ],
      },
      {
        label: 'What the prototype already does',
        body: [
          { type: 'p', text: "Two things in the build are trust features, even though I didn't call them that while building. Every field the chat fills in is highlighted for a moment, so the rep can see exactly what changed. And the form stays editable, so any value the assistant fills in can be corrected. The gap: the chat saves a visit as soon as it understands it, so the review comes after the save, not before. A compliance confirmation has to be ticked before the form saves. That is a start, not a trust surface." },
        ],
      },
      {
        label: 'Four things I would add before a pilot',
        body: [
          { type: 'p', text: "None of these needs a better model." },
          { type: 'list', items: [
            'Read-back: after each turn, the assistant echoes what it heard in structured form before saving. One extra tap. Zero ambiguity.',
            'Source pinning: every logged field shows the exact words it came from. Trust is easier when the receipt is visible.',
            'Uncertainty as UI: confidence below a threshold shows as a yellow "confirm?" badge, not a hidden score.',
            'Reversible commit: every save gets a short undo without leaving the screen. Small, but it lowers the emotional cost of trying.',
          ] },
        ],
      },
      {
        label: 'How I would know it worked',
        body: [
          { type: 'p', text: "The number to watch is not model accuracy. It is re-typing: how often a rep edits the draft versus entering the same information again by hand. If re-typing stays high after these four are in place, the surface has failed, however accurate the model is." },
          { type: 'p', text: "The second signal is what people complain about. Complaints about checking what got saved mean trust is still the problem. Requests for new interaction types mean the product has moved past it." },
        ],
      },
      {
        label: 'The balance point',
        body: [
          { type: 'p', text: "The tempting mistake is optimising the wrong number: weeks spent on a few accuracy points the user never notices, when a read-back screen is a day of work." },
          { type: 'p', text: "The trade-off I still watch: friction added for trust can become friction added for its own sake. The read-back is one extra tap, worth it. If I added a second confirmation on top, I'd be paying for safety I didn't need with adoption I couldn't afford. That balance point has to be checked with real users, not felt." },
          { type: 'p', text: "The same failure mode - optimising the wrong thing because the metric isn't defined - is what led me to build [SEO-GEO Optimizer](/case-studies/seo-geo-optimizer). AI IDEs were optimising for SEO signals that Google deprecated in March 2024, because nobody had defined the right success criterion for them." },
        ],
      },
    ],
    relatedCaseStudies: ['ai-first-crm-hcp'],
  },
  {
    slug: 'engineering-to-product-thinking',
    title: 'From Engineering Projects to Product Thinking',
    question: 'How did my engineering work influence my PM approach?',
    takeaway: 'His technical background supports his product thinking.',
    summary:
      'A JETIR-published EV-charging prototype and an ESP32 robot taught me more about product management than any framework - because both had physical failure modes that could not be argued with.',
    category: 'Career',
    tags: ['Career', 'Systems Thinking', 'Hardware', 'JETIR', 'Engineering to PM'],
    readingTime: '6 min read',
    publishedAt: 'Jul 31, 2026',
    publishedAtISO: '2026-07-31',
    updatedAtISO: '2026-10-18',
    cover: coverEngToProduct,
    coverAlt: 'Editorial illustration: gears transforming into a lightbulb',
    takeaways: [
      "Hardware forces you to ship one thing that works, not five things that might.",
      'Peer review taught me to write for a reader who is looking for reasons to reject.',
      'Every constraint I hit - power, latency, weight, bandwidth - showed up later in a software product wearing different clothes.',
    ],
    sections: [
      {
        label: 'Before I knew what a PRD was',
        body: [
          { type: 'p', text: "Before I ever wrote a PRD, I built a wireless EV-charging prototype using inductive power transfer. It won the branch expo and was published in JETIR. Around the same time, I shipped an autonomous ESP32 robot with GPS tracking and live video. The EV paper was accepted. I don't think I read it after it went up - I was already on to the next thing, which is either a healthy instinct or a bad habit. I've gone back and forth on it." },
        ],
      },
      {
        label: "The rubric that doesn't punish over-scope",
        body: [
          { type: 'p', text: "Engineering projects at the college level reward complexity. The temptation is always to add another feature, another sensor, another mode - because the grading rubric doesn't penalise over-scope. Real product work does. The transferable skill wasn't the hardware. It was learning to defend one working thing against ten interesting ones." },
        ],
      },
      {
        label: 'What peer review did to my writing',
        body: [
          { type: 'p', text: "The JETIR submission process changed my writing habits permanently. Peer reviewers are the least sympathetic readers you will ever have. They do not care about your intent. They care about whether your claim is supported. Every 'clearly' I wrote came back circled." },
          { type: 'p', text: "I now assume every PRD reader is a peer reviewer. If a claim isn't backed by a number, a screenshot, or a named user, I flag it before someone else does." },
        ],
      },
      {
        label: 'Two calls I made, both uncomfortable',
        body: [
          { type: 'p', text: "On the EV charger, I had to choose between spending the last weeks measuring and pushing efficiency (harder, deadline at risk) or delivering a working prototype with clean documentation. I picked the working prototype and a good paper. We never measured efficiency properly, which is the first thing I would fix if I rebuilt it. It was the first time I traded a technical result for a delivery result, and the discomfort of that choice is what taught me what PM prioritisation actually feels like." },
          { type: 'p', text: "On the robot, I removed the second camera two weeks before the demo because power draw was ruining battery life. Losing the feature made the whole product work. That is the same conversation I have with engineers now, in different words." },
        ],
      },
      {
        label: 'What transferred',
        body: [
          { type: 'p', text: "Write claims like a peer reviewer will read them. Trade features for reliability without apologising. Respect the constraint you can't argue with - battery, latency, budget - before you optimise the one you can." },
          { type: 'p', text: "Those aren't hardware lessons. They're just product lessons I learned the hard way first." },
        ],
      },
      {
        label: 'The instinct, not the domain',
        body: [
          { type: 'p', text: "For a while I treated the hardware background as a resume line. It's more useful as a set of instincts. The instinct that a system will fail at its weakest link, not its strongest, is a PM instinct dressed as an engineering one." },
          { type: 'p', text: "If someone walked in today with a hardware paper and no software portfolio, I'd still put them in a PM interview loop. The transferable skill is not the domain. It's the willingness to ship one thing that actually works." },
        ],
      },
    ],
    relatedCaseStudies: ['ev-charging', 'esp32-robot'],
  },
  {
    slug: 'product-thinking-toolkit',
    title: 'My Product Thinking Toolkit',
    question: 'Which frameworks do I actually use - and how?',
    takeaway: 'He applies frameworks instead of memorizing them.',
    summary:
      'Five frameworks I reach for regularly, each shown on a real project - with the version I use, not the textbook version.',
    category: 'Frameworks',
    tags: ['Frameworks', 'JTBD', 'RICE', 'PRD', 'Roadmaps'],
    readingTime: '8 min read',
    publishedAt: 'Aug 11, 2026',
    publishedAtISO: '2026-08-11',
    updatedAtISO: '2026-10-18',
    cover: coverToolkit,
    coverAlt: 'Editorial illustration: flat-lay of notebook, compass, pen, ruler',
    takeaways: [
      'Frameworks earn their place by replacing an argument, not by replacing thinking.',
      'My versions of RICE, JTBD, and OSTs are all missing pieces of the textbook - on purpose.',
      'The best test of whether you own a framework: can you say what you cut from it and why?',
    ],
    sections: [
      {
        label: 'The question I get asked',
        body: [
          { type: 'p', text: "People ask what frameworks I use. The honest answer is: five, and I have modified all of them. Here they are, tied to the project where I most recently used each one." },
        ],
      },
      {
        label: 'Framework fluency without application',
        body: [
          { type: 'p', text: "Framework fluency without application is trivia. I have watched candidates lose PM interviews by reciting RICE with three decimal places and never once naming a user. The framework was cited. The problem was never described." },
        ],
      },
      {
        label: 'The filter I used',
        body: [
          { type: 'p', text: "I kept only frameworks I had used in the last six months on something that shipped. Anything I learned in a course and never applied, I cut. That filter alone reduced my toolkit significantly. Most of the ones I dropped were frameworks I had studied but never reached for in an actual decision." },
        ],
      },
      {
        label: 'Five frameworks, all modified',
        body: [
          { type: 'p', text: "JTBD on FitWardrobe. The job wasn't 'identify a garment' - it was 'leave the house feeling okay about how I look.' Naming the job renamed the product. The insight was in the verb, not the noun. I skip the forces-of-progress diagram entirely; the one-line job statement earns its keep on its own." },
          { type: 'p', text: "RICE on the CRM. I use Reach, Impact, and Effort. I dropped Confidence and replaced it with an 'evidence class' label: interview quote, analytic, competitor benchmark, or hunch. Hunches are allowed, but they get labelled. The column forces honesty without pretending hunches have a numeric value." },
          { type: 'p', text: "PRDs on Credex. Three sections: problem, decision (what we're building and what we're not), and success (metric and guardrail). No goals section, no background, no glossary. If it doesn't change what gets built, it's not in the doc." },
          { type: 'p', text: "User stories on Mithivoices. Written as jobs, not features: 'as a content creator, I want natural-sounding voices so that my content feels professional.' That story survives whichever voice engine we pick; 'add a Piper voice selector' would not. Feature-shaped stories get outdated; job-shaped ones survive scope changes." },
          { type: 'p', text: "Opportunity Solution Trees on [SEO-GEO](/case-studies/seo-geo-optimizer). Used once, when I had five feature ideas and no principled way to choose between them. The tree made the parent opportunity obvious and eliminated two of the five ideas immediately. I don't use OSTs regularly - I tried to on a later project and got eleven branches deep before I lost the thread entirely. I use them only when I'm genuinely stuck." },
        ],
      },
      {
        label: 'What the docs are actually worth',
        body: [
          { type: 'p', text: "Across those five projects, these frameworks earned their place by producing arguments I would have otherwise had verbally and forgotten. The doc is not the value. The forced clarity is." },
        ],
      },
      {
        label: 'The trap and the fix',
        body: [
          { type: 'p', text: "The trap I fell into early was framework tourism - using a new one on every project to feel productive. It slowed everything down. The fix was boring: use the smallest set that gets you to a decision, and only reach for something new when the current tool has visibly failed twice." },
          { type: 'p', text: "If I had to keep only one, it would be the modified RICE. The evidence-class column is where I catch myself lying to myself about what I actually know." },
        ],
      },
    ],
    relatedCaseStudies: ['seo-geo-optimizer', 'ai-first-crm-hcp'],
  },
  {
    slug: "if-i-started-fitwardrobe-again",
    title: "If I Started FitWardrobe Again Today",
    question: "Can I reflect on my work and improve?",
    takeaway: "He learns from experience.",
    summary:
      "A short, honest audit of what I'd do differently on FitWardrobe if I started over on a Monday morning, written before launch, with only the mistakes I can actually name.",
    category: "Reflection",
    tags: ["Reflection", "FitWardrobe", "Lessons", "MVP"],
    readingTime: "3 min read",
    publishedAt: "Aug 14, 2026",
    publishedAtISO: "2026-08-14",
    updatedAtISO: "2026-11-16",
    cover: coverRestart,
    coverAlt: "Editorial illustration: circular arrow with a sprout inside a gold circle",
    takeaways: [
      "I'd talk to people before thinking about the model, not after. That reordering alone saves weeks.",
      "I'd build the trust surface before the smart surface.",
      "I'd define what 'keep or kill' looks like on day one, so the retrospective isn't a therapy session.",
    ],
    sections: [
      {
        label: "What \"would do differently\" posts usually get wrong",
        body: [
          { type: 'p', text: "FitWardrobe hasn't launched yet, so this isn't a victory lap. Posts like this tend to be either humble-brags or performative self-criticism, and neither helps. My honest version: I think the frame is right and my sequence was wrong." },
          { type: 'p', text: "The frame has outside support. Movinga's 2018 survey of 18,000+ households in 20 countries found that most wardrobes hold clothes unworn for a year or more (movinga.com). People own enough. The problem is remembering and combining." },
        ],
      },
      {
        label: "Three orderings I got wrong",
        body: [
          { type: 'p', text: "Model before people. Features before metrics. Marketing copy before checked facts. Each one cost time, and the last one also cost accuracy: early copy described the AI as running on the device, when it runs in the cloud." },
        ],
      },
      {
        label: "The version I'd build",
        body: [
          { type: 'p', text: "Here is the order I'd use." },
          { type: 'list', items: [
            "Week 1: informal conversations before any model work, plus a clickable mock that answers one question, \"what should I wear for this?\". Watch whether people react to the answer or to the catalogue.",
            "Week 2: pick the architecture with the four-axis exercise (quality, latency, privacy, cost) plus the bad-day question: what if this model is retired? Write the answer down instead of assuming it.",
            "Week 3: build the trust surface, meaning why an outfit was picked, an easy swap and an easy correction, before the suggestions are good enough to deserve trust.",
            "Week 4: choose the two numbers that will judge launch, kept-outfit rate and correction rate, and write the kill condition on day one.",
          ]},
          { type: 'p', text: "The plan isn't really about weeks. It's about the order of bets, and the most important bet is that talking to people before building beats building before talking." },
        ],
      },
      {
        label: "A fact sheet before copy",
        body: [
          { type: 'p', text: "One habit I'd add from day one: a one-page fact sheet of what's true about the product, such as where the AI runs, which platforms exist and what has actually been measured. Every page, post and resume line has to match it. It's boring, and it would have saved me a round of corrections." },
        ],
      },
      {
        label: "What I'm less sure about now",
        body: [
          { type: 'p', text: "One assumption I haven't tested: that a mock is enough for a real conversation. It assumes people engage meaningfully with a product that doesn't exist yet. Sometimes they do. Sometimes you need a rough real thing in their hands, and that's what launch is for." },
          { type: 'p', text: "I keep this list in a note. Some of it I'm confident in. Some of it I've already started to doubt." },
        ],
      },
    ],
    relatedCaseStudies: ['fitwardrobe'],
  },
  {
    slug: 'llm-orchestration-tools',
    title: 'LLM Orchestration: What I Learned Building a Chain and an Agent',
    seoTitle: 'LLM Orchestration Tools: Lessons From Two Small Pipelines',
    question: 'How do you sequence LLM calls without it breaking?',
    takeaway: 'He picks the simplest orchestration that works.',
    summary:
      'Two small builds, two shapes: Mithivoices is a plain three-step chain, the AI-First CRM prototype is a LangGraph agent with five tools. What each shape was good for, and where the agent needed guard rails.',
    category: 'AI Product',
    tags: ['AI Product', 'LLM', 'Architecture', 'LangGraph', 'Agentic AI'],
    readingTime: '6 min read',
    publishedAt: 'Aug 21, 2026',
    publishedAtISO: '2026-08-21',
    updatedAtISO: '2026-10-18',
    cover: coverAiTrust,
    coverAlt: 'Editorial illustration: nodes connecting in a complex graph structure',
    takeaways: [
      'A fixed sequence does not need a framework. Mithivoices runs speech-to-text, a language model and text-to-speech as three calls in one request.',
      'An agent earns its keep when the model has to choose between tools. Then the hard part is everything around the model, not the graph.',
      'Answer the questions a rule can answer before the model sees them, and clean what the model says before the user sees it.',
    ],
    sections: [
      {
        label: 'The question I keep getting',
        body: [
          { type: 'p', text: 'What exactly is LLM orchestration, and why should a product manager care about it? Simply put, orchestration is how you string together language model calls, tools and state so a task finishes without the system losing the thread. It is the difference between a chat wrapper and a product.' },
          { type: 'p', text: 'I have built two small pipelines with very different shapes. Neither has real users yet, so this is about design choices, not scale.' },
        ],
      },
      {
        label: 'Mithivoices: a chain is enough',
        body: [
          { type: 'p', text: 'Mithivoices takes a voice recording and answers out loud. One request runs three steps in order: Whisper turns speech into text, a language model writes the reply, and Piper turns the reply back into speech. The model can be Gemini in the cloud or Ollama on your own machine, behind one interface, so swapping providers is a setting rather than a rewrite.' },
          { type: 'p', text: 'There is no framework and no graph, because nothing needs to branch. The one judgement call sits in plain code: a language check decides whether to translate before speaking, and it does not translate when it is unsure which language the text is in. Wrong-language speech is worse than none.' },
          { type: 'p', text: 'The backend keeps no conversation history. That is the next real decision: the moment the assistant has to remember what you said three turns ago, the chain needs state, and that is when I would reach for something like LangGraph.' },
        ],
      },
      {
        label: 'The CRM: when a graph earns its keep',
        body: [
          { type: 'p', text: 'The [AI-First CRM prototype](/case-studies/ai-first-crm-hcp) is different. A field rep types something like "met Dr Rao today, discussed the new inhaler, she was positive", and the assistant has to decide what that is: a new visit to log, a correction to an earlier one, a question about the doctor, a compliance question or a request for a next step. Those are five tools, and choosing between them is the model\'s job. That is where LangGraph helped: one node calls the model, one runs the chosen tool, and the state carries the result back to the form.' },
          { type: 'p', text: 'The state is not the chat transcript. Each message starts a fresh run, and the memory is the current form: its values and the ID of the visit being edited go in with every turn. The form is the source of truth, so the model never has to remember it.' },
        ],
      },
      {
        label: 'Three patterns from the CRM',
        body: [
          { type: 'list', items: [
            'Rules before the model: a compliance question ("can I visit Dr Rao again this month?") is caught by a simple pattern and answered straight from the database. It is faster, and the answer cannot be talked into being wrong.',
            'Typed tool results: each tool returns structured fields for the form, not prose. The interface applies the fields and highlights them for a moment, so the rep sees exactly what changed.',
            'Clean the reply: the model sometimes leaks JSON or tool names into its answer. Those lines are stripped before the rep sees them, and if nothing readable is left, a plain fallback message is shown instead.',
          ]},
        ],
      },
      {
        label: 'Where it broke',
        body: [
          { type: 'p', text: 'After a tool ran, the hosted model would sometimes try to call another tool, including one that does not exist. The fix was blunt: once a tool result is in, the next model call is not allowed to call tools at all, only to summarise.' },
          { type: 'p', text: 'The bigger flaw is about state, not the model. The chat saves a visit as soon as it understands it, and the form has its own Save button that creates a new record. Use both and you get a duplicate. Two paths that write the same thing need one owner, and in a pilot that owner would be the rep, confirming a draft.' },
        ],
      },
      {
        label: 'What I\'d pick today',
        body: [
          { type: 'p', text: 'For a fixed sequence, plain function calls. For anything where the model chooses between tools or loops, a graph framework, because the control flow stays visible. Either way, the work that decides whether it holds up is around the model: the rules that skip it, the schema that constrains it, and the cleanup after it.' },
          { type: 'p', text: 'The [SEO-GEO Optimizer](/case-studies/seo-geo-optimizer) uses a related idea at a larger scale: chained phases with a human approval gate between them, so nothing moves on without a review.' },
        ],
      },
    ],
    relatedCaseStudies: ['ai-first-crm-hcp', 'mithivoices', 'seo-geo-optimizer'],
  },
  {
    slug: 'agentic-ai-vs-ml',
    title: "Agentic AI vs Machine Learning: A PM's Guide to Knowing the Difference",
    seoTitle: 'Agentic AI vs Machine Learning: When to Use Which',
    question: 'Is it just a rebrand, or a new paradigm?',
    takeaway: 'He understands the difference between prediction and action.',
    summary:
      'The one-paragraph difference between ML and agentic AI that most definitions get wrong - and why it matters for the products you are scoping right now.',
    category: 'AI Product',
    tags: ['AI Product', 'Agentic AI', 'Machine Learning', 'Career', 'Frameworks'],
    readingTime: '6 min read',
    publishedAt: 'Aug 28, 2026',
    publishedAtISO: '2026-08-28',
    cover: coverLocalVsCloud,
    coverAlt: 'Editorial illustration: a machine learning model next to a robotic agent',
    takeaways: [
      'Machine Learning produces a prediction from a fixed input. Agentic AI takes actions and updates its state across multiple steps.',
      'Scoping an ML feature requires bounding the input. Scoping an agentic feature requires bounding the action space.',
      'If your system doesn\'t call an external tool or iterate on its own output, it is probably not agentic.',
    ],
    sections: [
      {
        label: 'The answer in one paragraph',
        body: [
          { type: 'p', text: 'Machine Learning (ML) produces a prediction or classification from a fixed input. It is a one-and-done computation. Agentic AI takes actions, uses tools, evaluates its own output, and updates its state across multiple steps to reach a goal. ML tells you what something is; an agent does something about it.' },
        ],
      },
      {
        label: 'Why the distinction matters for a PM',
        body: [
          { type: 'p', text: 'The difference isn\'t pedantic. It changes how you scope risk, measure success, and decide what to build. If you treat an agent like a traditional ML classifier, your success metrics will fail because you\'ll measure accuracy instead of task completion rate. And if you treat ML like an agent, you\'ll over-engineer a simple prediction.' },
        ],
      },
      {
        label: 'ML in practice: what I saw on Mithivoices',
        body: [
          { type: 'p', text: 'On Mithivoices, the Whisper transcription step is pure ML. You give it audio, it gives you text. Bounded input, bounded output. It is easy to evaluate against a golden dataset, easy to version, and entirely deterministic at temperature zero.' },
        ],
      },
      {
        label: 'Where "agentic" starts',
        body: [
          { type: 'p', text: 'The moment the pipeline needed to decide which tool to call based on intermediate context, we crossed into agentic territory. The system had to read a transcript, realize it was incomplete, call a web-search tool, read the result, and then synthesize a final answer. That multi-step, tool-using loop is the hallmark of an agent.' },
        ],
      },
      {
        label: 'The practical decision tree',
        body: [
          { type: 'p', text: 'If you need a single-step prediction or generation (e.g., "summarize this text", "is this image a hotdog?"), use traditional ML or a zero-shot LLM call. If you need the system to overcome obstacles, search for missing context, or interact with external APIs, you need an agentic pattern.' },
          { type: 'p', text: 'The [SEO-GEO Optimizer](/case-studies/seo-geo-optimizer) is the clearest example of an agentic system I\'ve shipped: 14 sequential phases, each gated by a human-in-the-loop validation step, with the AI using tools (schema generators, robots.txt writers) across the full workflow.' },
        ],
      },
    ],
    relatedCaseStudies: ['seo-geo-optimizer'],
  },
  {
    slug: 'agentic-ai-developer-guide',
    title: 'Agentic AI Developer Guide: Bridging PM and Engineering',
    question: 'What does a PM actually need to know about Agentic AI?',
    takeaway: 'Why the best AI PMs need to understand agent orchestration (LangGraph, MCP) rather than just prompt engineering.',
    summary: 'Prompt engineering is table stakes. To build autonomous systems, product managers must understand how to bound action spaces and evaluate agentic loops.',
    category: 'AI Product',
    tags: ['Agentic AI', 'MCP', 'LangGraph', 'LLMOps', 'Orchestration'],
    readingTime: '7 min read',
    publishedAt: 'Aug 25, 2026',
    publishedAtISO: '2026-08-25',
    cover: coverAiTrust,
    coverAlt: 'Editorial illustration: nodes and connections representing an agentic workflow',
    takeaways: [
      'Prompt engineering is just the UI. Orchestration is the product.',
      'Agentic systems fail when the action space is unbounded. Your job as a PM is to constrain what the agent is allowed to do.',
      'The Model Context Protocol (MCP) is the new API standard. You do not need to write it, but you must understand how it connects your agent to external data.',
    ],
    sections: [
      {
        label: 'The shift from prompts to agents',
        body: [
          { type: 'p', text: 'In 2024, AI PMs focused on prompt engineering. By 2026, the bottleneck moved to orchestration. A prompt is a single interaction. An agent is a loop. It decides, acts, observes, and decides again.' },
          { type: 'p', text: 'When you transition from managing a chat interface to an agentic system, your primary risk changes from "will the model say the wrong thing?" to "will the model do the wrong thing?"' },
        ],
      },
      {
        label: 'Bounding the action space',
        body: [
          { type: 'p', text: 'The most important PM decision in an agentic workflow is what the agent is explicitly NOT allowed to do. If an agent has access to a SQL execution tool, it must be scoped to read-only views, or restricted by row-level security. The PM defines the blast radius.' },
        ],
      },
      {
        label: 'Understanding MCP',
        body: [
          { type: 'p', text: 'The Model Context Protocol (MCP) standardizes how agents talk to external tools and data sources. As a PM, you don\'t need to write the servers, but you need to map your user journeys to the specific MCP resources and tools your agent will require to complete the job.' },
        ],
      },
    ],
  },
  {
    slug: 'generative-ai-technical-seo',
    title: 'Generative AI for Technical SEO: A Builder\'s Perspective',
    question: 'How do you optimize a site for an Answer Engine?',
    takeaway: 'How to structure modern web apps for answer engines (Perplexity, ChatGPT) using LLMs.txt and dynamic schema.',
    summary: 'Search is shifting from blue links to direct answers. Technical SEO now means making your unstructured data legible to a retrieval-augmented generation (RAG) system.',
    category: 'Frameworks',
    tags: ['Technical SEO', 'GEO', 'Generative Engine Optimization', 'LLMs.txt', 'Structured Data'],
    readingTime: '6 min read',
    publishedAt: 'Aug 18, 2026',
    publishedAtISO: '2026-08-18',
    updatedAtISO: '2026-10-16',
    cover: coverToolkit,
    coverAlt: 'Editorial illustration: tools for structuring data for LLMs',
    takeaways: [
      'LLMs don\'t care about your CSS. They use JSON-LD and semantic HTML as potentially helpful implementation guidance.',
      'The llms.txt proposal is an emerging, optional format with unspecified client processing, not a robots.txt replacement.',
      'Answer engines may prioritize dense, factual information over keyword-stuffed narrative.',
    ],
    sections: [
      {
        label: 'The new SEO is GEO',
        body: [
          { type: 'p', text: 'Generative Engine Optimization (GEO) is evolving alongside traditional SEO for informational queries. When a user asks an answer engine about your product, it may synthesize an answer directly from the DOM. A clean semantic structure serves as helpful implementation guidance for these models.' },
        ],
      },
      {
        label: 'LLMs.txt: An emerging proposal',
        body: [
          { type: 'p', text: 'Rather than a strict replacement for robots.txt, llms.txt is an emerging, optional proposal with unspecified client processing. It serves as a markdown-friendly map of your content that can be provided as a helpful hint for ingestion into a context window.' },
        ],
      },
      {
        label: 'Why JSON-LD matters more than ever',
        body: [
          { type: 'p', text: 'LLMs are exceptionally good at parsing structured JSON data. If your page provides a rich Person, ProfilePage, or SoftwareApplication schema, it acts as potentially helpful implementation guidance for an agent extracting entity data, bypassing the noise of visual layout.' },
        ],
      },
    ],
  }
]

export const getBlogPost = (slug: string) => blogPosts.find((p) => p.slug === slug)

export const blogTagToSlug = (t: string) =>
  t.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

export const allBlogTags = () =>
  Array.from(new Set(blogPosts.flatMap((p) => p.tags))).sort()

export const allBlogCategories = () =>
  Array.from(new Set(blogPosts.map((p) => p.category)))

// A tag page that lists a single post is near-duplicate of that post and adds
// little for a reader arriving from search. Bing's guidelines ask that the
// sitemap list exactly the URLs you want indexed, so the sitemap filter and the
// robots directive on the tag route both read this one number: change it here
// and the two can never disagree.
export const TAG_INDEX_THRESHOLD = 2

export const postsForTag = (tag: string) =>
  blogPosts.filter((p) => p.tags.includes(tag))
