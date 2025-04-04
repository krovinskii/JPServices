document.addEventListener("DOMContentLoaded", () => {
    const btnAll = document.getElementById("btn-all");

    if (btnAll) {
        btnAll.classList.add("active");
    }

    document
        .querySelectorAll(".recent-works-navbar button")
        .forEach((button) => {
            button.addEventListener("click", function () {
                document
                    .querySelectorAll(".recent-works-navbar button")
                    .forEach((btn) => btn.classList.remove("active"));

                this.classList.add("active");
            });
        });
});
