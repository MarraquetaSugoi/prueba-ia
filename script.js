document.addEventListener('DOMContentLoaded', () => {
    
    // --- Reveal Animations on Scroll ---
    const revealElements = document.querySelectorAll('.reveal-fade-up');
    
    const revealOnScroll = () => {
        revealElements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                el.classList.add('active');
            }
        });
    };

    // Initial check on load
    revealOnScroll();
    
    // Check on scroll
    window.addEventListener('scroll', revealOnScroll);


    // --- FAQ Accordion Logic ---
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const button = item.querySelector('button');
        
        button.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.faq-answer').classList.add('hidden');
                }
            });
            
            // Toggle current item
            if (isActive) {
                item.classList.remove('active');
                item.querySelector('.faq-answer').classList.add('hidden');
            } else {
                item.classList.add('active');
                item.querySelector('.faq-answer').classList.remove('hidden');
            }
        });
    });


    // --- Smooth Scrolling for Navigation Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80, // Offset for sticky header
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Navbar Blur Effect on Scroll ---
    const nav = document.querySelector('nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            nav.classList.add('bg-dark/95', 'shadow-lg');
            nav.classList.remove('bg-dark/80');
        } else {
            nav.classList.remove('bg-dark/95', 'shadow-lg');
            nav.classList.add('bg-dark/80');
        }
    });
});
