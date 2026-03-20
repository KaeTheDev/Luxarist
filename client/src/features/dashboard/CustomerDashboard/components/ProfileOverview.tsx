import { Package, Star, Calendar, ArrowUpRight } from "lucide-react";
 
export default function ProfileOverview() {
    const userStats = [
        { label: "Total Orders", value: "12", icon: <Package size={16} className="text-stone-400" /> },
        { label: "My Reviews", value: "5", icon: <Star size={16} className="text-stone-400" /> },
        { label: "Member Since", value: "Mar 2024", icon: <Calendar size={16} className="text-stone-400" /> },
    ];
 
    return (
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            {/* Welcome Header */}
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
                        Welcome back, <span className="italic">Shakira</span>
                    </h1>
                    <p className="text-stone-500 text-xs tracking-widest uppercase mt-2 opacity-70">
                        Your Personal Collection & Activity
                    </p>
                </div>
            </header>
 
            {/* Stat Grid */}
            <section className="grid grid-cols-3 gap-3 md:gap-4">
                {userStats.map((stat, index) => (
                    <div
                        key={index}
                        className="group relative p-3 md:p-5 bg-white border border-stone-100 rounded-2xl shadow-sm hover:shadow-lg hover:border-stone-200 transition-all duration-500 flex flex-col justify-between min-w-0"
                    >
                        <div className="flex justify-between items-start w-full">
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
 
            {/* Activity Feed Section */}
            <section className="space-y-8">
                <div className="flex justify-between items-center border-b border-stone-100 pb-6">
                    <h2 className="text-sm uppercase tracking-[0.3em] font-black text-stone-900">
                        Live Timeline
                    </h2>
                    <button className="text-[10px] text-stone-400 hover:text-stone-900 transition-colors uppercase tracking-widest font-bold">
                        View Full History
                    </button>
                </div>
 
                <div className="bg-stone-50/30 rounded-[2.5rem] p-16 border border-dashed border-stone-200 flex flex-col items-center justify-center text-center">
                    <div className="w-12 h-12 rounded-full border border-stone-200 flex items-center justify-center mb-4">
                        <div className="w-2 h-2 bg-stone-200 rounded-full animate-pulse" />
                    </div>
                    <p className="text-stone-400 italic text-sm max-w-xs leading-relaxed">
                        Your bespoke timeline is being curated based on your latest acquisitions.
                    </p>
                </div>
            </section>
        </div>
    );
}