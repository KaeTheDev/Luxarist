/**
 * Purpose: Renders a single order as a card for the mobile/tablet admin order ledger.
 *
 * Responsibilities:
 * - Display order reference number, customer name, total, and item count.
 * - Render an inline status selector that calls onUpdate on change,
 *   stopping event propagation so it doesn't trigger the card's onClick.
 * - Call onView when the card itself is clicked to open AdminOrderDetails.
 *
 * Usage:
 *   <MobileOrderCard
 *     order={order}
 *     isUpdating={updatingId === order._id}
 *     onUpdate={handleUpdateStatus}
 *     onView={(id) => setSelectedOrderId(id)}
 *   />
 */

import type { Order, OrderStatus } from "../../../shared/types";
import { ORDER_STATUS_CONFIG } from "../../../../../constants/orderConfig";
 
interface MobileOrderCardProps {
  order: Order;
  isUpdating: boolean;
  onUpdate: (id: string, status: OrderStatus) => void;
  onView: (id: string) => void;
}
 
export function MobileOrderCard({ order, isUpdating, onUpdate, onView }: MobileOrderCardProps) {
  const config = ORDER_STATUS_CONFIG[order.status] || ORDER_STATUS_CONFIG.Pending;
  const StatusIcon = config.icon;
 
  return (
    <div
      className="bg-white border border-stone-100 p-8 rounded-[2.5rem] shadow-sm space-y-6 cursor-pointer hover:border-stone-200 transition-colors"
      onClick={() => onView(order._id)}
    >
      {/* Order reference + customer + total */}
      <div className="flex justify-between items-start">
        <div>
          <p className="text-[10px] text-stone-400 uppercase tracking-widest font-black mb-1">
            #{order.orderNumber}
          </p>
          <h4 className="font-serif italic text-stone-900 text-lg">
            {order.customerFirstName} {order.customerLastName}
          </h4>
        </div>
        <div className="text-right">
          <p className="text-sm font-black text-stone-900">
            ${order.total.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </p>
          <p className="text-[10px] text-stone-400 uppercase tracking-tighter mt-1">
            {order.items?.length || 0} items
          </p>
        </div>
      </div>
 
      {/* Status selector — stopPropagation prevents triggering the card click */}
      <div className="flex items-center gap-2 pt-4 border-t border-stone-50">
        <div className="relative">
          <select
            disabled={isUpdating}
            value={order.status}
            onClick={(e) => e.stopPropagation()}
            onChange={(e) => {
              e.stopPropagation();
              onUpdate(order._id, e.target.value as OrderStatus);
            }}
            className={`appearance-none pl-9 pr-8 py-2 rounded-full text-[9px] uppercase tracking-widest font-black border disabled:opacity-50 disabled:cursor-not-allowed ${config.color}`}
          >
            {Object.keys(ORDER_STATUS_CONFIG).map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          <StatusIcon
            size={12}
            className="absolute left-3 top-1/2 -translate-y-1/2 opacity-70 pointer-events-none"
          />
        </div>
      </div>
    </div>
  );
}