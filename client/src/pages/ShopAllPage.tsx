/**
 * @name ShopAllPage
 * @description The comprehensive global storefront controller. Manages the
 * orchestration of the entire product catalog with dynamic filtering and sorting.
 * Uses ProductList's built-in skeleton loading state.
 */

import { useEffect, useState } from "react";
import { fetchProducts, fetchCategoryProducts } from "../api/productServices";
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

  const applyLocalSort = (productList: Product[], sortType: string) => {
    const sorted = [...productList];
    if (sortType === "price_asc") return sorted.sort((a, b) => a.price - b.price);
    if (sortType === "price_desc") return sorted.sort((a, b) => b.price - a.price);
    return sorted;
  };

  // Initial load
  useEffect(() => {
    async function initShop() {
      setLoading(true);
      try {
        const allProducts = await fetchProducts();
        const uniqueCats = Array.from(
          new Set(allProducts.map((p) => p.category?.name))
        ).filter((name): name is string => Boolean(name));
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

  // Re-fetch on filter / sort change
  useEffect(() => {
    if (activeCategory !== "all" && categories.length === 0) return;

    async function updateProducts() {
      setLoading(true);
      try {
        if (activeCategory === "all") {
          const data = await fetchProducts();
          setProducts(applyLocalSort(data, sort));
        } else {
          const data = await fetchCategoryProducts(activeCategory.toLowerCase(), { sort });
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
          {!loading && (
            <p className="text-[10px] uppercase tracking-[0.3em] text-gray-400 font-bold">
              {products.length} {products.length === 1 ? "Item" : "Items"} Found
            </p>
          )}
        </div>

        {/* ProductList handles its own skeleton via the loading prop */}
        <ProductList products={products} loading={loading} />
      </main>
    </div>
  );
}