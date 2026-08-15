/* =========================================
   HEADER SCROLL
========================================= */

const header = document.getElementById("header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }

});


/* =========================================
   MOBILE MENU
========================================= */

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

menuToggle.addEventListener("click", () => {

    navMenu.classList.toggle("show");

    const icon = menuToggle.querySelector("i");

    if (navMenu.classList.contains("show")) {
        icon.classList.remove("fa-bars");
        icon.classList.add("fa-xmark");
    } else {
        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");
    }

});


/* Close menu after clicking link */

document.querySelectorAll(".nav-menu a").forEach(link => {

    link.addEventListener("click", () => {

        navMenu.classList.remove("show");

        const icon = menuToggle.querySelector("i");

        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");

    });

});


/* =========================================
   ACTIVE NAV LINK
========================================= */

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-menu a");

window.addEventListener("scroll", () => {

    let currentSection = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 120;

        if (window.scrollY >= sectionTop) {
            currentSection = section.getAttribute("id");
        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if (
            link.getAttribute("href") === `#${currentSection}`
        ) {
            link.classList.add("active");
        }

    });

});


/* =========================================
   PACKAGE TABS
========================================= */

const packageTabs = document.querySelectorAll(".package-tab");

packageTabs.forEach(tab => {

    tab.addEventListener("click", () => {

        packageTabs.forEach(item => {
            item.classList.remove("active");
        });

        tab.classList.add("active");

        /*
         * Backend / API can be connected here later.
         *
         * Example:
         *
         * fetch(`/api/packages?category=${tab.dataset.category}`)
         */

        console.log(
            "Selected package category:",
            tab.dataset.category
        );

    });

});


/* =========================================
   REVIEWS SLIDER
========================================= */

/* =========================================
   TRIPS / PROGRAMS SLIDER
========================================= */

const trips = document.querySelectorAll(".trip-card");

const tripDots = document.querySelectorAll(".trip-dot");

const nextTrip = document.getElementById("nextTrip");

const prevTrip = document.getElementById("prevTrip");

let currentTrip = 0;


/* =========================================
   SHOW TRIP
========================================= */

function showTrip(index) {

    trips.forEach(trip => {
        trip.classList.remove("active");
    });

    tripDots.forEach(dot => {
        dot.classList.remove("active");
    });

    trips[index].classList.add("active");

    tripDots[index].classList.add("active");
}


/* =========================================
   NEXT
========================================= */

function nextTripSlide() {

    currentTrip++;

    if (currentTrip >= trips.length) {
        currentTrip = 0;
    }

    showTrip(currentTrip);
}


/* =========================================
   PREVIOUS
========================================= */

function previousTripSlide() {

    currentTrip--;

    if (currentTrip < 0) {
        currentTrip = trips.length - 1;
    }

    showTrip(currentTrip);
}


/* =========================================
   BUTTONS
========================================= */

nextTrip.addEventListener(
    "click",
    nextTripSlide
);

prevTrip.addEventListener(
    "click",
    previousTripSlide
);


/* =========================================
   DOTS
========================================= */

tripDots.forEach((dot, index) => {

    dot.addEventListener("click", () => {

        currentTrip = index;

        showTrip(currentTrip);

    });

});


/* =========================================
   AUTO SLIDE
========================================= */

// let tripAutoSlide = setInterval(
//     nextTripSlide,
//     7000
// );


/* =========================================
   PAUSE ON HOVER
========================================= */

// const tripsSlider = document.querySelector(".trips-slider");

// tripsSlider.addEventListener("mouseenter", () => {

//     clearInterval(tripAutoSlide);

// });

// tripsSlider.addEventListener("mouseleave", () => {

//     tripAutoSlide = setInterval(
//         nextTripSlide,
//         7000
//     );

// });



const reviews = document.querySelectorAll(".review-card");
const dots = document.querySelectorAll(".dot");

const nextReview = document.getElementById("nextReview");
const prevReview = document.getElementById("prevReview");

let currentReview = 0;


function showReview(index) {

    reviews.forEach(review => {
        review.classList.remove("active");
    });

    dots.forEach(dot => {
        dot.classList.remove("active");
    });

    reviews[index].classList.add("active");
    dots[index].classList.add("active");

}


function nextReviewSlide() {

    currentReview++;

    if (currentReview >= reviews.length) {
        currentReview = 0;
    }

    showReview(currentReview);

}


function previousReviewSlide() {

    currentReview--;

    if (currentReview < 0) {
        currentReview = reviews.length - 1;
    }

    showReview(currentReview);

}


nextReview.addEventListener(
    "click",
    nextReviewSlide
);

prevReview.addEventListener(
    "click",
    previousReviewSlide
);


dots.forEach((dot, index) => {

    dot.addEventListener("click", () => {

        currentReview = index;

        showReview(currentReview);

    });

});


/* Auto slide */

setInterval(() => {

    nextReviewSlide();

}, 6000);


/* =========================================
   FAQ
========================================= */

const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach(item => {

    const question = item.querySelector(".faq-question");

    question.addEventListener("click", () => {

        faqItems.forEach(otherItem => {

            if (otherItem !== item) {
                otherItem.classList.remove("active");
            }

        });

        item.classList.toggle("active");

    });

});


/* =========================================
   CONTACT FORM
========================================= */

const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

contactForm.addEventListener("submit", (event) => {

    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const email = document.getElementById("email").value.trim();
    const service = document.getElementById("service").value;
    const message = document.getElementById("message").value.trim();


    if (!name || !phone || !message) {

        formMessage.textContent =
            "برجاء ملء البيانات المطلوبة.";

        formMessage.style.color = "#c0392b";

        return;

    }


    console.log({
        name,
        phone,
        email,
        service,
        message
    });


    formMessage.textContent =
        "تم إرسال طلبك بنجاح. سنتواصل معك قريباً.";

    formMessage.style.color = "#0d5c4a";


    contactForm.reset();

});


/* =========================================
   SMOOTH SCROLL
========================================= */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function (event) {

        const targetId = this.getAttribute("href");

        if (targetId === "#") {
            return;
        }

        const target = document.querySelector(targetId);

        if (!target) {
            return;
        }

        event.preventDefault();

        target.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    });

});