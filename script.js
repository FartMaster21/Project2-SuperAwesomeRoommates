
const navLinks = document.querySelectorAll('.navigation a');

const pages = {
    home: document.getElementById('page-home'),
    'image gallery': document.getElementById('page-image gallery'),
    roommates: document.getElementById('page-roommates'),
    surprise: document.getElementById('page-surprise')
};

// Debug: check if all pages were found
console.log('Pages found:', {
    home: pages.home,
    'image gallery': pages['image gallery'],
    roommates: pages.roommates,
    surprise: pages.surprise
});

function setActivePage(pageId) {

    // Hide all pages
    Object.values(pages).forEach(p => p.classList.remove('active-page'));
    
    // Show the selected page
    if (pages[pageId]) { 
        pages[pageId].classList.add('active-page');
    }
    
    // Update active class on nav links
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.dataset.page === pageId) {
            link.classList.add('active');
        }
    });
}

navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const page = this.dataset.page;
        if (page) setActivePage(page);
    });
});

// Gallery — image carousel with arrows

const images = [
    'images/dorian.jpeg',  
    'images/grayson.jpeg',  
    'images/partyricky.jpeg',    
    'images/dorianbday.jpeg',
];

let currentIndex = 0;
const galleryImg = document.getElementById('galleryImage');
const counter = document.getElementById('imageCounter');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

function updateGallery(index) {
    // Wrap around if out of bounds
    if (index < 0) index = images.length - 1;
    if (index >= images.length) index = 0;
    
    currentIndex = index;
    galleryImg.src = images[currentIndex];
    galleryImg.alt = `Gallery image ${currentIndex + 1}`;
    counter.textContent = `${currentIndex + 1} / ${images.length}`;
}

// Click events for arrow buttons
prevBtn.addEventListener('click', function() {
    updateGallery(currentIndex - 1);
});

nextBtn.addEventListener('click', function() {
    updateGallery(currentIndex + 1);
});

// Keyboard support (left/right arrow keys)
document.addEventListener('keydown', function(e) {
    // Only work if gallery page is visible
    if (!pages.gallery.classList.contains('active-page')) return;
    
    if (e.key === 'ArrowLeft') {
        e.preventDefault();
        updateGallery(currentIndex - 1);
    } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        updateGallery(currentIndex + 1);
    }
});

// Initialize gallery with first image
updateGallery(0);

// Interactive Apt

// Clicks on clickable elements
document.querySelectorAll('.clickable.object').forEach(element => {
    element.addEventListener('click', function(e) {
        e.stopPropagation();
        setActivePage('home');

      const popup = document.getElementById('object-popup');
        document.getElementById('popup-title').textContent = this.dataset.name;        // Shows name
        document.getElementById('popup-description').textContent = this.dataset.description; // Shows description
        popup.style.display = 'block';
        
        // Positioning
        const rect = this.getBoundingClientRect();
        popup.style.position = 'fixed';
        popup.style.left = (rect.left + rect.width/2 - 150) + 'px';
        popup.style.top = (rect.top - 200) + 'px';

         // rug
        if (this.dataset.target === 'rug') {
            popup.classList.add('rug-mode');  // Add special rug class
        } else {
            popup.classList.remove('rug-mode'); // Remove for others
        }
        
        popup.style.display = 'block';
  });
});
        
document.querySelectorAll('.clickable.roommate').forEach(element => {
    element.addEventListener('click', function(e) {
        e.stopPropagation();
        
        const target = this.dataset.target;
        
            setActivePage('roommates');
            setTimeout(() => {
               const card = document.getElementById(`card-${target}`);
               if (card) {
                const image = card.querySelector('.roommate-image');
                if (image) {
                    card.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    
                    // Just change the border color
                    image.style.borderColor = 'rgb(0, 179, 255)';
                    
                    setTimeout(() => {
                        image.style.borderColor = '#001436';
                    }, 2000);
                }
            }
        }, 300);
    });
});

// Object Popup
function showObjectPopup(id) {
    const data = objectData[id];
    if (!data) return;
    
    const popup = document.getElementById('object-popup');
    document.getElementById('popup-title').textContent = data.name;
    document.getElementById('popup-description').textContent = data.description;
    popup.style.display = 'block';
}

function closeObjectPopup() {
    document.getElementById('object-popup').style.display = 'none';
}

// Close popup when clicking outside
document.addEventListener('click', function(e) {
    const popup = document.getElementById('object-popup');
    if (popup.style.display === 'block') {
        if (!popup.contains(e.target) && !e.target.closest('.clickable')) {
            popup.style.display = 'none';
        }
    }
});

// Click on roommate images to go to home page with simple pop effect
document.querySelectorAll('.roommate-image').forEach(image => {
    image.addEventListener('click', function() {
        const card = this.closest('.roommate-card');
        const name = card.querySelector('h3').textContent.toLowerCase();
        
        console.log('Clicked on:', name); 

        // Go to home page
        setActivePage('home');
        
        // After a short delay, find the roommate and pop them
        setTimeout(() => {
            const roommateElements = document.querySelectorAll('.clickable.roommate');
            console.log('Found roommate elements:', roommateElements.length);

            roommateElements.forEach(roommate => {
                if (roommate.dataset.target === name) {
                    // Scale up (like hover effect)
                    roommate.style.transform = 'scale(1.3)';
                    roommate.style.transition = 'transform 0.5s ease';
                    
                    // Scale back down after 300ms
                    setTimeout(() => {
                        roommate.style.transform = '';
                    }, 300);
                }
            });
        }, 300);
    });
});

// Set home as default
setActivePage('home');
//Code generated with the help of DeepSeek and/or DeepSeek was used as an aid//
