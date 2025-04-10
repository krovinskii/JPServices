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
    // Create fullscreen overlay
    const overlay = document.createElement("div");
    overlay.className = "fullscreen-overlay";
    document.body.appendChild(overlay);

    // Add close button to overlay
    const closeBtn = document.createElement("button");
    closeBtn.className = "fullscreen-close";
    closeBtn.innerHTML = "×";
    overlay.appendChild(closeBtn);

    // Create image container in overlay
    const fullImg = document.createElement("img");
    fullImg.className = "fullscreen-image";
    overlay.appendChild(fullImg);

    // Add click event to all gallery images
    galleryItems.forEach((item) => {
        const img = item.querySelector("img");

        img.addEventListener("click", () => {
            fullImg.src = img.src;
            fullImg.alt = img.alt;
            overlay.classList.add("active");
            document.body.style.overflow = "hidden"; // Prevent scrolling when fullscreen is active
        });
    });

    // Close fullscreen on button click
    closeBtn.addEventListener("click", () => {
        overlay.classList.remove("active");
        document.body.style.overflow = ""; // Restore scrolling
    });

    // Close fullscreen on overlay click (not on image)
    overlay.addEventListener("click", (e) => {
        if (e.target === overlay) {
            overlay.classList.remove("active");
            document.body.style.overflow = ""; // Restore scrolling
        }
    });

    // Close fullscreen on Escape key
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && overlay.classList.contains("active")) {
            overlay.classList.remove("active");
            document.body.style.overflow = ""; // Restore scrolling
        }
    });
});
