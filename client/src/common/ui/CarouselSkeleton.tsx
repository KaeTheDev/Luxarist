/**
 * Purpose: Skeleton placeholder for the NewArrivalsSection horizontal carousel.
 * Mirrors the exact flex layout and card dimensions of the real carousel to
 * prevent layout shift.
 *
 * Responsibilities:
 * - Render a header skeleton (title + subtitle + VIEW ALL link).
 * - Render a horizontal row of card skeletons at w-70 / sm:w-[320px].
 * - Match section padding and spacing of NewArrivalsSection.
 *
 * Usage:
 *   <CarouselSkeleton count={4} />
 */

import { Skeleton } from "./Skeleton";
import { ProductCardSkeleton } from "./ProductCardSkeleton";

interface CarouselSkeletonProps {
  count?: number;
}

export function CarouselSkeleton({ count = 4 }: CarouselSkeletonProps) {
  return (
    <section
      aria-busy="true"
      aria-label="Loading new arrivals"
      className="w-full bg-white py-16 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">

        {/* Header skeleton */}
        <div className="flex flex-col items-center mb-10 gap-3">
          <Skeleton className="h-7 w-40 rounded-full" />
          <Skeleton className="h-4 w-64 rounded-full" />
        </div>

        {/* Card row — mirrors the carousel flex container */}
        <div className="flex gap-4 sm:gap-6 overflow-hidden">
          {Array.from({ length: count }).map((_, i) => (
            <div key={i} className="w-70 sm:w-[320px] shrink-0">
              <ProductCardSkeleton />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}