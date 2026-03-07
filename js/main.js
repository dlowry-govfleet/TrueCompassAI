/* ============================================
   TrueCompass.AI — Main JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    const handleScroll = () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Mobile navigation toggle
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');

    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navLinks.classList.toggle('open');
        document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
    });

    // Close mobile nav on link click
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navLinks.classList.remove('open');
            document.body.style.overflow = '';
        });
    });

    // Scroll-triggered fade-in animations
    const fadeElements = document.querySelectorAll(
        '.service-card, .portfolio-card, .approach-step, .about-content, .about-image, .contact-info, .contact-form, .tech-item, .cta-content'
    );

    fadeElements.forEach(el => el.classList.add('fade-in'));

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    fadeElements.forEach(el => observer.observe(el));

    // Floating particles in hero
    const particlesContainer = document.getElementById('particles');
    if (particlesContainer) {
        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 3 + 1}px;
                height: ${Math.random() * 3 + 1}px;
                background: rgba(14, 165, 233, ${Math.random() * 0.3 + 0.1});
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: float ${Math.random() * 10 + 10}s ease-in-out infinite;
                animation-delay: ${Math.random() * -10}s;
            `;
            particlesContainer.appendChild(particle);
        }

        const style = document.createElement('style');
        style.textContent = `
            @keyframes float {
                0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.3; }
                25% { transform: translate(${20}px, -${30}px) scale(1.2); opacity: 0.6; }
                50% { transform: translate(-${15}px, -${60}px) scale(0.8); opacity: 0.4; }
                75% { transform: translate(${25}px, -${20}px) scale(1.1); opacity: 0.5; }
            }
        `;
        document.head.appendChild(style);
    }

    // Contact form handler
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(contactForm);
            const name = formData.get('name');

            // Build mailto link as a simple fallback
            const subject = encodeURIComponent(formData.get('subject') || 'Website Inquiry');
            const body = encodeURIComponent(
                `Name: ${formData.get('name')}\nEmail: ${formData.get('email')}\n\n${formData.get('message')}`
            );
            window.location.href = `mailto:dlowry@true-compass.ai?subject=${subject}&body=${body}`;

            contactForm.reset();
        });
    }

    // Smooth scroll for anchor links (fallback for older browsers)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
});
