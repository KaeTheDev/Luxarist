import { useState, useEffect } from "react";

export interface FiltersState {
  minPrice?: number;
  maxPrice?: number;
  sort?: "newest" | "price_asc" | "price_desc" | "name_asc" | "name_desc";
}

interface CategoryFiltersProps {
  onFilterChange: (filters: FiltersState) => void;
  totalProducts?: number;
}

export function CategoryFilters({
  onFilterChange,
  totalProducts,
}: CategoryFiltersProps) {
  const [minPrice, setMinPrice] = useState<number | "">("");
  const [maxPrice, setMaxPrice] = useState<number | "">("");
  const [sort, setSort] = useState<FiltersState["sort"]>("newest");

  // Call onFilterChange whenever filters change
  useEffect(() => {
    const parsedMin = minPrice === "" ? undefined : Number(minPrice);
    const parsedMax = maxPrice === "" ? undefined : Number(maxPrice);

    onFilterChange({
      minPrice: parsedMin,
      maxPrice: parsedMax,
      sort,
    });
  }, [minPrice, maxPrice, sort]);

  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6 px-4 md:px-0">
      {/* Left: Price Filter */}
      <div className="flex items-center gap-2">
        <label className="text-sm font-medium text-gray-600">Price:</label>
        <input
          type="number"
          placeholder="Min"
          value={minPrice}
          onChange={(e) =>
            setMinPrice(e.target.value === "" ? "" : Number(e.target.value))
          }
          className="w-20 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400"
        />
        <span className="text-gray-400">-</span>
        <input
          type="number"
          placeholder="Max"
          value={maxPrice}
          onChange={(e) =>
            setMaxPrice(e.target.value === "" ? "" : Number(e.target.value))
          }
          className="w-20 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400"
        />
      </div>

      {/* Right: Sort */}
      <div className="flex items-center gap-2">
        <label className="text-sm font-medium text-gray-600">Sort by:</label>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as FiltersState["sort"])}
          className="px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400"
        >
          <option value="newest">Newest</option>
          <option value="price_asc">Price: Low → High</option>
          <option value="price_desc">Price: High → Low</option>
          <option value="name_asc">Name: A → Z</option>
          <option value="name_desc">Name: Z → A</option>
        </select>
      </div>
      {/* Optional: Product Count */}
      {totalProducts !== undefined && (
        <div className="mt-2 md:mt-0 text-sm text-gray-500">
          {totalProducts} item{totalProducts !== 1 ? "s" : ""}
        </div>
      )}
    </div>
  );
}