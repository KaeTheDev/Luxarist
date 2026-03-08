import { Star, Share2 } from "lucide-react";
import { ProductVariantSelector, type ProductCategory } from "./ProductVariantSelector";
import { QuantitySelector } from "../../../common/ui/QuantitySelector";

interface ActionProps {
  product: any;
  selectedVariant: string | null;
  setSelectedVariant: (v: string | null) => void;
  isFavorited: boolean;
  onFavorite: () => void;
  onShare: () => void;
}

export function ProductActions({ product, selectedVariant, setSelectedVariant, isFavorited, onFavorite, onShare }: ActionProps) {
  const isOneSize = !product.sizes || product.sizes.length === 0;
  const isButtonDisabled = !isOneSize && !selectedVariant;
  const showSizeGuide = ["ring", "watch", "bracelet", "necklace"].includes(product.category.slug.toLowerCase()) && !isOneSize;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <ProductVariantSelector
          sizes={product.sizes || []}
          category={product.category.slug.toLowerCase() as ProductCategory}
          selectedValue={selectedVariant}
          onSelect={setSelectedVariant}
        />
        {showSizeGuide && (
          <button className="flex items-center gap-2 text-xs text-gray-500 underline hover:text-black w-fit mt-1">
            <div className="w-4 h-px bg-gray-300 rotate-135"></div>
            Size Guide
          </button>
        )}
      </div>

      <div className="flex flex-col gap-3">
        <span className="text-sm font-medium uppercase tracking-widest text-[10px]">Quantity</span>
        <QuantitySelector />
      </div>

      <div className="flex flex-col gap-3">
        <button disabled={isButtonDisabled} className="w-full py-4 bg-black text-white hover:bg-gray-800 transition disabled:bg-gray-200 disabled:text-gray-400 font-medium uppercase tracking-widest text-xs">
          {isButtonDisabled ? "Please Select a Size" : "Add to Cart"}
        </button>

        <div className="grid grid-cols-2 gap-3">
          <button onClick={onFavorite} className="flex items-center justify-center gap-2 py-3 bg-gray-100 hover:bg-gray-200 text-sm font-medium text-gray-700">
            <Star size={18} className={isFavorited ? "text-yellow-500 fill-yellow-500" : "text-gray-400"} />
            {isFavorited ? "Saved" : "Save"}
          </button>
          <button onClick={onShare} className="flex items-center justify-center gap-2 py-3 bg-gray-100 hover:bg-gray-200 text-sm font-medium text-gray-700">
            <Share2 size={18} className="text-gray-400" /> Share
          </button>
        </div>
      </div>
    </div>
  );
}