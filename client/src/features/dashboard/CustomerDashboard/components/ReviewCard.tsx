import { Star, Calendar } from "lucide-react";
import type { Review } from "../../shared/types";

interface ReviewCardProps {
    review: Review;
}

export default function ReviewCard({ review }: ReviewCardProps) {
    return (
        <div className="bg-white border border-stone-100 p-8 rounded-4xl hover:shadow-xl hover:shadow-stone-200/20 transition-all duration-500 group">
            <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
                 <div>
                    <h3 className="text-lg font-semibold text-stone-900 tracking-tight">
                        {review.productName}
                    </h3>
                    <div className="flex items-center gap-1 mt-1">
                        {[...Array(5)].map((_, i) => (
                            <Star 
                            key={i} 
                            size={14} 
                            className={i < review.rating ? "fill-stone-900 text-stone-900" : "text-stone-200"} 
                          />
                        ))}
                    </div>
                 </div>
                 <div className="flex items-center gap-2 text-stone-400">
                 <Calendar size={14} />
                 <span className="text-[10px] uppercase tracking-widest font-bold">{review.date}</span>
                 </div>
            </div>
            <blockquote className="text-stone-600 leading-relaxed font-light italic border-l-2 border-stone-50 pl-6 py-1">
        "{review.comment}"
      </blockquote>
        </div>
    );
}