// Global variables
let currentSlide = 0;
let slideInterval;

let nbrClick = 0;
var audio = new Audio('Happy Birthday Maryam.mp3');

// Data object
const data = {
    "title": "Happy Birthday Maryam!",
    "mainMessage": "Wishing you an amazing day full of laughter, surprises, and cake!",
    "image": "https://media-lhr8-2.cdn.whatsapp.net/v/t61.24694-24/470309056_9203815166341309_7089127386852074967_n.jpg?ccb=11-4&oh=01_Q5AaIDh3pXg6Ms4r_L9yNLsOTtnnhnm0dmj4K4xckEi-xMgP&oe=679F3E31&_nc_sid=5e03e0&_nc_cat=106",
    "imageAlt": "Maryam's Birthday Image",
    "personalMessage": {
        // "intro": "Dear Maryam,",
        "intro": "Happy Birthday, you magnificent human! 🎉,",
        // "body": "On your special day, I hope you take a moment to celebrate all your accomplishments and look forward to the exciting future ahead. Your creative spirit and determination are your superpowers, and they make you one-of-a-kind. 🎨✨ Keep creating, keep dreaming, and never forget that the world is lucky to have someone as talented and kind-hearted as you!",
        "body": "Today is your day to shine brighter than a disco ball at a 70s party! Take a moment to pat yourself on the back for all the awesome things you've done (even if it’s just surviving Mondays like a boss). Your creative spirit is like a glitter bomb—it explodes everywhere and makes everything better, even if it’s a little messy sometimes. ✨🎨 And your determination? It’s basically your superhero cape, except way more stylish.<br>Keep dreaming those big, wild dreams (you know, the ones that make people go, ‘Wait, what?!’), and never forget that the world is a better place because you’re in it. You’re like a rare Pokémon—talented, kind-hearted, and impossible to catch when there’s free cake around. 🍰 So go forth, conquer the day, and remember: you’re not just one-of-a-kind, you’re legendary. Now blow out those candles and make a wish—preferably one that involves more cake and fewer adult responsibilities. 😉🎂",
        "signature": "Wassim"
    },
    "gallery": [
        {
            "src": "image1.jpeg",
            "alt": "Image 1"
        },
        {
            "src": "image2.jpeg",
            "alt": "Image 2"
        },
        {
            "src": "image3.jpg",
            "alt": "Image 3"
        },
        {
            "src": "image4_1.jpg",
            "alt": "Image 4"
        }
    ]
};

// Slideshow functions
function startSlideshow() {
    slideInterval = setInterval(nextSlide, 3000); // Change slide every 2 seconds
}

function nextSlide() {
    const items = document.querySelectorAll('.carousel-item');
    const indicators = document.querySelectorAll('.indicator');
    
    items[currentSlide].classList.remove('active');
    indicators[currentSlide].classList.remove('active');
    
    currentSlide = (currentSlide + 1) % items.length;
    
    items[currentSlide].classList.add('active');
    indicators[currentSlide].classList.add('active');
}

function setSlide(index) {
    clearInterval(slideInterval); // Stop auto-rotation
    
    const items = document.querySelectorAll('.carousel-item');
    const indicators = document.querySelectorAll('.indicator');
    
    items[currentSlide].classList.remove('active');
    indicators[currentSlide].classList.remove('active');
    
    currentSlide = index;
    
    items[currentSlide].classList.add('active');
    indicators[currentSlide].classList.add('active');
    
    startSlideshow(); // Restart auto-rotation
}

// Audio function
function playAudio() {
    if(nbrClick == 0){
        audio.play();
    } else {
        audio.pause();
    }
    nbrClick = (nbrClick + 1) % 2;
}

// Content loading function
async function loadContent() {
    // Set the title and main message
    document.querySelector('h1#title span:first-child').textContent = data.title;
    document.querySelector('p#main-message').textContent = data.mainMessage;

    // Load the image
    // const imgButton = document.querySelector('.image-container .image-button img');
    // imgButton.src = data.image;
    // imgButton.alt = data.imageAlt;

    // Load gallery images
    const carousel = document.querySelector('.carousel');
    const indicatorsContainer = document.querySelector('.carousel-indicators');
    
    data.gallery.forEach((image, index) => {
        // Create carousel item
        const item = document.createElement('div');
        item.className = `carousel-item${index === 0 ? ' active' : ''}`;
        
        const img = document.createElement('img');
        img.src = image.src;
        img.alt = image.alt;
        
        item.appendChild(img);
        carousel.appendChild(item);

        // Create indicator
        const indicator = document.createElement('div');
        indicator.className = `indicator${index === 0 ? ' active' : ''}`;
        indicator.onclick = () => setSlide(index);
        indicatorsContainer.appendChild(indicator);
    });

    // Start the slideshow
    startSlideshow();

    // Load personalized message
    const specialMessage = document.querySelector('.special-message');
    specialMessage.innerHTML = `
        <p class="indie-flower-regular">${data.personalMessage.intro}</p>
        <p class="indie-flower-regular">${data.personalMessage.body}</p>
        <p class="signature indie-flower-regular">${data.personalMessage.signature}</p>
    `;
}


// Initialize on page load
window.onload = loadContent;

document.addEventListener('DOMContentLoaded', function() {
    const bgLoader = document.querySelector('.bg-loader img');
    
    if ('loading' in HTMLImageElement.prototype) {
        // Browser supports native lazy loading
        bgLoader.loading = 'lazy';
    } else {
        // Fallback for browsers that don't support lazy loading
        const lazyImageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    bgLoader.src = bgLoader.dataset.src;
                    observer.unobserve(entry.target);
                }
            });
        });
        
        lazyImageObserver.observe(bgLoader);
    }
});

// Update background based on the active carousel image
document.querySelector('.carousel').addEventListener('slid.bs.carousel', function () {
    const activeItem = document.querySelector('div.carousel-item.active img');
    const newBg = activeItem.src;
    document.body.style.backgroundImage = `url('${newBg}')`;
    console.log(activeItem);
});

// Set initial background image
// const bgLoader = document.querySelector('.bg-loader img');
// const initialBg = bgLoader.src;
// document.body.style.backgroundImage = `url('${initialBg}')`;