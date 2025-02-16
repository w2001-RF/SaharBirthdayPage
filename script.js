// Global variables
let currentSlide = 0;
let slideInterval;

let nbrClick = 0;
var audio = new Audio('Happy Birthday Maryam.mp3');

// Function to check internet connection
function loadThreeJS() {
    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js";

    script.onload = () => {
        console.log("Three.js loaded from CDN");
    };

    script.onerror = () => {
        console.warn("CDN failed, loading Three.js locally...");
        const localScript = document.createElement("script");
        localScript.src = "three.min.js"; // Load from local file
        localScript.onload = () => console.log("Three.js loaded from local file");
        document.head.appendChild(localScript);
    };

    document.head.appendChild(script);
}

// Load Three.js
loadThreeJS();

// Data object
const data = {
    "title": "Happy Birthday Sahar! My Love ❤️🎂🎉🎈🎁🎊",
    "mainMessage": "Wishing you an amazing day full of laughter, love, surprises, and joy! ❤️",
    "image": "https://media-lhr8-2.cdn.whatsapp.net/v/t61.24694-24/470309056_9203815166341309_7089127386852074967_n.jpg?ccb=11-4&oh=01_Q5AaIDh3pXg6Ms4r_L9yNLsOTtnnhnm0dmj4K4xckEi-xMgP&oe=679F3E31&_nc_sid=5e03e0&_nc_cat=106",
    "imageAlt": "Sahar's Birthday Image",
    "personalMessage": {
        // "intro": "Dear Maryam,",
        "intro": "Happy Birthday, you magnificent human! 🎉",
        // "body": "On your special day, I hope you take a moment to celebrate all your accomplishments and look forward to the exciting future ahead. Your creative spirit and determination are your superpowers, and they make you one-of-a-kind. 🎨✨ Keep creating, keep dreaming, and never forget that the world is lucky to have someone as talented and kind-hearted as you!",
        "body": "Hey Sahar, my dearest love,\nHappy belated birthday! Even though it's a bit late—today being February 16, 2025—I’m still bursting with admiration and joy for you. Since the magical day you were born on February 12, 2009, you’ve been lighting up every room you enter, shining brighter than a disco ball at a groovy 70s party!\nTake a moment to feel proud of every incredible step you take—even if it's just conquering a Monday like the superstar you are. Your creative spirit is a dazzling glitter bomb that transforms ordinary days into spectacular adventures, even if it leaves a little sparkle (and a bit of delightful mess) behind.\nYour determination is like your very own superhero cape, stylish and unstoppable, empowering you to chase those big, wild dreams—the kind that make people pause and say, \"Wow, what a force of nature!\" You’re as unique as a rare Pokémon: talented, kind-hearted, and forever elusive when there’s free cake on the horizon.\nSo, my love, as you step into this new year of life, remember: you’re not just one-of-a-kind—you’re legendary. May every moment be filled with laughter, wonder, and just the right amount of mischief (plus plenty of cake).\nWith all my love, always and forever,",
        "signature": "Wassim"
    },
    gallery: [
        { src: "image.jpg", alt: "Image 1" },
        // { src: "image1.jpeg", alt: "Image 1" },
        // { src: "image2.jpeg", alt: "Image 2" },
        // { src: "image3.jpg", alt: "Image 3" },
        // { src: "image4_1.jpg", alt: "Image 4" }
    ]
};

// Slideshow functions
function startSlideshow() {
    slideInterval = setInterval(nextSlide, 4000); // Change slide every 2 seconds
}

function nextSlide() {
    const items = document.querySelectorAll('.carousel-item');
    // const indicators = document.querySelectorAll('.indicator');
    
    items[currentSlide].classList.remove('active');
    // indicators[currentSlide].classList.remove('active');
    
    currentSlide = (currentSlide + 1) % items.length;
    
    items[currentSlide].classList.add('active');
    // indicators[currentSlide].classList.add('active');
}

