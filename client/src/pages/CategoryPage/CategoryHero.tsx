interface CategoryHeroProps {
    title: string;
    description: string;
    imageUrl: string;
    count: number;
  }
  
  export function CategoryHero({ title, description, imageUrl, count }: CategoryHeroProps) {
    const itemLabel = count === 1 ? "Piece" : "Pieces";
  
    return (
      <section className="relative w-full h-[60vh] min-h-112.5 flex items-center overflow-hidden bg-black">
        {/* Background Image Container */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center transition-transform duration-700 md:hover:scale-105" 
          style={{ backgroundImage: `url(${imageUrl})` }}
        >
          {/* Overlay for contrast */}
          <div className="absolute inset-0 bg-black/40 md:bg-black/20" />
          
          {/* Gradient: Subtle on mobile, stronger on left for desktop */}
          <div className="absolute inset-0 bg-linear-to-b from-black/60 via-transparent to-black/60 md:bg-linear-to-r md:from-black/60 md:via-transparent md:to-transparent" />
        </div>
  
        {/* Content Layer */}
        <div className="relative z-10 container mx-auto px-6 md:px-12 lg:px-20">
          {/* Alignment Logic: 
              - mx-auto + text-center for Mobile 
              - md:mx-0 + md:text-left for Tablet/Desktop 
          */}
          <div className="max-w-xl mx-auto md:mx-0 text-center md:text-left">
            
            {/* Breadcrumbs: Hidden on mobile to keep it clean, visible on tablet+ */}
            <nav className="hidden md:flex items-center text-[10px] uppercase tracking-[0.2em] text-white/70 mb-6 font-bold">
              <span className="hover:text-white cursor-pointer transition-colors">Home</span>
              <span className="mx-2 opacity-50">&gt;</span>
              <span className="text-white">{title}</span>
            </nav>
  
            {/* Eyebrow */}
            <p className="text-white/60 uppercase tracking-[0.3em] text-[10px] md:text-[11px] mb-2 font-medium">
              Luxarist Collection
            </p>
  
            {/* Title: Scaled down for mobile to avoid awkward line breaks */}
            <h1 className="text-white text-5xl md:text-7xl lg:text-8xl font-light leading-tight mb-4 drop-shadow-md">
              {title}
            </h1>
  
            {/* Description: mx-auto ensures the max-width doesn't pin it left on mobile */}
            <p className="text-white/80 max-w-sm mx-auto md:mx-0 text-sm md:text-base leading-relaxed mb-8 font-light">
              {description}
            </p>
  
            {/* Meta Info */}
            <div className="flex flex-col items-center md:items-start">
              <div className="h-px w-12 bg-white/30 mb-4" /> 
              <p className="text-white/50 text-[10px] uppercase tracking-[0.2em] font-semibold">
                {count} {itemLabel} &bull; New Arrivals Weekly
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }