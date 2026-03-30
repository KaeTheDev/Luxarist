/**
 * Purpose: Skeleton placeholder for a single ProductCard. Mirrors the exact
 * layout structure of ProductCard to prevent layout shift when content loads.
 *
 * Responsibilities:
 * - Replicate the aspect-4/5 image area.
 * - Replicate the category label, product name, material, and price text rows.
 * - Use the same border-radius and padding as the real card.
 *
 * Usage:
 *   <ProductCardSkeleton />
 */

import { Skeleton } from "./Skeleton";

export function ProductCardSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white"
    >
      {/* Image area — matches aspect-4/5 */}
      <Skeleton className="aspect-4/5 w-full rounded-none" />

      {/* Text area — matches p-6 space-y-2 */}
      <div className="flex flex-col p-6 space-y-2.5">
        {/* Category label */}
        <Skeleton className="h-2.5 w-16 rounded-full" />
        {/* Product name — two lines */}
        <Skeleton className="h-4 w-full rounded-full" />
        <Skeleton className="h-4 w-3/4 rounded-full" />
        {/* Material */}
        <Skeleton className="h-2.5 w-20 rounded-full" />
        {/* Price */}
        <Skeleton className="h-4 w-16 rounded-full mt-1" />
      </div>
    </div>
  );
}