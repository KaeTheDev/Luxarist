/**
 * @name Homepage
 * @description The primary landing destination for the Luxarist brand. 
 * Orchestrates a series of high-impact sections into a cohesive storytelling 
 * experience, moving the user from broad brand awareness to specific product discovery.
 * * @features
 * - **Modular Composition**: Serves as a clean entry point that delegates all UI 
 * complexity to specialized sub-components (Hero, Collections, etc.).
 * - **Conversion Funnel**: Strategically ordered to build trust (Hero/Collections), 
 * showcase craftsmanship (Signature), drive urgency (New Arrivals), and 
 * establish long-term retention (Brand Promise/Newsletter).
 * - **Fragment Wrapper**: Uses React Fragments (`<>`) to return a clean vertical 
 * stack without adding unnecessary DOM nodes to the document tree.
 * * @styling
 * - **Visual Rhythm**: Alternates between "Pure White" and "Luxury Black/Gray" 
 * section backgrounds to create a rhythmic, high-end editorial scrolling experience.
 * - **SEO Optimization**: Acts as the semantic core of the site, ensuring critical 
 * keywords and collection links are indexed immediately upon page load.
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