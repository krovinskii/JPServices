document.querySelectorAll(".recent-works-navbar button").forEach((button) => {
    button.addEventListener("click", function () {
        document
            .querySelectorAll(".recent-works-navbar button")
            .forEach((btn) => btn.classList.remove("active"));

        this.classList.add("active");
    });
});
