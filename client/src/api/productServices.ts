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
import type { Product } from "../types/Product";
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

/** General Product Fetching
 * Used by: Homepage, New Arrivals Page, Favorites Page
 */

export async function fetchProducts(params?: FetchParams): Promise<Product[]> {
  const response = await api.get('/api/products', { params });
  return response.data;
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
export async function fetchCategoryProducts(slug: string, params?: FetchParams) {
  const response = await api.get(`/api/products/category/${slug}`, { params });
  return response.data; 
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