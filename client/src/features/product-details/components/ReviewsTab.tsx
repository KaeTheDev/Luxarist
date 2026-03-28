/**
 * Purpose: Renders the full reviews panel for the product detail page.
 *
 * Responsibilities:
 * - Display aggregate rating (average score + star visual + total count)
 * - Render an animated rating distribution bar chart (5★ → 1★)
 * - Map and animate approved reviews with Verified Acquisition badge
 * - Conditionally render the "Write a Reflection" form only when the
 *   authenticated user has a Delivered order for this product (canReview)
 * - Surface a post-submit pending-approval notice so expectations are set
 * - Handle loading skeleton, empty state, and error state gracefully
 *
 * Usage:
 *   <ReviewsTab productId={product._id} />
 */

import { useState } from "react";
import { ShieldCheck, Star, Loader2, Send } from "lucide-react";
import { useProductReviews, type SubmitReviewPayload } from "../../../hooks/useProductReviews";
import { useAuth } from "../../../context/AuthContext";

// ─────────────────────────────────────────────────────────────────────────────
// Sub-components
// ─────────────────────────────────────────────────────────────────────────────

function RatingStars({ rating, size = 13 }: { rating: number; size?: number }) {
    return (
        <div className="flex gap-0 5">
            {[1,2,3,4,5].map((i) => (
                <Star 
                key={i}
                size={size}
                fill={i <= rating ? "#1c1917" : "none"}
                className={i <= rating ? "text-stone-900" : "text-stone-200"}
                />
            ))}
        </div>
    );
}

// Interactive star picker for the submission form
function StarPicker({
    value,
    onChange,
  }: {
    value: number;
    onChange: (v: number) => void;
  }) {
    const [hovered, setHovered] = useState(0);
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((i) => (
          <button
            key={i}
            type="button"
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(0)}
            onClick={() => onChange(i)}
            className="transition-transform hover:scale-110 active:scale-95"
            aria-label={`Rate ${i} star${i !== 1 ? "s" : ""}`}
          >
            <Star
              size={20}
              fill={(hovered || value) >= i ? "#1c1917" : "none"}
              className={(hovered || value) >= i ? "text-stone-900" : "text-stone-300"}
            />
          </button>
        ))}
      </div>
    );
  }
   
  // Distribution bar for a single star tier
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
   
  // Single review card
  function ReviewCard({
    customerName,
    rating,
    title,
    comment,
    isVerified,
    createdAt,
  }: {
    customerName: string;
    rating: number;
    title: string;
    comment: string;
    isVerified: boolean;
    createdAt: string;
  }) {
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
   
  // ─────────────────────────────────────────────────────────────────────────────
  // Write a Reflection form
  // ─────────────────────────────────────────────────────────────────────────────
   
  function ReflectionForm({
    onSubmit,
    submitting,
    submitError,
    submitSuccess,
  }: {
    onSubmit: (payload: SubmitReviewPayload) => Promise<void>;
    submitting: boolean;
    submitError: string | null;
    submitSuccess: boolean;
  }) {
    const [rating, setRating] = useState(0);
    const [title, setTitle] = useState("");
    const [comment, setComment] = useState("");
    const [validationError, setValidationError] = useState<string | null>(null);
   
    // Post-success notice — the review enters the moderation queue
    if (submitSuccess) {
      return (
        <div className="border border-emerald-100 bg-emerald-50 rounded-2xl p-8 animate-in fade-in duration-500">
          <div className="flex items-center gap-2 mb-2">
            <ShieldCheck size={16} className="text-emerald-600" />
            <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-600">
              Reflection Received
            </p>
          </div>
          <p className="text-sm text-stone-600 leading-relaxed">
            Your reflection has been submitted and is pending curatorial review. Once
            approved, it will appear here alongside our community of collectors.
          </p>
        </div>
      );
    }
   
    function handleSubmit() {
      setValidationError(null);
      if (rating === 0) {
        setValidationError("Please select a rating before submitting.");
        return;
      }
      if (!title.trim()) {
        setValidationError("A brief title is required.");
        return;
      }
      if (!comment.trim() || comment.trim().length < 10) {
        setValidationError("Your reflection must be at least 10 characters.");
        return;
      }
      onSubmit({ rating, title: title.trim(), comment: comment.trim() });
    }
   
    const inputBase =
      "w-full bg-stone-50 border border-stone-100 rounded-xl px-4 py-3 text-sm text-stone-900 placeholder:text-stone-300 focus:outline-none focus:border-stone-400 focus:bg-white transition-all duration-200";
   
    return (
      <div className="border border-stone-100 rounded-2xl p-8 space-y-6 animate-in fade-in duration-500">
        {/* Header */}
        <div>
          <h3 className="text-base font-semibold text-stone-900 tracking-tight">
            Write a Reflection
          </h3>
          <p className="text-xs text-stone-400 mt-1 font-light">
            Share your experience with this piece. Your reflection will be reviewed
            before publication.
          </p>
        </div>
   
        {/* Star picker */}
        <div className="space-y-2">
          <label className="text-[10px] uppercase tracking-[0.18em] font-black text-stone-400">
            Your Rating
          </label>
          <StarPicker value={rating} onChange={setRating} />
        </div>
   
        {/* Title */}
        <div className="space-y-2">
          <label className="text-[10px] uppercase tracking-[0.18em] font-black text-stone-400">
            Title
          </label>
          <input
            type="text"
            maxLength={120}
            placeholder="Summarise your experience..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={inputBase}
          />
        </div>
   
        {/* Comment */}
        <div className="space-y-2">
          <label className="text-[10px] uppercase tracking-[0.18em] font-black text-stone-400">
            Your Reflection
          </label>
          <textarea
            rows={4}
            maxLength={2000}
            placeholder="Describe the craftsmanship, how it made you feel, or how you style it..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className={`${inputBase} resize-none`}
          />
          <p className="text-[10px] text-stone-300 text-right">
            {comment.length} / 2000
          </p>
        </div>
   
        {/* Errors */}
        {(validationError || submitError) && (
          <p className="text-xs text-rose-500 font-medium">
            {validationError ?? submitError}
          </p>
        )}
   
        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={submitting}
          className="flex items-center gap-2 bg-stone-900 text-white text-[10px] uppercase tracking-[0.2em] font-black px-6 py-3.5 rounded-xl hover:bg-stone-700 active:scale-95 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {submitting ? (
            <Loader2 size={13} className="animate-spin" />
          ) : (
            <Send size={13} />
          )}
          {submitting ? "Submitting..." : "Submit Reflection"}
        </button>
      </div>
    );
  }
   
  // ─────────────────────────────────────────────────────────────────────────────
  // Main export
  // ─────────────────────────────────────────────────────────────────────────────
   
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
   
        {/* ── Aggregate stats ─────────────────────────────────────────────────── */}
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
                count={ratingDistribution[star]}
                total={totalReviews}
              />
            ))}
          </div>
        </div>
   
        {/* ── Review list ─────────────────────────────────────────────────────── */}
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
   
        {/* ── Conditional submission form ──────────────────────────────────────── */}
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
   
        {/* Soft prompt for unauthenticated users or non-verified buyers */}
        {!isAuthenticated && (
          <p className="text-center text-[10px] uppercase tracking-[0.18em] font-bold text-stone-300 border-t border-stone-100 pt-8">
            Sign in to share your reflection
          </p>
        )}
      </div>
    );
  }