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
import { useState, useEffect, useCallback, useRef } from "react";
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

  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState<any>(null);

  // 🧠 Prevent race conditions
  const activeRequest = useRef(0);

  const loadData = useCallback(async () => {
    setLoading(true);
    const requestId = ++activeRequest.current;
  
    try {
      if (options.isAdmin) {
        const res = await adminFetchAllProducts({ page });
        if (activeRequest.current !== requestId) return;
        setProducts(Array.isArray(res.products) ? res.products : []);
        setPagination(res.pagination);
      } else {
        const data = await fetchProducts(options);
        if (activeRequest.current !== requestId) return;
        setProducts(Array.isArray(data) ? data : []);
      }
      setError(null);
    } catch (err: any) {
      if (activeRequest.current !== requestId) return;
      console.error("Error in useProducts hook:", err);
      setError(err.message || "Failed to load products");
      setProducts([]);
    } finally {
      if (activeRequest.current === requestId) setLoading(false);
    }
  }, [options.isAdmin, options.isNewArrival, options.limit, options.category, page]);

  // 🏁 Auto-fetch when hook mounts or options/page change
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
    setProducts((prev) =>
      prev.map((p) => (p._id === id ? updated : p))
    );
    return updated;
  };

  const removeProduct = async (id: string) => {
    await adminDeleteProduct(id);
    setProducts((prev) => prev.filter((p) => p._id !== id));
  };

  return { products, loading, error, refresh: loadData, addProduct, editProduct, removeProduct, page, setPage, pagination };
}