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
        const headers = { Authorization: `Bearer ${token}` };

        const fetchOrders = async () => {
            try {
                const res = await fetch(`${API_URL}/orders/customer/${user.id}`, { headers });

                if (!res.ok) throw new Error("Registry access denied");
                const data = await res.json();

                // Map DB fields to your exact Unified Order Interface
                const mapped: Order[] = (Array.isArray(data) ? data : []).map((o: any) => ({
                    ...o, // Spreads all DB fields like _id, shippingAddress, etc.
                    orderDate: o.orderDate || o.createdAt,
                    items: o.items.map((item: any) => ({
                        ...item,
                        subtotal: item.subtotal || (item.price * item.quantity)
                    }))
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