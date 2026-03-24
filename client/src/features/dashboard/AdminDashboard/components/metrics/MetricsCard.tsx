import { useState, useEffect } from "react";
import { Package, ShoppingBag, Star, LayoutGrid, User } from "lucide-react";
import type { DashboardData } from "../../../shared/types";

export default function MetricsCard() {
    const [data, setData] = useState<DashboardData | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchMetrics() {
            try {
                const res = await fetch("/api/admin/metrics");
                if(res.ok) setData(await res.json());
            } catch(err) { console.error("Metrics fetch failed", err); }
            finally { setIsLoading(false); }
        }
        fetchMetrics();
    }, []);

    if (isLoading || !data) return <div className="p-20 text-center animate-pulse text-stone-400 italic">Syncing Ledger...</div>;

    const stats = [
        { label: "Total Products", value: data.totalProducts, icon: Package },
        { label: "Active Items", value: data.activeProducts, icon: LayoutGrid },
        { label: "Total Orders", value: data.totalOrders, icon: ShoppingBag },
        { label: "Customers", value: data.totalCustomers, icon: User },
      ];

      return (
        <div className="space-y-12">
          {/* 4-Column Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="bg-white border border-stone-100 p-8 rounded-4xl shadow-sm">
                  <div className="p-2 bg-stone-50 rounded-xl w-fit text-stone-400 mb-4">
                    <Icon size={18} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-[10px] uppercase tracking-[0.2em] text-stone-400 font-black mb-1">{stat.label}</h3>
                  <p className="text-3xl font-black text-stone-900 tracking-tighter">{stat.value.toLocaleString()}</p>
                </div>
              );
            })}
          </div>
    
          {/* Recent Activity Mini-List */}
          <div className="bg-white border border-stone-100 rounded-4xl p-8 shadow-sm">
            <h3 className="text-[10px] uppercase tracking-[0.2em] text-stone-400 font-black mb-6">Recent Activity</h3>
            <div className="space-y-6">
              {data.recentActivity.map((item) => (
                <div key={item.id} className="flex justify-between items-center group">
                  <div className="flex gap-4 items-center">
                    <div className={`p-2 rounded-full ${item.type === 'order' ? 'bg-amber-50 text-amber-600' : 'bg-stone-50 text-stone-600'}`}>
                      {item.type === 'order' ? <ShoppingBag size={14} /> : <Star size={14} />}
                    </div>
                    <div>
                      <p className="text-sm font-black text-stone-900 tracking-tight">{item.title}</p>
                      <p className="text-[10px] text-stone-400 font-medium italic">{item.subtitle}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-stone-900">{item.value}</p>
                    <p className="text-[9px] text-stone-300 uppercase font-black">{new Date(item.date).toLocaleDateString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }