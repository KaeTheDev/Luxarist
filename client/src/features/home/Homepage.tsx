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