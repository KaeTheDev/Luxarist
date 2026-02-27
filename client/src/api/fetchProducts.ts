import axios from "axios";
import type { ProductPreview } from "../types/ProductPreview";

const API_BASE_URL =
import.meta.env.MODE === "development"
? import.meta.env.VITE_API_BASE_URL
: import.meta.env.VITE_API_URL;

interface FetchProductsParams {
    isNewArrival?: boolean;
    limit?: number;
    category?: string;
}

export async function fetchProducts(params?: FetchProductsParams): Promise<ProductPreview[]> {
    // Axios 'params' will turn { isNewArrival: true, limit: 8 } 
    // into: /api/products?isNewArrival=true&limit=8
    const response = await axios.get(`${API_BASE_URL}/api/products`, { params });
    return response.data;
}