/**
 * @name SignatureHighlightSection
 * @description A visually striking section highlighting a signature product.
 * All text and image content is fetched dynamically from the backend via
 * useSiteContent — fully editable by an admin without touching code.
 *
 * @features
 * - Dynamic Content: eyebrow, heading, subheading, body text, CTA text,
 *   and image all come from the SiteContent document.
 * - Product Link: if a productId is set in SiteContent, the CTA navigates
 *   to that product's detail page. Falls back to /collections.
 */

import { useNavigate } from "react-router-dom";
import { useSiteContent } from "../../../hooks/useSiteContent";

export function SignatureHighlightSection() {
  const navigate = useNavigate();
  const { signature, loading } = useSiteContent();

  if (loading) return null;

  const ctaTarget = signature.productId
    ? `/product/${signature.productId.slug}`
    : "/collections";

  return (
    <section className="w-full bg-gray-50 py-28 px-6 lg:px-16">
      <div className="mx-auto mb-20 max-w-5xl text-center">
        <p className="text-[11px] font-medium tracking-[0.35em] text-gray-500">
          SIGNATURE COLLECTION
        </p>
        <h2 className="mt-4 text-4xl lg:text-5xl font-semibold tracking-tight leading-tight">
          {signature.heading}
        </h2>
      </div>

      <div className="mx-auto grid max-w-6xl grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center">

        {/* Image */}
        <div className="overflow-hidden rounded-2xl">
          <img
            src={signature.customImageUrl}
            alt={signature.subheading}
            className="w-full h-full object-cover transition duration-700 hover:scale-105"
          />
        </div>

        {/* Text */}
        <div className="space-y-6 text-center md:text-left">
          {/* Eyebrow — now fully editable by admin */}
          <span className="text-xs tracking-[0.3em] text-gray-500 uppercase">
            {signature.eyebrow}
          </span>

          <h3 className="text-3xl lg:text-4xl font-semibold leading-tight">
            {signature.subheading}
          </h3>

          <p className="text-gray-600 text-base leading-relaxed max-w-lg mx-auto md:mx-0">
            {signature.bodyText}
          </p>

          <button
            onClick={() => navigate(ctaTarget)}
            className="rounded-full border border-black px-8 py-3 text-sm font-medium tracking-wide transition-all duration-300 hover:bg-black hover:text-white"
          >
            {signature.ctaText}
          </button>
        </div>

      </div>
    </section>
  );
}