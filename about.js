 class ReviewsSlider {
            constructor() {
                this.slider = document.getElementById('reviewsSlider');
                this.prevBtn = document.getElementById('prevBtn');
                this.nextBtn = document.getElementById('nextBtn');
                this.dotsContainer = document.getElementById('dotsContainer');
                
                this.currentSlide = 0;
                this.cardsPerView = this.getCardsPerView();
                this.totalCards = document.querySelectorAll('.review-card').length;
                this.totalSlides = Math.ceil(this.totalCards / this.cardsPerView);
                
                this.init();
            }
            
            getCardsPerView() {
                if (window.innerWidth <= 768) return 1;
                return 2;
            }
            
            init() {
                this.createDots();
                this.updateSlider();
                this.bindEvents();
                this.startAutoSlide();
            }
            
            createDots() {
                this.dotsContainer.innerHTML = '';
                for (let i = 0; i < this.totalSlides; i++) {
                    const dot = document.createElement('div');
                    dot.classList.add('dot');
                    if (i === 0) dot.classList.add('active');
                    dot.addEventListener('click', () => this.goToSlide(i));
                    this.dotsContainer.appendChild(dot);
                }
            }
            
            updateSlider() {
                const translateX = -this.currentSlide * (100 / this.totalSlides);
                this.slider.style.transform = `translateX(${translateX}%)`;
                
                // Update dots
                document.querySelectorAll('.dot').forEach((dot, index) => {
                    dot.classList.toggle('active', index === this.currentSlide);
                });
                
                // Update button states
                this.prevBtn.disabled = this.currentSlide === 0;
                this.nextBtn.disabled = this.currentSlide === this.totalSlides - 1;
            }
            
            nextSlide() {
                if (this.currentSlide < this.totalSlides - 1) {
                    this.currentSlide++;
                    this.updateSlider();
                }
            }
            
            prevSlide() {
                if (this.currentSlide > 0) {
                    this.currentSlide--;
                    this.updateSlider();
                }
            }
            
            goToSlide(index) {
                this.currentSlide = index;
                this.updateSlider();
            }
            
            bindEvents() {
                this.nextBtn.addEventListener('click', () => {
                    this.nextSlide();
                    this.resetAutoSlide();
                });
                
                this.prevBtn.addEventListener('click', () => {
                    this.prevSlide();
                    this.resetAutoSlide();
                });
                
                window.addEventListener('resize', () => {
                    const newCardsPerView = this.getCardsPerView();
                    if (newCardsPerView !== this.cardsPerView) {
                        this.cardsPerView = newCardsPerView;
                        this.totalSlides = Math.ceil(this.totalCards / this.cardsPerView);
                        this.currentSlide = 0;
                        this.createDots();
                        this.updateSlider();
                    }
                });
            }
            
            startAutoSlide() {
                this.autoSlideInterval = setInterval(() => {
                    if (this.currentSlide === this.totalSlides - 1) {
                        this.currentSlide = 0;
                    } else {
                        this.currentSlide++;
                    }
                    this.updateSlider();
                }, 4000);
            }
            
            resetAutoSlide() {
                clearInterval(this.autoSlideInterval);
                this.startAutoSlide();
            }
        }
        
        // Initialize the slider when the page loads
        document.addEventListener('DOMContentLoaded', () => {
            new ReviewsSlider();
        });