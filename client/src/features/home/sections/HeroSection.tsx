/**
 * @name HeroSection
 * @description The primary visual entry component for the homepage.
 * Establishes brand tone through immersive media and directs users toward product discovery.
 *
 * @features
 * - **Responsive Media Switching**: Renders a looping background video on large screens and a fallback image on smaller viewports.
 * - **Primary Conversion Path**: Includes a CTA button that programmatically navigates to the `/collections` route.
 * - **Contrast Management**: Applies a semi-transparent overlay to ensure consistent text readability across varying media.
 *
 * @interaction
 * - Uses `react-router-dom` navigation hooks to enable client-side routing without page reload.
 *
 * @styling
 * - **Layout**: Full-width hero with viewport-relative height scaling across breakpoints.
 * - **Typography**: Scaled heading and body text with tight tracking for a refined, luxury aesthetic.
 * - **Motion**: Subtle hover scale and color inversion on CTA for tactile feedback.
 */

import { useNavigate } from "react-router-dom";

export function HeroSection() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/collections");
  };

  return (
    <section className="relative w-full h-[70vh] md:h-[85vh] lg:h-screen overflow-hidden">
      {/* Video Background for Desktop */}
      <video
        className="hidden lg:block absolute top-0 left-0 w-full h-full object-cover"
        src="https://ik.imagekit.io/gwbd4eva2026/hero.mp4"
        autoPlay
        muted
        loop
        playsInline
      />

      {/* Image fallback for tablet & mobile */}
      <img
        className="block lg:hidden absolute top-0 left-0 w-full h-full object-cover"
        src="https://ik.imagekit.io/gwbd4eva2026/hero/hero.png"
        alt="Hero"
      />

      {/* Overlay for contrast */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/40"></div>

      {/* Text and button in bottom-left corner */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center text-center lg:items-start lg:justify-end lg:text-left lg:bottom-16 lg:left-16 lg:inset-auto z-10 w-full lg:max-w-xl px-6 lg:px-0 text-white space-y-4">
       <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-tight">
          Luxury in Every Detail
        </h1>
        <p className="text-sm md:text-base lg:text-lg">
          Discover refinement across every piece in our exclusive collection.
        </p>
        <button
          onClick={handleClick}
           className="mt-4 px-8 py-3 bg-white text-black rounded-full font-medium
          hover:bg-black hover:text-white hover:scale-105 transition-all duration-300 ease-in-out"
        >
          Shop the Collection
        </button>
      </div>
    </section>
  );
}