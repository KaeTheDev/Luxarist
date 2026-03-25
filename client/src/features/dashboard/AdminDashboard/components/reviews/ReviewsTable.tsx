import { useState, useEffect } from "react";
import type { Review } from "../../../shared/types";
import { ReviewRow } from "./ReviewRow";

export default function ReviewsTable() {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchReviews = async() => {
        try {
            const res = await fetch("/api/admin/reviews");
            if(res.ok) setReviews(await res.json());
        } catch(err) { console.error("Fetch failed", err); }
        finally { setIsLoading(false); }
    };

    useEffect(() => { fetchReviews(); }, []);

    const handleToggleApproval = async (id: string, currentStatus: boolean) => {
        try {
          const res = await fetch(`/api/admin/reviews/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ isApproved: !currentStatus }),
          });
          if (res.ok) {
            setReviews(prev => prev.map(r => r._id === id ? { ...r, isApproved: !currentStatus } : r));
          }
        } catch (err) { console.error("Toggle failed", err); }
      };
    
      if (isLoading) return <div className="p-20 text-center animate-pulse font-serif italic text-stone-400">Loading Testimonials...</div>;
    
      return (
        <div className="bg-white border border-stone-100 rounded-4xl overflow-hidden shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-stone-50 bg-stone-50/30">
                {["Customer", "Product", "Rating", "Comment", "Status", "Actions"].map((h) => (
                  <th key={h} className="px-8 py-5 text-[10px] uppercase tracking-[0.2em] text-stone-400 font-black">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-50">
              {reviews.map((review) => (
                <ReviewRow 
                  key={review._id} 
                  review={review} 
                  onToggle={handleToggleApproval} 
                />
              ))}
            </tbody>
          </table>
        </div>
      );
    }