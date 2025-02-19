//set up global variables
const DIRECTORY = ['helloworld.html', 'pcra.html', 'talktoanadvisor.html', '403b.html'];     //directory of html files to be fetched
const SLIDE_INTERVAL = 6100; //the interval of the carousel in mso
const section = document.getElementById('hero_carousel');
const hero_content = document.getElementById('hero_content'); //the div that will hold the html content
const left_arrow = document.getElementById('carousel_leftarrow_div');
const right_arrow = document.getElementById('carousel_rightarrow_div');
const placekeeper_div = document.getElementById('carousel_placekeeper_div');

// Current index of the displayed item
let currentIndex = 0;

// Auto-slide interval ID
let autoSlideInterval;


// Function to load the HTML content into the carousel
function loadCarouselItem(index) {
  fetch(DIRECTORY[index])
    .then(response => response.text())
    .then(html => {
      hero_content.innerHTML = html;
    })
    .catch(error => console.error('Error loading HTML:', error));
  animateBubbles();
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

function populateBubbles() {
  for (let i = 0; i < DIRECTORY.length; i++) {
    const bubble = document.createElement('div');
    bubble.classList.add('bubble');
    bubble.addEventListener('click', () => {
      currentIndex = i;
      loadCarouselItem(currentIndex);
      pauseAutoSlide(); // Pause when manually navigated
      startAutoSlide();
    });
    placekeeper_div.appendChild(bubble);
  }
}

function animateBubbles() {
  const bubbles = document.querySelectorAll('.bubble');
  bubbles.forEach((bubble, i) => {
    if (i === currentIndex) {
      bubble.classList.add('bubble_selected');
    } else {
      bubble.classList.remove('bubble_selected');
    }
  });
}
// Initialize carousel by loading the first item and starting the auto slide

populateBubbles();
animateBubbles();
loadCarouselItem(currentIndex);
startAutoSlide();

