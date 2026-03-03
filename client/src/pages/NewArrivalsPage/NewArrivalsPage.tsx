import { useEffect, useState } from "react";
import { fetchProducts } from "../../api/fetchProducts";
import type { Product } from "../../types/Product";
import { ProductList } from "../../common/ui/ProductList";

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
    <div className="px-6 py-16">
      <h1 className="text-3xl font-light mb-8">New Arrivals</h1>
      <ProductList products={products} />
    </div>
  );
}