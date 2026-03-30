/**
 * @name ProductList
 * @description A reusable grid component that renders a list of products using ProductCard.
 * Handles loading, empty, and populated states cleanly.
 *
 * @composition
 * - Shows ProductGridSkeleton while loading is true.
 * - Iterates over products array and renders each with ProductCard.
 * - Displays a customizable empty state when products is empty and not loading.
 *
 * @styling
 * - Responsive grid: 2–6 columns depending on viewport; consistent gaps.
 * - Empty State: Centered dashed border container with italic muted text.
 *
 * @responsibilities
 * - Render a collection of products in a consistent grid.
 * - Show skeletons while data loads to prevent layout shift.
 * - Gracefully handle empty data with a message and refresh option.
 *
 * @usage
 *   <ProductList products={products} loading={loading} />
 */

import { motion, AnimatePresence } from "framer-motion";
import type { Product } from "../../features/dashboard/shared/types";
import { ProductCard } from "./ProductCard";
import { ProductGridSkeleton } from "./ProductGridSkeleton";

interface ProductListProps {
  products: Product[];
  loading?: boolean;
  emptyMessage?: string;
  className?: string;
}

export function ProductList({ products, loading, emptyMessage, className }: ProductListProps) {
  // Loading state — renders skeletons in the same grid layout
  if (loading) {
    return <ProductGridSkeleton count={12} className={className} />;
  }

  // Empty state
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 px-4 text-center border border-dashed border-gray-200 rounded-xl">
        <p className="text-gray-400 font-light italic tracking-wide">
          {emptyMessage}
        </p>
        <button
          onClick={() => window.location.reload()}
          className="mt-6 text-[10px] tracking-[0.2em] uppercase border-b border-black pb-1 hover:text-gray-500 hover:border-gray-500 transition-all"
        >
          Refresh Gallery
        </button>
      </div>
    );
  }

  // Populated grid with Framer Motion
  return (
    <div
      className={`grid grid-cols-2 gap-y-16 gap-x-8 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 ${className}`}
    >
      <AnimatePresence mode="popLayout">
        {products.map((product) => (
          <motion.div
            key={product._id}
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
          >
            <ProductCard
              product={product}
              isNewArrival={product.isNewArrival}
              className="w-full"
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}