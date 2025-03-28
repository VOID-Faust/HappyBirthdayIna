document.addEventListener('DOMContentLoaded', function() {
    // Create animated stars
    function createStars() {
        const container = document.querySelector('.stars-container');
        const starCount = 35;
        
        for (let i = 0; i < starCount; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            
            // Random size between 2-6px
            const size = Math.random() * 4 + 2;
            star.style.width = `${size}px`;
            star.style.height = `${size}px`;
            
            // Random starting position
            star.style.left = `${Math.random() * 100}%`;
            star.style.top = `${Math.random() * 100}%`;
            
            // Random animation
            const duration = Math.random() * 10 + 5;
            star.style.animationDuration = `${duration}s`;
            star.style.animationDelay = `${Math.random() * 5}s`;
            
            container.appendChild(star);
        }
    }
    createStars();

    // Carousel functionality
    function setupCarousel(carouselId, scrollSpeed) {
        const carousel = document.getElementById(carouselId);
        const track = carouselId === 'photoCarousel' 
            ? carousel.querySelector('.carousel-track')
            : carousel;
        const items = Array.from(track.children);
        
        // Clone items for infinite loop
        const clones = items.map(item => item.cloneNode(true));
        clones.forEach(clone => track.appendChild(clone));
        
        let scrollPos = 0;
        let isAutoScrolling = true;
        let isUserScrolling = false;
        let scrollTimeout;
        
        // Auto-scroll function
        function autoScroll() {
            if (!isAutoScrolling || isUserScrolling) return;
            
            scrollPos += scrollSpeed;
            const itemWidth = items[0].offsetWidth + 
                parseInt(window.getComputedStyle(track).gap.replace('px', ''));
            const maxScroll = itemWidth * items.length;
            
            if (scrollPos >= maxScroll) {
                scrollPos = 0;
                if (carouselId === 'photoCarousel') {
                    track.style.transition = 'none';
                    track.style.transform = `translateX(0)`;
                    void track.offsetWidth; // Force reflow
                } else {
                    carousel.scrollLeft = 0;
                }
            }
            
            if (carouselId === 'photoCarousel') {
                track.style.transition = 'transform 0.1s linear';
                track.style.transform = `translateX(-${scrollPos}px)`;
            } else {
                carousel.scrollLeft = scrollPos;
            }
            
            requestAnimationFrame(autoScroll);
        }
        
        // Pause on hover
        carousel.addEventListener('mouseenter', () => {
            isAutoScrolling = false;
        });
        
        carousel.addEventListener('mouseleave', () => {
            isAutoScrolling = true;
        });
        
        // Manual scrolling
        carousel.addEventListener('wheel', (e) => {
            isUserScrolling = true;
            clearTimeout(scrollTimeout);
            
            if (carouselId === 'photoCarousel') {
                scrollPos += e.deltaY * 0.5;
            } else {
                scrollPos = carousel.scrollLeft + e.deltaY;
            }
            
            scrollTimeout = setTimeout(() => {
                isUserScrolling = false;
            }, 1500);
        });
        
        // Click handlers
        items.concat(clones).forEach(item => {
            item.addEventListener('click', () => {
                if (carouselId === 'photoCarousel') {
                    alert(`Showing: ${item.alt}`);
                } else {
                    alert(item.textContent);
                }
            });
        });
        
        // Start auto-scroll
        setTimeout(autoScroll, 1000);
    }
    
    // Initialize carousels
    setupCarousel('photoCarousel', 0.4); // Photos scroll faster
    setupCarousel('messageCarousel', 0.3); // Messages scroll slower
});
