import { Navbar } from "./common/layout/navigation/Navbar";
import { FeaturedCollectionsSection } from "./features/home/sections/FeaturedCollectionsSection";
import { HeroSection } from "./features/home/sections/HeroSection";
import { SignatureHighlightSection } from "./features/home/sections/SignatureHighlightSection";

function App() {
  return (
    <>
    <Navbar />
    <HeroSection />
    <FeaturedCollectionsSection />
    <SignatureHighlightSection />
    </>
  );
};

export default App