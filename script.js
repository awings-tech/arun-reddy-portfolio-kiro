document.addEventListener('DOMContentLoaded', () => {
    
    // Set Current Year in Footer
    document.getElementById('year').textContent = new Date().getFullYear();

    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navbar.classList.toggle('active');
        });
    }

    // Close mobile menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navbar.classList.remove('active');
        });
    });

    // Sticky Header and Active Link Switching on Scroll
    const header = document.querySelector('.header');
    const sections = document.querySelectorAll('section');

    window.addEventListener('scroll', () => {
        // Sticky Header
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Active Link Switching
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // Intersection Observer for Scroll Animations (Fade-in elements)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const fadeObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    // Observe all elements with fade-in and scroll-element classes
    const fadeElements = document.querySelectorAll('.fade-in, .scroll-element');
    fadeElements.forEach(el => {
        fadeObserver.observe(el);
    });

    // Initial check for elements that are already in viewport on load
    setTimeout(() => {
        const initialElements = document.querySelectorAll('.fade-in');
        initialElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight) {
                el.classList.add('visible');
            }
        });
    }, 100);
});
