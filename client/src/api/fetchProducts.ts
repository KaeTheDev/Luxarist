/**
 * File: productService.ts
 * Purpose:
 *  Provides a centralized function to fetch products from the backend API,
 *  optionally filtering by new arrivals, category, or limiting the number of results.
 *  Abstracts Axios request logic and API endpoint handling for frontend usage.
 *
 * Responsibilities:
 *  - Determine the correct API base URL depending on the environment (development or production)
 *  - Make an HTTP GET request to the `/api/products` endpoint
 *  - Accept optional query parameters for filtering or limiting products:
 *      - `isNewArrival`: fetch only new arrival products
 *      - `limit`: restrict the number of products returned
 *      - `category`: filter products by category slug
 *  - Return the data in a type-safe manner as an array of `Product`
 *  - Keep frontend components clean by encapsulating API logic in one place
 *
 * Usage:
 *  - Import and call `fetchProducts` in components, hooks, or service files
 *  - Pass optional `params` to filter, limit, or categorize product results
 *  - Automatically handles query parameter serialization for Axios requests
 *  - Returns typed product data ready for display or further manipulation
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
    ids?: string[];
}

export async function fetchProducts(params?: FetchProductsParams): Promise<Product[]> {
    // Axios 'params' will turn { isNewArrival: true, limit: 8 } 
    // into: /api/products?isNewArrival=true&limit=8
    const response = await axios.get(`${API_BASE_URL}/api/products`, { params });
    return response.data;
}