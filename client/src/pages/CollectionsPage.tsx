/**
 * Purpose: Renders the /collections page showing all available categories
 * in a card-based grid layout with a hero banner at the top.
 *
 * Responsibilities:
 * - Fetch all categories from the backend via useAllCategories.
 * - Display each category as a clickable card with featured image,
 *   category name, and product count.
 * - Render loading skeleton and error states.
 * - Provide a hero banner consistent with the rest of the site.
 *
 * Usage:
 *   <Route path="/collections" element={<CollectionsPage />} />
 */

import { Link } from "react-router-dom";
import { useAllCategories } from "../hooks/useAllCategories";
 
export function CollectionsPage() {
  const { categories, loading, error } = useAllCategories();
 
  return (
    <div className="min-h-screen bg-white">
 
      {/* Hero */}
      <section className="relative w-full h-[50vh] flex items-center justify-center overflow-hidden bg-stone-900">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40 transition-transform duration-700 hover:scale-105"
          style={{ backgroundImage: "url(https://ik.imagekit.io/gwbd4eva2026/hero/hero.png)" }}
        />
        <div className="absolute inset-0 bg-linear-to-b from-black/60 via-transparent to-black/60" />
        <div className="relative z-10 text-center px-6 space-y-4">
          <p className="text-[11px] uppercase tracking-[0.4em] font-black text-white/50">
            Luxarist
          </p>
          <h1 className="text-5xl md:text-7xl font-light text-white tracking-tight">
            Collections
          </h1>
          <p className="text-white/60 text-sm md:text-base font-light max-w-md mx-auto leading-relaxed">
            Explore every category in our fine jewelry collection.
          </p>
        </div>
      </section>
 
      {/* Category grid */}
      <main className="max-w-7xl mx-auto px-6 py-16">
 
        {/* Loading skeleton */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-72 bg-stone-100 rounded-3xl animate-pulse"
              />
            ))}
          </div>
        )}
 
        {/* Error state */}
        {error && (
          <div className="py-20 text-center">
            <p className="text-[10px] uppercase tracking-[0.2em] font-black text-stone-300">
              Unable to Load Collections
            </p>
            <p className="text-sm text-stone-300 italic mt-1">{error}</p>
          </div>
        )}
 
        {/* Category cards */}
        {!loading && !error && (
          <>
            <div className="flex items-center justify-between mb-10">
              <div>
                <h2 className="text-2xl font-semibold text-stone-900 tracking-tight">
                  All Collections
                </h2>
                <p className="text-sm text-stone-400 font-light mt-1">
                  {categories.length}{" "}
                  {categories.length === 1 ? "collection" : "collections"}{" "}
                  available
                </p>
              </div>
            </div>
 
            {categories.length === 0 ? (
              <div className="py-20 text-center">
                <p className="text-stone-400 italic font-light">
                  No collections available yet.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {categories.map((category) => (
                  <Link
                    key={category._id}
                    to={`/collections/${category.slug}`}
                    className="group relative h-72 rounded-3xl overflow-hidden bg-stone-100 cursor-pointer"
                  >
                    {/* Image */}
                    {category.heroImage && (
                      <img
                        src={category.heroImage}
                        alt={category.name}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    )}
 
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />
 
                    {/* Text */}
                    <div className="absolute inset-0 flex flex-col justify-end p-6">
                      <div className="space-y-1">
                        <p className="text-white/60 text-[11px] uppercase tracking-[0.2em] font-bold">
                          {category.productCount}{" "}
                          {category.productCount === 1 ? "piece" : "pieces"}
                        </p>
                        <h3 className="text-white text-2xl font-semibold tracking-tight">
                          {category.name}
                        </h3>
                        <p className="text-white/0 group-hover:text-white/80 text-xs uppercase tracking-widest font-bold transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                          Shop Now →
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}