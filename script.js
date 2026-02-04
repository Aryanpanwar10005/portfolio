// ===================================
// Technical Minimalism - Core Logic
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Icons
    lucide.createIcons();
    
    // Core Functions
    initializeNavigation();
    initializeMobileMenu();
    initializeAnimations();
    initializeScrollSpy();
});

// ===================================
// Navigation & Smooth Scroll
// ===================================
function initializeNavigation() {
    const navbar = document.getElementById('navbar');
    let lastScrollY = window.scrollY;
    
    // Hide/Show Navbar on Scroll
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        // Add shadow/border on scroll
        if (currentScrollY > 50) {
            navbar.style.boxShadow = '0 10px 30px -10px rgba(2, 12, 27, 0.7)';
        } else {
            navbar.style.boxShadow = 'none';
        }
        
        lastScrollY = currentScrollY;
    });

    // Smooth Scroll for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Close mobile menu if open
                if (document.getElementById('mobile-menu').classList.contains('active')) {
                    toggleMobileMenu();
                }
                
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ===================================
// Mobile Menu with Focus Trap
// ===================================
function initializeMobileMenu() {
    const menuBtn = document.getElementById('mobile-menu-btn');
    const menuOverlay = document.getElementById('mobile-menu');
    const body = document.body;
    
    menuBtn.addEventListener('click', toggleMobileMenu);
    
    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && menuOverlay.classList.contains('active')) {
            toggleMobileMenu();
        }
    });

    // Close when clicking outside (on overlay background)
    menuOverlay.addEventListener('click', (e) => {
        if (e.target === menuOverlay) {
            toggleMobileMenu();
        }
    });
}

function toggleMobileMenu() {
    const menuBtn = document.getElementById('mobile-menu-btn');
    const menuOverlay = document.getElementById('mobile-menu');
    const body = document.body;
    const icon = menuBtn.querySelector('i');
    
    const isActive = menuOverlay.classList.toggle('active');
    
    // Accessibility updates
    menuBtn.setAttribute('aria-expanded', isActive);
    body.style.overflow = isActive ? 'hidden' : ''; // Prevent background scrolling
    
    // Icon toggle
    if (isActive) {
        icon.setAttribute('data-lucide', 'x');
        // Focus trap logic could go here
    } else {
        icon.setAttribute('data-lucide', 'menu');
    }
    
    lucide.createIcons();
}

// ===================================
// Intersection Observer Animations
// ===================================
function initializeAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
}

// ===================================
// ScrollSpy (Active Link Highlighting)
// ===================================
function initializeScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -60% 0px', // Active when section is in middle of viewport
        threshold: 0
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                updateActiveLink(id);
            }
        });
    }, observerOptions);
    
    sections.forEach(section => observer.observe(section));
}

function updateActiveLink(id) {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-section') === id) {
            link.classList.add('active');
        }
    });
    
    // Update mobile links too
    document.querySelectorAll('.mobile-nav-link').forEach(link => {
        link.classList.remove('active'); // CSS not defined for this but good for logic
        if (link.getAttribute('data-section') === id) {
             link.style.color = 'var(--accent-primary)';
        } else {
             link.style.color = 'var(--text-primary)';
        }
    });
}

// ===================================
// Console Signature
// ===================================
console.log(
    '%c Built by Aryan Panwar ',
    'background: #0A0E27; color: #00D9FF; padding: 4px; border: 1px solid #00D9FF; border-radius: 4px;'
);
