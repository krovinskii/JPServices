// Get all category buttons and gallery items
const categoryButtons = document.querySelectorAll(".category-btn");
const galleryItems = document.querySelectorAll(".gallery-item");

// Add click event listeners to category buttons
categoryButtons.forEach((button) => {
    button.addEventListener("click", () => {
        // Remove active class from all buttons
        categoryButtons.forEach((btn) => btn.classList.remove("active"));

        // Add active class to clicked button
        button.classList.add("active");

        // Get selected category
        const selectedCategory = button.getAttribute("data-category");

        // Filter gallery items
        galleryItems.forEach((item) => {
            const itemCategories = item
                .getAttribute("data-categories")
                .split(",");

            if (
                selectedCategory === "ALL" ||
                itemCategories.includes(selectedCategory)
            ) {
                item.classList.remove("hidden");
            } else {
                item.classList.add("hidden");
            }
        });
    });
});

// Fullscreen functionality
document.addEventListener("DOMContentLoaded", () => {
    const galleryItems = document.querySelectorAll(".gallery-item img");
    const overlay = document.getElementById("imageOverlay");
    const fullscreenImage = document.getElementById("fullscreenImage");
    const closeButton = document.querySelector(".fullscreen-close");

    // Open fullscreen
    galleryItems.forEach((item) => {
        item.addEventListener("click", () => {
            fullscreenImage.src = item.src;
            fullscreenImage.alt = item.alt;
            overlay.style.display = "flex";
            document.body.style.overflow = "hidden"; // Prevent scrolling
        });
    });

    // Close fullscreen
    closeButton.addEventListener("click", () => {
        overlay.style.display = "none";
        document.body.style.overflow = "auto"; // Restore scrolling
    });

    // Close on overlay click
    overlay.addEventListener("click", (e) => {
        if (e.target === overlay) {
            overlay.style.display = "none";
            document.body.style.overflow = "auto";
        }
    });

    // Close on escape key
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && overlay.style.display === "flex") {
            overlay.style.display = "none";
            document.body.style.overflow = "auto";
        }
    });
});
