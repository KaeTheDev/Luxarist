import { useState } from "react";
import { useAuth } from "../../../context/AuthContext"; 
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import MyOrders from "./components/MyOrders";
import MyReviews from "./components/MyReviews";
import AccountSettings from "./components/AccountSettings";
import ProfileOverview from "./components/ProfileOverview";
import type { DashboardTab } from "../shared/types"; 

export function CustomerDashboard() {
    const [activeTab, setActiveTab] = useState<DashboardTab>("overview");
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    
    const { user } = useAuth(); 

  return (
    <div className="flex min-h-screen bg-stone-50/50">
      {/* Desktop Sidebar */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          setIsMobileMenuOpen(false); // Close menu on mobile after selection
        }}
        user={user}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header
          activeTab={activeTab}
        />

        <main className="flex-1 p-6 md:p-10 lg:p-16 max-w-7xl mx-auto w-full">
          {/* Dynamic Component Switching */}
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            {activeTab === "overview" && <ProfileOverview />}
            {activeTab === "orders" && <MyOrders />}
            {activeTab === "reviews" && <MyReviews />}
            {activeTab === "settings" && <AccountSettings />}
          </div>
        </main>
      </div>

      {/* Mobile Overlay (Simple Implementation) */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-stone-900/20 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <nav className="fixed top-0 left-0 bottom-0 w-72 bg-white p-8 shadow-2xl">
            <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} user={user} />
          </nav>
        </div>
      )}
    </div>
  );
}