/**
 * Purpose: Generic placeholder for pages that are planned but not yet built.
 * Accepts a title prop so it can serve multiple routes with appropriate context.
 *
 * Usage:
 *   <Route path="/sustainability" element={<ComingSoonPage title="Sustainability" />} />
 *   <Route path="/shipping" element={<ComingSoonPage title="Shipping & Returns" />} />
 *   <Route path="/care-guide" element={<ComingSoonPage title="Care Guide" />} />
 */

import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

interface ComingSoonPageProps {
  title: string;
  description?: string;
}

export default function ComingSoonPage({ title }: ComingSoonPageProps) {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-6 text-center gap-8">

      {/* Decorative line */}
      <div className="flex items-center gap-4">
        <div className="h-px w-12 bg-stone-200" />
        <p className="text-[10px] uppercase tracking-[0.4em] font-black text-stone-300">
          Luxarist
        </p>
        <div className="h-px w-12 bg-stone-200" />
      </div>

      <div className="space-y-4 max-w-md">
        <h1 className="text-4xl md:text-5xl font-semibold text-stone-900 tracking-tight">
          {title}
        </h1>
        <p className="text-stone-400 font-light leading-relaxed">
          We're currently crafting this page. Check back soon for the full
          experience.
        </p>
      </div>

      <Link
        to="/collections"
        className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-black text-stone-400 hover:text-stone-900 transition-colors"
      >
        <ArrowLeft size={13} />
        Continue Shopping
      </Link>

    </div>
  );
}