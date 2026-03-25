import { useEffect, useState } from "react";
import type { Product } from "../dashboard/shared/types";
import { fetchCategoryProducts } from "../../api/productServices";

interface ProductRecommendationsProps {
  currentProductId: string;
  categorySlug: string;
}

export function ProductRecommendations({
  currentProductId,
  categorySlug,
}: ProductRecommendationsProps) {
  const [recommendations, setRecommendations] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        setLoading(true);
        const data = await fetchCategoryProducts(categorySlug, { limit: 10 });

        /**
         * We check if 'data' is already the array. If not, we look for data.products.
         */
        const allProducts: Product[] = Array.isArray(data) 
            ? data 
            : (data && typeof data === 'object' && 'products' in data) 
                ? (data as any).products 
                : [];

        const shuffled = allProducts
          .filter((p: Product) => p._id !== currentProductId)
          .sort(() => 0.5 - Math.random())
          .slice(0, 4);

        setRecommendations(shuffled);
      } catch (error) {
        console.error("Failed to fetch recommendations", error);
      } finally {
        setLoading(false);
      }
    };

    if (categorySlug) fetchRecommendations();
  }, [categorySlug, currentProductId]);

  if (loading)
    return <div className="h-64 animate-pulse bg-stone-50 rounded-2xl" />;
  if (recommendations.length === 0) return null;

  return (
    <section className="mt-24 border-t border-stone-100 pt-16 mb-10">
      <h2 className="text-xl font-serif italic text-stone-900">You May Also Like</h2>
      <p className="text-[10px] uppercase tracking-[0.2em] text-stone-400 mt-1">
        Handpicked pieces that complement your selection.
      </p>

      <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
        {recommendations.map((item) => (
          <a
            key={item._id}
            href={`/product/${item.slug}`}
            className="group flex flex-col gap-4"
          >
            <div className="aspect-4/5 bg-stone-50 overflow-hidden rounded-2xl border border-stone-100">
              <img
                src={item.primaryImageUrl}
                alt={item.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700"
              />
            </div>
            
            <div className="space-y-1">
                {/**
                 * Using optional chaining (?.) and a fallback string.
                 */}
                <span className="text-[9px] uppercase tracking-widest text-stone-400 font-bold">
                {item.category?.name || "Luxarist Collection"}
                </span>
                
                <p className="text-sm font-medium text-stone-900">{item.name}</p>
                <p className="text-sm text-stone-500">
                ${item.price.toLocaleString()}
                </p>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}