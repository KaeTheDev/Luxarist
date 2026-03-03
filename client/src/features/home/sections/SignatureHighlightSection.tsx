/**
 * @name SignatureHighlightSection
 * @description A visually striking section highlighting a signature product from the collection.
 *  Combines an image, headline, descriptive text, and a call-to-action button to drive navigation.
 * 
 * @composition
 * - Uses `useNavigate` from `react-router-dom` for programmatic navigation.
 * - Displays a featured image with smooth hover scale effects.
 * - Includes headline, subheading, descriptive paragraph, and a CTA button.
 * - Button navigates users to a specific product detail page (`/product/necklace`).
 * 
 * @styling
 * - **Layout**: Responsive grid layout (1–2 columns) with gap and padding adjustments.
 * - **Typography**: Clear hierarchy with tracking and font weight for luxury branding.
 * - **Interaction**: Hover effects on image and button for subtle, elegant feedback.
 * - **Colors**: Light gray background with black accents for text and buttons.
 * 
 * @responsibilities
 * - Highlight a key product from the collection in a visually appealing way.
 * - Encourage users to click through to the product detail page.
 * - Ensure responsive display across mobile, tablet, and desktop.
 * 
 * @usage
 * - Import and render as part of a landing page or product showcase page.
 * - Ensure routing context is available (wrapped in `BrowserRouter`) for `useNavigate`.
 * - Example:
 *      <SignatureHighlightSection />
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