/**
 * @name MainLayout
 * @description The root layout component that structures all pages with a consistent
 * navigation bar, main content area, and footer. Owns the cart drawer open state
 * and renders CartDrawer alongside the page content.
 *
 * @composition
 * - Includes Navbar fixed to the top with onOpenCart and onOpenAuth handlers.
 * - Renders CartDrawer controlled by isCartOpen state.
 * - Uses Outlet from react-router-dom to render page-specific content dynamically.
 * - Includes Footer at the bottom for consistent branding and links.
 *
 * @responsibilities
 * - Provide a consistent page structure across all routes.
 * - Own and manage the cart drawer open/close state.
 * - Pass onOpenCart down to Navbar so the cart icon can trigger the drawer.
 */

import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Footer } from "./Footer";
import { Navbar } from "./navigation/Navbar";
import { CartDrawer } from "../../features/cart/components/CartDrawer";

interface MainLayoutProps {
  onOpenAuth: () => void;
}

export function MainLayout({ onOpenAuth }: MainLayoutProps) {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return(
    <div className="flex min-h-screen flex-col bg-white">
      {/* Navbar */}
      <div className="sticky top-0 z-50">
        <Navbar 
        onOpenAuth={onOpenAuth}
        onOpenCart={() => setIsCartOpen(true)}
        />
      </div>

      {/* Page Content */}
      <main className="grow">
        <Outlet />
      </main>

      <Footer />

      {/* Cart Drawer - rendered at layout level so it overlays all pages */}
      <CartDrawer 
      isOpen={isCartOpen}
      onClose={() => setIsCartOpen(false)}
      />
    </div>
  )
}