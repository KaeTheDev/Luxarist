import { ChevronRight, Package } from "lucide-react";

interface OrderCardProps {
  orderNumber: string;
  orderDate: string;
  total: number;
  status: "Pending" | "Processing" | "Shipped" | "Delivered";
  itemImages?: string[];
  itemCount: number;
}

export default function OrderCard({ orderNumber, orderDate, total, status, itemImages, itemCount }: OrderCardProps) {
  const hasImages = itemImages && itemImages.length > 0;
  const displayImages = hasImages ? itemImages.slice(0, 3) : [];

  return (
    <div className="group bg-white border border-stone-100 p-6 md:p-8 rounded-4xl transition-all duration-500 hover:border-stone-300 hover:shadow-xl hover:shadow-stone-200/40">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        
        {/* Left Section: Info & Price */}
        <div className="flex justify-between items-start md:items-center md:gap-12 w-full md:w-auto">
          
          <div className="flex items-center gap-5">
            {/* The "Box" Icon Anchor */}
            <div className="w-12 h-12 shrink-0 bg-stone-50 border border-stone-100 rounded-2xl flex items-center justify-center text-stone-400 group-hover:bg-stone-900 group-hover:text-white transition-colors duration-500">
              <Package size={20} />
            </div>

            {/* Order Identifier & Date */}
            <div className="space-y-1">
              <p className="text-[10px] text-stone-400 uppercase tracking-[0.2em] font-bold">
                Order Reference
              </p>
              <h3 className="text-xl md:text-lg font-semibold text-stone-900 leading-none tracking-tight">
                #{orderNumber}
              </h3>
              <p className="text-xs md:text-sm text-stone-400 font-medium md:font-light md:italic mt-1">
                {itemCount} {itemCount === 1 ? 'item' : 'items'} • Placed on {orderDate}
              </p>
            </div>
          </div>

          {/* Price visible on Mobile */}
          <div className="md:hidden text-right">
            <p className="text-[10px] text-stone-400 uppercase tracking-[0.2em] font-bold">
              Total
            </p>
            <p className="text-lg font-semibold text-stone-900">
              ${total.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Subtle Divider for Mobile */}
        <div className="h-px w-full bg-stone-50 md:hidden" />

        {/* Right Section: Status & Action */}
        <div className="flex items-center justify-between md:justify-end gap-4 md:gap-8 md:pt-0">
          
          {/* Price for Desktop Only */}
          <div className="hidden md:block text-right">
            <p className="text-[10px] text-stone-400 uppercase tracking-[0.2em] font-bold">
              Total Amount
            </p>
            <p className="text-lg font-semibold text-stone-900">
              ${total.toLocaleString()}
            </p>
          </div>

          <div className="flex items-center gap-4">
            <span
              className={`px-5 py-2 md:px-4 md:py-1.5 rounded-full text-[10px] uppercase tracking-[0.15em] font-black border transition-all duration-500 ${
                status === "Delivered"
                  ? "bg-stone-50 border-stone-200 text-stone-500"
                  : "bg-stone-900 border-stone-900 text-white shadow-md shadow-stone-200"
              }`}
            >
              {status}
            </span>
            <button 
              aria-label="View Order Details"
              className="w-11 h-11 md:w-10 md:h-10 rounded-full bg-stone-50 text-stone-400 group-hover:bg-stone-900 group-hover:text-white transition-all duration-300 shadow-sm flex items-center justify-center"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Conditional Image Gallery */}
      {hasImages && (
        <div className="flex gap-3 mt-8 pt-8 border-t border-stone-50 animate-in fade-in slide-in-from-top-2 duration-500">
          {displayImages.map((imgUrl, index) => (
            <div key={index} className="w-16 h-16 rounded-2xl overflow-hidden border border-stone-100 bg-stone-50 transition-transform duration-500 hover:scale-105">
              <img 
                src={imgUrl} 
                alt="Product Preview" 
                className="w-full h-full object-cover" 
              />
            </div>
          ))}
          {itemCount > 3 && (
            <div className="w-16 h-16 rounded-2xl border border-dashed border-stone-200 bg-stone-50 flex items-center justify-center">
              <span className="text-[10px] font-bold text-stone-400">+{itemCount - 3}</span>
            </div>
          )}
        </div>
      )}
    </div>          
  );
}