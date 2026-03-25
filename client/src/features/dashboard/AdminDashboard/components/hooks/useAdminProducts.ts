import { useEffect, useState } from "react";
import { useAuth } from "../../../../../context/AuthContext";
import type { Product } from "../../../shared/types";

const API_URL = import.meta.env.DEV ? "http://localhost:3000/api" : import.meta.env.VITE_API_URL;

export function useAdminProducts() {
    const { token } = useAuth();
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
    };

    useEffect(() => {
        fetchProducts();
    }, [token]);

    const fetchProducts = async() => {
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

    const createProduct = async(productData: Omit<Product, "_id" | "slug">) => {
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

    const updateProduct = async(id: string, productData: Partial<Product>) => {
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

    const deleteProduct = async(id: string) => {
        const res = await fetch(`${API_URL}/admin/products/${id}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Failed to delete product");
        await fetchProducts();
    };

    return { products, loading, error, createProduct, updateProduct, deleteProduct, refetch: fetchProducts() };
}