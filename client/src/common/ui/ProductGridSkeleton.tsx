/**
 * Purpose: Renders a grid of ProductCardSkeleton placeholders that exactly
 * matches the ProductList grid layout. Prevents layout shift when the product
 * grid loads.
 *
 * Responsibilities:
 * - Mirror the exact grid classes used in ProductList.
 * - Accept a count prop to control how many skeletons render.
 * - Default to 12 skeletons (one full page of products).
 *
 * Usage:
 *   <ProductGridSkeleton count={12} />
 */

import { ProductCardSkeleton } from "./ProductCardSkeleton";

interface ProductGridSkeletonProps {
  count?: number;
  className?: string;
}

export function ProductGridSkeleton({ count = 12, className = "" }: ProductGridSkeletonProps) {
  return (
    <div
      aria-busy="true"
      aria-label="Loading products"
      className={`grid grid-cols-2 gap-y-16 gap-x-8 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 ${className}`}
    >
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}