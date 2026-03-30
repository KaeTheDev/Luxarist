/**
 * Purpose: Full-page skeleton for the ProductDetailPage. Mirrors the exact
 * two-column grid layout (gallery left, info right) and the tabs section below.
 *
 * Responsibilities:
 * - Replicate the image gallery column: main image + thumbnail strip.
 * - Replicate the info column: category, name, price, size selector, CTA buttons.
 * - Replicate the tabs section: tab bar + content area.
 *
 * Usage:
 *   // In ProductDetailPage:
 *   if (loading) return <ProductDetailSkeleton />;
 */

import { Skeleton } from "./Skeleton";

export function ProductDetailSkeleton() {
  return (
    <main
      aria-busy="true"
      aria-label="Loading product"
      className="container mx-auto px-4 py-12"
    >
      {/* ── Two-column upper section ──────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">

        {/* LEFT: Image gallery */}
        <div className="flex flex-col gap-4">
          {/* Main image */}
          <Skeleton className="aspect-square w-full rounded-3xl" />
          {/* Thumbnail strip */}
          <div className="flex gap-3">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="w-16 h-16 rounded-2xl shrink-0" />
            ))}
          </div>
        </div>

        {/* RIGHT: Product info */}
        <div className="flex flex-col gap-5 pt-2">
          {/* Category */}
          <Skeleton className="h-3 w-20 rounded-full" />
          {/* Product name */}
          <Skeleton className="h-8 w-3/4 rounded-full" />
          <Skeleton className="h-8 w-1/2 rounded-full" />
          {/* Price */}
          <Skeleton className="h-7 w-24 rounded-full" />

          {/* Divider */}
          <div className="h-px bg-stone-100 my-2" />

          {/* Size label */}
          <Skeleton className="h-3 w-12 rounded-full" />
          {/* Size options */}
          <div className="flex gap-2 flex-wrap">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-10 w-14 rounded-xl" />
            ))}
          </div>

          {/* Quantity label + selector */}
          <Skeleton className="h-3 w-16 rounded-full" />
          <Skeleton className="h-11 w-32 rounded-xl" />

          {/* CTA buttons */}
          <Skeleton className="h-14 w-full rounded-xl mt-2" />
          <div className="grid grid-cols-2 gap-3">
            <Skeleton className="h-12 rounded-xl" />
            <Skeleton className="h-12 rounded-xl" />
          </div>
        </div>
      </div>

      {/* ── Tabs section ──────────────────────────────────────────────────── */}
      <div className="mt-12 max-w-4xl mx-auto border-t border-gray-100 pt-12">
        {/* Tab bar */}
        <div className="flex justify-center gap-8 border-b border-gray-200 pb-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-4 w-20 rounded-full" />
          ))}
        </div>
        {/* Tab content */}
        <div className="mt-8 space-y-3 max-w-2xl mx-auto">
          <Skeleton className="h-4 w-full rounded-full" />
          <Skeleton className="h-4 w-5/6 rounded-full" />
          <Skeleton className="h-4 w-4/5 rounded-full" />
          <Skeleton className="h-4 w-3/4 rounded-full" />
        </div>
      </div>

    </main>
  );
}