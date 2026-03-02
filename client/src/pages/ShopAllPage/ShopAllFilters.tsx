/**
 * @name ShopAllFilters
 * @description A high-level navigation and sorting bar specifically for the global "Shop All" view. 
 * Facilitates rapid switching between product categories through a "Pill-based" filter system.
 * * @state
 * - `isMenuOpen`: Manages the responsive visibility of the category selection drawer on mobile devices.
 * * @features
 * - **Category Switching**: Implements a horizontal list of buttons that toggle the `activeCategory` state, instantly updating the parent's data query.
 * - **Conditional Rendering**: Dynamically applies high-contrast styling (`bg-black text-white`) to the currently selected filter for immediate visual feedback.
 * - **Overlay Select Pattern**: Uses a hidden native `<select>` element over a custom-styled div to ensure mobile-friendly sorting while maintaining a minimalist aesthetic.
 * - **Mobile Optimization**: Collapses the category list into a single "Browse Categories" toggle on small viewports to save vertical screen real estate.
 * * @styling
 * - **Brutalist Palette**: Pairs soft neutrals (`#F5F5F5`) with industrial grays (`#D9D9D9`) to create a structural, luxury workspace feel.
 * - **Typography**: Leverages 10px font sizes with significant letter-spacing (`tracking-[0.2em]`) to maintain a clean, high-fashion editorial look.
 * - **Responsive Flex**: Shifts from a centered vertical stack on mobile to a spaced-between horizontal row on desktop (`md:flex-row`).
 */

import { useState } from "react";

interface ShopAllFiltersProps {
    categories: string[];
    activeCategory: string;
    onCategoryChange: (category: string) => void;
    sort: string;
    onSortChange: (sort: string) => void;
}

export function ShopAllFilters({
  categories,
  activeCategory,
  onCategoryChange,
  sort,
  onSortChange,
}: ShopAllFiltersProps) {
  
  // USE STATE: To toggle a "Show All Categories" drawer on mobile
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="flex flex-col md:flex-row justify-between items-center py-8 border-b border-gray-100 gap-6">
      
      {/* MOBILE TOGGLE (Only visible on small screens) */}
      <button 
        className="md:hidden w-full bg-[#D9D9D9] py-4 uppercase tracking-widest text-xs font-bold"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        {isMenuOpen ? "Close Categories" : "Browse Categories"}
      </button>

      {/* LEFT: Category Pills (Hidden on mobile unless isMenuOpen is true) */}
      <div className={`${isMenuOpen ? "flex" : "hidden"} md:flex flex-wrap justify-center md:justify-start gap-3`}>
        <button
          onClick={() => onCategoryChange("all")}
          className={`px-8 py-3 text-[10px] uppercase tracking-[0.2em] ${
            activeCategory === "all" ? "bg-black text-white font-bold" : "bg-[#F5F5F5] text-gray-500"
          }`}
        >
          All
        </button>

        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => onCategoryChange(cat)}
            className={`px-8 py-3 text-[10px] uppercase tracking-[0.2em] ${
              activeCategory === cat ? "bg-black text-white font-bold" : "bg-[#F5F5F5] text-gray-500"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* RIGHT: Sort Dropdown */}
      <div className="relative min-w-45">
      <div className="flex items-center justify-between gap-4 bg-[#D9D9D9] px-6 py-3 cursor-pointer">
            <span className="uppercase tracking-[0.2em] text-[10px] font-bold">Sort By</span>
            <span className="text-[8px]">▼</span>
            </div>
            <select
          value={sort}
          onChange={(e) => onSortChange(e.target.value)}
          className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
        >
          <option value="newest">Newest</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
          <option value="popular">Most Popular</option>
        </select>
      </div>
    </div>
  );
}