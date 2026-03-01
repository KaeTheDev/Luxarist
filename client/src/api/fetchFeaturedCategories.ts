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