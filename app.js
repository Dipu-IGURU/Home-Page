// Mobile Navigation Toggle
const mobileMenuBtn = document.createElement('div');
mobileMenuBtn.className = 'mobile-menu-btn';
mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';

// Add mobile menu button to header
document.addEventListener('DOMContentLoaded', function() {
    const topHeader = document.querySelector('.top-header .container');
    if (window.innerWidth <= 768) {
        topHeader.appendChild(mobileMenuBtn);
    }
});

// Mobile Menu Toggle
mobileMenuBtn.addEventListener('click', function() {
    const nav = document.querySelector('.main-nav');
    nav.classList.toggle('mobile-active');
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Product Card Hover Effects
const productCards = document.querySelectorAll('.product-card');
productCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
        this.style.boxShadow = '0 5px 20px rgba(0,0,0,0.2)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    });
});

// Search Functionality
const searchBox = document.querySelector('.search-box');
searchBox.addEventListener('click', function() {
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Search products...';
    searchInput.className = 'search-input';
    
    const searchContainer = document.createElement('div');
    searchContainer.className = 'search-overlay';
    searchContainer.appendChild(searchInput);
    
    document.body.appendChild(searchContainer);
    searchInput.focus();
    
    searchContainer.addEventListener('click', function(e) {
        if (e.target === searchContainer) {
            searchContainer.remove();
        }
    });
    
    searchInput.addEventListener('keyup', function(e) {
        if (e.key === 'Escape') {
            searchContainer.remove();
        }
    });
});

// Sticky Header on Scroll
let lastScroll = 0;
const header = document.querySelector('header');

window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.classList.add('sticky');
        
        if (currentScroll > lastScroll) {
            header.classList.add('scroll-down');
        } else {
            header.classList.remove('scroll-down');
        }
    } else {
        header.classList.remove('sticky');
    }
    
    lastScroll = currentScroll;
});

// Load More Products
const loadMoreBtn = document.createElement('button');
loadMoreBtn.textContent = 'Load More Products';
loadMoreBtn.className = 'load-more-btn';

// Review Carousel
let currentReview = 0;
const reviews = document.querySelectorAll('.review-card');
const totalReviews = reviews.length;

function showReview(index) {
    reviews.forEach((review, i) => {
        if (i === index) {
            review.style.display = 'block';
        } else {
            review.style.display = 'none';
        }
    });
}

// Auto-rotate reviews on mobile
if (window.innerWidth <= 768) {
    showReview(0);
    setInterval(() => {
        currentReview = (currentReview + 1) % totalReviews;
        showReview(currentReview);
    }, 5000);
}

// Add custom styles for search overlay
const style = document.createElement('style');
style.textContent = `
    .search-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
    }
    
    .search-input {
        width: 80%;
        max-width: 600px;
        padding: 20px;
        font-size: 24px;
        border: none;
        border-radius: 10px;
        outline: none;
    }
    
    .mobile-menu-btn {
        display: none;
        cursor: pointer;
        font-size: 24px;
    }
    
    @media (max-width: 768px) {
        .mobile-menu-btn {
            display: block;
        }
        
        .main-nav {
            position: fixed;
            top: 0;
            left: -100%;
            width: 80%;
            height: 100vh;
            background: white;
            flex-direction: column;
            padding: 20px;
            box-shadow: 2px 0 10px rgba(0,0,0,0.1);
            transition: left 0.3s;
            z-index: 999;
        }
        
        .main-nav.mobile-active {
            left: 0;
        }
    }
    
    header.sticky {
        position: fixed;
        top: 0;
        width: 100%;
        z-index: 100;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        transition: transform 0.3s;
    }
    
    header.sticky.scroll-down {
        transform: translateY(-100%);
    }
`;
document.head.appendChild(style);

// Initialize animations on page load
window.addEventListener('load', function() {
    // Fade in elements
    const fadeElements = document.querySelectorAll('.product-card, .review-card');
    fadeElements.forEach((element, index) => {
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 100);
    });
});

// Form validation for future contact forms
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

// Print page functionality
function printPage() {
    window.print();
}

// Cookie notice (if needed)
function showCookieNotice() {
    const cookieNotice = document.createElement('div');
    cookieNotice.className = 'cookie-notice';
    cookieNotice.innerHTML = `
        <p>We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.</p>
        <button onclick="this.parentElement.remove()">Accept</button>
    `;
    document.body.appendChild(cookieNotice);
}

// Check if user has accepted cookies
if (!localStorage.getItem('cookiesAccepted')) {
    setTimeout(showCookieNotice, 2000);
}