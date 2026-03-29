/**
 * Purpose: Renders the admin order ledger with a drill-down detail view.
 *
 * Responsibilities:
 * - Fetch all orders from GET /api/admin/orders on mount.
 * - Manage selectedOrderId state to switch between the list and AdminOrderDetails.
 * - Render a desktop table via OrderRow and a mobile layout via MobileOrderCard.
 * - Handle inline status updates via PUT /api/admin/orders/:id and reflect
 *   the change immediately in local state without a full re-fetch.
 *
 * Usage:
 *   <OrdersTable />  (mounted via AdminDashboard route at /admin/orders)
 */

import { useState, useEffect, useCallback } from "react";
import { useAuth } from "../../../../../context/AuthContext";
import { API_URL, getAuthHeaders } from "../../../../../api/config";
import type { Order, OrderStatus } from "../../../shared/types";
import { OrderRow } from "./OrderRow";
import { MobileOrderCard } from "./MobileOrderCard";
import { AdminOrderDetails } from "./AdminOrderDetails";
import { Package } from "lucide-react";
 
export default function OrdersTable() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const { token, isLoading: authLoading } = useAuth();
 
  // ── Fetch ──────────────────────────────────────────────────────────────────
  const fetchOrders = useCallback(async () => {
    if (!token) return;
    setIsLoading(true);
    try {
      const res = await fetch(`${API_URL}/admin/orders`, {
        headers: getAuthHeaders(token),
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
 
  // ── Status update ──────────────────────────────────────────────────────────
  const handleUpdateStatus = async (id: string, status: OrderStatus) => {
    if (!token) return;
    setUpdatingId(id);
    try {
      const res = await fetch(`${API_URL}/admin/orders/${id}`, {
        method: "PUT",
        headers: getAuthHeaders(token),
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        const updatedOrder = await res.json();
        setOrders((prev) => prev.map((o) => (o._id === id ? updatedOrder : o)));
      }
    } catch (err) {
      console.error("Update failed", err);
    } finally {
      setUpdatingId(null);
    }
  };
 
  // ── Loading ────────────────────────────────────────────────────────────────
  if (isLoading || authLoading) {
    return (
      <div className="p-32 text-center font-serif italic text-stone-400 animate-pulse tracking-widest uppercase text-[10px]">
        Consulting the Ledger...
      </div>
    );
  }
 
  // ── Detail drill-down ──────────────────────────────────────────────────────
  if (selectedOrderId) {
    const selectedOrder = orders.find((o) => o._id === selectedOrderId);
    if (selectedOrder) {
      return (
        <AdminOrderDetails
          order={selectedOrder}
          onStatusUpdate={handleUpdateStatus}
          onBack={() => setSelectedOrderId(null)}
        />
      );
    }
  }
 
  // ── List view ──────────────────────────────────────────────────────────────
  return (
    <div className="space-y-10 pb-20">
 
      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 px-2">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-stone-900 rounded-2xl text-stone-50 shadow-lg shadow-stone-200/50">
            <Package size={24} strokeWidth={1.5} />
          </div>
          <div>
            <h2 className="text-3xl font-serif text-stone-900 italic tracking-tight">
              Order Ledger
            </h2>
            <p className="text-sm text-stone-500 font-light mt-1">
              Overseeing global acquisitions and logistics.
            </p>
          </div>
        </div>
        <div className="bg-white border border-stone-100 px-8 py-5 rounded-4xl shadow-sm border-b-2 border-b-stone-900/5 shrink-0">
          <p className="text-[10px] text-stone-400 uppercase tracking-[0.2em] font-black">
            Volume: {orders.length} Acquisitions
          </p>
        </div>
      </header>
 
      {/* Desktop table */}
      <div className="hidden lg:block bg-white border border-stone-100 rounded-[3rem] shadow-xl shadow-stone-200/20 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-275">
            <thead>
              <tr className="border-b border-stone-50 bg-stone-50/30 text-stone-400 font-black italic">
                {["Reference", "Client", "Investment", "Current Status", "Date", "Actions"].map((h) => (
                  <th
                    key={h}
                    className={`px-10 py-8 text-[9px] uppercase tracking-[0.4em] ${
                      h === "Actions" ? "text-right pr-16" : ""
                    }`}
                  >
                    {h}
                  </th>
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
                    onView={(id) => setSelectedOrderId(id)}
                  />
                ))
              ) : (
                <tr>
                  <td
                    colSpan={6}
                    className="px-10 py-32 text-center text-stone-300 font-serif italic text-lg"
                  >
                    No acquisitions found in the archive.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
 
      {/* Mobile cards */}
      <div className="lg:hidden space-y-4 px-2">
        {orders.length > 0 ? (
          orders.map((order) => (
            <MobileOrderCard
              key={order._id}
              order={order}
              isUpdating={updatingId === order._id}
              onUpdate={handleUpdateStatus}
              onView={(id) => setSelectedOrderId(id)}
            />
          ))
        ) : (
          <div className="bg-white border border-stone-100 p-20 rounded-[2.5rem] text-center text-stone-300 font-serif italic">
            No acquisitions in the ledger.
          </div>
        )}
      </div>
 
    </div>
  );
}