
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
    console.log('Switching to page:', pageId);

    // Hide all pages
    Object.values(pages).forEach(p => p.classList.remove('active-page'));
    
    // Show the selected page
    if (pages[pageId]) pages[pageId].classList.add('active-page');
    
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

// =============================================
// 2. GALLERY — image carousel with arrows
// =============================================

const images = [
    'images/ricky.jpg',   // ricky
    'images/Dorian.jpg',   // dorian
    'images/Untitled.jpg',    // untitled
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