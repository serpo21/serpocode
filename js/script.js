/* =========================================
   SCROLL REVEAL
========================================= */

const reveals = document.querySelectorAll(".reveal");

function revealOnScroll() {

    const trigger = window.innerHeight * 0.85;

    reveals.forEach(item => {

        const top = item.getBoundingClientRect().top;

        if (top < trigger) {

            item.classList.add("active");

        }

    });

}

window.addEventListener("scroll", revealOnScroll);

revealOnScroll();


/* =========================================
   NAVBAR EFFECT
========================================= */

const nav = document.querySelector("nav");

window.addEventListener("scroll", () => {

    if (window.scrollY > 40) {

        nav.style.background = "rgba(5,8,22,.82)";
        nav.style.border = "1px solid rgba(255,255,255,.12)";
        nav.style.boxShadow = "0 15px 35px rgba(0,0,0,.35)";

    } else {

        nav.style.background = "rgba(255,255,255,.05)";
        nav.style.boxShadow = "none";

    }

});


/* =========================================
   HERO FADE
========================================= */

window.addEventListener("load", () => {

    document.body.style.opacity = "1";

});


/* =========================================
   MOUSE LIGHT EFFECT
========================================= */

const bg = document.querySelector(".background");

document.addEventListener("mousemove", e => {

    const x = e.clientX / window.innerWidth * 100;
    const y = e.clientY / window.innerHeight * 100;

    bg.style.background = `
        radial-gradient(circle at ${x}% ${y}%,
        rgba(0,191,255,.20),
        transparent 18%),

        radial-gradient(circle at 20% 20%,
        rgba(0,174,255,.18),
        transparent 28%),

        radial-gradient(circle at 80% 10%,
        rgba(160,0,255,.16),
        transparent 30%),

        radial-gradient(circle at 50% 80%,
        rgba(0,255,180,.14),
        transparent 35%),

        #050816
    `;

});


/* =========================================
   CARD HOVER
========================================= */

const cards = document.querySelectorAll(".card");

cards.forEach(card => {

    card.addEventListener("mousemove", e => {

        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.background = `
        radial-gradient(circle at ${x}px ${y}px,
        rgba(255,255,255,.12),
        rgba(255,255,255,.05))
        `;

    });

    card.addEventListener("mouseleave", () => {

        card.style.background = "rgba(255,255,255,.05)";

    });

});


/* =========================================
   BUTTON EFFECT
========================================= */

const button = document.querySelector(".btn");

button.addEventListener("mouseenter", () => {

    button.style.transform = "scale(1.06)";

});

button.addEventListener("mouseleave", () => {

    button.style.transform = "scale(1)";

});