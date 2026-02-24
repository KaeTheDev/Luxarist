import { useState, useEffect } from "react";
import { fetchNewArrivals } from "../api/fetchNewArrivals";
import type { ProductPreview } from "../types/ProductPreview";

export function useNewArrivals() {
    const [previewProducts, setPreviewProducts] = useState<ProductPreview[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchNewArrivals()
        .then(setPreviewProducts)
        .catch((err) => {
            console.error("Error fetching featured categories:", err);
            setError(err.message || "Failed to load products")
        })
        .finally(() => setLoading(false));
    }, []);

    return{ previewProducts, loading, error };
}