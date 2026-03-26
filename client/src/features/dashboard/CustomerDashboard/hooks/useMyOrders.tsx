import { useEffect, useState } from "react";
import { useAuth } from "../../../../context/AuthContext";
import { API_URL, getAuthHeaders } from "../../../../api/config";
import type { Order } from "../../shared/types";

export function useMyOrders() {
    const { user, token } = useAuth();
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Guard clause: Exit if no user or token is present
        if (!user || !token) return;
        
        // Use consistent headers from our config
        const headers = getAuthHeaders(token);

        const fetchOrders = async () => {
            try {
                setLoading(true);
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
                setError(null);
            } catch (err: any) {
                console.error("Order Fetch Error:", err.message);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [user?.id, token]); // Adding user.id specifically for cleaner dependency tracking

    return { orders, loading, error };
}