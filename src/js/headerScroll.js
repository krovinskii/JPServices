document.addEventListener("DOMContentLoaded", () => {
    const header = document.querySelector(".jps-header");
    let lastScrollY = window.scrollY;
    let ticking = false;

    const updateHeader = () => {
        // Only run on mobile devices
        if (window.innerWidth > 440) {
            header.classList.remove("header-hidden");
            return;
        }

        const currentScrollY = window.scrollY;

        // Show header when scrolling up or at top of page
        if (currentScrollY < lastScrollY || currentScrollY < 50) {
            header.classList.remove("header-hidden");
        }
        // Hide header when scrolling down and not at top
        else if (currentScrollY > lastScrollY && currentScrollY > 50) {
            header.classList.add("header-hidden");
        }

        lastScrollY = currentScrollY;
        ticking = false;
    };

    // Update on scroll
    window.addEventListener(
        "scroll",
        () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    updateHeader();
                    ticking = false;
                });
                ticking = true;
            }
        },
        { passive: true },
    );

    // Update on resize to handle switching between mobile and desktop
    window.addEventListener(
        "resize",
        () => {
            if (window.innerWidth > 440) {
                header.classList.remove("header-hidden");
            }
        },
        { passive: true },
    );
});
