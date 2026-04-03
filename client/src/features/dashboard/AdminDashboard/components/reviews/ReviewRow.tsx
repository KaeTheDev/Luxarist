/**
 * Purpose: Renders a single review row in the admin moderation table.
 * Reads field names that match the actual Review mongoose schema:
 * customerName (string), productId (populated object), rating, title, comment, approved.
 */

import { Check, X, Star } from "lucide-react";
 
// Typed interface matching the populated API response shape
interface PopulatedReview {
  _id: string;
  customerName: string;
  productId: {
    _id: string;
    name: string;
    primaryImageUrl?: string;
    slug?: string;
  } | null;
  rating: number;
  title: string;
  comment: string;
  approved: boolean;
  isVerified: boolean;
  createdAt: string;
}
 
interface ReviewRowProps {
  review: PopulatedReview;
  onToggle: (id: string, status: boolean) => void;
}
 
export function ReviewRow({ review, onToggle }: ReviewRowProps) {
  const productName = review.productId?.name ?? "Luxarist Piece";
 
  return (
    <tr className="group hover:bg-stone-50/50 transition-colors border-b border-stone-50 last:border-0">
 
      {/* CUSTOMER */}
      <td className="px-10 py-8 whitespace-nowrap">
        <p className="text-sm font-medium text-stone-900">
          {review.customerName}
        </p>
      </td>
 
      {/* PRODUCT */}
      <td className="px-10 py-8 text-sm text-stone-600 font-light italic whitespace-nowrap">
        {productName}
      </td>
 
      {/* RATING */}
      <td className="px-10 py-8">
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
 
      {/* TITLE */}
      <td className="px-10 py-8 text-xs text-stone-700 font-medium whitespace-nowrap">
        {review.title}
      </td>
 
      {/* COMMENT */}
      <td className="px-10 py-8 text-xs text-stone-500 italic min-w-75">
        "{review.comment}"
      </td>
 
      {/* STATUS */}
      <td className="px-10 py-8 whitespace-nowrap">
        <span className={`text-[9px] uppercase tracking-[0.2em] font-black px-4 py-1.5 rounded-full border transition-all duration-300 ${
          review.approved
            ? "bg-emerald-50 text-emerald-600 border-emerald-100"
            : "bg-rose-50 text-rose-600 border-rose-100"
        }`}>
          {review.approved ? "Public" : "Hidden"}
        </span>
      </td>
 
      {/* ACTIONS */}
      <td className="pl-10 pr-16 py-8 text-right whitespace-nowrap">
        <button
          onClick={() => onToggle(review._id, review.approved)}
          className={`p-2.5 rounded-full transition-all hover:scale-110 active:scale-95 shadow-sm border border-stone-100 bg-white ${
            review.approved
              ? "text-stone-300 hover:text-rose-500 hover:border-rose-100"
              : "text-stone-300 hover:text-emerald-500 hover:border-emerald-100"
          }`}
        >
          {review.approved ? <X size={14} /> : <Check size={14} />}
        </button>
      </td>
 
    </tr>
  );
}