/**
 * @name NewArrivalsSection
 * @description Displays the latest products in a horizontally scrollable carousel.
 * Features an intelligent navigation system that monitors scroll position.
 * Shows a CarouselSkeleton while products are loading.
 *
 * @composition
 * - Shows CarouselSkeleton while loading is true.
 * - Employs useRef and useEffect for a Scroll Observer.
 * - Renders ProductCard components with snap-alignment.
 */

import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import type { Product } from "../../../features/dashboard/shared/types";
import { ProductCard } from "../../../common/ui/ProductCard";
import { CarouselSkeleton } from "../../../common/ui/CarouselSkeleton";

interface NewArrivalsSectionProps {
  products: Product[];
  loading?: boolean;
}

export function NewArrivalsSection({ products, loading }: NewArrivalsSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 5);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5);
    }
  };

  useEffect(() => {
    const node = scrollRef.current;
    if (node) {
      checkScroll();
      node.addEventListener("scroll", checkScroll);
      window.addEventListener("resize", checkScroll);
      return () => {
        node.removeEventListener("scroll", checkScroll);
        window.removeEventListener("resize", checkScroll);
      };
    }
  }, [products, loading]);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { clientWidth } = scrollRef.current;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -clientWidth * 0.8 : clientWidth * 0.8,
        behavior: "smooth",
      });
    }
  };

  // Skeleton while loading
  if (loading) return <CarouselSkeleton count={4} />;

  return (
    <section className="w-full bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="relative flex flex-col items-center mb-10">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 tracking-tight">
              New Arrivals
            </h2>
            <p className="text-gray-500 mt-1">
              Discover the latest additions to our collection.
            </p>
          </div>
          <Link
            to="collections/new-arrivals"
            className="mt-4 sm:mt-0 sm:absolute sm:right-0 sm:top-1/2 sm:-translate-y-1/2 text-sm font-medium text-gray-400 hover:text-black transition-colors"
          >
            VIEW ALL →
          </Link>
        </div>

        {/* Carousel with Edge Fade */}
        <div className="relative group">
          <div
            className={`absolute top-0 right-0 bottom-0 w-32 z-10 pointer-events-none transition-opacity duration-500 bg-linear-to-l from-white to-transparent ${
              canScrollRight ? "opacity-100" : "opacity-0"
            }`}
          />
          <div
            ref={scrollRef}
            className="flex gap-4 sm:gap-6 overflow-x-auto pb-4 snap-x snap-mandatory no-scrollbar scroll-smooth"
          >
            <style dangerouslySetInnerHTML={{ __html: `div::-webkit-scrollbar { display: none; }` }} />
            {products.map((product) => (
              <div key={product._id} className="w-70 sm:w-[320px] shrink-0 snap-start">
                <ProductCard
                  product={product}
                  isNewArrival={product.isNewArrival}
                  className="w-full"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation buttons */}
      <div className="hidden lg:flex justify-center gap-4 mt-8">
        <button
          onClick={() => scroll("left")}
          disabled={!canScrollLeft}
          className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-300 ${
            !canScrollLeft
              ? "border-gray-100 text-gray-200 cursor-not-allowed scale-95"
              : "border-gray-200 text-gray-400 hover:bg-black hover:text-white hover:border-black active:scale-90"
          }`}
          aria-label="Previous"
        >
          ←
        </button>
        <button
          onClick={() => scroll("right")}
          disabled={!canScrollRight}
          className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-300 ${
            !canScrollRight
              ? "border-gray-100 text-gray-200 cursor-not-allowed scale-95"
              : "border-gray-200 text-gray-400 hover:bg-black hover:text-white hover:border-black active:scale-90"
          }`}
          aria-label="Next"
        >
          →
        </button>
      </div>
    </section>
  );
}