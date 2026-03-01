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
  const response = await axios.get(`${API_BASE_URL}/api/collections/${slug}`);
  return response.data;
}