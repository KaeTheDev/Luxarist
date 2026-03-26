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
        // Prevent running if user isn't logged in
        if (!user?.id || !token) return;

        const fetchReviews = async () => {
            setLoading(true);
            try {
                const res = await fetch(`${API_URL}/reviews/customer/${user.id}`, {
                    method: 'GET',
                    headers: { 
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                });

                if (!res.ok) {
                    const errorData = await res.json();
                    throw new Error(errorData.message || "Could not retrieve reviews");
                }

                const data = await res.json();
            
                // The data is already formatted by the backend controller
                setReviews(Array.isArray(data) ? data : []);
                setError(null);
            } catch (err: any) {
                console.error("Fetch Error:", err.message);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchReviews();
    }, [user?.id, token]); // Only re-run if user ID or token changes

    return { reviews, setReviews, loading, error };
}