function setSlide(index) {
    clearInterval(slideInterval); // Stop auto-rotation
    
    const items = document.querySelectorAll('.carousel-item');
    // const indicators = document.querySelectorAll('.indicator');
    
    items[currentSlide].classList.remove('active');
    // indicators[currentSlide].classList.remove('active');
    
    currentSlide = index;
    
    items[currentSlide].classList.add('active');
    // indicators[currentSlide].classList.add('active');
    
    startSlideshow(); // Restart auto-rotation
}

// Audio function
function toggleAudio() {
    nbrClick = (nbrClick + 1) % 2;
    nbrClick === 0 ? audio.pause() : audio.play();
}

// Content loading function
async function loadContent() {
    console.log("loadContent...");
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
        // const indicator = document.createElement('div');
        // indicator.className = `indicator${index === 0 ? ' active' : ''}`;
        // indicator.onclick = () => setSlide(index);
        // indicatorsContainer.appendChild(indicator);
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

// Confetti function using canvas-confetti
function launchConfetti() {
    console.log("launchConfetti...");
    confetti({
        particleCount: 800,
        spread: 40,
        origin: { y: 1.0, x: 0.5 },
        colors: ['#ff00000', '#ffb3d1', '#990033'],
        // colors: ["#26ccff", "#a25afd", "#ff5e7e", "#88ff5a", "#fcff42", "#ffa62d", "#ff36ff"],
        disableForReducedMotion: true,
        angle: 90,
        startVelocity: 50,
        // decay: .9,
        gravity: 0.25,
        // drift: 0,
        // ticks: 200,
        // x: .5,
        // y: .5,
        shapes: ["square", "circle"],
        zIndex: 100,
        scalar: 1.25
    });

    setTimeout(() => {
        const interval = setInterval(() => {
            confetti({
                particleCount: 50,
                spread: 40,
                origin: { y: 0.98, x: 0.5 },
                colors: ['#ff1a75', '#ff66a3', '#ffb3d1', '#990033'],
                disableForReducedMotion: true,
                angle: 90,
                startVelocity: 60,
                gravity: 1.0,
                shapes: ["square", "circle"],
                zIndex: 100,
                scalar: 1.25
            });
        }, 200);

        setTimeout(() => {
            createFloatingHeart(); // 💖 Start heart animation AFTER confetti finishes
            clearInterval(interval),
            console.log("Confetti finished, now showing floating heart...");
        }, 2000);
    }, 4000);
}

// Element reveal logic
function revealElements() {
    console.log("Revealing elements...");
    const elements = document.querySelectorAll('.hidden');
    elements.forEach((el, index) => {
        setTimeout(() => {
            el.classList.replace('hidden', 'visible');
        }, index * 500);
    });

    // Initialize 3D Carousel
    const carousel = document.getElementById('carousel');
    const images = carousel.getElementsByTagName('img');
    let currentAngle = 0;
    const angleIncrement = 360 / images.length;

    // Position images in 3D space
    function updateCarousel() {
        Array.from(images).forEach((img, index) => {
            const angle = currentAngle + (index * angleIncrement);
            const radians = angle * Math.PI / 180;
            const z = 200 * Math.cos(radians);
            const x = 200 * Math.sin(radians);
            img.style.transform = `translate3d(\${x}px, 0, \${z}px) rotateY(\${angle}deg)`;
            img.style.opacity = z < 0 ? 0.5 : 1;
            img.style.zIndex = Math.floor(z);
        });
    }

    // Rotate carousel on click/touch
    let isDragging = false;
    let startX;
    let startAngle;

    carousel.addEventListener('mousedown', startDrag);
    carousel.addEventListener('touchstart', startDrag);
    document.addEventListener('mousemove', drag);
    document.addEventListener('touchmove', drag);
    document.addEventListener('mouseup', endDrag);
    document.addEventListener('touchend', endDrag);

    function startDrag(e) {
        isDragging = true;
        startX = e.type === 'mousedown' ? e.clientX : e.touches[0].clientX;
        startAngle = currentAngle;
    }

    function drag(e) {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.type === 'mousemove' ? e.clientX : e.touches[0].clientX;
        const diff = x - startX;
        currentAngle = startAngle + diff * 0.5;
        updateCarousel();
    }

    function endDrag() {
        isDragging = false;
    }

    // Initialize carousel
    updateCarousel();
}

// 3D Floating Heart Animation
function createFloatingHeart() {
    console.log("Creating floating heart...");
    
    // Create a new scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    
    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.domElement.style.position = "fixed";
    renderer.domElement.style.top = "0";
    renderer.domElement.style.left = "0";
    renderer.domElement.style.zIndex = "9999"; // Ensure it appears above everything
    document.body.appendChild(renderer.domElement);


    // Create a Heart shape
    const heartShape = new THREE.Shape();
    const heartX = -50;
    const heartY = -50;
    heartShape.moveTo(25 + heartX, 25 + heartY);
    heartShape.bezierCurveTo(25 + heartX, 25 + heartY, 20 + heartX, 0 + heartY, 0 + heartX, 0 + heartY);
    heartShape.bezierCurveTo(-30 + heartX, 0 + heartY, -30 + heartX, 35 + heartY, -30 + heartX, 35 + heartY);
    heartShape.bezierCurveTo(-30 + heartX, 55 + heartY, -10 + heartX, 77 + heartY, 25 + heartX, 95 + heartY);
    heartShape.bezierCurveTo(60 + heartX, 77 + heartY, 80 + heartX, 55 + heartY, 80 + heartX, 35 + heartY);
    heartShape.bezierCurveTo(80 + heartX, 35 + heartY, 80 + heartX, 0 + heartY, 50 + heartX, 0 + heartY);
    heartShape.bezierCurveTo(35 + heartX, 0 + heartY, 25 + heartX, 25 + heartY, 25 + heartX, 25 + heartY);

    // Extrude settings to give it a 3D effect
    const extrudeSettings = { 
        depth: 3, 
        bevelEnabled: true,
        bevelSegments: 3,
        steps: 3,
        bevelSize: 0.3,
        bevelThickness: 0.5
    };
    const heartGeometry = new THREE.ExtrudeGeometry(heartShape, extrudeSettings);

    // **Red Heart Material**
    const heartMaterial = new THREE.MeshStandardMaterial({ 
        color: 0xff0000, // **Bright Red**
        emissive: 0xaa0000, // Slight red glow effect
        transparent: true, 
        opacity: 0.8
    });

    // Create the heart mesh
    const heartMesh = new THREE.Mesh(heartGeometry, heartMaterial);
    
    // Positioning the heart at the center
    heartMesh.scale.set(0.25, 0.25, 0.25);
    heartMesh.position.set(0, 0, -50);
    scene.add(heartMesh);

    // Lighting
    const light = new THREE.PointLight(0xffffff, 1, 100);
    light.position.set(5, 5, 5);
    scene.add(light);
    scene.add(new THREE.AmbientLight(0xaaaaaa));

    // Set camera position
    camera.position.set(0, 0, 5);

    // Heart Floating Animation
    let time = 0;
    function animateHeart() {
        requestAnimationFrame(animateHeart);
        time += 0.03;
        heartMesh.position.x = -5;
        heartMesh.position.y = -2 + Math.sin(time) * 5; // Floating effect
        heartMesh.rotation.z = Math.PI + Math.sin(time) * 0.1; // Rotate effect
        heartMesh.position.z += 0.1; // Zoom effect
        heartMesh.rotation.z += 0.1; // Rotate effect
        renderer.render(scene, camera);
    }
    animateHeart();

    // Remove heart after 3 seconds
    setTimeout(() => {
        document.body.removeChild(renderer.domElement);
        console.log("Heart animation removed.");
    }, 14000);
}

// Initialize on page load
window.onload = () => {
    revealElements();
    loadContent();
    launchConfetti();
};