/**
* @name ShopDropdown
 * @description A toggleable category menu for the desktop navigation bar.
 * Provides a nested link structure for product discovery without page reloads.
 * * @state
 * - `isOpen`: Controls the visibility of the absolute-positioned category list and the trigger's chevron rotation.
 * * @features
 * - **Dynamic Injection**: Maps over {@link categories} to ensure the menu stays synced with backend/centralized data.
 * - **Visual Feedback**: Includes a 180-degree chevron rotation and color shifts to indicate active state.
 * - **Route Cleanup**: Automatically invokes `closeDropdown()` upon link selection to maintain a clean UI state.
 * * @styling
 * - **Positioning**: Uses `absolute` with a custom soft-diffusion shadow for a "floating" luxury depth effect.
 * - **Transitions**: Managed via Tailwind `duration-200` for smooth entry/exit of the list items.
*/

import { useState } from "react";
import { Link } from "react-router-dom";
import { categories } from "../../../features/categories/data";

export function ShopDropdown() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen((prev) => !prev);
  const closeDropdown = () => setIsOpen(false);

  return (
    <li className="relative">
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
        <ul className="absolute left-0 mt-4 w-44 bg-white border border-gray-200 shadow-[0_10px_25px_-5px_rgba(0,0,0,0.1)] py-3 z-50">
          {categories.map(([label, slug]) => (
            <li key={slug}>
              <Link
                to={`/collections/${slug}`}
                className="block px-6 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-black transition-all duration-200 ease-in-out"
                onClick={closeDropdown}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}