/**
 * @name BrandPromiseSection
 * @description A high-level organizational component that presents the brand's core values and service guarantees.
 * Serves as a trust-building section typically placed on the Homepage or "About" pages.
 * * @features
 * - **Data Integration**: Injects {@link luxaristPromises} into a standardized grid, ensuring the brand's messaging remains centralized and easy to update.
 * - **Section Header**: Utilizes a tiered typography approach with a wide-tracked eyebrow and a light-weight H2 for an editorial, upscale feel.
 * - **Responsive Orchestration**: Dynamically adjusts the layout from a single-column mobile view to a four-column desktop spread.
 * * @styling
 * - **Atmospheric Design**: Employs a "Near-Black" background (`#0f0f0f`) to create a moody, luxury environment that makes the glassmorphism of the child {@link PromiseCard} components pop.
 * - **Max-Width Constraint**: Wraps the grid in a `max-w-7xl` container to maintain readability and alignment on ultra-wide monitors.
 * - **Vertical Breathing Room**: Applies generous `py-24` padding to allow the brand pillars enough space to feel distinct and significant.
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
                    {luxaristPromises.map((promise, i) => (
                        <PromiseCard key={i} {...promise} />
                    ))}
                </div>
            </div>
        </section>
    );
} 