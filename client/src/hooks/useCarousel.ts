/**
 * File: useCarousel.ts
 * Purpose: 
 * A reusable logic hook that provides programmatic scroll control for 
 * horizontal content containers, such as product carousels and image galleries.
 *
 * Responsibilities:
 * - Manage a persistent reference (useRef) to a scrollable HTML div element.
 * - Calculate precise horizontal displacement based on the container's current visible width (offsetWidth).
 * - Execute smooth, native browser-based scrolling transitions for "Next" and "Previous" actions.
 * - Provide a clean, abstracted interface for UI components to trigger movement without manual DOM calculations.
 *
 * Usage:
 * - Employed within the NewArrivalsSection to power the desktop navigation arrows.
 * - Can be attached to any flex-overflow container to enable "slide" functionality.
 * - Works in tandem with CSS snap-points to ensure cards align perfectly after the scroll animation.
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