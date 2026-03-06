// Define the valid categories as a type
type Category = 'ring' | 'necklace' | 'bracelet' | 'watch' | 'earrings';

interface ProductVariantSelectorProps {
    category: Category; 
    selectedValue: string | null;
    onSelect: (val: string) => void;
  }

export function ProductVariantSelector({ category, selectedValue, onSelect }: ProductVariantSelectorProps){

    // Define the options for each category
    const options: Record<string, string[]> = {
        ring: ["5", "6", "7", "8", "9", "10"],
        necklace: ["16\"", "18\"", "20\"", "24\""],
        bracelet: ["6.5\"", "7.0\"", "7.5\"", "8.0\""],
        watch: ["38mm", "40mm", "42mm", "44mm"],
        earrings: [] // Empty because they are "One Size"
    };

      // Define the labels (Record<string, string>)
    const labels: Record<string, string> = {
    ring: "Select Ring Size",
    necklace: "Select Chain Length",
    bracelet: "Select Bracelet Size",
    watch: "Select Case Size",
    earrings: "Size"
  };

  const currentOptions = options[category] || [];
  const currentLabel = labels[category] || "Select Size";

  // Handle the "One Size" case (Earrings)
  if(currentOptions.length === 0) {
    return (
        <div className="flex flex-col gap-2">
            <span className="text-sm font-medium">{currentLabel}</span>
            <span className="text-sm text-gray-500 italic">One Size Fits All</span>
        </div>
    );
  }

  // Handle the "Selectable" cases (Rings, Bracelets, etc.)
  return (
    <div className="flex flex-col gap-3">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium">{currentLabel}</span>
        {(category === "ring" || category === "bracelet") && (
          <button className="text-xs text-gray-500 underline hover:text-black">
            Size Guide
          </button>
        )}
      </div>
      
      <div className="flex flex-wrap gap-2">
        {currentOptions.map((option) => (
          <button
            key={option}
            onClick={() => onSelect?.(option)}
            className={`
              min-w-12.5 px-4 py-2 text-sm border transition-all duration-200
              ${selectedValue === option 
                ? "border-black bg-black text-white font-medium" 
                : "border-gray-200 hover:border-gray-400 text-gray-800"}
            `}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};