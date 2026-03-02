import { Link } from "react-router-dom";

interface CategoryHeroProps {
  title: string;
  description: string;
  imageUrl: string;
  count: number;
  variant?: "category" | "shop-all";
}

export function CategoryHero({
  title,
  description,
  imageUrl,
  count,
  variant = "category",
}: CategoryHeroProps) {
  const itemLabel = count === 1 ? "Piece" : "Pieces";
  const isShopAll = variant === "shop-all";

  return (
    <section className="relative w-full h-[70vh] min-h-125px flex items-center overflow-hidden bg-black">
      {/* Background Image Container */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center transition-transform duration-700 md:hover:scale-105"
        style={{ backgroundImage: `url(${imageUrl})` }}
      >
        {/* Uniform dark overlay for the centered "Shop All" look */}
        <div
          className={`absolute inset-0 ${
            isShopAll ? "bg-black/50" : "bg-black/40 md:bg-black/20"
          }`}
        />

        {!isShopAll && (
          <div className="absolute inset-0 bg-linear-to-b from-black/60 via-transparent to-black/60 md:bg-linear-to-r md:from-black/60 md:via-transparent md:to-transparent" />
        )}
      </div>

      <div className="relative z-10 container mx-auto px-6 md:px-12 lg:px-20">
        <div
          className={`mx-auto ${
            isShopAll
              ? "max-w-4xl text-center"
              : "max-w-xl md:mx-0 text-center md:text-left"
          }`}
        >
          {/* Breadcrumbs Layer */}
          <nav className="hidden md:flex items-center text-[9px] uppercase tracking-[0.3em] text-white/40 mb-8 font-medium">
            <Link to="/" className="hover:text-white transition-colors">
              HOME
            </Link>

            <span className="mx-3 opacity-30">/</span>

            {/* Displays "Shop All" if it's the main page, otherwise displays the category title (e.g., "Bracelets") */}
            <span className="text-white/80 cursor-default uppercase">
              {isShopAll ? "Shop All" : title}
            </span>
          </nav>
          {/* Eyebrow */}
          <p className="text-white/60 uppercase tracking-[0.4em] text-[10px] md:text-[12px] mb-4 font-medium">
            Luxarist Collection
          </p>

          {/* Title */}
          <h1 className="text-white text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-light tracking-tight leading-[1.1] mb-6 drop-shadow-lg">
            {title}
          </h1>

          {/* Description */}
          <p
            className={`text-white/80 text-sm md:text-lg leading-relaxed mb-10 font-light mx-auto ${
              isShopAll ? "max-w-xl" : "max-w-sm md:mx-0"
            }`}
          >
            {description}
          </p>

          {/* Meta Info */}
          <div
            className={`flex flex-col items-center ${
              isShopAll ? "" : "md:items-start"
            }`}
          >
            <div className="h-px w-16 bg-white/30 mb-6" />
            <p className="text-white/50 text-[10px] uppercase tracking-[0.3em] font-semibold">
              {count} {itemLabel} &bull; New Arrivals Weekly
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}