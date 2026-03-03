/**
 * @name BrandPromiseSection
 * @description Highlights the brand’s key promises and values in a visually structured section.
 *  Uses the `luxaristPromises` data array to dynamically render promise cards emphasizing craftsmanship, guarantee, and service.
 * 
 * @composition
 * - Imports `luxaristPromises` for content and `PromiseCard` for individual promise display.
 * - Maps over the promises array to render each `PromiseCard` in a responsive grid.
 * - Includes a section header with a small descriptor and main heading.
 * 
 * @styling
 * - **Layout**: Responsive grid layout with 1–4 columns depending on viewport size and gap spacing.
 * - **Typography**: Light-weight headings with tracked uppercase subtext for a premium look.
 * - **Colors**: Dark background with white text to emphasize brand luxury and contrast.
 * - **Interaction**: Cards can include hover or visual effects (delegated to `PromiseCard`).
 * 
 * @responsibilities
 * - Showcase the brand’s core promises in a concise and visually appealing way.
 * - Maintain a consistent premium style across the section.
 * - Provide reusable structure for any updates to the brand promises.
 * 
 * @usage
 * - Import and render as part of a homepage or brand overview section.
 * - Example:
 *      <BrandPromiseSection />
 */

import { luxaristPromises } from "../data/LuxaristPromises";
import { PromiseCard } from "../components/PromiseCard";

export function BrandPromiseSection() {
    return (
        <section className="relative bg-[#0f0f0f] text-white py-24 px-6">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <p className="text-xs tracking-[0.3em] uppercase text-gray-400 mb-4">
                        The Luxarist Promise
                    </p>
                    <h2 className="text-3xl md:text-4xl font-light">Excellence Without Compromise</h2>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {luxaristPromises.map((promise) => (
                        <PromiseCard key={promise.id} {...promise} />
                    ))}
                </div>
            </div>
        </section>
    );
} 