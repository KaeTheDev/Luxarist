/**
 * File: useFeaturedCategories.ts
 * Purpose: 
 * A specialized data-fetching hook designed to retrieve high-priority 
 * jewelry collections marked for "featured" display on the storefront.
 *
 * Responsibilities:
 * - Manage the asynchronous lifecycle (loading, success, error) for the 
 * featured category dataset.
 * - Normalize incoming data to ensure it is consistently treated as an 
 * array, preventing "map is not a function" runtime errors.
 * - Provide centralized error handling and logging for failed API requests 
 * to the featured collections endpoint.
 * - Expose a clean state object to consumer components for conditional 
 * rendering (e.g., showing a skeleton loader while loading is true).
 *
 * Usage:
 * - Directly integrated into the FeaturedCollectionsSection to populate 
 * the "Bento Grid" layout with images, titles, and item counts.
 * - Relies on the fetchFeaturedCategories utility for the underlying 
 * network request.
 */

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
import { fetchFeaturedCategories } from "../api/fetchFeaturedCategories";
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