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

export interface AdminProductResponse {
  products: Product[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    pages: number;
  };
}

/** ======================
 * 1. STOREFRONT / CUSTOMER METHODS
 * ====================== */

/** Fetch all active products */
export async function fetchProducts(params?: FetchParams): Promise<Product[]> {
  const response = await api.get("/products", { params });
  const data = response.data;
  return Array.isArray(data) ? data : data.products || [];
}

/** Fetch a single product by slug */
export async function fetchOneProduct(slug: string): Promise<Product> {
  const response = await api.get(`/products/slug/${slug}`);
  return response.data;
}

/** Fetch products in a specific category (paginated) */
export async function fetchCategoryProducts(
  slug: string,
  params?: FetchParams
): Promise<Product[]> {
  const response = await api.get(`/products/category/${slug}`, { params });
  const data = response.data;
  return Array.isArray(data) ? data : data.products || [];
}

/** Fetch category details for hero/description */
export async function fetchCategoryDetail(slug: string): Promise<Category> {
  const response = await api.get(`/categories/${slug}`);
  return response.data;
}

/** Fetch all categories */
export async function fetchAllCategories(): Promise<Category[]> {
  const response = await api.get("/categories");
  return response.data;
}

/** Fetch featured categories (homepage) */
export async function fetchFeaturedCategories(): Promise<FeaturedCategory[]> {
  const response = await api.get("/categories/featured");
  return response.data;
}

/** ======================
 * 2. ADMIN METHODS
 * ====================== */

/** Fetch all products (admin dashboard, includes inactive) */
export async function adminFetchAllProducts(
  params?: { page?: number; limit?: number; search?: string }
): Promise<AdminProductResponse> {
  try {
    const response = await api.get("/admin/products", { params });
    return response.data;
  } catch (error: any) {
    console.error("Admin fetch error:", error?.response?.data || error.message);
    return {
      products: [],
      pagination: { total: 0, page: 1, limit: 12, pages: 1 },
    };
  }
}

/** Create a new product (admin dashboard) */
export async function adminCreateProduct(productData: Partial<Product>): Promise<Product> {
  const response = await api.post("/admin/products", productData);
  return response.data;
}

/** Update an existing product */
export async function adminUpdateProduct(id: string, productData: Partial<Product>): Promise<Product> {
  const response = await api.put(`/admin/products/${id}`, productData);
  return response.data;
}

/** Delete a product permanently */
export async function adminDeleteProduct(id: string): Promise<void> {
  await api.delete(`/admin/products/${id}`);
}

/** Fetch all orders (admin) */
export async function adminFetchAllOrders(): Promise<any[]> {
  const response = await api.get("/admin/orders");
  return response.data || [];
}

/** Update order status */
export async function adminUpdateOrderStatus(id: string, status: string): Promise<any> {
  const response = await api.put(`/admin/orders/${id}`, { status });
  return response.data;
}

/** Fetch all customers (admin) */
export async function adminFetchAllCustomers(): Promise<any[]> {
  const response = await api.get("/admin/customers");
  return response.data || [];
}

/** Fetch all reviews (admin) */
export async function adminFetchAllReviews(): Promise<any[]> {
  const response = await api.get("/admin/reviews");
  return response.data || [];
}

/** Approve or disapprove a review */
export async function adminUpdateReviewApproval(id: string, approved: boolean): Promise<any> {
  const response = await api.put(`/admin/reviews/${id}`, { approved });
  return response.data;
}