import { Package, ShoppingBag, LayoutGrid, User } from "lucide-react";
import { useAdminMetrics } from "../hooks/useAdminMetrics";

export default function MetricsCard() {
  const { data, isLoading } = useAdminMetrics();

  if (isLoading || !data) return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 animate-pulse">
        {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-40 bg-stone-50 border border-stone-100 rounded-2xl" />
        ))}
    </div>
  );

  const stats = [
    { label: "Total Products", value: data.totalProducts, icon: <Package size={16} /> },
    { label: "Active Items", value: data.activeProducts, icon: <LayoutGrid size={16} /> },
    { label: "Total Orders", value: data.totalOrders, icon: <ShoppingBag size={16} /> },
    { label: "Customers", value: data.totalCustomers, icon: <User size={16} /> },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <div 
          key={index} 
          className="group relative p-6 bg-white border border-stone-100 rounded-2xl shadow-sm hover:shadow-lg hover:border-stone-200 transition-all duration-500 flex flex-col justify-between min-h-40"
        >
          <div className="p-2 bg-stone-50 rounded-xl text-stone-400 group-hover:bg-stone-900 group-hover:text-white transition-colors duration-500 shrink-0 w-fit">
            {stat.icon}
          </div>

          <div className="mt-6">
            <p className="text-3xl md:text-4xl font-light text-stone-900 tracking-tight leading-none">
              {stat.value.toLocaleString()}
            </p>
            <p className="text-[9px] text-stone-400 uppercase tracking-[0.2em] font-bold mt-2 leading-tight">
              {stat.label}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}