// products.js - Product data for Baked Bounty
const products = {
  'masako-seasoning': {
    id: 'masako-seasoning',
    name: 'Masako Meat Seasoning',
    brand: 'Masako',
    price: '650৳',
    originalPrice: '650৳',
    discountedPrice: '650৳',
    images: [
      'assets/Products/f1.png',
      'assets/Products/f2.png', 
      'assets/Products/f3.png',
      'assets/Products/f4.png'
    ],
    description: 'Premium meat seasoning that enhances the flavor of your dishes. Perfect for grilling, roasting, and everyday cooking. Made with high-quality spices and natural ingredients for authentic taste.',
    category: 'Seasonings',
    inStock: true,
    features: [
      'All-natural ingredients',
      'No artificial preservatives', 
      'Perfect for meat dishes',
      'Easy to use'
    ]
  },

  'herman-mayonnaise': {
    id: 'herman-mayonnaise',
    name: 'Herman Mayonnaise',
    brand: 'Herman',
    price: '650৳',
    originalPrice: '650৳', 
    discountedPrice: '650৳',
    images: [
      'assets/Products/f5.png',
      'assets/Products/f1.png',
      'assets/Products/f2.png', 
      'assets/Products/f3.png'
    ],
    description: 'Creamy and rich mayonnaise perfect for sandwiches, salads, and cooking. Made with premium ingredients for the perfect taste and texture.',
    category: 'Condiments',
    inStock: true,
    features: [
      'Creamy texture',
      'Premium quality',
      'Versatile use',
      'Long shelf life'
    ]
  },

  'blueberry-filling': {
    id: 'blueberry-filling',
    name: 'Blueberry Filling',
    brand: 'Baked & Bounty',
    price: '650৳',
    originalPrice: '650৳',
    discountedPrice: '650৳', 
    images: [
      'assets/Products/f6.png',
      'assets/Products/f7.png',
      'assets/Products/f8.png',
      'assets/Products/f9.png'
    ],
    description: 'Delicious blueberry filling perfect for cakes, pastries, and desserts. Made with real blueberries for authentic flavor and natural sweetness.',
    category: 'Baking Supplies',
    inStock: true,
    features: [
      'Made with real blueberries',
      'Perfect for baking',
      'Natural flavor',
      'No artificial colors'
    ]
  },

  'strawberry-filling': {
    id: 'strawberry-filling', 
    name: 'Strawberry Filling',
    brand: 'Baked & Bounty',
    price: '650৳',
    originalPrice: '650৳',
    discountedPrice: '650৳',
    images: [
      'assets/Products/f7.png',
      'assets/Products/f6.png',
      'assets/Products/f8.png', 
      'assets/Products/f9.png'
    ],
    description: 'Sweet and tangy strawberry filling ideal for cakes, tarts, and pastries. Made with premium strawberries for exceptional taste.',
    category: 'Baking Supplies', 
    inStock: true,
    features: [
      'Premium strawberry flavor',
      'Perfect consistency', 
      'Great for baking',
      'Natural ingredients'
    ]
  },

  'coco-chips': {
    id: 'coco-chips',
    name: 'Coco Chips',
    brand: 'Malaysian',
    price: '650৳',
    originalPrice: '650৳',
    discountedPrice: '650৳',
    images: [
      'assets/Products/f8.png',
      'assets/Products/f9.png',
      'assets/Products/f10.jpg',
      'assets/Products/f11.png'
    ],
    description: 'Crispy and delicious coconut chips, perfect as a snack or ingredient for baking. Made from fresh coconuts with authentic Malaysian quality.',
    category: 'Snacks',
    inStock: true,
    features: [
      'Made from fresh coconuts',
      'Crispy texture',
      'Malaysian quality',
      'Perfect for snacking'
    ]
  },

  'cream-cheese': {
    id: 'cream-cheese',
    name: 'Cream Cheese', 
    brand: 'Beqa',
    price: '650৳',
    originalPrice: '650৳',
    discountedPrice: '650৳',
    images: [
      'assets/Products/f9.png',
      'assets/Products/f10.jpg',
      'assets/Products/f11.png',
      'assets/Products/f12.png'
    ],
    description: 'Smooth and creamy cheese perfect for spreading, baking, and cooking. High-quality cream cheese with rich flavor and perfect texture.',
    category: 'Dairy',
    inStock: true,
    features: [
      'Smooth texture',
      'Rich flavor',
      'Versatile use',
      'Premium quality'
    ]
  },

  'boba-pearls': {
    id: 'boba-pearls',
    name: 'Boba Pearls',
    brand: 'Doking', 
    price: '650৳',
    originalPrice: '650৳',
    discountedPrice: '650৳',
    images: [
      'assets/Products/f10.jpg',
      'assets/Products/f11.png',
      'assets/Products/f12.png',
      'assets/Products/f1.png'
    ],
    description: 'Authentic boba pearls perfect for bubble tea and desserts. Easy to prepare and provides the perfect chewy texture.',
    category: 'Beverages',
    inStock: true,
    features: [
      'Authentic taste',
      'Easy to prepare',
      'Perfect texture',
      'Great for bubble tea'
    ]
  },

  'corn-syrup': {
    id: 'corn-syrup',
    name: 'Corn Syrup',
    brand: 'Baked & Bounty',
    price: '650৳',
    originalPrice: '650৳', 
    discountedPrice: '650৳',
    images: [
      'assets/Products/f11.png',
      'assets/Products/f12.png',
      'assets/Products/f1.png',
      'assets/Products/f2.png'
    ],
    description: 'High-quality corn syrup perfect for baking, candy making, and cooking. Provides excellent sweetness and texture to your recipes.',
    category: 'Baking Supplies',
    inStock: true,
    features: [
      'High quality',
      'Perfect for baking',
      'Excellent sweetness',
      'Versatile ingredient'
    ]
  },

  'flavoured-pastes': {
    id: 'flavoured-pastes',
    name: 'Flavoured Pastes',
    brand: 'Thai Choice',
    price: '650৳',
    originalPrice: '650৳',
    discountedPrice: '650৳',
    images: [
      'assets/Products/f12.png',
      'assets/Products/f1.png',
      'assets/Products/f2.png',
      'assets/Products/f3.png'
    ],
    description: 'Authentic Thai flavored pastes for cooking traditional and modern dishes. Made with premium ingredients for authentic taste.',
    category: 'Condiments',
    inStock: true,
    features: [
      'Authentic Thai flavors',
      'Premium ingredients',
      'Perfect for cooking',
      'Traditional recipes'
    ]
  },

  'teriyaki-sauce': {
    id: 'teriyaki-sauce',
    name: 'Teriyaki Sauce',
    brand: 'Baked & Bounty',
    price: '650৳',
    originalPrice: '650৳',
    discountedPrice: '650৳',
    images: [
      'assets/Products/f2.png',
      'assets/Products/f3.png',
      'assets/Products/f4.png',
      'assets/Products/f5.png'
    ],
    description: 'Rich and flavorful teriyaki sauce perfect for marinades, stir-fries, and glazes. Authentic Japanese taste with premium ingredients.',
    category: 'Condiments',
    inStock: true,
    features: [
      'Authentic Japanese flavor',
      'Perfect for marinades',
      'Rich taste',
      'Premium quality'
    ]
  },

  'almond-milk': {
    id: 'almond-milk',
    name: 'Almond Milk',
    brand: 'Baked & Bounty',
    price: '650৳',
    originalPrice: '650৳',
    discountedPrice: '650৳',
    images: [
      'assets/Products/f3.png',
      'assets/Products/f4.png',
      'assets/Products/f5.png',
      'assets/Products/f6.png'
    ],
    description: 'Creamy and nutritious almond milk, perfect for drinking, cereals, and baking. Made from premium almonds with natural flavor.',
    category: 'Beverages',
    inStock: true,
    features: [
      'Made from premium almonds',
      'Nutritious and healthy',
      'Creamy texture',
      'Natural flavor'
    ]
  },

  'ramen-family-pack': {
    id: 'ramen-family-pack',
    name: 'Ramen Family Pack',
    brand: 'Baked & Bounty',
    price: '650৳',
    originalPrice: '650৳',
    discountedPrice: '650৳',
    images: [
      'assets/Products/f4.png',
      'assets/Products/f5.png',
      'assets/Products/f6.png',
      'assets/Products/f7.png'
    ],
    description: 'Delicious instant ramen noodles in family pack size. Perfect for quick meals with authentic flavors and quality ingredients.',
    category: 'Instant Food',
    inStock: true,
    features: [
      'Family pack size',
      'Quick and easy',
      'Authentic flavors',
      'Quality ingredients'
    ]
  }
};

// Helper functions
function getProductById(productId) {
  return products[productId] || null;
}

function getAllProducts() {
  return Object.values(products);
}

function getProductsByCategory(category) {
  return Object.values(products).filter(product => product.category === category);
}

function getRandomProducts(count = 4) {
  const allProducts = Object.values(products);
  const shuffled = allProducts.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}


// Expose globally
window.products = products;
