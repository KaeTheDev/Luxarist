/**
 * Purpose: Fetches the current site content document from GET /api/site-content.
 * Used by HeroSection and SignatureHighlightSection to render dynamic content
 * that an admin can update without touching code.
 *
 * Responsibilities:
 * - Fetch site content on mount.
 * - Expose hero and signature content separately for clean consumption.
 * - Surface loading and error states.
 *
 * Usage:
 *   const { hero, signature, loading } = useSiteContent();
 */

import { useState, useEffect } from "react";
import { API_URL } from "../api/config";
 
export interface HeroContent {
  videoUrl: string;
  fallbackImageUrl: string;
  heading: string;
  bodyText: string;
  ctaText: string;
  ctaLink: string;
}
 
export interface SignatureContent {
  productId: {
    _id: string;
    name: string;
    slug: string;
    primaryImageUrl: string;
  } | null;
  customImageUrl: string;
  eyebrow: string;
  heading: string;
  subheading: string;
  bodyText: string;
  ctaText: string;
}
 
const HERO_DEFAULTS: HeroContent = {
  videoUrl: "https://ik.imagekit.io/gwbd4eva2026/hero.mp4",
  fallbackImageUrl: "https://ik.imagekit.io/gwbd4eva2026/hero/hero.png",
  heading: "Luxury in Every Detail",
  bodyText: "Discover refinement across every piece in our exclusive collection.",
  ctaText: "Shop the Collection",
  ctaLink: "/collections",
};
 
const SIGNATURE_DEFAULTS: SignatureContent = {
  productId: null,
  customImageUrl: "https://ik.imagekit.io/gwbd4eva2026/misc/signature.png",
  eyebrow: "Timeless Elegance",
  heading: "The Necklace That Defines the Brand",
  subheading: "Luxury Necklace",
  bodyText: "Experience timeless elegance and unmatched craftsmanship, designed to elevate every moment.",
  ctaText: "View Necklace",
};
 
export function useSiteContent() {
  const [hero, setHero] = useState<HeroContent>(HERO_DEFAULTS);
  const [signature, setSignature] = useState<SignatureContent>(SIGNATURE_DEFAULTS);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
 
  useEffect(() => {
    async function fetchContent() {
      try {
        const res = await fetch(`${API_URL}/site-content`);
        if (!res.ok) throw new Error("Failed to load site content.");
        const data = await res.json();
        if (data.hero) setHero(data.hero);
        if (data.signature) setSignature(data.signature);
      } catch (err: any) {
        console.error("[useSiteContent]", err.message);
        setError(err.message);
        // Falls back to defaults — site remains functional
      } finally {
        setLoading(false);
      }
    }
    fetchContent();
  }, []);
 
  return { hero, signature, loading, error };
}