/**
 * File: fetchProducts.ts
 * Purpose:
 * Provides a flexible, centralized utility for fetching jewelry products 
 * from the backend with support for filtering, sorting, and pagination.
 *
 * Responsibilities:
 * - Dynamically select the API base URL based on the environment (Development vs. Production)
 * - Execute asynchronous GET requests to the main products endpoint
 * - Map optional frontend filter parameters (category, new arrivals, limits) into URL query strings
 * - Ensure the returned data conforms to the Product TypeScript interface for safe rendering
 *
 * Usage:
 * - Used in the Home page to fetch "New Arrivals" (isNewArrival: true, limit: 8)
 * - Used in the Shop All and Category pages to filter by specific collections (category: 'rings')
 * - Integrated with the product grid to dynamically update content based on user selection
 */

import axios from "axios";
import type { Product } from "../types/Product";

const API_BASE_URL =
import.meta.env.MODE === "development"
? import.meta.env.VITE_API_BASE_URL
: import.meta.env.VITE_API_URL;

interface FetchProductsParams {
    isNewArrival?: boolean;
    limit?: number;
    category?: string;
}

export async function fetchProducts(params?: FetchProductsParams): Promise<Product[]> {
    // Axios 'params' will turn { isNewArrival: true, limit: 8 } 
    // into: /api/products?isNewArrival=true&limit=8
    const response = await axios.get(`${API_BASE_URL}/api/products`, { params });
    return response.data;
}