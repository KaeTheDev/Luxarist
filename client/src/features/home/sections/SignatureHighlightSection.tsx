/**
 * @name SignatureHighlightSection
 * @description A high-impact "Spotlight" section designed to showcase a single flagship product. 
 * Combines editorial-style typography with large-scale imagery to drive deep-funnel conversion.
 * * @features
 * - **Strategic Navigation**: Utilizes `useNavigate` to provide a high-performance programmatic transition to a specific product detail page.
 * - **Two-Column Asymmetry**: Pairs a high-resolution visual anchor with a concentrated content block to create a balanced, professional "Lookbook" feel.
 * - **Interactive Visuals**: Features a subtle image scale transition (`hover:scale-105`) to create a sense of tactile depth on user interaction.
 * * @styling
 * - **Typography Layering**: Employs an 11px uppercase "eyebrow" label with heavy tracking (`0.35em`) to establish a luxury brand hierarchy.
 * - **Neutral Palette**: Uses a `bg-gray-50` backdrop to provide a soft, sophisticated contrast against the white components of the main site body.
 * - **Minimalist CTA**: Implements a "Ghost-to-Solid" button transition, shifting from a thin black border to a full black fill on hover for a clean, modern aesthetic.
 */

import { useNavigate } from "react-router-dom";

export function SignatureHighlightSection() {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/product/necklace');
    }

  return (
    <section className="w-full bg-gray-50 py-28 px-6 lg:px-16">
      <div className="mx-auto mb-20 max-w-5xl text-center">
        <p className="text-[11px] font-medium tracking-[0.35em] text-gray-500">
          SIGNATURE COLLECTION
        </p>
        <h2 className="mt-4 text-4xl lg:text-5xl font-semibold tracking-tight leading-tight">
          The Necklace That Defines the Brand
        </h2>
      </div>

      <div className="mx-auto grid max-w-6xl grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center">
        <div className="overflow-hidden rounded-2xl">
          <img
            src="https://ik.imagekit.io/gwbd4eva2026/misc/signature.png"
            alt="Signature Piece"
            className="w-full h-full object-cover transition duration-700 hover:scale-105"
          />
        </div>

        <div className="space-y-6 text-center md:text-left">
          <span className="text-xs tracking-[0.3em] text-gray-500">
            TIMELESS ELEGANCE
          </span>

          <h3 className="text-3xl lg:text-4xl font-semibold leading-tight">
            Luxury Necklace
          </h3>

          <p className="text-gray-600 text-base leading-relaxed max-w-lg mx-auto md:mx-0">
            Experience timeless elegance and unmatched craftsmanship, designed
            to elevate every moment.
          </p>

          <button onClick={handleClick} className="rounded-full border border-black px-8 py-3 text-sm font-medium tracking-wide transition-all duration-300 hover:bg-black hover:text-white">
            View Necklace
          </button>
        </div>
      </div>
    </section>
  );
}