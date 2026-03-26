import { useEffect, useState } from "react";
import { useAuth } from "../../../../../context/AuthContext";
import { API_URL, getAuthHeaders } from "../../../../../api/config"; 
import type { Product } from "../../../shared/types";

export function useAdminProducts() {
    const { token } = useAuth();
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // 2. Simplified headers using the config helper
    const headers = getAuthHeaders(token);

    const fetchProducts = async () => {
        if (!token) return;
        try {
            setLoading(true);
            const res = await fetch(`${API_URL}/products`, { headers });
            if (!res.ok) throw new Error("Failed to fetch products");
            const data = await res.json();
            setProducts(data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [token]); // API_URL is now a stable import

    const createProduct = async (productData: Omit<Product, "_id" | "slug">) => {
        // 4. This now correctly hits .../api/admin/products
        const res = await fetch(`${API_URL}/admin/products`, {
            method: "POST",
            headers,
            body: JSON.stringify(productData),
        });
        if (!res.ok) {
            const data = await res.json();
            throw new Error(data.message || "Failed to create product");
        }
        await fetchProducts();
    };

    const updateProduct = async (id: string, productData: Partial<Product>) => {
        const res = await fetch(`${API_URL}/admin/products/${id}`, {
            method: "PUT",
            headers,
            body: JSON.stringify(productData),
        });
        if (!res.ok) {
            const data = await res.json();
            throw new Error(data.message || "Failed to update product");
        }
        await fetchProducts();
    };

    const deleteProduct = async (id: string) => {
        const res = await fetch(`${API_URL}/admin/products/${id}`, {
            method: "DELETE",
            headers,
        });
        if (!res.ok) throw new Error("Failed to delete product");
        await fetchProducts();
    };

    return { 
        products, 
        loading, 
        error, 
        createProduct, 
        updateProduct, 
        deleteProduct, 
        refetch: fetchProducts 
    };
}