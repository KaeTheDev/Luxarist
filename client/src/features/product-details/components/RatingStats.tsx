/**
 * Purpose: Displays the aggregate rating summary for a product's review panel.
 *
 * Responsibilities:
 * - Render the large average score numeral with a static star row beneath it.
 * - Render animated distribution bars for each star tier (5★ → 1★).
 * - Show a contextual review count label below the score.
 * - Handle the zero-reviews empty state gracefully (renders an em-dash, not "0.0").
 *
 * Usage:
 *   <RatingStats
 *     averageRating={4.7}
 *     totalReviews={12}
 *     ratingDistribution={{ 5: 9, 4: 2, 3: 1, 2: 0, 1: 0 }}
 *   />
 */

import { Star } from "lucide-react";
import { RatingStars } from "./ReviewStars";
 
// ─────────────────────────────────────────────────────────────────────────────
// DistributionBar — scoped to this file, not exported
// ─────────────────────────────────────────────────────────────────────────────
 
function DistributionBar({
  star,
  count,
  total,
}: {
  star: number;
  count: number;
  total: number;
}) {
  const pct = total > 0 ? Math.round((count / total) * 100) : 0;
 
  return (
    <div className="flex items-center gap-3 text-[11px]">
      <span className="w-4 text-stone-500 shrink-0">{star}</span>
      <Star size={9} fill="#1c1917" className="text-stone-900 shrink-0" />
      <div className="flex-1 h-px bg-stone-100 relative overflow-hidden rounded-full">
        <div
          className="absolute inset-y-0 left-0 bg-stone-900 transition-all duration-700 ease-out rounded-full"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-stone-400 w-7 text-right shrink-0">({count})</span>
    </div>
  );
}
 
// ─────────────────────────────────────────────────────────────────────────────
// RatingStats
// ─────────────────────────────────────────────────────────────────────────────
 
interface RatingStatsProps {
  averageRating: number;
  totalReviews: number;
  ratingDistribution: Record<number, number>;
}
 
export function RatingStats({
  averageRating,
  totalReviews,
  ratingDistribution,
}: RatingStatsProps) {
  return (
    <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-center md:items-start border-b border-stone-100 pb-10">
      {/* Average score */}
      <div className="text-center shrink-0">
        <h2 className="text-6xl font-light text-stone-900 tracking-tight tabular-nums">
          {totalReviews > 0 ? averageRating.toFixed(1) : "—"}
        </h2>
        <RatingStars rating={Math.round(averageRating)} size={14} />
        <p className="text-stone-400 text-[10px] uppercase tracking-widest font-bold mt-2">
          {totalReviews === 0
            ? "No reviews yet"
            : `Based on ${totalReviews} ${totalReviews === 1 ? "review" : "reviews"}`}
        </p>
      </div>
 
      {/* Distribution bars */}
      <div className="flex-1 w-full max-w-sm space-y-3">
        {[5, 4, 3, 2, 1].map((star) => (
          <DistributionBar
            key={star}
            star={star}
            count={ratingDistribution[star] ?? 0}
            total={totalReviews}
          />
        ))}
      </div>
    </div>
  );
}