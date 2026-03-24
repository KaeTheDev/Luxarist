import { useState } from "react";
import { Menu, X } from "lucide-react";
import MetricsCard from "./components/metrics/MetricsCard";
import OrdersTable from "./components/orders/OrdersTable";
import ReviewsTable from "./components/reviews/ReviewsTable";
import AdminProducts from "./components/products/AdminProducts";
import AdminSidebar from "./components/layout/AdminSidebar";
import { useAuth } from "../../../context/AuthContext";
import type { AdminTab } from "../shared/types";

export default function AdminDashboardPage() {
    const [activeTab, setActiveTab] = useState<AdminTab>("overview");
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const { user } = useAuth();

    return (
        <div className="flex min-h-screen bg-[#fafaf9] text-stone-900 font-sans">
          {/* Admin Sidebar Component */}
          <AdminSidebar 
            activeTab={activeTab} 
            setActiveTab={setActiveTab} 
            user={user} 
          />
    
          {/* Mobile Overlay (Optional but recommended) */}
          {isSidebarOpen && (
            <div className="fixed inset-0 bg-stone-900/20 backdrop-blur-sm z-30 lg:hidden" onClick={() => setIsSidebarOpen(false)} />
          )}

          {/* Mobile Navigation Toggle */}
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="lg:hidden fixed bottom-6 right-6 z-50 p-4 bg-stone-900 text-white rounded-full shadow-2xl"
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
    
          {/* Main Content Area */}
          <main className="flex-1 p-6 lg:p-16 max-w-7xl mx-auto w-full">
            <header className="mb-12 flex justify-between items-end">
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-stone-400 font-bold mb-2">Management</p>
                <h1 className="text-4xl font-black tracking-tighter text-stone-900 capitalize">{activeTab}</h1>
              </div>
              <div className="text-right hidden sm:block">
                <p className="text-[10px] uppercase tracking-widest text-stone-300 font-bold">Detroit, MI</p>
                <p className="text-xs font-serif italic text-stone-500">
                  {new Date().toLocaleDateString(undefined, { month: 'long', day: 'numeric' })}
                </p>
              </div>
            </header>
    
            <section className="animate-in fade-in slide-in-from-bottom-4 duration-700">
              {activeTab === "overview" && <MetricsCard />}
              {activeTab === "orders" && <OrdersTable />}
              {activeTab === "reviews" && <ReviewsTable />}
              {activeTab === "products" && <AdminProducts />}
            </section>
          </main>
        </div>
    );
}