/**
 * Aryan Panwar - Portfolio Core Logic
 * Updated for Redesign v2 (Audit-Informed)
 */

document.addEventListener('DOMContentLoaded', () => {
    // Flag JS as enabled for CSS scoping
    document.documentElement.classList.add('js-enabled');

    // Initialize Lucide Icons with safety guard
    if (typeof lucide !== 'undefined' && typeof lucide.createIcons === 'function') {
        lucide.createIcons();
    } else {
        console.warn('Lucide icons library not loaded or incompatible.');
    }

    // Initialize Animation Observer for fade-in effects
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

    // Core Modules
    const themeManager = new ThemeManager();
    const navManager = new NavigationManager();
    const typewriter = new Typewriter('typewriter', [
        'ECE Engineer & Product Builder',
        'AI Explorer',
        'Bridging Hardware & AI',
        'Open Source Contributor'
    ]);

    // Start UI Effects
    typewriter.start();
});

/* ===================================
   Theme Management
   =================================== */
class ThemeManager {
    constructor() {
        this.themeToggle = document.getElementById('themeToggle');
        this.html = document.documentElement;
        this.init();
    }

    init() {
        let savedTheme = 'dark';
        try {
            savedTheme = localStorage.getItem('theme') || 'dark';
        } catch (e) {
            console.warn('LocalStorage not accessible for theme preference:', e);
        }
        this.applyTheme(savedTheme);

        if (this.themeToggle) {
            this.themeToggle.addEventListener('click', () => {
                const currentTheme = this.html.getAttribute('data-theme');
                const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
                this.applyTheme(newTheme);
            });
        }
    }

    applyTheme(theme) {
        this.html.setAttribute('data-theme', theme);
        try {
            localStorage.setItem('theme', theme);
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
        this.navbar = document.getElementById('navbar');
        this.menuBtn = document.getElementById('mobile-menu-btn');
        this.menuOverlay = document.getElementById('mobile-menu');
        this.body = document.body;
        this.lastScrollY = window.scrollY;
        
        this.init();
    }

    init() {
        // Cache section offsets for scroll spy
        this.cacheSectionOffsets();
        window.addEventListener('resize', () => {
            this.cacheSectionOffsets();
        }, { passive: true });

        // Scroll Listeners via requestAnimationFrame
        this.ticking = false;
        window.addEventListener('scroll', () => {
            if (!this.ticking) {
                window.requestAnimationFrame(() => {
                    this.handleNavbarScroll();
                    this.handleScrollSpy();
                    this.ticking = false;
                });
                this.ticking = true;
            }
        }, { passive: true });

        // Mobile Menu Toggle
        if (this.menuBtn) {
            this.menuBtn.addEventListener('click', () => this.toggleMobileMenu());
        }

        // Smooth Scroll for Anchors
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                const href = anchor.getAttribute('href');
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
                    if (this.menuOverlay && this.menuOverlay.classList.contains('active')) {
                        this.toggleMobileMenu();
                    }
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });

        // Close on Esc
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.menuOverlay?.classList.contains('active')) {
                this.toggleMobileMenu();
            }
        });

        // Close on click outside
        document.addEventListener('click', (e) => {
            if (this.menuOverlay?.classList.contains('active') && 
                !this.menuOverlay?.contains(e.target) && 
                !this.menuBtn?.contains(e.target)) {
                this.toggleMobileMenu();
            }
        });
    }

    cacheSectionOffsets() {
        this.sections = Array.from(document.querySelectorAll('section[id]')).map(section => ({
            id: section.getAttribute('id'),
            top: section.offsetTop,
            height: section.offsetHeight
        }));
    }

    handleNavbarScroll() {
        if (!this.navbar) return;
        const currentScroll = window.scrollY;
        
        // Background blur/border on scroll
        if (currentScroll > 50) {
            this.navbar.classList.add('scrolled');
        } else {
            this.navbar.classList.remove('scrolled');
        }

        // Hide/Show on scroll direction
        if (currentScroll > 500) {
            if (currentScroll > this.lastScrollY) {
                this.navbar.classList.add('hidden');
            } else {
                this.navbar.classList.remove('hidden');
            }
        } else {
            this.navbar.classList.remove('hidden');
        }

        this.lastScrollY = currentScroll;
    }

    handleScrollSpy() {
        const navLinks = document.querySelectorAll('.nav-link');
        const scrollPos = window.scrollY + 200; // Offset for better detection
        
        let currentSection = "";

        if (this.sections) {
            for (const section of this.sections) {
                if (scrollPos >= section.top && scrollPos < section.top + section.height) {
                    currentSection = section.id;
                }
            }
        }

        if (currentSection) {
            navLinks.forEach(link => {
                link.classList.toggle('active', link.getAttribute('href') === `#${currentSection}`);
            });
        }
    }

    toggleMobileMenu() {
        if (!this.menuOverlay || !this.menuBtn) return;
        const isActive = this.menuOverlay.classList.toggle('active');
        this.body.style.overflow = isActive ? 'hidden' : '';
        this.menuBtn.setAttribute('aria-expanded', isActive);
        
        const icon = this.menuBtn.querySelector('i');
        if (icon) {
            icon.setAttribute('data-lucide', isActive ? 'x' : 'menu');
            if (typeof lucide !== 'undefined' && typeof lucide.createIcons === 'function') {
                lucide.createIcons();
            }
        }
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
        this.currentText = '';
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
        if (typeof currentPhrase !== 'string') {
            return;
        }
        
        if (this.isDeleting) {
            this.currentText = currentPhrase.substring(0, this.currentText.length - 1);
        } else {
            this.currentText = currentPhrase.substring(0, this.currentText.length + 1);
        }

        if (this.element) {
            this.element.textContent = this.currentText;
        }

        let delta = this.typeSpeed;
        if (this.isDeleting) delta /= 2;

        if (!this.isDeleting && this.currentText === currentPhrase) {
            delta = this.waitTime;
            this.isDeleting = true;
        } else if (this.isDeleting && this.currentText === '') {
            this.isDeleting = false;
            this.currentPhraseIndex = (this.currentPhraseIndex + 1) % this.phrases.length;
            delta = 500;
        }

        setTimeout(() => this.tick(), delta);
    }
}
