# Aryan Panwar — Product Evidence Book & Portfolio
> **Live Site:** [aryanpanwar.in](https://aryanpanwar.in) | **Target Role:** Associate Product Manager / PM (AI-First Teams)

This repository contains the source code, content schemas, and routing layers of my personal **Product Evidence Book**. Unlike a standard developer portfolio, this application is designed as a *Proof of Work* highlighting flagship case studies, structured product thinking, and recruiter-focused PM essays.

---

## 📈 Key Outcomes & Success Metrics
This portfolio was built, audited, and optimized to demonstrate modern growth engineering and search-engine visibility principles:

*   **Largest Contentful Paint (LCP):** Optimized down to **~2.5 seconds** by converting all assets to compressed `.webp` format and implementing custom JSX-to-DOM `{...{ fetchpriority: "high" }}` preload signals on Above-The-Fold hero images.
*   **Search Engine Visibility (SEO):** Achieved clean canonical indexing by standardizing routing paths and ensuring all metadata queries dynamically resolve to `https://aryanpanwar.in` using `react-helmet-async`.
*   **Generative Engine Optimization (GEO):** Optimized for discovery in generative engines (Gemini, Perplexity, ChatGPT) by serving structured, absolute-URL JSON-LD graphs (`Person`, `ProfilePage`, `BlogPosting`, `FAQPage`, `BreadcrumbList`) and enabling crawlers via `robots.txt`.
*   **Crawlable Knowledge Structure:** Served a custom `llms.txt` at the root, mapping out all key project outcomes and takeaways in a token-efficient format tailored for prompt-context windows.

---

## 🛠️ Tech Stack & Architecture

- **Frontend Core:** React 18 + Vite (SPA) for fast, code-split chunk loading.
- **Styling:** Tailwind CSS + custom glassmorphic panels and dark-mode tokens.
- **State & Router:** React Router DOM (v6) with client-side 301-equivalent navigation loops to map legacy HTML pages and prevent broken links.
- **SEO & Injectors:** React Helmet Async for dynamic header management and JSON-LD schema generation.

### Folder Structure
```
├── public/
│   ├── docs/          # Static download assets (e.g., Aryan_Panwar_SWE_Resume.pdf)
│   ├── robots.txt     # Crawler access rules configured for search/AI bots
│   ├── sitemap.xml    # Absolute-link sitemap index for search console
│   └── llms.txt       # AI assistant reading layout
├── src/
│   ├── components/    # Reusable UI parts (Seo.tsx, PageHeader.tsx)
│   ├── content/       # Content schemas (caseStudies.ts, journey.ts, blog.ts)
│   └── pages/         # Page templates and routing views
```

---

## 🧭 Product Strategy & Tradeoffs

### 1. Proof of Work Over Boilerplate
Standard portfolios dump dozens of code repositories. This site prioritizes **evidence**. 
- **The Tradeoff:** Focus is placed on **10 structured essays** and case studies mapping out real PM frameworks (JTBD, RICE prioritization, opportunity trees) applied during the development of shipped products (such as *FitWardrobe* and *Mithivoices*).

### 2. Client-Side SPA Redirects
Single Page Apps often suffer from "soft 404" errors where deleted paths load a blank screen with a 200 OK status. 
- **Solution:** I implemented programmatic redirects in `App.tsx` matching legacy routes (e.g., `/reports/fitwardrobe-case-study.html` redirects instantly to `/case-studies/fitwardrobe`). This preserves inbound link authority (PageRank) from posts shared on DEV.to and other networks.

---

## 💻 Getting Started

Follow these steps to run the portfolio locally:

### 1. Prerequisites
Ensure you have Node.js (v18+) and npm installed.

### 2. Install Dependencies
```sh
npm install
```

### 3. Run Development Server
```sh
npm run dev
```
Open your browser and navigate to `http://localhost:8080`.

### 4. Build Production Bundle
```sh
npm run build
```
The optimized, minified bundle will be generated inside the `dist/` directory.

---

## 👤 Contact & Connect
- **LinkedIn:** [Aryan Panwar](https://www.linkedin.com/in/aryan-panwar1)
- **GitHub:** [@Aryanpanwar10005](https://github.com/Aryanpanwar10005)
- **Product Hunt:** [@aryan_panwar10005](https://www.producthunt.com/@aryan_panwar10005)
- **Email:** [aryanpanwar10005@gmail.com](mailto:aryanpanwar10005@gmail.com)
