/**
 * Purpose: Renders a single approved customer review inside the reviews list.
 *
 * Responsibilities:
 * - Display reviewer name, formatted date, star rating, title, and comment body.
 * - Conditionally render the "Verified Acquisition" badge when isVerified is true.
 * - Apply entrance animation on mount for a staggered list feel.
 *
 * Usage:
 *   <ReviewCard
 *     customerName="Sarah M."
 *     rating={5}
 *     title="Absolutely Stunning"
 *     comment="This piece exceeded all my expectations."
 *     isVerified={true}
 *     createdAt="2025-12-10T00:00:00.000Z"
 *   />
 */

import { ShieldCheck } from "lucide-react";
import { RatingStars } from "./ReviewStars";
 
interface ReviewCardProps {
  customerName: string;
  rating: number;
  title: string;
  comment: string;
  isVerified: boolean;
  createdAt: string;
}
 
export function ReviewCard({
  customerName,
  rating,
  title,
  comment,
  isVerified,
  createdAt,
}: ReviewCardProps) {
  const formattedDate = new Date(createdAt).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
 
  return (
    <div className="pt-8 first:pt-0 animate-in fade-in slide-in-from-bottom-2 duration-500">
      {/* Header row */}
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center gap-2 flex-wrap">
          <RatingStars rating={rating} />
          {isVerified && (
            <span className="inline-flex items-center gap-1 text-[9px] uppercase tracking-[0.18em] font-black text-emerald-600 bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-full">
              <ShieldCheck size={9} />
              Verified Acquisition
            </span>
          )}
        </div>
        <span className="text-[10px] text-stone-400 font-bold uppercase tracking-widest shrink-0 ml-4">
          {formattedDate}
        </span>
      </div>
 
      {/* Author */}
      <p className="font-bold text-sm text-stone-900">{customerName}</p>
 
      {/* Title */}
      {title && (
        <p className="font-semibold text-xs text-stone-700 mt-1 italic">{title}</p>
      )}
 
      {/* Body */}
      <p className="text-stone-500 text-sm leading-relaxed mt-2">{comment}</p>
    </div>
  );
}