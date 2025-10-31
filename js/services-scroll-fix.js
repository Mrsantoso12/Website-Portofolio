// Simple fix for services section scroll issues
document.addEventListener('DOMContentLoaded', function() {
    // Disable all animations and transitions on mobile
    function disableEffects() {
        if (window.innerWidth <= 768) {
            document.body.classList.add('mobile-device');
            
            // Remove all transform effects from service items
            document.querySelectorAll('.service-item').forEach(item => {
                item.style.transform = 'none';
                item.style.transition = 'none';
                if (item._vanilla) {
                    item._vanilla.destroy();
                }
            });

            // Ensure proper overflow settings
            document.body.style.overflow = 'auto';
            document.body.style.height = 'auto';
            
            // Reset any problematic styles
            const servicesSection = document.querySelector('.service-section');
            if (servicesSection) {
                servicesSection.style.position = 'relative';
                servicesSection.style.overflow = 'visible';
                servicesSection.style.height = 'auto';
            }
        }
    }

    // Run on load and resize
    disableEffects();
    window.addEventListener('resize', disableEffects);
    window.addEventListener('orientationchange', disableEffects);

    // Add touch handling for mobile
    let startY;
    document.addEventListener('touchstart', function(e) {
        startY = e.touches[0].pageY;
    }, { passive: true });

    document.addEventListener('touchmove', function(e) {
        if (!startY) {
            return;
        }

        const y = e.touches[0].pageY;
        const direction = startY - y;
        const scrollable = e.target.closest('.service-section');
        const scrollTop = scrollable ? scrollable.scrollTop : 0;
        const scrollHeight = scrollable ? scrollable.scrollHeight : 0;
        const offsetHeight = scrollable ? scrollable.offsetHeight : 0;

        // Allow default scrolling
        if (scrollable) {
            if (direction > 0 && scrollTop < scrollHeight - offsetHeight) {
                // Scrolling up and not at bottom
                return;
            }
            if (direction < 0 && scrollTop > 0) {
                // Scrolling down and not at top
                return;
            }
        }
    }, { passive: true });
});