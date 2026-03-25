import { ExternalLink } from "lucide-react";
import type { Order, OrderStatus } from "../../../shared/types";
import { ORDER_STATUS_CONFIG } from "../../../../../constants/orderConfig";

interface OrderRowProps {
  order: Order;
  isUpdating: boolean;
  onUpdate: (id: string, status: OrderStatus) => void;
}

export const OrderRow = ({ order, isUpdating, onUpdate }: OrderRowProps) => {
  const config = ORDER_STATUS_CONFIG[order.status] || ORDER_STATUS_CONFIG.Pending;
  const StatusIcon = config.icon;

  return (
    <tr className="group hover:bg-stone-50/50 transition-colors">
      <td className="px-8 py-6">
        <span className="text-sm font-black text-stone-900 tracking-tighter">#{order.orderNumber}</span>
        <p className="text-[10px] text-stone-400 font-medium">{order.items?.length || 0} Items</p>
      </td>

      <td className="px-8 py-6">
        <p className="text-sm font-medium text-stone-800">{order.customerFirstName} {order.customerLastName}</p>
        <p className="text-[10px] text-stone-400 lowercase italic">{order.customerEmail}</p>
      </td>

      <td className="px-8 py-6">
        <span className="text-sm font-semibold text-stone-900">
          ${order.total.toLocaleString(undefined, { minimumFractionDigits: 2 })}
        </span>
      </td>

      <td className="px-8 py-6">
        <div className="relative inline-block">
          <select
            disabled={isUpdating}
            value={order.status}
            onChange={(e) => onUpdate(order._id, e.target.value as OrderStatus)}
            className={`appearance-none pl-8 pr-10 py-1.5 rounded-full text-[9px] uppercase tracking-widest font-black border transition-all cursor-pointer focus:ring-2 focus:ring-stone-100 ${config.color}`}
          >
            {Object.keys(ORDER_STATUS_CONFIG).map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          <StatusIcon size={12} className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none opacity-70" />
        </div>
      </td>

      <td className="px-8 py-6 text-xs text-stone-500 font-serif italic">
        {new Date(order.orderDate).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}
      </td>

      <td className="px-8 py-6 text-right">
        <button className="p-2 text-stone-300 hover:text-stone-900 transition-colors">
          <ExternalLink size={16} />
        </button>
      </td>
    </tr>
  );
};