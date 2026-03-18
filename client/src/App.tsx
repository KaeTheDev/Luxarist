import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { MainLayout } from "./common/layout/MainLayout";
import { Homepage } from "./pages/Homepage";
import { ShopAllPage } from "./pages/ShopAllPage";
import { CategoryPage } from "./pages/CategoryPage";
import { NewArrivalsPage } from "./pages/NewArrivalsPage";
import { FavoritesPage } from "./pages/FavoritesPage";
import { ScrollToTop } from "./common/utils/ScrollToTop";
import { ProductDetailPage } from "./pages/ProductDetailPage";
import AuthModal from "./features/auth/components/AuthModal";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { ProtectedRoute } from "./features/auth/components/ProtectedRoute";
import { CustomerDashboard } from "./features/dashboard/CustomerDashboard/CustomerDashboard";
import { AdminDashboard } from "./features/dashboard/AdminDashboard";

export default function App() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Check if we arrived here from the Login Page via the "Register Now" button
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

          {/* New Arrivals Route */}
          <Route
            path="collections/new-arrivals"
            element={<NewArrivalsPage />}
          />

          {/* Favorites Page Route */}
          <Route path="/favorites" element={<FavoritesPage />} />

          {/* Product Routes */}
          <Route path="/product/:slug" element={<ProductDetailPage />} />

          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

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
        </Route>
      </Routes>
      {/* Keep the Modal outside of Routes. 
          This ensures it stays mounted and can animate properly 
          with AnimatePresence during page transitions.
      */}
      <AuthModal isOpen={isAuthModalOpen} onClose={closeAuth} />
    </>
  );
}