// Prevent automatic scrolling
let isScrolling;
let lastScrollTop = 0;

// Helper function to prevent body scrolling when menu is open
function toggleBodyScrolling() {
    document.body.classList.toggle('no-scroll');
}

// Add scroll event listener
window.addEventListener('scroll', function(e) {
    const st = window.pageYOffset || document.documentElement.scrollTop;
    
    // Clear the timeout throughout the scroll
    window.clearTimeout(isScrolling);
    
    // Set a timeout to run after scrolling ends
    isScrolling = setTimeout(function() {
        // Reset scroll position if it was automatic
        if (Math.abs(st - lastScrollTop) > 100) {
            window.scrollTo({
                top: lastScrollTop,
                behavior: 'auto'
            });
        }
    }, 66);
    
    lastScrollTop = st;
}, false);

// Prevent scroll restoration on page reload
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

// Fix for mobile browsers
document.addEventListener('touchmove', function(e) {
    if (document.body.classList.contains('no-scroll')) {
        e.preventDefault();
    }
}, { passive: false });

// Fix for smooth scrolling on anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});