import { Star, Calendar } from "lucide-react";
import type { Review } from "../../shared/types";

interface ReviewCardProps {
    review: Review;
}

export default function ReviewCard({ review }: ReviewCardProps) {
    return (
        <div className="bg-white border border-stone-100 p-6 md:p-8 rounded-4xl hover:shadow-xl hover:shadow-stone-200/10 transition-all duration-500 group flex flex-col md:flex-row gap-6">
            
            {/* Product Image */}
            <div className="w-20 h-20 md:w-24 md:h-24 shrink-0 bg-stone-50 rounded-2xl overflow-hidden border border-stone-100">
                <img 
                    src={review.image || "/api/placeholder/100/100"} 
                    alt={review.productName}
                    className="w-full h-full object-cover grayscale-20 group-hover:grayscale-0 transition-all duration-700"
                />
            </div>

            {/* Content Area */}
            <div className="flex-1">
                <div className="flex flex-col md:flex-row justify-between items-start gap-2 mb-4">
                    <div>
                        <h3 className="text-lg font-serif text-stone-900 tracking-tight italic">
                            {review.productName}
                        </h3>
                        <div className="flex items-center gap-0.5 mt-1">
                            {[...Array(5)].map((_, i) => (
                                <Star 
                                    key={i} 
                                    size={14} 
                                    className={i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-stone-200"} 
                                />
                            ))}
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-2 text-stone-400">
                        <Calendar size={12} strokeWidth={2.5} />
                        <span className="text-[10px] uppercase tracking-[0.2em] font-bold">
                            {review.date}
                        </span>
                    </div>
                </div>

                {/* Review Text */}
                <p className="text-stone-500 leading-relaxed font-light text-sm md:text-base max-w-2xl">
                    "{review.comment}"
                </p>
            </div>
        </div>
    );
}