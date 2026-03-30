/**
 * @name Navbar
 * @description The primary navigation header for the Luxarist storefront.
 * Acts as a functional shell that orchestrates responsive navigation and global user actions.
 *
 * @features
 * - Responsive Switching: Toggles between MobileNav and DesktopNav based on screen breakpoints.
 * - Brand Identity: Displays the centralized Luxarist logo with a fixed-center mobile layout.
 * - Cart Badge: Shows a live item count from CartContext on the cart icon.
 * - Action Hooks: Provides entry points for the Cart and Profile management systems.
 *
 * @layout
 * - Uses a sticky-ready flexbox container with a max-width of 7xl for consistent alignment.
 */

import { Link } from "react-router-dom";
import { DesktopNav } from "./DesktopNav";
import { MobileNav } from "./MobileNav";
import { useAuth } from "../../../context/AuthContext";
import { useCart } from "../../../context/CartContext";

interface NavbarProps {
  onOpenAuth: () => void;
}

export function Navbar({ onOpenAuth }: NavbarProps) {
  const { user, isAuthenticated, isLoading } = useAuth();
  const { cartCount } = useCart();
 
  const dashboardPath = user?.role === "admin" ? "/admin" : "/dashboard";
 
  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4 relative">
 
        {/* LEFT */}
        <div className="flex items-center md:flex-1">
          <div className="md:hidden">
            <MobileNav onOpenAuth={onOpenAuth} />
          </div>
          <Link to="/" className="absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0">
            <img
              src="/assets/logos/LuxaristLogo.png"
              alt="Luxarist Logo"
              className="h-10 w-auto"
            />
          </Link>
        </div>
 
        {/* CENTER (desktop only) */}
        <div className="hidden md:flex justify-center flex-1">
          <DesktopNav />
        </div>
 
        {/* RIGHT */}
        <div className="flex items-center gap-6 md:flex-1 justify-end">
 
          {/* Cart — badge shows live count from CartContext */}
          <button className="relative flex items-center hover:opacity-60 transition-opacity">
            <img
              src="/assets/icons/icon-cart.svg"
              alt="cart"
              className="h-5 w-5"
            />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 min-w-4.5 h-4.5 flex items-center justify-center bg-black text-white text-[9px] font-black rounded-full px-1">
                {cartCount > 99 ? "99+" : cartCount}
              </span>
            )}
          </button>
 
          {/* Profile */}
          <div className="flex items-center gap-4 min-w-8">
            {isLoading ? (
              <div className="h-5.5 w-5.5 bg-stone-100 animate-pulse rounded-full" />
            ) : isAuthenticated ? (
              <Link
                to={dashboardPath}
                className="flex items-center hover:opacity-60 transition-opacity group relative"
              >
                <img
                  src="/assets/icons/icon-profile.svg"
                  alt="profile"
                  className="h-5.5 w-5.5 brightness-50"
                />
                {user?.role === "admin" && (
                  <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-stone-900 rounded-full border border-white" />
                )}
              </Link>
            ) : (
              <button
                onClick={onOpenAuth}
                className="flex items-center hover:opacity-60 transition-opacity"
              >
                <img
                  src="/assets/icons/icon-profile.svg"
                  alt="profile"
                  className="h-5.5 w-5.5"
                />
              </button>
            )}
          </div>
 
        </div>
      </div>
    </header>
  );
}