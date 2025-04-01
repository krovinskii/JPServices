document.addEventListener("DOMContentLoaded", function () {
    const hamburgerBtn = document.querySelector(".hamburger-menu");
    const nav = document.querySelector(".jps-nav");

    hamburgerBtn.addEventListener("click", function () {
        hamburgerBtn.classList.toggle("active");
        nav.classList.toggle("active");

        // Prevent scrolling when menu is open
        document.body.style.overflow = nav.classList.contains("active")
            ? "hidden"
            : "";
    });

    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll(".jps-nav-links li a");
    navLinks.forEach((link) => {
        link.addEventListener("click", function () {
            hamburgerBtn.classList.remove("active");
            nav.classList.remove("active");
            document.body.style.overflow = "";
        });
    });

    // Close menu when clicking outside
    document.addEventListener("click", function (event) {
        if (
            !nav.contains(event.target) &&
            !hamburgerBtn.contains(event.target) &&
            nav.classList.contains("active")
        ) {
            hamburgerBtn.classList.remove("active");
            nav.classList.remove("active");
            document.body.style.overflow = "";
        }
    });
});
