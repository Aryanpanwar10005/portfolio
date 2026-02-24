/**
 * Aryan Panwar - Portfolio Core Logic
 * Updated for Redesign v2 (Audit-Informed)
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide Icons
    lucide.createIcons();

    // Core Modules
    const themeManager = new ThemeManager();
    const navManager = new NavigationManager();
    const typewriter = new Typewriter('typewriter', [
        'ECE Engineer & Product Builder',
        'AI Explorer',
        'Bridging Hardware & AI',
        'Open Source Contributor'
    ]);

    // Third Party: AOS (Animate On Scroll)
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            once: true,
            mirror: false,
            offset: 100
        });
    }

    // Start UI Effects
    typewriter.start();
    
    // Console Signature
    console.log(
        '%c Built by Aryan Panwar %c aryanpanwar.in ',
        'background: #00d9ff; color: #0a0f1e; padding: 4px; border-radius: 4px 0 0 4px; font-weight: bold;',
        'background: #7b2fbe; color: #fff; padding: 4px; border-radius: 0 4px 4px 0;'
    );
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
        const savedTheme = localStorage.getItem('theme') || 'dark';
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
        localStorage.setItem('theme', theme);
        // Re-init icons to swap sun/moon visibility if needed or use CSS
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
        // Scroll Listeners
        window.addEventListener('scroll', () => {
            this.handleNavbarScroll();
            this.handleScrollSpy();
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

    handleNavbarScroll() {
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
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        let currentSection = "";

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === currentSection) {
                link.classList.add('active');
            }
        });
    }

    toggleMobileMenu() {
        const isActive = this.menuOverlay.classList.toggle('active');
        this.body.style.overflow = isActive ? 'hidden' : '';
        this.menuBtn.setAttribute('aria-expanded', isActive);
        
        const icon = this.menuBtn.querySelector('i');
        if (icon) {
            icon.setAttribute('data-lucide', isActive ? 'x' : 'menu');
            lucide.createIcons();
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
        const currentPhrase = this.phrases[this.currentPhraseIndex];
        
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
