/**
 * File: useCarousel.ts
 * Purpose:
 *  Provides a reusable custom hook to enable horizontal carousel functionality
 *  for any scrollable container. Abstracts the logic for smooth left/right
 *  scrolling in a clean, reusable interface.
 *
 * Responsibilities:
 *  - Expose a `ref` (`containerRef`) to attach to the scrollable container element.
 *  - Provide `next` and `prev` functions to scroll the container by its visible width.
 *  - Handle smooth scrolling behavior without requiring additional boilerplate in components.
 *
 * Usage:
 *  - Attach `containerRef` to a scrollable container (e.g., a div containing cards or images).
 *  - Call `next()` to scroll forward and `prev()` to scroll backward.
 *  - Can be used in product carousels, testimonial sliders, or any horizontally scrollable list.
 *  - Example:
 *      const { containerRef, next, prev } = useCarousel();
 *      <div ref={containerRef}>...</div>
 *      <button onClick={prev}>Prev</button>
 *      <button onClick={next}>Next</button>
 */

import { useRef } from "react";

export function useCarousel() {
    const containerRef = useRef<HTMLDivElement>(null);

    const next = () => {
        if(!containerRef.current) return;
        containerRef.current.scrollBy({
            left: containerRef.current.offsetWidth,
            behavior: "smooth",
        });
    };

    const prev = () => {
        if(!containerRef.current) return;
        containerRef.current.scrollBy({
            left: -containerRef.current.offsetWidth,
            behavior: "smooth",
        });
    };

    return { containerRef, next, prev };
}