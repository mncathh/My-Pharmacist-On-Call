/**
 * My Pharmacist On Call - Main JavaScript
 * Handles mobile navigation, scroll effects, fade-in animations, and testimonial carousel
 */

(function() {
    "use strict";

    // ================= MOBILE NAVIGATION TOGGLE =================
    const burger = document.getElementById('navHamburger');
    const navLinks = document.getElementById('navLinks');
    
    if (burger && navLinks) {
        burger.addEventListener('click', () => {
            burger.classList.toggle('open');
            navLinks.classList.toggle('open');
            burger.setAttribute('aria-expanded', burger.classList.contains('open'));
        });
        
        // Close mobile menu when a link is clicked
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                burger.classList.remove('open');
                navLinks.classList.remove('open');
                burger.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // ================= DYNAMIC NAVBAR SHADOW ON SCROLL =================
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            navbar.style.boxShadow = window.scrollY > 10 
                ? '0 4px 20px rgba(91,184,245,0.12)' 
                : '0 1px 14px rgba(91,184,245,0.06)';
        });
    }

    // ================= INTERSECTION OBSERVER FOR FADE-IN ANIMATIONS =================
    // Adds smooth fade-in effect to cards as they enter the viewport
    const animatedElements = document.querySelectorAll('.svc-card, .why-item, .ci-card');
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                fadeObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.08, rootMargin: '0px 0px -10px 0px' });
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(16px)';
        el.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
        fadeObserver.observe(el);
    });

    // ================= TESTIMONIAL CAROUSEL =================
    const track = document.getElementById('testimonialsTrack');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const dotsContainer = document.getElementById('carouselDots');

    if (track && prevBtn && nextBtn && dotsContainer) {
        const cards = Array.from(track.children);
        
        if (cards.length) {
            const getCardWidth = () => cards[0]?.offsetWidth || 320;
            const gap = 24;
            let currentIndex = 0;
            let maxIndex = Math.max(0, cards.length - 1);

            // Update carousel position and button states
            const updateCarousel = () => {
                const slideDistance = getCardWidth() + gap;
                track.style.transform = `translateX(${-currentIndex * slideDistance}px)`;
                
                // Update dot indicators
                document.querySelectorAll('.dot').forEach((dot, i) => {
                    dot.classList.toggle('active', i === currentIndex);
                });
                
                // Update button states
                prevBtn.disabled = currentIndex === 0;
                nextBtn.disabled = currentIndex === maxIndex;
                prevBtn.style.opacity = currentIndex === 0 ? '0.5' : '1';
                nextBtn.style.opacity = currentIndex === maxIndex ? '0.5' : '1';
                prevBtn.style.cursor = currentIndex === 0 ? 'default' : 'pointer';
                nextBtn.style.cursor = currentIndex === maxIndex ? 'default' : 'pointer';
            };

            // Generate navigation dots
            const generateDots = () => {
                dotsContainer.innerHTML = '';
                cards.forEach((_, idx) => {
                    const dot = document.createElement('div');
                    dot.classList.add('dot');
                    if (idx === currentIndex) dot.classList.add('active');
                    dot.addEventListener('click', () => {
                        currentIndex = idx;
                        updateCarousel();
                    });
                    dotsContainer.appendChild(dot);
                });
            };

            generateDots();
            
            // Event listeners for carousel buttons
            prevBtn.addEventListener('click', () => { 
                if (currentIndex > 0) { 
                    currentIndex--; 
                    updateCarousel(); 
                } 
            });
            
            nextBtn.addEventListener('click', () => { 
                if (currentIndex < maxIndex) { 
                    currentIndex++; 
                    updateCarousel(); 
                } 
            });

            // Handle window resize to recalculate card width
            let resizeTimer;
            window.addEventListener('resize', () => {
                clearTimeout(resizeTimer);
                resizeTimer = setTimeout(() => updateCarousel(), 100);
            });
            
            updateCarousel();
        }
    }
})();