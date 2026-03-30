/**
 * @name ShopDropdown
 * @description A toggleable category menu for the desktop navigation bar.
 * Provides a nested link structure for product discovery without page reloads.
 *
 * @state
 * - `isOpen`: Controls the visibility of the absolute-positioned category list
 *   and the trigger's chevron rotation.
 *
 * @features
 * - **Outside Click**: Uses useClickOutside to close the dropdown when the user
 *   clicks anywhere outside the component — the ref wraps both the trigger
 *   button and the menu so neither interferes with the other.
 * - **Dynamic Injection**: Maps over categories to ensure the menu stays synced
 *   with centralized data.
 * - **Visual Feedback**: Includes a 180-degree chevron rotation and color shifts
 *   to indicate active state.
 * - **Route Cleanup**: Automatically invokes closeDropdown() upon link selection
 *   to maintain a clean UI state.
 *
 * @styling
 * - **Positioning**: Uses `absolute` with a custom soft-diffusion shadow for a
 *   "floating" luxury depth effect.
 * - **Transitions**: Managed via Tailwind `duration-200` for smooth entry/exit.
 */

import { useState, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useAllCategories } from "../../../hooks/useAllCategories";
import { useClickOutside } from "../../../hooks/useClickOutside";
 
const MAX_NAV_CATEGORIES = 5;
 
export function ShopDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLLIElement>(null);
  const { categories, loading } = useAllCategories();
 
  const closeDropdown = useCallback(() => setIsOpen(false), []);
  const toggleDropdown = () => setIsOpen((prev) => !prev);
 
  useClickOutside(containerRef, closeDropdown);
 
  const visibleCategories = categories.slice(0, MAX_NAV_CATEGORIES);
  const hasMore = categories.length > MAX_NAV_CATEGORIES;
 
  return (
    <li ref={containerRef} className="relative">
 
      {/* TRIGGER */}
      <button
        onClick={toggleDropdown}
        className={`flex items-center cursor-pointer transition-colors ${
          isOpen ? "text-gray-400" : "hover:text-gray-500"
        }`}
      >
        Shop
        <svg
          className={`w-4 h-4 ml-1 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.08 1.04l-4.25 4.25a.75.75 0 01-1.06 0L5.21 8.27a.75.75 0 01.02-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </button>
 
      {/* MENU */}
      {isOpen && (
        <ul className="absolute left-0 mt-4 w-52 bg-white border border-gray-200 shadow-[0_10px_25px_-5px_rgba(0,0,0,0.1)] py-3 z-50">
 
          {/* Loading state */}
          {loading && (
            <li className="flex items-center justify-center py-4">
              <Loader2 size={14} className="animate-spin text-gray-300" />
            </li>
          )}
 
          {/* Category links — capped at MAX_NAV_CATEGORIES */}
          {!loading && visibleCategories.map((category) => (
            <li key={category._id}>
              <Link
                to={`/collections/${category.slug}`}
                className="block px-6 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-black transition-all duration-200"
                onClick={closeDropdown}
              >
                {category.name}
              </Link>
            </li>
          ))}
 
          {/* View All — only shown when there are more than 5 categories */}
          {!loading && hasMore && (
            <>
              <li className="mx-6 my-2 border-t border-gray-100" />
              <li>
                <Link
                  to="/collections"
                  className="block px-6 py-2 text-sm font-semibold text-black hover:bg-gray-50 transition-all duration-200"
                  onClick={closeDropdown}
                >
                  View All Collections →
                </Link>
              </li>
            </>
          )}
 
          {/* Always show View All when not loading and we have categories */}
          {!loading && !hasMore && categories.length > 0 && (
            <>
              <li className="mx-6 my-2 border-t border-gray-100" />
              <li>
                <Link
                  to="/collections"
                  className="block px-6 py-2 text-sm text-gray-400 hover:bg-gray-50 hover:text-black transition-all duration-200"
                  onClick={closeDropdown}
                >
                  View All →
                </Link>
              </li>
            </>
          )}
        </ul>
      )}
 
    </li>
  );
}