/**
 * @name NewArrivalsSection
 * @description Displays the latest products in a high-fidelity, horizontally scrollable carousel.
 * Features an intelligent navigation system that monitors scroll position to manage UI states.
 * * @composition
 * - Employs `useRef` and `useEffect` to implement a Scroll Observer that tracks container position.
 * - Renders `ProductCard` components with snap-alignment.
 * - Provides intelligent desktop navigation and a "View All" deep link.
 * * @styling
 * - **Layout**: `snap-x` container with hidden scrollbars for a clean, app-like feel.
 * - **Visual Depth**: Implements a dynamic linear-gradient mask (Edge Fade) on the leading edge to signal overflow content.
 * - **Micro-interactions**: Navigation buttons utilize state-driven opacity and scaling to reflect scroll boundaries (Soft Dimming).
 * - **Responsive**: Mobile-first swipe behavior with distinct desktop arrow controls.
 * * @state
 * - `canScrollLeft`: Boolean triggered when `scrollLeft > 5px`.
 * - `canScrollRight`: Boolean triggered until `scrollLeft` reaches `scrollWidth - clientWidth`.
 * * @responsibilities
 * - Monitor real-time scroll events to provide visual feedback to the user.
 * - Orchestrate a smooth, non-linear scrolling experience via `scrollBy`.
 * - Gracefully handle data-fetching states (Loading/Error).
 */

import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import type { Product } from "../../../features/dashboard/shared/types";
import { ProductCard } from "../../../common/ui/ProductCard";

interface NewArrivalsSectionProps {
  products: Product[];
  loading?: boolean;
}

export function NewArrivalsSection({ products, loading }: NewArrivalsSectionProps) {

  const scrollRef = useRef<HTMLDivElement>(null);
  
  // Logic for tracking scroll position
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      // If we've scrolled more than 5px, enable left button
      setCanScrollLeft(scrollLeft > 5);
      // If we aren't at the very end, enable right button
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5);
    }
  };

  // Setup the "Observer" to watch the scroll
  useEffect(() => {
    const node = scrollRef.current;
    if (node) {
      checkScroll(); // Initial check
      node.addEventListener("scroll", checkScroll);
      window.addEventListener("resize", checkScroll); // Re-check if screen size changes
      return () => {
        node.removeEventListener("scroll", checkScroll);
        window.removeEventListener("resize", checkScroll);
      };
    }
  }, [products, loading]); // Run when products load

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { clientWidth } = scrollRef.current;
      // Scroll by 80% of the visible area so the next item is perfectly positioned
      const scrollAmount = direction === "left" ? -clientWidth * 0.8 : clientWidth * 0.8;
      
      scrollRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth"
      });
    }
  };

// Luxury Skeleton Placeholder or Loading State
if(loading) return (
  <div className="w-full bg-white py-16 text-center">
    <p className="animate-pulse text-xs tracking-[0.3em] text-gray-400 uppercase">Curating Latest Arrivals...</p>
  </div>
);

  return (
    <section className="w-full bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="relative flex flex-col items-center mb-10">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 tracking-tight">New Arrivals</h2>
            <p className="text-gray-500 mt-1">Discover the latest additions to our collection.</p>
          </div>
          <Link
            to="collections/new-arrivals"
            className="mt-4 sm:mt-0 sm:absolute sm:right-0 sm:top-1/2 sm:-translate-y-1/2 text-sm font-medium text-gray-400 hover:text-black transition-colors"
          >
            VIEW ALL →
          </Link>
        </div>

        {/* Carousel Wrapper with Edge Fade */}
        <div className="relative group">
          {/* THE EDGE FADE: A subtle gradient that hides the cutoff on the right */}
          <div 
            className={`absolute top-0 right-0 bottom-0 w-32 z-10 pointer-events-none transition-opacity duration-500 bg-linear-to-l from-white to-transparent ${canScrollRight ? 'opacity-100' : 'opacity-0'}`} 
          />

          <div 
            ref={scrollRef} 
            className="flex gap-4 sm:gap-6 overflow-x-auto pb-4 snap-x snap-mandatory no-scrollbar scroll-smooth"
          >
            {/* Native Scrollbar Hiding */}
            <style dangerouslySetInnerHTML={{__html: `
              div::-webkit-scrollbar { display: none; }
            `}} />

{products.map((product) => (
  <div key={product._id} className="w-70 sm:w-[320px] shrink-0 snap-start">
    <ProductCard
      product={product} // Pass the whole object
      isNewArrival={product.isNewArrival}
      className="w-full"
    />
  </div>
))}
          </div>
        </div>
      </div>

      {/* Navigation Buttons: The "Greyed Out" Logic */}
      <div className="hidden lg:flex justify-center gap-4 mt-8">
        <button
          onClick={() => scroll("left")}
          disabled={!canScrollLeft}
          className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-300
            ${!canScrollLeft 
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
          className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-300
            ${!canScrollRight 
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