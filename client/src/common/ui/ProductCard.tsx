/**
 * @name ProductCard
 * @description A high-fidelity preview component for individual jewelry pieces. 
 * Designed for use within product grids, featuring a vertical "portrait" aspect ratio and interactive states.
 * * @state
 * - `isFavorite`: A boolean toggle for the "star" icon. Prevents event bubbling to the parent navigation link via `e.stopPropagation()`.
 * * @features
 * - **Deep Linking**: Wraps core visuals in a {@link Link} to provide instantaneous routing to the Product Detail page.
 * - **Dynamic Formatting**: Utilizes `toLocaleString()` for price rendering to ensure professional currency presentation.
 * - **Visual Hierarchy**: Features a structured metadata stack (Category > Title > Price) using varied typography scales.
 * * @styling
 * - **Hover Orchestration**: Implements a dual-layer transition: scales the internal `img` while lifting the card with a `hover:shadow-2xl` effect.
 * - **Conditional Visibility**: The favorite button uses `lg:opacity-0` to remain hidden on desktop until hovered, maintaining a clean aesthetic.
 * - **Aspect Ratio**: Locked to `aspect-4/5` to ensure consistent grid alignment regardless of the source image's original dimensions.
 */

import { useState } from "react";
import { Link } from "react-router-dom";

interface ProductCardProps {
  id: string; // handles navigation TODO: make the ID use a slug later on
  imageUrl: string;
  title: string;
  category: string;
  price: number;
  className?: string; // Added for layout flexibility
}

export function ProductCard({
  id,
  imageUrl,
  title,
  category,
  price,
  className,
}: ProductCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <div
      className={`group relative flex flex-col shrink-0 overflow-hidden rounded-2xl border border-gray-100 bg-white transition-all duration-500 hover:shadow-2xl hover:shadow-gray-200/50 ${className}`}
    >
      {/* Favorite Button: Added e.stopPropagation() so clicking it doesn't trigger the Link */}
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsFavorite(!isFavorite);
        }}
        className="absolute right-4 top-4 z-20 p-2 rounded-full bg-white/80 backdrop-blur-sm lg:opacity-0 lg:group-hover:opacity-100 transition-transform duration-300 hover:scale-110"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill={isFavorite ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth="1.5"
          className={isFavorite ? "text-yellow-500" : "text-gray-400"}
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      </button>

      {/* Link wrapper: Makes the image and text clickable */}
      <Link to={`/products/${id}`} className="flex flex-col h-full">
        {/* Image Container */}
        <div className="aspect-4/5 overflow-hidden bg-[#fafafa]">
          <img
            src={imageUrl}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </div>

        {/* Content Area */}
        <div className="flex flex-col p-6 space-y-2">
          <span className="text-[11px] font-medium uppercase tracking-widest text-gray-400">
            {category}
          </span>
          <h3 className="text-base font-light text-gray-900 leading-snug line-clamp-2">
            {title}
          </h3>
          <p className="text-sm font-medium text-gray-700 tracking-wide mt-1">
            ${price.toLocaleString()}
          </p>
        </div>
      </Link>
    </div>
  );
}