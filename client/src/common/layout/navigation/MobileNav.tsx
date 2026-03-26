/**
 * @name MobileNav
 * @description A responsive slide-out navigation drawer for the Luxarist storefront.
 * Focused strictly on shopping discovery and authentication entry points.
 */

import { useState } from "react";
import { Link } from "react-router-dom";
import { categories } from "../../constants/data";
import { useAuth } from "../../../context/AuthContext";

interface MobileNavProps {
  onOpenAuth: () => void;
}

export function MobileNav({ onOpenAuth }: MobileNavProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { user } = useAuth(); // Access auth to determine if "Sign In" shows

  const toggleMobile = () => setIsMobileOpen((prev) => !prev);
  const closeMobile = () => setIsMobileOpen(false);

  const handleAuthClick = () => {
    closeMobile();
    onOpenAuth();
  };

  return (
    <div className="md:hidden relative">
      {/* --- MENU TRIGGER --- */}
      <button 
        onClick={toggleMobile} 
        aria-label="Toggle Menu" 
        className="hover:opacity-60 transition-all duration-300"
      >
        <img 
          src="/assets/icons/icon-hamburger.svg" 
          alt="hamburger" 
          className="h-7 w-7" 
        />
      </button>

      {isMobileOpen && (
        <>
          {/* --- BACKDROP --- */}
          <div 
            className="fixed inset-0 bg-stone-900/10 z-40 backdrop-blur-sm animate-in fade-in duration-300" 
            onClick={closeMobile} 
          />

          {/* --- DRAWER PANEL --- */}
          <div className="fixed top-0 left-0 w-72 h-full bg-white shadow-2xl z-50 flex flex-col animate-in slide-in-from-left duration-500 ease-out">
            
            {/* Header Area & Concierge Utility */}
            <div className="flex flex-col border-b border-stone-50">
              <div className="flex items-center justify-between px-8 pt-8 pb-4">
                <span className="font-serif italic text-xl tracking-tight text-stone-900">Menu</span>
                <button 
                  onClick={closeMobile} 
                  aria-label="Close menu" 
                  className="p-1 hover:rotate-90 transition-transform duration-300"
                >
                  <img 
                    src="/assets/icons/icon-close.svg" 
                    alt="close" 
                    className="h-4 w-4 opacity-30" 
                  />
                </button>
              </div>

              {/* AUTH TRIGGER: Sub-header style (The "Concierge" Desk) */}
              {!user && (
                <button 
                  onClick={handleAuthClick}
                  className="px-8 pb-8 text-[9px] uppercase tracking-[0.3em] font-bold text-stone-400 hover:text-stone-900 text-left transition-colors"
                >
                  Account / Sign In
                </button>
              )}
            </div>

            {/* Main Navigation Discovery */}
            <nav className="flex-1 overflow-y-auto py-10 px-8">
              <ul className="flex flex-col gap-10 text-[11px] tracking-[0.3em] uppercase font-bold text-stone-400">
                
                <li>
                  <Link to="/" onClick={closeMobile} className="hover:text-stone-900 transition-colors">
                    Home
                  </Link>
                </li>
                
                <li>
                  <Link to="/collections" onClick={closeMobile} className="hover:text-stone-900 transition-colors">
                    Collections
                  </Link>
                </li>

                {/* Shop Categories Section */}
                <li className="space-y-8 pt-4">
                  <span className="text-stone-900 block font-black border-b border-stone-50 pb-2">
                    Shop By
                  </span>
                  <ul className="ml-4 flex flex-col gap-6 text-[11px] lowercase italic font-medium text-stone-400 border-l border-stone-100 pl-8">
                    {categories.map(([label, slug]) => (
                      <li key={slug}>
                        <Link 
                          to={`/collections/${slug}`} 
                          onClick={closeMobile} 
                          className="hover:text-stone-900 transition-colors block py-1"
                        >
                          {label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              </ul>
            </nav>

            {/* Footer Branding */}
            <div className="px-8 py-8 border-t border-stone-50 bg-stone-50/20 mt-auto">
              <p className="text-[9px] uppercase tracking-[0.5em] text-stone-300 font-black">
                Luxarist &copy; 2026
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}