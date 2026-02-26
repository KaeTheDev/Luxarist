import { useState } from "react";

interface NewArrivalCardProps {
    imageUrl: string;
    title: string;
    category: string;
    price: number; 
}

export function NewArrivalCard({ imageUrl, title, category, price }: NewArrivalCardProps) {
    const [isFavorite, setIsFavorite] = useState(false);

    return (
        <div className="group relative flex flex-col w-72 shrink-0 overflow-hidden rounded-xl border border-gray-100 bg-white transition-all duration-500 hover:shadow-2xl hover:shadow-gray-200/50 snap-start">
            
            {/* Favorite Button */}
            <button 
                onClick={(e) => {
                    e.preventDefault();
                    setIsFavorite(!isFavorite);
                }} 
                className="absolute right-4 top-4 z-20 p-2 rounded-full bg-white/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
            >
                <svg 
                    width="18" 
                    height="18" 
                    viewBox="0 0 24 24" 
                    fill={isFavorite ? "currentColor" : "none"} 
                    stroke="currentColor" 
                    strokeWidth="1.5" 
                    className={isFavorite ? "text-yellow-500" : "text-gray-400"}
                >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
            </button>

            {/* Image Container: Forced Ratio ensures all cards are the same height */}
            <div className="aspect-4/5 overflow-hidden bg-[#f9f9f9]">
                <img 
                    src={imageUrl} 
                    alt={title} 
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" 
                />
            </div>

            {/* Content Area */}
            <div className="flex flex-col p-5 space-y-1">
                <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-gray-400">
                    {category}
                </span>
                
                {/* Fixed height or line-clamp prevents one card from being taller than others */}
                <h3 className="text-base font-medium text-gray-900 leading-tight h-10 line-clamp-2">
                    {title}
                </h3>
                
                <p className="pt-2 text-sm font-light text-gray-500 tracking-wide">
                    ${price.toLocaleString()}
                </p>
            </div>
        </div>
    );
}