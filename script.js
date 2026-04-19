/**
 * Aryan Panwar - Portfolio Core Logic
 * Updated for Redesign v2 (Audit-Informed)
 */

document.addEventListener("DOMContentLoaded", () => {
  // Flag JS as enabled for CSS scoping
  document.documentElement.classList.add("js-enabled");

  // Note: Lucide JS removed in favor of inlined SVGs for Zero-Third-Party performance.

  // Initialize Animation Observer for fade-in effects
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll(".fade-in").forEach((el) => observer.observe(el));

  // Core Modules
  const themeManager = new ThemeManager();
  const navManager = new NavigationManager();
  const typewriter = new Typewriter("typewriter", [
    "Shipped 3 AI Products",
    "Gen AI Engineer",
    "LLMOps Specialist",
    "Agentic AI Developer",
  ]);

  // Start UI Effects
  const cookieConsent = new CookieConsentManager();
  const backToTop = new BackToTop();
  typewriter.start();

  // Skills Toggle Logic
  const skillsToggle = document.getElementById("skillsToggle");
  const skillsWrapper = document.getElementById("skillsWrapper");
  if (skillsToggle && skillsWrapper) {
    skillsToggle.addEventListener("click", () => {
      const isExpanded = skillsWrapper.classList.toggle("expanded");
      const toggleSpan = skillsToggle.querySelector("span");
      
      // Accessibility: Sync ARIA state
      skillsToggle.setAttribute("aria-expanded", isExpanded);

      if (toggleSpan) {
        toggleSpan.textContent = isExpanded
          ? "Show Less Skills"
          : "Show All Skills";
      }

      if (!isExpanded) {
        skillsWrapper.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  }
});

/**
 * Cookie Consent Manager
 */
class CookieConsentManager {
  constructor() {
    this.banner = document.getElementById("cookieBanner");
    this.acceptBtn = document.getElementById("acceptCookies");
    this.storageKey = "aryan_portfolio_cookies_accepted";
    this.init();
  }

  init() {
    if (!this.banner || !this.acceptBtn) return;

    if (!localStorage.getItem(this.storageKey)) {
      setTimeout(() => {
        this.banner.setAttribute("aria-hidden", "false");
      }, 1000);
    }

    this.acceptBtn.addEventListener("click", () => {
      localStorage.setItem(this.storageKey, "true");
      this.banner.setAttribute("aria-hidden", "true");
    });
  }
}

/**
 * Table of Contents Generator (for Blog Posts)
 */
class TOCManager {
  constructor() {
    this.content = document.querySelector(".blog-content");
    this.container = document.querySelector(".blog-container");
    if (!this.content || !this.container) return;
    this.init();
  }

  init() {
    const headings = this.content.querySelectorAll("h2, h3");
    if (headings.length < 3) return; // Only show for longer posts

    const toc = document.createElement("nav");
    toc.className = "blog-toc fade-in";
    toc.setAttribute("aria-label", "Table of contents");
    
    const title = document.createElement("h2");
    title.textContent = "Outline";
    toc.appendChild(title);

    const list = document.createElement("ul");
    headings.forEach((heading, index) => {
      if (!heading.id) {
        heading.id = `section-${index}`;
      }

      const item = document.createElement("li");
      item.className = `toc-${heading.tagName.toLowerCase()}`;
      
      const link = document.createElement("a");
      link.href = `#${heading.id}`;
      link.textContent = heading.textContent;
      
      item.appendChild(link);
      list.appendChild(item);
    });

    toc.appendChild(list);
    this.container.prepend(toc);
    this.observeScroll(toc);
  }

  observeScroll(toc) {
    const sections = this.content.querySelectorAll("h2, h3");
    const links = toc.querySelectorAll("a");
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          links.forEach(link => {
            link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
          });
        }
      });
    }, {
      rootMargin: "-20% 0px -60% 0px",
      threshold: [0, 1]
    });

    sections.forEach(section => observer.observe(section));
  }
}

// Instantiate TOC if on a blog page
if (document.querySelector(".blog-content")) {
  new TOCManager();
}

/**
 * Global Utilities
 */
