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
const coverDoubleClick = '/assets/blog/double-click-test.webp'

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
      'A double-click once created two donations in a system my team built. An AI agent paying over UPI can make the same mistake every time it retries. Here is the acceptance criterion we added, what idempotency means in plain words, and six questions I would put in any spec for an agent that can spend money.',
    category: 'AI Product',
    tags: ['AI Product', 'Agentic AI', 'Requirements', 'Acceptance Criteria', 'Payments'],
    readingTime: '5 min read',
    publishedAt: 'Oct 26, 2026',
    publishedAtISO: '2026-10-26',
    cover: coverDoubleClick,
    coverAlt: 'Illustration: a phone lock screen showing four identical ₹500 payment notifications, three of them marked retry',
    takeaways: [
      'A duplicate record is rarely a screen bug. It is a missing rule about what counts as the same request.',
      'People repeat a request by accident, once. Agents repeat it by design, every time a call times out.',
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
          { type: 'p', text: 'A person double-clicks by accident, once. An agent repeats a request on purpose. When a payment call times out, many agents simply try again, because from where they sit the first attempt might have failed. Sometimes it did. Often the payment went through and only the reply got lost.' },
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
          { type: 'p', text: 'Most of the work in that build challenge was not the screens. It was finding the rules nobody had written down. Agents raise the stakes on those rules: an agent follows the spec exactly, and where the spec is silent it repeats the same mistake quickly.' },
          { type: 'p', text: 'If I were writing the spec for an agent that can pay, the double-click test would go in before any prompt.' },
        ],
      },
    ],
  },
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
    publishedAt: 'Aug 4, 2026',
    publishedAtISO: '2026-08-04',
    cover: coverDiscovery,
    coverAlt: 'Editorial illustration: hangers behind a magnifying lens on deep-wine background',
    takeaways: [
      "The clever technical bet - on-device classification - was never the product. Daily outfit anxiety was.",
      'Seven un-facilitated conversations changed the roadmap more than three weeks of building.',
      "The version I shipped had less functionality than the one I originally spec'd, and held onto users better.",
    ],
    sections: [
      {
        label: 'How it started',
        body: [
          { type: 'p', text: "FitWardrobe is a fashion assistant that classifies clothing on the user's phone - no cloud, no login. I built it because on-device inference was the interesting engineering problem, and I wanted to prove I could ship a real TFLite model to a real user without a GPU bill." },
          { type: 'p', text: "The first person I showed it to looked at the screen for a few seconds, said 'oh cool,' and put her phone down. I kept talking for another minute before I realized she was done." },
        ],
      },
      {
        label: 'What I got wrong first',
        body: [
          { type: 'p', text: "V0 could tell you a shirt was a shirt. It could not tell you what to wear on Tuesday. I had built a capable classifier and called it a product, and the first five people I showed it to were polite about it in the way that friends are polite about a bad haircut." },
          { type: 'p', text: "The actual pain - the reason people spend ten minutes staring at a closet at 8 a.m. - wasn't 'I don't know what this garment is.' It was 'I don't know what these garments look like together, given the weather, given the meeting, given yesterday.' My classifier answered a question nobody was asking." },
          { type: 'p', text: "The scale of this problem is bigger than I realised at the time. A Marks & Spencer consumer survey of 2,000 adults found the average person spends 17 minutes every morning deciding what to wear - that's 103 hours a year, more than two full work weeks (marksandspencer.com). The problem isn't a lack of clothes. It's a memory and retrieval problem." },
        ],
      },
      {
        label: 'Seven conversations',
        body: [
          { type: 'p', text: "I stopped shipping for two weeks and ran seven interviews - nothing formal, just fifteen minutes and one prompt: 'walk me through the last time you couldn\'t decide what to wear.' I did not show them the app. I did not defend the app. I only listened." },
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
          { type: 'p', text: "I had to choose between two products. Product A kept the classifier as the hero and layered outfit-building on top - protecting my sunk cost. Product B demoted the classifier to a silent helper and made the hero surface a single button: 'what should I wear today?'" },
          { type: 'p', text: "I chose B. It meant most of the visible AI I had built became invisible. The demo would be less impressive to other engineers and more useful to actual people. I wrote 'make it boring' at the top of the new spec. I hated writing it. I shipped it nine days later." },
        ],
      },
      {
        label: 'What actually happened',
        body: [
          { type: 'p', text: "The scoped-down v1 shipped in nine days. Day-7 retention with the same test group moved from roughly one in five to closer to three in five. The classifier still ran on every photo - but nobody talked about it, because they were too busy telling me the app 'just knew' what to suggest." },
          { type: 'p', text: 'The engineering had not changed. The product had.' },
          { type: 'p', text: "Six months later, with zero paid ads, FitWardrobe reached 20,800 impressions and 315 clicks (1.5% CTR, avg position 14.9) through organic search alone - reflecting organic search demand for solving daily wardrobe retrieval rather than another image classifier." },
        ],
      },
      {
        label: "What I'm still figuring out",
        body: [
          { type: 'p', text: "The mistake I keep re-learning: I fell for my own cleverness. On-device inference was a real advantage, but it was an implementation detail, not a value proposition. Users don't care where the model runs. They care whether the answer is right, fast, and doesn't make them feel stupid." },
          { type: 'p', text: "I still open editors too fast. The two-week pause before FitWardrobe's pivot was the only time I stopped myself - and I had to make myself do it." },
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
    slug: 'success-metrics-before-features',
    title: 'Why Every Product Needs Success Metrics Before Features',
    question: 'How do I know a feature is successful?',
    takeaway: 'He thinks in outcomes.',
    summary:
      'The Credex feature I almost shipped without a definition of \"worked\" - and the two-column doc I now use so I never do that again.',
    category: 'Metrics',
    tags: ['Metrics', 'North Star', 'KPIs', 'Outcomes', 'Credex'],
    readingTime: '6 min read',
    publishedAt: 'Jul 21, 2026',
    publishedAtISO: '2026-07-21',
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
          { type: 'p', text: "Credex is a spend-audit app for engineering managers - you connect your SaaS subscriptions and it flags overlap and savings. One of the earliest requests was a 'share this report' feature. It came through a Slack message from a beta user who had copy-pasted their report into an email to their CFO and asked if we could make that easier. Three people in the thread said 'yes ship this.' I put it on the roadmap before I had a success metric." },
          { type: 'p', text: "That's the problem." },
        ],
      },
      {
        label: "The sentence I couldn't finish",
        body: [
          { type: 'p', text: "We were three days from starting when I noticed I couldn't answer 'how will we know if we should keep it?' Nobody in the conversation could. We were about to build something we couldn't evaluate." },
          { type: 'p', text: "Without a success metric, 'worked' gets defined by whoever needed the feature to have worked - usually me, three weeks later, defending the build." },
        ],
      },
      {
        label: 'Two different features wearing the same name',
        body: [
          { type: 'p', text: "I looked at the surface I actually cared about - reports created per active user - and asked what a share feature was supposed to move. Two candidate outcomes: more reports created by invited teammates, or higher return-visit rate for the original author. The two candidates were not the same product." },
          { type: 'p', text: 'That was the moment the feature stopped being obvious. It had been carrying two contradictory jobs in the same name.' },
        ],
      },
      {
        label: 'The two-column table',
        body: [
          { type: 'p', text: "I picked outcome A - teammate-created reports - because it mapped to the North Star metric (audits completed per week). I wrote it into the spec as a two-column table: outcome metric on the left, guardrail on the right." },
          { type: 'list', items: [
            'Outcome: a meaningful increase in weekly reports created via share link, measured three weeks after launch.',
            "Guardrail: no drop in report completion rate - if people share half-finished audits and never come back, we've made the product feel worse.",
            'Kill decision: if outcome misses AND guardrail regresses, the feature comes out. No debate.',
          ]},
          { type: 'p', text: "The guardrail was the one we argued about. An engineer thought 'no drop in completion rate' was too conservative. I didn't budge. Looking back, he was probably right to push and I was right to hold. Both things can be true." },
        ],
      },
      {
        label: 'What the data showed',
        body: [
          { type: 'p', text: "The share feature shipped in a week. Reports created via share links rose, but not enough to call it a clear win. The guardrail held. We kept the feature and scoped a follow-up to fix where the loop was leaking - an invite state that let recipients start where the sharer left off." },
          { type: 'p', text: "The target wasn't hit. The framework still worked, because it turned a feel-good feature into a testable one and told us what to build next." },
        ],
      },
      {
        label: 'The trade-off I still watch',
        body: [
          { type: 'p', text: "Defining a metric feels like tempting fate. If you don't name a number, nothing 'fails.' That comfort is exactly why teams under-ship on outcomes." },
          { type: 'p', text: "I still find the conversation uncomfortable when it's a feature I want to build. The two-column table doesn't fix that - it just makes the discomfort visible, which is a different thing. If I built Credex from scratch, the table would be the first block in every PRD, above the problem statement." },
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
      'A short list of things I built, shipped, then deleted from FitWardrobe - and what each removal taught me about the difference between a capability and a product.',
    category: 'Prioritization',
    tags: ['Prioritization', 'Say No', 'FitWardrobe', 'Simplicity'],
    readingTime: '5 min read',
    publishedAt: 'Jul 24, 2026',
    publishedAtISO: '2026-07-24',
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
          { type: 'p', text: "I watched five session recordings back-to-back. Users hit the 'what should I wear?' button first every time. The manual outfit builder averaged one visit per week per user. The style score got a single tap per install. The palette suggester had a very low completion rate - people opened it, got confused, and left." },
          { type: 'p', text: "In the fifth recording, a user opened the style score, stared at it for a few seconds, and navigated away. Not confused - uninterested. That was worse." },
          { type: 'p', text: 'None of that was in a dashboard. It took an hour with a stopwatch to see.' },
        ],
      },
      {
        label: 'What I cut and why',
        body: [
          { type: 'p', text: "I removed all three. Not hidden behind a flag - removed. The style score was the one that hurt. I had spent a weekend on the scoring rubric. When I removed it, nobody emailed to ask where it went. That was the answer." },
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
          { type: 'p', text: "Session length dropped. Weekly return rate climbed over the following month. The support message I feared - 'where did X go?' - arrived twice, from the same person, both times about the outfit builder. I sent a two-line explanation and heard nothing back." },
          { type: 'p', text: 'The app got smaller and started working harder.' },
        ],
      },
      {
        label: 'The pattern I keep watching for',
        body: [
          { type: 'p', text: "The feature I'm proudest of is often the one obscuring the feature that actually earns return visits. My taste is a lagging indicator; user behaviour is the real one." },
          { type: 'p', text: 'If I had run the stopwatch session at v0.5, I would have caught this a month earlier. The tool that made the difference was not analytics - it was thirty minutes of watching someone use the app without commentary.' },
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
      'Why FitWardrobe runs its model on the phone even though the cloud version would be more accurate - a real trade-off table, not a manifesto.',
    category: 'AI Product',
    tags: ['AI Product', 'On-Device AI', 'Trade-offs', 'Privacy', 'FitWardrobe'],
    readingTime: '7 min read',
    publishedAt: 'Jul 28, 2026',
    publishedAtISO: '2026-07-28',
    cover: coverLocalVsCloud,
    coverAlt: 'Editorial illustration: phone and cloud connected by a balance line',
    takeaways: [
      'On-device was a product decision dressed as a technical one - the value was UX and trust, not cost.',
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
          { type: 'p', text: "I ran benchmarks. The cloud model was more accurate - measurably, not marginally. The on-device model was faster - not by a small amount, by a factor that changed whether the interaction felt instant or laggy. The cost difference mattered less than I expected." },
          { type: 'p', text: "Then I asked the questions the benchmark couldn't answer. What happens on a subway with no signal? What does a user assume we're doing with their bedroom photos? How do we roll back a bad model version? What's our story when accuracy drops on darker fabrics - a known failure mode for most vision models?" },
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
          { type: 'p', text: "On-device shipped. The thing I gave up - accuracy - became a training signal through the correction button. The axis I lost on was the one that compounded." },
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
    slug: 'if-i-started-fitwardrobe-again',
    title: 'If I Started FitWardrobe Again Today',
    question: 'Can I reflect on my work and improve?',
    takeaway: 'He learns from experience.',
    summary:
      'A short, honest audit of what I would build differently on FitWardrobe if I got to start over on a Monday morning - no revisionism, only the mistakes I can actually name.',
    category: 'Reflection',
    tags: ['Reflection', 'FitWardrobe', 'Lessons', 'MVP'],
    readingTime: '5 min read',
    publishedAt: 'Aug 14, 2026',
    publishedAtISO: '2026-08-14',
    updatedAtISO: '2026-08-15',
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
          { type: 'p', text: "The frame was validated by more than just my interviews. Movinga's global audit of 18,000 households across 20 countries showed that the vast majority of closet items go unworn for over a year (movinga.com). The product bet was right. The build sequence was wrong." },
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
          { type: 'p', text: "The evidence I'd lean on today is the evidence I generated the hard way - the seven-interview retention swing, the stopwatch session that killed three features, the trust affordances from the CRM. I already have the receipts. Starting again means using them from Monday, not month three." },
        ],
      },
      {
        label: "The version I'd build",
        body: [
          { type: 'p', text: "Here is the version I would build." },
          { type: 'list', items: [
            "Week 1: seven discovery conversations before any model work. A Figma clickthrough that mocks a single 'what should I wear?' answer. Measure one thing: whether people tap again without being prompted.",
            "Week 2: pick the model architecture based on the four-axis exercise - latency, privacy, cost, recovery story - with the answer already leaning on-device but written down, not assumed. Week 2 would probably slip. It always does. I'd build something in week 1 that the interviews partly invalidated, and I'd need time to adjust.",
            "Week 3: build the trust surface - read-back, undo, 'not right? tap to fix' - before the recommendation is good enough to be worth trusting.",
            'Week 4: instrument two numbers - daily active outfits shown, and correction rate - and write the kill condition on day one.',
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
