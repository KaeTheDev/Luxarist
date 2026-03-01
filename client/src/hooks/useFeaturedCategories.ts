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