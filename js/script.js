// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {

    // 1. Preloader
    const preloader = document.getElementById('preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            preloader.style.opacity = '0';
            setTimeout(() => { preloader.style.display = 'none'; }, 500);
        });
    }

    // 2. Initialize AOS Animation Library
    AOS.init({
        duration: 800,
        easing: 'slide',
        once: true, // whether animation should happen only once
    });

    // 3. Initialize Swiper (Testimonials)
    if (document.querySelector('.testimonial-swiper')) {
        new Swiper('.testimonial-swiper', {
            loop: true,
            autoplay: { delay: 3000, disableOnInteraction: false },
            pagination: { el: '.swiper-pagination', clickable: true },
            breakpoints: {
                320: { slidesPerView: 1, spaceBetween: 20 },
                768: { slidesPerView: 2, spaceBetween: 30 },
                1024: { slidesPerView: 3, spaceBetween: 30 }
            }
        });
    }

    // 4. Counter Animation
    const counters = document.querySelectorAll('.counter');
    const speed = 200; // lower = faster

    const animateCounters = () => {
        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;
                const inc = target / speed;
                if (count < target) {
                    counter.innerText = Math.ceil(count + inc);
                    setTimeout(updateCount, 15);
                } else {
                    counter.innerText = target;
                }
            };
            updateCount();
        });
    };

    // Intersection Observer to trigger counter when visible
    const observer = new IntersectionObserver((entries) => {
        if(entries[0].isIntersecting) {
            animateCounters();
            observer.disconnect();
        }
    }, { threshold: 0.5 });
    
    const statsSection = document.querySelector('.stats-section');
    if(statsSection) observer.observe(statsSection);

    // 5. Scroll to Top Button
    const scrollTopBtn = document.querySelector('.scroll-top');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    });

    // 6. Active Nav Link Highlighter
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage || (currentPage === '' && link.getAttribute('href') === 'index.html')) {
            link.classList.add('active');
        }
    });
    // ==========================================
    // Auto-Typing Text Effect
    // ==========================================
    const typingElement = document.getElementById("typing-text");
    
    if (typingElement) {
        const textArray = ["CCC", "O Level", "DCA","ADCA", "Master IT Skills"];
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function typeEffect() {
            const currentText = textArray[textIndex];
            
            if (isDeleting) {
                typingElement.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typingElement.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
            }

            let typingSpeed = isDeleting ? 100 : 200;

            // Pause at the end of a word
            if (!isDeleting && charIndex === currentText.length) {
                typingSpeed = 2000; // 2 seconds pause before deleting
                isDeleting = true;
            } 
            // Move to the next word when completely deleted
            else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % textArray.length;
                typingSpeed = 500; // Pause before typing new word
            }

            setTimeout(typeEffect, typingSpeed);
        }

        // Start the effect
        typeEffect();
    }
});