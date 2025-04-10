document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("modal");
    const modalBtns = document.querySelectorAll(".open-modal-btn");
    const closeBtn = document.getElementById("closeModalBtn");

    modalBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
            modal.style.display = "flex";
        });
    });

    closeBtn.addEventListener("click", () => {
        modal.style.display = "none";
        formMessage.textContent = "";
    });

    window.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.style.display = "none";
            formMessage.textContent = "";
        }
    });

    const form = document.getElementById("content-cta-form");
    const nameInput = document.getElementById("content-cta-form-name");
    const emailInput = document.getElementById("content-cta-form-email");
    const phoneInput = document.getElementById("content-cta-form-phone");
    const detailsInput = document.getElementById("content-cta-form-details");
    const formMessage = document.getElementById("content-cta-form-message");

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        formMessage.textContent = "";
        formMessage.classList.remove("success");

        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const phone = phoneInput.value.trim();
        const details = detailsInput.value.trim();

        if (!name || !email || !phone || !details) {
            formMessage.textContent = "Please fill in all fields.";
            return;
        }

        if (!validateEmail(email)) {
            formMessage.textContent = "Please enter a valid email address.";
            return;
        }

        if (!validatePhone(phone)) {
            formMessage.textContent = "Please enter a valid phone number.";
            return;
        }

        formMessage.textContent = "Thanks! We’ll be in touch soon.";
        formMessage.classList.add("success");

        form.reset();

        setTimeout(() => {
            modal.style.display = "none";
            formMessage.textContent = "";
        }, 2000);
    });

    function validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function validatePhone(phone) {
        return /^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/.test(phone);
    }
});
