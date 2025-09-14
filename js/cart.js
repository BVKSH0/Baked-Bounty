// js/cart.js - Final Fixed Cart Management System

// Cart class to manage all cart operations
class Cart {
    constructor() {
        this.items = this.loadCart();
        this.isProcessing = false; // Prevent double processing
        this.updateCartDisplay();
    }

    // Load cart from localStorage or return empty array
    loadCart() {
        try {
            const cartData = localStorage.getItem('bakedBountyCart');
            return cartData ? JSON.parse(cartData) : [];
        } catch (error) {
            console.error('Error loading cart:', error);
            return [];
        }
    }

    // Save cart to localStorage
    saveCart() {
        try {
            localStorage.setItem('bakedBountyCart', JSON.stringify(this.items));
        } catch (error) {
            console.error('Error saving cart:', error);
        }
    }

    // FIXED: Add item to cart with proper duplicate prevention
    addItem(productId, quantity = 1) {
        // Prevent multiple rapid calls
        if (this.isProcessing) {
            console.log('Cart operation in progress, please wait...');
            return false;
        }

        this.isProcessing = true;
        
        // Get product data
        const product = window.products ? window.products[productId] : null;
        
        if (!product) {
            console.error('Product not found:', productId);
            this.isProcessing = false;
            return false;
        }

        // Check if item already exists in cart
        const existingItemIndex = this.items.findIndex(item => item.id === productId);
        
        if (existingItemIndex >= 0) {
            // Update quantity if item exists
            this.items[existingItemIndex].quantity += quantity;
        } else {
            // Add new item to cart
            this.items.push({
                id: productId,
                name: product.name,
                brand: product.brand,
                price: product.price,
                image: product.images[0],
                quantity: quantity
            });
        }

        this.saveCart();
        this.updateCartDisplay();
        this.showAddToCartNotification(product.name);
        
        // Reset processing flag after a short delay
        setTimeout(() => {
            this.isProcessing = false;
        }, 500);
        
        return true;
    }

