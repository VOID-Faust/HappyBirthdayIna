document.addEventListener('DOMContentLoaded', () => {
    const createStars = () => {
        const container = document.querySelector('.stars-container');
        if (!container) return;

        const fragment = document.createDocumentFragment();
        for (let i = 0; i < 35; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            const size = Math.random() * 4 + 2;
            Object.assign(star.style, {
                width: `${size}px`,
                height: `${size}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDuration: `${Math.random() * 10 + 5}s`,
                animationDelay: `${Math.random() * 5}s`,
            });
            fragment.appendChild(star);
        }
        container.appendChild(fragment);
    };
    createStars();

    const setupCarousel = (carouselId, scrollSpeed) => {
        const carousel = document.getElementById(carouselId);
        if (!carousel) return;

        const track = carousel.querySelector('.carousel-track') || carousel;
        const items = Array.from(track.children);
        if (!items.length) return;

        const itemWidth = items[0].offsetWidth;
        let scrollPos = 0;
        let isUserScrolling = false;
        let scrollTimeout;

        // Clone items for smooth infinite scrolling
        items.forEach(item => track.appendChild(item.cloneNode(true)));

        const autoScroll = () => {
            if (isUserScrolling) return;

            scrollPos += scrollSpeed;
            const maxScroll = itemWidth * items.length;

            if (scrollPos >= maxScroll) {
                scrollPos = 0;
                track.style.transition = 'none';
                track.style.transform = `translateX(0)`;
                void track.offsetWidth; // Force reflow
            }

            track.style.transition = 'transform 0.1s linear';
            track.style.transform = `translateX(-${scrollPos}px)`;

            requestAnimationFrame(autoScroll);
        };

        const pauseScroll = () => (isUserScrolling = true);
        const resumeScroll = () => {
            isUserScrolling = false;
            requestAnimationFrame(autoScroll);
        };

        carousel.addEventListener('mouseenter', pauseScroll);
        carousel.addEventListener('mouseleave', resumeScroll);
        carousel.addEventListener('wheel', (e) => {
            isUserScrolling = true;
            clearTimeout(scrollTimeout);
            scrollPos += e.deltaY * 0.5;
            scrollTimeout = setTimeout(() => (isUserScrolling = false), 1500);
        });

        // Click handlers for displaying item details
        track.addEventListener('click', (e) => {
            const target = e.target.closest('img, .message');
            if (target) alert(target.alt || target.textContent);
        });

        setTimeout(autoScroll, 1000);
    };

    setupCarousel('photoCarousel', 0.4);
    setupCarousel('messageCarousel', 0.3);
});
