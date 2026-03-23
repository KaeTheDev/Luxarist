import { Check, X, Star } from "lucide-react";
import type { AdminReview } from "../../../shared/types";

interface ReviewRowProps {
    review: AdminReview;
    onToggle: (id: string, status: boolean) => void;
}

export function ReviewRow({ review, onToggle }: ReviewRowProps) {
    return (
        <tr className="group hover:bg-stone-50/50 transition-colors">
          <td className="px-8 py-6 text-sm font-medium text-stone-900">{review.customerName}</td>
          <td className="px-8 py-6 text-sm text-stone-600">{review.productName}</td>
          <td className="px-8 py-6">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  size={10} 
                  fill={i < review.rating ? "#1c1917" : "none"} 
                  className={i < review.rating ? "text-stone-900" : "text-stone-200"} 
                />
              ))}
            </div>
          </td>
          <td className="px-8 py-6 text-xs text-stone-500 max-w-xs truncate italic">"{review.comment}"</td>
          <td className="px-8 py-6">
            <span className={`text-[9px] uppercase tracking-widest font-black px-3 py-1 rounded-full border ${
              review.isApproved ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-rose-50 text-rose-600 border-rose-100"
            }`}>
              {review.isApproved ? "Public" : "Hidden"}
            </span>
          </td>
          <td className="px-8 py-6 text-right">
            <button 
              onClick={() => onToggle(review._id, review.isApproved)}
              className={`p-2 rounded-full transition-all ${
                review.isApproved ? "text-stone-300 hover:text-rose-500" : "text-stone-300 hover:text-emerald-500"
              }`}
            >
              {review.isApproved ? <X size={16} /> : <Check size={16} />}
            </button>
          </td>
        </tr>
      );
    }    