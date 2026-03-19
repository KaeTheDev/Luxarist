import { useState, useEffect } from "react";
import { MessageSquare, Loader2 } from "lucide-react";
import type { Review } from "../../shared/types";
import ReviewCard from "./ReviewCard";

export default function MyReviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulated GET for /api/reviews/userId
    const timer = setTimeout(() => {
      setReviews([
        {
          id: "REV-9921",
          productId: "prod-001",
          productName: "Solaire Statement Necklace",
          rating: 5,
          comment:
            "The weight of the gold is substantial. It feels like a piece of history on my neck. Absolutely stunning craftsmanship.",
          date: "March 12, 2026",
        },
        {
          id: "REV-9925",
          productId: "prod-004",
          productName: "Luna Studs in 18k Gold",
          rating: 4,
          comment:
            "Beautiful minimalist design. The clarity of the stones is excellent. I wish the backings were a bit larger, but overall 10/10.",
          date: "February 28, 2026",
        },
      ]);
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading)
    return (
      <div className="h-96 flex items-center justify-center">
        <Loader2 className="animate-spin text-stone-200" size={40} />
      </div>
    );

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <header>
        <h2 className="text-2xl font-serif text-stone-900">My Reviews</h2>
        <p className="text-sm text-stone-500 italic">
          Your shared thoughts on the Luxarist collection.
        </p>
      </header>

      {reviews.length === 0 ? (
        <div className="py-20 text-center bg-white border border-stone-100 rounded-4xl">
          <MessageSquare className="mx-auto text-stone-100 mb-4" size={48} />
          <p className="text-stone-400 italic font-light">
            Your feedback gallery is currently empty.
          </p>
        </div>
      ) : (
        <div className="grid gap-6">
        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
      )}
    </div>
  );
}