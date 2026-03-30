/**
 * @name MobileNav
 * @description A responsive slide-out navigation drawer for the Luxarist storefront.
 * Focused strictly on shopping discovery and authentication entry points.
 *
 * @features
 * - Dynamic Categories: Fetches all categories from the API via useAllCategories
 *   so the drawer stays in sync as categories are added or removed.
 * - Scalability Cap: Shows top 5 categories in the "Shop By" section. When more
 *   than 5 exist, adds a "View All Collections →" link at the bottom of the list.
 */

import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { useAllCategories } from "../../../hooks/useAllCategories";
 
const MAX_NAV_CATEGORIES = 5;
 
interface MobileNavProps {
  onOpenAuth: () => void;
}
 
export function MobileNav({ onOpenAuth }: MobileNavProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { user } = useAuth();
  const { categories } = useAllCategories();
 
  const toggleMobile = () => setIsMobileOpen((prev) => !prev);
  const closeMobile = () => setIsMobileOpen(false);
 
  const handleAuthClick = () => {
    closeMobile();
    onOpenAuth();
  };
 
  const visibleCategories = categories.slice(0, MAX_NAV_CATEGORIES);
  const hasMore = categories.length > MAX_NAV_CATEGORIES;
 
  return (
    <div className="md:hidden relative">
 
      {/* TRIGGER */}
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
          {/* BACKDROP */}
          <div
            className="fixed inset-0 bg-stone-900/10 z-40 backdrop-blur-sm animate-in fade-in duration-300"
            onClick={closeMobile}
          />
 
          {/* DRAWER */}
          <div className="fixed top-0 left-0 w-72 h-full bg-white shadow-2xl z-50 flex flex-col animate-in slide-in-from-left duration-500 ease-out">
 
            {/* Header */}
            <div className="flex flex-col border-b border-stone-50">
              <div className="flex items-center justify-between px-8 pt-8 pb-4">
                <span className="font-serif italic text-xl tracking-tight text-stone-900">
                  Menu
                </span>
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
 
              {!user && (
                <button
                  onClick={handleAuthClick}
                  className="px-8 pb-8 text-[9px] uppercase tracking-[0.3em] font-bold text-stone-400 hover:text-stone-900 text-left transition-colors"
                >
                  Account / Sign In
                </button>
              )}
            </div>
 
            {/* Navigation */}
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
 
                {/* Shop By — dynamic categories capped at 5 */}
                {visibleCategories.length > 0 && (
                  <li className="space-y-8 pt-4">
                    <span className="text-stone-900 block font-black border-b border-stone-50 pb-2">
                      Shop By
                    </span>
                    <ul className="ml-4 flex flex-col gap-6 text-[11px] lowercase italic font-medium text-stone-400 border-l border-stone-100 pl-8">
                      {visibleCategories.map((category) => (
                        <li key={category._id}>
                          <Link
                            to={`/collections/${category.slug}`}
                            onClick={closeMobile}
                            className="hover:text-stone-900 transition-colors block py-1"
                          >
                            {category.name}
                          </Link>
                        </li>
                      ))}
 
                      {/* View All — only shown when >5 categories exist */}
                      {hasMore && (
                        <li>
                          <Link
                            to="/collections"
                            onClick={closeMobile}
                            className="hover:text-stone-900 transition-colors block py-1 font-bold not-italic text-stone-600"
                          >
                            View All →
                          </Link>
                        </li>
                      )}
                    </ul>
                  </li>
                )}
 
              </ul>
            </nav>
 
            {/* Footer */}
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