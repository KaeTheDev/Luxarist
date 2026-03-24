import { useState } from "react";
import { Menu, X } from "lucide-react";
import MetricsCard from "./components/metrics/MetricsCard";
import OrdersTable from "./components/orders/OrdersTable";
import ReviewsTable from "./components/reviews/ReviewsTable";
import AdminProducts from "./components/products/AdminProducts";
import AdminSidebar from "./components/layout/AdminSidebar";
import AdminHeader from "./components/layout/AdminHeader";
import { useAuth } from "../../../context/AuthContext";
import type { AdminTab } from "../shared/types";

export default function AdminDashboard() {
    const [activeTab, setActiveTab] = useState<AdminTab>("overview");
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const { user } = useAuth();

    return (
        <div className="flex min-h-screen bg-[#fafaf9] text-stone-900 font-sans">
            {/* Sidebar - Locked to Left */}
          <AdminSidebar 
            activeTab={activeTab} 
            setActiveTab={setActiveTab} 
            user={user} 
          />
    
          {/* Mobile Overlay */}
          {isSidebarOpen && (
            <div 
              className="fixed inset-0 bg-stone-900/10 backdrop-blur-sm z-30 lg:hidden" 
              onClick={() => setIsSidebarOpen(false)} 
            />
          )}

          {/* Main Content Wrapper */}
          <div className="flex-1 flex flex-col min-w-0">
            {/* Sticky Header - Replaces the old inline header */}
            <AdminHeader activeTab={activeTab} />

            {/* Content Area */}
            <main className="flex-1 p-6 lg:p-12 max-w-7xl w-full mx-auto">
              <section className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                {activeTab === "overview" && <MetricsCard />}
                {activeTab === "orders" && <OrdersTable />}
                {activeTab === "reviews" && <ReviewsTable />}
                {activeTab === "products" && <AdminProducts />}
                {activeTab === "settings" && (
                  <div className="p-20 border border-stone-100 bg-white rounded-4xl text-center text-stone-400 italic font-serif">
                    System Configuration Coming Soon
                  </div>
                )}
              </section>
            </main>
          </div>

          {/* Mobile Navigation Toggle */}
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="lg:hidden fixed bottom-6 right-6 z-50 p-4 bg-stone-900 text-white rounded-full shadow-2xl transition-transform active:scale-90"
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
    );
}