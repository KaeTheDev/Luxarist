import { useState, useEffect } from "react";
import { useAuth } from "../../../../../context/AuthContext";
import type { Review } from "../../../shared/types";
import { ReviewRow } from "./ReviewRow";

export default function ReviewsTable() {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const { token } = useAuth(); // Add auth for security

    const fetchReviews = async () => {
        if (!token) return;
        setIsLoading(true);
        try {
            const res = await fetch("/api/admin/reviews", {
                headers: { "Authorization": `Bearer ${token}` }
            });
            if (res.ok) setReviews(await res.json());
        } catch (err) { 
            console.error("Fetch failed", err); 
        } finally { 
            setIsLoading(false); 
        }
    };

    useEffect(() => { fetchReviews(); }, [token]);

    const handleToggleApproval = async (id: string, currentStatus: boolean) => {
        if (!token) return;
        try {
            const res = await fetch(`/api/admin/reviews/${id}`, {
                method: "PUT",
                headers: { 
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ approved: !currentStatus }), // Matches adminRoutes schema
            });
            if (res.ok) {
                setReviews(prev => prev.map(r => r._id === id ? { ...r, isApproved: !currentStatus } : r));
            }
        } catch (err) { console.error("Toggle failed", err); }
    };

    if (isLoading) return (
        <div className="p-32 text-center font-serif italic text-stone-400 animate-pulse tracking-widest">
            Curating Testimonials...
        </div>
    );

    return (
        <div className="space-y-6">
            <header className="flex justify-between items-end px-2">
                <div>
                    <h2 className="text-2xl font-serif text-stone-900 italic">Testimonial Moderation</h2>
                    <p className="text-sm text-stone-500 font-light">Managing the public voice of the Luxarist brand.</p>
                </div>
                <div className="bg-white border border-stone-100 px-6 py-3 rounded-2xl shadow-sm border-b-2 border-b-stone-900/5">
                    <p className="text-[10px] text-stone-400 uppercase tracking-widest font-bold">
                        Archive: {reviews.length} Submissions
                    </p>
                </div>
            </header>

            <div className="bg-white border border-stone-100 rounded-[2.5rem] overflow-hidden shadow-xl shadow-stone-200/20">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-stone-50 bg-stone-50/30">
                            {["Customer", "Product", "Rating", "Comment", "Status", "Actions"].map((h) => (
                                <th key={h} className="px-8 py-6 text-[9px] uppercase tracking-[0.3em] text-stone-400 font-black">{h}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-50">
                        {reviews.length > 0 ? (
                            reviews.map((review) => (
                                <ReviewRow 
                                    key={review._id} 
                                    review={review} 
                                    onToggle={handleToggleApproval} 
                                />
                            ))
                        ) : (
                            <tr>
                                <td colSpan={6} className="px-8 py-20 text-center text-stone-400 font-serif italic">
                                    No client feedback has been recorded yet.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}