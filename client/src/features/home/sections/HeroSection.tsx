/**
 * @name HeroSection
 * @description The primary visual entry component for the homepage.
 * Establishes brand tone through immersive media and directs users toward product discovery.
 *
 * @features
 * - Dynamic Content: Fetches video URL, fallback image, heading, body text, and CTA
 *   from the backend via useSiteContent — all editable by an admin without code changes.
 * - Responsive Media Switching: Renders a looping background video on large screens
 *   and a fallback image on smaller viewports.
 * - Falls back to hardcoded defaults if the API is unavailable.
 */

import { useNavigate } from "react-router-dom";
import { useSiteContent } from "../../../hooks/useSiteContent";

export function HeroSection() {
  const navigate = useNavigate();
  const { hero, loading } = useSiteContent();

  const handleClick = () => {
    navigate(hero.ctaLink || "/collections");
  };

  // Show nothing while loading to avoid a flash of default content
  if (loading) return (
    <div className="relative w-full h-[70vh] md:h-[85vh] lg:h-screen bg-black" />
  );

  return (
    <section className="relative w-full h-[70vh] md:h-[85vh] lg:h-screen overflow-hidden">

      {/* Video — desktop only */}
      <video
        className="hidden lg:block absolute top-0 left-0 w-full h-full object-cover"
        src={hero.videoUrl}
        autoPlay
        muted
        loop
        playsInline
      />

      {/* Fallback image — tablet and mobile */}
      <img
        className="block lg:hidden absolute top-0 left-0 w-full h-full object-cover"
        src={hero.fallbackImageUrl}
        alt="Hero"
      />

      {/* Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/40" />

      {/* Text + CTA */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center lg:items-start lg:justify-end lg:text-left lg:bottom-16 lg:left-16 lg:inset-auto z-10 w-full lg:max-w-xl px-6 lg:px-0 text-white space-y-4">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-tight">
          {hero.heading}
        </h1>
        <p className="text-sm md:text-base lg:text-lg">
          {hero.bodyText}
        </p>
        <button
          onClick={handleClick}
          className="mt-4 px-8 py-3 bg-white text-black rounded-full font-medium hover:bg-black hover:text-white hover:scale-105 transition-all duration-300 ease-in-out"
        >
          {hero.ctaText}
        </button>
      </div>

    </section>
  );
}