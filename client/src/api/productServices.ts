/**
 * File: productService.ts
 * Purpose:
 * The centralized "Master Service" for all product and category data.
 * This file orchestrates every API call related to the catalog, from 
 * individual product details to filtered category grids and featured collections.
 *
 * Responsibilities:
 * - Environment Management: Dynamically switches between Development and 
 * Production API base URLs using Vite environment variables.
 * - Data Abstraction: Encapsulates complex Axios request logic, including 
 * query parameter serialization (sorting, filtering, pagination).
 * - Type Safety: Ensures all returned data strictly follows the TypeScript 
 * interfaces for `Product`, `Category`, and `FeaturedCategory`.
 * - Performance: Provides a single source of truth to prevent redundant 
 * fetch logic across different feature folders.
 *
 * Usage:
 * - Import specific functions ({ fetchProducts, fetchOneProduct, etc. }) 
 * into page controllers (Homepage, ShopAllPage, ProductDetailPage).
 * - Use `FetchParams` to pass dynamic filters like `isNewArrival`, `category`, 
 * or `priceRange` without manual string concatenation.
 * - Handles both simple array responses and paginated object responses 
 * consistently for the frontend UI.
 */

import api from "./axios";
import type { Product } from "../features/dashboard/shared/types";
import type { Category } from "../types/Category";
import type { FeaturedCategory } from "../types/FeaturedCategory";

// Covers all parameters used across the shop, category and arrivals pages
export interface FetchParams {
    isNewArrival?: boolean;
    limit?: number;
    category?: string;
    ids?: string[];
    minPrice?: number;
    maxPrice?: number;
    sort?: string;
    page?: number;
}

/** * --- 1. STOREFRONT / CUSTOMER METHODS ---
 * Logic: Fetches only 'active' status products.
 */

/** General Product Fetching
 * Used by: Homepage, New Arrivals Page, Favorites Page
 */

export async function fetchProducts(params?: FetchParams): Promise<Product[]> {
  const response = await api.get('/api/products', { params });
  
  // This check looks at the data coming from your Express route
  // If it's the raw array (Shape A), it uses it.
  // If it's the wrapped object (Shape B), it grabs the .products array inside it.
  const data = response.data;
  return Array.isArray(data) ? data : (data.products || []);
}

/** Category Specific Data
 * Used by: CategoryPage (for the Hero/Description)
 */

export async function fetchCategoryDetail(slug: string): Promise<Category> {
  const response = await api.get(`/api/categories/${slug}`);
  return response.data;
}

/** Category Products (with Pagination)
 * Used by: CategoryPage, ShopAllPage
 */
export async function fetchCategoryProducts(slug: string, params?: FetchParams): Promise<Product[]> {
  const response = await api.get(`/api/products/category/${slug}`, { params });
  
  const data = response.data;
  // Same logic here to ensure ShopAllPage always gets a clickable list
  return Array.isArray(data) ? data : (data.products || []);
}
  
  /** Single Product Detail
   * Used by: ProductDetailPage
   */
  export async function fetchOneProduct(slug: string): Promise<Product> {
    const response = await api.get(`/api/products/slug/${slug}`);
    return response.data;
}

  /** * 5. FEATURED CATEGORIES
 * Used by: FeaturedCollectionsSection (on the Homepage)
 */
  export async function fetchFeaturedCategories(): Promise<FeaturedCategory[]> {
    const response = await api.get('/api/categories/featured');
    return response.data;
}

/** * --- 2. ADMIN METHODS (The Equivalence Bridge) ---
 * Logic: Full access to all products, including hidden/inactive items.
 * Used by: Admin Dashboard, Inventory Management
 */

/** Fetches ALL products for the Admin Table (regardless of status) */
export async function adminFetchAllProducts(): Promise<Product[]> {
  try {
    const response = await api.get('/api/admin/products');
    const data = response.data;

    // Handle backend shape
    if (Array.isArray(data)) return data;
    if (data.products) return data.products;

    return [];
  } catch (error: any) {
    console.error("Admin fetch error:", error?.response?.data || error.message);
    return [];
  }
}

/** Creates a new product from the Admin Form */
export async function adminCreateProduct(productData: Partial<Product>): Promise<Product> {
  // Matches backend: router.post("/products", adminCreateProduct)
  const response = await api.post('/api/admin/products', productData);
  return response.data;
}

/** Updates an existing product (Price, Specs, Status toggle) */
export async function adminUpdateProduct(id: string, productData: Partial<Product>): Promise<Product> {
  // Matches backend: router.put("/products/:id", adminUpdateProduct)
  const response = await api.put(`/api/admin/products/${id}`, productData);
  return response.data;
}

/** Permanently deletes a product */
export async function adminDeleteProduct(id: string): Promise<void> {
  // Matches backend: router.delete("/products/:id", adminDeleteProduct)
  await api.delete(`/api/admin/products/${id}`);
}