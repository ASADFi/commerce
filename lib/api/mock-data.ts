import { Cart, Collection, Menu, Page, Product } from './types';

// Mock Products
export const mockProducts: Product[] = [
  {
    id: '1',
    handle: 'basic-tee',
    title: 'Basic Tee',
    description: 'A comfortable basic tee made from 100% cotton.',
    descriptionHtml: '<p>A comfortable basic tee made from 100% cotton.</p>',
    availableForSale: true,
    productType: 'Shirt',
    tags: ['clothing', 'shirt', 'basic'],
    vendor: 'Fashion Brand',
    priceRange: {
      minVariantPrice: { amount: '29.99', currencyCode: 'USD' },
      maxVariantPrice: { amount: '29.99', currencyCode: 'USD' }
    },
    compareAtPriceRange: {
      minVariantPrice: { amount: '39.99', currencyCode: 'USD' },
      maxVariantPrice: { amount: '39.99', currencyCode: 'USD' }
    },
    options: [
      {
        id: 'color',
        name: 'Color',
        values: ['Black', 'White', 'Gray']
      },
      {
        id: 'size',
        name: 'Size',
        values: ['S', 'M', 'L', 'XL']
      }
    ],
    variants: [
      {
        id: '1-black-s',
        title: 'Black / S',
        availableForSale: true,
        selectedOptions: [
          { name: 'Color', value: 'Black' },
          { name: 'Size', value: 'S' }
        ],
        price: { amount: '29.99', currencyCode: 'USD' }
      },
      {
        id: '1-black-m',
        title: 'Black / M',
        availableForSale: true,
        selectedOptions: [
          { name: 'Color', value: 'Black' },
          { name: 'Size', value: 'M' }
        ],
        price: { amount: '29.99', currencyCode: 'USD' }
      }
    ],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop',
        altText: 'Basic Tee in Black',
        width: 500,
        height: 500
      }
    ],
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop',
      altText: 'Basic Tee in Black',
      width: 500,
      height: 500
    },
    seo: {
      title: 'Basic Tee - Fashion Brand',
      description: 'A comfortable basic tee made from 100% cotton.'
    },
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '2',
    handle: 'denim-jeans',
    title: 'Denim Jeans',
    description: 'Classic denim jeans with a modern fit.',
    descriptionHtml: '<p>Classic denim jeans with a modern fit.</p>',
    availableForSale: true,
    productType: 'Pants',
    tags: ['clothing', 'pants', 'denim'],
    vendor: 'Fashion Brand',
    priceRange: {
      minVariantPrice: { amount: '79.99', currencyCode: 'USD' },
      maxVariantPrice: { amount: '79.99', currencyCode: 'USD' }
    },
    compareAtPriceRange: {
      minVariantPrice: { amount: '99.99', currencyCode: 'USD' },
      maxVariantPrice: { amount: '99.99', currencyCode: 'USD' }
    },
    options: [
      {
        id: 'color',
        name: 'Color',
        values: ['Blue', 'Black']
      },
      {
        id: 'size',
        name: 'Size',
        values: ['30', '32', '34', '36']
      }
    ],
    variants: [
      {
        id: '2-blue-30',
        title: 'Blue / 30',
        availableForSale: true,
        selectedOptions: [
          { name: 'Color', value: 'Blue' },
          { name: 'Size', value: '30' }
        ],
        price: { amount: '79.99', currencyCode: 'USD' }
      }
    ],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&h=500&fit=crop',
        altText: 'Denim Jeans in Blue',
        width: 500,
        height: 500
      }
    ],
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&h=500&fit=crop',
      altText: 'Denim Jeans in Blue',
      width: 500,
      height: 500
    },
    seo: {
      title: 'Denim Jeans - Fashion Brand',
      description: 'Classic denim jeans with a modern fit.'
    },
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  }
];

// Mock Collections
export const mockCollections: Collection[] = [
  {
    id: '1',
    handle: 'clothing',
    title: 'Clothing',
    description: 'All our clothing items',
    descriptionHtml: '<p>All our clothing items</p>',
    updatedAt: '2024-01-01T00:00:00Z',
    image: {
      url: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=500&h=300&fit=crop',
      altText: 'Clothing Collection',
      width: 500,
      height: 300
    },
    seo: {
      title: 'Clothing Collection',
      description: 'All our clothing items'
    },
    path: '/search/clothing'
  },
  {
    id: '2',
    handle: 'accessories',
    title: 'Accessories',
    description: 'Fashion accessories and jewelry',
    descriptionHtml: '<p>Fashion accessories and jewelry</p>',
    updatedAt: '2024-01-01T00:00:00Z',
    image: {
      url: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=500&h=300&fit=crop',
      altText: 'Accessories Collection',
      width: 500,
      height: 300
    },
    seo: {
      title: 'Accessories Collection',
      description: 'Fashion accessories and jewelry'
    },
    path: '/search/accessories'
  }
];

// Mock Menu
export const mockMenu: Menu[] = [
  { title: 'Home', path: '/' },
  { title: 'Shop', path: '/search' },
  { title: 'About', path: '/about' },
  { title: 'Contact', path: '/contact' }
];

// Mock Pages
export const mockPages: Page[] = [
  {
    id: '1',
    title: 'About Us',
    handle: 'about',
    body: 'We are a fashion brand dedicated to providing quality clothing.',
    bodySummary: 'We are a fashion brand dedicated to providing quality clothing.',
    seo: {
      title: 'About Us - Fashion Brand',
      description: 'Learn more about our fashion brand and mission.'
    },
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  }
];

// Mock Cart
export const mockCart: Cart = {
  id: 'cart-1',
  checkoutUrl: '/checkout',
  cost: {
    subtotalAmount: { amount: '29.99', currencyCode: 'USD' },
    totalAmount: { amount: '32.99', currencyCode: 'USD' },
    totalTaxAmount: { amount: '3.00', currencyCode: 'USD' }
  },
  lines: [
    {
      id: 'line-1',
      quantity: 1,
      cost: {
        totalAmount: { amount: '29.99', currencyCode: 'USD' }
      },
      merchandise: {
        id: '1-black-s',
        title: 'Black / S',
        selectedOptions: [
          { name: 'Color', value: 'Black' },
          { name: 'Size', value: 'S' }
        ],
        product: {
          id: '1',
          handle: 'basic-tee',
          title: 'Basic Tee',
          featuredImage: {
            url: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=100&h=100&fit=crop',
            altText: 'Basic Tee in Black',
            width: 100,
            height: 100
          }
        }
      }
    }
  ],
  totalQuantity: 1,
  createdAt: '2024-01-01T00:00:00Z',
  updatedAt: '2024-01-01T00:00:00Z'
};
