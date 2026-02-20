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
import { Link } from "react-router-dom";
import { categories } from "../../../features/categories/data";

export function MobileNav() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const toggleMobile = () => setIsMobileOpen((prev) => !prev);
  const closeMobile = () => setIsMobileOpen(false);

  return (
    <div className="md:hidden relative">
      {/* Hamburger Button */}
      <button onClick={toggleMobile} aria-label="Toggle Menu">
        <img
          src="/assets/icons/icon-hamburger.svg"
          alt="hamburger"
          className="h-7 w-7"
        />
      </button>

      {/* Slide-Out Drawer */}
      {isMobileOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/30 z-40"
            onClick={closeMobile}
          />

          {/* Drawer */}
          <div className="fixed top-0 left-0 w-64 h-full bg-white shadow-lg z-50 flex flex-col">
            {/* Drawer Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <span className="font-medium">Menu</span>

              <button onClick={closeMobile} aria-label="Close menu">
                <img
                  src="/assets/icons/icon-close.svg"
                  alt="close"
                  className="h-6 w-6 cursor-pointer"
                />
              </button>
            </div>

            {/* Nav Links */}
            <ul className="mt-6 flex flex-col gap-6 px-6 flex-1">
              <li>
                <Link to="/" onClick={closeMobile}>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/collections" onClick={closeMobile}>
                  Collections
                </Link>
              </li>
              <li>
                <span className="font-medium">Shop</span>
                <ul className="mt-2 ml-4 flex flex-col gap-2">
                  {categories.map(([label, slug]) => (
                    <li key={slug}>
                      <Link to={`/collections/${slug}`} onClick={closeMobile}>
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>

            {/* Profile at bottom */}
            <div className="px-6 py-6 border-t border-gray-200">
              <button
                aria-label="Open profile"
                className="flex items-center gap-2"
              >
                <img
                  src="/assets/icons/icon-profile.svg"
                  alt="profile"
                  className="h-5 w-5"
                />
                <span>Profile</span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}