function shareProfile(platform) {
  const currentUrl = window.location.href;
  const currentTitle = document.title;
  const url = encodeURIComponent(currentUrl);
  const text = encodeURIComponent(`Check out ${currentTitle} — Portfolio of Aryan Panwar`);

  let shareUrl = "";
  switch (platform) {
    case "whatsapp":
      shareUrl = `https://wa.me/?text=${text}%20${url}`;
      break;
    case "native":
      if (navigator.share) {
        navigator.share({
          title: currentTitle,
          text: `Check out this portfolio:`,
          url: currentUrl
        }).catch(console.error);
        return;
      }
      // Fallback for desktop where Web Share is not supported
      shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
      break;
    case "copy":
      const copyBtn = document.getElementById("copyPortfolioBtn");
      navigator.clipboard.writeText(currentUrl).then(() => {
        if (copyBtn) {
          const originalTitle = copyBtn.getAttribute("title");
          const originalIcon = copyBtn.innerHTML;
          
          // Use inlined checkmark SVG instead of Lucide
          copyBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width: 24px; height: 24px;"><polyline points="20 6 9 17 4 12"/></svg>';
          copyBtn.setAttribute("title", "Copied!");
          
          setTimeout(() => {
            copyBtn.innerHTML = originalIcon;
            copyBtn.setAttribute("title", originalTitle);
          }, 2000);
        }
      });
      return;
  }

  if (shareUrl) {
    window.open(shareUrl, "_blank", "noopener,noreferrer");
  }
}

/* ===================================
   Theme Management
   =================================== */
class ThemeManager {
  constructor() {
    this.themeToggle = document.getElementById("themeToggle");
    this.html = document.documentElement;
    this.init();
  }

  init() {
    let savedTheme = "dark";
    try {
      savedTheme = localStorage.getItem("theme") || "dark";
    } catch (e) {
      console.warn("LocalStorage not accessible for theme preference:", e);
    }
    this.applyTheme(savedTheme);

    if (this.themeToggle) {
      this.themeToggle.addEventListener("click", () => {
        const currentTheme = this.html.getAttribute("data-theme");
        const newTheme = currentTheme === "dark" ? "light" : "dark";
        this.applyTheme(newTheme);
      });
    }
  }

  applyTheme(theme) {
    this.html.setAttribute("data-theme", theme);
    try {
      localStorage.setItem("theme", theme);
    } catch (e) {
      // Silently fail for the user, but preserve functionality for the session
    }
  }
}

/* ===================================
   Navigation & Scroll Logic
   =================================== */
class NavigationManager {
  constructor() {
    this.navbar = document.getElementById("navbar");
    this.menuBtn = document.getElementById("mobile-menu-btn");
    this.menuOverlay = document.getElementById("mobile-menu");
    this.body = document.body;
    this.lastScrollY = window.scrollY;

    this.init();
  }

