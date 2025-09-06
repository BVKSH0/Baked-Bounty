// shop-links.js - Handle product navigation from shop page

document.addEventListener('DOMContentLoaded', function() {
    // Add click handlers to all products
    const productElements = document.querySelectorAll('.product');
    
    // Define product mappings based on image sources
    const productMappings = {
        'assets/Products/f1.png': 'masako-seasoning',
        'assets/Products/f2.png': 'teriyaki-sauce', 
        'assets/Products/f3.png': 'almond-milk',
        'assets/Products/f4.png': 'ramen-family-pack',
        'assets/Products/f5.png': 'herman-mayonnaise',
        'assets/Products/f6.png': 'blueberry-filling',
        'assets/Products/f7.png': 'strawberry-filling',
        'assets/Products/f8.png': 'coco-chips',
        'assets/Products/f9.png': 'cream-cheese',
        'assets/Products/f10.jpg': 'boba-pearls',
        'assets/Products/f11.png': 'corn-syrup',
        'assets/Products/f12.png': 'flavoured-pastes'
    };
    
    productElements.forEach(function(product, index) {
        // Remove any existing onclick attributes to avoid conflicts
        product.removeAttribute('onclick');
        
        // Find the product image to determine which product this is
        const productImage = product.querySelector('.pro-img');
        if (productImage) {
            const imageSrc = productImage.getAttribute('src');
            const productId = productMappings[imageSrc];
            
            if (productId) {
                // Add click handler to navigate to product page with correct ID
                product.style.cursor = 'pointer';
                product.addEventListener('click', function(e) {
                    // Prevent cart button clicks from triggering product navigation
                    if (e.target.classList.contains('cart') || e.target.closest('a')) {
                        return;
                    }
                    window.location.href = `sproduct.html?id=${productId}`;
                });
            }
        }
    });
    
    // Handle cart button clicks separately (prevent navigation)
    const cartButtons = document.querySelectorAll('.cart');
    cartButtons.forEach(function(button) {
        button.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent product navigation
            // Add your cart functionality here
            console.log('Added to cart');
        });
    });
});

// Alternative method if you prefer to update the HTML directly
function navigateToProduct(productId) {
    window.location.href = `sproduct.html?id=${productId}`;
}