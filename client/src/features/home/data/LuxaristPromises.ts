/**
 * File: luxaristPromises.ts
 * Purpose:
 *  Provides a centralized list of brand promises for Luxarist to be displayed
 *  across the frontend, highlighting craftsmanship, guarantees, shipping, and authenticity.
 *
 * Responsibilities:
 *  - Maintain a structured array of brand promises with `title`, `text`, and `iconUrl`.
 *  - Ensure consistency in messaging and visual representation across pages or components.
 *  - Serve as a single source of truth for all UI elements that showcase brand commitments.
 *
 * Usage:
 *  - Import `luxaristPromises` into components such as homepage sections, landing pages, or feature highlights.
 *  - Map over the array to dynamically render each promise with its associated icon and description.
 *  - Easily extend, update, or reorder promises by editing this array in one place.
 */

export const luxaristPromises = [
    {
        id: 1,
        title: "Handcrafted Excellence",
        text: "Each piece is meticulously crafted by master artisans with decades of experience in fine jewelry making.",
        iconUrl: "/assets/icons/icon-sparkle.svg"
    },

    {
        id: 2,
        title: "Lifetime Guarantee",
        text: "We stand behind our craftsmanship with a comprehensive lifetime warranty on all our jewelry pieces.",
        iconUrl: "/assets/icons/icon-shield.svg"
    },

    {
        id: 3,
        title: "Complimentary Shipping",
        text: "Enjoy free expedited shipping on all orders, with secure packing and full insurance coverage.",
        iconUrl: "/assets/icons/icon-gift.svg"
    },

    {
        id: 4,
        title: "Certified Authority",
        text: "Every piece comes with a certificate of authenticity, ensuring genuine materials and ethical sourcing.",
        iconUrl: "/assets/icons/icon-seal.svg"
    },
];