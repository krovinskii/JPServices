document.addEventListener("DOMContentLoaded", () => {
    const slides = document.querySelectorAll(".testimonial-slide");
    const dots = document.querySelectorAll(".dot");
    let currentSlide = 0;
    let slideInterval;

    // Function to show a specific slide
    const showSlide = (index) => {
        // Remove active class from all slides and dots
        slides.forEach((slide) => slide.classList.remove("active"));
        dots.forEach((dot) => dot.classList.remove("active"));

        // Add active class to current slide and dot
        slides[index].classList.add("active");
        dots[index].classList.add("active");
    };

    // Function to advance to next slide
    const nextSlide = () => {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    };

    // Add click event listeners to dots
    dots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
            currentSlide = index;
            showSlide(currentSlide);

            // Reset the interval when manually changing slides
            clearInterval(slideInterval);
            slideInterval = setInterval(nextSlide, 5000);
        });
    });

    // Start automatic slideshow
    slideInterval = setInterval(nextSlide, 5000);
});
