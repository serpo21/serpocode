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

    try { localStorage.setItem("preferredLang", lang); } catch (e) {}
    revealOnScroll();
}

function initLanguage() {
    let savedLang = "tr";
    try { savedLang = localStorage.getItem("preferredLang") || "tr"; } catch (e) {}
    setLanguage(savedLang);
}

/* =========================================
   HERO EDİTÖR - YAZMA ANİMASYONU
   (kod içeriği dilden bağımsız, gerçek kod gibi)
========================================= */
const codeLines = [
    { text: "const developer = {", cls: "" },
    { text: "  name: \"Serpo\",", indent: true, key: "name", val: "\"Serpo\"" },
    { text: "  role: \"Software Developer\",", indent: true, key: "role", val: "\"Software Developer\"" },
    { text: "  level: \"Mid-level\",", indent: true, key: "level", val: "\"Mid-level\"" },
    { text: "  stack: [\"C#\", \".NET\", \"Python\"],", indent: true, key: "stack", val: "[\"C#\", \".NET\", \"Python\"]" },
    { text: "  status: \"Open to new projects\"", indent: true, key: "status", val: "\"Open to new projects\"" },
    { text: "};", cls: "" }
];

function buildLineHTML(line, partial) {
    if (!line.key) {
        return `<span class="kw">${escapeHTML(partial)}</span>`;
    }
    const prefix = `  ${line.key}: `;
    if (partial.length <= prefix.length) {
        return escapeHTML(partial);
    }
    const valuePart = partial.slice(prefix.length);
    return `${escapeHTML(prefix)}<span class="str prop-val">${escapeHTML(valuePart)}</span>`;
}

function escapeHTML(str) {
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function typeEditor() {
    const container = document.getElementById("typedCode");
    if (!container) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
        container.innerHTML = codeLines.map(l => escapeHTML(l.text)).join("\n") + '<span class="cursor"></span>';
        return;
    }

    let lineIndex = 0;
    let charIndex = 0;
    let doneLines = [];

    function step() {
        if (lineIndex >= codeLines.length) {
            container.innerHTML = doneLines.join("\n") + '\n<span class="cursor"></span>';
            return;
        }
        const line = codeLines[lineIndex];
        charIndex++;
        const partial = line.text.slice(0, charIndex);
        const renderedCurrent = buildLineHTML(line, partial);
        container.innerHTML = doneLines.concat(renderedCurrent).join("\n") + '<span class="cursor"></span>';

        if (charIndex >= line.text.length) {
            doneLines.push(buildLineHTML(line, line.text));
            lineIndex++;
            charIndex = 0;
            setTimeout(step, 160);
        } else {
            setTimeout(step, 18 + Math.random() * 22);
        }
    }
    step();
}

/* =========================================
   SCROLL REVEAL
========================================= */
const reveals = document.querySelectorAll(".reveal");
function revealOnScroll() {
    const trigger = window.innerHeight * 0.88;
    reveals.forEach(item => {
        const top = item.getBoundingClientRect().top;
        if (top < trigger) item.classList.add("active");
    });
}
window.addEventListener("scroll", revealOnScroll);

/* =========================================
   NAV - SCROLL ARKA PLANI
========================================= */
const nav = document.querySelector("nav");
window.addEventListener("scroll", () => {
    if (!nav) return;
    if (window.scrollY > 40) {
        nav.style.background = "rgba(18,19,28,.85)";
        nav.style.boxShadow = "0 15px 35px rgba(0,0,0,.35)";
    } else {
        nav.style.background = "rgba(26,27,38,.6)";
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
   FARE TAKİPLİ GLOW (hafif, tek nokta)
========================================= */
const glow = document.getElementById("glow");
if (glow && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    document.addEventListener("mousemove", e => {
        const x = (e.clientX / window.innerWidth) * 100;
        const y = (e.clientY / window.innerHeight) * 100;
        glow.style.background = `radial-gradient(500px circle at ${x}% ${y}%, rgba(122,162,247,.10), transparent 60%)`;
    });
}

/* =========================================
   SAYFA YÜKLENME
========================================= */
window.addEventListener("load", () => {
    document.body.style.opacity = "1";
    typeEditor();
});

/* =========================================
   FOOTER YIL
========================================= */
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* =========================================
   BAŞLANGIÇ
========================================= */
initLanguage();
revealOnScroll();
