export type PlaybookEntry = {
  slug: string;
  number: string;
  title: string;
  project: string;
  summary: string;
  whenToUse: string;
  steps: string[];
  template?: string;
  publishedAtISO?: string;
};

// "My Product Thinking" - every entry is grounded in a real project I shipped.
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
      "Killed everything on the roadmap that didn’t serve that job - including a shopping tab I had already prototyped.",
    ],
  },
  {
    slug: "rice-mithivoices",
    number: "02",
    title: "RICE prioritization, applied to Mithivoices",
    project: "Mithivoices",
    summary:
      "How to score an open-source backlog against one axis: does this reduce time-to-first-agent for a stranger?",
    whenToUse:
      "When the backlog has more than 15 items, contributors are pulling in different directions, and the loudest voice keeps winning.",
    steps: [
      "Frame Reach as the share of new contributors who would hit this item within a week.",
      "Frame Impact on a 0.25 → 3 scale tied to time-to-first-agent.",
      "Divide by realistic dev weeks, counting your own time honestly.",
      "Publish the sheet in the repo, so contributors can argue with it instead of around it.",
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
      "Choosing a metric that only goes up when the customer actually wins - and the counter-metrics that keep it honest.",
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
    title: "Discovery interviews: the plan for AI-First CRM",
    project: "AI-First CRM (HCP)",
    summary:
      "The interview plan I would run before piloting the AI-First CRM prototype: test assumptions, not opinions. The prototype was built without access to reps, so this plan has not been run yet.",
    whenToUse:
      "Before writing a PRD, before scoping, whenever the team is arguing about what the user wants.",
    steps: [
      "Write down the 5 assumptions being tested, each with a result that would prove it wrong.",
      "Recruit about 8 reps who use a CRM every day. Leave managers out of the first round on purpose.",
      "Ask about the last visit, not the ideal one: behaviour, not hypotheticals.",
      "Synthesize into a few insights, each backed by at least 2 quotes. Park everything else.",
    ],
  },
  {
    slug: "ai-tradeoffs",
    number: "06",
    title: "AI product tradeoffs I actually made",
    project: "Across FitWardrobe, Mithivoices, HCP CRM",
    summary:
      "On-device vs cloud, eval design, latency vs quality - the concrete decisions I made, and what would make me revisit them.",
    whenToUse:
      "Any AI feature above one engineering week, before writing the PRD.",
    steps: [
      "FitWardrobe: chose on-device vision for privacy + latency; would revisit if attribute quality plateaus.",
      "Mithivoices: chose latency ceiling as a hard constraint; every quality upgrade must fit under 500ms E2E.",
      "HCP CRM: chose draft-and-confirm over autonomy; would revisit only after acceptance rate stays above 85% for a quarter.",
      "Wrote a one-page decision log per tradeoff - with the ‘change our mind’ trigger written first, not last.",
    ],
  },
];

export const getPlaybookEntry = (slug: string) =>
  playbook.find((p) => p.slug === slug);