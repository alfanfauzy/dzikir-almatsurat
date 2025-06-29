lucide.createIcons();

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
        console.log(index);
        const outClass =
            direction === "left" ? "slide-out-left" : "slide-out-right";

        contentEl.classList.add(outClass);

        setTimeout(() => {
            const item = dzikirData[index];
            contentEl.innerHTML = `
      ${item.title ? `<h3 class="content-title">${item.title}</h3>` : ""}
      <p class="arabic" dir="rtl" lang="ar">${item.arabic}</p>
      <p class="latin">${item.latin}</p>
      <p class="translation">${item.transalation}</p>
    `;

            contentEl.classList.remove("slide-out-left", "slide-out-right");

            // Button visibility
            prevBtn.classList.toggle("hidden", index === 0);

            // ✅ Update Next button text or icon
            if (index === dzikirData.length - 1) {
                nextBtn.innerHTML = `Finish <i data-lucide="check-circle"></i>`;
            } else {
                nextBtn.innerHTML = `Next <i data-lucide="circle-chevron-right"></i>`;
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

    // Keyboard navigation
    document.addEventListener("keydown", (e) => {
        if (e.key === "ArrowRight") nextBtn.click();
        if (e.key === "ArrowLeft") prevBtn.click();
    });
}
