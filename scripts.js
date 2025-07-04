lucide.createIcons();

const dzikirSore = [
    {
        title: "#1: Dzikir",
        count: 3,
        arabic: "أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلّٰهِ،, وَالْحَمْدُ لِلّٰهِ لَا شَرِيْكَ لَهُ , لَا إِلَهَ إِلَّا هُوَ وَإِلَيْهِ النُّشُوْرُ",
        transalation:
            "Aku berlindung kepada Allah Yang Maha Mendengar lagi Maha Mengetahui dari godaan setan yang terkutuk.",
    },
    {
        title: "#2: Dzikir",
        count: 3,
        arabic: "أَمْسَيْنَا عَلَى فِطْرَةِ الْإِسْلَامِ، وَكَلِمَةِ الْإِخْلَاصِ، وَعَلَى دِيْنِ نَبِيِّنَا مُحَمَّدٍ ﷺ وَعَلَى مِلَّةِ أَبِيْنَا إِبْرَاهِيْمَ حَنِيْفًا وَمَا كَانَ مِنَ الْمُشْرِكِيْنَ",
        transalation:
            "Aku berlindung kepada Allah Yang Maha Mendengar lagi Maha Mengetahui dari godaan setan yang terkutuk.",
    },
    {
        title: "#3: Dzikir",
        count: 3,
        arabic: "اللّٰهُـمَّ إِنِّيْ أَمْسَيتُ مِنْكَ فِيْ نِعْمَةٍ وَعَافِيَةٍ وَسِتْرٍ, فَأَتِمَّ عَلَيَّ نِعْمَتَكَ وَعَافِيَتَكَ وَسِتْرَكَ فِيْ الدِّيْنِ وَالدُّنْيَا وَالْأَخِرَةِ",
        transalation:
            "Aku berlindung kepada Allah Yang Maha Mendengar lagi Maha Mengetahui dari godaan setan yang terkutuk.",
    },
    {
        title: "#4: Dzikir",
        count: 3,
        arabic: "اَللّٰهُـمَّ مَا أَمْسَ بِيْ مِنْ نِعْمَةٍ , أَوْ بِأَحَدٍ مِنْ خَلْقِكَ فَمِنْكَ وَحْدَكَ , لَا شَرِيْكَ لَكَ , فَلَكَ الْحَمْدُ , وَلَكَ الشُّكْرُ",
        transalation:
            "Aku berlindung kepada Allah Yang Maha Mendengar lagi Maha Mengetahui dari godaan setan yang terkutuk.",
    },
];

// Global state
let dzikirData = [];
let currentIndex = 0;

// Render Slide
function renderSlide(index, direction = "right") {
    const contentEl = document.querySelector(".slider-content");
    const nextBtn = document.getElementById("nextBtn");
    const prevBtn = document.getElementById("prevBtn");

    let dzikirList = [...dzikirData];
    const now = new Date();
    const isMorning = now.getHours() < 15;

    if (!isMorning) {
        dzikirList.splice(8, 4, ...dzikirSore);
    }

    dzikirData = dzikirList;

    const outClass =
        direction === "left" ? "slide-out-left" : "slide-out-right";
    contentEl.classList.add(outClass);

    setTimeout(() => {
        const item = dzikirList[index];
        contentEl.innerHTML = `
      <div class="container-content-title">
        ${item.title ? `<h3 class="content-title">${item.title}</h3>` : ""}
        ${item.count ? `<span class="content-count">${item.count}X</span>` : ""}
      </div>
      <p class="arabic" dir="rtl" lang="ar">${item.arabic}</p>
    `;

        contentEl.classList.remove("slide-out-left", "slide-out-right");

        prevBtn.classList.toggle("hidden", index === 0);

        nextBtn.innerHTML =
            index === dzikirList.length - 1
                ? `Selesai <i data-lucide="check-circle"></i>`
                : `Selanjutnya <i data-lucide="circle-chevron-right"></i>`;

        lucide.createIcons();
        updateProgressBar(index);
    }, 200);
}

function updateProgressBar(index) {
    const progressBar = document.getElementById("progressBar");
    const percentage = ((index + 1) / dzikirData.length) * 100;
    progressBar.style.width = `${percentage}%`;
}

