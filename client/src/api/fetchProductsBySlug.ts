import axios from "axios";
import type { Product } from "../types/Product";

const API_BASE_URL = 
import.meta.env.MODE === "development"
? import.meta.env.VITE_API_BASE_URL
: import.meta.env.VITE_API_URL;

export async function fetchProductsBySlug(slug: string): Promise<Product> {
    const response = await axios.get(`${API_BASE_URL}/api/products/slug/${slug}`);
    return response.data;
}