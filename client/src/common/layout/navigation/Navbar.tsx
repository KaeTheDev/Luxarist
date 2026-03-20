/**
 * @name Navbar
 * @description The primary navigation header for the Luxarist storefront. 
 * Acts as a functional shell that orchestrates responsive navigation and global user actions.
 * * @features
 * - **Responsive Switching**: Toggles between {@link MobileNav} and {@link DesktopNav} based on screen breakpoints.
 * - **Brand Identity**: Displays the centralized Luxarist logo with a fixed-center mobile layout.
 * - **Action Hooks**: Provides entry points for the Cart and Profile management systems.
 * * @layout
 * - Uses a sticky-ready flexbox container with a max-width of 7xl for consistent alignment.
 */

import { Link } from "react-router-dom";
import { DesktopNav } from "./DesktopNav";
import { MobileNav } from "./MobileNav";
import { useAuth } from "../../../context/AuthContext";

interface NavbarProps {
  onOpenAuth: () => void;
}

export function Navbar({ onOpenAuth }: NavbarProps) {
  const { user } = useAuth(); // Access global auth state

  return (
    <header className="bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4 relative">

        {/* LEFT */}
        <div className="flex items-center md:flex-1">
          {/* Hamburger (mobile only) */}
          <div className="md:hidden">
            <MobileNav onOpenAuth={onOpenAuth} />
          </div>

          {/* Logo */}
          <Link to="/" className="absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0">
            <img
              src="/assets/logos/LuxaristLogo.png"
              alt="Luxarist Logo"
              className="h-13 w-auto"
            />
          </Link>
        </div>

        {/* CENTER (desktop only) */}
        <div className="hidden md:flex justify-center flex-1">
          <DesktopNav />
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-6 md:flex-1 justify-end">
          {/* Cart */}
          <button className="flex items-center">
            <img
              src="/assets/icons/icon-cart.svg"
              alt="cart"
              className="h-5 w-5"
            />
          </button>

          {/* Profile (desktop only) */}
          <div className="hidden md:flex items-center gap-4">
            <button 
              onClick={user ? undefined : onOpenAuth} // Only open modal if logged out
              className="flex items-center hover:opacity-60 transition-opacity"
            >
              <Link to={user ? "/dashboard" : "#"}>
                <img
                  src="/assets/icons/icon-profile.svg"
                  alt="profile"
                  className={`h-5.5 w-5.5 ${user ? 'brightness-50' : ''}`} 
                />
              </Link>
            </button>

          </div>
        </div>

      </div>
    </header>
  );
}