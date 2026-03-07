import { useState } from "react";
import { QuantitySelector } from "../../../common/ui/QuantitySelector";
import { ProductVariantSelector, type ProductCategory } from "./ProductVariantSelector";
import type { Product } from "../../../types/Product";

interface ProductInformationProps {
    product: Product;
}

export function ProductInformation({ product }: ProductInformationProps) {
    // Initialize state to track the user's selection
    const [selectedVariant, setSelectedVariant] = useState<string | null>(null);

    // Determine if the product is "One Size" (like earrings)
    const isOneSize = !product.sizes || product.sizes.length === 0;

    // Logic for the Action Button
    // Disable only if it's NOT one-size AND nothing is selected
    const isButtonDisabled = !isOneSize && !selectedVariant;

    return (
        <div className="flex flex-col gap-8 w-full max-w-xl">
            {/* Product Header */}
            <div className="flex flex-col gap-1">
                <span className="text-xs tracking-widest text-gray-500 uppercase">
                    {product.category.name}
                </span>
                <h1 className="text-2xl font-semibold">{product.name}</h1>
                <p className="text-lg font-medium mt-2">${product.price}</p>
            </div>

            <div className="border-t border-gray-100"></div>

            {/* Pass the data into the Selector */}
            <ProductVariantSelector 
            sizes={product.sizes || []}
            category={product.category.slug.toLowerCase() as ProductCategory}
            selectedValue={selectedVariant}
            onSelect={(value) => setSelectedVariant(value)}
            />

            {/* Quantity & Actions */}
            <div className="flex flex-col gap-2">
                <span className="text-sm font-medium">Quantity</span>
                <QuantitySelector />
            </div>

            <button
              className="w-full py-4 bg-black text-white hover:bg-gray-800 transition disabled:bg-gray-200 disabled:text-gray-500 font-medium"
              disabled={isButtonDisabled}
            >
              {isButtonDisabled ? 'Please Select a Size' : 'Add to Cart'}
            </button>

            {/* Product Details Table */}
            <div className="text-sm space-y-4 border-t pt-6">
                <p className="font-bold text-gray-800 uppercase tracking-widest text-[10px]">Product Details</p>
                <div className="grid grid-cols-2 gap-y-3">
                    <span className="text-gray-500">SKU:</span>
                    <span className="text-gray-800 font-medium">{product.sku}</span>

                    <span className="text-gray-500">Material:</span>
                    <span className="text-gray-800 font-medium capitalize">{product.material}</span>

                    {/* Gemstone and Weight display */}
                    <span className="text-gray-500">Gemstone:</span>
                    <span className="text-gray-800 font-medium capitalize">{product.gemstoneType || 'None'}</span>

                    <span className="text-gray-500">Weight:</span>
                    <span className="text-gray-800 font-medium">{product.weightPreset || 'N/A'}</span>
                </div>

                <div className="flex flex-col">
                       {/* ICON GOES HERE */}
                <div className="flex flex-row">
                    <div className="flex flex-col">
                        <p>Certified Authority</p>
                        <p>Comes with a certificate of authenticity and GIA grading report.</p>
                    </div>
                </div>

                <div className="flex flex-row">
                    {/* ICON GOES HERE */}
                    <div className="flex flex-col">
                        <p>Lifetime Warranty</p>
                        <p>Comprehensive coverage for manufacturing defects.</p>
                    </div>
                </div>
                </div>
            </div>
        </div>
    );
}