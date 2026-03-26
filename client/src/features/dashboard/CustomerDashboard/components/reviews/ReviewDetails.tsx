import { useState } from "react";
import { Star, Loader2, Save, Trash2, CheckCircle2, XCircle, X } from "lucide-react";
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
  
  // Toast State
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const showToast = (message: string, type: "success" | "error" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to withdraw this testimonial?")) return;
    
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/reviews/${review._id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Failed to delete");
      
      showToast("Testimonial withdrawn successfully.");
      // Small delay before removing from UI to let user see the toast
      setTimeout(() => onDeleted(review._id), 1000);
    } catch (err) {
      showToast("Could not delete testimonial. Please try again.", "error");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    if (comment.trim() === "") {
        showToast("Reflection cannot be empty.", "error");
        return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/reviews/${review._id}`, {
        method: "PUT",
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
      
      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-8 right-8 z-100 animate-in fade-in slide-in-from-right-6 duration-500">
          <div className={`flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl border ${
            toast.type === "success" 
              ? "bg-white border-stone-100 text-stone-900" 
              : "bg-red-50 border-red-100 text-red-900"
          }`}>
            {toast.type === "success" ? (
              <CheckCircle2 size={18} className="text-green-500" />
            ) : (
              <XCircle size={18} className="text-red-500" />
            )}
            <p className="text-[11px] uppercase tracking-widest font-bold">{toast.message}</p>
            <button onClick={() => setToast(null)} className="ml-2 hover:opacity-50 transition-opacity">
              <X size={14} />
            </button>
          </div>
        </div>
      )}

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