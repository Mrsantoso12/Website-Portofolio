// Fix for services section scroll issue
document.addEventListener('DOMContentLoaded', function() {
    const servicesSection = document.querySelector('.service-section');
    const serviceItems = document.querySelectorAll('.service-item');
    
    // Store initial scroll position
    let lastScrollPosition = window.pageYOffset;
    
    // Prevent scroll jump on mobile touch
    if (window.innerWidth <= 768) {
        serviceItems.forEach(item => {
            item.addEventListener('touchstart', function(e) {
                lastScrollPosition = window.pageYOffset;
            }, { passive: true });
            
            item.addEventListener('touchend', function(e) {
                // Prevent default only if significant scroll occurred
                if (Math.abs(window.pageYOffset - lastScrollPosition) > 50) {
                    e.preventDefault();
                    window.scrollTo({
                        top: lastScrollPosition,
                        behavior: 'auto'
                    });
                }
            });
        });
    }
    
    // Disable automatic scroll restoration
    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    }
    
    // Handle intersection observer for services section
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const servicesObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // When services section comes into view
                document.body.style.overflow = 'auto';
            }
        });
    }, observerOptions);
    
    if (servicesSection) {
        servicesObserver.observe(servicesSection);
    }
    
    // Prevent unwanted scroll when touching service items
    serviceItems.forEach(item => {
        item.addEventListener('touchmove', function(e) {
            if (window.innerWidth <= 768) {
                if (e.touches.length === 1) {
                    e.preventDefault();
                }
            }
        }, { passive: false });
    });
});