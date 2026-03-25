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

import { useState, useEffect, useCallback } from "react";
import { fetchProducts, adminFetchAllProducts, adminCreateProduct, adminUpdateProduct, adminDeleteProduct } from "../api/productServices";
import type { Product } from "../features/dashboard/shared/types";

interface ProductOptions {
    isNewArrival?: boolean;
    limit?: number;
    category?: string;
    isAdmin?: boolean; 
  }

  export function useProducts(options: ProductOptions = {}) {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Memoize the load function so it can be called manually (refresh)
    const loadData = useCallback(async () => {
        setLoading(true);
        try {
            // Logic: If isAdmin is true, hit the /admin/all route. Otherwise, hit public.
            const data = options.isAdmin 
                ? await adminFetchAllProducts() 
                : await fetchProducts(options);
            setProducts(data);
            setError(null);
        } catch (err: any) {
            console.error("Error in useProducts hook:", err);
            setError(err.message || "Failed to load products");
        } finally {
            setLoading(false);
        }
    }, [JSON.stringify(options)]);

    useEffect(() => {
        loadData();
    }, [loadData]);

    // --- ADMIN CRUD ACTIONS ---

    const addProduct = async (data: Partial<Product>) => {
        const newProduct = await adminCreateProduct(data);
        setProducts((prev) => [newProduct, ...prev]);
        return newProduct;
    };

    const editProduct = async (id: string, data: Partial<Product>) => {
        const updated = await adminUpdateProduct(id, data);
        setProducts((prev) => prev.map((p) => (p._id === id ? updated : p)));
        return updated;
    };

    const removeProduct = async (id: string) => {
        await adminDeleteProduct(id);
        setProducts((prev) => prev.filter((p) => p._id !== id));
    };

    return { 
        products, 
        loading, 
        error, 
        refresh: loadData, // Useful for pull-to-refresh or "Refresh" buttons
        addProduct, 
        editProduct, 
        removeProduct 
    };
}