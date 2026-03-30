/**
 * Purpose: Skeleton placeholder for the SignatureHighlightSection.
 * Mirrors the two-column grid layout — image left, text right — to
 * prevent layout shift while site content loads from the backend.
 *
 * Usage:
 *   // In SignatureHighlightSection:
 *   if (loading) return <SignatureHighlightSkeleton />;
 */

import { Skeleton } from "./Skeleton";

export function SignatureHighlightSkeleton() {
  return (
    <section
      aria-busy="true"
      aria-label="Loading signature collection"
      className="w-full bg-gray-50 py-28 px-6 lg:px-16"
    >
      {/* Header block — centered above the grid */}
      <div className="mx-auto mb-20 max-w-5xl flex flex-col items-center gap-4">
        <Skeleton className="h-3 w-32 rounded-full" />
        <Skeleton className="h-10 w-2/3 rounded-full" />
        <Skeleton className="h-10 w-1/2 rounded-full" />
      </div>

      {/* Two-column grid */}
      <div className="mx-auto grid max-w-6xl grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center">

        {/* LEFT: Image */}
        <Skeleton className="aspect-square w-full rounded-2xl" />

        {/* RIGHT: Text content */}
        <div className="flex flex-col gap-5">
          {/* Eyebrow */}
          <Skeleton className="h-3 w-28 rounded-full" />
          {/* Subheading h3 */}
          <Skeleton className="h-9 w-3/4 rounded-full" />
          {/* Body text — 3 lines */}
          <Skeleton className="h-4 w-full rounded-full" />
          <Skeleton className="h-4 w-5/6 rounded-full" />
          <Skeleton className="h-4 w-4/5 rounded-full" />
          {/* CTA button */}
          <Skeleton className="h-12 w-40 rounded-full mt-2" />
        </div>

      </div>
    </section>
  );
}