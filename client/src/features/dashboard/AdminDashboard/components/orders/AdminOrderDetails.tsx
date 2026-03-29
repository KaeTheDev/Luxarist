/**
 * Purpose: Renders the full order detail view for admin, including customer info,
 * itemized order summary, shipping address, and an inline status update control.
 *
 * Responsibilities:
 * - Display order reference number, placement date, and current status badge.
 * - Show customer name, email, order date, and total in a summary header.
 * - Render an itemized table of order items with price, quantity, and subtotal.
 * - Display shipping address when available.
 * - Provide a status dropdown + update button that calls onStatusUpdate and
 *   reflects the updated status immediately without a page reload.
 * - Surface success and error feedback via the shared Toast component.
 *
 * Usage:
 *   <AdminOrderDetails
 *     order={order}
 *     onStatusUpdate={(id, status) => handleUpdate(id, status)}
 *     onBack={() => setSelectedOrderId(null)}
 *   />
 */

import { useState } from "react";
import { ArrowLeft, User, Calendar, CreditCard, MapPin, Package } from "lucide-react";
import type { Order, OrderStatus } from "../../../shared/types";
import { ORDER_STATUS_CONFIG } from "../../../../../constants/orderConfig";
import Toast from "../../../../../common/ui/Toast";

interface AdminOrderDetailsProps {
    order: Order;
    onStatusUpdate: (id: string, status: OrderStatus) => Promise<void>;
    onBack: () => void;
}

