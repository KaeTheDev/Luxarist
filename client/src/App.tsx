import { Navbar } from "./common/layout/navigation/Navbar";
import { FeaturedCollectionsSection } from "./features/home/sections/FeaturedCollectionsSection";
import { HeroSection } from "./features/home/sections/HeroSection";
import { SignatureHighlightSection } from "./features/home/sections/SignatureHighlightSection";
import { NewArrivalsSection } from "./features/home/sections/NewArrivalsSection";
import { BrandPromiseSection } from "./features/home/sections/BrandPromiseSection";
import { NewsletterSection } from "./features/home/sections/NewsletterSection";

function App() {
  return (
    <>
    <Navbar />
    <HeroSection />
    <FeaturedCollectionsSection />
    <SignatureHighlightSection />
    <NewArrivalsSection />
    <BrandPromiseSection />
    <NewsletterSection />
    </>
  );
};

export default App