document.addEventListener('DOMContentLoaded', () => {
  // --- PWA Service Worker Registration ---
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('/sw.js')
      .then((registration) => {
        console.log(
          'Service Worker registered with scope:',
          registration.scope
        );
      })
      .catch((error) => {
        console.error('Service Worker registration failed:', error);
      });
  }

  // --- Slider Functionality ---
  const track = document.querySelector('.slider-track');
  if (!track) return; // Exit if slider doesn't exist

  const slides = Array.from(track.children);
  const nextButton = document.querySelector('.next');
  const prevButton = document.querySelector('.prev');
  const currentSlideDisplay = document.getElementById('current-slide');
  const totalSlidesDisplay = document.getElementById('total-slides');

  // Check if elements exist before proceeding
  if (
    !nextButton ||
    !prevButton ||
    !currentSlideDisplay ||
    !totalSlidesDisplay ||
    slides.length === 0
  ) {
    console.error('Slider elements not found!');
    return;
  }

  const slideWidth = slides[0].getBoundingClientRect().width;
  let currentIndex = 0;

  // Arrange slides next to one another
  const setSlidePosition = (slide, index) => {
    slide.style.left = slideWidth * index + 'px';
  };
  // slides.forEach(setSlidePosition); This is not needed with flexbox

  // Function to move to a specific slide
  const moveToSlide = (currentTrack, targetIndex) => {
    currentTrack.style.transform =
      'translateX(-' + slideWidth * targetIndex + 'px)';
    currentIndex = targetIndex;
  };

  // Update slide counter
  const updateCounter = () => {
    currentSlideDisplay.textContent = currentIndex + 1;
    totalSlidesDisplay.textContent = slides.length;
  };

  // When I click left, move slides to the left
  prevButton.addEventListener('click', (e) => {
    const newIndex = currentIndex === 0 ? slides.length - 1 : currentIndex - 1;
    moveToSlide(track, newIndex);
    updateCounter();
  });

  // When I click right, move slides to the right
  nextButton.addEventListener('click', (e) => {
    const newIndex = currentIndex === slides.length - 1 ? 0 : currentIndex + 1;
    moveToSlide(track, newIndex);
    updateCounter();
  });

  // Handle window resize to keep slider working
  window.addEventListener('resize', () => {
    const newSlideWidth = slides[0].getBoundingClientRect().width;
    // Re-calculate and move to the current slide without animation
    track.style.transition = 'none'; // Disable transition for instant adjustment
    track.style.transform =
      'translateX(-' + newSlideWidth * currentIndex + 'px)';
    // Re-enable transition after a short delay
    setTimeout(() => {
      track.style.transition = 'transform 0.5s ease-in-out';
    }, 50);
  });

  // Initialize counter
  updateCounter();
});
