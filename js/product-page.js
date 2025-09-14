// product-page.js - Handle individual product page functionality
// Updated to work with the cart system

// Define these functions at the top level to make them globally accessible
function getProductById(productId) {
    return window.products ? window.products[productId] || null : null;
}

function getAllProducts() {
    return window.products ? Object.values(window.products) : [];
}

function getProductsByCategory(category) {
    const allProducts = getAllProducts();
    return allProducts.filter(product => product.category === category);
}

function getRandomProducts(count = 4) {
    const allProducts = getAllProducts();
    const shuffled = allProducts.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

function navigateToProduct(productId) {
    document.body.classList.add("fade-out");
    setTimeout(() => {
        window.location.href = `sproduct.html?id=${productId}`;
    }, 300); // delay to let fade-out play
}

// Updated addToCart function to use the cart system
function addToCart(productId, quantity = 1) {
    if (window.cart) {
        return window.cart.addItem(productId, quantity);
    } else {
        console.error('Cart system not loaded');
        alert('Cart system not available. Please refresh the page.');
        return false;
    }
}

// Main initialization
document.addEventListener('DOMContentLoaded', function() {
    // Check if products data is available
    if (typeof window.products === 'undefined') {
        console.error('Products data not loaded!');
        showErrorState();
        return;
    }
    
    // Get product ID from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    
    // Show loading state
    showLoadingState();
    
    if (!productId) {
        showErrorState();
        return;
    }
    
    // Get product data
    const product = getProductById(productId);
    
    if (!product) {
        showErrorState();
        return;
    }
    
    // Load product data
    loadProductData(product);
    loadRelatedProducts(product.category, product.id);
    
    // Initialize image gallery
    initializeImageGallery();
    
    // Handle add to cart - now integrated with cart system
    setupAddToCart(product);
});

function showLoadingState() {
    const loadingEl = document.getElementById('loading');
    const errorEl = document.getElementById('error');
    const prodetailsEl = document.getElementById('prodetails');
    
    if (loadingEl) loadingEl.style.display = 'block';
    if (errorEl) errorEl.style.display = 'none';
    if (prodetailsEl) prodetailsEl.style.display = 'none';
}

function showErrorState() {
    const loadingEl = document.getElementById('loading');
    const errorEl = document.getElementById('error');
    const prodetailsEl = document.getElementById('prodetails');
    
    if (loadingEl) loadingEl.style.display = 'none';
    if (errorEl) errorEl.style.display = 'block';
    if (prodetailsEl) prodetailsEl.style.display = 'none';
}

function showProductState() {
    const loadingEl = document.getElementById('loading');
    const errorEl = document.getElementById('error');
    const prodetailsEl = document.getElementById('prodetails');
    
    if (loadingEl) loadingEl.style.display = 'none';
    if (errorEl) errorEl.style.display = 'none';
    if (prodetailsEl) prodetailsEl.style.display = 'flex';
}

function loadProductData(product) {
    // Update page title
    document.getElementById('page-title').textContent = `${product.name} - Baked Bounty`;
    document.title = `${product.name} - Baked Bounty`;
    
    // Update breadcrumb
    document.getElementById('breadcrumb').textContent = `home / shop / ${product.name.toLowerCase()}`;
    
    // Update product details
    document.getElementById('product-name').textContent = product.name;
    document.getElementById('product-price').textContent = product.price;
    document.getElementById('product-description').textContent = product.description;
    document.getElementById('product-brand').textContent = product.brand;
    document.getElementById('product-category').textContent = product.category;
    document.getElementById('product-stock').textContent = product.inStock ? 'In Stock' : 'Out of Stock';
    
    // Update main image
    const mainImg = document.getElementById('MainImg');
    if (mainImg && product.images.length > 0) {
        mainImg.src = product.images[0];
        mainImg.alt = product.name;
    }
    
    // Update small images gallery with *other products* instead of same product's images
    const smallImgGrp = document.getElementById('small-img-grp');
    if (smallImgGrp) {
        smallImgGrp.innerHTML = '';

        // Get 4 other products (exclude the current one)
        const otherProducts = getAllProducts().filter(p => p.id !== product.id).slice(0, 4);

        otherProducts.forEach(related => {
            const smallImg = document.createElement('div');
            smallImg.className = 'small-img-col';
            smallImg.innerHTML = `
                <img 
                    src="${related.images[0]}" 
                    width="100%" 
                    class="small-img" 
                    alt="${related.name}" 
                    data-product-id="${related.id}" />
            `;
            smallImgGrp.appendChild(smallImg);
        });
    }
    
    // Update features list
    const featuresList = document.getElementById('features-list');
    if (featuresList) {
        featuresList.innerHTML = '';
        
        product.features.forEach(feature => {
            const li = document.createElement('li');
            li.textContent = feature;
            featuresList.appendChild(li);
        });
    }
    
    // Show product section
    showProductState();
}

function initializeImageGallery() {
    const smallImages = document.querySelectorAll('.small-img');
    
    smallImages.forEach(img => {
        img.addEventListener('click', function() {
            const productId = this.getAttribute('data-product-id');
            if (productId) {
                navigateToProduct(productId); // open that product's full page
            }
        });
    });
}

function loadRelatedProducts(category, currentProductId) {
    const relatedProductsContainer = document.getElementById('related-products');
    if (!relatedProductsContainer) return;
    
    const allProducts = getAllProducts();
    
    // Filter products by same category, excluding current product
    let relatedProducts = allProducts.filter(product => 
        product.category === category && product.id !== currentProductId
    );
    
    // If not enough related products in same category, add random products
    if (relatedProducts.length < 4) {
        const otherProducts = allProducts.filter(product => 
            product.category !== category && product.id !== currentProductId
        );
        relatedProducts = [...relatedProducts, ...otherProducts].slice(0, 4);
    } else {
        relatedProducts = relatedProducts.slice(0, 4);
    }
    
    // Generate HTML for related products
    relatedProductsContainer.innerHTML = '';
    
    relatedProducts.forEach(product => {
        const productHTML = `
            <div class="product" onclick="navigateToProduct('${product.id}')">
                <img class="pro-img" src="${product.images[0]}" alt="${product.name}" />
                <div class="product-des">
                    <span>${product.brand}</span>
                    <h5>${product.name}</h5>
                    <div class="price">
                        <h4 class="original-price">${product.originalPrice}</h4>
                        <h4 class="discounted-price">${product.discountedPrice}</h4>
                    </div>
                </div>
                <a href="#" onclick="event.stopPropagation(); addToCart('${product.id}'); return false;">
                    <img
                        class="icon cart"
                        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAARtJREFUSEvdlc0RgjAUhDeeYhfQCXaiV20gJwicXgN61U6gE+nC3KKJQ8yMQhJGZhxzzM/7s    ru8wLDwYAvXxx8BeC30F+3qVUW5qecs+jIAqiJb+y0DXgsJoILGRUnapajijdhC4+yffQdIkYHhCsDJjIXwRrTQKMCwUyVdPiowk26jxkZJ6qIBQ44auZLUTwGeUhk6VdImBvDJnnHADJu4FOZC20eutarI5GjHaKM5m2Ku7+/x7JkGSGHCahPq92Coh3DDCl42AYlh+5eafIucrzN6IqjAfq5PFcamLMaqoXujFTjIynZnEYLMAoSKhtaj/gfrRhy1xp4xnG4lHYaiY/NJFlmbvKfct2FsPhmwuIKQz1PrURn8NOAO/hCLGVMxPKUAAAAASUVORK5CYII="
                    />
                </a>
            </div>
        `;
        relatedProductsContainer.innerHTML += productHTML;
    });
}

function setupAddToCart(product) {
    const addToCartBtn = document.getElementById('add-to-cart-btn');
    const quantityInput = document.getElementById('quantity-input');
    
    if (addToCartBtn && quantityInput) {
        addToCartBtn.addEventListener('click', function() {
            const quantity = parseInt(quantityInput.value) || 1;
            addToCart(product.id, quantity);
        });
    }
}

// Make functions globally available
window.getProductById = getProductById;
window.getAllProducts = getAllProducts;
window.navigateToProduct = navigateToProduct;
window.addToCart = addToCart;