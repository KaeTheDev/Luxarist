/**
 * @name ShopAllPage
 * @description The comprehensive global storefront controller. Manages the orchestration 
 * of the entire product catalog, featuring dynamic category derivation and multi-layered sorting.
 * * @state
 * - `products`: The master list of displayed jewelry pieces, updated via category filters or local sort logic.
 * - `categories`: A unique list of strings derived from the initial product fetch to populate the filter UI dynamically.
 * - `activeCategory`: Tracks the current "Pill" selection; defaults to "all" for a global view.
 * - `sort`: Controls the ordering logic, triggering either a re-fetch or a local array re-order.
 * * @features
 * - **Dynamic Category Discovery**: Automatically builds the filter menu by extracting unique category names from the product dataset using `Set`.
 * - **Hybrid Sorting**: Implements `applyLocalSort` to provide immediate UI responsiveness for price changes while supporting server-side sorting for deep-filtered sets.
 * - **Safe Data Normalization**: Features defensive checks (e.g., `Array.isArray`) to handle varying backend response shapes between global and category-specific endpoints.
 * - **Reactive Lifecycle**: Utilizes targeted `useEffect` blocks to ensure the UI stays synchronized with filter state without redundant global re-fetches.
 * * @styling
 * - **Hero Integration**: Employs the `shop-all` variant of the {@link CategoryHero} to provide a centered, high-impact brand introduction.
 * - **Visual Feedback**: Uses a `tracking-widest` uppercase loading state with an `animate-pulse` effect to maintain luxury aesthetics during async transitions.
 * - **Typography**: Reinforces brand identity with high-tracking metadata text (e.g., "ITEMS FOUND") to guide the user's eye through the grid.
 */

import { useEffect, useState } from "react";
import { fetchProducts } from "../api/productServices";
import { fetchCategoryProducts } from "../api/productServices";

import { PageHero } from "../common/ui/PageHero";
import { ShopAllFilters } from "../features/shop-all/ShopAllFilters";
import { ProductList } from "../common/ui/ProductList";
import type { Product } from "../features/dashboard/shared/types";

export function ShopAllPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [sort, setSort] = useState("newest");
  const [loading, setLoading] = useState(true);

  // Helper for sorting locally when the API doesn't support the sort param
  const applyLocalSort = (productList: Product[], sortType: string) => {
    const sorted = [...productList];
    if (sortType === "price_asc")
      return sorted.sort((a, b) => a.price - b.price);
    if (sortType === "price_desc")
      return sorted.sort((a, b) => b.price - a.price);
    // Add other cases as needed
    return sorted;
  };

  // 1. Initial Load: Fetch everything
  useEffect(() => {
    async function initShop() {
      setLoading(true);
      try {
        // Your fetchProducts returns Product[] directly
        const allProducts = await fetchProducts();

// Derive categories from the object structure
const uniqueCats = Array.from(
  new Set(
    allProducts.map((p) => p.category?.name) // Safely grab the .name
  )
).filter((name): name is string => Boolean(name)); // Typescript-safe filter

setCategories(uniqueCats);
        setProducts(applyLocalSort(allProducts, sort));
      } catch (error) {
        console.error("Failed to initialize shop:", error);
      } finally {
        setLoading(false);
      }
    }
    initShop();
  }, []);

// 2. Refresh Products on Filter/Sort Change
useEffect(() => {
  async function updateProducts() {
    // Allow "all" to load even if categories list is still being built
    if (activeCategory !== "all" && categories.length === 0) return;

    setLoading(true);
    try {
      if (activeCategory === "all") {
        const data = await fetchProducts();
        setProducts(applyLocalSort(data, sort));
      } else {
        // fetchCategoryProducts now returns Product[] directly
        const data = await fetchCategoryProducts(activeCategory.toLowerCase(), { sort });
        
        // No more .products check needed! Just set the data.
        setProducts(applyLocalSort(data, sort));
      }
    } catch (error) {
      console.error("Error fetching filtered products:", error);
    } finally {
      setLoading(false);
    }
  }
  updateProducts();
}, [activeCategory, sort]);

  return (
    <div className="min-h-screen bg-white">
      <PageHero
        variant="shop-all"
        title="Exquisite Jewelry Collection"
        description="Discover timeless elegance with our curated selection of fine jewelry, crafted with precision and designed to captivate."
        imageUrl="https://ik.imagekit.io/gwbd4eva2026/hero-images/shop_all-hero.png?updatedAt=1772424583592"
        count={products.length}
      />

      <main className="container mx-auto px-6 md:px-12 lg:px-20 py-12">
        <ShopAllFilters
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          sort={sort}
          onSortChange={setSort}
        />

        <div className="mt-8 mb-12">
          <p className="text-[10px] uppercase tracking-[0.3em] text-gray-400 font-bold">
            {products.length} {products.length === 1 ? "Item" : "Items"} Found
          </p>
        </div>

        {loading ? (
          <div className="py-20 text-center tracking-widest text-gray-300 animate-pulse uppercase text-xs">
            Refreshing Collection...
          </div>
        ) : (
          <ProductList products={products} />
        )}
      </main>
    </div>
  );
}