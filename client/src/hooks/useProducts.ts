/**
 * File: useProducts.ts
 * Purpose:
 *  Provides a custom React hook to fetch and manage product data with optional filters.
 *  Handles loading, error, and data states, returning a type-safe array of `Product` objects.
 *
 * Responsibilities:
 *  - Fetch products from the backend API using the `fetchProducts` service.
 *  - Accept optional filter parameters: `isNewArrival`, `limit`, and `category`.
 *  - Maintain reactive `loading` and `error` states for frontend components.
 *  - Normalize and provide fetched data as a reusable, type-safe array of `Product`.
 *
 * Usage:
 *  - Call this hook inside components that display product lists, category pages, or featured sections.
 *  - Destructure the returned object: `{ products, loading, error }`.
 *  - Use `loading` and `error` to render spinners, fallback UI, or error messages.
 *  - Example:
 *      const { products, loading, error } = useProducts({ category: "bracelets", limit: 8 });
 *      if (loading) return <Spinner />;
 *      if (error) return <p>{error}</p>;
 *      return <ProductGrid products={products} />;
 */

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