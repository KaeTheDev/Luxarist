import { useState } from "react";
import type { Product } from "../../../types/Product";

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

// export function ProductImageGallery() {

//     const images = [
//         {
//             id: 1,
//             src: "https://ik.imagekit.io/gwbd4eva2026/products/necklaces/necklace-007-main.png",
//             alt: "Necklace - main"
//         },
//         {
//             id: 2,
//             src: "https://ik.imagekit.io/gwbd4eva2026/products/necklaces/necklace-007-side.png",
//             alt: "Necklace - side"
//         },
//         {
//             id: 3,
//             src: "https://ik.imagekit.io/gwbd4eva2026/products/necklaces/necklace-007-macro.png",
//             alt: "Necklace - macro"
//         },
//         {
//             id: 4,
//             src: "https://ik.imagekit.io/gwbd4eva2026/products/necklaces/necklace-007-lifestyle.png ",
//             alt: "Necklace - lifestyle"
//         }
//     ];

//     const [activeIndex, setActiveIndex] = useState(0);

//     return(
//         <div className="w-full max-w-lg mx-auto lg:mx-0">
//             {/* Main Image */}
//             <div className="aspect-4/5 w-full overflow-hidden bg-gray-100 rounded-lg">
//                 <img src={images[activeIndex].src} alt={images[activeIndex].alt} className="h-full w-full object-cover" />
//             </div>

//             {/* Thumbnails */}
//             <div className="mt-4 grid grid-cols-4 gap-3">
//                 {images.map((image, index) => (
//                     <button
//                     key={image.id}
//                     onClick={() => setActiveIndex(index)}
//                     className={`aspect-square overflow-hidden rounded-md border transition
//                         ${
//                           index === activeIndex
//                             ? "border-black"
//                             : "border-transparent hover:border-gray-400"
//                         }`}
//                     >
//                         <img src={image.src} alt={image.alt} className="h-full w-full object-cover" />
//                     </button>
//                 ))}
//             </div>
//         </div>
//     );
// }