import { useState, useEffect } from "react";
import { MessageSquare, Loader2, Star } from "lucide-react";
import type { Review } from "../../shared/types";
import ReviewCard from "./ReviewCard";

export default function MyReviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setReviews([
        {
          id: "REV-9921",
          productId: "prod-001",
          productName: "Solaire Statement Necklace",
          image: "https://ik.imagekit.io/gwbd4eva2026/products/necklaces/necklace-002-main.png?updatedAt=1770533144005",
          rating: 5,
          comment: "Absolutely stunning! The craftsmanship is exceptional and it looks even more beautiful in person. I receive compliments every time I wear it.",
          date: "December 18, 2024",
        },
        {
          id: "REV-9925",
          productId: "prod-004",
          productName: "Éternité Diamond Ring",
          image: "https://ik.imagekit.io/gwbd4eva2026/products/rings/ring-001-main.png?updatedAt=1770533319348",
          rating: 5,
          comment: "Perfect engagement ring! The diamond sparkles beautifully and the setting is timeless. My fiancée absolutely loves it.",
          date: "December 4, 2024",
        },
        {
          id: "REV-9928",
          productId: "prod-007",
          productName: "Celestial Diamond Studs",
          image: "https://ik.imagekit.io/gwbd4eva2026/products/earrings/earring-006-main.jpeg?updatedAt=1770533119660",
          rating: 4,
          comment: "Beautiful earrings with excellent quality. Very elegant and versatile. Only minor note is they feel slightly heavier than expected, but still comfortable.",
          date: "December 18, 2024",
        }
      ]);
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

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
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}