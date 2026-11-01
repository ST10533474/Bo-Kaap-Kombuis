// BOOKING FORM VALIDATION

const bookingForm = document.getElementById("bookingForm");

if (bookingForm) {
    bookingForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const date = document.getElementById("date").value;
        const guests = document.getElementById("guests").value;

        if (!name || !email || !phone || !date || !guests) {
            alert("Please complete all required fields.");
            return;
        }

        alert(
            "Thank you, " + name +
            ". Your booking enquiry has been received."
        );

        bookingForm.reset();
    });
}


// GALLERY LIGHTBOX

const galleryImages = document.querySelectorAll(
    ".gallery-grid img[data-lightbox='gallery']"
);

if (galleryImages.length > 0) {
    const lightbox = document.createElement("div");
    lightbox.className = "lightbox";
    lightbox.setAttribute("role", "dialog");
    lightbox.setAttribute("aria-modal", "true");
    lightbox.setAttribute("aria-label", "Image viewer");
    lightbox.setAttribute("aria-hidden", "true");

    lightbox.innerHTML = `
        <button class="lightbox-close" type="button" aria-label="Close image viewer">&times;</button>
        <button class="lightbox-prev" type="button" aria-label="Previous image">&#10094;</button>
        <img class="lightbox-image" src="" alt="">
        <p class="lightbox-caption"></p>
        <button class="lightbox-next" type="button" aria-label="Next image">&#10095;</button>
    `;

    document.body.appendChild(lightbox);

    const lightboxImage = lightbox.querySelector(".lightbox-image");
    const lightboxCaption = lightbox.querySelector(".lightbox-caption");
    const closeButton = lightbox.querySelector(".lightbox-close");
    const previousButton = lightbox.querySelector(".lightbox-prev");
    const nextButton = lightbox.querySelector(".lightbox-next");

    let currentImageIndex = 0;
    let lastFocusedElement = null;

    function showLightboxImage() {
        const image = galleryImages[currentImageIndex];
        const figure = image.closest("figure");
        const caption = figure
            ? figure.querySelector("figcaption")
            : null;

        lightboxImage.src = image.currentSrc || image.src;
        lightboxImage.alt = image.alt;

        lightboxCaption.textContent = caption
            ? caption.textContent
            : image.alt;
    }

    function openLightbox(index) {
        currentImageIndex = index;
        lastFocusedElement = document.activeElement;

        showLightboxImage();

        lightbox.classList.add("active");
        lightbox.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";

        closeButton.focus();
    }

    function closeLightbox() {
        lightbox.classList.remove("active");
        lightbox.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";

        if (lastFocusedElement) {
            lastFocusedElement.focus();
        }
    }

    function showPreviousImage() {
        currentImageIndex =
            (currentImageIndex - 1 + galleryImages.length) %
            galleryImages.length;

        showLightboxImage();
    }

    function showNextImage() {
        currentImageIndex =
            (currentImageIndex + 1) % galleryImages.length;

        showLightboxImage();
    }

    galleryImages.forEach(function (image, index) {
        image.setAttribute("tabindex", "0");
        image.setAttribute("role", "button");
        image.setAttribute(
            "aria-label",
            "Enlarge image: " + image.alt
        );

        image.addEventListener("click", function () {
            openLightbox(index);
        });

        image.addEventListener("keydown", function (event) {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                openLightbox(index);
            }
        });
    });

    closeButton.addEventListener("click", closeLightbox);
    previousButton.addEventListener("click", showPreviousImage);
    nextButton.addEventListener("click", showNextImage);

    lightbox.addEventListener("click", function (event) {
        if (event.target === lightbox) {
            closeLightbox();
        }
    });

    document.addEventListener("keydown", function (event) {
        if (!lightbox.classList.contains("active")) {
            return;
        }

        if (event.key === "Escape") {
            closeLightbox();
        } else if (event.key === "ArrowLeft") {
            showPreviousImage();
        } else if (event.key === "ArrowRight") {
            showNextImage();
        }
    });
}

// MENU CATEGORY FILTER

const filterButtons = document.querySelectorAll(".filter-button");
const menuItems = document.querySelectorAll(".menu-item[data-category]");
const menuEmpty = document.getElementById("menu-empty");

if (filterButtons.length > 0 && menuItems.length > 0) {

    filterButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const selectedCategory = button.dataset.filter;
            let visibleItems = 0;

            filterButtons.forEach(function (filterButton) {
                filterButton.classList.remove("active");
                filterButton.setAttribute("aria-pressed", "false");
            });

            button.classList.add("active");
            button.setAttribute("aria-pressed", "true");

            menuItems.forEach(function (item) {

                const category = item.dataset.category;

                if (
                    selectedCategory === "all" ||
                    category === selectedCategory
                ) {
                    item.hidden = false;
                    visibleItems++;
                } else {
                    item.hidden = true;
                }

            });

            if (menuEmpty) {
                menuEmpty.hidden = visibleItems > 0;
            }

        });

    });

}

// MOBILE NAVIGATION

const menuToggle = document.getElementById("menu-toggle");
const mainNavigation = document.getElementById("main-navigation");

if (menuToggle && mainNavigation) {

    menuToggle.addEventListener("click", function () {

        const isOpen = mainNavigation.classList.toggle("open");

        menuToggle.textContent = isOpen ? "✕" : "☰";

        menuToggle.setAttribute("aria-expanded", isOpen);

        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "Close navigation menu" : "Open navigation menu"
        );
    });

    mainNavigation.querySelectorAll("a").forEach(function (link) {

        link.addEventListener("click", function () {
            mainNavigation.classList.remove("open");
            menuToggle.textContent = "☰";
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "Open navigation menu");
        });

    });
}