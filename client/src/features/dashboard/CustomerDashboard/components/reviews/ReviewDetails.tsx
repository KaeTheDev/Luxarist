import { useState } from "react";
import { Star, Loader2, Save, Trash2 } from "lucide-react";
import type { Review } from "../../../shared/types";

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

  // Added the missing handleDelete function
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to withdraw this testimonial?")) return;
    
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/reviews/${review._id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Failed to delete");
      onDeleted(review._id);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/reviews/${review._id}`, {
        method: "PATCH",
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify({ comment }),
      });

      if (!res.ok) throw new Error("Failed to update testimonial");
      const updated = await res.json();
      onUpdated(updated);
      setIsEditing(false);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white border border-stone-100 rounded-[2.5rem] p-8 shadow-sm space-y-8 animate-in fade-in slide-in-from-bottom-4">
      {/* Header: Product Info */}
      <div className="flex justify-between items-start border-b border-stone-50 pb-6">
        <div>
          <p className="text-[10px] text-stone-400 uppercase tracking-widest font-bold">Product Feedback</p>
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
          Submitted {new Date(review.date).toLocaleDateString()}
        </span>
      </div>

      {/* Content Area */}
      <div className="space-y-4">
        <p className="text-[10px] text-stone-400 uppercase tracking-widest font-bold">Your Reflection</p>
        {isEditing ? (
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full min-h-37.5 p-4 bg-stone-50 border border-stone-100 rounded-2xl text-stone-600 focus:outline-none focus:border-stone-300 transition-colors italic"
          />
        ) : (
          <p className="text-stone-600 leading-relaxed italic font-serif text-lg">
            "{review.comment}"
          </p>
        )}
      </div>

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
              className="bg-stone-50 text-stone-900 px-6 py-2 rounded-full text-[10px] uppercase tracking-widest font-bold hover:bg-stone-100 transition-all"
            >
              Edit Testimonial
            </button>
          )}

          {isEditing && (
            <button
              onClick={() => setIsEditing(false)}
              className="px-6 py-2 text-[10px] uppercase tracking-widest font-bold text-stone-400 hover:text-stone-900 transition-colors"
            >
              Cancel
            </button>
          )}
        </div>

        {/* Trash icon is now inside the main return block correctly */}
        {!isEditing && (
          <button
            onClick={handleDelete}
            disabled={loading}
            className="p-3 text-stone-300 hover:text-red-400 hover:bg-red-50 rounded-full transition-all duration-300"
            title="Delete Review"
          >
            {loading ? <Loader2 className="animate-spin" size={18} /> : <Trash2 size={18} />}
          </button>
        )}
      </div>
    </div>
  );
}