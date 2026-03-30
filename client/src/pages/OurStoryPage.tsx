/**
 * Purpose: Placeholder page for the Our Story / About section.
 * Displays brand identity content until a full editorial page is built.
 *
 * Usage:
 *   <Route path="/about" element={<OurStoryPage />} />
 */

export default function OurStoryPage() {
    return (
      <div className="min-h-screen bg-white">
  
        {/* Hero */}
        <section className="relative w-full h-[60vh] flex items-center justify-center overflow-hidden bg-stone-900">
          <div className="absolute inset-0 bg-[url('https://ik.imagekit.io/gwbd4eva2026/hero/hero.png')] bg-cover bg-center opacity-30" />
          <div className="relative z-10 text-center px-6 space-y-4">
            <p className="text-[11px] uppercase tracking-[0.4em] text-white/50 font-bold">
              Luxarist
            </p>
            <h1 className="text-5xl md:text-7xl font-light text-white tracking-tight">
              Our Story
            </h1>
            <p className="text-white/60 text-sm md:text-base font-light max-w-md mx-auto leading-relaxed">
              Timeless elegance meets contemporary design.
            </p>
          </div>
        </section>
  
        {/* Content */}
        <main className="max-w-3xl mx-auto px-6 py-24 space-y-16">
  
          <section className="space-y-6">
            <h2 className="text-2xl font-semibold text-stone-900 tracking-tight">
              The Luxarist Vision
            </h2>
            <p className="text-stone-500 leading-relaxed font-light">
              Founded on the belief that luxury should be personal, Luxarist was
              created to bring museum-quality craftsmanship directly to those who
              appreciate the finest things. Each piece in our collection is
              thoughtfully designed to transcend trends and become part of your
              personal legacy.
            </p>
          </section>
  
          <div className="h-px bg-stone-100" />
  
          <section className="space-y-6">
            <h2 className="text-2xl font-semibold text-stone-900 tracking-tight">
              Master Craftsmanship
            </h2>
            <p className="text-stone-500 leading-relaxed font-light">
              Every Luxarist piece is crafted by artisans with over 30 years of
              experience in fine jewelry making. From the initial sketch to the
              final polish, we maintain exacting standards at every stage of
              production — because true luxury lives in the details you can't see.
            </p>
          </section>
  
          <div className="h-px bg-stone-100" />
  
          <section className="space-y-6">
            <h2 className="text-2xl font-semibold text-stone-900 tracking-tight">
              Sustainability
            </h2>
            <p className="text-stone-500 leading-relaxed font-light">
              We source only ethically mined gemstones and recycled precious
              metals. Our commitment to responsible luxury means you can wear
              Luxarist with pride — knowing every piece was created with care for
              both people and planet.
            </p>
          </section>
  
          {/* Coming soon notice */}
          <div className="border border-stone-100 rounded-3xl p-8 text-center space-y-2 bg-stone-50/50">
            <p className="text-[10px] uppercase tracking-[0.3em] font-black text-stone-400">
              Full Story Coming Soon
            </p>
            <p className="text-sm text-stone-400 font-light">
              We're crafting a more complete editorial experience for this page.
            </p>
          </div>
  
        </main>
      </div>
    );
  }