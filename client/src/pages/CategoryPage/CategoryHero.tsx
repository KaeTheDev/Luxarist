interface CategoryHeroProps {
    title: string;
    description: string;
    imageUrl: string;
    count: number;
}

export function CategoryHero({ title, description, imageUrl, count}: CategoryHeroProps) {
    return(
        <section className="relative w-full h-[70vh] md:h-[85vh] lg:h-screen overflow-hidden">
            <div className="flex flex-col">
            <div className="flex flex-col">
                <p>LUXARIST COLLECTION</p>
                <h1>{title}</h1>
                <h3>{description}</h3>
            </div>

            <div className="flex flex-row">
            {count} Pieces * New Arrivals Weekly
            </div>
            </div>


        </section>
    )
}