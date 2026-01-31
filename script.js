// ================================================================================
// MOTHERS HANGOUT INITIATIVE - MAIN JAVASCRIPT
// ================================================================================

// ========================================
// PRELOADER WITH ROTATING MESSAGES
// ========================================
const inspiringMessages = [
    "Empowering Women, Building Communities",
    "Together We Rise",
    "One for All, All for One",
    "Ubuntu: I Am Because You Are",
    "Giving Voice to the Voiceless"
];

let messageIndex = 0;
let messageInterval;

function rotateMessage() {
    const messageElement = document.getElementById('preloaderMessage');
    if (messageElement) {
        messageIndex = (messageIndex + 1) % inspiringMessages.length;
        messageElement.style.opacity = '0';
        setTimeout(() => {
            messageElement.textContent = inspiringMessages[messageIndex];
            messageElement.style.opacity = '1';
        }, 300);
    }
}

// Start message rotation
document.addEventListener('DOMContentLoaded', function() {
    messageInterval = setInterval(rotateMessage, 2000);
    
    // Hide preloader after 3 seconds
    setTimeout(() => {
        if (messageInterval) {
            clearInterval(messageInterval);
        }
        const preloader = document.getElementById('preloader');
        if (preloader) {
            preloader.classList.add('hidden');
        }
        // Animate stats if on home page
        if (document.querySelector('.impact-stats')) {
            animateStats();
        }
    }, 3000);
});

// ========================================
// ANIMATED STATS - COUNT UP NUMBERS
// ========================================
function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        const increment = target / 50;
        let current = 0;
        
        const updateCount = () => {
            current += increment;
            if (current < target) {
                stat.textContent = Math.ceil(current) + '+';
                requestAnimationFrame(updateCount);
            } else {
                stat.textContent = target + '+';
            }
        };
        
        updateCount();
    });
}

// ========================================
// TESTIMONIAL SLIDER
// ========================================
let currentTestimonial = 0;
const totalTestimonials = 4;
let testimonialInterval;

function initTestimonialSlider() {
    const testimonialContainer = document.getElementById('testimonialContainer');
    const sliderDots = document.getElementById('sliderDots');
    
    if (!testimonialContainer || !sliderDots) return;
    
    // Create dots
    for (let i = 0; i < totalTestimonials; i++) {
        const dot = document.createElement('div');
        dot.className = 'dot' + (i === 0 ? ' active' : '');
        dot.onclick = () => goToTestimonial(i);
        sliderDots.appendChild(dot);
    }
    
    // Auto-play
    testimonialInterval = setInterval(nextTestimonial, 5000);
}

function updateSlider() {
    const testimonialContainer = document.getElementById('testimonialContainer');
    if (!testimonialContainer) return;
    
    testimonialContainer.style.transform = `translateX(-${currentTestimonial * 100}%)`;
    document.querySelectorAll('.dot').forEach((dot, index) => {
        dot.classList.toggle('active', index === currentTestimonial);
    });
}

function nextTestimonial() {
    currentTestimonial = (currentTestimonial + 1) % totalTestimonials;
    updateSlider();
}

function prevTestimonial() {
    currentTestimonial = (currentTestimonial - 1 + totalTestimonials) % totalTestimonials;
    updateSlider();
}

function goToTestimonial(index) {
    currentTestimonial = index;
    updateSlider();
}

// Initialize slider when DOM loads
document.addEventListener('DOMContentLoaded', initTestimonialSlider);

// ========================================
// NAVIGATION
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    const mobileToggle = document.getElementById('mobileToggle');
    const navLinksContainer = document.getElementById('navLinks');
    const navbar = document.getElementById('navbar');
    
    if (mobileToggle && navLinksContainer) {
        mobileToggle.addEventListener('click', () => {
            navLinksContainer.classList.toggle('active');
        });
    }
    
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }
});

