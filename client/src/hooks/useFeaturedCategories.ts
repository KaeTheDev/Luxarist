/**
 * File: useFeaturedCategories.ts
 * Purpose:
 *  Provides a custom React hook to fetch and manage the state of featured product categories.
 *  Handles loading, error, and data states, returning a type-safe array of `FeaturedCategory` for components.
 *
 * Responsibilities:
 *  - Fetch featured categories from the backend API when the hook mounts.
 *  - Maintain reactive `loading` and `error` states for UI feedback.
 *  - Normalize the fetched data to ensure it is always an array of `FeaturedCategory`.
 *  - Provide a clean, reusable interface for frontend components to consume category data.
 *
 * Usage:
 *  - Call this hook inside components that display featured categories.
 *  - Destructure the returned object: `{ categories, loading, error }`.
 *  - Use `loading` and `error` to conditionally render spinners, fallback UI, or error messages.
 *  - Example:
 *      const { categories, loading, error } = useFeaturedCategories();
 *      if (loading) return <Spinner />;
 *      if (error) return <p>{error}</p>;
 *      return <CategoryGrid categories={categories} />;
 */

import { useState, useEffect } from "react";
import { fetchFeaturedCategories } from "../api/featuredCategories";
import type { FeaturedCategory } from "../types/FeaturedCategory";

export function useFeaturedCategories() {
    const [categories, setCategories] = useState<FeaturedCategory[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchFeaturedCategories()
        .then((data) => setCategories(Array.isArray(data) ? data : []))
        .catch((err) => {
            console.error("Error fetching featured categories:", err);
            setError(err.message || "Failed to load categories")
        })
        .finally(() => setLoading(false));
    }, []);

    return { categories, loading, error };
}