document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".rw-photo-container img").forEach((img) => {
        img.onload = () => {
            const isLandscape = img.naturalWidth > img.naturalHeight;
            img.style.aspectRatio = isLandscape ? "16 / 9" : "9 / 16";
        };
    });
});
