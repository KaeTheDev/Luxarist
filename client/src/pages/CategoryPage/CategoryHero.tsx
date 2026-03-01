interface CategoryHeroProps {
    title: string;
    description: string;
    imageUrl: string;
    count: number;
}

export function CategoryHero({ title, description, imageUrl, count}: CategoryHeroProps) {
    const itemLabel = count === 1 ? "Item" : "Items";
    
    return(
            <section className="relative w-full h-[75vh] md:h-[85vh] lg:h-screen overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${imageUrl})` }} />

                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/40 to-black/20" />

                {/* Content */}
                <div className="relative z-10 h-full flex items-end">
                    <div className="max-w-7xl mx-auto w-full px-6 md:px-10 pb-16 md:pb-24">

                        {/* Eyebrow */}
                        <p className="text-white/70 uppercase tracking-[0.3em] text-xs mb-4">
                        Luxarist Collection
                        </p>

                        {/* Title */}
                        <h1 className="text-white text-4xl md:text-6xl lg:text-7xl font-semibold mb-6">{title}</h1>

                        {/* Description */}
                        <p className="text-white/80 max-w-xl text-base md:text-lg leading-relaxed mb-8">
                        {description}
                        </p>

                        {/* Meta */}
                        <p className="text-white/60 text-sm tracking-wide">
                            {count} {itemLabel} · New Arrivals Weekly
                        </p>
                    </div>
                </div>
            </section>
    )
}