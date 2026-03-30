/**
 * @name MainLayout
 * @description The root layout component that structures all pages with a consistent
 * navigation bar, main content area, and footer. Renders CartDrawer using
 * drawer state from CartContext so any component can trigger it directly.
 *
 * @composition
 * - Includes Navbar fixed to the top with onOpenAuth handler.
 * - Renders CartDrawer controlled by isCartOpen / closeCart from CartContext.
 * - Uses Outlet from react-router-dom to render page-specific content dynamically.
 * - Includes Footer at the bottom for consistent branding and links.
 *
 * @responsibilities
 * - Provide a consistent page structure across all routes.
 * - Render the CartDrawer at the layout level so it overlays all pages.
 */

import { Outlet } from "react-router-dom";
import { Footer } from "./Footer";
import { Navbar } from "./navigation/Navbar";
import { CartDrawer } from "../../features/cart/components/CartDrawer";
import { useCart } from "../../context/CartContext";

interface MainLayoutProps {
  onOpenAuth: () => void;
}
 
export function MainLayout({ onOpenAuth }: MainLayoutProps) {
  const { isCartOpen, closeCart } = useCart();
 
  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* Navbar */}
      <div className="sticky top-0 z-50">
        <Navbar onOpenAuth={onOpenAuth} />
      </div>
 
      {/* Page content */}
      <main className="grow">
        <Outlet />
      </main>
 
      <Footer />
 
      {/* Cart drawer — overlays all pages, driven by CartContext */}
      <CartDrawer isOpen={isCartOpen} onClose={closeCart} />
    </div>
  );
}