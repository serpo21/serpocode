/* =========================================
   DİL GEÇİŞ SİSTEMİ (TR / EN)
========================================= */
function setLanguage(lang) {
    const body = document.body;
    const btnTr = document.getElementById("btn-tr");
    const btnEn = document.getElementById("btn-en");

    if (lang === "en") {
        body.classList.add("en-mode");
        btnEn.classList.add("active");
        btnTr.classList.remove("active");
        document.documentElement.setAttribute("lang", "en");
    } else {
        body.classList.remove("en-mode");
        btnTr.classList.add("active");
        btnEn.classList.remove("active");
        document.documentElement.setAttribute("lang", "tr");
    }

    try {
        localStorage.setItem("preferredLang", lang);
    } catch (e) {
        /* localStorage kullanılamıyorsa sessizce geç */
    }

    // Kart/görsel gibi animasyonları dil değişince yeniden tetikle
    revealOnScroll();
}

function initLanguage() {
    let savedLang = "tr";
    try {
        savedLang = localStorage.getItem("preferredLang") || "tr";
    } catch (e) {
        savedLang = "tr";
    }
    setLanguage(savedLang);
}

/* =========================================
   SCROLL REVEAL ANİMASYONU
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

/* =========================================
   NAV BAR - SCROLL ARKA PLANI
========================================= */
const nav = document.querySelector("nav");
window.addEventListener("scroll", () => {
    if (!nav) return;
    if (window.scrollY > 40) {
        nav.style.background = "rgba(5,8,22,.85)";
        nav.style.border = "1px solid rgba(255,255,255,.12)";
        nav.style.boxShadow = "0 15px 35px rgba(0,0,0,.35)";
    } else {
        nav.style.background = "rgba(255,255,255,.05)";
        nav.style.border = "1px solid rgba(255,255,255,.08)";
        nav.style.boxShadow = "none";
    }
});

/* =========================================
   MOBİL MENÜ
========================================= */
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
        menuToggle.classList.toggle("open");
        navLinks.classList.toggle("open");
    });

    navLinks.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            menuToggle.classList.remove("open");
            navLinks.classList.remove("open");
        });
    });
}

/* =========================================
   SAYFA YÜKLENME EFEKTİ
========================================= */
window.addEventListener("load", () => {
    document.body.style.opacity = "1";
});

/* =========================================
   FARE HAREKETİYLE ARKA PLAN EFEKTİ
========================================= */
const bg = document.querySelector(".background");
document.addEventListener("mousemove", e => {
    if (!bg) return;
    const x = (e.clientX / window.innerWidth) * 100;
    const y = (e.clientY / window.innerHeight) * 100;
    bg.style.background = `
        radial-gradient(circle at ${x}% ${y}%, rgba(0,191,255,.20), transparent 18%),
        radial-gradient(circle at 20% 20%, rgba(0,174,255,.18), transparent 28%),
        radial-gradient(circle at 80% 10%, rgba(160,0,255,.16), transparent 30%),
        radial-gradient(circle at 50% 80%, rgba(0,255,180,.14), transparent 35%),
        #050816
    `;
});

/* =========================================
   KART PARLAMA EFEKTİ
========================================= */
const cards = document.querySelectorAll(".card");
cards.forEach(card => {
    card.addEventListener("mousemove", e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,.12), rgba(255,255,255,.05))`;
    });
    card.addEventListener("mouseleave", () => {
        card.style.background = "rgba(255,255,255,.05)";
    });
});

/* =========================================
   FOOTER YIL BİLGİSİ
========================================= */
const yearEl = document.getElementById("year");
if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
}

/* =========================================
   BAŞLANGIÇ
========================================= */
initLanguage();
revealOnScroll();
