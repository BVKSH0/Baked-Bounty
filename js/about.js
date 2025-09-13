document.addEventListener('DOMContentLoaded', function() {
            const slider = document.getElementById('reviewsSlider');
            const prevBtn = document.getElementById('prevBtn');
            const nextBtn = document.getElementById('nextBtn');
            const dotsContainer = document.getElementById('dotsContainer');
            
            const cards = slider.querySelectorAll('.review-card');
            const cardCount = cards.length;
            
            let currentIndex = 0;
            let cardsPerView = 3; // Default for desktop
            
            // Function to update cards per view based on screen size
            function updateCardsPerView() {
                if (window.innerWidth <= 768) {
                    cardsPerView = 1;
                } else if (window.innerWidth <= 1024) {
                    cardsPerView = 2;
                } else {
                    cardsPerView = 3;
                }
                
                // Update slider position
                updateSliderPosition();
                updateDots();
            }
            
            // Calculate the width of a card including gap
            function getCardWidth() {
                const cardStyle = getComputedStyle(cards[0]);
                const cardWidth = cards[0].offsetWidth;
                const gap = parseInt(getComputedStyle(slider).gap) || 30;
                return cardWidth + gap;
            }
            
            // Update slider position based on current index
            function updateSliderPosition() {
                const cardWidth = getCardWidth();
                const translateX = -currentIndex * cardWidth;
                slider.style.transform = `translateX(${translateX}px)`;
                
                // Update button states
                prevBtn.disabled = currentIndex === 0;
                nextBtn.disabled = currentIndex >= cardCount - cardsPerView;
                
                updateDots();
            }
            
            // Create dots for navigation
            function createDots() {
                dotsContainer.innerHTML = '';
                const dotCount = Math.ceil(cardCount / cardsPerView);
                
                for (let i = 0; i < dotCount; i++) {
                    const dot = document.createElement('div');
                    dot.classList.add('dot');
                    if (i === 0) dot.classList.add('active');
                    
                    dot.addEventListener('click', () => {
                        currentIndex = i * cardsPerView;
                        updateSliderPosition();
                    });
                    
                    dotsContainer.appendChild(dot);
                }
            }
            
            // Update active dot
            function updateDots() {
                const dots = dotsContainer.querySelectorAll('.dot');
                const activeDotIndex = Math.floor(currentIndex / cardsPerView);
                
                dots.forEach((dot, index) => {
                    if (index === activeDotIndex) {
                        dot.classList.add('active');
                    } else {
                        dot.classList.remove('active');
                    }
                });
            }
            
            // Next slide
            nextBtn.addEventListener('click', () => {
                if (currentIndex < cardCount - cardsPerView) {
                    currentIndex++;
                    updateSliderPosition();
                }
            });
            
            // Previous slide
            prevBtn.addEventListener('click', () => {
                if (currentIndex > 0) {
                    currentIndex--;
                    updateSliderPosition();
                }
            });
            
            // Initialize
            updateCardsPerView();
            createDots();
            
            // Update on window resize
            window.addEventListener('resize', () => {
                updateCardsPerView();
                createDots(); // Recreate dots as number of slides may change
            });
            
            // Touch swipe support for mobile
            let touchStartX = 0;
            let touchEndX = 0;
            
            slider.addEventListener('touchstart', e => {
                touchStartX = e.changedTouches[0].screenX;
            }, false);
            
            slider.addEventListener('touchend', e => {
                touchEndX = e.changedTouches[0].screenX;
                handleSwipe();
            }, false);
            
            function handleSwipe() {
                const minSwipeDistance = 50; // Minimum distance for a swipe to register
                
                if (touchStartX - touchEndX > minSwipeDistance) {
                    // Swipe left - go to next slide
                    if (currentIndex < cardCount - cardsPerView) {
                        currentIndex++;
                        updateSliderPosition();
                    }
                } else if (touchEndX - touchStartX > minSwipeDistance) {
                    // Swipe right - go to previous slide
                    if (currentIndex > 0) {
                        currentIndex--;
                        updateSliderPosition();
                    }
                }
            }
        });