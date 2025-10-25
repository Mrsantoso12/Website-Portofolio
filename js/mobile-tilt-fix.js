// Disable tilt effect on mobile devices
function isMobile() {
    return window.innerWidth <= 768;
}

function handleTiltEffect() {
    const serviceItems = document.querySelectorAll('.service-item');
    const contactCards = document.querySelectorAll('.contact-card');
    const linkCards = document.querySelectorAll('.link-card');
    
    if (isMobile()) {
        // Remove tilt effect on mobile
        serviceItems.forEach(item => {
            if (item._vanilla) {
                item._vanilla.destroy();
            }
            // Remove data attributes that trigger tilt
            item.removeAttribute('data-tilt');
            item.removeAttribute('data-tilt-scale');
        });

        contactCards.forEach(card => {
            if (card._vanilla) {
                card._vanilla.destroy();
            }
            card.removeAttribute('data-tilt');
            card.removeAttribute('data-tilt-scale');
        });

        linkCards.forEach(card => {
            if (card._vanilla) {
                card._vanilla.destroy();
            }
            card.removeAttribute('data-tilt');
            card.removeAttribute('data-tilt-scale');
        });
    } else {
        // Re-initialize tilt effect for desktop
        serviceItems.forEach(item => {
            if (!item._vanilla) {
                VanillaTilt.init(item, {
                    max: 25,
                    speed: 300,
                    glare: false
                });
            }
        });

        contactCards.forEach(card => {
            if (!card._vanilla) {
                VanillaTilt.init(card, {
                    max: 25,
                    speed: 400
                });
            }
        });

        linkCards.forEach(card => {
            if (!card._vanilla) {
                VanillaTilt.init(card, {
                    max: 25,
                    speed: 400
                });
            }
        });
    }
}

// Run on page load
document.addEventListener('DOMContentLoaded', handleTiltEffect);

// Run on resize
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(handleTiltEffect, 250);
});