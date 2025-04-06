document.addEventListener("DOMContentLoaded", () => {
    const faqButtons = document.querySelectorAll(".faq-question");

    faqButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
            const isOpen = btn.classList.contains("open");

            // Close all
            faqButtons.forEach((b) => {
                b.classList.remove("open");
                b.nextElementSibling.style.display = "none";
                b.querySelector(".icon").textContent = "+";
            });

            // Toggle current
            if (!isOpen) {
                btn.classList.add("open");
                btn.nextElementSibling.style.display = "block";
                btn.querySelector(".icon").textContent = "−";
            }
        });
    });
});
