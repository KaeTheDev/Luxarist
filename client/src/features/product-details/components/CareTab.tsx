/**
 * Purpose: Renders the Care Instructions panel inside the product details tab section.
 *
 * Responsibilities:
 * - Display the static general care note for all Luxarist pieces.
 * - Conditionally render a gemstone-specific care section when gemstoneType is
 *   present and not "none", using CARE_GUIDE keyed by gemstone name.
 * - Fall back to a default gemstone care message when no matching key exists
 *   in CARE_GUIDE for the given gemstone type.
 *
 * Usage:
 *   <CareTab gemstoneType={product.gemstoneType} />
 */

import { CARE_GUIDE } from "../../../constants/careGuide";

interface CareTabProps {
    gemstoneType: string;
}

  export function CareTab({ gemstoneType }: CareTabProps) {
    const hasGemstone = gemstoneType && gemstoneType !== "none";
    const gemstoneKey = gemstoneType?.toLowerCase() as keyof typeof CARE_GUIDE;
   
    return (
      <div className="space-y-8 max-w-3xl animate-in fade-in duration-500">
   
        {/* General care — always shown */}
        <div className="space-y-3">
          <h3 className="font-bold text-xs uppercase tracking-widest">
            General Care
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed">{CARE_GUIDE.general}</p>
        </div>
   
        {/* Gemstone-specific care — only shown when relevant */}
        {hasGemstone && (
          <div className="space-y-3">
            <h3 className="font-bold text-xs uppercase tracking-widest">
              Gemstone Care: {gemstoneType}
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              {CARE_GUIDE[gemstoneKey] ||
                "Avoid harsh chemicals and ultrasonic cleaners for delicate gemstones."}
            </p>
          </div>
        )}
   
      </div>
    );
  }