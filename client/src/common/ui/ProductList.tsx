/**
 * @name ProductList
 * @description A high-performance responsive grid container for rendering collections of {@link ProductCard} components.
 * Automatically adapts its column count based on viewport width to maintain an optimal jewelry-browsing experience.
 * * @features
 * - **Graceful Degradation**: Implements a dedicated "Empty State" with a dashed-border UI if the products array is empty.
 * - **Data Mapping**: Transforms raw product data into the specific props required by the child cards (mapping `_id` to `id`, `name` to `title`, etc.).
 * - **Dynamic Column Scaling**: Transitions from 2 columns on mobile to a wide 6-column layout on Ultra-HD screens (`2xl`).
 * * @styling
 * - **Spacing Logic**: Uses `gap-y-16` to provide significant vertical breathing room between product rows, maintaining a luxury feel.
 * - **Grid Layout**: Relies on CSS Grid's `grid-cols` utility to dictate child widths rather than hardcoding pixel values.
 * - **Fallback Interaction**: Includes a minimalist "Refresh Gallery" trigger for manual state recovery during zero-result filter queries.
 */

import type { Product } from "../../types/Product";
import { ProductCard } from "./ProductCard";

interface ProductListProps {
    products: Product[];
    emptyMessage?: string;
    className?: string;
}

export function ProductList({ products, emptyMessage, className }: ProductListProps) {
    // Handle Empty State
    if(products.length === 0) {
    return (
        <div className="flex flex-col items-center justify-center py-24 px-4 text-center border border-dashed border-gray-200 rounded-xl">
            <p className="text-gray-400 font-light italic tracking-wide">{emptyMessage}</p>
            <button onClick={()=> window.location.reload()} className="mt-6 text-10px tracking-0 2em uppercase border-b border-black pb-1 hover:text-gray-500 hover:border-gray-500 transition-all">
                Refresh Gallery
            </button>
        </div>
    );
}

    // Render Grid
    return (
<div className={`grid grid-cols-2 gap-y-16 gap-x-8 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 ${className}`}>
            {products.map((product) => (
                <ProductCard 
                key={product._id}
                id={product._id}
                imageUrl={product.primaryImageUrl}
                title={product.name}
                category={product.category.name}
                price={product.price}
                // Note: We don't pass a width like 'w-72' here. 
                // The grid-cols will dictate the width automatically.
                className="w-full"
                />
            ))}
        </div>
    );
}