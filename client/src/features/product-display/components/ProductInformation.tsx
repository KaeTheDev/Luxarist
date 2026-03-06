import { useState } from "react";
import { QuantitySelector } from "../../../common/ui/QuantitySelector";
import { ProductVariantSelector } from "./ProductVariantSelector";
import type { Product } from "../../../types/Product";

interface ProductInformationProps {
    product: Product;
}

export function ProductInformation({ product }: ProductInformationProps) {
    // Initialize state to track the user's selection
    const [selectedVariant, setSelectedVariant] = useState<string | null>(null);

    return (
        <div className="flex flex-col gap-8 w-full max-w-xl">
            {/* Product Header */}
            <div className="flex flex-col gap-1">
                <span className="text-xs tracking-widest text-gray-500 uppercase">
                    {/* Accessing the nested category name from the Global Type */}
                    {product.category.name}
                </span>
                <h1 className="text-2xl font-semibold">{product.name}</h1>
                <p className="text-lg font-medium mt-2">${product.price}</p>
            </div>

            <div className="border-t border-gray-100"></div>

            {/* Pass the data into the Selector */}
            <ProductVariantSelector 
            category={product.category.name as any}
            selectedValue={selectedVariant}
            onSelect={(value) => setSelectedVariant(value)}
            />

            {/* Quantity & Actions */}
            <div className="flex flex-col gap-2">
                <span className="text-sm font-medium">Quantity</span>
                <QuantitySelector />
            </div>

            <button
              className="w-full py-4 bg-black text-white hover:bg-gray-800 transition disabled:bg-gray-300"
              disabled={product.category.name !== 'earrings' && !selectedVariant}
            >
              {selectedVariant || product.category.name === 'earrings' ? 'Add to Cart' : 'Please Select a Size'}
            </button>

            {/* Product Details Table */}
            <div className="text-sm space-y-2 border-t pt-6">
                <p className="font-bold text-gray-800 uppercase tracking-tight">Product Details</p>
                <div className="grid grid-cols-2 gap-y-2">
                    <span className="text-gray-500">SKU:</span>
                    <span className="text-gray-800 font-medium">{product.sku || 'N/A'}</span>

                    <span className="text-gray-500">Material:</span>
                    <span className="text-gray-800 font-medium">{product.material || 'N/A'}</span>
                </div>
            </div>
        </div>
    );
}