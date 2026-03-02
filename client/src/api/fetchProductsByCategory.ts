/**
 * File: fetchProductsByCategory.ts
 * Purpose:
 * Provides a granular data fetching utility to retrieve products belonging 
 * to a specific category with support for advanced filtering and sorting.
 *
 * Responsibilities:
 * - Dynamically switch between Development and Production API base URLs
 * - Construct an asynchronous GET request to the category-specific products endpoint
 * - Handle complex query parameters including price ranges, sorting methods, 
 * and pagination (page/limit)
 * - Set default values for pagination (page 1, limit 12) to ensure consistent data loading
 *
 * Usage:
 * - Employed within CategoryPage.tsx to populate the product grid based 
 * on the current URL slug (e.g., 'bracelets', 'rings')
 * - Triggered by UI changes in the "Sort By" dropdown or Price Filter 
 * to refresh the product list with new parameters
 */

import axios from "axios";

const API_BASE_URL = 
import.meta.env.MODE === "development"
? import.meta.env.VITE_API_BASE_URL
: import.meta.env.VITE_API_URL;

interface FetchProductsParams {
    slug: string;
    minPrice?: number;
    maxPrice?: number;
    sort?: string;
    page?: number;
    limit?: number;
}

export async function fetchProductsByCategory ({
    slug, minPrice, maxPrice, sort, page = 1, limit = 12
}: FetchProductsParams) {
    const response = await axios.get(
        `${API_BASE_URL}/api/products/category/${slug}`,
        {
          params: {
            minPrice,
            maxPrice,
            sort,
            page,
            limit,
          },
        }
      );
    
      return response.data;
    }