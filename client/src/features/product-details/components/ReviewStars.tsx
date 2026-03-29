/**
 * Purpose: Provides all star-rendering primitives for the reviews feature.
 *
 * Responsibilities:
 * - RatingStars: Renders a static row of 5 filled/empty stars for a given rating value.
 * - StarPicker: Renders an interactive 5-star selector with hover and selected states
 *   for use inside the ReflectionForm.
 *
 * Usage:
 *   // Static display
 *   <RatingStars rating={4} />
 *   <RatingStars rating={4} size={16} />
 *
 *   // Interactive picker
 *   const [rating, setRating] = useState(0);
 *   <StarPicker value={rating} onChange={setRating} />
 */

import { useState } from "react";
import { Star } from "lucide-react";
 
// ─────────────────────────────────────────────────────────────────────────────
// RatingStars
// ─────────────────────────────────────────────────────────────────────────────
 
interface RatingStarsProps {
  rating: number;
  size?: number;
}
 
export function RatingStars({ rating, size = 13 }: RatingStarsProps) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={size}
          fill={i <= rating ? "#1c1917" : "none"}
          className={i <= rating ? "text-stone-900" : "text-stone-200"}
        />
      ))}
    </div>
  );
}
 
// ─────────────────────────────────────────────────────────────────────────────
// StarPicker
// ─────────────────────────────────────────────────────────────────────────────
 
interface StarPickerProps {
  value: number;
  onChange: (value: number) => void;
}
 
export function StarPicker({ value, onChange }: StarPickerProps) {
  const [hovered, setHovered] = useState(0);
 
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <button
          key={i}
          type="button"
          onMouseEnter={() => setHovered(i)}
          onMouseLeave={() => setHovered(0)}
          onClick={() => onChange(i)}
          className="transition-transform hover:scale-110 active:scale-95"
          aria-label={`Rate ${i} star${i !== 1 ? "s" : ""}`}
        >
          <Star
            size={20}
            fill={(hovered || value) >= i ? "#1c1917" : "none"}
            className={(hovered || value) >= i ? "text-stone-900" : "text-stone-300"}
          />
        </button>
      ))}
    </div>
  );
}