  init() {
    // Cache section offsets for scroll spy
    this.cacheSectionOffsets();
    window.addEventListener(
      "resize",
      () => {
        this.cacheSectionOffsets();
      },
      { passive: true },
    );

    // Scroll Listeners via requestAnimationFrame
    this.ticking = false;
    window.addEventListener(
      "scroll",
      () => {
        if (!this.ticking) {
          window.requestAnimationFrame(() => {
            this.handleNavbarScroll();
            this.handleScrollSpy();
            this.ticking = false;
          });
          this.ticking = true;
        }
      },
      { passive: true },
    );

    // Mobile Menu Toggle
    if (this.menuBtn) {
      this.menuBtn.addEventListener("click", () => this.toggleMobileMenu());
    }

    // Smooth Scroll for Anchors
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", (e) => {
        const href = anchor.getAttribute("href");
        // Ignore bare '#' or empty/single-char hrefs (invalid selectors)
        if (!href || href.length <= 1) return;
        e.preventDefault();
        let target;
        try {
          target = document.querySelector(href);
        } catch (_) {
          return; // Invalid selector — bail out
        }
        if (target) {
          if (
            this.menuOverlay &&
            this.menuOverlay.classList.contains("active")
          ) {
            this.toggleMobileMenu();
          }
          target.scrollIntoView({ behavior: "smooth" });
        }
      });
    });

    // Close on Esc
    document.addEventListener("keydown", (e) => {
      if (
        e.key === "Escape" &&
        this.menuOverlay?.classList.contains("active")
      ) {
        this.toggleMobileMenu();
      }
    });

    // Close on click outside
    document.addEventListener("click", (e) => {
      if (
        this.menuOverlay?.classList.contains("active") &&
        !this.menuOverlay?.contains(e.target) &&
        !this.menuBtn?.contains(e.target)
      ) {
        this.toggleMobileMenu();
      }
    });
  }

  cacheSectionOffsets() {
    this.sections = Array.from(document.querySelectorAll("section[id]")).map(
      (section) => ({
        id: section.getAttribute("id"),
        top: section.offsetTop,
        height: section.offsetHeight,
      }),
    );
  }

  handleNavbarScroll() {
    if (!this.navbar) return;
    const currentScroll = window.scrollY;

    // Background blur/border on scroll
    if (currentScroll > 50) {
      this.navbar.classList.add("scrolled");
    } else {
      this.navbar.classList.remove("scrolled");
    }

    // Hide/Show on scroll direction
    if (currentScroll > 500) {
      if (currentScroll > this.lastScrollY) {
        this.navbar.classList.add("hidden");
      } else {
        this.navbar.classList.remove("hidden");
      }
    } else {
      this.navbar.classList.remove("hidden");
    }

    this.lastScrollY = currentScroll;
  }

  handleScrollSpy() {
    const navLinks = document.querySelectorAll(".nav-link");
    const scrollPos = window.scrollY + 200; // Offset for better detection

    let currentSection = "";

    if (this.sections) {
      for (const section of this.sections) {
        if (
          scrollPos >= section.top &&
          scrollPos < section.top + section.height
        ) {
          currentSection = section.id;
        }
      }
    }

    if (currentSection) {
      navLinks.forEach((link) => {
        link.classList.toggle(
          "active",
          link.getAttribute("href") === `#${currentSection}`,
        );
      });
    }
  }

  toggleMobileMenu() {
    if (!this.menuOverlay || !this.menuBtn) return;
    const isActive = this.menuOverlay.classList.toggle("active");
    this.menuBtn.classList.toggle("active");
    this.body.style.overflow = isActive ? "hidden" : "";
    this.menuBtn.setAttribute("aria-expanded", isActive);
  }
}

/* ===================================
   Typewriter Effect
   =================================== */
class Typewriter {
  constructor(elementId, phrases, typeSpeed = 100, waitTime = 2000) {
    this.element = document.getElementById(elementId);
    this.phrases = phrases;
    this.typeSpeed = typeSpeed;
    this.waitTime = waitTime;
    this.currentPhraseIndex = 0;
    this.currentText = "";
    this.isDeleting = false;
  }

  start() {
    this.tick();
  }

  tick() {
    if (!Array.isArray(this.phrases) || this.phrases.length === 0) {
      return;
    }

    const currentPhrase = this.phrases[this.currentPhraseIndex];
    if (typeof currentPhrase !== "string") {
      return;
    }

    if (this.isDeleting) {
      this.currentText = currentPhrase.substring(
        0,
        this.currentText.length - 1,
      );
    } else {
      this.currentText = currentPhrase.substring(
        0,
        this.currentText.length + 1,
      );
    }

    if (this.element) {
      this.element.textContent = this.currentText;
    }

    let delta = this.typeSpeed;
    if (this.isDeleting) delta /= 2;

    if (!this.isDeleting && this.currentText === currentPhrase) {
      delta = this.waitTime;
      this.isDeleting = true;
    } else if (this.isDeleting && this.currentText === "") {
      this.isDeleting = false;
      this.currentPhraseIndex =
        (this.currentPhraseIndex + 1) % this.phrases.length;
      delta = 500;
    }

    setTimeout(() => this.tick(), delta);
  }
}

/**
 * Back to Top Manager
 */
class BackToTop {
  constructor() {
    this.btn = document.getElementById("backToTop");
    this.threshold = 500;
    this.init();
  }

  init() {
    if (!this.btn) return;

    window.addEventListener("scroll", () => {
      if (window.scrollY > this.threshold) {
        this.btn.classList.add("visible");
      } else {
        this.btn.classList.remove("visible");
      }
    });

    this.btn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }
}
