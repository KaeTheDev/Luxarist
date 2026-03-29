/**
 * Purpose: Renders a single review summary card in the customer reviews list.
 *
 * Responsibilities:
 * - Display product image (or fallback icon), product name, star rating, and date.
 * - Show a truncated preview of the review comment.
 * - Provide clear visual affordance that the card is clickable — hover background
 *   shift, image desaturation lift, and a revealed "Edit →" label on hover.
 * - Use createdAt for the date (the field the backend actually returns).
 *
 * Usage:
 *   // Wrap in a clickable div in the parent — the card handles visuals only.
 *   <div onClick={() => setSelectedReviewId(review._id)}>
 *     <ReviewCard review={review} />
 *   </div>
 */

import { Star, Calendar, Gem, ArrowRight } from "lucide-react";
import type { Review } from "../../../shared/types";

interface CustomerReviewCardProps {
  review: Review;
}

export default function CustomerReviewCard({ review }: CustomerReviewCardProps) {
  // Backend returns createdAt - fall back to date if present on the type
  const rawDate = review.createdAt || (review as any).date;
  const formattedDate = rawDate
  ? new Date(rawDate).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric"
  })
  : "-";

  return (
    <div className="group bg-white p-6 md:p-8 flex flex-col md:flex-row gap-6 hover:bg-stone-50/60 transition-all duration-300 cursor-pointer">
 
      {/* Product Image / Placeholder */}
      <div className="w-20 h-20 md:w-24 md:h-24 shrink-0 bg-stone-50 rounded-2xl overflow-hidden border border-stone-100 flex items-center justify-center group-hover:border-stone-200 transition-colors duration-300">
        {review.productImage ? (
          <img
            src={review.productImage}
            alt={review.productName}
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
          />
        ) : (
          <Gem className="text-stone-200" size={32} strokeWidth={1} />
        )}
      </div>
 
      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex flex-col md:flex-row justify-between items-start gap-2 mb-3">
          <div>
            <h3 className="text-base font-serif text-stone-900 tracking-tight italic group-hover:text-stone-700 transition-colors">
              {review.productName}
            </h3>
            <div
              className="flex items-center gap-0.5 mt-1"
              aria-label={`Rating: ${review.rating} out of 5 stars`}
            >
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={13}
                  className={
                    i < review.rating
                      ? "fill-yellow-400 text-yellow-400"
                      : "fill-stone-100 text-stone-100"
                  }
                />
              ))}
            </div>
          </div>
 
          <div className="flex items-center gap-2 text-stone-400 shrink-0">
            <Calendar size={11} strokeWidth={2} />
            <span className="text-[10px] uppercase tracking-[0.2em] font-medium">
              {formattedDate}
            </span>
          </div>
        </div>
 
        {/* Comment preview — truncated to one line */}
        <p className="text-stone-400 text-sm leading-relaxed italic truncate max-w-xl">
          "{review.comment}"
        </p>
      </div>
 
      {/* Hover affordance — reveals on hover only */}
      <div className="hidden md:flex items-center self-center shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <span className="flex items-center gap-1.5 text-[9px] uppercase tracking-[0.2em] font-black text-stone-400">
          Edit <ArrowRight size={11} />
        </span>
      </div>
 
    </div>
  );
}