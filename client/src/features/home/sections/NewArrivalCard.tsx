import { useState } from "react";

interface NewArrivalCardProps {
    imageUrl: string;
    title: string;
    category: string;
    price: number; 
}

export function NewArrivalCard({ imageUrl, title, category, price}: NewArrivalCardProps) {
    const [isFavorite, setIsFavorite] = useState(false);
    return (
        <div className="group relative flex flex-col w-64 shrink-0 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all hover:shadow-xl hover:-translate-y-1 snap-start">
                {/* Save Icon (Star) */}
                <button onClick={() => setIsFavorite(!isFavorite)} className={`absolute right-3 top-3 z-20 text-xl transition-colors ${
                    isFavorite ? "text-yellow-400" : "text-gray-400 hover:text-yellow-400"
                }`}>
                {isFavorite ? "★" : "☆"}
                </button>

                {/* Image */}
                <div className="aspect-square overflow-hidden bg-gray-50">
                    <img src={imageUrl} alt={title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                </div>

                {/* Content */}
                <div className="flex flex-col p-4">
                    <p className="mt-1 font-semibold text-lg leading-tight line-clamp-2">
                        {title}
                    </p>
                    <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                        {category}
                    </h3>
                    <p className="mt-2 text-sm font-medium text-gray-600">${price.toLocaleString()}</p>
                </div>
        </div>
    );
};