    // Remove item from cart
    removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.saveCart();
        this.updateCartDisplay();
        this.updateCartPage();
    }

    // Update item quantity
    updateQuantity(productId, quantity) {
        const itemIndex = this.items.findIndex(item => item.id === productId);
        if (itemIndex >= 0) {
            if (quantity <= 0) {
                this.removeItem(productId);
            } else {
                this.items[itemIndex].quantity = quantity;
                this.saveCart();
                this.updateCartDisplay();
                this.updateCartPage();
            }
        }
    }

    // Get cart total
    getTotal() {
        return this.items.reduce((total, item) => {
            const price = parseFloat(item.price.replace('৳', '').replace(',', ''));
            return total + (price * item.quantity);
        }, 0);
    }

    // Get total items count
    getTotalItems() {
        return this.items.reduce((total, item) => total + item.quantity, 0);
    }

    // Clear entire cart
    clearCart() {
        this.items = [];
        this.saveCart();
        this.updateCartDisplay();
        this.updateCartPage();
    }

    // FIXED: Update cart display - exclude footer links and only show on navigation cart icons
    updateCartDisplay() {
        const totalItems = this.getTotalItems();
        
        // Remove all existing badges first
        const existingBadges = document.querySelectorAll('.cart-badge');
        existingBadges.forEach(badge => badge.remove());
        
        if (totalItems > 0) {
            // FIXED: Only target navigation cart icons, not footer cart links
            const navCartIcons = document.querySelectorAll('#header a[href="cart.html"], #navbar a[href="cart.html"], #ham-nav a[href="cart.html"]');
            
            navCartIcons.forEach(cartIcon => {
                // Check if the cart icon is visible and not in footer
                const isVisible = this.isElementVisible(cartIcon);
                const isInFooter = cartIcon.closest('footer') !== null;
                
                if (isVisible && !isInFooter) {
                    // Create and add badge only to visible navigation cart icons
                    const cartBadge = document.createElement('span');
                    cartBadge.className = 'cart-badge';
                    cartBadge.textContent = totalItems;
                    
                    // Make sure parent has relative positioning
                    cartIcon.style.position = 'relative';
                    cartIcon.appendChild(cartBadge);
                }
            });
        }
    }

    // Helper function to check if element is visible
    isElementVisible(element) {
        if (!element) return false;
        
        const style = window.getComputedStyle(element);
        const rect = element.getBoundingClientRect();
        
        // Check if element is visible (not hidden by CSS and has dimensions)
        return style.display !== 'none' && 
               style.visibility !== 'hidden' && 
               style.opacity !== '0' &&
               rect.width > 0 && 
               rect.height > 0;
    }

    // Show add to cart notification
    showAddToCartNotification(productName) {
        // Remove existing notification if any
        const existingNotification = document.querySelector('.cart-notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        // Create notification
        const notification = document.createElement('div');
        notification.className = 'cart-notification';
        notification.innerHTML = `
            <div class="notification-content">
                <i class="bx bx-check-circle"></i>
                <span>Added "${productName}" to cart!</span>
            </div>
        `;

        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: #088178;
            color: white;
            padding: 15px 20px;
            border-radius: 5px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 1000;
            animation: slideIn 0.3s ease-out;
        `;

        // Add animation styles if not already present
        if (!document.querySelector('#cart-notification-styles')) {
            const style = document.createElement('style');
            style.id = 'cart-notification-styles';
            style.textContent = `
                @keyframes slideIn {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                @keyframes slideOut {
                    from { transform: translateX(0); opacity: 1; }
                    to { transform: translateX(100%); opacity: 0; }
                }
                .cart-notification .notification-content {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                }
                .cart-badge {
                    position: absolute;
                    top: -5px;
                    right: -5px;
                    background: #ff4444;
                    color: white;
                    border-radius: 50%;
                    width: 20px;
                    height: 20px;
                    font-size: 12px;
                    font-weight: bold;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    min-width: 20px;
                    z-index: 10;
                }
            `;
            document.head.appendChild(style);
        }

        document.body.appendChild(notification);

        // Remove notification after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease-in';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }, 3000);
    }

    // Update cart page content
    updateCartPage() {
        const cartTable = document.querySelector('#cart table tbody');
        const subtotalSection = document.querySelector('#subtotal');
        
        if (!cartTable) return; // Not on cart page

        // Clear existing cart items
        cartTable.innerHTML = '';

        // Add cart items to table
        this.items.forEach(item => {
            const price = parseFloat(item.price.replace('৳', '').replace(',', ''));
            const subtotal = price * item.quantity;

            const row = document.createElement('tr');
            row.innerHTML = `
                <td><a href="#" onclick="cart.removeItem('${item.id}'); return false;"><i class='bx bx-trash trashcon'></i></a></td>
                <td><img src="${item.image}" alt="${item.name}"></td>
                <td>${item.name}</td>
                <td>${item.price}</td>
                <td><input type="number" value="${item.quantity}" min="1" onchange="cart.updateQuantity('${item.id}', parseInt(this.value))"></td>
                <td>${subtotal.toFixed(0)}৳</td>
            `;
            cartTable.appendChild(row);
        });

        // Update cart totals
        if (subtotalSection) {
            const total = this.getTotal();
            const subtotalTable = subtotalSection.querySelector('table');
            if (subtotalTable) {
                subtotalTable.innerHTML = `
                    <tr>
                        <td>Cart Subtotal</td>
                        <td>${total.toFixed(0)}৳</td>
                    </tr>
                    <tr>
                        <td>Shipping</td>
                        <td>Free</td>
                    </tr>
                    <tr>
                        <td><strong>Total</strong></td>
                        <td><strong>${total.toFixed(0)}৳</strong></td>
                    </tr>
                `;
            }
        }

        // Show empty cart message if no items
        if (this.items.length === 0) {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td colspan="6" style="text-align: center; padding: 40px;">
                    <h3>Your cart is empty</h3>
                    <p>Add some products to get started!</p>
                    <a href="shop.html" class="normal" style="display: inline-block; margin-top: 20px; text-decoration: none;">Continue Shopping</a>
                </td>
            `;
            cartTable.appendChild(row);

            // Hide subtotal section if cart is empty
            if (subtotalSection) {
                subtotalSection.style.display = 'none';
            }
        } else {
            if (subtotalSection) {
                subtotalSection.style.display = 'block';
            }
        }
    }
}

