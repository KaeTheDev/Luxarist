import { useState } from "react";

export function ProductImageGallery() {

    const images = [
        {
            id: 1,
            src: "https://ik.imagekit.io/gwbd4eva2026/products/necklaces/necklace-007-main.png",
            alt: "Necklace - main"
        },
        {
            id: 2,
            src: "https://ik.imagekit.io/gwbd4eva2026/products/necklaces/necklace-007-side.png",
            alt: "Necklace - side"
        },
        {
            id: 3,
            src: "https://ik.imagekit.io/gwbd4eva2026/products/necklaces/necklace-007-macro.png",
            alt: "Necklace - macro"
        },
        {
            id: 4,
            src: "https://ik.imagekit.io/gwbd4eva2026/products/necklaces/necklace-007-lifestyle.png ",
            alt: "Necklace - lifestyle"
        }
    ];

    const [activeIndex, setActiveIndex] = useState(0);

    return(
        <div className="w-full max-w-lg mx-auto lg:mx-0">
            {/* Main Image */}
            <div className="aspect-4/5 w-full overflow-hidden bg-gray-100 rounded-lg">
                <img src={images[activeIndex].src} alt={images[activeIndex].alt} className="h-full w-full object-cover" />
            </div>

            {/* Thumbnails */}
            <div className="mt-4 grid grid-cols-4 gap-3">
                {images.map((image, index) => (
                    <button
                    key={image.id}
                    onClick={() => setActiveIndex(index)}
                    className={`aspect-square overflow-hidden rounded-md border transition
                        ${
                          index === activeIndex
                            ? "border-black"
                            : "border-transparent hover:border-gray-400"
                        }`}
                    >
                        <img src={image.src} alt={image.alt} className="h-full w-full object-cover" />
                    </button>
                ))}
            </div>
        </div>
    );
}