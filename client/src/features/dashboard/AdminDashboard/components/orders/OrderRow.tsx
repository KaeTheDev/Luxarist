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

  /**
   * Placeholder: In v2.0, this will open a SideSheet or Modal 
   * with the full shipping address and itemized manifest.
   */
  const handleOpenManifest = () => {
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
    
    // Quick alert so you know the button is connected correctly
    alert(`Consulting the digital manifest for #${order.orderNumber}.\nFull data has been logged to the browser console.`);
  };

  return (
    <tr className="group hover:bg-stone-50/50 transition-colors border-b border-stone-50 last:border-0">
      {/* REFERENCE */}
      <td className="px-8 py-6">
        <span className="text-sm font-black text-stone-900 tracking-tighter">#{order.orderNumber}</span>
        <p className="text-[10px] text-stone-400 font-medium">{order.items?.length || 0} Items</p>
      </td>

      {/* CLIENT */}
      <td className="px-8 py-6">
        <p className="text-sm font-medium text-stone-800">{order.customerFirstName} {order.customerLastName}</p>
        <p className="text-[10px] text-stone-400 lowercase italic">{order.customerEmail}</p>
      </td>

      {/* INVESTMENT (TOTAL) */}
      <td className="px-8 py-6">
        <span className="text-sm font-semibold text-stone-900">
          ${order.total.toLocaleString(undefined, { minimumFractionDigits: 2 })}
        </span>
      </td>

      {/* STATUS SELECTOR */}
      <td className="px-8 py-6">
        <div className="relative inline-block">
          <select
            disabled={isUpdating}
            value={order.status}
            onChange={(e) => onUpdate(order._id, e.target.value as OrderStatus)}
            className={`appearance-none pl-8 pr-10 py-1.5 rounded-full text-[9px] uppercase tracking-widest font-black border transition-all cursor-pointer focus:ring-2 focus:ring-stone-100 disabled:opacity-50 disabled:cursor-not-allowed ${config.color}`}
          >
            {Object.keys(ORDER_STATUS_CONFIG).map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          <StatusIcon 
            size={12} 
            className={`absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none transition-opacity ${isUpdating ? 'opacity-30' : 'opacity-70'}`} 
          />
        </div>
      </td>

      {/* DATE */}
      <td className="px-8 py-6 text-xs text-stone-500 font-serif italic">
        {new Date(order.orderDate).toLocaleDateString(undefined, { 
          month: "short", 
          day: "numeric", 
          year: "numeric" 
        })}
      </td>

      {/* ACTIONS */}
      <td className="px-8 py-6 text-right">
        <button 
          onClick={handleOpenManifest}
          className="p-2 text-stone-300 hover:text-stone-900 transition-all hover:scale-110 active:scale-95 group-hover:text-stone-400"
          title="Consult Manifest"
        >
          <ExternalLink size={16} />
        </button>
      </td>
    </tr>
  );
};