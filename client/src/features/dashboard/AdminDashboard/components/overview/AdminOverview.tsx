import MetricsCard from "../metrics/MetricsCard";
import { ShoppingBag, Star } from "lucide-react";
import { useAdminMetrics } from "../hooks/useAdminMetrics";

export default function AdminOverview() {
  const { data, isLoading } = useAdminMetrics();

  return (
    <div className="space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      
      {/* Page Header */}
      <header className="flex flex-col gap-2">
        <div className="flex items-center gap-3 mb-3">
          <span className="h-px w-12 bg-stone-900"></span>
          <p className="text-[10px] uppercase tracking-[0.4em] text-stone-400 font-bold">
            Executive Summary
          </p>
        </div>
        <h1 className="text-5xl font-serif text-stone-900 italic tracking-tight">
          Portfolio <span className="text-stone-300">&</span> Metrics
        </h1>
      </header>

      {/* Stat Grid Section - Calls the reusable MetricsCard */}
      <section>
        <MetricsCard />
      </section>

      {/* Live Activity Feed */}
      <section className="space-y-10">
        <div className="flex justify-between items-center border-b border-stone-100 pb-6">
          <h2 className="text-sm uppercase tracking-[0.3em] font-bold text-stone-900">
            Live Timeline
          </h2>
          <button className="text-[10px] text-stone-400 hover:text-stone-900 transition-colors uppercase tracking-widest font-bold">
            View Full Ledger
          </button>
        </div>

        {/* Loading State or Data List */}
        {isLoading || !data ? (
          <div className="bg-stone-50/30 rounded-[2.5rem] p-16 border border-dashed border-stone-200 flex flex-col items-center justify-center text-center">
            <div className="w-12 h-12 rounded-full border border-stone-200 flex items-center justify-center mb-4">
              <div className="w-2 h-2 bg-stone-200 rounded-full animate-pulse" />
            </div>
            <p className="text-stone-400 italic text-sm font-serif">
              Synchronizing latest activity...
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {data.recentActivity.map((item) => (
              <div key={item.id} className="flex justify-between items-center group px-2">
                <div className="flex gap-6 items-center">
                  <div className="w-10 h-10 rounded-full border border-stone-100 flex items-center justify-center text-stone-400 group-hover:bg-stone-900 group-hover:text-white transition-all duration-500">
                    {item.type === 'order' ? <ShoppingBag size={14} /> : <Star size={14} />}
                  </div>
                  <div>
                    <p className="text-base font-medium text-stone-900 tracking-tight">
                      {item.title}
                    </p>
                    <p className="text-[11px] text-stone-400 font-serif italic mt-0.5">
                      {item.subtitle}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-base font-light text-stone-900 tracking-tight">
                    {item.value}
                  </p>
                  <p className="text-[10px] text-stone-300 font-serif italic mt-1">
                    {new Date(item.date).toLocaleDateString(undefined, { 
                      month: 'short', 
                      day: 'numeric', 
                      year: 'numeric' 
                    })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}