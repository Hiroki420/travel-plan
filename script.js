// ===================================
// 2月旅行プラン - Scroll Animations
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    // Elements to animate
    const animatedElements = [
        ...document.querySelectorAll('.member-card'),
        ...document.querySelectorAll('.flight-card'),
        ...document.querySelectorAll('.plan-card')
    ];

    // Intersection Observer options
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    // Create observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add delay based on element type
                const delay = entry.target.classList.contains('member-card') 
                    ? index * 150 
                    : 0;
                
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, delay);
                
                // Stop observing once animated
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all animated elements
    animatedElements.forEach(el => observer.observe(el));

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Parallax effect on hero
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * 0.3;
            hero.style.backgroundPositionY = `${rate}px`;
        });
    }

    // Add stagger animation to member cards
    const memberCards = document.querySelectorAll('.member-card');
    memberCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.15}s`;
    });

    // Add hover sound effect (optional - just visual feedback)
    const planCards = document.querySelectorAll('.plan-card');
    planCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
        });
    });
});

// Page load animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});
