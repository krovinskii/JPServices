document.addEventListener("DOMContentLoaded", () => {
    // Image Elements
    const fence = [
        document.getElementById("fence-img-1"),
        document.getElementById("fence-img-2"),
        document.getElementById("fence-img-3"),
        document.getElementById("fence-img-4"),
    ];
    const deck = [
        document.getElementById("deck-img-1"),
        document.getElementById("deck-img-2"),
        document.getElementById("deck-img-3"),
        document.getElementById("deck-img-4"),
    ];
    const patio = [
        document.getElementById("patio-img-1"),
        document.getElementById("patio-img-2"),
        document.getElementById("patio-img-3"),
        document.getElementById("patio-img-4"),
    ];
    const landscape = [
        document.getElementById("landscape-img-1"),
        document.getElementById("landscape-img-2"),
        document.getElementById("landscape-img-3"),
        document.getElementById("landscape-img-4"),
    ];

    // Buttons
    const btnAll = document.getElementById("btn-all");
    const btnFence = document.getElementById("btn-fence");
    const btnDeck = document.getElementById("btn-deck");
    const btnPatios = document.getElementById("btn-patios");
    const btnLandscaping = document.getElementById("btn-landscaping");

    // All images (for hiding)
    const allImages = [...fence, ...deck, ...patio, ...landscape];

    const changePics = (picsToShow) => {
        for (const img of allImages) {
            img.style.display = "none";
        }
        for (const img of picsToShow) {
            img.style.display = "block";
        }
    };

    // Event Listeners
    btnAll.addEventListener("click", () =>
        changePics([fence[0], deck[0], patio[0], landscape[0]]),
    );

    btnFence.addEventListener("click", () => changePics(fence));
    btnDeck.addEventListener("click", () => changePics(deck));
    btnPatios.addEventListener("click", () => changePics(patio));
    btnLandscaping.addEventListener("click", () => changePics(landscape));
});
