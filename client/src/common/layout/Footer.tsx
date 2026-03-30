/**
 * @name Footer
 * @description The global site footer providing brand identity, social media links,
 * and navigational links across Shop, Company, and Support sections. Designed for
 * large screens and responsive down to mobile viewports.
 *
 * @composition
 * - Displays the brand logo/name prominently with a short brand description.
 * - Renders social media links with icons imported from @icons-pack/react-simple-icons.
 * - Organizes navigational links into Shop, Company, and Support columns.
 * - Includes a bottom bar with copyright and legal links.
 *
 * @styling
 * - Layout: Grid for main content with 1–4 column adaptation; flex for social links and bottom bar.
 * - Colors: Pure black background with white text, muted gray for secondary links.
 * - Typography: Uppercase tracking for brand and section headings, light font weights.
 * - Interaction: Hover effects for social icons and links with smooth transitions.
 *
 * @responsibilities
 * - Serve as a consistent footer across all pages.
 * - Highlight brand identity and ethos.
 * - Provide quick access to key site navigation and social channels.
 * - Maintain accessibility via aria-labels and semantic HTML elements.
 *
 * @usage
 * - Import and place at the bottom of page layouts.
 */

import { Link } from "react-router-dom";
import { SiInstagram, SiPinterest, SiTiktok, SiX } from "@icons-pack/react-simple-icons";

export function Footer() {
    const socialLinks = [
      { Icon: SiInstagram, href: "https://instagram.com", label: "Instagram" },
      { Icon: SiPinterest, href: "https://pinterest.com", label: "Pinterest" },
      { Icon: SiTiktok, href: "https://tiktok.com", label: "Tiktok" },
      { Icon: SiX, href: "https://x.com", label: "X" },
    ];
   
    const shopLinks = [
      { label: "Bracelets", to: "/collections/bracelet" },
      { label: "Earrings", to: "/collections/earrings" },
      { label: "Necklaces", to: "/collections/necklace" },
      { label: "Rings", to: "/collections/ring" },
      { label: "Watches", to: "/collections/watch" },
      { label: "New Arrivals", to: "/collections/new-arrivals" },
      { label: "Shop All", to: "/collections" },
    ];
   
    const companyLinks = [
      { label: "Our Story", to: "/" },
      { label: "Craftsmanship", to: "/" },
      { label: "Sustainability", to: "/" },
    ];
   
    const supportLinks = [
      { label: "Contact Us", to: "/" },
      { label: "Shipping & Returns", to: "/" },
      { label: "Care Guide", to: "/" },
    ];
   
    return (
      <footer className="w-full bg-black text-white border-t border-white/10">
        <div className="max-w-7xl mx-auto py-20 px-6">
   
          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-16 mb-20">
   
            {/* Left Column: Brand Identity */}
            <div className="flex flex-col space-y-6 items-center lg:items-start text-center lg:text-left">
              <Link to="/" className="text-2xl tracking-[0.4em] font-light text-white uppercase hover:text-gray-300 transition-colors">
                LUXARIST
              </Link>
              <p className="text-sm text-gray-500 font-light leading-relaxed max-w-xs">
                Timeless elegance meets contemporary design. Defining the standard
                for modern luxury.
              </p>
   
              {/* Social Media */}
              <div className="flex gap-4 pt-2">
                {socialLinks.map(({ Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 border border-white/10 rounded-full flex items-center justify-center hover:border-white/40 hover:bg-white/5 transition-all cursor-pointer"
                  >
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </div>
   
            {/* Right Columns */}
            <div className="lg:col-span-3 grid grid-cols-2 md:grid-cols-3 gap-10">
   
              {/* Shop Column */}
              <div className="flex flex-col space-y-5">
                <h3 className="text-xs uppercase tracking-[0.2em] font-semibold text-gray-300">
                  Shop
                </h3>
                <div className="flex flex-col space-y-3">
                  {shopLinks.map(({ label, to }) => (
                    <Link
                      key={label}
                      to={to}
                      className="text-sm text-gray-500 hover:text-white transition-colors font-light"
                    >
                      {label}
                    </Link>
                  ))}
                </div>
              </div>
   
              {/* Company Column */}
              <div className="flex flex-col space-y-5">
                <h3 className="text-xs uppercase tracking-[0.2em] font-semibold text-gray-300">
                  Company
                </h3>
                <div className="flex flex-col space-y-3">
                  {companyLinks.map(({ label, to }) => (
                    <Link
                      key={label}
                      to={to}
                      className="text-sm text-gray-500 hover:text-white transition-colors font-light"
                    >
                      {label}
                    </Link>
                  ))}
                </div>
              </div>
   
              {/* Support Column */}
              <div className="flex flex-col space-y-5">
                <h3 className="text-xs uppercase tracking-[0.2em] font-semibold text-gray-300">
                  Support
                </h3>
                <div className="flex flex-col space-y-3">
                  {supportLinks.map(({ label, to }) => (
                    <Link
                      key={label}
                      to={to}
                      className="text-sm text-gray-500 hover:text-white transition-colors font-light"
                    >
                      {label}
                    </Link>
                  ))}
                </div>
              </div>
   
            </div>
          </div>
   
          {/* Bottom Bar */}
          <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-[10px] uppercase tracking-[0.3em] text-gray-600">
              © 2026 Luxarist. All rights reserved.
            </p>
            <div className="flex gap-8 text-[10px] uppercase tracking-[0.3em] text-gray-600">
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
            </div>
          </div>
   
        </div>
      </footer>
    );
  }