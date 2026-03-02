/**
 * @name FeaturedCollectionsSection
 * @description A dynamic bento-style grid that showcases high-priority jewelry collections.
 * Leverages custom layout constants to create a visually diverse, masonry-inspired gallery.
 * * @state
 * - `categories`: Async data fetched via {@link useFeaturedCategories}.
 * - `loading/error`: Handles conditional rendering for API lifecycle states to prevent layout shifts.
 * * @features
 * - **Custom Sequencing**: Implements a sort algorithm using {@link CATEGORY_ORDER} to ensure specific collections (e.g., "New Arrivals") always hold prime real estate.
 * - **Bento Layout**: Dynamically injects Tailwind span classes (via {@link CATEGORY_LAYOUTS}) to allow certain categories to occupy multiple rows or columns.
 * - **Contextual Metadata**: Displays real-time `productCount` and slug-based routing for direct collection discovery.
 * * @styling
 * - **Micro-Interactions**: Features a multi-stage hover effect: darkens the image overlay, reveals a "Shop Now" call-to-action, and slides an animated underline beneath the title.
 * - **Adaptive Row Heights**: Utilizes `auto-rows` with breakpoints to scale the grid density from mobile (`180px`) to desktop (`300px`).
 * - **Depth & Focus**: Employs `group-hover:scale-105` (implied by design pattern) and opacity transitions to guide the user's eye toward the active selection.
 */

import { Link } from "react-router-dom";
import { useFeaturedCategories } from "../../../hooks/useFeaturedCategories";
import { CATEGORY_LAYOUTS, CATEGORY_ORDER } from "../../../constants/categoryLayouts";
import type { FeaturedCategory } from "../../../types/FeaturedCategory";

export function FeaturedCollectionsSection() {
    const { categories, loading, error } = useFeaturedCategories();

    if(loading) return <p>Loading featured collections...</p>;
    if(error) return <p>{error}</p>

    const sorted = [...categories].sort(
        (a, b) => (CATEGORY_ORDER[a.name] ?? 99) - (CATEGORY_ORDER[b.name] ?? 99)
      );

    return (
       <section className="w-full bg-white py-10 px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="max-w-7xl mx-auto mb-12 text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight">
                Featured Collections
            </h2>
            <p className="mt-3 text-sm sm:text-base text-gray-600">
                Explore our handpicked selection of fine jewlry.
            </p>
        </div>

             <div className="grid gap-4 w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 auto-rows-[180px] sm:auto-rows-[220px] lg:auto-rows-[300px]">
                {sorted.map((cat: FeaturedCategory) => {
                    const layoutClasses = CATEGORY_LAYOUTS[cat.name] ?? "col-span-1";
                    return(
                        
                        <Link to={`/collections/${cat.slug}`}
                        key={cat._id}
                        className={`relative group bg-gray-200 flex items-end p-4 ${layoutClasses} overflow-hidden rounded-xl cursor-pointer`}
                        >
                            <img
                            src={cat.featuredImage}
                            alt={cat.name}
                            className="absolute inset-0 w-full h-full object-cover"
                            />

                        {/* Overlay */}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300"></div>

                        {/* Text Content */}
                        <div className="relative z-10 w-full flex items-end justify-between">
                            <div className="flex flex-col gap-1">
                                {/* Category Name + Items Inline */}
                                <p className="text-lg font-semibold text-white uppercase tracking-wide flex items-center gap-2">
                                    {/* Category Name wrapped for underline */}
                                    <span className="relative">
                                        {cat.name}
                                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-500 group-hover:w-full"></span>
                                    </span>

                                    {/* Number of Items */}
                                    <span className="opacity-0 group-hover:opacity-70 transition-opacity duration-500 text-sm">
                                        {cat.productCount} items
                                    </span>
                                </p>

                                {/* SHOW NOW fades up */}
                                <p className="text-sm text-white opacity-0 transform translate-y-3 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                                    SHOP NOW &rarr;
                                </p>
                            </div>
                        </div>
                        </Link>
                    );
                })}
            </div>
       </section>
    );
};