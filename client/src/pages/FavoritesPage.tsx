/**
 * @name FavoritesPage
 * @description A page component that displays all products the user has marked as favorites.
 * Uses the {@link useFavorites} hook to manage persistence and {@link ProductList} for rendering.
 * * @responsibilities
 * - Retrieve favorite product IDs from local storage via custom hook.
 * - Synchronize UI state immediately when items are unfavorited.
 * - Fetch full product details from the API based on stored IDs.
 * - Display a custom "Empty State" when no favorites exist.
 * * @features
 * - **Instant Sync**: Removes cards from the grid immediately without page refresh when untoggled.
 * - **Conditional Fetching**: Only triggers API calls when new items are added or on initial load.
 * - **Luxury Empty State**: Features a minimalist layout with a decorative star icon and call-to-action.
 * * @usage
 * - Accessible via the `/favorites` route.
 * - Depends on {@link useFavorites} for shared state across the application.
 */

import { useEffect, useState } from "react";
import { useFavorites } from "../hooks/useFavorites";
import { fetchProducts } from "../api/fetchProducts";
import type { Product } from "../types/Product";
import { ProductList } from "../common/ui/ProductList";

export function FavoritesPage() {
  const { favorites } = useFavorites();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function syncFavorites() {
      // No Favorites Left In Storage, Clear the UI immediately
      if (favorites.length === 0) {
        setProducts([]);
        return;
      }
      // An Item was REMOVED (instant UI update)
      // If there is more product cards than IDs, then one was just untoggled
      if (favorites.length < products.length) {
        setProducts((prev) => prev.filter((p) => favorites.includes(p._id)));
        return;
      }

      // If the list is NEW or items were ADDED, fetch from the API
      // Only do this if there are not already products in state
      const needsFetch = favorites.some(
        (id) => !products.find((p) => p._id === id)
      );

      if (needsFetch || products.length === 0) {
        setIsLoading(true);
        try {
          const data = await fetchProducts({ ids: favorites });

          // Manual filter in case the backend returns too much data
          const onlyFavorites = data.filter((product) =>
            favorites.includes(product._id)
          );
          setProducts(onlyFavorites);
        } catch (error) {
          console.error("Error fetching favorites:", error);
        } finally {
          setIsLoading(false);
        }
      }
    }

    syncFavorites();
    // Dependency on 'favorites' ensures this runs whenever a star is clicked
  }, [favorites, products.length]);

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-6 md:px-12 lg:px-20 py-16">
        {/* Header Section */}
        <div className="flex items-center gap-4 mb-12">
          <span className="text-3xl">★</span>
          <h1 className="text-4xl font-light tracking-light text-gray-900">
            Your Favorites
          </h1>
        </div>
        {favorites.length === 0 ? (
          // The "Empty State" layout
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <div className="mb-8 opacity-10">
              {/* Large Decorative Star */}
              <svg
                width="120"
                height="120"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            </div>
            <h2 className="text-2xl font-light text-gray-900 mb-2">
              No Favorites Yet
            </h2>
            <p className="text-gray-500 font-light max-w-xs leading-relaxed">
              Browse the collection and tap the star to save pieces here.
            </p>
          </div>
        ) : (
          // The Grid Section
          <div className={isLoading ? "opacity-50 transition-opacity" : ""}>
            <ProductList products={products} />
          </div>
        )}
      </div>
    </div>
  );
}