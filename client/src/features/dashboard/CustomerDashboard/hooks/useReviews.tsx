import { useEffect, useState } from "react";
import { useAuth } from "../../../../context/AuthContext";
import { API_URL, getAuthHeaders } from "../../../../api/config";
import type { Review } from "../../shared/types";

export function useReviews() {
    const { user, token } = useAuth();
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    
    useEffect(() => {
        // Prevent running if user isn't logged in or token is missing
        if (!user?.id || !token) return;

        const fetchReviews = async () => {
            setLoading(true);
            try {
                const res = await fetch(`${API_URL}/reviews/customer/${user.id}`, {
                    method: 'GET',
                    headers: getAuthHeaders(token),
                });

                if (!res.ok) {
                    const errorData = await res.json();
                    throw new Error(errorData.message || "Could not retrieve reviews");
                }

                const data = await res.json();
            
                // Ensure we always set an array even if data is null/undefined
                setReviews(Array.isArray(data) ? data : []);
                setError(null);
            } catch (err: any) {
                console.error("Reviews Fetch Error:", err.message);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchReviews();
    }, [user?.id, token]); 

    return { reviews, setReviews, loading, error };
}