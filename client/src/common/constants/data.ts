/**
 * File: data.ts
 * Purpose:
 *  Provides a centralized list of product categories with both display names
 *  and URL-friendly slugs for use across the frontend.
 *
 * Responsibilities:
 *  - Maintain a consistent mapping of category names to their corresponding slugs.
 *  - Serve as the source of truth for navigation menus, filters, and category pages.
 *  - Facilitate dynamic routing and linking without hardcoding category values in multiple components.
 *
 * Usage:
 *  - Import `categories` to populate navigation menus, dropdowns, or category filters.
 *  - Use the display name (`[0]`) for UI rendering.
 *  - Use the slug (`[1]`) for URL paths, routing, or API queries.
 *  - Easily extend or reorder categories by updating this array.
 */

export const categories: readonly [string, string][] = [
    ["Bracelets", "bracelets"],
    ["Earrings", "earrings"],
    ["Necklaces", "necklaces"],
    ["Rings", "rings"],
    ["Watches", "watches"],
  ];