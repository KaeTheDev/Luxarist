import { useEffect, useState } from "react";
import { fetchProducts } from "../../api/fetchProducts";
import { fetchProductsByCategory } from "../../api/fetchProductsByCategory";

import { CategoryHero } from "../CategoryPage/CategoryHero";
import { ShopAllFilters } from "./ShopAllFilters";
import { ProductList } from "../../common/ui/ProductList";
import type { Product } from "../../types/Product";

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

        // Derive categories
        const uniqueCats = Array.from(
          new Set(
            allProducts.map((p) =>
              typeof p.category === "object"
                ? (p.category as any).name
                : p.category
            )
          )
        ).filter(Boolean) as string[];

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
      if (categories.length === 0) return;

      setLoading(true);
      try {
        if (activeCategory === "all") {
          const data = await fetchProducts();
          setProducts(applyLocalSort(data, sort));
        } else {
          // fetchProductsByCategory returns response.data (likely {products: []} or raw [])
          const response = await fetchProductsByCategory({
            slug: activeCategory.toLowerCase(),
            sort: sort,
          });
          // Handle object vs array response safely
          const data = Array.isArray(response)
            ? response
            : response.products || [];
          setProducts(data);
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
      <CategoryHero
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