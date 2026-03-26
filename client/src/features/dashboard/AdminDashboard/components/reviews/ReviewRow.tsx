import { Check, X, Star } from "lucide-react";
import type { Review } from "../../../shared/types";

interface ReviewRowProps {
    review: Review;
    onToggle: (id: string, status: boolean) => void;
}

export function ReviewRow({ review, onToggle }: ReviewRowProps) {
    // Cast to any to handle the unique flat-data structure in your DB
    const data = review as any;

    // Direct mapping to your specific database keys
    const firstName = data.customerFirstName || "";
    const lastName = data.customerLastName || "";
    const customerDisplayName = (firstName || lastName) 
        ? `${firstName} ${lastName}`.trim() 
        : "Guest Client";
    
    // Accessing the product name from the products array
    const productDisplayName = data.products?.[0]?.productName || "Luxury Item";

    return (
        <tr className="group hover:bg-stone-50/50 transition-colors border-b border-stone-50 last:border-0">
          
          {/* CUSTOMER */}
          <td className="px-8 py-6">
            <p className="text-sm font-medium text-stone-900">{customerDisplayName}</p>
          </td>

          {/* PRODUCT */}
          <td className="px-8 py-6 text-sm text-stone-600 font-light italic">
            {productDisplayName}
          </td>

          {/* RATING */}
          <td className="px-8 py-6">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  size={10} 
                  fill={i < data.rating ? "#1c1917" : "none"} 
                  className={i < data.rating ? "text-stone-900" : "text-stone-200"} 
                />
              ))}
            </div>
          </td>

          {/* COMMENT */}
          <td className="px-8 py-6 text-xs text-stone-500 max-w-xs truncate italic">
            "{data.comment}"
          </td>

          {/* STATUS */}
          <td className="px-8 py-6">
            <span className={`text-[9px] uppercase tracking-widest font-black px-3 py-1 rounded-full border transition-all duration-300 ${
              data.approved 
                ? "bg-emerald-50 text-emerald-600 border-emerald-100" 
                : "bg-rose-50 text-rose-600 border-rose-100"
            }`}>
              {data.approved ? "Public" : "Hidden"}
            </span>
          </td>

          {/* ACTIONS */}
          <td className="px-8 py-6 text-right">
            <button 
              onClick={() => onToggle(data._id, data.approved)}
              className={`p-2 rounded-full transition-all hover:scale-110 active:scale-90 shadow-sm border border-transparent hover:border-stone-100 ${
                data.approved 
                    ? "text-stone-300 hover:text-rose-50" 
                    : "text-stone-300 hover:text-emerald-500"
              }`}
            >
              {data.approved ? <X size={16} /> : <Check size={16} />}
            </button>
          </td>
        </tr>
    );
}