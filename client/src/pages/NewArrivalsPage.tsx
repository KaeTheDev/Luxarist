import { useEffect, useState } from "react";
import { fetchProducts } from "../api/productServices";
import type { Product } from "../features/dashboard/shared/types";
import { ProductList } from "../common/ui/ProductList";
import { PageHero } from "../common/ui/PageHero";
import { NewArrivalsBanner } from "../features/new-arrivals/NewArrivalsBanner";

export function NewArrivalsPage() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function loadProducts() {
      const data = await fetchProducts({
        isNewArrival: true,
      });
      setProducts(data);
    }

    loadProducts();
  }, []);

  // Calculate the range only when products are loaded
  const priceList = products.map((p) => p.price);
  const minPrice = priceList.length ? Math.min(...priceList) : 0;
  const maxPrice = priceList.length ? Math.max(...priceList) : 0;

  return (
    <div className="min-h-screen bg-white">
      <PageHero
      title="New Arrivals"
      description="Discover our latest additions to the collection. Each piece has been carefully selected to bring you the finest in luxury jewelry."
      imageUrl="https://ik.imagekit.io/gwbd4eva2026/hero-images/new_arrivals-hero.png?updatedAt=1772512855082"
      />

    {products.length > 0 && (
      <NewArrivalsBanner 
      count={products.length}
      minPrice={minPrice}
      maxPrice={maxPrice}
      />
    )}

     <main className="container mx-auto px-6 md:px-12 lg:px-20 py-12">
     <ProductList products={products} />
     </main>
    </div>
  );
}