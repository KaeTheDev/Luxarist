import { Package, Star, Calendar, ArrowUpRight } from "lucide-react";
import { useAuth } from "../../../../../context/AuthContext";
import { useDashboardStats } from "../../hooks/useDashboardStats";

/**
 * Helper to transform ISO date to 'Month YYYY' format
 * Matches the Luxarist minimalist aesthetic.
 */
function formatMemberSince(iso: string) {
    if (!iso) return "—";
    return new Date(iso).toLocaleDateString("en-US", { 
        month: "short", 
        year: "numeric" 
    });
}

export default function CollectionOverview() {
    const { user } = useAuth();
    const { stats, loading } = useDashboardStats();

    // Mapping our stats to the high-end card UI
    const userStats = [
        { 
            label: "Total Orders", 
            value: loading ? "—" : String(stats?.totalOrders ?? 0), 
            icon: <Package size={16} className="text-stone-400" /> 
        },
        { 
            label: "My Reviews", 
            value: loading ? "—" : String(stats?.totalReviews ?? 0), 
            icon: <Star size={16} className="text-stone-400" /> 
        },
        { 
            label: "Member Since", 
            value: loading ? "—" : (stats?.memberSince ? formatMemberSince(stats.memberSince) : "—"), 
            icon: <Calendar size={16} className="text-stone-400" /> 
        },
    ];

    return (
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            
            {/* --- 1. WELCOME HEADER --- */}
            <header className="flex flex-col gap-2">
                <div className="hidden md:block">
                    <div className="flex items-center gap-3 mb-3">
                        <span className="h-px w-12 bg-stone-900"></span>
                        <p className="text-[10px] uppercase tracking-[0.4em] text-stone-400 font-black">
                            Executive Summary
                        </p>
                    </div>
                    <h1 className="text-5xl font-serif text-stone-900 italic tracking-tight">
                        Collection <span className="text-stone-300">&</span> Metrics
                    </h1>
                </div>

                <div className="md:hidden">
                    <h1 className="text-3xl font-serif text-stone-900 tracking-tight">
                        Welcome back, <span className="italic">{user?.firstName ?? "..."}</span>
                    </h1>
                    <p className="text-stone-50 text-xs tracking-widest uppercase mt-2 opacity-70">
                        Your Personal Collection & Activity
                    </p>
                </div>
            </header>

            {/* --- 2. STAT GRID --- */}
            <section className="grid grid-cols-3 gap-3 md:gap-4">
                {userStats.map((stat, index) => (
                    <div
                        key={index}
                        className="group relative p-3 md:p-5 bg-white border border-stone-100 rounded-2xl shadow-sm hover:shadow-lg hover:border-stone-200 transition-all duration-500 flex flex-col justify-between min-w-0"
                    >
                        <div className="flex justify-between items-start w-full">
                            {/* Icon box swaps color on hover for responsiveness */}
                            <div className="p-2 bg-stone-50 rounded-xl text-stone-400 group-hover:bg-stone-900 group-hover:text-white transition-colors duration-500 shrink-0">
                                {stat.icon}
                            </div>
                            <ArrowUpRight size={12} className="text-stone-200 group-hover:text-stone-900 transition-colors shrink-0" />
                        </div>

                        <div className="mt-3">
                            <p className="text-xl md:text-2xl lg:text-3xl font-light text-stone-900 tracking-tight leading-none truncate">
                                {stat.value}
                            </p>
                            <p className="text-[8px] md:text-[9px] text-stone-400 uppercase tracking-widest md:tracking-[0.15em] font-bold mt-1.5 leading-tight">
                                {stat.label}
                            </p>
                        </div>
                    </div>
                ))}
            </section>

            {/* --- 3. ACTIVITY FEED SECTION --- */}
            <section className="space-y-8">
    <div className="flex justify-between items-center border-b border-stone-100 pb-6">
        <h2 className="text-sm uppercase tracking-[0.3em] font-black text-stone-900">Live Timeline</h2>
        <button className="text-[10px] text-stone-400 hover:text-stone-900 transition-colors uppercase tracking-widest font-bold">View Full History</button>
    </div>

    <div className="relative ml-4 space-y-10">
        {/* The Vertical Line */}
        <div className="absolute left-0 top-2 bottom-2 w-px bg-stone-100" />

        {loading ? (
            <p className="text-stone-300 italic text-xs ml-8">Curating timeline...</p>
        ) : stats?.timeline.map((event) => (
            <div key={event.id} className="relative ml-8 group">
                {/* The Dot */}
                <div className="absolute -left-9 top-1.5 w-2 h-2 rounded-full bg-white border-2 border-stone-200 group-hover:border-stone-900 transition-colors" />
                
                <div className="flex flex-col gap-1">
                    <p className="text-[8px] uppercase tracking-[0.2em] text-stone-400 font-bold">
                        {new Date(event.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}
                    </p>
                    <p className="text-sm font-serif italic text-stone-900 group-hover:text-stone-500 transition-colors">
                        {event.message}
                    </p>
                </div>
            </div>
        ))}
    </div>
</section>
        </div>
    );
}