document.addEventListener("DOMContentLoaded", function () {
    const slides = document.querySelectorAll(".hero-slide");
    const totalSlides = slides.length;
    let currentSlide = 0;
    const interval = 5000;
    let autoSlide = setInterval(nextSlide, interval);

    function initCarousel() {
        slides[0].classList.add("active");
        slides[0].setAttribute("aria-hidden", "false");

        createNavigationDots();
        setupKeyboardNavigation();
    }

    function nextSlide() {
        updateSlide(currentSlide, (currentSlide + 1) % totalSlides);
    }

    function prevSlide() {
        updateSlide(
            currentSlide,
            (currentSlide - 1 + totalSlides) % totalSlides,
        );
    }

    function updateSlide(oldIndex, newIndex) {
        slides[oldIndex].classList.remove("active");
        slides[oldIndex].setAttribute("aria-hidden", "true");

        slides[newIndex].classList.add("active");
        slides[newIndex].setAttribute("aria-hidden", "false");

        currentSlide = newIndex;
        updateNavigationDots();

        // Restart the auto-slide timer
        clearInterval(autoSlide);
        autoSlide = setInterval(nextSlide, interval);
    }

    function createNavigationDots() {
        const dotsContainer = document.createElement("div");
        dotsContainer.className = "carousel-dots";

        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement("button");
            dot.className = "carousel-dot";
            dot.setAttribute("aria-label", `Go to slide ${i + 1}`);
            dot.setAttribute("tabindex", "0");

            if (i === 0) {
                dot.classList.add("active");
            }

            dot.addEventListener("click", function () {
                updateSlide(currentSlide, i);
            });

            dot.addEventListener("keydown", function (event) {
                if (event.key === "Enter" || event.key === " ") {
                    updateSlide(currentSlide, i);
                }
            });

            dotsContainer.appendChild(dot);
        }

        document.querySelector(".jps-hero").appendChild(dotsContainer);
    }

    function updateNavigationDots() {
        const dots = document.querySelectorAll(".carousel-dot");
        dots.forEach((dot, index) => {
            dot.classList.toggle("active", index === currentSlide);
        });
    }

    function setupKeyboardNavigation() {
        document.addEventListener("keydown", function (event) {
            if (event.key === "ArrowRight") {
                nextSlide();
            } else if (event.key === "ArrowLeft") {
                prevSlide();
            }
        });
    }

    initCarousel();
});