function resetSlider() {
    currentIndex = 0;
    renderSlide(currentIndex, "left");
    updateProgressBar(0);

    const wrapper = document.querySelector(".wrapper");
    const content = document.querySelector(".content");

    content.classList.remove("visible");
    content.classList.add("hidden");

    setTimeout(() => {
        wrapper.classList.remove("hidden");
    }, 600);

    window.scrollTo(0, 0);
}

function handleNext() {
    if (currentIndex < dzikirData.length - 1) {
        currentIndex++;
        renderSlide(currentIndex, "right");
    } else {
        resetSlider();
    }
}

function handlePrev() {
    if (currentIndex > 0) {
        currentIndex--;
        renderSlide(currentIndex, "left");
    }
}

// Inisialisasi Slider
function initSlider(preloadedData) {
    dzikirData = preloadedData || [];
    currentIndex = 0;

    const nextBtn = document.getElementById("nextBtn");
    const prevBtn = document.getElementById("prevBtn");

    nextBtn.removeEventListener("click", handleNext);
    prevBtn.removeEventListener("click", handlePrev);

    nextBtn.addEventListener("click", handleNext);
    prevBtn.addEventListener("click", handlePrev);

    const dzikirTitleEl = document.querySelector(".dzikir-title");
    const now = new Date();
    dzikirTitleEl.textContent =
        now.getHours() < 15 ? "Dzikir Pagi" : "Dzikir Sore";

    renderSlide(currentIndex);
}

// Klik tombol mulai
document.querySelector(".btn-action").addEventListener("click", async () => {
    const wrapper = document.querySelector(".wrapper");
    const content = document.querySelector(".content");
    const contentEl = document.querySelector(".slider-content");

    contentEl.innerHTML = "<p class='loading'>Loading dzikir...</p>";
    content.classList.remove("hidden");
    content.classList.add("visible");

    try {
        const res = await fetch("dzikir.json");
        const data = await res.json();
        wrapper.classList.add("hidden");

        setTimeout(() => {
            initSlider(data);
        }, 600);
    } catch (err) {
        contentEl.innerHTML = "<p>Gagal memuat data dzikir.</p>";
        console.error("Error loading JSON:", err);
    }
});

// Tombol keyboard
document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") handleNext();
    if (e.key === "ArrowLeft") handlePrev();
});

// Footer Info
document.addEventListener("DOMContentLoaded", function () {
    const getYear = new Date().getFullYear();
    const footerInfo = document.querySelector(".footer-information");
    footerInfo.innerHTML = `Created by <a href="https://alfan.web.id/" target="_blank" rel="noopener noreferrer">Alfan Fauzy</a> - All Right Reserved - @${getYear}`;
});

window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    deferredPrompt = e;

    const installWrapper = document.querySelector(
        ".wrapper-instruction-install"
    );
    if (installWrapper) installWrapper.classList.remove("hidden");
});

document.querySelector(".btn-install")?.addEventListener("click", async () => {
    if (deferredPrompt) {
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;

        // Reset the deferred prompt
        deferredPrompt = null;

        // Hide the whole install wrapper if user accepted the install
        if (outcome === "accepted") {
            const installWrapper = document.querySelector(
                ".wrapper-instruction-install"
            );
            if (installWrapper) installWrapper.classList.add("hidden");
        }
    }
});

function showUpdateBanner() {
    const banner = document.createElement("div");
    banner.innerText = "🔄 Versi baru tersedia. Klik untuk muat ulang!";
    banner.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 20px;
        background: #1a1a1a;
        color: #fff;
        padding: 10px 16px;
        border-radius: 6px;
        cursor: pointer;
        z-index: 9999;
        font-family: sans-serif;
        box-shadow: 0 2px 6px rgba(0,0,0,0.2);
    `;
    banner.onclick = () => window.location.reload();
    document.body.appendChild(banner);
}

if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker.register("/sw.js").then((registration) => {
            console.log("✅ Service worker registered", registration.scope);

            // Detect new updates
            registration.onupdatefound = () => {
                const newWorker = registration.installing;
                newWorker.onstatechange = () => {
                    if (newWorker.state === "installed") {
                        if (navigator.serviceWorker.controller) {
                            // ✅ New content available
                            showUpdateBanner(); // show prompt to reload
                        } else {
                            console.log("🎉 Content cached for offline use");
                        }
                    }
                };
            };
        });
    });
}
