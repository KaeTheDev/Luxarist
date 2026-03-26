import { Check, X, Star } from "lucide-react";
import type { Review } from "../../../shared/types";

interface ReviewRowProps {
    review: Review;
    onToggle: (id: string, status: boolean) => void;
}

export function ReviewRow({ review, onToggle }: ReviewRowProps) {
    const data = review as any;

    const firstName = data.customerFirstName || "";
    const lastName = data.customerLastName || "";
    const customerDisplayName = (firstName || lastName) 
        ? `${firstName} ${lastName}`.trim() 
        : "Guest Client";
    
    const productDisplayName = data.products?.[0]?.productName || "Luxury Item";

    return (
        <tr className="group hover:bg-stone-50/50 transition-colors border-b border-stone-50 last:border-0">
          
          {/* CUSTOMER */}
          <td className="px-10 py-8 whitespace-nowrap">
            <p className="text-sm font-medium text-stone-900">
                {customerDisplayName}
            </p>
          </td>

          {/* PRODUCT */}
          <td className="px-10 py-8 text-sm text-stone-600 font-light italic whitespace-nowrap">
            {productDisplayName}
          </td>

          {/* RATING */}
          <td className="px-10 py-8">
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

          {/* COMMENT: Scroll-based layout allows us to show more text without truncation */}
          <td className="px-10 py-8 text-xs text-stone-500 italic min-w-75">
             "{data.comment}"
          </td>

          {/* STATUS */}
          <td className="px-10 py-8 whitespace-nowrap">
            <span className={`text-[9px] uppercase tracking-[0.2em] font-black px-4 py-1.5 rounded-full border transition-all duration-300 ${
              data.approved 
                ? "bg-emerald-50 text-emerald-600 border-emerald-100" 
                : "bg-rose-50 text-rose-600 border-rose-100"
            }`}>
              {data.approved ? "Public" : "Hidden"}
            </span>
          </td>

          {/* ACTIONS: Gutter padding matches the table header */}
          <td className="pl-10 pr-16 py-8 text-right whitespace-nowrap">
            <button 
              onClick={() => onToggle(data._id, data.approved)}
              className={`p-2.5 rounded-full transition-all hover:scale-110 active:scale-95 shadow-sm border border-stone-100 bg-white ${
                data.approved 
                    ? "text-stone-300 hover:text-rose-500 hover:border-rose-100" 
                    : "text-stone-300 hover:text-emerald-500 hover:border-emerald-100"
              }`}
            >
              {data.approved ? <X size={16} /> : <Check size={16} />}
            </button>
          </td>
        </tr>
    );
}