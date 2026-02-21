import { Navbar } from "./common/layout/navigation/Navbar";
import { FeaturedCollectionsSection } from "./features/home/sections/FeaturedCollectionsSection";
import { HeroSection } from "./features/home/sections/HeroSection";

function App() {
  return (
    <>
    <Navbar />
    <HeroSection />
    <FeaturedCollectionsSection />
    </>
  );
};

export default App