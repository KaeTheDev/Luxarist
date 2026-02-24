import { Navbar } from "./common/layout/navigation/Navbar";
import { FeaturedCollectionsSection } from "./features/home/sections/FeaturedCollectionsSection";
import { HeroSection } from "./features/home/sections/HeroSection";
// import { NewArrivalCard } from "./features/home/sections/NewArrivalCard";
import { SignatureHighlightSection } from "./features/home/sections/SignatureHighlightSection";
import { NewArrivalsSection } from "./features/home/sections/NewArrivalsSection";

function App() {
  return (
    <>
    <Navbar />
    <HeroSection />
    <FeaturedCollectionsSection />
    <SignatureHighlightSection />
  <NewArrivalsSection />
    </>
  );
};

export default App