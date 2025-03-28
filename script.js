document.addEventListener('DOMContentLoaded', () => {
    // Create 30 animated stars
    const createStars = () => {
        const container = document.querySelector('.stars-container');
        container.innerHTML = '';
        
        for(let i = 0; i < 30; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            
            star.style.cssText = `
                width: ${Math.random() * 3 + 2}px;
                height: ${Math.random() * 3 + 2}px;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation-duration: ${Math.random() * 5 + 3}s;
                animation-delay: ${Math.random() * 2}s;
                opacity: ${Math.random() * 0.5 + 0.5};
            `;
            
            container.appendChild(star);
        }
    };

    // Enhanced Carousel Class
    class Carousel {
        constructor(element, speed = 0.4) {
            this.element = element;
            this.track = element.querySelector('.carousel-track');
            this.items = Array.from(this.track.children);
            this.speed = speed;
            this.position = 0;
            this.isScrolling = true;
            this.scrollTimeout = null;

            this.cloneItems();
            this.initEvents();
            this.startAutoScroll();
        }

        cloneItems() {
            const clones = this.items.map(item => item.cloneNode(true));
            clones.forEach(clone => this.track.appendChild(clone));
        }

        initEvents() {
            this.element.addEventListener('mouseenter', () => {
                this.isScrolling = false;
            });

            this.element.addEventListener('mouseleave', () => {
                this.isScrolling = true;
            });

            this.element.addEventListener('wheel', (e) => {
                this.position += e.deltaY * 0.3;
                clearTimeout(this.scrollTimeout);
                this.scrollTimeout = setTimeout(() => {
                    this.isScrolling = true;
                }, 2000);
            });
        }

        startAutoScroll() {
            const animate = () => {
                if(this.isScrolling) {
                    this.position += this.speed;
                    const maxScroll = this.items[0].offsetWidth * this.items.length;
                    
                    if(this.position >= maxScroll) {
                        this.position = 0;
                        this.track.style.transition = 'none';
                        this.track.style.transform = `translateX(0)`;
                        void this.track.offsetWidth;
                    }
                    
                    this.track.style.transition = 'transform 0.3s ease-out';
                    this.track.style.transform = `translateX(-${this.position}px)`;
                }
                requestAnimationFrame(animate);
            }
            animate();
        }
    }

    // Initialize everything
    createStars();
    new Carousel(document.getElementById('photoCarousel'));
    new Carousel(document.getElementById('messageCarousel'), 0.3);

    // Click handlers
    document.querySelectorAll('#photoCarousel img, .message').forEach(item => {
        item.addEventListener('click', () => {
            alert(item.tagName === 'IMG' ? `Viewing: ${item.alt}` : item.textContent);
        });
    });
});
