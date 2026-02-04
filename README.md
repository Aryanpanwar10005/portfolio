# Aryan Panwar - Portfolio Website

A professional, technically minimalist portfolio website for an Embedded Systems Engineer. Designed to showcase projects, skills, and experience with engineering precision.

![Portfolio Preview](preview-tbd.png)

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
- **Icons**: [Lucide](https://lucide.dev/) for consistent, clean iconography.

## 📁 Project Structure

```
portfolio/
├── index.html          # Main HTML entry point
├── styles.css          # Design system & component styles
├── script.js           # Core logic (nav, scroll, animations)
├── CNAME               # Custom domain config for GitHub Pages
├── sitemap.xml         # SEO sitemap
├── robots.txt          # Crawler instructions
└── README.md           # Documentation
```

## 🚀 Deployment

### GitHub Pages (Recommended)

1. **Repository Setup**:
   Ensure this folder is the root of your repository or set GitHub Pages to publish from the `/portfolio` folder if it's a subfolder.

2. **Custom Domain**:
   The `CNAME` file is already configured for `aryanpanwar.in`.

   **DNS Configuration:**
   - **A Records:** 185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153
   - **CNAME Record:** `www` pointing to `YourUsername.github.io`

### Local Development

1. Open `index.html` in any browser.
2. For optimal experience, use a local server like Live Server in VS Code to ensure smooth loading of modules/fonts.

## ♿ Accessibility Features

- **Semantic HTML**: Proper use of `<nav>`, `<main>`, `<section>`, `<article>`.
- **Keyboard Navigation**: Full focus management, visible focus indicators.
- **Color Contrast**: Compliant with WCAG AA standards.
- **Reduced Motion**: Respects user system preferences.
- **Screen Reader Friendly**: ARIA labels on interactive elements.

## 📄 License

Open Source. Use as you please, but credit is appreciated.

---

**Built by Aryan Panwar**  
[aryanpanwar.in](https://aryanpanwar.in)
