import axios from "axios";
import type { ProductPreview } from "../types/ProductPreview";

const API_BASE_URL =
import.meta.env.MODE === "development"
? import.meta.env.VITE_API_BASE_URL
: import.meta.env.VITE_API_URL;

export async function fetchNewArrivals(): Promise<ProductPreview[]> {
    const response = await axios.get(`${API_BASE_URL}/api/products?isNewArrival=true`);
    return response.data;
}