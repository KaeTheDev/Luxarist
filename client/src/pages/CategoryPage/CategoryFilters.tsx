/**
 * @name CategoryFilters
 * @description A high-utility control bar for product discovery. Provides a 
 * "blocky" industrial aesthetic that allows users to sort and filter collections 
 * via a centralized state management pattern.
 * * @state
 * - `minPrice` / `maxPrice`: Local numeric states that mirror the filter inputs before syncing to the parent.
 * - `sort`: Tracks the active ordering preference (e.g., "Newest", "Price: Low to High").
 * - `isFilterOpen`: A boolean toggle controlling the visibility of the absolute-positioned price range panel.
 * * @features
 * - **State Synchronization**: Uses a {@link useEffect} hook to automatically bubble local filter changes up to the parent component, triggering a new API fetch.
 * - **Native Select Overlay**: Implements an "Invisible Select" pattern where a hidden native `<select>` overlays a custom-styled div for a consistent look with native accessibility.
 * - **Input Validation**: Features `handlePriceChange` logic to strip negative values and handle empty string transitions gracefully.
 * - **Pagination Reset**: Automatically resets the page counter to 1 whenever a filter is modified to ensure users don't get stuck on empty pages.
 * * @styling
 * - **Brutalism-Lite Aesthetic**: Utilizes a specific `#D9D9D9` background with heavy tracking (`0.25em`) to create a bold, structural luxury feel.
 * - **Z-Index Layering**: Employs `z-50` on the filter dropdown to ensure the price panel floats above product images and cards.
 * - **Layout Composition**: Uses a `justify-between` flex container to anchor the Sort and Filter actions to the opposite edges of the content grid.
 */

import { useState, useEffect } from "react";

export interface FiltersState {
  minPrice?: number;
  maxPrice?: number;
  sort?: "newest" | "price_asc" | "price_desc" | "name_asc" | "name_desc";
  page?: number;
  limit?: number;
}

interface CategoryFiltersProps {
  filters: FiltersState;
  setFilters: (filters: FiltersState) => void;
  totalProducts?: number;
}

export function CategoryFilters({
  filters,
  setFilters,
}: CategoryFiltersProps) {
  const [minPrice, setMinPrice] = useState<number | "">("");
  const [maxPrice, setMaxPrice] = useState<number | "">("");
  const [sort, setSort] = useState<FiltersState["sort"]>("newest");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Prevent negative numbers
  const handlePriceChange = (value: string, setter: (v: number | "") => void) => {
    if (value === "") return setter("");
    const num = Number(value);
    if (num >= 0) setter(num);
  };

  useEffect(() => {
    setFilters({
      ...filters,
      minPrice: minPrice === "" ? undefined : minPrice,
      maxPrice: maxPrice === "" ? undefined : maxPrice,
      sort,
      page: 1,
    });
  }, [minPrice, maxPrice, sort]);

  return (
    <div className="flex w-full items-center justify-between relative">
      
      {/* Left: Sort By*/}
      <div className="relative group">
        <div className="flex items-center gap-8 bg-[#D9D9D9] px-10 py-5 cursor-pointer hover:bg-gray-300 transition-colors min-w-50">
          <span className="uppercase tracking-[0.25em] text-[12px] font-bold">Sort By</span>
          <span className="text-[10px]">▼</span>
        </div>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as FiltersState["sort"])}
          className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
        >
          <option value="newest">Newest</option>
          <option value="price_asc">Price: Low → High</option>
          <option value="price_desc">Price: High → Low</option>
          <option value="name_asc">Name: A → Z</option>
          <option value="name_desc">Name: Z → A</option>
        </select>
      </div>

      {/* Right: Filters With Dropdown */}
      <div className="relative">
        <div 
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="flex items-center gap-8 bg-[#D9D9D9] px-10 py-5 cursor-pointer hover:bg-gray-300 transition-colors min-w-50 justify-between"
        >
          <span className="uppercase tracking-[0.25em] text-[12px] font-bold">Filters</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2">
            <path d="M4 6H20M7 12H17M10 18H14" />
          </svg>
        </div>

        {/* Price Filter Dropdown Panel */}
        {isFilterOpen && (
          <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 shadow-xl z-50 p-6">
            <h4 className="text-[10px] uppercase tracking-widest font-bold mb-4">Price Range</h4>
            <div className="flex items-center gap-2">
              <input
                type="number"
                placeholder="Min"
                min="0"
                value={minPrice}
                onChange={(e) => handlePriceChange(e.target.value, setMinPrice)}
                className="w-full px-3 py-2 border border-gray-200 text-sm focus:outline-none focus:border-black"
              />
              <span className="text-gray-400">-</span>
              <input
                type="number"
                placeholder="Max"
                min="0"
                value={maxPrice}
                onChange={(e) => handlePriceChange(e.target.value, setMaxPrice)}
                className="w-full px-3 py-2 border border-gray-200 text-sm focus:outline-none focus:border-black"
              />
            </div>
            <button 
              onClick={() => setIsFilterOpen(false)}
              className="w-full mt-4 bg-black text-white text-[10px] uppercase tracking-widest py-3 hover:bg-gray-800 transition-colors"
            >
              Apply
            </button>
          </div>
        )}
      </div>
    </div>
  );
}