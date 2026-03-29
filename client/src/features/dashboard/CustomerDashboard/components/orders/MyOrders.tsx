import { useState } from "react";
import { useMyOrders } from "../../hooks/useMyOrders";
import { Loader2, ArrowLeft } from "lucide-react";
import CustomerOrderDetails from "./CustomerOrderDetails";
import OrderCard from "./OrderCard";

export default function MyOrders() {
    const { orders, loading } = useMyOrders(); 
    const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

    if (loading) return (
        <div className="h-96 flex items-center justify-center">
            <Loader2 className="animate-spin text-stone-300" size={40} />
        </div>
    );

    // This section handles the Drill-down view
    if (selectedOrderId) {
        const currentOrder = orders.find(o => o._id === selectedOrderId);
        return (
            <div className="space-y-6 animate-in fade-in duration-500">
                <button
                    onClick={() => setSelectedOrderId(null)}
                    className="flex items-center gap-2 text-stone-400 hover:text-stone-900 transition-colors uppercase text-[10px] tracking-[0.2em] font-bold"
                >
                    <ArrowLeft size={16} /> Back to History
                </button>
                {currentOrder && <CustomerOrderDetails order={currentOrder} />}
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
                        <div 
                            key={order._id} 
                            onClick={() => setSelectedOrderId(order._id)} 
                            className="cursor-pointer"
                        >
                            <OrderCard
                                // Fallback to a sliced ID if orderNumber isn't set yet
                                orderNumber={order.orderNumber || order._id.slice(-6).toUpperCase()}
                                // Format the ISO date for the UI
                                orderDate={new Date(order.orderDate).toLocaleDateString('en-US', {
                                    month: 'long', day: 'numeric', year: 'numeric'
                                })}
                                total={order.total}
                                status={order.status}
                                itemCount={order.items?.length ?? 0}
                                // Pass the images from the items array to the card preview
                                itemImages={order.items?.map(i => i.image).filter(Boolean) as string[]}
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}