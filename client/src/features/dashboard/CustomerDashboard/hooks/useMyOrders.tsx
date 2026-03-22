import { useEffect, useState } from "react";
import { useAuth } from "../../../../context/AuthContext";
import type { Order } from "../../shared/types";

const API_URL = import.meta.env.DEV ? "http://localhost:3000/api" : import.meta.env.VITE_API_URL;

export function useMyOrders() {
    const { user, token } = useAuth();
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!user || !token) return;

        const fetchOrders = async () => {
            try {
                const res = await fetch(`${API_URL}/orders/${user.id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (!res.ok) throw new Error("Failed to fetch orders");

                const data = await res.json();

                // Map DB fields → the frontend Order type
                const mapped: Order[] = data.map((o: any) => ({
                    id: o.orderNumber,
                    date: new Date(o.orderDate).toLocaleDateString("en-US", {
                        month: "long", day: "numeric", year: "numeric"
                    }),
                    total: o.total,
                    status: o.status,
                    items: o.items.map((item: any) => ({
                        name: item.name,
                        price: item.price,
                        quantity: item.quantity,
                        category: "",   
                    })),
                }));

                setOrders(mapped);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [user, token]);

    return { orders, loading, error };
}