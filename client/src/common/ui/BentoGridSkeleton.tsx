/**
 * Purpose: Skeleton placeholder for the FeaturedCollectionsSection bento grid.
 * Mirrors the exact CATEGORY_LAYOUTS grid positions for all 5 categories to
 * prevent layout shift while categories load from the backend.
 *
 * Responsibilities:
 * - Replicate the section header (title + subtitle skeletons).
 * - Render 5 skeleton tiles using the same col-span, row-span, col-start,
 *   and row-start classes from CATEGORY_LAYOUTS.
 * - Match grid container classes exactly: grid-cols-4, auto-rows-[300px], gap-4.
 *
 * Usage:
 *   // In FeaturedCollectionsSection:
 *   if (loading) return <BentoGridSkeleton />;
 */

import { Skeleton } from "./Skeleton";

// Mirrors CATEGORY_LAYOUTS exactly — these must stay in sync with categoryLayouts.ts
const SKELETON_TILES = [
  // Bracelet — large left tile, spans 2 cols × 2 rows
  "col-span-1 sm:col-span-2 lg:col-span-2 lg:row-span-2 lg:col-start-1 lg:row-start-1",
  // Earrings — top right, spans 2 cols × 1 row
  "col-span-1 sm:col-span-2 lg:col-span-2 lg:row-span-1 lg:col-start-3 lg:row-start-1",
  // Ring — mid right col 3
  "col-span-1 sm:col-span-1 lg:col-span-1 lg:row-span-1 lg:col-start-3 lg:row-start-2",
  // Necklace — mid right col 4
  "col-span-1 sm:col-span-1 lg:col-span-1 lg:row-span-1 lg:col-start-4 lg:row-start-2",
  // Watch — full-width bottom banner, spans all 4 cols
  "col-span-1 sm:col-span-2 lg:col-span-4 lg:row-span-1 lg:col-start-1 lg:row-start-3",
];

export function BentoGridSkeleton() {
  return (
    <section
      aria-busy="true"
      aria-label="Loading featured collections"
      className="w-full bg-white py-10 px-4 sm:px-6 lg:px-8"
    >
      {/* Section header skeleton */}
      <div className="max-w-7xl mx-auto mb-12 flex flex-col items-center gap-3">
        <Skeleton className="h-8 w-56 rounded-full" />
        <Skeleton className="h-4 w-72 rounded-full" />
      </div>

      {/* Bento grid — exact same container as the real section */}
      <div className="grid gap-4 w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 auto-rows-[180px] sm:auto-rows-[220px] lg:auto-rows-[300px]">
        {SKELETON_TILES.map((layoutClass, i) => (
          <Skeleton
            key={i}
            className={`rounded-xl ${layoutClass}`}
          />
        ))}
      </div>
    </section>
  );
}