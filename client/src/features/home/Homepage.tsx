/**
 * @name Homepage
 * @description The main landing page of the website, assembling all primary sections in order.
 *  Provides a curated, scrollable experience that introduces the brand, featured collections, new arrivals, and core brand promises.
 * 
 * @composition
 * - Combines multiple section components: 
 *      `HeroSection`, `FeaturedCollectionsSection`, `SignatureHighlightSection`, 
 *      `NewArrivalsSection`, `BrandPromiseSection`, and `NewsletterSection`.
 * - Sections are rendered in a sequential layout for a cohesive homepage experience.
 * 
 * @styling
 * - **Layout**: Vertical stacking of full-width sections with responsive spacing and padding.
 * - **Typography & Visuals**: Inherited from individual sections to maintain a luxury brand aesthetic.
 * - **Interaction**: Each section manages its own interactivity, including carousels, buttons, and hover effects.
 * 
 * @responsibilities
 * - Serve as the central landing experience for visitors.
 * - Coordinate all major homepage sections into a single, scrollable view.
 * - Ensure consistent styling and responsive design across sections.
 * 
 * @usage
 * - Import and render at the root route (`/`) of the application.
 * - Example:
 *      <Homepage />
 */

import { HeroSection } from "./sections/HeroSection";
import { FeaturedCollectionsSection } from "./sections/FeaturedCollectionsSection";
import { SignatureHighlightSection } from "./sections/SignatureHighlightSection";
import { NewArrivalsSection } from "./sections/NewArrivalsSection";
import { BrandPromiseSection } from "./sections/BrandPromiseSection";
import { NewsletterSection } from "./sections/NewsletterSection";

export function Homepage() {
  return (
    <>
      <HeroSection />
      <FeaturedCollectionsSection />
      <SignatureHighlightSection />
      <NewArrivalsSection />
      <BrandPromiseSection />
      <NewsletterSection />
    </>
  );
}