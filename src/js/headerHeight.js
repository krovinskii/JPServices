document.addEventListener("DOMContentLoaded", function () {
    const header = document.querySelector(".jps-header");
    document.documentElement.style.setProperty(
        "--header-height",
        `${header.offsetHeight}px`,
    );
});
