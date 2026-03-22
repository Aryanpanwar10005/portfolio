# Aryan Panwar - Portfolio Website

A professional, technically minimalist portfolio website for an Embedded Systems & Software Engineer. Designed to showcase projects, skills, and experience with engineering precision while achieving top-tier performance and AI search readiness.

![Portfolio Preview](assets/img/og-image.jpg)

## ⚡ Performance & Search Optimization

- **Core Web Vitals**: Fully optimized for fast load times, minimal blocking resources, and zero forced reflows.
- **Generative Engine Optimization (GEO)**: AI-first architecture, including `llms.txt`, full Schema.org markup (Organization, Person, Article, FAQ), and optimized crawler rules in `robots.txt` ensuring AI engine visibility.
- **Self-Hosted Assets**: All external libraries, icons and fonts (Lucide, DevIcons) are self-hosted to prevent external latency and redirect chains.
- **Semantic Structure**: Accessibility-first approach with rigorous validity checks.

## 🎨 Design Philosophy: Technical Minimalism

- **Aesthetic**: Engineering blueprint style, dark mode centric.
- **Typography**: `JetBrains Mono` (headings) for code-like readability, `IBM Plex Sans` (body) for clarity.
- **Color Palette**:
  - Deep Navy Background (`#0A0E27`)
  - Cyan Accents (`#00D9FF`) for focus points
  - Muted Slate for secondary text
- **Interactions**: Subtle, purposeful animations. No unnecessary distractions.

## 🛠️ Tech Stack

- **HTML5**: Semantic structure, accessibility-first approach.
- **CSS3**: Custom properties (variables), Flexbox/Grid layout, responsive design.
- **JavaScript**: Vanilla JS (ES6+), minimalist logic, zero dependencies.
- **Icons**: Self-hosted Lucide and DevIcons for maximum performance.

## 📁 Project Structure

```text
portfolio/
├── index.html          # Main HTML entry point
├── styles.css          # Design system & component styles
├── script.js           # Core logic (nav, scroll, animations)
├── blog/               # Technical blog & SEO articles
├── assets/             # Self-hosted images, icons, and documents
├── reports/            # Performance and validation reports
├── CNAME               # Custom domain config for GitHub Pages
├── sitemap.xml         # XML Sitemap
├── robots.txt          # Crawler instructions & AI bot whitelist
├── llms.txt            # Markdown documentation optimized for LLM crawlers
└── README.md           # Project Documentation
```

## 🚀 Deployment

### GitHub Pages (Recommended)

1. **Repository Setup**:
   Ensure this folder is the root of your repository.

2. **Custom Domain**:
   The `CNAME` file is already configured for `aryanpanwar.in`.

   **DNS Configuration:**
   - **A Records:** `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - **CNAME Record:** `www` pointing to `YourUsername.github.io`

### Local Development

1. Open `index.html` in any modern browser.
2. For optimal experience, use a local server like Live Server in VS Code to ensure smooth loading of resources and avoid CORS issues.

## ♿ Accessibility Features

- **Semantic HTML**: Proper use of `<nav>`, `<main>`, `<section>`, `<article>`.
- **Keyboard Navigation**: Full focus management, visible focus indicators.
- **Color Contrast**: Compliant with WCAG AA standards.
- **Reduced Motion**: Respects user system preferences (`prefers-reduced-motion`).
- **Screen Reader Friendly**: ARIA labels on interactive elements and hidden textual alternatives.

## 📄 License

Open Source. Use as you please, but credit is appreciated.

---

**Built by Aryan Panwar**  
[aryanpanwar.in](https://aryanpanwar.in)
