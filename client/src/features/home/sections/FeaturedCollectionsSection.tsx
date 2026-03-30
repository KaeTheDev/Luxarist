/**
 * @name FeaturedCollectionsSection
 * @description Displays handpicked featured product categories in a responsive
 * Bento Grid layout. Shows top 5 featured categories and conditionally renders
 * a "View All Collections →" link when more than 5 categories exist in the backend.
 *
 * @composition
 * - Uses useFeaturedCategories to fetch featured category data.
 * - Sorts categories using CATEGORY_ORDER for consistent display order.
 * - Applies layout classes from CATEGORY_LAYOUTS for the Bento Grid.
 * - Conditionally shows "View All →" link when categories.length > 5.
 *
 * @styling
 * - Responsive CSS grid with auto-rows and span adjustments for desktop and mobile.
 * - Hover effects reveal overlays, item counts, and "SHOP NOW" CTA.
 */

import { Link } from "react-router-dom";
import { useFeaturedCategories } from "../../../hooks/useFeaturedCategories";
import { CATEGORY_LAYOUTS, CATEGORY_ORDER } from "../../../constants/categoryLayouts";
import type { FeaturedCategory } from "../../../types/FeaturedCategory";
import { BentoGridSkeleton } from "../../../common/ui/BentoGridSkeleton";

const FEATURED_LIMIT = 5;

export function FeaturedCollectionsSection() {
  const { categories, loading, error } = useFeaturedCategories();

  if (loading) return <BentoGridSkeleton />;
  if (error) return <p>{error}</p>;

  const sorted = [...categories]
    .sort((a, b) => (CATEGORY_ORDER[a.name] ?? 99) - (CATEGORY_ORDER[b.name] ?? 99))
    .slice(0, FEATURED_LIMIT);

  const hasMore = categories.length > FEATURED_LIMIT;

  return (
    <section className="w-full bg-white py-10 px-4 sm:px-6 lg:px-8">

      {/* Section Header */}
      <div className="max-w-7xl mx-auto mb-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="text-center sm:text-left">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight">
              Featured Collections
            </h2>
            <p className="mt-3 text-sm sm:text-base text-gray-600">
              Explore our handpicked selection of fine jewelry.
            </p>
          </div>

          {/* Conditional View All link — only shown when >5 categories exist */}
          {hasMore && (
            <Link
              to="/collections"
              className="text-[11px] uppercase tracking-[0.2em] font-black text-stone-400 hover:text-stone-900 transition-colors whitespace-nowrap self-center sm:self-end"
            >
              View All Collections →
            </Link>
          )}
        </div>
      </div>

      {/* Bento Grid */}
      <div className="grid gap-4 w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 auto-rows-[180px] sm:auto-rows-[220px] lg:auto-rows-[300px]">
        {sorted.map((cat: FeaturedCategory) => {
          const layoutClasses = CATEGORY_LAYOUTS[cat.name] ?? "col-span-1";
          return (
            <Link
              to={`/collections/${cat.slug}`}
              key={cat._id}
              className={`relative group bg-gray-200 flex items-end p-4 ${layoutClasses} overflow-hidden rounded-xl cursor-pointer`}
            >
              <img
                src={cat.featuredImage}
                alt={cat.name}
                className="absolute inset-0 w-full h-full object-cover"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300" />

              {/* Text Content */}
              <div className="relative z-10 w-full flex items-end justify-between">
                <div className="flex flex-col gap-1">
                  <p className="text-lg font-semibold text-white uppercase tracking-wide flex items-center gap-2">
                    <span className="relative">
                      {cat.name}
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-500 group-hover:w-full" />
                    </span>
                    <span className="opacity-0 group-hover:opacity-70 transition-opacity duration-500 text-sm">
                      {cat.productCount} items
                    </span>
                  </p>
                  <p className="text-sm text-white opacity-0 transform translate-y-3 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    SHOP NOW &rarr;
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

    </section>
  );
}