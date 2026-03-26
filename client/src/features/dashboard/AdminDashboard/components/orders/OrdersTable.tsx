import { useState, useEffect, useCallback } from "react";
import { useAuth } from "../../../../../context/AuthContext";
// 1. Import the centralized API URL
import { API_URL } from "../../../../../api/config"; 
import type { Order, OrderStatus } from "../../../shared/types"; 
import { OrderRow } from "./OrderRow"; 
import { ExternalLink, Package } from "lucide-react";
import { ORDER_STATUS_CONFIG } from "../../../../../constants/orderConfig";

export default function OrdersTable() {
  const [orders, setOrders] = useState<Order[]>([]); 
  const [isLoading, setIsLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const { token, isLoading: authLoading } = useAuth();

  const fetchOrders = useCallback(async () => {
    if (!token) return;
    setIsLoading(true);
    try {
      // Use the dynamic API_URL instead of the hardcoded string
      const res = await fetch(`${API_URL}/admin/orders`, {
        headers: { 
          "Authorization": `Bearer ${token}`, 
          "Content-Type": "application/json" 
        }
      });
      if (res.ok) {
        const data = await res.json();
        setOrders(data);
      }
    } catch (err) { 
      console.error("Fetch failure:", err); 
    } finally { 
      setIsLoading(false); 
    }
  }, [token]);

  useEffect(() => { 
    if (!authLoading && token) fetchOrders(); 
    else if (!authLoading && !token) setIsLoading(false);
  }, [token, authLoading, fetchOrders]);

  const handleUpdateStatus = async (id: string, status: OrderStatus) => {
    if (!token) return;
    setUpdatingId(id);
    try {
      const res = await fetch(`${API_URL}/admin/orders/${id}`, {
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

  // Re-using your manifest logic for the Mobile Card buttons
  const handleOpenManifest = (order: Order) => {
    console.log(`%c [MANIFEST] Reference: #${order.orderNumber} `, 'background: #1c1917; color: #fafaf9; font-weight: bold;');
    console.table({
      ID: order._id,
      Client: `${order.customerFirstName} ${order.customerLastName}`,
      Email: order.customerEmail,
      Total: `$${order.total.toLocaleString(undefined, { minimumFractionDigits: 2 })}`,
      Status: order.status,
      Items: order.items?.length || 0,
      Date: new Date(order.orderDate).toLocaleString()
    });
    alert(`Consulting the digital manifest for #${order.orderNumber}.\nFull data has been logged to the browser console.`);
  };

  if (isLoading || authLoading) return (
    <div className="p-32 text-center font-serif italic text-stone-400 animate-pulse tracking-widest uppercase text-[10px]">
      Consulting the Ledger...
    </div>
  );

  return (
    <div className="space-y-10 animate-in fade-in duration-700 pb-20">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 px-2">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-stone-900 rounded-2xl text-stone-50 shadow-lg shadow-stone-200/50">
            <Package size={24} strokeWidth={1.5} />
          </div>
          <div>
            <h2 className="text-3xl font-serif text-stone-900 italic tracking-tight">Order Ledger</h2>
            <p className="text-sm text-stone-500 font-light mt-1">Overseeing global acquisitions and logistics.</p>
          </div>
        </div>
        <div className="bg-white border border-stone-100 px-8 py-5 rounded-4xl shadow-sm border-b-2 border-b-stone-900/5 shrink-0">
           <p className="text-[10px] text-stone-400 uppercase tracking-[0.2em] font-black">Volume: {orders.length} Acquisitions</p>
        </div>
      </header>

      {/* DESKTOP VIEW: Scrollable Professional Table */}
      <div className="hidden lg:block bg-white border border-stone-100 rounded-[3rem] shadow-xl shadow-stone-200/20 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-275">
            <thead>
              <tr className="border-b border-stone-50 bg-stone-50/30 text-stone-400 font-black italic">
                {["Reference", "Client", "Investment", "Current Status", "Date", "Actions"].map((h) => (
                  <th key={h} className={`px-10 py-8 text-[9px] uppercase tracking-[0.4em] ${h === 'Actions' ? 'text-right pr-16' : ''}`}>{h}</th>
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
                  <td colSpan={6} className="px-10 py-32 text-center text-stone-300 font-serif italic text-lg">No acquisitions found in the archive.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MOBILE/TABLET VIEW: Luxury Order Cards */}
      <div className="lg:hidden space-y-4 px-2">
        {orders.length > 0 ? (
          orders.map((order) => {
            const config = ORDER_STATUS_CONFIG[order.status] || ORDER_STATUS_CONFIG.Pending;
            const StatusIcon = config.icon;
            return (
              <div key={order._id} className="bg-white border border-stone-100 p-8 rounded-[2.5rem] shadow-sm space-y-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-[10px] text-stone-400 uppercase tracking-widest font-black mb-1">#{order.orderNumber}</p>
                    <h4 className="font-serif italic text-stone-900 text-lg">{order.customerFirstName} {order.customerLastName}</h4>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-black text-stone-900">${order.total.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
                    <p className="text-[10px] text-stone-400 uppercase tracking-tighter mt-1">{order.items?.length || 0} items</p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-stone-50">
                   <div className="relative">
                      <select
                        value={order.status}
                        onChange={(e) => handleUpdateStatus(order._id, e.target.value as OrderStatus)}
                        className={`appearance-none pl-9 pr-8 py-2 rounded-full text-[9px] uppercase tracking-widest font-black border ${config.color}`}
                      >
                        {Object.keys(ORDER_STATUS_CONFIG).map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                      <StatusIcon size={12} className="absolute left-3 top-1/2 -translate-y-1/2 opacity-70" />
                   </div>
                   <button 
                    onClick={() => handleOpenManifest(order)}
                    className="p-3 bg-stone-50 rounded-full text-stone-400 hover:text-stone-900 transition-colors"
                   >
                      <ExternalLink size={16} />
                   </button>
                </div>
              </div>
            );
          })
        ) : (
          <div className="bg-white border border-stone-100 p-20 rounded-[2.5rem] text-center text-stone-300 font-serif italic">No acquisitions in the ledger.</div>
        )}
      </div>
    </div>
  );
}