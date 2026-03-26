import { useState, useEffect, useCallback } from "react";
import { useAuth } from "../../../../../context/AuthContext";
import type { Order, OrderStatus } from "../../../shared/types"; 
import { OrderRow } from "./OrderRow"; 

export default function OrdersTable() {
  const [orders, setOrders] = useState<Order[]>([]); 
  const [isLoading, setIsLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  
  // Destructure token AND isLoading from AuthContext
  const { token, isLoading: authLoading } = useAuth();

  // Memoize the fetch to prevent unnecessary re-renders
  const fetchOrders = useCallback(async () => {
    if (!token) return;
    
    setIsLoading(true);
    try {
      const res = await fetch("/api/admin/orders", {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });

      if (res.ok) {
        const data = await res.json();
        setOrders(data);
      } else {
        const errorData = await res.json();
        console.error("Vault Access Denied:", errorData.message);
      }
    } catch (err) { 
      console.error("Network or Proxy Failure:", err); 
    } finally { 
      setIsLoading(false); 
    }
  }, [token]);

  useEffect(() => { 
    // Only fetch if auth is done loading and we have a token
    if (!authLoading && token) {
      fetchOrders(); 
    } else if (!authLoading && !token) {
        // If auth finished and there's no token, stop the spinner
        setIsLoading(false);
    }
  }, [token, authLoading, fetchOrders]);

  const handleUpdateStatus = async (id: string, status: OrderStatus) => {
    if (!token) return;
    setUpdatingId(id);
    
    try {
      const res = await fetch(`/api/admin/orders/${id}`, {
        method: "PUT",
        headers: { 
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json" 
        },
        body: JSON.stringify({ status }),
      });
      
      if (res.ok) {
        const updatedOrder = await res.json();
        setOrders(prev => prev.map(o => o._id === id ? updatedOrder : o));
      }
    } catch (err) { 
      console.error("Update failed", err); 
    } finally { 
      setUpdatingId(null); 
    }
  };

  // If Auth is still checking the session, or the API is fetching
  if (isLoading || authLoading) return (
    <div className="p-32 text-center font-serif italic text-stone-400 animate-pulse tracking-widest">
      Consulting the Ledger...
    </div>
  );

  return (
    <div className="space-y-6">
      <header className="flex justify-between items-end px-2">
        <div>
          <h2 className="text-2xl font-serif text-stone-900 italic">Order Ledger</h2>
          <p className="text-sm text-stone-500 font-light">Overseeing global acquisitions and logistics.</p>
        </div>
        <div className="bg-white border border-stone-100 px-6 py-3 rounded-2xl shadow-sm border-b-2 border-b-stone-900/5">
           <p className="text-[10px] text-stone-400 uppercase tracking-widest font-bold">Volume: {orders.length} Acquisitions</p>
        </div>
      </header>

      <div className="bg-white border border-stone-100 rounded-[2.5rem] overflow-hidden shadow-xl shadow-stone-200/20">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-stone-50 bg-stone-50/30">
              {["Reference", "Client", "Investment", "Current Status", "Date", ""].map((h) => (
                <th key={h} className="px-8 py-6 text-[9px] uppercase tracking-[0.3em] text-stone-400 font-black">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-50">
            {orders.length > 0 ? (
              orders.map((order) => (
                <OrderRow 
                  key={order._id} 
                  order={order} 
                  isUpdating={updatingId === order._id} 
                  onUpdate={handleUpdateStatus} 
                />
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-8 py-20 text-center text-stone-400 font-serif italic">
                  No acquisitions found in the archive.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}