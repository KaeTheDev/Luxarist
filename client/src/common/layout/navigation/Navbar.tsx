/**
 * Component: Navbar.tsx
 * Purpose:
 * Global navigation header for the Luxarist storefront.
 * * Features:
 * - Sticky-ready layout with shop category dropdown.
 * - Dynamic category mapping from centralized data.
 * - Cart and Profile action triggers.
 */

import { Link } from "react-router-dom";
import { ShopDropdown } from "./ShopDropdown";

export function Navbar() {
  return (
    <header className="bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <Link to="/" className="shrink-0">
          <img
            src="/assets/logos/LuxaristLogo.png"
            alt="Luxarist Logo"
            className="h-10 w-auto"
          />
        </Link>

        <nav>
          <ul className="flex items-center gap-10 text-gray-900 font-medium tracking-tight">
            <li>
              <Link to="/" className="hover:text-gray-500 transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/collections"
                className="hover:text-gray-500 transition-colors"
              >
                Collections
              </Link>
            </li>
            <ShopDropdown />
          </ul>
        </nav>

        {/* ACTIONS */}
        <div className="flex items-center gap-6">
          <button
            aria-label="Toggle cart"
            className="hover:opacity-70 transition-opacity"
          >
            <img
              src="/assets/icons/icon-cart.svg"
              alt="cart"
              className="h-5 w-5"
            />
          </button>
          <button
            aria-label="Open profile"
            className="hover:opacity-70 transition-opacity"
          >
            <img
              src="/assets/icons/icon-profile.svg"
              alt="profile"
              className="h-5 w-5"
            />
          </button>
        </div>
      </div>
    </header>
  );
}