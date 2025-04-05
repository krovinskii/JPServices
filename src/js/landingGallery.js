document.addEventListener("DOMContentLoaded", () => {
    // Image Elements
    const fence = [
        document.getElementById("fence-img-1"),
        document.getElementById("fence-img-2"),
        document.getElementById("fence-img-3"),
        document.getElementById("fence-img-4"),
    ];
    const deck = [
        document.getElementById("deck-img-1"),
        document.getElementById("deck-img-2"),
        document.getElementById("deck-img-3"),
        document.getElementById("deck-img-4"),
    ];
    const patio = [
        document.getElementById("patio-img-1"),
        document.getElementById("patio-img-2"),
        document.getElementById("patio-img-3"),
        document.getElementById("patio-img-4"),
    ];
    const landscape = [
        document.getElementById("landscape-img-1"),
        document.getElementById("landscape-img-2"),
        document.getElementById("landscape-img-3"),
        document.getElementById("landscape-img-4"),
    ];

    // Buttons
    const btnAll = document.getElementById("btn-all");
    const btnFence = document.getElementById("btn-fence");
    const btnDeck = document.getElementById("btn-deck");
    const btnPatios = document.getElementById("btn-patios");
    const btnLandscaping = document.getElementById("btn-landscaping");

    // All images (for hiding)
    const allImages = [...fence, ...deck, ...patio, ...landscape];

    const changePics = (picsToShow) => {
        for (const img of allImages) {
            img.style.display = "none";
        }
        for (const img of picsToShow) {
            img.style.display = "block";
        }
    };

    // Event Listeners
    btnAll.addEventListener("click", () =>
        changePics([fence[0], deck[0], patio[0], landscape[0]]),
    );

    btnFence.addEventListener("click", () => changePics(fence));
    btnDeck.addEventListener("click", () => changePics(deck));
    btnPatios.addEventListener("click", () => changePics(patio));
    btnLandscaping.addEventListener("click", () => changePics(landscape));
    function setupMobileSlider() {
        const photoContainer = document.querySelector(".rw-photo-container");
        if (!photoContainer) return;

        // Only run on mobile
        const mobileBreakpoint = 992;

        function handleMobileSlider() {
            if (window.innerWidth <= mobileBreakpoint) {
                // Find visible images
                const visibleImages = Array.from(
                    photoContainer.querySelectorAll("img"),
                ).filter((img) => img.style.display !== "none");

                if (visibleImages.length <= 1) return; // No need for pagination with single image

                let currentIndex = 0;
                const containerWidth = photoContainer.offsetWidth;

                // Create or update scroll indicators
                let scrollIndicator =
                    document.querySelector(".scroll-indicator");
                if (!scrollIndicator) {
                    scrollIndicator = document.createElement("div");
                    scrollIndicator.className = "scroll-indicator";
                    photoContainer.parentNode.insertBefore(
                        scrollIndicator,
                        photoContainer.nextSibling,
                    );
                }

                // Update the dots
                scrollIndicator.innerHTML = "";
                visibleImages.forEach((_, index) => {
                    const dot = document.createElement("span");
                    if (index === 0) dot.className = "active";
                    dot.addEventListener("click", () => {
                        goToSlide(index);
                    });
                    scrollIndicator.appendChild(dot);
                });

                // Prevent default scroll behavior to implement custom pagination
                photoContainer.style.scrollBehavior = "smooth";

                // Arrow navigation (optional)
                let prevButton = document.querySelector(".slider-prev");
                let nextButton = document.querySelector(".slider-next");

                if (!prevButton) {
                    prevButton = document.createElement("button");
                    prevButton.className = "slider-prev";
                    prevButton.innerHTML = "←";
                    prevButton.style.position = "absolute";
                    prevButton.style.left = "10px";
                    prevButton.style.top = "50%";
                    prevButton.style.zIndex = "2";
                    prevButton.style.background = "rgba(255,255,255,0.7)";
                    prevButton.style.border = "none";
                    prevButton.style.borderRadius = "50%";
                    prevButton.style.width = "40px";
                    prevButton.style.height = "40px";
                    prevButton.style.display = "flex";
                    prevButton.style.alignItems = "center";
                    prevButton.style.justifyContent = "center";
                    photoContainer.parentNode.style.position = "relative";
                    photoContainer.parentNode.appendChild(prevButton);
                }

                if (!nextButton) {
                    nextButton = document.createElement("button");
                    nextButton.className = "slider-next";
                    nextButton.innerHTML = "→";
                    nextButton.style.position = "absolute";
                    nextButton.style.right = "10px";
                    nextButton.style.top = "50%";
                    nextButton.style.zIndex = "2";
                    nextButton.style.background = "rgba(255,255,255,0.7)";
                    nextButton.style.border = "none";
                    nextButton.style.borderRadius = "50%";
                    nextButton.style.width = "40px";
                    nextButton.style.height = "40px";
                    nextButton.style.display = "flex";
                    nextButton.style.alignItems = "center";
                    nextButton.style.justifyContent = "center";
                    photoContainer.parentNode.appendChild(nextButton);
                }

                // Navigation functions
                function goToSlide(index) {
                    if (index < 0) index = 0;
                    if (index >= visibleImages.length)
                        index = visibleImages.length - 1;

                    currentIndex = index;
                    photoContainer.scrollTo({
                        left: index * containerWidth,
                        behavior: "smooth",
                    });

                    // Update active dot
                    const dots = scrollIndicator.querySelectorAll("span");
                    dots.forEach((dot, i) => {
                        dot.className = i === index ? "active" : "";
                    });
                }

                function goToPrev() {
                    goToSlide(currentIndex - 1);
                }

                function goToNext() {
                    goToSlide(currentIndex + 1);
                }

                // Add event listeners
                prevButton.addEventListener("click", goToPrev);
                nextButton.addEventListener("click", goToNext);

                // Detect when scrolling ends to snap to nearest slide
                let scrollTimeout;
                photoContainer.addEventListener("scroll", () => {
                    clearTimeout(scrollTimeout);

                    scrollTimeout = setTimeout(() => {
                        // Calculate which slide should be visible based on scroll position
                        const scrollPos = photoContainer.scrollLeft;
                        const newIndex = Math.round(scrollPos / containerWidth);

                        // If we're between slides, snap to the nearest one
                        if (currentIndex !== newIndex) {
                            goToSlide(newIndex);
                        }
                    }, 50);
                });

                // Handle touch events for swipe
                let touchStartX = 0;
                let touchEndX = 0;

                photoContainer.addEventListener(
                    "touchstart",
                    (e) => {
                        touchStartX = e.changedTouches[0].screenX;
                    },
                    { passive: true },
                );

                photoContainer.addEventListener(
                    "touchend",
                    (e) => {
                        touchEndX = e.changedTouches[0].screenX;
                        handleSwipe();
                    },
                    { passive: true },
                );

                function handleSwipe() {
                    const threshold = 50; // Minimum swipe distance

                    if (touchStartX - touchEndX > threshold) {
                        // Swiped left, go to next slide
                        goToNext();
                    } else if (touchEndX - touchStartX > threshold) {
                        // Swiped right, go to previous slide
                        goToPrev();
                    }
                }

                // Initial setup
                goToSlide(0);
            } else {
                // Remove mobile slider elements when on desktop
                const scrollIndicator =
                    document.querySelector(".scroll-indicator");
                const prevButton = document.querySelector(".slider-prev");
                const nextButton = document.querySelector(".slider-next");

                if (scrollIndicator) scrollIndicator.innerHTML = "";
                if (prevButton) prevButton.remove();
                if (nextButton) nextButton.remove();

                // Reset container scroll behavior
                photoContainer.style.scrollBehavior = "";
            }
        }

        // Call the function initially and on tab changes
        handleMobileSlider();

        // Update when tabs are clicked
        const allButtons = [
            document.getElementById("btn-all"),
            document.getElementById("btn-fence"),
            document.getElementById("btn-deck"),
            document.getElementById("btn-patios"),
            document.getElementById("btn-landscaping"),
        ];

        allButtons.forEach((btn) => {
            if (btn) {
                btn.addEventListener("click", () => {
                    // Wait for DOM to update with new images
                    setTimeout(handleMobileSlider, 100);
                });
            }
        });

        // Handle window resize
        window.addEventListener("resize", handleMobileSlider);
    }

    // Initialize mobile slider
    setupMobileSlider();
});
