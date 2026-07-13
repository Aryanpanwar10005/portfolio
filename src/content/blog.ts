import coverDiscovery from '@/assets/blog/fitwardrobe-discovery.webp'
import coverEngineerToPm from '@/assets/blog/engineer-to-pm.webp'
import coverPrioritize from '@/assets/blog/prioritize-features.webp'
import coverMetrics from '@/assets/blog/success-metrics.webp'
import coverFeaturesRemoved from '@/assets/blog/features-removed.webp'
import coverLocalVsCloud from '@/assets/blog/local-vs-cloud-ai.webp'
import coverAiTrust from '@/assets/blog/ai-trust.webp'
import coverEngToProduct from '@/assets/blog/engineering-to-product.webp'
import coverToolkit from '@/assets/blog/product-toolkit.webp'
import coverRestart from '@/assets/blog/restart-fitwardrobe.webp'

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
  question: string
  takeaway: string
  summary: string
  category: BlogCategory
  tags: string[]
  readingTime: string
  publishedAt: string
  publishedAtISO: string
  cover: string
  coverAlt: string
  takeaways: string[]
  sections: { label: SectionLabel; body: BodyBlock[] }[]
  relatedCaseStudies?: string[]
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'fitwardrobe-product-discovery',
    title: 'What Building FitWardrobe Taught Me About Product Discovery',
    question: 'How do I discover the right problem?',
    takeaway: 'He starts with users, not features.',
    summary:
      'FitWardrobe started as a computer-vision demo. It only became a product when I stopped defending my prototype and started listening to the seven friends who told me it solved the wrong problem.',
    category: 'Discovery',
    tags: ['Discovery', 'User Research', 'MVP', 'FitWardrobe', 'On-Device AI'],
    readingTime: '7 min read',
    publishedAt: 'May 12, 2026',
    publishedAtISO: '2026-05-12',
    cover: coverDiscovery,
    coverAlt: 'Editorial illustration: hangers behind a magnifying lens on deep-wine background',
    takeaways: [
      "The clever technical bet — on-device classification — was never the product. Daily outfit anxiety was.",
      'Seven un-facilitated conversations changed the roadmap more than three weeks of building.',
      "The version I shipped had less functionality than the one I originally spec'd, and held onto users better.",
    ],
    sections: [
      {
        label: 'How it started',
        body: [
          { type: 'p', text: "FitWardrobe is a fashion assistant that classifies clothing on the user's phone — no cloud, no login. I built it because on-device inference was the interesting engineering problem, and I wanted to prove I could ship a real TFLite model to a real user without a GPU bill." },
          { type: 'p', text: "The first person I showed it to looked at the screen for a few seconds, said 'oh cool,' and put her phone down. I kept talking for another minute before I realized she was done." },
        ],
      },
      {
        label: 'What I got wrong first',
        body: [
          { type: 'p', text: "V0 could tell you a shirt was a shirt. It could not tell you what to wear on Tuesday. I had built a capable classifier and called it a product, and the first five people I showed it to were polite about it in the way that friends are polite about a bad haircut." },
          { type: 'p', text: "The actual pain — the reason people spend ten minutes staring at a closet at 8 a.m. — wasn't 'I don't know what this garment is.' It was 'I don't know what these garments look like together, given the weather, given the meeting, given yesterday.' My classifier answered a question nobody was asking." },
        ],
      },
      {
        label: 'Seven conversations',
        body: [
          { type: 'p', text: "I stopped shipping for two weeks and ran seven interviews — nothing formal, just fifteen minutes and one prompt: 'walk me through the last time you couldn\'t decide what to wear.' I did not show them the app. I did not defend the app. I only listened." },
          { type: 'list', items: [
            'Six of seven mentioned weather within the first minute.',
            'Four described a specific \"safe outfit\" they fall back on when tired.',
            'Three said they take photos of outfits that \"worked\" and never look at them again.',
            'Zero mentioned wanting a computer to identify what type of garment something was.',
            "One person spent eight minutes trying to navigate the catalog tab before giving up. I hadn't built it to be useful. It just existed.",
          ]},
          { type: 'p', text: 'The zero on that fourth point is the one that stung. My headline feature had no organic pull at all.' },
        ],
      },
      {
        label: 'The uncomfortable choice',
        body: [
          { type: 'p', text: "I had to choose between two products. Product A kept the classifier as the hero and layered outfit-building on top — protecting my sunk cost. Product B demoted the classifier to a silent helper and made the hero surface a single button: 'what should I wear today?'" },
          { type: 'p', text: "I chose B. It meant most of the visible AI I had built became invisible. The demo would be less impressive to other engineers and more useful to actual people. I wrote 'make it boring' at the top of the new spec. I hated writing it. I shipped it nine days later." },
        ],
      },
      {
        label: 'What actually happened',
        body: [
          { type: 'p', text: "The scoped-down v1 shipped in nine days. Day-7 retention with the same test group moved from roughly one in five to closer to three in five. The classifier still ran on every photo — but nobody talked about it, because they were too busy telling me the app 'just knew' what to suggest." },
          { type: 'p', text: 'The engineering had not changed. The product had.' },
        ],
      },
      {
        label: "What I'm still figuring out",
        body: [
          { type: 'p', text: "The mistake I keep re-learning: I fell for my own cleverness. On-device inference was a real advantage, but it was an implementation detail, not a value proposition. Users don't care where the model runs. They care whether the answer is right, fast, and doesn't make them feel stupid." },
          { type: 'p', text: "I still open editors too fast. The two-week pause before FitWardrobe's pivot was the only time I stopped myself — and I had to make myself do it." },
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
      'The moment my technical instinct stopped being an asset and started being a tax — and the three questions I now ask before I let myself open a code editor.',
    category: 'Career',
    tags: ['PM Mindset', 'Career', 'Engineering to PM'],
    readingTime: '6 min read',
    publishedAt: 'May 5, 2026',
    publishedAtISO: '2026-05-05',
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
          { type: 'p', text: "I trained as an engineer. For four years, being useful meant shipping code. When I started scoping products end-to-end — Mithivoices, the CRM, FitWardrobe — my instinct was still to open an editor within an hour of hearing an idea. That instinct kept betraying me." },
        ],
      },
      {
        label: 'Mithivoices, or: what I built first',
        body: [
          { type: 'p', text: "On Mithivoices I built a real-time WebSocket pipeline before I had a single answer to 'who needs sub-450ms voice translation, and what breaks in their life today because they don\'t have it?' The pipeline worked. Nobody I could name was waiting for it." },
          { type: 'p', text: "The engineering mindset — 'I can build this, therefore I should' — is a superpower when the problem is well-defined and a liability when it isn\'t. Most product problems aren't." },
        ],
      },
      {
        label: 'Two things that actually landed',
        body: [
          { type: 'p', text: "I read a lot of PM writing that felt hollow — vague talk about 'customer obsession' without a description of the muscle involved. Two things landed. First: Marty Cagan's framing of discovery and delivery as two different jobs, not two phases of the same job. Second: watching senior PMs reject strong technical answers in interviews because the candidate had skipped the user entirely." },
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
          { type: 'p', text: "I said no to myself earlier, which is cheaper than saying no to a team later. I threw away less work. And counterintuitively, my technical background became more useful, not less — once I stopped defaulting to 'can I build this?', I could use engineering intuition where it actually paid: spotting when a plan hid a hard latency problem, or when a 'simple' AI feature was one prompt away from an unbounded eval nightmare." },
        ],
      },
      {
        label: 'What I still get wrong',
        body: [
          { type: 'p', text: "I still build too fast sometimes. The habit is maybe two-thirds formed. What's different now is that I notice it happening — usually around the second hour of writing code for something I haven't validated yet. That awareness doesn't always stop me. But it means the damage is smaller." },
          { type: 'p', text: "The shift wasn't 'stop being technical.' It was 'stop leading with the part of the work I enjoy.' Those are very different instructions." },
        ],
      },
    ],
    relatedCaseStudies: ['mithivoices'],
  },
  {
    slug: 'prioritize-features-before-prd',
    title: 'How I Prioritize Features Before Writing a PRD',
    question: 'How do I decide what gets built?',
    takeaway: "He doesn't build everything.",
    summary:
      'The one-page pre-PRD I run before any spec — and why the "must-have" column is the one that decides whether the product ships on time.',
    category: 'Prioritization',
    tags: ['Prioritization', 'PRD', 'RICE', 'Trade-offs', 'Scope'],
    readingTime: '6 min read',
    publishedAt: 'Apr 28, 2026',
    publishedAtISO: '2026-04-28',
    cover: coverPrioritize,
    coverAlt: 'Editorial illustration: stack of index cards with one lifted priority card',
    takeaways: [
      'RICE is fine, but the number it produces is less useful than the argument it forces.',
      '"Must-have" without a specific user commitment is decoration.',
      'The features I cut before the PRD save more time than every optimization I add after.',
    ],
    sections: [
      {
        label: 'Twenty-three features',
        body: [
          { type: 'p', text: "On the AI-First CRM for pharma reps, the initial feature list had somewhere around twenty features — voice logging, offline sync, physician deduping, compliance flags, an assistant, an audit trail, and more. Every one was defensible in isolation. The team could not build all of them." },
          { type: 'p', text: "One of those was a compliance flag system. An engineer had already started sketching a database schema for it before I remembered we had no compliance requirements in v1. I had written it on the list because it sounded right, not because anyone had asked for it." },
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
          { type: 'p', text: "Shape Up changed what I did in practice. Specifically the 'appetite' concept — you decide how much time something is worth before you estimate it. That reordering sounds small. It isn't. It forces a scope conversation instead of an estimate, which is a completely different meeting." },
          { type: 'p', text: "I also kept the discipline of writing a number from RICE — not for precision, but for commitment. Writing down an estimate forces you to have an opinion, which is the thing most feature discussions are quietly avoiding." },
        ],
      },
      {
        label: 'The pre-PRD',
        body: [
          { type: 'p', text: "I now run a one-page check before I open the PRD template. Four columns for every candidate feature." },
          { type: 'list', items: [
            "User commitment: the specific behaviour I'm asking a user to change or adopt. If I can't name it, the feature is cut.",
            'Evidence class: what I actually know — interview quote, analytics, competitor benchmark, or hunch. Hunches are allowed, but they get labelled honestly.',
            'Appetite: time the feature is worth, decided before we estimate. If the estimate exceeds appetite, we shrink scope, not schedule.',
            'Kill signal: the metric or observation that would make me drop it after launch.',
          ]},
          { type: 'p', text: "The kill signal column was one I added two weeks into using this, after I realised five items had no exit condition. I didn't start with it. I added it after keeping a feature I later regretted." },
          { type: 'p', text: "On the CRM, that page cut the list down to six before the PRD started. Three of the cuts were mine. Two were painful. One was a feature I had already told an engineer we'd build, which cost me a phone call I did not enjoy making." },
        ],
      },
      {
        label: 'What shipped',
        body: [
          { type: 'p', text: "The v1 CRM shipped with six features. Two more were added in the second cycle after real usage — one that hadn't been on the pre-PRD at all, one that had been cut and came back with actual evidence behind it. Nothing that shipped in v1 got removed. That's the metric I care about: not a perfect roadmap, but no regrettable builds." },
        ],
      },
      {
        label: 'Where I still fail at this',
        body: [
          { type: 'p', text: "The hardest habit is being honest in the evidence column when I'm the one who wants the feature. I still catch myself inflating a hunch to 'preliminary research.' The mitigation is a peer: I ask an engineer or a fellow builder to read the page and only comment on the evidence column. It takes fifteen minutes and saves weeks." },
          { type: 'p', text: "If I started the CRM again, I'd run the pre-PRD before the first stakeholder meeting instead of after. The list of twenty-odd features was itself a symptom — a sign I had absorbed everyone's wishes without weighing any of them." },
        ],
      },
    ],
    relatedCaseStudies: ['ai-crm-hcp'],
  },
  {
    slug: 'success-metrics-before-features',
    title: 'Why Every Product Needs Success Metrics Before Features',
    question: 'How do I know a feature is successful?',
    takeaway: 'He thinks in outcomes.',
    summary:
      'The Credex feature I almost shipped without a definition of \"worked\" — and the two-column doc I now use so I never do that again.',
    category: 'Metrics',
    tags: ['Metrics', 'North Star', 'KPIs', 'Outcomes', 'Credex'],
    readingTime: '6 min read',
    publishedAt: 'Apr 21, 2026',
    publishedAtISO: '2026-04-21',
    cover: coverMetrics,
    coverAlt: 'Editorial illustration: bullseye target with an upward gold arrow',
    takeaways: [
      "A feature without a success metric is a feature that can't be paused.",
      'The metric belongs in the spec, not the retro. Retro-metrics get invented to defend outcomes.',
      'Two numbers beat one: an outcome metric and a guardrail. One tells you if it worked; the other tells you what you broke.',
    ],
    sections: [
      {
        label: 'The feature that almost shipped without a definition',
        body: [
          { type: 'p', text: "Credex is a spend-audit app for engineering managers — you connect your SaaS subscriptions and it flags overlap and savings. One of the earliest requests was a 'share this report' feature. It came through a Slack message from a beta user who had copy-pasted their report into an email to their CFO and asked if we could make that easier. Three people in the thread said 'yes ship this.' I put it on the roadmap before I had a success metric." },
          { type: 'p', text: "That's the problem." },
        ],
      },
      {
        label: "The sentence I couldn't finish",
        body: [
          { type: 'p', text: "We were three days from starting when I noticed I couldn't answer 'how will we know if we should keep it?' Nobody in the conversation could. We were about to build something we couldn't evaluate." },
          { type: 'p', text: "Without a success metric, 'worked' gets defined by whoever needed the feature to have worked — usually me, three weeks later, defending the build." },
        ],
      },
      {
        label: 'Two different features wearing the same name',
        body: [
          { type: 'p', text: "I looked at the surface I actually cared about — reports created per active user — and asked what a share feature was supposed to move. Two candidate outcomes: more reports created by invited teammates, or higher return-visit rate for the original author. The two candidates were not the same product." },
          { type: 'p', text: 'That was the moment the feature stopped being obvious. It had been carrying two contradictory jobs in the same name.' },
        ],
      },
      {
        label: 'The two-column table',
        body: [
          { type: 'p', text: "I picked outcome A — teammate-created reports — because it mapped to the North Star metric (audits completed per week). I wrote it into the spec as a two-column table: outcome metric on the left, guardrail on the right." },
          { type: 'list', items: [
            'Outcome: a meaningful increase in weekly reports created via share link, measured three weeks after launch.',
            "Guardrail: no drop in report completion rate — if people share half-finished audits and never come back, we've made the product feel worse.",
            'Kill decision: if outcome misses AND guardrail regresses, the feature comes out. No debate.',
          ]},
          { type: 'p', text: "The guardrail was the one we argued about. An engineer thought 'no drop in completion rate' was too conservative. I didn't budge. Looking back, he was probably right to push and I was right to hold. Both things can be true." },
        ],
      },
      {
        label: 'What the data showed',
        body: [
          { type: 'p', text: "The share feature shipped in a week. Reports created via share links rose, but not enough to call it a clear win. The guardrail held. We kept the feature and scoped a follow-up to fix where the loop was leaking — an invite state that let recipients start where the sharer left off." },
          { type: 'p', text: "The target wasn't hit. The framework still worked, because it turned a feel-good feature into a testable one and told us what to build next." },
        ],
      },
      {
        label: 'The trade-off I still watch',
        body: [
          { type: 'p', text: "Defining a metric feels like tempting fate. If you don't name a number, nothing 'fails.' That comfort is exactly why teams under-ship on outcomes." },
          { type: 'p', text: "I still find the conversation uncomfortable when it's a feature I want to build. The two-column table doesn't fix that — it just makes the discomfort visible, which is a different thing. If I built Credex from scratch, the table would be the first block in every PRD, above the problem statement." },
        ],
      },
    ],
    relatedCaseStudies: ['credex-spend-audit'],
  },
  {
    slug: 'features-removed-fitwardrobe',
    title: 'The Features I Removed That Made FitWardrobe Better',
    question: 'Can I say "no"?',
    takeaway: 'He understands prioritization.',
    summary:
      'A short list of things I built, shipped, then deleted from FitWardrobe — and what each removal taught me about the difference between a capability and a product.',
    category: 'Prioritization',
    tags: ['Prioritization', 'Say No', 'FitWardrobe', 'Simplicity'],
    readingTime: '5 min read',
    publishedAt: 'Apr 14, 2026',
    publishedAtISO: '2026-04-14',
    cover: coverFeaturesRemoved,
    coverAlt: 'Editorial illustration: sculptor carving away pieces from a form',
    takeaways: [
      'Every feature that stays costs support, cognition, and roadmap air. Removal is a positive event.',
      'The feature I loved most was the one that most damaged return rate.',
      'Saying "no" after you\'ve shipped is harder than saying "no" before. Both are the job.',
    ],
    sections: [
      {
        label: 'From six surfaces to three',
        body: [
          { type: 'p', text: "FitWardrobe v0.5 had six top-level surfaces. The current version has three. Two of the removed surfaces were features I had personally lobbied for. This is a note about each one, and what it cost to keep them longer than they deserved." },
        ],
      },
      {
        label: 'Impressive but not useful',
        body: [
          { type: 'p', text: "The product had become 'impressive' and stopped being 'useful.' Session length was up. Return rate was flat. A pattern I now recognise: users take longer to do less." },
          { type: 'p', text: "The specific offenders were a manual outfit builder, a 'style score' that graded each look, and a colour-palette suggester. Each individually reasonable. Together, three answers to a question users only asked once." },
        ],
      },
      {
        label: 'One hour with a stopwatch',
        body: [
          { type: 'p', text: "I watched five session recordings back-to-back. Users hit the 'what should I wear?' button first every time. The manual outfit builder averaged one visit per week per user. The style score got a single tap per install. The palette suggester had a very low completion rate — people opened it, got confused, and left." },
          { type: 'p', text: "In the fifth recording, a user opened the style score, stared at it for a few seconds, and navigated away. Not confused — uninterested. That was worse." },
          { type: 'p', text: 'None of that was in a dashboard. It took an hour with a stopwatch to see.' },
        ],
      },
      {
        label: 'What I cut and why',
        body: [
          { type: 'p', text: "I removed all three. Not hidden behind a flag — removed. The style score was the one that hurt. I had spent a weekend on the scoring rubric. When I removed it, nobody emailed to ask where it went. That was the answer." },
          { type: 'list', items: [
            "Manual outfit builder: cut. Users came to be told what to wear, not to build an outfit themselves.",
            "Style score: cut. Grading someone's clothes is a reliable way to lose them.",
            'Palette suggester: moved into the recommendation engine as an invisible input, not a visible tab.',
          ]},
        ],
      },
      {
        label: 'After',
        body: [
          { type: 'p', text: "Session length dropped. Weekly return rate climbed over the following month. The support message I feared — 'where did X go?' — arrived twice, from the same person, both times about the outfit builder. I sent a two-line explanation and heard nothing back." },
          { type: 'p', text: 'The app got smaller and started working harder.' },
        ],
      },
      {
        label: 'The pattern I keep watching for',
        body: [
          { type: 'p', text: "The feature I'm proudest of is often the one obscuring the feature that actually earns return visits. My taste is a lagging indicator; user behaviour is the real one." },
          { type: 'p', text: 'If I had run the stopwatch session at v0.5, I would have caught this a month earlier. The tool that made the difference was not analytics — it was thirty minutes of watching someone use the app without commentary.' },
        ],
      },
    ],
    relatedCaseStudies: ['fitwardrobe'],
  },
  {
    slug: 'local-vs-cloud-ai-fitwardrobe',
    title: 'Local AI vs Cloud AI: Decisions Behind FitWardrobe',
    question: 'How do I make AI product decisions?',
    takeaway: 'He understands AI as a product capability.',
    summary:
      'Why FitWardrobe runs its model on the phone even though the cloud version would be more accurate — a real trade-off table, not a manifesto.',
    category: 'AI Product',
    tags: ['AI Product', 'On-Device AI', 'Trade-offs', 'Privacy', 'FitWardrobe'],
    readingTime: '7 min read',
    publishedAt: 'Apr 7, 2026',
    publishedAtISO: '2026-04-07',
    cover: coverLocalVsCloud,
    coverAlt: 'Editorial illustration: phone and cloud connected by a balance line',
    takeaways: [
      'On-device was a product decision dressed as a technical one — the value was UX and trust, not cost.',
      'The cloud version was measurably more accurate. It still lost the trade-off, and I can tell you exactly why.',
      "Every AI product decision I've made maps to the same four axes: latency, privacy, cost, and the recovery story when the model is wrong.",
    ],
    sections: [
      {
        label: 'Two real options',
        body: [
          { type: 'p', text: "FitWardrobe classifies clothing from user photos. There were two viable architectures: a cloud endpoint with a larger model, or an on-device model that runs locally. Neither is a moral position. Both had real trade-offs I had to weigh." },
        ],
      },
      {
        label: 'The bad-day test',
        body: [
          { type: 'p', text: "The default answer for anyone who has read enough tech Twitter is 'on-device, obviously.' The honest answer is 'it depends on what breaks first when the model is wrong.' I forced myself to write down what each version would look like on a bad day, not a good one." },
          { type: 'p', text: "I found the worst-case latency issue the night before a demo. The app would sometimes just stop responding on a weak connection. The median numbers looked fine. The tail didn't. That sealed the decision more than any benchmark did." },
        ],
      },
      {
        label: "What the benchmark didn't answer",
        body: [
          { type: 'p', text: "I ran benchmarks. The cloud model was more accurate — measurably, not marginally. The on-device model was faster — not by a small amount, by a factor that changed whether the interaction felt instant or laggy. The cost difference mattered less than I expected." },
          { type: 'p', text: "Then I asked the questions the benchmark couldn't answer. What happens on a subway with no signal? What does a user assume we're doing with their bedroom photos? How do we roll back a bad model version? What's our story when accuracy drops on darker fabrics — a known failure mode for most vision models?" },
        ],
      },
      {
        label: 'What won and what I gave up',
        body: [
          { type: 'p', text: "On-device won on three axes and lost on one." },
          { type: 'list', items: [
            'Latency: fast enough to feel instant. The cloud version sometimes felt laggy. For a swipe-heavy interface, that gap matters.',
            "Privacy: 'your closet never leaves your phone' is a real claim I could put in the App Store description without a lawyer. That mattered more than I expected in early feedback.",
            "Cost: on-device has no per-call cost at scale. That mattered less than the other two, but it made the solo-builder economics trivial.",
            'Accuracy: cloud was better. I accepted the gap and added a "not right? tap to fix" button so every mistake became a feedback loop, not a dead end.',
          ]},
          { type: 'p', text: "On-device shipped. The thing I gave up — accuracy — became a training signal through the correction button. The axis I lost on was the one that compounded." },
        ],
      },
      {
        label: 'How it played out',
        body: [
          { type: 'p', text: "The 'tap to correct' affordance turned model mistakes into a labelled dataset I use to retrain the classifier periodically. The very axis I gave up became a source of future improvement." },
          { type: 'p', text: "That was the accidental lesson: the way you handle the model being wrong is often more product-defining than the accuracy number itself." },
        ],
      },
      {
        label: 'The one axis I still think about',
        body: [
          { type: 'p', text: "The accuracy trade-off was the uncomfortable one. My engineering instinct hated shipping the worse number. What convinced me was writing the bad-day scenarios side by side. A cloud outage on Monday morning is a worse product than a slightly-less-accurate local model on Monday morning." },
          { type: 'p', text: "If I had another AI product tomorrow, I'd run the four-axis exercise on day one, before I picked a model. Not because the axes are magic. Because the argument you have while running them is where the real product decision lives." },
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
      'Trust is a product surface, not a model property. Notes from the AI-First CRM on the four affordances that moved reps from "let me double-check" to "let it log."',
    category: 'AI Product',
    tags: ['AI Product', 'Trust', 'UX', 'Hallucinations', 'Explainability'],
    readingTime: '7 min read',
    publishedAt: 'Mar 31, 2026',
    publishedAtISO: '2026-03-31',
    cover: coverAiTrust,
    coverAlt: 'Editorial illustration: two hands meeting with a glowing node between them',
    takeaways: [
      'Trust is built by the surface, not the model. Same weights, different UI, different adoption.',
      'The most effective trust move on the CRM was showing the source, not tuning the model.',
      'A confident wrong answer is worse than an honest uncertain one. Product surfaces have to make that choice explicit.',
    ],
    sections: [
      {
        label: "The tool that worked and wasn't used",
        body: [
          { type: 'p', text: "The AI-First CRM lets pharma reps log physician interactions by talking to an assistant instead of filling a form. The assistant is powered by a LangGraph pipeline. It works. Reps did not use it at first, because they did not trust it." },
        ],
      },
      {
        label: 'Mostly right is not a promise',
        body: [
          { type: 'p', text: "Reps in a regulated industry cannot afford to log wrong information — a mis-classified interaction can breach compliance. The model was performing well on our eval. That number is a great engineering result and a terrible product argument. 'Mostly right' is not a promise a rep can carry into an audit." },
          { type: 'p', text: "Adoption in the first two weeks was low. Reps used the assistant to draft, then re-typed the same information into the form manually. We had shipped a very expensive typewriter." },
        ],
      },
      {
        label: 'What the help tickets actually said',
        body: [
          { type: 'p', text: "I sat with a few reps for an afternoon each and watched them use the tool. One rep asked the same question out loud every time the assistant responded: 'how do I know it heard me right?' He wasn't asking for better accuracy. He was asking for a receipt. I wrote that word in my notes and didn't fully understand it until I watched him re-type the assistant's output by hand." },
          { type: 'p', text: "I also read every help ticket from the first month. Zero were about accuracy. All were about two things: auditability ('can I see what got logged?') and reversibility ('how do I fix it if it's wrong?')." },
        ],
      },
      {
        label: 'Four things we added to the surface',
        body: [
          { type: 'p', text: "We did not retrain the model. We added four affordances." },
          { type: 'list', items: [
            'Read-back: after each turn, the assistant echoes what it heard in structured form before saving. One extra tap. Zero ambiguity.',
            'Source pinning: every logged field shows the exact rep utterance it came from. Trust is easier when the receipt is visible.',
            'Uncertainty as UI: confidence below a threshold surfaces as a yellow badge with "confirm?" — not a hidden score.',
            'Reversible commit: every save has a 30-second undo without leaving the screen. Small, but it changes the emotional cost of trying.',
          ]},
        ],
      },
      {
        label: 'When it crossed something',
        body: [
          { type: 'p', text: "Adoption moved substantially — from a small fraction of reps to most of them — in about a month. The model accuracy did not move. The rate of manual re-typing dropped to near zero." },
          { type: 'p', text: "The support tickets shifted topic entirely: from 'how do I check what got saved?' to feature requests for new interaction types. When the complaint changes, the product has crossed something." },
        ],
      },
      {
        label: 'The balance point',
        body: [
          { type: 'p', text: "The mistake was optimising the wrong number. I had spent two weeks squeezing a few more accuracy points out of the model. Those points were invisible to the user. The read-back UI took a day and moved adoption far more." },
          { type: 'p', text: "The trade-off I still watch: friction added for trust can become friction added for its own sake. The read-back is one extra tap, worth it. If I added a second confirmation on top, I'd be paying for safety I didn't need with adoption I couldn't afford. That balance point has to be checked with real users, not felt." },
        ],
      },
    ],
    relatedCaseStudies: ['ai-crm-hcp'],
  },
  {
    slug: 'engineering-to-product-thinking',
    title: 'From Engineering Projects to Product Thinking',
    question: 'How did my engineering work influence my PM approach?',
    takeaway: 'His technical background supports his product thinking.',
    summary:
      'A JETIR-published EV-charging prototype and an ESP32 robot taught me more about product management than any framework — because both had physical failure modes that could not be argued with.',
    category: 'Career',
    tags: ['Career', 'Systems Thinking', 'Hardware', 'JETIR', 'Engineering to PM'],
    readingTime: '6 min read',
    publishedAt: 'Mar 24, 2026',
    publishedAtISO: '2026-03-24',
    cover: coverEngToProduct,
    coverAlt: 'Editorial illustration: gears transforming into a lightbulb',
    takeaways: [
      "Hardware forces you to ship one thing that works, not five things that might.",
      'Peer review taught me to write for a reader who is looking for reasons to reject.',
      'Every constraint I hit — power, latency, weight, bandwidth — showed up later in a software product wearing different clothes.',
    ],
    sections: [
      {
        label: 'Before I knew what a PRD was',
        body: [
          { type: 'p', text: "Before I ever wrote a PRD, I built a wireless EV-charging prototype using inductive power transfer. It won the branch expo and was published in JETIR. Around the same time, I shipped an autonomous ESP32 robot with GPS tracking and live video. The EV paper was accepted. I don't think I read it after it went up — I was already on to the next thing, which is either a healthy instinct or a bad habit. I've gone back and forth on it." },
        ],
      },
      {
        label: "The rubric that doesn't punish over-scope",
        body: [
          { type: 'p', text: "Engineering projects at the college level reward complexity. The temptation is always to add another feature, another sensor, another mode — because the grading rubric doesn't penalise over-scope. Real product work does. The transferable skill wasn't the hardware. It was learning to defend one working thing against ten interesting ones." },
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
          { type: 'p', text: "On the EV charger, I had to choose between chasing a higher efficiency rating (harder, longer, deadline at risk) or shipping 85% with clean documentation. I picked 85% and a good paper. It was the first time I traded a technical result for a delivery result, and the discomfort of that choice is what taught me what PM prioritisation actually feels like." },
          { type: 'p', text: "On the robot, I removed the second camera two weeks before the demo because power draw was ruining battery life. Losing the feature made the whole product work. That is the same conversation I have with engineers now, in different words." },
        ],
      },
      {
        label: 'What transferred',
        body: [
          { type: 'p', text: "Write claims like a peer reviewer will read them. Trade features for reliability without apologising. Respect the constraint you can't argue with — battery, latency, budget — before you optimise the one you can." },
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
    question: 'Which frameworks do I actually use — and how?',
    takeaway: 'He applies frameworks instead of memorizing them.',
    summary:
      'Five frameworks I reach for regularly, each shown on a real project — with the version I use, not the textbook version.',
    category: 'Frameworks',
    tags: ['Frameworks', 'JTBD', 'RICE', 'PRD', 'Roadmaps'],
    readingTime: '8 min read',
    publishedAt: 'Mar 17, 2026',
    publishedAtISO: '2026-03-17',
    cover: coverToolkit,
    coverAlt: 'Editorial illustration: flat-lay of notebook, compass, pen, ruler',
    takeaways: [
      'Frameworks earn their place by replacing an argument, not by replacing thinking.',
      'My versions of RICE, JTBD, and OSTs are all missing pieces of the textbook — on purpose.',
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
          { type: 'p', text: "JTBD on FitWardrobe. The job wasn't 'identify a garment' — it was 'leave the house feeling okay about how I look.' Naming the job renamed the product. The insight was in the verb, not the noun. I skip the forces-of-progress diagram entirely; the one-line job statement earns its keep on its own." },
          { type: 'p', text: "RICE on the CRM. I use Reach, Impact, and Effort. I dropped Confidence and replaced it with an 'evidence class' label: interview quote, analytic, competitor benchmark, or hunch. Hunches are allowed, but they get labelled. The column forces honesty without pretending hunches have a numeric value." },
          { type: 'p', text: "PRDs on Credex. Three sections: problem, decision (what we're building and what we're not), and success (metric and guardrail). No goals section, no background, no glossary. If it doesn't change what gets built, it's not in the doc." },
          { type: 'p', text: "User stories on Mithivoices. Written as jobs, not features: 'as a bilingual speaker joining a call late, I want the last 30 seconds transcribed so I can join without asking anyone to repeat themselves.' Feature-shaped stories get outdated; job-shaped ones survive scope changes." },
          { type: 'p', text: "Opportunity Solution Trees on SEO-GEO. Used once, when I had five feature ideas and no principled way to choose between them. The tree made the parent opportunity obvious and eliminated two of the five ideas immediately. I don't use OSTs regularly — I tried to on a later project and got eleven branches deep before I lost the thread entirely. I use them only when I'm genuinely stuck." },
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
          { type: 'p', text: "The trap I fell into early was framework tourism — using a new one on every project to feel productive. It slowed everything down. The fix was boring: use the smallest set that gets you to a decision, and only reach for something new when the current tool has visibly failed twice." },
          { type: 'p', text: "If I had to keep only one, it would be the modified RICE. The evidence-class column is where I catch myself lying to myself about what I actually know." },
        ],
      },
    ],
    relatedCaseStudies: ['seo-geo-optimizer', 'ai-crm-hcp'],
  },
  {
    slug: 'if-i-started-fitwardrobe-again',
    title: 'If I Started FitWardrobe Again Today',
    question: 'Can I reflect on my work and improve?',
    takeaway: 'He learns from experience.',
    summary:
      'A short, honest audit of what I would build differently on FitWardrobe if I got to start over on a Monday morning — no revisionism, only the mistakes I can actually name.',
    category: 'Reflection',
    tags: ['Reflection', 'FitWardrobe', 'Lessons', 'MVP'],
    readingTime: '5 min read',
    publishedAt: 'Mar 10, 2026',
    publishedAtISO: '2026-03-10',
    cover: coverRestart,
    coverAlt: 'Editorial illustration: circular arrow with a sprout inside a gold circle',
    takeaways: [
      "I'd do discovery before the model, not after. That single reordering saves weeks.",
      "I'd build the trust surface before the smart surface.",
      "I'd define what 'keep or kill' looks like on day one, so the retrospective isn't a therapy session.",
    ],
    sections: [
      {
        label: 'What "would do differently" posts usually get wrong',
        body: [
          { type: 'p', text: "FitWardrobe is live and used daily. It works. That doesn't make it the right version. The temptation with these posts is to be either humble-brag ('I nailed it, only tiny tweaks') or performative-flagellation ('I got everything wrong'). Neither is useful. The honest answer is that the frame was right and the sequence was wrong." },
        ],
      },
      {
        label: 'Three orderings I got wrong',
        body: [
          { type: 'p', text: "Model before users. Features before metrics. Impressiveness before trust. Each cost about a week. All three were avoidable with habits I only formed later." },
        ],
      },
      {
        label: "The evidence I'd use from day one",
        body: [
          { type: 'p', text: "The evidence I'd lean on today is the evidence I generated the hard way — the seven-interview retention swing, the stopwatch session that killed three features, the trust affordances from the CRM. I already have the receipts. Starting again means using them from Monday, not month three." },
        ],
      },
      {
        label: "The version I'd build",
        body: [
          { type: 'p', text: "Here is the version I would build." },
          { type: 'list', items: [
            "Week 1: seven discovery conversations before any model work. A Figma clickthrough that mocks a single 'what should I wear?' answer. Measure one thing: whether people tap again without being prompted.",
            "Week 2: pick the model architecture based on the four-axis exercise — latency, privacy, cost, recovery story — with the answer already leaning on-device but written down, not assumed. Week 2 would probably slip. It always does. I'd build something in week 1 that the interviews partly invalidated, and I'd need time to adjust.",
            "Week 3: build the trust surface — read-back, undo, 'not right? tap to fix' — before the recommendation is good enough to be worth trusting.",
            'Week 4: instrument two numbers — daily active outfits shown, and correction rate — and write the kill condition on day one.',
          ]},
          { type: 'p', text: "The plan isn't really about weeks. It's about the order of bets, and the most important bet is that talking to people before building beats building before talking." },
        ],
      },
      {
        label: "The prediction I can't test",
        body: [
          { type: 'p', text: "This ordering would have shaved several weeks off v1 and made the retention curve rise earlier. The prediction I'll take: it would have made the retro conversations shorter, because the metrics would have been in the plan." },
        ],
      },
      {
        label: "What I'm less sure about now",
        body: [
          { type: 'p', text: "The sequence I've described is the one I'm most confident in. But I keep coming back to one assumption I haven't fully tested: that the week-1 Figma mock works. It assumes users will engage meaningfully with a prototype of a product that doesn't exist yet. Sometimes they do. Sometimes you need a rough real thing before the conversation becomes real." },
          { type: 'p', text: "I keep this list in a note. Some of it I'm confident in. Some of it I've already started to doubt." },
        ],
      },
    ],
    relatedCaseStudies: ['fitwardrobe'],
  },
]

export const getBlogPost = (slug: string) => blogPosts.find((p) => p.slug === slug)

export const blogTagToSlug = (t: string) =>
  t.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

export const allBlogTags = () =>
  Array.from(new Set(blogPosts.flatMap((p) => p.tags))).sort()

export const allBlogCategories = () =>
  Array.from(new Set(blogPosts.map((p) => p.category)))
