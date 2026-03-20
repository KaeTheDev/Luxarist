import { useEffect, useState } from "react";
import { useAuth } from "../../../../context/AuthContext";

const API_URL = import.meta.env.DEV ? "http://localhost:3000/api" : import.meta.env.VITE_API_URL;

interface DashboardStats {
    totalOrders: number;
    totalReviews: number;
    memberSince: string;
}

export function useDashboardStats() {
    const { user, token } = useAuth();
    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!user || !token) return;

        const headers = { Authorization: `Bearer ${token}` };

        const fetchStats = async () => {
            try {
                const [ordersRes, reviewsRes, meRes] = await Promise.all([
                    fetch(`${API_URL}/orders/${user.id}`, { headers }),
                    fetch(`${API_URL}/reviews/${user.id}`, { headers }),
                    fetch(`${API_URL}/auth/me`, { headers }),
                ]);

                if (!ordersRes.ok || !reviewsRes.ok || !meRes.ok) {
                    throw new Error("Failed to fetch dashboard stats");
                }

                const [orders, reviews, me] = await Promise.all([
                    ordersRes.json(),
                    reviewsRes.json(),
                    meRes.json(),
                ]);

                setStats({
                    totalOrders: orders.length,
                    totalReviews: reviews.length,
                    memberSince: me.memberSince,
                });
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, [user, token]);

    return { stats, loading, error };
}