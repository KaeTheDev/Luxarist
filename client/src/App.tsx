import { Routes, Route } from "react-router-dom";
import { MainLayout } from "./common/layout/MainLayout";
import { Homepage } from "./pages/Homepage";
import { ShopAllPage } from "./pages/ShopAllPage";
import { CategoryPage } from "./pages/CategoryPage";
import { NewArrivalsPage } from "./pages/NewArrivalsPage";
import { FavoritesPage } from "./pages/FavoritesPage";
import { ScrollToTop } from "./common/utils/ScrollToTop";
import { ProductDetailPage } from "./pages/ProductDetailPage";
import AuthModal from "./features/auth/components/AuthModal";
import { useState } from "react";

export default function App() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

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
          <Route index element={<Homepage />} />

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

          {/* Login / Register Menu */}
          {/* <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} /> */}
        </Route>
      </Routes>
      {/* Keep the Modal outside of Routes. 
          This ensures it stays mounted and can animate properly 
          with AnimatePresence during page transitions.
      */}
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={closeAuth} 
      />
    </>
  );
}