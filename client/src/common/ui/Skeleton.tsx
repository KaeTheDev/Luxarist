/**
 * Purpose: Base shimmer skeleton block. The single source of truth for all
 * skeleton styles across the app — consistent color, animation, and border radius.
 *
 * Responsibilities:
 * - Render a single animate-pulse shimmer block.
 * - Accept className for size and shape customization.
 * - Maintain aria-hidden so screen readers skip skeleton content.
 *
 * Usage:
 *   <Skeleton className="h-4 w-32 rounded-lg" />
 *   <Skeleton className="aspect-4/5 w-full rounded-2xl" />
 */

interface SkeletonProps {
    className?: string;
  }
  
  export function Skeleton({ className = "" }: SkeletonProps) {
    return (
      <div
        aria-hidden="true"
        className={`animate-pulse bg-stone-100 ${className}`}
      />
    );
  }