import { Cart, Collection, Menu, Page, Product } from './types';

// Base API configuration
const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:3000/api';

export class ApiClient {
  private baseUrl: string;

  constructor(baseUrl?: string) {
    this.baseUrl = baseUrl || API_BASE_URL;
  }

  private async fetch<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`);
    }

    return response.json();
  }

  // Products
  async getProducts(options?: { limit?: number; offset?: number }): Promise<Product[]> {
    const params = new URLSearchParams();
    if (options?.limit) params.append('limit', options.limit.toString());
    if (options?.offset) params.append('offset', options.offset.toString());
    
    return this.fetch<Product[]>(`/products?${params.toString()}`);
  }

  async getProduct(handle: string): Promise<Product> {
    return this.fetch<Product>(`/products/${handle}`);
  }

  async getProductRecommendations(productId: string): Promise<Product[]> {
    return this.fetch<Product[]>(`/products/${productId}/recommendations`);
  }

  // Collections
  async getCollections(): Promise<Collection[]> {
    return this.fetch<Collection[]>('/collections');
  }

  async getCollection(handle: string): Promise<Collection> {
    return this.fetch<Collection>(`/collections/${handle}`);
  }

  async getCollectionProducts(handle: string, options?: { limit?: number; offset?: number }): Promise<Product[]> {
    const params = new URLSearchParams();
    if (options?.limit) params.append('limit', options.limit.toString());
    if (options?.offset) params.append('offset', options.offset.toString());
    
    return this.fetch<Product[]>(`/collections/${handle}/products?${params.toString()}`);
  }

  // Cart
  async getCart(cartId: string): Promise<Cart> {
    return this.fetch<Cart>(`/cart/${cartId}`);
  }

  async createCart(): Promise<Cart> {
    return this.fetch<Cart>('/cart', { method: 'POST' });
  }

  async addToCart(cartId: string, productId: string, quantity: number): Promise<Cart> {
    return this.fetch<Cart>(`/cart/${cartId}/items`, {
      method: 'POST',
      body: JSON.stringify({ productId, quantity }),
    });
  }

  async updateCartItem(cartId: string, itemId: string, quantity: number): Promise<Cart> {
    return this.fetch<Cart>(`/cart/${cartId}/items/${itemId}`, {
      method: 'PUT',
      body: JSON.stringify({ quantity }),
    });
  }

  async removeFromCart(cartId: string, itemId: string): Promise<Cart> {
    return this.fetch<Cart>(`/cart/${cartId}/items/${itemId}`, {
      method: 'DELETE',
    });
  }

  // Menu
  async getMenu(handle: string): Promise<Menu[]> {
    return this.fetch<Menu[]>(`/menu/${handle}`);
  }

  // Pages
  async getPages(): Promise<Page[]> {
    return this.fetch<Page[]>('/pages');
  }

  async getPage(handle: string): Promise<Page> {
    return this.fetch<Page>(`/pages/${handle}`);
  }

  // Search
  async searchProducts(query: string, options?: { limit?: number; offset?: number }): Promise<Product[]> {
    const params = new URLSearchParams({ q: query });
    if (options?.limit) params.append('limit', options.limit.toString());
    if (options?.offset) params.append('offset', options.offset.toString());
    
    return this.fetch<Product[]>(`/search?${params.toString()}`);
  }
}

// Export a default instance
export const apiClient = new ApiClient();

// Export individual functions for backward compatibility
export const getProducts = (options?: { limit?: number; offset?: number }) => apiClient.getProducts(options);
export const getProduct = (handle: string) => apiClient.getProduct(handle);
export const getProductRecommendations = (productId: string) => apiClient.getProductRecommendations(productId);
export const getCollections = () => apiClient.getCollections();
export const getCollection = (handle: string) => apiClient.getCollection(handle);
export const getCollectionProducts = (handle: string, options?: { limit?: number; offset?: number }) => apiClient.getCollectionProducts(handle, options);
export const getCart = (cartId?: string) => apiClient.getCart(cartId || 'default');
export const createCart = () => apiClient.createCart();
export const addToCart = (cartId: string, productId: string, quantity: number) => apiClient.addToCart(cartId, productId, quantity);
export const updateCartItem = (cartId: string, itemId: string, quantity: number) => apiClient.updateCartItem(cartId, itemId, quantity);
export const removeFromCart = (cartId: string, itemId: string) => apiClient.removeFromCart(cartId, itemId);
export const getMenu = (handle: string) => apiClient.getMenu(handle);
export const getPages = () => apiClient.getPages();
export const getPage = (handle: string) => apiClient.getPage(handle);
export const searchProducts = (query: string, options?: { limit?: number; offset?: number }) => apiClient.searchProducts(query, options);
