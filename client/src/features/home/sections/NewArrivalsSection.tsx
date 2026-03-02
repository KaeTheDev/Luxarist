/**
 * @name NewArrivalsSection
 * @description A horizontal carousel component showcasing the latest product additions. 
 * Combines smooth programmatic scrolling with native touch-swipe capabilities for a premium browsing experience.
 * * @state
 * - `products`: Async data subset filtered by `isNewArrival: true` via {@link useProducts}.
 * - `scrollRef`: A {@link useRef} hook targeting the scrollable container to calculate and trigger lateral movement.
 * * @features
 * - **Hybrid Navigation**: Supports standard touch gestures through `snap-x` and `snap-mandatory` while providing explicit button controls for desktop users.
 * - **Programmatic Scrolling**: Logic-driven `scroll` function that calculates `clientWidth` to ensure the carousel advances exactly one "viewport" per click.
 * - **Clean UI**: Implements a custom CSS injection to hide scrollbars across all major browsers (Webkit, Firefox, IE) to maintain a minimalist aesthetic.
 * * @styling
 * - **Responsive Geometry**: Utilizes `min-w-[320px]` on card wrappers to ensure consistent card sizing within the flex-overflow container.
 * - **Interaction Design**: Desktop navigation arrows feature a "Dark Mode" inversion on hover and a tactile `active:scale-95` feedback loop.
 * - **Layout Composition**: Uses absolute positioning for the "VIEW ALL" link on larger screens to keep the header centered while maximizing utility.
 */

import { useRef } from "react";
import { Link } from "react-router-dom";
import { useProducts } from "../../../hooks/useProducts";
import { ProductCard } from "../../../common/ui/ProductCard";

export function NewArrivalsSection() {
  const { products, loading, error } = useProducts({ isNewArrival: true, limit: 8 });
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
        const { scrollLeft, clientWidth } = scrollRef.current;
        const scrollTo = direction === "left" 
            ? scrollLeft - clientWidth 
            : scrollLeft + clientWidth;
        
        scrollRef.current.scrollTo({
            left: scrollTo,
            behavior: "smooth"
        });
    }
  };

  if (loading) return <p className="text-center py-20 font-light">Loading New Arrivals...</p>;
  if (error) return <p className="text-center py-20 text-red-500">{error}</p>;

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
            to="/new-arrivals"
            className="mt-4 sm:mt-0 sm:absolute sm:right-0 sm:top-1/2 sm:-translate-y-1/2 text-sm font-medium text-gray-400 hover:text-black transition-colors"
          >
            VIEW ALL →
          </Link>
        </div>

        <div 
          ref={scrollRef} 
          className="flex gap-4 sm:gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }} // Hides scrollbar in Firefox/IE
        >
          {/* Webkit scrollbar hide for Chrome/Safari */}
          <style dangerouslySetInnerHTML={{__html: `
            div::-webkit-scrollbar { display: none; }
          `}} />

          {products.map((product) => (
            <div key={product._id} className="min-w-70 sm:min-w-[320px] snap-start">
              <ProductCard
                id={product._id}
                imageUrl={product.primaryImageUrl}
                title={product.name}
                category={product.category.name}
                price={product.price}
                className="w-full"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Desktop Navigation: Keeps the arrows for mouse users */}
      <div className="hidden lg:flex justify-center gap-4 mt-8">
        <button
          onClick={() => scroll("left")}
          className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-black hover:text-white hover:border-black transition-all active:scale-95"
          aria-label="Previous"
        >
          ←
        </button>
        <button
          onClick={() => scroll("right")}
          className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-black hover:text-white hover:border-black transition-all active:scale-95"
          aria-label="Next"
        >
          →
        </button>
      </div>
    </section>
  );
}