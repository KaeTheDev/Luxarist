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

import { useState, useEffect } from "react";
import { fetchFeaturedCategories } from "../api/productServices";
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