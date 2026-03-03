import { useEffect, useState } from "react";
import { fetchProducts } from "../api/fetchProducts";
import type { Product } from "../types/Product";
import { ProductList } from "../common/ui/ProductList";
import { PageHero } from "../common/ui/PageHero";

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

  return (
    <div className="min-h-screen bg-white">
      <PageHero
      title="New Arrivals"
      description="Discover our latest additions to the collection. Each piece has been carefully selected to bring you the finest in luxury jewelry."
      imageUrl="https://ik.imagekit.io/gwbd4eva2026/hero-images/new_arrivals-hero.png?updatedAt=1772512855082"
      />
     <main className="container mx-auto px-6 md:px-12 lg:px-20 py-12">
     <ProductList products={products} />
     </main>
    </div>
  );
}