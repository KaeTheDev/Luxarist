import { Package, Star, Calendar } from "lucide-react";

export default function ProfileOverview() {
    // Static data for now; later this info will be pass in from the Auth context/API
    const userStats = [
        { label: "Total Orders", value: "12", icon: <Package size={20} className="text-stone-400" /> },
        { label: "My Reviews", value: "5", icon: <Star size={20} className="text-stone-400" /> },
        { label: "Member Since", value: "Mar 2024", icon: <Calendar size={20} className="text-stone-400" /> },
    ];

    return (
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            {/* Welcome Header */}
            <header className="space-y-2">
                <h1 className="text-3xl md:text-4xl font-serif text-stone-900 tracking-tight">
                    Welcome back, <span className="italic">Shakira</span>
                </h1>
                <p className="text-stone-500 text-sm tracking-wide uppercase">Your Personal Collection & Activity</p>
            </header>

            {/* Stat Grid */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {userStats.map((stat, index) => (
                             <div 
                             key={index} 
                             className="p-8 bg-white border border-stone-100 rounded-3xl shadow-sm hover:shadow-md transition-shadow duration-500 flex flex-col items-center text-center space-y-4"
                           >
                             <div className="p-3 bg-stone-50 rounded-full">
                               {stat.icon}
                             </div>
                             <div>
                               <p className="text-2xl font-semibold text-stone-900">{stat.value}</p>
                               <p className="text-xs text-stone-400 uppercase tracking-widest mt-1">
                                 {stat.label}
                               </p>
                             </div>
                           </div>
                ))}
            </section>
            {/* Recent Activity Preview (Placeholder for now) */}
            <section className="space-y-6">
              <div className="flex justify-between items-end border-b border-stone-100 pb-4">
                <h2 className="text-xl font-medium text-stone-800">Recent Activity</h2>
                <button className="text-sm text-stone-400 hover:text-stone-900 transition-colors uppercase tracking-widest">
                  View All
                </button>
              </div>

              <div className="bg-stone-50/50 rounded-3xl p-12 border border-dashed border-stone-200 flex flex-col items-center justify-center text-stone-400 italic">
              <p>Your latest updates will appear here as you shop and share your thoughts.</p>
              </div>
            </section>
        </div>
    );
}