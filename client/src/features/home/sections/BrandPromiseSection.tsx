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