export function AdminOrderDetails({ order, onStatusUpdate, onBack }: AdminOrderDetailsProps) {
    const [selectedStatus, setSelectedStatus] = useState<OrderStatus>(order.status);
    const [updating, setUpdating] = useState(false);
    const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
   
    const showToast = (message: string, type: "success" | "error" = "success") => {
      setToast({ message, type });
      setTimeout(() => setToast(null), 4000);
    };
   
    const config = ORDER_STATUS_CONFIG[order.status] || ORDER_STATUS_CONFIG.Pending;
   
    const placedDate = new Date(order.orderDate).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
   
    const subtotal = order.items.reduce((sum, item) => sum + item.subtotal, 0);
   
    const handleUpdate = async () => {
      if (selectedStatus === order.status) return;
      setUpdating(true);
      try {
        await onStatusUpdate(order._id, selectedStatus);
        showToast(`Order status updated to ${selectedStatus}.`);
      } catch {
        showToast("Failed to update order status.", "error");
        setSelectedStatus(order.status);
      } finally {
        setUpdating(false);
      }
    };
   
    return (
      <div className="space-y-6 animate-in fade-in duration-500">
   
        {/* Toast */}
        {toast && (
          <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
        )}
   
        {/* Back button */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-stone-400 hover:text-stone-900 transition-colors uppercase text-[10px] tracking-[0.2em] font-bold"
        >
          <ArrowLeft size={16} /> Back to Orders
        </button>
   
        {/* ── Header card ──────────────────────────────────────────────────────── */}
        <div className="bg-white border border-stone-100 rounded-[2.5rem] p-8 shadow-sm">
          <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-8">
            <div>
              <p className="text-[10px] text-stone-400 uppercase tracking-[0.2em] font-bold">
                Order Details
              </p>
              <h3 className="text-2xl font-semibold text-stone-900 mt-1">
                #{order.orderNumber}
              </h3>
              <p className="text-xs text-stone-400 italic mt-1">Placed on {placedDate}</p>
            </div>
            <span className={`px-5 py-2 rounded-full text-[10px] uppercase tracking-widest font-black border ${config.color}`}>
              {order.status}
            </span>
          </div>
   
          {/* Customer / Date / Total summary row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border-t border-stone-50 pt-6">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-stone-50 rounded-xl shrink-0">
                <User size={14} className="text-stone-400" />
              </div>
              <div>
                <p className="text-[10px] text-stone-400 uppercase tracking-widest font-bold mb-1">
                  Customer
                </p>
                <p className="text-sm font-medium text-stone-900">
                  {order.customerFirstName} {order.customerLastName}
                </p>
                <p className="text-xs text-stone-400 lowercase italic">{order.customerEmail}</p>
              </div>
            </div>
   
            <div className="flex items-start gap-3">
              <div className="p-2 bg-stone-50 rounded-xl shrink-0">
                <Calendar size={14} className="text-stone-400" />
              </div>
              <div>
                <p className="text-[10px] text-stone-400 uppercase tracking-widest font-bold mb-1">
                  Order Date
                </p>
                <p className="text-sm font-medium text-stone-900">{placedDate}</p>
              </div>
            </div>
   
            <div className="flex items-start gap-3">
              <div className="p-2 bg-stone-50 rounded-xl shrink-0">
                <CreditCard size={14} className="text-stone-400" />
              </div>
              <div>
                <p className="text-[10px] text-stone-400 uppercase tracking-widest font-bold mb-1">
                  Total Amount
                </p>
                <p className="text-sm font-black text-stone-900">
                  ${order.total.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </p>
              </div>
            </div>
          </div>
        </div>
   
        {/* ── Order items ───────────────────────────────────────────────────────── */}
        <div className="bg-white border border-stone-100 rounded-[2.5rem] p-8 shadow-sm">
          <h4 className="text-[10px] text-stone-400 uppercase tracking-widest font-bold border-b border-stone-50 pb-4 mb-6">
            Order Items
          </h4>
   
          {/* Table header */}
          <div className="hidden md:grid grid-cols-12 gap-4 text-[9px] uppercase tracking-[0.2em] font-black text-stone-300 mb-4 px-2">
            <span className="col-span-6">Product</span>
            <span className="col-span-2 text-right">Price</span>
            <span className="col-span-2 text-center">Quantity</span>
            <span className="col-span-2 text-right">Subtotal</span>
          </div>
   
          <div className="space-y-4">
            {order.items.map((item, idx) => (
              <div
                key={idx}
                className="grid grid-cols-12 gap-4 items-center py-4 border-b border-stone-50 last:border-0 px-2"
              >
                {/* Product */}
                <div className="col-span-12 md:col-span-6 flex items-center gap-4">
                  <div className="w-12 h-12 bg-stone-50 rounded-2xl border border-stone-100 flex items-center justify-center shrink-0 overflow-hidden">
                    {item.image ? (
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    ) : (
                      <Package size={16} className="text-stone-300" />
                    )}
                  </div>
                  <p className="text-sm font-medium text-stone-900">{item.name}</p>
                </div>
   
                {/* Price */}
                <div className="col-span-4 md:col-span-2 text-right">
                  <p className="text-xs text-stone-500 md:hidden uppercase tracking-widest font-bold mb-1">Price</p>
                  <p className="text-sm text-stone-700">
                    ${item.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </p>
                </div>
   
                {/* Quantity */}
                <div className="col-span-4 md:col-span-2 text-center">
                  <p className="text-xs text-stone-500 md:hidden uppercase tracking-widest font-bold mb-1">Qty</p>
                  <p className="text-sm text-stone-700">{item.quantity}</p>
                </div>
   
                {/* Subtotal */}
                <div className="col-span-4 md:col-span-2 text-right">
                  <p className="text-xs text-stone-500 md:hidden uppercase tracking-widest font-bold mb-1">Subtotal</p>
                  <p className="text-sm font-semibold text-stone-900">
                    ${item.subtotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </p>
                </div>
              </div>
            ))}
          </div>
   
          {/* Totals */}
          <div className="mt-6 pt-6 border-t border-stone-100 space-y-2 max-w-xs ml-auto">
            <div className="flex justify-between text-sm text-stone-500">
              <span>Subtotal</span>
              <span>${subtotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
            </div>
            <div className="flex justify-between text-sm font-black text-stone-900 pt-2 border-t border-stone-100">
              <span>Total</span>
              <span>${order.total.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
            </div>
          </div>
        </div>
   
        {/* ── Shipping address ─────────────────────────────────────────────────── */}
        {order.shippingAddress && (
          <div className="bg-white border border-stone-100 rounded-[2.5rem] p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <MapPin size={14} className="text-stone-400" />
              <h4 className="text-[10px] text-stone-400 uppercase tracking-widest font-bold">
                Shipping Address
              </h4>
            </div>
            <p className="text-sm text-stone-700 leading-relaxed">
              {order.shippingAddress.street}<br />
              {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zip}
            </p>
          </div>
        )}
   
        {/* ── Update status ─────────────────────────────────────────────────────── */}
        <div className="bg-white border border-stone-100 rounded-[2.5rem] p-8 shadow-sm">
          <h4 className="text-[10px] text-stone-400 uppercase tracking-widest font-bold mb-6">
            Update Order Status
          </h4>
          <div className="flex items-center gap-4">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value as OrderStatus)}
              disabled={updating}
              className="flex-1 appearance-none bg-stone-50 border border-stone-100 rounded-xl px-4 py-3 text-sm text-stone-900 focus:outline-none focus:border-stone-300 transition-colors disabled:opacity-50 cursor-pointer"
            >
              {Object.keys(ORDER_STATUS_CONFIG).map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
            <button
              onClick={handleUpdate}
              disabled={updating || selectedStatus === order.status}
              className="px-8 py-3 bg-stone-900 text-white text-[10px] uppercase tracking-[0.2em] font-black rounded-xl hover:bg-stone-700 transition-all active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
            >
              {updating ? "Updating..." : "Update Status"}
            </button>
          </div>
        </div>
   
      </div>
    );
  }