import { useRef } from "react";
import { Link } from "react-router-dom";
import { useNewArrivals } from "../../../hooks/useNewArrivals";
import { NewArrivalCard } from "../components/NewArrivalCard";

export function NewArrivalsSection() {
  const { previewProducts, loading, error } = useNewArrivals();

  // reference to the scrollable div
  const scrollRef = useRef<HTMLDivElement>(null);

  // Define the scroll function logic
  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
        const { scrollLeft, clientWidth } = scrollRef.current;
        
        // calculate the scroll amount based on the width of the container
        const scrollTo = direction === "left" 
            ? scrollLeft - clientWidth 
            : scrollLeft + clientWidth;
        
        scrollRef.current.scrollTo({
            left: scrollTo,
            behavior: "smooth"
        });
    }
};

  if (loading) return <p>Loading New Arrivals...</p>;
  if (error) return <p>{error}</p>;

  return (
    <section className="w-full bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Top Bar: Title + View All */}
        <div className="relative flex flex-col items-center mb-10">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl font-semibold">New Arrivals</h2>
            <p>Discover the latest additions to our collection.</p>
          </div>
          <Link
            to="/new-arrivals"
            className="mt-4 sm:mt-0 sm:absolute sm:right-0 sm:top-1/2 sm:-translate-y-1/2 text-sm font-medium text-gray-600 hover:text-black hover:underline"
          >
            VIEW ALL →
          </Link>
        </div>

        {/* Carousel */}
        <div ref={scrollRef} className="flex gap-4 sm:gap-6 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent snap-x snap-manadatory">
          {previewProducts.map((product) => (
            <NewArrivalCard
              key={product._id}
              imageUrl={product.primaryImageUrl}
              title={product.name}
              category={product.category.name}
              price={product.price}
            />
          ))}
        </div>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden lg:flex justify-center gap-4 mt-8">
        <button
          onClick={() => scroll("left")}
          className="w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-900 hover:text-white transition-all active:scale-90"
        >
          ←
        </button>
        <button
          onClick={() => scroll("right")}
          className="w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-900 hover:text-white transition-all active:scale-90"
        >
          →
        </button>
      </div>
    </section>
  );
}
