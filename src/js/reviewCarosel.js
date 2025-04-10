document.addEventListener("DOMContentLoaded", () => {
    const slides = document.querySelectorAll(".testimonial-slide");
    const dots = document.querySelectorAll(".dot");
    const slider = document.querySelector(".testimonials-slider");
    let currentSlide = 0;
    let slideInterval;
    let touchStartX = 0;
    let touchEndX = 0;

    // Function to show a specific slide
    const showSlide = (index) => {
        slides.forEach((slide) => slide.classList.remove("active"));
        dots.forEach((dot) => dot.classList.remove("active"));

        slides[index].classList.add("active");
        dots[index].classList.add("active");
    };

    // Function to advance to next slide
    const nextSlide = () => {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    };

    // Function to go to previous slide
    const prevSlide = () => {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    };

    // Touch event handlers
    slider.addEventListener(
        "touchstart",
        (e) => {
            touchStartX = e.touches[0].clientX;
        },
        { passive: true },
    );

    slider.addEventListener(
        "touchend",
        (e) => {
            touchEndX = e.changedTouches[0].clientX;
            handleSwipe();
        },
        { passive: true },
    );

    const handleSwipe = () => {
        const swipeThreshold = 50; // minimum distance for swipe
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe left
                nextSlide();
            } else {
                // Swipe right
                prevSlide();
            }
            // Reset interval after manual navigation
            clearInterval(slideInterval);
            slideInterval = setInterval(nextSlide, 5000);
        }
    };

    // Add click event listeners to dots
    dots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
            currentSlide = index;
            showSlide(currentSlide);
            clearInterval(slideInterval);
            slideInterval = setInterval(nextSlide, 5000);
        });
    });

    // Start automatic slideshow
    slideInterval = setInterval(nextSlide, 5000);
});
