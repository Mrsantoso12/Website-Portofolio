// Enhanced fix for services section scroll issues
document.addEventListener('DOMContentLoaded', function() {
    const servicesSection = document.querySelector('.service-section');
    
    if (!servicesSection) return;

    // Enable smooth scrolling for the section
    function enableSmoothScroll() {
        if (window.innerWidth <= 768) {
            // Remove any scroll-blocking styles
            document.body.style.overflow = 'auto';
            servicesSection.style.overflow = 'auto';
            
            // Ensure the section is scrollable
            servicesSection.style.height = 'auto';
            servicesSection.style.minHeight = '100vh';
            
            // Remove any transform styles that might interfere with scrolling
            const elements = servicesSection.getElementsByTagName('*');
            for (let element of elements) {
                element.style.transform = 'none';
                element.style.webkitTransform = 'none';
            }
        }
    }

    // Initialize scroll fix
    enableSmoothScroll();

    // Handle orientation change and resize
    window.addEventListener('resize', enableSmoothScroll);
    window.addEventListener('orientationchange', enableSmoothScroll);

    // Prevent any scroll blocking behaviors
    servicesSection.addEventListener('touchmove', function(e) {
        e.stopPropagation();
    }, { passive: true });

    // Fix for iOS momentum scrolling
    servicesSection.style.webkitOverflowScrolling = 'touch';

    // Ensure section is properly sized after content loads
    window.addEventListener('load', function() {
        servicesSection.style.height = 'auto';
        const sectionHeight = servicesSection.scrollHeight;
        servicesSection.style.minHeight = sectionHeight + 'px';
    });

    // Remove any scroll prevention on section focus
    servicesSection.addEventListener('focus', function() {
        document.body.style.overflow = 'auto';
    }, true);

    // Handle smooth anchor scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            if (this.getAttribute('href') === '#services') {
                e.preventDefault();
                servicesSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});