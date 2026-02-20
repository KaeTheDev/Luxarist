/**
 * @name DesktopNav
 * @description The primary horizontal navigation bar for large-screen viewports (md+).
 * * @composition
 * - Integrates {@link ShopDropdown} for complex category navigation.
 * - Utilizes `react-router-dom` Link components for client-side routing.
 * * @styling
 * - **Layout**: Flexbox with `gap-10` for wide-track spacing.
 * - **Typography**: Medium weight with tight letter spacing for a luxury aesthetic.
 * - **Interaction**: Global transition-color effects on hover for navigation items.
 */

import { Link } from "react-router-dom";
import { ShopDropdown } from "./ShopDropdown";

export function DesktopNav() {
    return(
        <nav className="hidden md:block">
            <ul className="flex items-center gap-10 text-gray-900 font-medium tracking-tight">
                <li>
                    <Link to="/" className="hover:text-gray-500 transition-colors">
                    Home
                    </Link>
                </li>
                
                <li>
                    <Link to="/collections" className="hover:text-gray-500 transition-colors">
                    Collections
                    </Link>
                </li>

                <ShopDropdown />
            </ul>
        </nav>
    );
}