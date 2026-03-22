import { useEffect, useState } from "react";
import { useAuth } from "../../../../context/AuthContext";
import type { Review } from "../../shared/types";

const API_URL = import.meta.env.DEV ? "http://localhost:3000/api" : import.meta.env.VITE_API_URL;

export function useReviews() {
    const { user, token } = useAuth();
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    
    useEffect(() => {
        if(!user || !token) return;

        const fetchReviews = async () => {
            try {
                const res = await fetch(`${API_URL}/reviews/${user.id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                if(!res.ok) throw new Error("Failed to fetch reviews");

                const data = await res.json();
            
                // Map DB fields → the frontend Review type
                const mapped: Review[] = data.map((r: any) => ({
                    id: r._id,
                    productId: r.product[0]?.productName ?? "",
                    productName: r.product[0]?.productName ?? "",
                    rating: r.rating,
                    comment: r.comment,
                    date: new Date(r.date).toLocaleDateString("en-US", {
                        month: "long", day: "numeric", year: "numeric"
                    }),
                    image: r.image ?? undefined
                }));

                setReviews(mapped);
            } catch(err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchReviews();
    }, [user, token]);

    return { reviews, setReviews, loading, error };
}