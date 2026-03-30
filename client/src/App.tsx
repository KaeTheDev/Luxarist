import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

// Layout & Shells
import { MainLayout } from "./common/layout/MainLayout";
import { ScrollToTop } from "./common/utils/ScrollToTop";

// Public Pages
import { Homepage } from "./pages/Homepage";
import { ShopAllPage } from "./pages/ShopAllPage";
import { CategoryPage } from "./pages/CategoryPage";
import { NewArrivalsPage } from "./pages/NewArrivalsPage";
import { FavoritesPage } from "./pages/FavoritesPage";
import { ProductDetailPage } from "./pages/ProductDetailPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import OurStoryPage from "./pages/OurStoryPage";
import ContactPage from "./pages/ContactPage";
import ComingSoonPage from "./pages/ComingSoonPage";

// Auth
import AuthModal from "./features/auth/components/AuthModal";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { ProtectedRoute } from "./features/auth/components/ProtectedRoute";

// Dashboards (These will use the DashboardShell internally)
import CustomerDashboard from "./features/dashboard/CustomerDashboard/CustomerDashboard";
import AdminDashboard from "./features/dashboard/AdminDashboard/AdminDashboard";

export default function App() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // If arriving from Login via "Register Now", trigger the modal
    if (location.state?.openRegister) {
      setIsAuthModalOpen(true);

      // Clean Up: Remove the state so the modal doesn't pop up again if they refresh
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  // Helper functions for clarity
  const openAuth = () => setIsAuthModalOpen(true);
  const closeAuth = () => setIsAuthModalOpen(false);

  return (
    <>
      <ScrollToTop />

      <Routes>
        {/* MainLayout wraps all pages to provide Navbar and Footer */}
        <Route element={<MainLayout onOpenAuth={openAuth} />}>
          {/* Index route is the Homepage */}
          <Route index element={<Homepage onOpenAuth={openAuth} />} />

          {/* Collections Routes */}
          <Route path="collections" element={<ShopAllPage />} />
          <Route path="collections/:slug" element={<CategoryPage />} />
          <Route path="collections/new-arrivals" element={<NewArrivalsPage />} />

          {/* User Features */}
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/cart" element={<CartPage />} /> 
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/product/:slug" element={<ProductDetailPage />} />

          {/* Auth Pages */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Company and Support Pages */}
          <Route path="/about" element={<OurStoryPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/sustainability" element={<ComingSoonPage title="Sustainability" />} />
          <Route path="/craftsmanship" element={<ComingSoonPage title="Craftsmanship" />} />
          <Route path="/shipping" element={<ComingSoonPage title="Shipping & Returns" />} />
          <Route path="/care-guide" element={<ComingSoonPage title="Care Guide" />} />
          <Route path="/privacy" element={<ComingSoonPage title="Privacy Policy" description="Our full privacy policy is being prepared. For any data or privacy enquiries please contact us at hello@luxarist.com." />} />
          <Route path="/terms" element={<ComingSoonPage title="Terms of Service" description="Our terms of service are being prepared. For any legal enquiries please contact us at hello@luxarist.com." />} />
        </Route>

        {/* Private Dashboard Routes
        These are OUTSIDE MainLayout
        They use the DashboardShell for a dedicated, edge-to-edge UI 
        */}
          <Route
            path="/dashboard/*"
            element={
              <ProtectedRoute>
                <CustomerDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/*"
            element={
              <ProtectedRoute requireAdmin={true}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
      </Routes>
      {/* The AuthModal stays globally accessible */}
      <AuthModal isOpen={isAuthModalOpen} onClose={closeAuth} />
    </>
  );
}