/**
 * Purpose: Renders the full detail and edit view for a single customer review.
 *
 * Responsibilities:
 * - Display product name, star rating, submission date, and review comment.
 * - Provide an inline edit flow for the review comment with save/cancel actions.
 * - Handle deletion via a custom inline confirmation UI — no browser dialogs.
 * - Surface success and error feedback via the built-in toast system.
 * - Delegate all API calls to the parent via onUpdated and onDeleted callbacks.
 *
 * Usage:
 *   <ReviewDetails
 *     review={review}
 *     token={token}
 *     onUpdated={(updated) => ...}
 *     onDeleted={(id) => ...}
 *   />
 */

import { useState } from "react";
import { Star, Loader2, Save, Trash2, AlertTriangle } from "lucide-react";
import type { Review } from "../../../shared/types";
import { API_URL, getAuthHeaders } from "../../../../../api/config";
import Toast from "../../../../../common/ui/Toast";
 
interface ReviewDetailsProps {
  review: Review;
  token: string;
  onUpdated: (updated: Review) => void;
  onDeleted: (id: string) => void;
}
 
export default function ReviewDetails({ review, token, onUpdated, onDeleted }: ReviewDetailsProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [comment, setComment] = useState(review.comment);
  const [loading, setLoading] = useState(false);
  const [confirmingDelete, setConfirmingDelete] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
 
  const showToast = (message: string, type: "success" | "error" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };
 
  // ── Date ──────────────────────────────────────────────────────────────────
  const rawDate = review.createdAt || (review as any).updatedAt;
  const formattedDate = rawDate
    ? new Date(rawDate).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "—";
 
  // ── Delete ────────────────────────────────────────────────────────────────
  const handleDelete = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/reviews/${review._id}`, {
        method: "DELETE",
        headers: getAuthHeaders(token),
      });
      if (!res.ok) throw new Error("Failed to delete");
      showToast("Testimonial withdrawn successfully.");
      setTimeout(() => onDeleted(review._id), 1000);
    } catch (err) {
      showToast("Could not withdraw testimonial. Please try again.", "error");
      console.error(err);
    } finally {
      setLoading(false);
      setConfirmingDelete(false);
    }
  };
 
  // ── Update ────────────────────────────────────────────────────────────────
  const handleUpdate = async () => {
    if (comment.trim() === "") {
      showToast("Reflection cannot be empty.", "error");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/reviews/${review._id}`, {
        method: "PUT",
        headers: getAuthHeaders(token),
        body: JSON.stringify({ comment }),
      });
      if (!res.ok) throw new Error("Failed to update testimonial");
      const updated = await res.json();
      onUpdated(updated);
      setIsEditing(false);
      showToast("Your reflection has been updated.");
    } catch (err) {
      showToast("Failed to save changes.", "error");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
 
  return (
    <div className="relative bg-white border border-stone-100 rounded-[2.5rem] p-8 shadow-sm space-y-8 animate-in fade-in slide-in-from-bottom-4">
 
      {/* Toast */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
 
      {/* Header */}
      <div className="flex justify-between items-start border-b border-stone-50 pb-6">
        <div>
          <p className="text-[10px] text-stone-400 uppercase tracking-widest font-bold">
            Product Feedback
          </p>
          <h3 className="text-xl font-semibold text-stone-900 mt-1">{review.productName}</h3>
          <div className="flex gap-1 mt-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={14}
                className={i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-stone-200"}
              />
            ))}
          </div>
        </div>
        <span className="text-[10px] text-stone-400 italic">
          Submitted {formattedDate}
        </span>
      </div>
 
      {/* Comment */}
      <div className="space-y-4">
        <p className="text-[10px] text-stone-400 uppercase tracking-widest font-bold">
          Your Reflection
        </p>
        {isEditing ? (
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full min-h-37.5 p-4 bg-stone-50 border border-stone-100 rounded-2xl text-stone-600 focus:outline-none focus:border-stone-300 transition-colors italic resize-none"
          />
        ) : (
          <p className="text-stone-600 leading-relaxed italic font-serif text-lg">
            "{review.comment}"
          </p>
        )}
      </div>
 
      {/* Inline delete confirmation */}
      {confirmingDelete && (
        <div className="border border-red-100 bg-red-50 rounded-2xl p-5 flex items-center justify-between gap-4 animate-in fade-in duration-300">
          <div className="flex items-center gap-3">
            <AlertTriangle size={16} className="text-red-400 shrink-0" />
            <p className="text-xs text-red-700 font-medium">
              Withdraw this testimonial permanently? This cannot be undone.
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setConfirmingDelete(false)}
              className="px-4 py-2 text-[10px] uppercase tracking-widest font-bold text-stone-500 hover:text-stone-900 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              disabled={loading}
              className="flex items-center gap-1.5 px-4 py-2 bg-red-500 text-white text-[10px] uppercase tracking-widest font-bold rounded-xl hover:bg-red-600 transition-colors disabled:opacity-50"
            >
              {loading ? <Loader2 size={12} className="animate-spin" /> : <Trash2 size={12} />}
              Confirm
            </button>
          </div>
        </div>
      )}
 
      {/* Actions */}
      <div className="flex items-center justify-between pt-4">
        <div className="flex gap-4">
          {isEditing ? (
            <button
              onClick={handleUpdate}
              disabled={loading}
              className="flex items-center gap-2 bg-stone-900 text-white px-6 py-2 rounded-full text-[10px] uppercase tracking-widest font-bold hover:bg-stone-800 transition-all disabled:opacity-50"
            >
              {loading ? <Loader2 className="animate-spin" size={14} /> : <Save size={14} />}
              Save Changes
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-stone-50 text-stone-900 px-6 py-2 rounded-full text-[10px] uppercase tracking-widest font-bold hover:bg-stone-100 transition-all border border-stone-100"
            >
              Edit Testimonial
            </button>
          )}
          {isEditing && (
            <button
              onClick={() => { setIsEditing(false); setComment(review.comment); }}
              className="px-6 py-2 text-[10px] uppercase tracking-widest font-bold text-stone-400 hover:text-stone-900 transition-colors"
            >
              Cancel
            </button>
          )}
        </div>
 
        {!isEditing && !confirmingDelete && (
          <button
            onClick={() => setConfirmingDelete(true)}
            disabled={loading}
            className="p-3 text-stone-300 hover:text-red-400 hover:bg-red-50 rounded-full transition-all duration-300"
            title="Withdraw Testimonial"
          >
            <Trash2 size={18} />
          </button>
        )}
      </div>
 
    </div>
  );
}