// ========================================
// COPY ACCOUNT NUMBER
// ========================================
function copyAccountNumber() {
    const accountNumber = document.getElementById('accountNumber');
    if (!accountNumber) return;
    
    const copyBtn = document.querySelector('.copy-btn');
    const copyIcon = document.getElementById('copyIcon');
    const copyText = document.getElementById('copyText');
    
    navigator.clipboard.writeText(accountNumber.textContent).then(() => {
        if (copyBtn) copyBtn.classList.add('copied');
        if (copyIcon) copyIcon.textContent = '✓';
        if (copyText) copyText.textContent = 'Copied!';
        
        showToast('Account number copied to clipboard!');
        
        setTimeout(() => {
            if (copyBtn) copyBtn.classList.remove('copied');
            if (copyIcon) copyIcon.textContent = '📋';
            if (copyText) copyText.textContent = 'Copy';
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy:', err);
        showToast('Failed to copy. Please try again.');
    });
}

function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
        <span style="font-size: 24px;">✓</span>
        <span style="font-weight: 600;">${message}</span>
    `;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

// ========================================
// GALLERY - NIGERIAN STATES & AFRICAN COUNTRIES
// ========================================
const nigerianStates = [
    'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa',
    'Benue', 'Borno', 'Cross River', 'Delta', 'Ebonyi', 'Edo',
    'Ekiti', 'Enugu', 'FCT Abuja', 'Gombe', 'Imo', 'Jigawa',
    'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi', 'Kwara',
    'Lagos', 'Nasarawa', 'Niger', 'Ogun', 'Ondo', 'Osun',
    'Oyo', 'Plateau', 'Rivers', 'Sokoto', 'Taraba', 'Yobe', 'Zamfara'
];

const africanCountries = [
    'Cameroon',
    'Mozambique',
    'Kenya'
];

function initGallery() {
    const nigeriaDropdown = document.getElementById('nigeriaDropdown');
    const nigeriaBtn = document.getElementById('nigeriaBtn');
    const africanDropdown = document.getElementById('africanDropdown');
    const africanBtn = document.getElementById('africanBtn');
    const galleryGrid = document.getElementById('galleryGrid');
    
    if (!galleryGrid) return;
    
    // Populate Nigeria dropdown
    if (nigeriaDropdown) {
        nigerianStates.forEach(state => {
            const item = document.createElement('div');
            item.className = 'dropdown-item';
            item.textContent = state;
            item.onclick = () => filterGallery(state);
            nigeriaDropdown.appendChild(item);
        });
    }
    
    // Populate African dropdown
    if (africanDropdown) {
        africanCountries.forEach(country => {
            const item = document.createElement('div');
            item.className = 'dropdown-item';
            item.textContent = country;
            item.onclick = () => filterGallery(country);
            africanDropdown.appendChild(item);
        });
    }
    
    // Toggle dropdowns
    if (nigeriaBtn) {
        nigeriaBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            nigeriaDropdown.classList.toggle('show');
            if (africanDropdown) africanDropdown.classList.remove('show');
        });
    }
    
    if (africanBtn) {
        africanBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            africanDropdown.classList.toggle('show');
            if (nigeriaDropdown) nigeriaDropdown.classList.remove('show');
        });
    }
    
    document.addEventListener('click', () => {
        if (nigeriaDropdown) nigeriaDropdown.classList.remove('show');
        if (africanDropdown) africanDropdown.classList.remove('show');
    });
    
    // Generate gallery
    generateGallery();
    
    // Setup filter buttons
    document.querySelectorAll('.gallery-btn[data-filter]').forEach(btn => {
        btn.addEventListener('click', () => {
            filterGallery(btn.getAttribute('data-filter'));
        });
    });
}

/*
============================================================
GALLERY IMAGE PLACEHOLDER INSTRUCTIONS:
============================================================

TO ADD YOUR ACTUAL GALLERY IMAGES/VIDEOS:

1. Create a folder named "gallery" in the same location as your HTML files
2. Organize your images like this:
   gallery/
   ├── lagos-1.jpg
   ├── lagos-2.jpg
   ├── abuja-1.jpg
   ├── cameroon-1.jpg
   ├── kenya-1.jpg
   └── etc...

3. In the generateGallery() function below, replace the placeholder
   innerHTML with actual image tags:
   
   BEFORE:
   item.innerHTML = `
       <div class="gallery-placeholder">
           📸
           <span>Lagos</span>
       </div>
   `;
   
   AFTER:
   item.innerHTML = `
       <img src="gallery/lagos-1.jpg" alt="Lagos Program">
   `;
   
4. For videos, use:
   <video controls>
       <source src="gallery/lagos-video.mp4" type="video/mp4">
   </video>

============================================================
*/

function generateGallery() {
    const galleryGrid = document.getElementById('galleryGrid');
    if (!galleryGrid) return;
    
    galleryGrid.innerHTML = '';
    
    // All gallery items
    for (let i = 1; i <= 12; i++) {
        const item = document.createElement('div');
        item.className = 'gallery-item show';
        item.setAttribute('data-category', 'all');
        item.innerHTML = `
            <div class="gallery-placeholder">
                📸
                <span>All Gallery ${i}</span>
            </div>
        `;
        // TO ADD REAL IMAGES: Replace above with:
        // item.innerHTML = `<img src="gallery/all-${i}.jpg" alt="Gallery ${i}">`;
        galleryGrid.appendChild(item);
    }

    // Nigerian states
    nigerianStates.forEach(state => {
        const item = document.createElement('div');
        item.className = 'gallery-item';
        item.setAttribute('data-category', state);
        item.innerHTML = `
            <div class="gallery-placeholder">
                🏛️
                <span>${state}</span>
            </div>
        `;
        // TO ADD REAL IMAGES: Replace above with:
        // item.innerHTML = `<img src="gallery/${state.toLowerCase()}.jpg" alt="${state}">`;
        galleryGrid.appendChild(item);
    });

    // African countries
    africanCountries.forEach(country => {
        const item = document.createElement('div');
        item.className = 'gallery-item';
        item.setAttribute('data-category', country);
        item.innerHTML = `
            <div class="gallery-placeholder">
                🌍
                <span>${country}</span>
            </div>
        `;
        // TO ADD REAL IMAGES: Replace above with:
        // item.innerHTML = `<img src="gallery/${country.toLowerCase()}.jpg" alt="${country}">`;
        galleryGrid.appendChild(item);
    });
}

function filterGallery(category) {
    const items = document.querySelectorAll('.gallery-item');
    const buttons = document.querySelectorAll('.gallery-btn');
    const nigeriaBtn = document.getElementById('nigeriaBtn');
    const africanBtn = document.getElementById('africanBtn');
    const nigeriaDropdown = document.getElementById('nigeriaDropdown');
    const africanDropdown = document.getElementById('africanDropdown');
    
    buttons.forEach(btn => btn.classList.remove('active'));
    
    if (category === 'all') {
        items.forEach(item => {
            if (item.getAttribute('data-category') === 'all') {
                setTimeout(() => item.classList.add('show'), 50);
            } else {
                item.classList.remove('show');
            }
        });
        const allBtn = document.querySelector('[data-filter="all"]');
        if (allBtn) allBtn.classList.add('active');
    } else {
        items.forEach(item => {
            if (item.getAttribute('data-category') === category) {
                setTimeout(() => item.classList.add('show'), 50);
            } else {
                item.classList.remove('show');
            }
        });
        
        if (nigerianStates.includes(category) && nigeriaBtn) {
            nigeriaBtn.classList.add('active');
        } else if (africanCountries.includes(category) && africanBtn) {
            africanBtn.classList.add('active');
        }
    }
    
    if (nigeriaDropdown) nigeriaDropdown.classList.remove('show');
    if (africanDropdown) africanDropdown.classList.remove('show');
}

// Initialize gallery when DOM loads
document.addEventListener('DOMContentLoaded', initGallery);
