import { useState } from "react";
import { LayoutGrid, ShoppingBag, Star, Package, Settings, Menu, X } from "lucide-react";
import MetricsCard from "./components/metrics/MetricsCard";
import OrdersTable from "./components/orders/OrdersTable";
import ReviewsTable from "./components/reviews/ReviewsTable";
import type { AdminTab } from "../shared/types";

export default function AdminDashboardPage() {
    const [activeTab, setActiveTab] = useState<AdminTab>("overview");
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    

    const navItems = [
        { id: "overview", label: "Overview", icon: LayoutGrid },
        { id: "products", label: "Inventory", icon: Package },
        { id: "orders", label: "Orders", icon: ShoppingBag },
        { id: "reviews", label: "Reviews", icon: Star },
        { id: "settings", label: "Settings", icon: Settings },
    ] as const;

    return (
        <div className="flex min-h-screen bg-[#fafaf9] text-stone-900 font-sans">
          {/* Mobile Toggle */}
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="lg:hidden fixed bottom-6 right-6 z-50 p-4 bg-stone-900 text-white rounded-full shadow-2xl"
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
    
          {/* Sidebar */}
          <aside className={`
            fixed inset-y-0 left-0 z-40 w-72 bg-white border-r border-stone-100 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static
            ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
          `}>
            <div className="p-12">
              <h2 className="text-xs uppercase tracking-[0.4em] font-black text-stone-300 mb-16">Luxarist Admin</h2>
              <nav className="space-y-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => { setActiveTab(item.id); setIsSidebarOpen(true); }}
                      className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all group ${
                        isActive ? "bg-stone-50 text-stone-900 shadow-sm" : "text-stone-400 hover:text-stone-600 hover:bg-stone-50/50"
                      }`}
                    >
                      <Icon size={18} strokeWidth={isActive ? 2 : 1.5} />
                      <span className={`text-[11px] uppercase tracking-widest font-black ${isActive ? "opacity-100" : "opacity-70"}`}>
                        {item.label}
                      </span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </aside>
    
          {/* Main Content Area */}
          <main className="flex-1 p-6 lg:p-16 max-w-7xl mx-auto w-full">
            <header className="mb-12 flex justify-between items-end">
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-stone-400 font-bold mb-2">Management</p>
                <h1 className="text-4xl font-black tracking-tighter text-stone-900 capitalize">{activeTab}</h1>
              </div>
              <div className="text-right hidden sm:block">
                <p className="text-[10px] uppercase tracking-widest text-stone-300 font-bold">Detroit, MI</p>
                <p className="text-xs font-serif italic text-stone-500">{new Date().toLocaleDateString(undefined, { month: 'long', day: 'numeric' })}</p>
              </div>
            </header>
    
            <section className="animate-in fade-in slide-in-from-bottom-4 duration-1000">
              {activeTab === "overview" && <MetricsCard />}
              {activeTab === "orders" && <OrdersTable />}
              {activeTab === "reviews" && <ReviewsTable />}
              {activeTab === "products" && (
                <div className="p-20 border-2 border-dashed border-stone-100 rounded-4xl text-center text-stone-300 italic">
                  Inventory Management Coming Soon
                </div>
              )}
            </section>
          </main>
        </div>
      );
    }