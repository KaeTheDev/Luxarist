import { useState, useEffect } from "react";
import { useAuth } from "../../../../../context/AuthContext";
import { ReviewRow } from "./ReviewRow";
import { Star, Check, X } from "lucide-react";
import type { Review } from "../../../shared/types";

export default function ReviewsTable() {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const { token } = useAuth();

    const fetchReviews = async () => {
        if (!token) return;
        setIsLoading(true);
        try {
            const res = await fetch("/api/admin/reviews", {
                headers: { "Authorization": `Bearer ${token}` }
            });
            if (res.ok) {
                const data = await res.json();
                setReviews(Array.isArray(data) ? data : []);
            }
        } catch (err) { 
            console.error("Fetch failed", err); 
        } finally { 
            setIsLoading(false); 
        }
    };

    useEffect(() => { fetchReviews(); }, [token]);

    const handleToggleApproval = async (id: string, currentStatus: boolean) => {
        if (!token) return;
        
        const previousReviews = [...reviews];
        setReviews(prev => prev.map(r => r._id === id ? { ...r, approved: !currentStatus } : r));

        try {
            const res = await fetch(`/api/admin/reviews/${id}`, {
                method: "PUT",
                headers: { 
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ approved: !currentStatus }),
            });
            if (!res.ok) throw new Error("Server update failed");
        } catch (err) { 
            console.error("Toggle failed", err);
            setReviews(previousReviews);
        }
    };

    if (isLoading) return (
        <div className="p-32 text-center font-serif italic text-stone-400 animate-pulse tracking-widest uppercase text-[10px]">
            Curating Testimonials...
        </div>
    );

    return (
        <div className="space-y-10 animate-in fade-in duration-700 pb-20">
            {/* Header Section */}
            <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 px-2">
                <div>
                    <h2 className="text-3xl font-serif text-stone-900 italic tracking-tight">Testimonial Moderation</h2>
                    <p className="text-sm text-stone-500 font-light mt-2 max-w-md">
                        Managing the public voice of the Luxarist brand.
                    </p>
                </div>
                <div className="bg-white border border-stone-100 px-8 py-5 rounded-4xl shadow-sm border-b-2 border-b-stone-900/5 shrink-0">
                    <p className="text-[10px] text-stone-400 uppercase tracking-[0.2em] font-black">
                        Archive: {reviews.length} Submissions
                    </p>
                </div>
            </header>

            {/* DESKTOP VIEW: Scrollable Professional Data Grid */}
            <div className="hidden lg:block bg-white border border-stone-100 rounded-[3rem] shadow-xl shadow-stone-200/20 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-275"> 
                        <thead>
                            <tr className="border-b border-stone-50 bg-stone-50/30 text-stone-400 font-black italic">
                                <th className="px-10 py-8 text-[9px] uppercase tracking-[0.4em]">Customer</th>
                                <th className="px-10 py-8 text-[9px] uppercase tracking-[0.4em]">Product</th>
                                <th className="px-10 py-8 text-[9px] uppercase tracking-[0.4em]">Rating</th>
                                <th className="px-10 py-8 text-[9px] uppercase tracking-[0.4em]">Comment</th>
                                <th className="px-10 py-8 text-[9px] uppercase tracking-[0.4em]">Status</th>
                                <th className="pl-10 pr-16 py-8 text-[9px] uppercase tracking-[0.4em] text-right">Actions</th>
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
                                    <td colSpan={6} className="px-10 py-32 text-center text-stone-300 font-serif italic text-lg">
                                        No client feedback has been recorded yet.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* MOBILE/TABLET VIEW: Luxury Moderation Cards */}
            <div className="lg:hidden space-y-4">
                {reviews.length > 0 ? (
                    reviews.map((review: any) => (
                        <div key={review._id} className="bg-white border border-stone-100 p-8 rounded-[2.5rem] shadow-sm space-y-6">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-[10px] text-stone-400 uppercase tracking-widest font-black mb-1">
                                        {review.customerFirstName} {review.customerLastName}
                                    </p>
                                    <h4 className="font-serif italic text-stone-900 text-lg">
                                        {review.products?.[0]?.productName || "Luxury Item"}
                                    </h4>
                                </div>
                                <div className="flex gap-0.5">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} size={12} fill={i < review.rating ? "#1c1917" : "none"} className={i < review.rating ? "text-stone-900" : "text-stone-200"} />
                                    ))}
                                </div>
                            </div>
                            
                            <p className="text-sm text-stone-500 italic leading-relaxed">"{review.comment}"</p>
                            
                            <div className="pt-6 border-t border-stone-50 flex items-center justify-between">
                                <span className={`text-[9px] uppercase tracking-widest font-black px-4 py-2 rounded-full border ${
                                    review.approved ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-rose-50 text-rose-600 border-rose-100"
                                }`}>
                                    {review.approved ? "Public" : "Hidden"}
                                </span>

                                <button 
                                    onClick={() => handleToggleApproval(review._id, review.approved)}
                                    className={`flex items-center gap-2 px-6 py-2 rounded-full text-[10px] uppercase tracking-widest font-black transition-all ${
                                        review.approved ? "bg-stone-900 text-white" : "bg-stone-100 text-stone-900"
                                    }`}
                                >
                                    {review.approved ? <X size={14} /> : <Check size={14} />}
                                    {review.approved ? "Hide" : "Approve"}
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="bg-white border border-stone-100 p-20 rounded-[2.5rem] text-center text-stone-300 font-serif italic">
                        No submissions to display.
                    </div>
                )}
            </div>
        </div>
    );
}