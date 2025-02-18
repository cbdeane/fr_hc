//set up global variables
const DIRECTORY = ['helloworld.html', 'pcra.html', 'talktoanadvisor.html', '403b.html'];     //directory of html files to be fetched
const SLIDE_INTERVAL = 6100; //the interval of the carousel in mso
const section = document.getElementById('hero_carousel');
const hero_content = document.getElementById('hero_content'); //the div that will hold the html content
const left_arrow = document.getElementById('carousel_leftarrow_div');
const right_arrow = document.getElementById('carousel_rightarrow_div');

// Current index of the displayed item
let currentIndex = 0;

// Auto-slide interval ID
let autoSlideInterval;

// current slide ID
let currentSlide;

// Function to load the HTML content into the carousel
function loadCarouselItem(index) {
  if (currentSlide != null) {
    currentSlide.classList.add('carousel_exit');
  }
  fetch(DIRECTORY[index])
    .then(response => response.text())
    .then(html => {
      hero_content.innerHTML = html;
    })
    .catch(error => console.error('Error loading HTML:', error));
  currentSlide = document.querySelector('.carousel_module');
}

// Show the next carousel item
function showNextItem() {
  currentIndex = (currentIndex + 1) % DIRECTORY.length; // Loop to start if at the end
  loadCarouselItem(currentIndex);
}

// Show the previous carousel item
function showPrevItem() {
  currentIndex = (currentIndex - 1 + DIRECTORY.length) % DIRECTORY.length; // Loop to end if at the start
  loadCarouselItem(currentIndex);
}

// Pause automatic sliding
function pauseAutoSlide() {
  clearInterval(autoSlideInterval);
}

// Setup event listeners
left_arrow.addEventListener('click', () => {
  showPrevItem();
  pauseAutoSlide(); // Pause when manually navigated
  startAutoSlide();
});

right_arrow.addEventListener('click', () => {
  showNextItem();
  pauseAutoSlide(); // Pause when manually navigated
  startAutoSlide();
});

//  document.getElementById('pause_button').addEventListener('click', () => {
//    pauseAutoSlide(); // Pause when clicked
//  });

// Start the automatic sliding
function startAutoSlide() {
  autoSlideInterval = setInterval(showNextItem, SLIDE_INTERVAL);
}

// Initialize carousel by loading the first item and starting the auto slide
loadCarouselItem(currentIndex);
currentSlide = document.querySelector('.carousel_module');
startAutoSlide();

section.addEventListener('mouseover', () => {
  pauseAutoSlide(); // Pause when hovered
});
section.addEventListener('mouseout', () => {
  startAutoSlide();
});
