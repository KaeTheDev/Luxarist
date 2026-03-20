/**
 * @name MobileNav
 * @description A responsive slide-out navigation drawer for small viewports (< md).
 * Manages its own visibility state and provides a focused mobile shopping experience.
 * * * @state
 * - `isMobileOpen`: Boolean controlling the visibility of the drawer and the backdrop overlay.
 * * * @features
 * - **Dynamic Mapping**: Iterates through {@link categories} to generate localized shop links.
 * - **UX Safety**: Includes a background overlay that closes the menu on click (outside-click pattern).
 * - **Cleanup**: All navigation links trigger `closeMobile()` to ensure the drawer dismisses after a route change.
 * * * @a11y
 * - Uses `aria-label` on icon-only buttons for screen reader compatibility.
 * - Z-index management (z-40/z-50) ensures the drawer remains above all page content.
 */

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { categories } from "../../constants/data";
import { useAuth } from "../../../context/AuthContext";
import { LogOut, UserCircle, LayoutDashboard, ShoppingBag, MessageSquare, Settings } from "lucide-react";
import type { DashboardTab } from "../../../features/dashboard/shared/types";

interface MobileNavProps {
  onOpenAuth: () => void;
  activeTab?: DashboardTab;
  setActiveTab?: (tab: DashboardTab) => void;
}

export function MobileNav({ onOpenAuth, activeTab, setActiveTab }: MobileNavProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const toggleMobile = () => setIsMobileOpen((prev) => !prev);
  const closeMobile = () => setIsMobileOpen(false);

  const handleTabClick = (tab: DashboardTab) => {
    if (setActiveTab) {
      setActiveTab(tab);
    }
    navigate("/dashboard");
    closeMobile();
  };

  const handleProfileClick = () => {
    closeMobile();
    if (user) {
      navigate("/dashboard");
    } else {
      onOpenAuth();
    }
  };

  const handleLogout = () => {
    logout();
    closeMobile();
  };
  return (
    <div className="md:hidden relative">
      <button onClick={toggleMobile} aria-label="Toggle Menu">
        <img src="/assets/icons/icon-hamburger.svg" alt="hamburger" className="h-7 w-7" />
      </button>

      {isMobileOpen && (
        <>
          <div className="fixed inset-0 bg-black/30 z-40 backdrop-blur-sm" onClick={closeMobile} />

          <div className="fixed top-0 left-0 w-72 h-full bg-white shadow-2xl z-50 flex flex-col animate-in slide-in-from-left duration-500">
            
            <div className="flex items-center justify-between px-8 py-6 border-b border-stone-100">
              <span className="font-serif text-lg tracking-tight text-stone-900">Menu</span>
              <button onClick={closeMobile} aria-label="Close menu">
                <img src="/assets/icons/icon-close.svg" alt="close" className="h-5 w-5 opacity-60" />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto py-8 px-8">
              <ul className="flex flex-col gap-8 text-[11px] tracking-[0.25em] uppercase font-bold text-stone-400">
                <li><Link to="/" onClick={closeMobile} className="hover:text-stone-900 transition-colors">Home</Link></li>
                <li><Link to="/collections" onClick={closeMobile} className="hover:text-stone-900 transition-colors">Collections</Link></li>
                
                <li>
                  <span className="text-stone-900 mb-6 block">Shop</span>
                  <ul className="mt-4 ml-4 flex flex-col gap-5 text-[10px] lowercase italic font-medium text-stone-400 border-l border-stone-100 pl-6">
                    {categories.map(([label, slug]) => (
                      <li key={slug}>
                        <Link to={`/collections/${slug}`} onClick={closeMobile} className="hover:text-stone-900 transition-colors">{label}</Link>
                      </li>
                    ))}
                  </ul>
                </li>

                {/* Dashboard Tabs for Mobile/Tablet accessibility */}
                {user && (
                  <li className="mt-4 pt-8 border-t border-stone-100">
                    <span className="text-stone-900 mb-6 block">Your Collection</span>
                    <ul className="mt-4 ml-4 flex flex-col gap-6 text-[10px] uppercase tracking-widest font-bold text-stone-500">
                      <button 
                        onClick={() => handleTabClick("overview")} 
                        className={`flex items-center gap-3 transition-colors ${activeTab === "overview" ? "text-stone-900" : "hover:text-stone-900"}`}
                      >
                        <LayoutDashboard size={14} /> Overview
                      </button>
                      <button 
                        onClick={() => handleTabClick("orders")} 
                        className={`flex items-center gap-3 transition-colors ${activeTab === "orders" ? "text-stone-900" : "hover:text-stone-900"}`}
                      >
                        <ShoppingBag size={14} /> My Orders
                      </button>
                      <button 
                        onClick={() => handleTabClick("reviews")} 
                        className={`flex items-center gap-3 transition-colors ${activeTab === "reviews" ? "text-stone-900" : "hover:text-stone-900"}`}
                      >
                        <MessageSquare size={14} /> My Reviews
                      </button>
                      <button 
                        onClick={() => handleTabClick("settings")} 
                        className={`flex items-center gap-3 transition-colors ${activeTab === "settings" ? "text-stone-900" : "hover:text-stone-900"}`}
                      >
                        <Settings size={14} /> Settings
                      </button>
                    </ul>
                  </li>
                )}
              </ul>
            </nav>

            <div className="px-8 py-8 border-t border-stone-100 flex items-center justify-between bg-stone-50/50">
              <button
                onClick={handleProfileClick}
                className="flex items-center gap-3 text-stone-900 hover:opacity-60 transition-all text-[10px] tracking-[0.2em] uppercase font-black"
              >
                <UserCircle size={20} strokeWidth={1.5} className="text-stone-400" />
                <span>Account</span>
              </button>

              {user && (
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-stone-400 hover:text-red-500 transition-colors text-[10px] tracking-[0.2em] uppercase font-bold"
                >
                  <LogOut size={16} strokeWidth={2} />
                  <span>Logout</span>
                </button>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}