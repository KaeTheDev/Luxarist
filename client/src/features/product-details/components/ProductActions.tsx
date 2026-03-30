/**
 * Purpose: Renders the primary purchase actions on the product detail page.
 *
 * Responsibilities:
 * - Manage local quantity state and pass it to QuantitySelector.
 * - Call addItem from CartContext when "Add to Cart" is clicked.
 * - Call openCart immediately after addItem so the drawer slides out as feedback.
 * - Disable the Add to Cart button until a size is selected (when sizes exist).
 * - Render favorite and share secondary actions.
 * - Show a brief "Added!" confirmation on the button after a successful addItem.
 *
 * Usage:
 *   <ProductActions
 *     product={product}
 *     selectedVariant={selectedVariant}
 *     setSelectedVariant={setSelectedVariant}
 *     isFavorited={isFavorited}
 *     onFavorite={onFavorite}
 *     onShare={onShare}
 *   />
 */

import { useState } from "react";
import { Star, Share2, ShoppingBag, Check } from "lucide-react";
import { ProductVariantSelector, type ProductCategory } from "./ProductVariantSelector";
import { QuantitySelector } from "../../../common/ui/QuantitySelector";
import { useCart } from "../../../context/CartContext";
import type { Product } from "../../dashboard/shared/types";
 
interface ActionProps {
  product: Product;
  selectedVariant: string | null;
  setSelectedVariant: (v: string | null) => void;
  isFavorited: boolean;
  onFavorite: () => void;
  onShare: () => void;
}
 
export function ProductActions({ product, selectedVariant, setSelectedVariant, isFavorited, onFavorite, onShare }: ActionProps) {
  const { addItem, openCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
 
  const isOneSize = !product.sizes || product.sizes.length === 0;
  const isButtonDisabled = !isOneSize && !selectedVariant;
  const showSizeGuide =
    ["ring", "watch", "bracelet", "necklace"].includes(
      product.category?.slug?.toLowerCase() ?? ""
    ) && !isOneSize;
 
  const handleAddToCart = () => {
    if (isButtonDisabled) return;
 
    addItem({
      productId: product._id,
      name: product.name,
      price: product.price,
      image: product.primaryImageUrl,
      slug: product.slug ?? "",
      selectedSize: selectedVariant,
      quantity,
    });
 
    // Open the cart drawer immediately as visual feedback
    openCart();
 
    // Brief button confirmation flash
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };
 
  return (
    <div className="flex flex-col gap-6">
 
      {/* Size selector */}
      <div className="flex flex-col gap-2">
        <ProductVariantSelector
          sizes={product.sizes || []}
          category={(product.category?.slug?.toLowerCase() ?? "ring") as ProductCategory}
          selectedValue={selectedVariant}
          onSelect={setSelectedVariant}
        />
        {showSizeGuide && (
          <button className="flex items-center gap-2 text-xs text-gray-500 underline hover:text-black w-fit mt-1">
            <div className="w-4 h-px bg-gray-300 rotate-135" />
            Size Guide
          </button>
        )}
      </div>
 
      {/* Quantity */}
      <div className="flex flex-col gap-3">
        <span className="text-sm font-medium uppercase tracking-widest text-[10px]">
          Quantity
        </span>
        <QuantitySelector value={quantity} onChange={setQuantity} />
      </div>
 
      {/* Actions */}
      <div className="flex flex-col gap-3">
        <button
          onClick={handleAddToCart}
          disabled={isButtonDisabled}
          className={`w-full py-4 flex items-center justify-center gap-2 font-medium uppercase tracking-widest text-xs transition-all duration-300 ${
            added
              ? "bg-green-600 text-white"
              : isButtonDisabled
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-black text-white hover:bg-gray-800"
          }`}
        >
          {added ? (
            <>
              <Check size={16} />
              Added to Cart
            </>
          ) : (
            <>
              <ShoppingBag size={16} />
              {isButtonDisabled ? "Please Select a Size" : "Add to Cart"}
            </>
          )}
        </button>
 
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={onFavorite}
            className="flex items-center justify-center gap-2 py-3 bg-gray-100 hover:bg-gray-200 text-sm font-medium text-gray-700"
          >
            <Star
              size={18}
              className={isFavorited ? "text-yellow-500 fill-yellow-500" : "text-gray-400"}
            />
            {isFavorited ? "Saved" : "Save"}
          </button>
          <button
            onClick={onShare}
            className="flex items-center justify-center gap-2 py-3 bg-gray-100 hover:bg-gray-200 text-sm font-medium text-gray-700"
          >
            <Share2 size={18} className="text-gray-400" />
            Share
          </button>
        </div>
      </div>
 
    </div>
  );
}