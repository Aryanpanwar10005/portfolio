export type PlaybookEntry = {
  slug: string;
  number: string;
  title: string;
  project: string;
  summary: string;
  whenToUse: string;
  steps: string[];
  template?: string;
};

// "My Product Thinking" — every entry is grounded in a real project I shipped.
export const playbook: PlaybookEntry[] = [
  {
    slug: "jtbd-fitwardrobe",
    number: "01",
    title: "Jobs-to-be-Done, applied to FitWardrobe",
    project: "FitWardrobe",
    summary:
      "How I moved FitWardrobe from ‘another closet app’ to a morning ritual by rewriting the job around the user's actual outcome.",
    whenToUse:
      "When your product looks like a category (‘another CRM’, ‘another closet app’) and users bounce despite feature parity.",
    steps: [
      "Wrote 3 candidate jobs. Killed the two that described features instead of outcomes.",
      "Interviewed 20 users about the last time they picked an outfit, not the ideal one.",
      "Rewrote the home screen around the job: ‘Help me leave the house feeling put together in under 30 seconds.’",
      "Killed everything on the roadmap that didn’t serve that job — including a shopping tab I had already prototyped.",
    ],
  },
  {
    slug: "rice-mithivoices",
    number: "02",
    title: "RICE prioritization, applied to Mithivoices",
    project: "Mithivoices",
    summary:
      "Scoring an OSS backlog of 40+ modules against one axis: does this reduce time-to-first-agent for a stranger?",
    whenToUse:
      "When the backlog has more than 15 items, contributors are pulling in different directions, and the loudest voice keeps winning.",
    steps: [
      "Framed Reach as ‘% of new contributors who hit this within a week’.",
      "Framed Impact on a 0.25 → 3 scale tied to the reference agent’s latency.",
      "Divided by realistic dev weeks — mine and contributors’.",
      "Published the sheet in the repo so contributors could argue with it, not around it.",
    ],
  },
  {
    slug: "opportunity-tree-seo-geo",
    number: "03",
    title: "Opportunity solution trees, applied to SEO-GEO Optimizer",
    project: "SEO-GEO Optimizer",
    summary:
      "How I stopped jumping to solutions and mapped the AI-search space into opportunities before writing any code.",
    whenToUse:
      "When the team is arguing about solutions before agreeing on the outcome, or when a category is new and the mental model is fuzzy.",
    steps: [
      "Named the outcome: ‘Sites cited by AI answer engines.’",
      "Mapped opportunities beneath it: structured data, answer-shape prose, llms.txt, freshness signals.",
      "Branched 2–3 solutions per opportunity, killed the ones that already had good OSS.",
      "Ran the riskiest assumption first (‘will devs install a package for this?’) before touching the JSON-LD generator.",
    ],
  },
  {
    slug: "north-star-credex",
    number: "04",
    title: "North-star + counter-metrics, applied to Credex",
    project: "Credex Spend Audit",
    summary:
      "Choosing a metric that only goes up when the customer actually wins — and the counter-metrics that keep it honest.",
    whenToUse:
      "At the start of a quarter, or when the dashboard has 40 charts and no answer.",
    steps: [
      "Picked ‘Dollars of Verified Savings Surfaced’ as the north star.",
      "Decomposed into audit completion rate, time to first report, and savings per audit.",
      "Added counter-metrics: false-positive rate, and % of savings that customers rejected.",
      "Reviewed weekly; recalibrated the range quarterly, not the metric.",
    ],
  },
  {
    slug: "discovery-hcp-crm",
    number: "05",
    title: "Discovery interviews, applied to AI-First CRM",
    project: "AI-First CRM (HCP)",
    summary:
      "How I ran problem-space interviews with field reps without leading the witness — and what I threw away because of them.",
    whenToUse:
      "Before writing a PRD, before scoping, whenever the team is arguing about what the user wants.",
    steps: [
      "Wrote 5 assumptions I was testing. Refused to move on until each one had a falsification test.",
      "Recruited 8 reps who actually used a CRM daily. Skipped managers on purpose.",
      "Asked about the last visit, not the ideal one. Behavioural, not hypothetical.",
      "Synthesized into 3 insights, each backed by 2+ quotes. Everything else got parked, not shipped.",
    ],
  },
  {
    slug: "ai-tradeoffs",
    number: "06",
    title: "AI product tradeoffs I actually made",
    project: "Across FitWardrobe, Mithivoices, HCP CRM",
    summary:
      "On-device vs cloud, eval design, latency vs quality — the concrete decisions I made, and what would make me revisit them.",
    whenToUse:
      "Any AI feature above one engineering week, before writing the PRD.",
    steps: [
      "FitWardrobe: chose on-device vision for privacy + latency; would revisit if attribute quality plateaus.",
      "Mithivoices: chose latency ceiling as a hard constraint; every quality upgrade must fit under 500ms E2E.",
      "HCP CRM: chose draft-and-confirm over autonomy; would revisit only after acceptance rate stays above 85% for a quarter.",
      "Wrote a one-page decision log per tradeoff — with the ‘change our mind’ trigger written first, not last.",
    ],
  },
];

export const getPlaybookEntry = (slug: string) =>
  playbook.find((p) => p.slug === slug);