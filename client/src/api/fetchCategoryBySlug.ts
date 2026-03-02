/**
 * File: fetchCategoryBySlug.ts
 * Purpose:
 * Provides a dedicated data fetching utility to retrieve a specific 
 * jewelry category's metadata (title, description, hero image) from the backend.
 *
 * Responsibilities:
 * - Determine the correct API endpoint based on the current environment (VITE_API_BASE_URL vs VITE_API_URL)
 * - Perform an asynchronous GET request to the category slug endpoint
 * - Handle parameter typing for category identification via URL slugs
 * - Ensure the returned data conforms to the Category TypeScript interface for frontend type safety
 *
 * Usage:
 * - Called within the CategoryPage component to dynamically load content for 
 * the CategoryHero (e.g., "Bracelets", "Earrings")
 * - Relies on the slug parameter typically parsed from the browser's URL path
 */

import axios from "axios";
import type { Category } from "../types/Category";

const API_BASE_URL =
  import.meta.env.MODE === "development"
    ? import.meta.env.VITE_API_BASE_URL
    : import.meta.env.VITE_API_URL;

interface FetchCategoryParams {
  slug: string;
}

export async function fetchCategoryBySlug({ slug }: FetchCategoryParams): Promise<Category> {
  const response = await axios.get(`${API_BASE_URL}/api/categories/${slug}`);
  return response.data;
}