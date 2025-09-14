// js/cart.js - Fixed Cart Management System

// Cart class to manage all cart operations
class Cart {
    constructor() {
        this.items = this.loadCart();
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

    // Add item to cart
    addItem(productId, quantity = 1) {
        // Get product data
        const product = window.products ? window.products[productId] : null;
        
        if (!product) {
            console.error('Product not found:', productId);
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

    // FIXED: Update cart display (cart icon badge) - only show on visible cart icon
    updateCartDisplay() {
        const totalItems = this.getTotalItems();
        
        // Remove all existing badges first
        const existingBadges = document.querySelectorAll('.cart-badge');
        existingBadges.forEach(badge => badge.remove());
        
        if (totalItems > 0) {
            // Get all cart icons
            const cartIcons = document.querySelectorAll('a[href="cart.html"]');
            
            cartIcons.forEach(cartIcon => {
                // Check if the cart icon is visible (not in mobile menu when desktop is shown)
                const isVisible = this.isElementVisible(cartIcon);
                
                if (isVisible) {
                    // Create and add badge only to visible cart icons
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
               rect.height > 0 &&
               // Additional check for parent visibility (for hamburger menu)
               !element.closest('.hamburger-nav[style*="display: none"]') &&
               !element.closest('#ham-nav[style*="display: none"]');
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
                }
            `;
            document.head.appendChild(style);
        }

        document.body.appendChild(notification);

        // Remove notification after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease-in';
            setTimeout(() => {
                notification.remove();
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

// FIXED: Function to handle cart icon clicks with product mapping - prevents double adding
function handleCartClick(cartButton) {
    // Prevent double-clicking by disabling button temporarily
    if (cartButton.disabled) return;
    
    cartButton.disabled = true;
    setTimeout(() => {
        cartButton.disabled = false;
    }, 1000); // Re-enable after 1 second

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
            window.addToCart(productId, 1);
        } else {
            console.error('Product ID not found for image:', imageSrc);
        }
    }
}

// FIXED: Initialize cart functionality when DOM is loaded - prevents duplicate event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Update cart display on page load
    window.cart.updateCartDisplay();
    
    // Update cart display on window resize to handle responsive visibility
    window.addEventListener('resize', () => {
        window.cart.updateCartDisplay();
    });
    
    // If on cart page, update cart content
    if (window.location.pathname.includes('cart.html')) {
        window.cart.updateCartPage();
    }

    // FIXED: Handle cart button clicks on product listings (home, shop pages) - remove duplicate listeners
    const cartButtons = document.querySelectorAll('.cart');
    cartButtons.forEach(function(button) {
        // Remove any existing listeners to prevent duplicates
        const newButton = button.cloneNode(true);
        button.parentNode.replaceChild(newButton, button);
        
        // Add single event listener
        newButton.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            handleCartClick(this);
        });
    });

    // FIXED: Handle add to cart button on product detail page - prevent double adding
    const addToCartBtn = document.getElementById('add-to-cart-btn');
    if (addToCartBtn) {
        // Remove any existing listeners
        const newBtn = addToCartBtn.cloneNode(true);
        addToCartBtn.parentNode.replaceChild(newBtn, addToCartBtn);
        
        newBtn.addEventListener('click', function() {
            // Prevent double-clicking
            if (this.disabled) return;
            
            this.disabled = true;
            setTimeout(() => {
                this.disabled = false;
            }, 1000);
            
            const urlParams = new URLSearchParams(window.location.search);
            const productId = urlParams.get('id');
            const quantityInput = document.getElementById('quantity-input');
            const quantity = quantityInput ? parseInt(quantityInput.value) || 1 : 1;
            
            if (productId) {
                window.addToCart(productId, quantity);
            }
        });
    }
});

// Export cart instance for global access
window.Cart = Cart;