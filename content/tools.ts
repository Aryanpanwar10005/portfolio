// PM toolkit — how I think, prioritise, and communicate.
export const pmToolkit = [
  "Notion",
  "Figma",
  "FigJam",
  "Linear",
  "Jira",
  "Amplitude",
  "Mixpanel",
  "Miro",
];

// Technical fluency — the stack I reach for when a wedge needs a prototype.
export const technicalFluency = [
  "LangChain",
  "LangGraph",
  "Python",
  "TypeScript",
  "React / Next.js",
  "Groq / Cerebras",
  "OpenAI / Anthropic APIs",
  "TensorFlow Lite",
];

// Flat list used by legacy hero component.
export const tools = [...pmToolkit, ...technicalFluency].slice(0, 10);

export const values = [
  "User First",
  "Evidence Over Opinion",
  "Ship to Learn",
  "Restraint is a Feature",
];

export const contactLinks = {
  email: "aryanpanwar10005@gmail.com",
  linkedin: "https://www.linkedin.com/in/aryan-panwar1",
  github: "https://github.com/Aryanpanwar10005",
  website: "https://aryanpanwar.in",
  location: "Meerut, UP, India",
  scholar: "https://scholar.google.com/citations?view_op=list_works&hl=en&user=a4rB-NMAAAAJ",
  orcid: "https://orcid.org/0009-0002-4793-4364",
  researchgate: "https://www.researchgate.net/profile/Aryan-Panwar-7",
  twitter: "https://x.com/aryan_panwar1",
  producthunt: "https://www.producthunt.com/@aryan_panwar10005",
  resume: "/resume",
};

export const publications = [
  {
    title:
      "Automated Dual-Spot Wireless Charging and Parking Management System for Electric Vehicles",
    venue: "JETIR — Journal of Emerging Technologies and Innovative Research",
    meta: "Vol 13 · Issue 4 · April 2026 · Impact Factor 7.95 · ISSN 2349-5162",
    url: "http://www.jetir.org/view?paper=JETIR2604872",
    note: "1st place — College Branch Expo. IPT-based prototype at 85% wireless charging efficiency.",
  },
];

export const researchProfiles = [
  { label: "Google Scholar", url: contactLinks.scholar },
  { label: "ORCID", url: contactLinks.orcid },
  { label: "ResearchGate", url: contactLinks.researchgate },
];