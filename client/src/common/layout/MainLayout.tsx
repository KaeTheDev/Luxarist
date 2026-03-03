/**
 * @name MainLayout
 * @description The root layout component that structures all pages with a consistent
 *  navigation bar, main content area, and footer. Acts as the wrapper for route-based
 *  content using React Router's `Outlet`.
 * 
 * @composition
 * - Includes {@link Navbar} fixed to the top for persistent site navigation.
 * - Uses `<Outlet />` from `react-router-dom` to render page-specific content dynamically.
 * - Includes {@link Footer} at the bottom for consistent branding and links.
 * 
 * @styling
 * - **Layout**: Flex column with `min-h-screen` to fill viewport; `grow` main section for dynamic content expansion.
 * - **Positioning**: Sticky navbar (`top-0 z-50`) to remain visible on scroll.
 * - **Colors**: White background for main content, allowing child components to define their own styles.
 * 
 * @responsibilities
 * - Provide a consistent page structure across all routes.
 * - Keep navigation accessible and visible at all times.
 * - Ensure the main content area adapts to varying page heights.
 * - Maintain consistent footer placement across pages.
 * 
 * @usage
 * - Wrap all routes that should share the same navigation and footer structure.
 * - Works as the root component for route definitions in `react-router-dom`.
 */

import { Outlet } from "react-router-dom";
import { Footer } from "./Footer";
import { Navbar } from "./navigation/Navbar";

export function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* Navbar will stay fixed to the top */}
      <div className="sticky top-0 z-50">
        <Navbar />
      </div>

      {/* Dynamic Page Content */}
      <main className="grow">
          <Outlet />   
      </main>

      <Footer />
    </div>
  );
}