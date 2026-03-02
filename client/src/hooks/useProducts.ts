/**
 * File: useProducts.ts
 * Purpose: 
 * A versatile data-fetching hook designed to retrieve filtered subsets of 
 * the product catalog, specifically tailored for the "New Arrivals" and 
 * high-priority gallery sections.
 *
 * Responsibilities:
 * - Manage the asynchronous state (products, loading, error) for diverse 
 * product queries based on dynamic filter options.
 * - Implement a specialized dependency check using JSON serialization to 
 * safely detect changes in deep-nested "options" objects.
 * - Centralize error tracking and console logging for failed product 
 * catalog requests.
 * - Facilitate on-demand filtering for specific flags like `isNewArrival` 
 * or collection-based constraints directly from the API layer.
 *
 * Usage:
 * - Powers the NewArrivalsSection by passing a `{ isNewArrival: true, limit: 8 }` 
 * configuration.
 * - Can be utilized in "Related Products" widgets by passing a specific 
 * category ID to the options object.
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