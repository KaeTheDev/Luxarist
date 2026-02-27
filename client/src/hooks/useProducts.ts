import { useState, useEffect } from "react";
import { fetchProducts } from "../api/fetchProducts";
import type { Product } from "../types/Product";

export function useProducts(options: { isNewArrival?: boolean; limit?: number; category?: string; }) {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Stringify options so useEffect knows when to refetch if filters change
        fetchProducts(options)
        .then(setProducts)
        .catch((err) => {
            console.error("Error fetching featured categories:", err);
            setError(err.message || "Failed to load products")
        })
        .finally(() => setLoading(false));
    }, [JSON.stringify(options)]); // Dependency on options

    return { products, loading, error };
}