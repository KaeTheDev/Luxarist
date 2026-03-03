interface NewArrivalsBannerProps {
  count: number;
  minPrice: number;
  maxPrice: number;
}

export function NewArrivalsBanner({
  count,
  minPrice,
  maxPrice,
}: NewArrivalsBannerProps) {
  // Utility to format 6500 into $6,500
  const formatCurrency = (val: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(val);

  return (
    <div className="relative z-20 mt-20 container mx-auto px-6 md:px-12 lg:px-20">
      <div className="bg-[#111111] rounded-2xl p-8 md:p-12 flex flex-col md:flex-row justify-between items-start md:items-center text-white shadow-2xl border border-white/5">
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.4em] text-white/40 font-medium">
            <span className="text-lg">↗</span> Just Launched
          </div>
          <h2 className="text-3xl md:text-4xl font-light tracking-tight">
            Exclusive New Collection
          </h2>
          <p className="text-sm text-white/30 font-light">
            {count} stunning pieces now available
          </p>
        </div>

        <div className="flex gap-12 md:gap-20 mt-10 md:mt-0 pt-8 md:pt-0 border-t md:border-t-0 border-white/10 w-full md:w-auto">
          <div className="flex flex-col">
            <span className="text-[9px] uppercase tracking-widest text-white/25 mb-3">
              From
            </span>
            <span className="text-2xl font-light tracking-tight">
              {formatCurrency(minPrice)}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-[9px] uppercase tracking-widest text-white/25 mb-3">
              To
            </span>
            <span className="text-2xl font-light tracking-tight">
              {formatCurrency(maxPrice)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}