/**
 * Purpose: Fetches all categories from the backend API for use in navigation
 * and the Collections page. Unlike useFeaturedCategories which only fetches
 * featured items, this hook returns the complete category list.
 *
 * Responsibilities:
 * - Fetch all categories from GET /api/categories on mount.
 * - Normalize the response to always return an array.
 * - Expose loading and error states for conditional rendering.
 *
 * Usage:
 *   const { categories, loading, error } = useAllCategories();
 */

import { useState, useEffect } from "react";
import { fetchAllCategories } from "../api/productServices";
import type { Category } from "../types/Category";
 
export function useAllCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
 
  useEffect(() => {
    fetchAllCategories()
      .then((data) => setCategories(Array.isArray(data) ? data : []))
      .catch((err) => {
        console.error("Error fetching all categories:", err);
        setError(err.message || "Failed to load categories");
      })
      .finally(() => setLoading(false));
  }, []);
 
  return { categories, loading, error };
}