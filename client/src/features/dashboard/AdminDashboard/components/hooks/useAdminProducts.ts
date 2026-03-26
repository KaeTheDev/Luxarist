import { useEffect, useState } from "react";
import { useAuth } from "../../../../../context/AuthContext";
import type { Product } from "../../../shared/types";

export function useAdminProducts() {
    const { token } = useAuth();
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const API_URL = import.meta.env.DEV 
        ? "http://localhost:3000/api" 
        : import.meta.env.VITE_API_URL;

    // Shared headers for POST/PUT/DELETE
    const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
    };

    // 1. Fetch Logic
    const fetchProducts = async () => {
        if (!token) return;
        try {
            setLoading(true);
            const res = await fetch(`${API_URL}/products`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (!res.ok) throw new Error("Failed to fetch products");
            const data = await res.json();
            setProducts(data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // 2. Initial Load
    useEffect(() => {
        fetchProducts();
    }, [token, API_URL]);

    // 3. Create
    const createProduct = async (productData: Omit<Product, "_id" | "slug">) => {
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

    // 4. Update
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

    // 5. Delete
    const deleteProduct = async (id: string) => {
        const res = await fetch(`${API_URL}/admin/products/${id}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` },
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
        refetch: fetchProducts // Passed as reference, not execution
    };
}