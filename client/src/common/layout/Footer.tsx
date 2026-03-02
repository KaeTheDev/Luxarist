/**
 * @name Footer
 * @description The global site footer providing brand identity, social media links, 
 *  and navigational links across Shop, Company, and Support sections. Designed for
 *  large screens and responsive down to mobile viewports.
 * 
 * @composition
 * - Displays the brand logo/name prominently with a short brand description.
 * - Renders social media links with icons imported from `@icons-pack/react-simple-icons`.
 * - Organizes navigational links into Shop, Company, and Support columns.
 * - Includes a bottom bar with copyright and legal links.
 * 
 * @styling
 * - **Layout**: Grid for main content with 1–4 column adaptation; flex for social links and bottom bar.
 * - **Colors**: Pure black background with white text, muted gray for secondary links, hover transitions for interactions.
 * - **Typography**: Uppercase tracking for brand and section headings, light font weights for a luxury feel.
 * - **Interaction**: Hover effects for social icons and links with smooth transitions.
 * 
 * @responsibilities
 * - Serve as a consistent footer across all pages.
 * - Highlight brand identity and ethos.
 * - Provide quick access to key site navigation and social channels.
 * - Maintain accessibility via aria-labels and semantic HTML elements.
 * 
 * @usage
 * - Import and place at the bottom of page layouts.
 * - Can be extended or modified with additional links or social channels as needed.
 */

import { SiInstagram, SiPinterest, SiTiktok, SiX } from "@icons-pack/react-simple-icons";

export function Footer() {
    const socialLinks = [
        { Icon: SiInstagram, href: "#", label: "Instagram" },
        { Icon: SiPinterest, href: "#", label: "Pinterest" },
        { Icon: SiTiktok, href: "#", label: "Tiktok" },
        { Icon: SiX, href: "#", label: "X" },
    ];

    return (
        // Pure Black Background: Provides the ultimate contrast to the 'off-black' newsletter 
        <footer className="w-full bg-black text-white border-t border-white/10">
            <div className="max-w-7xl mx-auto py-20 px-6">
                
                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-16 mb-20">
                    
                    {/* Left Column: Brand Identity */}
                    <div className="flex flex-col space-y-6 items-center lg:items-start text-center lg:text-left">
                        <h1 className="text-2xl tracking-[0.4em] font-light text-white uppercase">
                            LUXARIST
                        </h1>
                        <p className="text-sm text-gray-500 font-light leading-relaxed max-w-xs">
                            Timeless elegance meets contemporary design. Defining the standard for modern luxury.
                        </p>
                        
                        {/* Social Media: Minimalist thin-border circles */}
                        <div className="flex gap-4 pt-2">
                            {socialLinks.map(({ Icon, href, label }) => (
                                <a key={label} href={href} aria-label={label} target="_blank" rel="noopener noreferrer" className="w-9 h-9 border border-white/10 rounded-full flex items-center justify-center hover:border-white/40 hover:bg-white/5 transition-all cursor-pointer">
                                    <Icon size={16} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Right Columns: Muted Links */}
                    <div className="lg:col-span-3 grid grid-cols-2 md:grid-cols-3 gap-10">
                        
                        {/* Shop Column */}
                        <div className="flex flex-col space-y-5">
                            <h3 className="text-xs uppercase tracking-[0.2em] font-semibold text-gray-300">Shop</h3>
                            <div className="flex flex-col space-y-3">
                                {['Bracelets', 'Earrings', 'Necklaces', 'Rings', 'Watches'].map((item) => (
                                    <a key={item} href="#" className="text-sm text-gray-500 hover:text-white transition-colors font-light">
                                        {item}
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* About Column */}
                        <div className="flex flex-col space-y-5">
                            <h3 className="text-xs uppercase tracking-[0.2em] font-semibold text-gray-300">Company</h3>
                            <div className="flex flex-col space-y-3">
                                <a href="#" className="text-sm text-gray-500 hover:text-white transition-colors font-light">Our Story</a>
                                <a href="#" className="text-sm text-gray-500 hover:text-white transition-colors font-light">Craftsmanship</a>
                                <a href="#" className="text-sm text-gray-500 hover:text-white transition-colors font-light">Sustainability</a>
                            </div>
                        </div>

                        {/* Support Column */}
                        <div className="flex flex-col space-y-5">
                            <h3 className="text-xs uppercase tracking-[0.2em] font-semibold text-gray-300">Support</h3>
                            <div className="flex flex-col space-y-3">
                                <a href="#" className="text-sm text-gray-500 hover:text-white transition-colors font-light">Contact Us</a>
                                <a href="#" className="text-sm text-gray-500 hover:text-white transition-colors font-light">Shipping & Returns</a>
                                <a href="#" className="text-sm text-gray-500 hover:text-white transition-colors font-light">Care Guide</a>
                            </div>
                        </div>

                    </div>
                </div>

                {/* Bottom Bar: Clean & Minimal */}
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