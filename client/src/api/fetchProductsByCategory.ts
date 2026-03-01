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