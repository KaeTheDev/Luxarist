/**
 * Purpose: Renders the Description panel inside the product details tab section.
 *
 * Responsibilities:
 * - Display the product's description copy from the database.
 * - Fall back to a default placeholder string if no description is provided.
 * - Append the static Luxarist craftsmanship note beneath the product copy.
 *
 * Usage:
 *   <DescriptionTab description={product.description} />
 */

interface DescriptionTabProps {
    description?: string;
}

export function DescriptionTab({ description }: DescriptionTabProps) {
    return(
        <div className="space-y-6 text-gray-700 leading-relaxed max-w-4xl animate-in fade-in duration-500 text-sm md:text-base">
            <p>{description || "A masterpiece of modern craftsmanship..."}</p>
            <p> Each piece is crafted by master artisans with over 30 years of experience
        in fine jewelry making, ensuring every detail meets the Luxarist standard
        of excellence.
        </p>
        </div>
    );
}