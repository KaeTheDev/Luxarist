import { Star, Calendar, Gem } from "lucide-react"; // Added Gem as a fallback icon
import type { Review } from "../../../shared/types";

interface ReviewCardProps {
  review: Review;
}

export default function ReviewCard({ review }: ReviewCardProps) {
  // Use the pre-formatted date from backend, or fallback to now
  const displayDate = review.date || new Date().toLocaleDateString();

  return (
    <div className="bg-white border border-stone-100 p-6 md:p-8 rounded-3xl hover:shadow-xl hover:shadow-stone-200/10 transition-all duration-500 group flex flex-col md:flex-row gap-6">
      
      {/* Product Image / Placeholder */}
      <div className="w-20 h-20 md:w-24 md:h-24 shrink-0 bg-stone-50 rounded-2xl overflow-hidden border border-stone-100 flex items-center justify-center">
        {review.productImage ? (
          <img
            src={review.productImage}
            alt={review.productName}
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
          />
        ) : (
          <Gem className="text-stone-200" size={32} strokeWidth={1} />
        )}
      </div>

      {/* Content Area */}
      <div className="flex-1">
        <div className="flex flex-col md:flex-row justify-between items-start gap-2 mb-4">
          <div>
            <h3 className="text-lg font-serif text-stone-900 tracking-tight italic">
              {review.productName}
            </h3>
            
            {/* Accessible Star Rating */}
            <div 
              className="flex items-center gap-0.5 mt-1" 
              aria-label={`Rating: ${review.rating} out of 5 stars`}
            >
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} className={ i < review.rating ? "fill-yellow-400 text-yellow-400" : "fill-stone-100 text-stone-100" // Use fill for empty stars for a cleaner look
                  }
                />
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 text-stone-400">
            <Calendar size={12} strokeWidth={2} />
            <span className="text-[10px] uppercase tracking-[0.2em] font-medium">
              {displayDate}
            </span>
          </div>
        </div>

        {/* Review Text */}
        <p className="text-stone-500 leading-relaxed font-light text-sm md:text-base max-w-2xl italic">
          &ldquo;{review.comment}&rdquo;
        </p>
      </div>
    </div>
  );
}