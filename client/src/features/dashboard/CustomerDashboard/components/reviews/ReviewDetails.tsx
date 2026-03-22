import { useState } from "react";
import { Star, Calendar, Package, Pencil, X, Check, Loader2 } from "lucide-react";
import type { Review } from "../../../shared/types";

const API_URL = import.meta.env.DEV
  ? "http://localhost:3000/api"
  : import.meta.env.VITE_API_URL;

interface ReviewDetailsProps {
  review: Review;
  token: string;
  onUpdated: (updated: Review) => void;
}

export default function ReviewDetails({ review, token, onUpdated }: ReviewDetailsProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editRating, setEditRating] = useState(review.rating);
  const [editComment, setEditComment] = useState(review.comment);
  const [hoveredStar, setHoveredStar] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentReview, setCurrentReview] = useState(review);

  const handleSave = async () => {
    setSaving(true);
    setError(null);

    try {
      const res = await fetch(`${API_URL}/reviews/${review.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ rating: editRating, comment: editComment }),
      });

      if (!res.ok) throw new Error("Failed to update review");

      const data = await res.json();
      const updated = {
        ...currentReview,
        rating: data.rating,
        comment: data.comment,
      };
      setCurrentReview(updated);
      onUpdated(updated);
      setIsEditing(false);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setEditRating(review.rating);
    setEditComment(review.comment);
    setIsEditing(false);
    setError(null);
  };

  return (
    <div className="space-y-8 pb-12 animate-in fade-in slide-in-from-bottom-2 duration-500">
      {/* Product Card */}
      <div className="bg-white border border-stone-100 p-8 rounded-[2.5rem] shadow-sm">
        <div className="flex justify-between items-start mb-8">
          <div>
            <p className="text-[10px] text-stone-400 uppercase tracking-[0.2em] font-bold">
              Review for
            </p>
            <h3 className="text-xl font-serif text-stone-900 italic tracking-tight">
              {currentReview.productName}
            </h3>
          </div>
          <div className="flex items-center gap-2 text-stone-400">
            <Calendar size={12} strokeWidth={2.5} />
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold">
              {currentReview.date}
            </span>
          </div>
        </div>

        <div className="flex gap-6 items-center">
          <div className="w-24 h-24 shrink-0 bg-stone-50 rounded-2xl overflow-hidden border border-stone-100 flex items-center justify-center text-stone-300">
            {currentReview.image ? (
              <img
                src={currentReview.image}
                alt={currentReview.productName}
                className="w-full h-full object-cover"
              />
            ) : (
              <Package size={28} />
            )}
          </div>
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={20}
                className={i < currentReview.rating ? "fill-yellow-400 text-yellow-400" : "text-stone-200"}
              />
            ))}
            <span className="text-sm text-stone-400 font-light ml-2">
              {currentReview.rating} / 5
            </span>
          </div>
        </div>
      </div>

      {/* Review Content Card */}
      <div className="bg-white border border-stone-100 p-8 rounded-[2.5rem] shadow-sm space-y-6">
        <div className="flex justify-between items-center border-b border-stone-50 pb-4">
          <h4 className="text-[10px] text-stone-400 uppercase tracking-widest font-bold">
            Your Review
          </h4>
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-stone-400 hover:text-stone-900 transition-colors"
            >
              <Pencil size={12} /> Edit
            </button>
          )}
        </div>

        {isEditing ? (
          <div className="space-y-6">
            {/* Star Rating Input */}
            <div className="space-y-2">
              <p className="text-[10px] uppercase tracking-widest font-bold text-stone-400">
                Rating
              </p>
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setEditRating(i + 1)}
                    onMouseEnter={() => setHoveredStar(i + 1)}
                    onMouseLeave={() => setHoveredStar(null)}
                  >
                    <Star
                      size={24}
                      className={i < (hoveredStar ?? editRating) ? "fill-yellow-400 text-yellow-400 transition-colors" : "text-stone-200 transition-colors"}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Comment Input */}
            <div className="space-y-2">
              <p className="text-[10px] uppercase tracking-widest font-bold text-stone-400">
                Comment
              </p>
              <textarea
                value={editComment}
                onChange={(e) => setEditComment(e.target.value)}
                rows={5}
                className="w-full bg-stone-50 border border-stone-100 rounded-2xl p-4 text-sm text-stone-700 font-light leading-relaxed resize-none focus:outline-none focus:border-stone-300 transition-colors"
              />
            </div>

            {error && <p className="text-red-400 text-xs italic">{error}</p>}

            {/* Action Buttons */}
            <div className="flex gap-3 pt-2">
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex items-center gap-2 px-6 py-3 bg-stone-900 text-white text-[10px] uppercase tracking-widest font-bold rounded-xl hover:bg-stone-700 transition-colors disabled:opacity-50"
              >
                {saving ? (
                  <Loader2 size={12} className="animate-spin" />
                ) : (
                  <Check size={12} />
                )}
                {saving ? "Saving..." : "Save Changes"}
              </button>
              <button
                onClick={handleCancel}
                className="flex items-center gap-2 px-6 py-3 bg-stone-50 text-stone-500 text-[10px] uppercase tracking-widest font-bold rounded-xl hover:bg-stone-100 transition-colors"
              >
                <X size={12} /> Cancel
              </button>
            </div>
          </div>
        ) : (
          <p className="text-stone-500 leading-relaxed font-light text-sm md:text-base max-w-2xl">
            "{currentReview.comment}"
          </p>
        )}
      </div>
    </div>
  );
}