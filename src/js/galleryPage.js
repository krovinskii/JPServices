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
