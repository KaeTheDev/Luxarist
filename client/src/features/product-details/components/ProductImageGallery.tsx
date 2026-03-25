import { useState } from "react";
import type { Product } from "../../dashboard/shared/types";

interface ProductImageGalleryProps {
    product: Product
};

export function ProductImageGallery({ product }: ProductImageGalleryProps) {
    // Create the array. If galleryImageUrls is empty, it just becomes [primaryImageUrl]
    const allImages = [
        product.primaryImageUrl,
        ...(product.galleryImageUrls || [])
    ].filter(Boolean); // Removes any null/undefined values

    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <div className="w-fill max-w-lg mx-auto lg:mx-0">
            {/* Main Image Container */}
            <div className="aspect-4/5 w-full overflow-hidden bg-gray-50 rounded-lg border border-gray-100 shadow-sm">
            <img 
                    src={allImages[activeIndex] || product.primaryImageUrl} 
                    alt={product.name} 
                    className="h-full w-full object-cover transition-opacity duration-500" 
                />
            </div>
            {/* Thumbnails - ONLY renders if you actually have more than 1 image */}
            {allImages.length > 1 && (
                <div className="mt-4 grid grid-cols-4 gap-3">
                    {allImages.map((src, index) => (
                         <button
                         key={index}
                         onClick={() => setActiveIndex(index)}
                         className={`aspect-square overflow-hidden rounded-md border-2 transition-all
                             ${index === activeIndex
                                 ? "border-black"
                                 : "border-transparent hover:border-gray-300"
                             }`}
                     >
                         <img src={src} alt="" className="h-full w-full object-cover" />
                     </button>
                    ))}
                </div>
            )}
        </div>
    );
}