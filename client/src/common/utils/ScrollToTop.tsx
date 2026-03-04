/**
 * File: ScrollToTop.ts
 * Purpose:
 * Ensures that the browser window scrolls to the top of the page whenever 
 * the route changes. This corrects the default SPA behavior where scroll 
 * position is preserved across navigations.
 *
 * Responsibilities:
 * - Route Observation: Monitors the current pathname using `useLocation`.
 * - Scroll Management: Triggers `window.scrollTo(0, 0)` immediately upon 
 * detecting a route change.
 *
 * Usage:
 * - Import and place the `ScrollToTop` component inside the `Router` 
 * but outside the `Routes` definition in `App.tsx`.
 */

import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Optional: use 'smooth' for a gentle glide, or 'instant' for a sharp jump
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth", 
    });
  }, [pathname]);

  return null;
}