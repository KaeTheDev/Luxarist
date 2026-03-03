/**
 * @name ProductList
 * @description A reusable grid component that renders a list of products using {@link ProductCard}.
 *  Handles empty states gracefully and provides a responsive, multi-column layout for product galleries.
 * 
 * @composition
 * - Iterates over a `products` array and renders each item with {@link ProductCard}.
 * - Displays a customizable empty state message with a "Refresh Gallery" button when no products are available.
 * - Grid layout adapts across screen sizes using responsive Tailwind classes.
 * 
 * @styling
 * - **Layout**: Responsive grid with 2–6 columns depending on viewport; consistent gaps between items.
 * - **Empty State**: Centered dashed border container with italic, muted text.
 * - **Typography**: Light and italic for empty state messages; uppercase, tracked button text for refresh action.
 * - **Interaction**: Refresh button triggers `window.location.reload()`; hover effects on empty state button for subtle feedback.
 * 
 * @responsibilities
 * - Render a collection of products in a visually appealing, consistent grid.
 * - Gracefully handle empty data by showing a message and refresh option.
 * - Delegate individual product rendering to {@link ProductCard}.
 * - Allow layout customization via optional `className` prop.
 * 
 * @usage
 * - Pass a `products` array as a required prop.
 * - Optionally pass `emptyMessage` to customize the empty state text.
 * - Optionally pass `className` to adjust grid container styling.
 * - Ideal for product listing pages, category pages, or featured product sections.
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
                isNewArrival={product.isNewArrival}
                // Note: We don't pass a width like 'w-72' here. 
                // The grid-cols will dictate the width automatically.
                className="w-full"
                />
            ))}
        </div>
    );
}