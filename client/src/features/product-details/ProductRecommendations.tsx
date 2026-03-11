import { useEffect, useState } from "react";
import type { Product } from "../../types/Product";
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
        // Using your exisiting category endpoint
        const data = await fetchCategoryProducts(categorySlug, { limit: 10 });

        // Access 'products' directly from the data object
        // Add a fallback [] to prevent the "reading properties of undefined" error
        const allProducts = data.products || [];

        // Filter out the current product and take the top 4
        const shuffled = allProducts
          .filter((p: Product) => p._id !== currentProductId)
          .sort(() => 0.5 - Math.random()) // random sort
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
    return <div className="h-64 animate-pulse bg-gray-50 rounded-lg" />;
  if (recommendations.length === 0) return null;

  return (
    <section className="mt-16 mb-10">
      <h2 className="text-xl font-semibold">You May Also Like</h2>
      <p className="text-sm text-gray-600 mt-1">
        Handpicked pieces that complement your selection.
      </p>

      <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {recommendations.map((item) => (
          <a
            key={item._id}
            href={`/product/${item.slug}`}
            className="group flex flex-col gap-2"
          >
            <div className="aspect-square bg-gray-100 overflow-hidden rounded-lg">
              <img
                src={item.primaryImageUrl}
                alt={item.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <span className="text-[10px] uppercase tracking-widest text-gray-500">
              {item.category.name}
            </span>
            <p className="text-sm font-medium">{item.name}</p>
            <p className="text-sm text-gray-900">
              ${item.price.toLocaleString()}
            </p>
          </a>
        ))}
      </div>
    </section>
  );
}