/**
 * Purpose: Orchestrates the full reviews panel on the product detail page.
 *
 * Responsibilities:
 * - Invoke useProductReviews to fetch approved reviews and verify purchase
 *   eligibility in a single parallel call on mount.
 * - Render a loading skeleton while data is in flight.
 * - Render an error state if the fetch fails.
 * - Compose RatingStats, ReviewCard list, ReflectionForm, and guest prompt
 *   into the final reviews UI.
 * - Gate the ReflectionForm behind canReview (Verified Acquisition only).
 * - Show a soft sign-in prompt for unauthenticated visitors.
 *
 * Usage:
 *   <ReviewsTab productId={product._id} />
 */

import { useAuth } from "../../../context/AuthContext";
import { useProductReviews } from "../hooks/useProductReviews";
import { RatingStats } from "./RatingStats";
import { ReviewCard } from "./ReviewCard";
import { ReflectionForm } from "./ReflectionForm";
 
interface ReviewsTabProps {
  productId: string;
}

export function ReviewsTab({ productId }: ReviewsTabProps) {
  const { isAuthenticated } = useAuth();
  const {
    reviews,
    averageRating,
    ratingDistribution,
    canReview,
    loading,
    error,
    submitting,
    submitError,
    submitSuccess,
    submitReview,
  } = useProductReviews(productId);
 
  // ── Loading skeleton ───────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="space-y-8 animate-pulse">
        <div className="flex gap-16 items-start border-b border-stone-100 pb-10">
          <div className="space-y-3">
            <div className="h-14 w-20 bg-stone-100 rounded-xl" />
            <div className="h-3 w-16 bg-stone-100 rounded" />
          </div>
          <div className="flex-1 space-y-3">
            {[5, 4, 3, 2, 1].map((s) => (
              <div key={s} className="flex items-center gap-3">
                <div className="h-2 w-4 bg-stone-100 rounded" />
                <div className="flex-1 h-px bg-stone-100 rounded" />
                <div className="h-2 w-8 bg-stone-100 rounded" />
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-6">
          {[1, 2].map((i) => (
            <div key={i} className="space-y-2 border-b border-stone-50 pb-6">
              <div className="h-3 w-32 bg-stone-100 rounded" />
              <div className="h-3 w-48 bg-stone-100 rounded" />
              <div className="h-12 w-full bg-stone-50 rounded" />
            </div>
          ))}
        </div>
      </div>
    );
  }
 
  // ── Error state ────────────────────────────────────────────────────────────
  if (error) {
    return (
      <div className="py-12 text-center">
        <p className="text-[10px] uppercase tracking-[0.2em] font-black text-stone-300">
          Unable to Load Reviews
        </p>
        <p className="text-xs text-stone-300 italic mt-1">{error}</p>
      </div>
    );
  }
 
  const totalReviews = reviews.length;
 
  return (
    <div className="space-y-10 animate-in fade-in duration-500">
 
      {/* Aggregate score + distribution bars */}
      <RatingStats
        averageRating={averageRating}
        totalReviews={totalReviews}
        ratingDistribution={ratingDistribution}
      />
 
      {/* Review list or empty state */}
      {totalReviews === 0 ? (
        <div className="py-8 text-center space-y-2">
          <p className="text-[10px] uppercase tracking-[0.2em] font-black text-stone-300">
            No Reflections Yet
          </p>
          <p className="text-xs text-stone-300 italic font-light">
            Be the first to share your experience with this piece.
          </p>
        </div>
      ) : (
        <div className="divide-y divide-stone-50">
          {reviews.map((review) => (
            <ReviewCard key={review._id} {...review} />
          ))}
        </div>
      )}
 
      {/* Verified buyer form */}
      {isAuthenticated && canReview && (
        <div className="border-t border-stone-100 pt-10">
          <ReflectionForm
            onSubmit={submitReview}
            submitting={submitting}
            submitError={submitError}
            submitSuccess={submitSuccess}
          />
        </div>
      )}
 
      {/* Guest prompt */}
      {!isAuthenticated && (
        <p className="text-center text-[10px] uppercase tracking-[0.18em] font-bold text-stone-300 border-t border-stone-100 pt-8">
          Sign in to share your reflection
        </p>
      )}
 
    </div>
  );
}