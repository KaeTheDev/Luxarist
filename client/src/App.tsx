import { Routes, Route } from "react-router-dom";
import { MainLayout } from "./common/layout/MainLayout";
import { Homepage } from "./features/home/Homepage";
import { ProductList } from "./common/ui/ProductList";
import { MOCK_PRODUCTS } from "./utils/mockData";
import { CategoryPage } from "./pages/CategoryPage/CategoryPage";

// Placeholder for future pages
const ProductDetailPage = () => <div className="py-20 text-center">Product Detail Page coming soon...</div>;
// const CollectionsPage = () => <div className="py-20 text-center">Collections Page coming soon...</div>

export default function App() {
  return(
    <Routes>
      {/* MainLayout wraps all pages to provide Navbar and Footer */}
      <Route element={<MainLayout />}>
      
      {/* Index route is the Homepage */}
      <Route index element={<Homepage />} />

      {/* Collections Routes */}
      <Route path="collections" element={<ProductList products={MOCK_PRODUCTS} />} /> {/* Swap out with Shop All */}
      <Route path="collections/:slug" element={<CategoryPage />} /> {/* Swap out with Category Page */}

      {/* Product Routes */}
      <Route path="products/:id" element={<ProductDetailPage />} />
      </Route>
    </Routes>
  );
};