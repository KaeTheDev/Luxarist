import { useState, useEffect } from "react";
import type { Order } from "../../shared/types/Order";
import OrderCard from "./OrderCard";
import OrderDetails from "./OrderDetails";
import { Loader2, ArrowLeft } from "lucide-react";

export default function MyOrders() {
    // Apply the Order type to the state array
    const [orders, setOrders] = useState<Order[]>([]);
    const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setOrders([
                { id: "ORD-2026-1247", date: "March 14, 2026", total: 25300, status: "Delivered" },
                { id: "ORD-2026-1250", date: "March 18, 2026", total: 8900, status: "Processing" }
            ]);
            setLoading(false);
        }, 800);
        return () => clearTimeout(timer);
    }, []);

    if(loading) return(
        <div className="h-96 flex items-center justify-center">
        <Loader2 className="animate-spin text-stone-300" size={40} />
    </div>
    );

    if(selectedOrderId) {
        // Find the specific order object to pass to details
        const currentOrder = orders.find(o => o.id === selectedOrderId);

        return(
            <div className="space-y-6 animate-in fade-in duration-500">
                 <button 
                  onClick={() => setSelectedOrderId(null)}
                  className="flex items-center gap-2 text-stone-400 hover:text-stone-900 transition-colors uppercase text-[10px] tracking-[0.2em] font-bold"
                >
                    <ArrowLeft size={16} /> Back to History
                </button>
                {/* Pass the actual order object instead of just the ID */}
                {currentOrder && <OrderDetails order={currentOrder} />}
            </div>
        );
    }

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            <header>
                <h2 className="text-2xl font-serif text-stone-900">Order History</h2>
                <p className="text-sm text-stone-500 italic">Review your past acquisitions and tracking status.</p>
            </header>
            
            {orders.length === 0 ? (
                <div className="py-20 text-center bg-white border border-stone-100 rounded-4xl">
                    <p className="text-stone-400 italic font-light">Your collection is waiting for its first piece.</p>
                </div>
            ) : (
                <div className="grid gap-6">
                    {orders.map((order) => (
                        <div key={order.id} onClick={() => setSelectedOrderId(order.id)} className="cursor-pointer">
                            <OrderCard 
                                orderNumber={order.id} 
                                orderDate={order.date} 
                                total={order.total} 
                                status={order.status} 
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}