import { useState, useEffect } from "react";
import type { AdminOrder, OrderStatus } from "../../../shared/types";
import { OrderRow } from "./OrderRow"; 

export default function OrdersTable() {
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const fetchOrders = async () => {
    try {
      const res = await fetch("/api/admin/orders");
      if (res.ok) setOrders(await res.json());
    } catch (err) { console.error("Fetch failed", err); }
    finally { setIsLoading(false); }
  };

  useEffect(() => { fetchOrders(); }, []);

  const handleUpdateStatus = async (id: string, status: OrderStatus) => {
    setUpdatingId(id);
    try {
      const res = await fetch(`/api/admin/orders/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (res.ok) setOrders(prev => prev.map(o => o._id === id ? { ...o, status } : o));
    } catch (err) { console.error("Update failed", err); }
    finally { setUpdatingId(null); }
  };

  if (isLoading) return <div className="p-20 text-center animate-pulse font-serif italic text-stone-400">Opening Ledger...</div>;

  return (
    <div className="bg-white border border-stone-100 rounded-4xl overflow-hidden shadow-sm animate-in fade-in duration-700">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-stone-50 bg-stone-50/30">
            {["Order Ref", "Customer", "Total", "Status", "Date", ""].map((h) => (
              <th key={h} className="px-8 py-5 text-[10px] uppercase tracking-[0.2em] text-stone-400 font-black">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-stone-50">
          {orders.map((order) => (
            <OrderRow 
              key={order._id} 
              order={order} 
              isUpdating={updatingId === order._id} 
              onUpdate={handleUpdateStatus} 
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}