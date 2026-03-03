/**
 * File: categoryLayouts.ts
 * Purpose:
 *  Provides centralized layout and ordering information for product categories
 *  in grid-based collections or category pages. This ensures consistent visual
 *  presentation across the frontend.
 *
 * Responsibilities:
 *  - `CATEGORY_LAYOUTS`: Defines Tailwind CSS grid classes for each category,
 *    controlling column/row spans and starting positions in responsive layouts.
 *  - `CATEGORY_ORDER`: Assigns a numeric order to categories for sorting or rendering
 *    in a specific sequence.
 *  - Enable flexible and maintainable category layouts without hardcoding in multiple components.
 *
 * Usage:
 *  - Import `CATEGORY_LAYOUTS` when rendering category grids to apply proper Tailwind classes.
 *  - Import `CATEGORY_ORDER` to sort categories consistently before rendering.
 *  - Easily update layout or order by modifying this centralized file.
 */

export const CATEGORY_LAYOUTS: Record<string, string> = {
    Bracelet:  "col-span-1 sm:col-span-2 lg:col-span-2 lg:row-span-2 lg:col-start-1 lg:row-start-1",
    Earrings:   "col-span-1 sm:col-span-2 lg:col-span-2 lg:row-span-1 lg:col-start-3 lg:row-start-1",
    Ring:      "col-span-1 sm:col-span-1 lg:col-span-1 lg:row-span-1 lg:col-start-3 lg:row-start-2",
    Necklace:  "col-span-1 sm:col-span-1 lg:col-span-1 lg:row-span-1 lg:col-start-4 lg:row-start-2",
    Watch:    "col-span-1 sm:col-span-2 lg:col-span-4 lg:row-span-1 lg:col-start-1 lg:row-start-3",
  };
  
  export const CATEGORY_ORDER: Record<string, number> = {
    Bracelet: 0,
    Earrings: 1,
    Ring: 2,
    Necklace: 3,
    Watch: 4,
  };