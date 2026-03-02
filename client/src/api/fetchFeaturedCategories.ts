/**
 * File: fetchFeaturedCategories.ts
 * Purpose:
 * Provides a dedicated data fetching utility to retrieve a collection of 
 * curated "featured" categories from the backend for the homepage.
 *
 * Responsibilities:
 * - Determine the correct API base URL based on the environment (Development vs. Production)
 * - Execute an asynchronous GET request to the specific "featured" categories endpoint
 * - Return a Promise that resolves to an array of FeaturedCategory objects
 * - Abstract the featured-specific API logic away from the Home or Landing components
 *
 * Usage:
 * - Called within the Home page or Landing page components (e.g., CategoryCards section)
 * - Used to populate the visual tiles that guide users to specific jewelry collections
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