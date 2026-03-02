/**
 * @name Footer
 * @description The primary site-wide footer component, providing brand identity, navigation clusters, and social connectivity.
 * Designed with a high-contrast, "pure black" luxury aesthetic to anchor the page's visual weight.
 * * @features
 * - **Information Architecture**: Organizes links into Shop, Company, and Support clusters for intuitive site-wide discovery.
 * - **Social Integration**: Maps simple-icon components into thin-bordered circular buttons for a minimalist aesthetic.
 * - **Responsive Grid**: Fluidly transitions from a centered single-column stack on mobile to a sophisticated four-column layout on desktop.
 * - **Semantic Structure**: Utilizes a standard `<footer>` wrapper with ARIA labels on social links for accessibility.
 * * @styling
 * - **Typography**: Employs wide letter-spacing (`tracking-[0.4em]`) on the logo and headers to evoke an "Expensive" editorial feel.
 * - **Borders**: Uses low-opacity whites (`border-white/10` and `border-white/5`) to create subtle section separation without visual clutter.
 * - **Interactions**: Features delicate text-color shifts and background-pulse effects on social icons for "soft" user feedback.
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