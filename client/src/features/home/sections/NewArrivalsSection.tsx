/**
 * @name NewArrivalsSection
 * @description Displays the latest products added to the collection in a horizontally scrollable carousel.
 *  Fetches new arrival products using the `useProducts` hook and allows both swipe and button navigation.
 * 
 * @composition
 * - Uses `useProducts` to fetch the 8 most recent products.
 * - Uses `useRef` to create a scrollable container for the carousel.
 * - Renders `ProductCard` components inside a horizontally scrollable area.
 * - Provides desktop navigation buttons for scrolling left and right.
 * - Includes a "View All" link to navigate to the full new arrivals page.
 * 
 * @styling
 * - **Layout**: Responsive flexbox with gap, overflow-x scrolling, and snap alignment for smooth carousel behavior.
 * - **Typography**: Clean hierarchy with bold headlines and muted descriptive text.
 * - **Interaction**: Scrollable carousel with smooth scroll behavior; hover effects for navigation buttons.
 * - **Accessibility**: Buttons include `aria-label` for screen readers.
 * 
 * @responsibilities
 * - Showcase new arrivals prominently on the page.
 * - Enable smooth horizontal scrolling with both mouse and touch input.
 * - Handle loading and error states from the `useProducts` hook.
 * - Maintain responsive design across all viewport sizes.
 * 
 * @usage
 * - Import and render within a landing page or homepage component.
 * - Example:
 *      <NewArrivalsSection />
 * - Ensure routing context (`BrowserRouter`) is available for the "View All" link.
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