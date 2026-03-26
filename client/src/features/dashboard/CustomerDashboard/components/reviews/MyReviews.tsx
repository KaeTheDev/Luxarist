import { useState } from "react";
import ReviewCard from "./ReviewCard";
import ReviewDetails from "./ReviewDetails";
import { MessageSquare, Loader2, Star, ArrowLeft } from "lucide-react";
import { useReviews } from "../../hooks/useReviews";
import { useAuth } from "../../../../../context/AuthContext";

export default function MyReviews() {
  const { reviews, loading, setReviews } = useReviews();
const { token } = useAuth();
  const [selectedReviewId, setSelectedReviewId] = useState<string | null>(null);

  // Logic for Metric Cards
  const totalReviews = reviews.length;
  const avgRating = totalReviews > 0 
    ? (reviews.reduce((acc, curr) => acc + curr.rating, 0) / totalReviews).toFixed(1) 
    : "0";
  const fiveStarCount = reviews.filter(r => r.rating === 5).length;

  const metrics = [
    { label: "Total Reviews", value: totalReviews },
    { label: "Average Rating", value: avgRating, hasStar: true },
    { label: "5-Star Reviews", value: fiveStarCount },
  ];

  if (loading) return (
    <div className="h-96 flex items-center justify-center">
      <Loader2 className="animate-spin text-stone-200" size={40} />
    </div>
  );

  // ✅ Switch to ReviewDetails when a card is clicked
  if (selectedReviewId) {
    const currentReview = reviews.find(r => r._id === selectedReviewId);
    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <button
                onClick={() => setSelectedReviewId(null)}
                className="flex items-center gap-2 text-stone-400 hover:text-stone-900 transition-colors uppercase text-[10px] tracking-[0.2em] font-bold"
            >
                <ArrowLeft size={16} /> Back to Reviews
            </button>
            {currentReview && (
                <ReviewDetails
                    review={currentReview}
                    token={token!}
                    onDeleted={(deletedId) => {
                      setReviews(prev => prev.filter(r => r._id !== deletedId));
                      setSelectedReviewId(null); 
                  }}
                    onUpdated={(updated) => {
                        setReviews(prev => prev.map(r => r._id === updated._id ? updated : r));
                    }}
                />
            )}
        </div>
    );
}

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      <header>
        <h2 className="text-3xl font-serif text-stone-900 tracking-tight">My Reviews</h2>
      </header>

      {/* Metric Header Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {metrics.map((metric, i) => (
          <div key={i} className="bg-stone-50/50 border border-stone-100 p-6 rounded-2xl">
            <p className="text-[10px] uppercase tracking-widest text-stone-400 font-bold mb-2">
              {metric.label}
            </p>
            <div className="flex items-center gap-2">
              <span className="text-3xl font-light text-stone-900">{metric.value}</span>
              {metric.hasStar && <Star size={20} className="fill-yellow-400 text-yellow-400" />}
            </div>
          </div>
        ))}
      </section>

      {/* Review List Section */}
      <section className="bg-white border border-stone-100 rounded-4xl overflow-hidden shadow-sm">
        {reviews.length === 0 ? (
          <div className="py-20 text-center">
            <MessageSquare className="mx-auto text-stone-100 mb-4" size={48} />
            <p className="text-stone-400 italic">Your feedback gallery is currently empty.</p>
          </div>
        ) : (
          <div className="divide-y divide-stone-50">
            {reviews.map((review) => (
                <div key={review._id} onClick={() => setSelectedReviewId(review._id)} className="cursor-pointer">
                  <ReviewCard review={review} /> 
                </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
} 