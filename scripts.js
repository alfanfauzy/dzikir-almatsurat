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

document.querySelector(".btn-action").addEventListener("click", () => {
    const wrapper = document.querySelector(".wrapper");
    const content = document.querySelector(".content");

    // Fade out wrapper
    wrapper.classList.add("hidden");

    // Wait for fade-out to finish, then fade in content
    setTimeout(() => {
        content.classList.remove("hidden");
        content.classList.add("visible");

        initSlider();
    }, 600); // match transition duration
});

// ✅ 3. Slider Logic Function
function initSlider() {
    const contentEl = document.querySelector(".slider-content");
    const nextBtn = document.getElementById("nextBtn");
    const prevBtn = document.getElementById("prevBtn");

    const now = new Date();
    const isMorning = now.getHours() < 15;

    let dzikirData = [];
    let currentIndex = 0;

    // Fetch data from external file
    fetch("dzikir.json")
        .then((res) => res.json())
        .then((data) => {
            dzikirData = data;
            renderSlide(currentIndex);
        })
        .catch((err) => {
            contentEl.innerHTML = "<p>Gagal memuat data dzikir.</p>";
            console.error("Error loading JSON:", err);
        });

    // Render single slide
    function renderSlide(index, direction = "right") {
        const dzikirList = [...dzikirData];

        const outClass =
            direction === "left" ? "slide-out-left" : "slide-out-right";

        contentEl.classList.add(outClass);

        if (!isMorning) {
            dzikirList.splice(8, 4, ...dzikirSore);
        }

        console.log(dzikirList);

        setTimeout(() => {
            const item = dzikirList[index];
            contentEl.innerHTML = `
                <div class="container-content-title">
                    ${
                        item.title
                            ? `<h3 class="content-title">${item.title}</h3>`
                            : ""
                    }
                    ${
                        item.count
                            ? `<span class="content-count">${item.count}X</span>`
                            : ""
                    }
                </div>
                <p class="arabic" dir="rtl" lang="ar">${item.arabic}</p>
            `;

            contentEl.classList.remove("slide-out-left", "slide-out-right");

            // Button visibility
            prevBtn.classList.toggle("hidden", index === 0);

            // ✅ Update Next button text or icon
            if (index === dzikirData.length - 1) {
                nextBtn.innerHTML = `Selesai <i data-lucide="check-circle"></i>`;
            } else {
                nextBtn.innerHTML = `Selanjutnya <i data-lucide="circle-chevron-right"></i>`;
            }

            lucide.createIcons();

            // ✅ Update progress bar
            updateProgressBar(index);
        }, 200);
    }

    function updateProgressBar(index) {
        const progressBar = document.getElementById("progressBar");
        const percentage = ((index + 1) / dzikirData.length) * 100;
        progressBar.style.width = `${percentage}%`;
    }

    function resetSlider() {
        // Reset index and render first slide
        currentIndex = 0;
        renderSlide(currentIndex, "left");
        updateProgressBar(0);

        const wrapper = document.querySelector(".wrapper");
        const content = document.querySelector(".content");

        // Fade out wrapper
        wrapper.classList.remove("hidden");

        // Wait for fade-out to finish, then fade in content
        setTimeout(() => {
            content.classList.remove("visible");
            content.classList.add("hidden");

            initSlider();
        }, 600); // match transition duration

        window.scrollTo(0, 0);
    }

    nextBtn.addEventListener("click", () => {
        if (currentIndex < dzikirData.length - 1) {
            currentIndex++;
            renderSlide(currentIndex, "right");
        } else {
            // ✅ Finished → Reset and go back to start
            console.log("here");
            resetSlider();
        }
    });

    prevBtn.addEventListener("click", () => {
        if (currentIndex > 0) {
            currentIndex--;
            renderSlide(currentIndex, "left");
        }
    });

    // Handle Dzikir Title
    const dzikirTitleEl = document.querySelector(".dzikir-title");
    dzikirTitleEl.textContent = isMorning ? "Dzikir Pagi" : "Dzikir Sore";

    // Keyboard navigation
    document.addEventListener("keydown", (e) => {
        if (e.key === "ArrowRight") nextBtn.click();
        if (e.key === "ArrowLeft") prevBtn.click();
    });
}

let deferredPrompt;

window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    deferredPrompt = e;

    const installBtn = document.querySelector(".btn-install");
    if (installBtn) installBtn.classList.remove("hidden");
});

document.querySelector(".btn-install")?.addEventListener("click", async () => {
    if (deferredPrompt) {
        deferredPrompt.prompt();
        const choice = await deferredPrompt.userChoice;
        console.log("Install result:", choice.outcome);
        deferredPrompt = null;
        document.querySelector(".btn-install").classList.add("hidden");
    }
});

if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker
            .register("/sw.js")
            .then((reg) =>
                console.log("✅ Service worker registered", reg.scope)
            )
            .catch((err) =>
                console.error("❌ Service worker registration failed:", err)
            );
    });
}
