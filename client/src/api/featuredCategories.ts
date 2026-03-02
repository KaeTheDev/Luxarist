/**
 * File: featuredCategoriesService.ts
 * Purpose:
 *  Provides a dedicated function to fetch the list of featured categories
 *  from the backend API. Centralizes the API endpoint usage for featured
 *  categories and abstracts away the Axios request logic.
 *
 * Responsibilities:
 *  - Determine the correct API base URL depending on the environment (dev or prod)
 *  - Make an HTTP GET request to the `/api/categories/featured` endpoint
 *  - Return the data in a type-safe manner as an array of FeaturedCategory
 *  - Simplify usage in frontend components by encapsulating the API logic
 *
 * Usage:
 *  - Import and call `fetchFeaturedCategories` in components or hooks
 *    that need to display or manipulate featured categories
 *  - Automatically returns typed data that matches the FeaturedCategory type
 *  - Keeps components free of direct Axios calls and repetitive API URL logic
 */

import axios from "axios";
import type { FeaturedCategory } from "../types/FeaturedCategory";

const API_BASE_URL =
  import.meta.env.MODE === "development"
    ? import.meta.env.VITE_API_BASE_URL
    : import.meta.env.VITE_API_URL; // render link

export async function fetchFeaturedCategories(): Promise<FeaturedCategory[]> {
  const response = await axios.get(`${API_BASE_URL}/api/categories/featured`);
  return response.data;
}