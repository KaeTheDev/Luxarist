/**
 * Purpose: Renders the "Write a Reflection" submission form for verified buyers.
 *
 * Responsibilities:
 * - Collect rating (via StarPicker), title, and comment from the user.
 * - Run client-side validation before delegating to the parent's onSubmit handler.
 * - Display inline validation errors and API submission errors.
 * - Replace the form with a "Reflection Received" confirmation panel on success,
 *   setting honest expectations that the review is pending curatorial approval.
 * - Disable the submit button and show a spinner while submitting.
 *
 * Usage:
 *   <ReflectionForm
 *     onSubmit={submitReview}
 *     submitting={submitting}
 *     submitError={submitError}
 *     submitSuccess={submitSuccess}
 *   />
 */

import { useState } from "react";
import { ShieldCheck, Loader2, Send } from "lucide-react";
import { StarPicker } from "./ReviewStars";
import type { SubmitReviewPayload } from "../hooks/useProductReviews";
 
interface ReflectionFormProps {
  onSubmit: (payload: SubmitReviewPayload) => Promise<void>;
  submitting: boolean;
  submitError: string | null;
  submitSuccess: boolean;
}
 
export function ReflectionForm({
  onSubmit,
  submitting,
  submitError,
  submitSuccess,
}: ReflectionFormProps) {
  const [rating, setRating] = useState(0);
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const [validationError, setValidationError] = useState<string | null>(null);
 
  // ── Post-submit confirmation ───────────────────────────────────────────────
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
          Your reflection has been submitted and is pending curatorial review.
          Once approved, it will appear here alongside our community of collectors.
        </p>
      </div>
    );
  }
 
  // ── Validation ─────────────────────────────────────────────────────────────
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
          Share your experience with this piece. Your reflection will be
          reviewed before publication.
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