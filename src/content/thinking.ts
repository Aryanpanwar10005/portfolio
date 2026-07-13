export type ThinkingStep = {
  key: string;
  label: string;
  body: string;
};

export const thinkingSteps: ThinkingStep[] = [
  {
    key: "discover",
    label: "Discover",
    body: "Sit in the problem. Interview users, read support tickets, watch session replays. Assume nothing.",
  },
  {
    key: "define",
    label: "Define",
    body: "Compress the noise into a single problem statement. If it takes more than a sentence, the thinking is not done.",
  },
  {
    key: "prioritize",
    label: "Prioritize",
    body: "Score against outcome and effort. Cut ruthlessly. What you say no to defines you.",
  },
  {
    key: "design",
    label: "Design",
    body: "Sketch the smallest wedge that could prove the insight. Get it in front of users on paper before pixels.",
  },
  {
    key: "build",
    label: "Build",
    body: "Pair tightly with engineering. Own the tradeoffs. Ship the v1, not the v3.",
  },
  {
    key: "measure",
    label: "Measure",
    body: "Instrument the funnel before launch. Look at behaviour, not opinions. Watch cohorts, not totals.",
  },
  {
    key: "iterate",
    label: "Iterate",
    body: "Kill what did not work. Double down on what did. Write down what you learned so the team compounds.",
  },
];