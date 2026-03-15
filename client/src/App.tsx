import { Routes, Route } from "react-router-dom";
import { MainLayout } from "./common/layout/MainLayout";
import { Homepage } from "./pages/Homepage";
import { ShopAllPage } from "./pages/ShopAllPage";
import { CategoryPage } from "./pages/CategoryPage";
import { NewArrivalsPage } from "./pages/NewArrivalsPage";
import { FavoritesPage } from "./pages/FavoritesPage";
import { ScrollToTop } from "./common/utils/ScrollToTop";
import { ProductDetailPage } from "./pages/ProductDetailPage";
import RegisterPage from "./pages/auth/RegisterPage";

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* MainLayout wraps all pages to provide Navbar and Footer */}
        <Route element={<MainLayout />}>
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

          {/* Register Route */}
          <Route path="/register" element={<RegisterPage />} />
        </Route>
      </Routes>
    </>
  );
}