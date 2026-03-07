export type ProductCategory =
  | "ring"
  | "necklace"
  | "bracelet"
  | "watch"
  | "earrings";

interface ProductVariantSelectorProps {
  category: ProductCategory;
  sizes: string[];
  selectedValue: string | null;
  onSelect: (val: string) => void;
}

export function ProductVariantSelector({
  category,
  sizes,
  selectedValue,
  onSelect,
}: ProductVariantSelectorProps) {
  // Define the labels (Record<string, string>)
  const labels: Record<string, string> = {
    ring: "Select Ring Size",
    necklace: "Select Chain Length",
    bracelet: "Select Bracelet Size",
    watch: "Select Case Size",
    earrings: "Size",
  };

  const currentLabel = labels[category] || "Select Size";

  // Check the 'sizes' array passed from the database
  if (!sizes || sizes.length === 0) {
    return (
      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium">{currentLabel}</span>
        <span className="text-sm text-gray-500 italic">One Size Fits All</span>
      </div>
    );
  }

  // Handle the "Selectable" cases (Rings, Bracelets, Earrings, Watches, Necklaces.)
  return (
    <div className="flex flex-col gap-3">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium">{currentLabel}</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {sizes.map((option) => (
          <button
            key={option}
            type="button" // Prevent accidental form submission
            onClick={() => onSelect(option)}
            className={`
                          min-w-12.5 px-4 py-2 text-sm border transition-all duration-200
                          ${
                            selectedValue === option
                              ? "border-black bg-black text-white font-medium"
                              : "border-gray-200 hover:border-gray-400 text-gray-800"
                          }
                      `}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}