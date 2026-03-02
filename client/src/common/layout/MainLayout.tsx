/**
 * @name MainLayout
 * @description The primary architectural wrapper for the Luxarist application. 
 * Establishes a consistent global structure by mounting persistent navigation 
 * and footer elements around a dynamic content outlet.
 * * @features
 * - **Sticky Orchestration**: Hooks the {@link Navbar} to the top of the viewport using `sticky`, ensuring constant access to brand navigation without obscuring content.
 * - **Dynamic Routing**: Utilizes React Router's `<Outlet />` to inject page-specific components (Home, Shop All, Product Detail) into the core layout.
 * - **Flex Architecture**: Implements a `min-h-screen` flex-column to force the footer to the bottom of the viewport even on content-light pages.
 * * @styling
 * - **Layering**: Manages the `z-50` stacking context for the navigation bar to prevent overlap with background hero images or absolute-positioned elements.
 * - **Growth Logic**: Applies `grow` to the `<main>` tag, ensuring the content area expands to fill all available vertical space between the header and footer.
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