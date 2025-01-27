// Global variables
let currentSlide = 0;
let slideInterval;

// Data object
const data = {
    "title": "Happy Birthday Maryam!",
    "mainMessage": "Wishing you an amazing day full of laughter, surprises, and cake! 🎂",
    "image": "https://media-lhr8-2.cdn.whatsapp.net/v/t61.24694-24/470309056_9203815166341309_7089127386852074967_n.jpg?ccb=11-4&oh=01_Q5AaIDh3pXg6Ms4r_L9yNLsOTtnnhnm0dmj4K4xckEi-xMgP&oe=679F3E31&_nc_sid=5e03e0&_nc_cat=106",
    "imageAlt": "Maryam's Birthday Image",
    "personalMessage": {
        "intro": "Dear Maryam,",
        "body": "On your special day, I hope you take a moment to celebrate all your accomplishments and look forward to the exciting future ahead. Your creative spirit and determination are your superpowers, and they make you one-of-a-kind. 🎨✨ Keep creating, keep dreaming, and never forget that the world is lucky to have someone as talented and kind-hearted as you!",
        "signature": "Your friend, Wassim"
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
    slideInterval = setInterval(nextSlide, 2000); // Change slide every 2 seconds
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
    var audio = new Audio('Happy Birthday Maryam.mp3');
    audio.play();
}

// Content loading function
async function loadContent() {
    // Set the title and main message
    document.querySelector('h1#title span:first-child').textContent = data.title;
    document.querySelector('p#main-message').textContent = data.mainMessage;

    // Load the image
    const imgButton = document.querySelector('.image-container .image-button img');
    imgButton.src = data.image;
    imgButton.alt = data.imageAlt;

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
        <p>${data.personalMessage.intro}</p>
        <p>${data.personalMessage.body}</p>
        <p class="signature">${data.personalMessage.signature}</p>
    `;
}

// Initialize on page load
window.onload = loadContent;