// Initialize cart globally
window.cart = new Cart();

// Enhanced addToCart function for global use
window.addToCart = function(productId, quantity = 1) {
    return window.cart.addItem(productId, quantity);
};

// FIXED: Function to handle cart icon clicks - improved duplicate prevention
function handleCartClick(cartButton) {
    // Check if button is already processing or disabled
    if (cartButton.disabled || cartButton.classList.contains('processing')) {
        return false;
    }
    
    // Mark button as processing
    cartButton.disabled = true;
    cartButton.classList.add('processing');
    
    // Visual feedback
    const originalText = cartButton.innerHTML;
    if (cartButton.tagName === 'IMG') {
        cartButton.style.opacity = '0.6';
    }
    
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

    // Find the product image to determine which product this is
    const productElement = cartButton.closest('.product');
    const productImage = productElement ? productElement.querySelector('.pro-img') : null;
    
    if (productImage) {
        const imageSrc = productImage.getAttribute('src');
        const productId = productMappings[imageSrc];
        
        if (productId) {
            const success = window.addToCart(productId, 1);
            
            // Re-enable button after processing
            setTimeout(() => {
                cartButton.disabled = false;
                cartButton.classList.remove('processing');
                if (cartButton.tagName === 'IMG') {
                    cartButton.style.opacity = '1';
                }
            }, 1000);
            
            return success;
        } else {
            console.error('Product ID not found for image:', imageSrc);
        }
    }
    
    // Re-enable button if there was an error
    cartButton.disabled = false;
    cartButton.classList.remove('processing');
    if (cartButton.tagName === 'IMG') {
        cartButton.style.opacity = '1';
    }
    
    return false;
}

// FIXED: Initialize cart functionality - prevent duplicate listeners and improve event handling
document.addEventListener('DOMContentLoaded', function() {
    // Update cart display on page load
    window.cart.updateCartDisplay();
    
    // Update cart display on window resize
    window.addEventListener('resize', () => {
        setTimeout(() => {
            window.cart.updateCartDisplay();
        }, 100);
    });
    
    // If on cart page, update cart content
    if (window.location.pathname.includes('cart.html')) {
        window.cart.updateCartPage();
    }

    // FIXED: Handle cart button clicks with improved event delegation
    document.addEventListener('click', function(e) {
        // Check if clicked element is a cart button
        if (e.target.classList.contains('cart') || 
            (e.target.closest('a') && e.target.closest('a').querySelector('.cart'))) {
            
            e.preventDefault();
            e.stopPropagation();
            
            const cartButton = e.target.classList.contains('cart') ? 
                             e.target : 
                             e.target.closest('a').querySelector('.cart');
            
            handleCartClick(cartButton);
        }
    });

    // FIXED: Handle add to cart button on product detail page
    const addToCartBtn = document.getElementById('add-to-cart-btn');
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Prevent double-clicking
            if (this.disabled) return false;
            
            this.disabled = true;
            const originalText = this.textContent;
            this.textContent = 'Adding...';
            
            const urlParams = new URLSearchParams(window.location.search);
            const productId = urlParams.get('id');
            const quantityInput = document.getElementById('quantity-input');
            const quantity = quantityInput ? parseInt(quantityInput.value) || 1 : 1;
            
            if (productId) {
                const success = window.addToCart(productId, quantity);
                
                setTimeout(() => {
                    this.disabled = false;
                    this.textContent = originalText;
                }, 1000);
                
                return success;
            }
            
            // Re-enable if failed
            this.disabled = false;
            this.textContent = originalText;
            return false;
        });
    }
});

// Export cart instance for global access
window.Cart = Cart;