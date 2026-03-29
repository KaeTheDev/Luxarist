/**
 * Purpose: Renders the Specifications panel inside the product details tab section.
 *
 * Responsibilities:
 * - Render the Diamond Specifications column when diamondSpecs is present and populated.
 * - Render the Metal Specifications column when metalSpecs is present and populated.
 * - Always render the Product Details column with material, gemstone, style, and SKU.
 * - Delegate each row to SpecRow, which handles null/empty value guarding internally.
 *
 * Usage:
 *   <SpecificationsTab
 *     diamondSpecs={product.diamondSpecs}
 *     metalSpecs={product.metalSpecs}
 *     material={product.material}
 *     gemstoneType={product.gemstoneType}
 *     style={product.style}
 *     sku={product.sku}
 *   />
 */

import { SpecRow } from "./SpecRow";
import type { Product } from "../../dashboard/shared/types";

interface SpecificationsTabProps {
    diamondSpecs?: Product["diamondSpecs"];
    metalSpecs?: Product["metalSpecs"];
    material: string;
    gemstoneType: string;
    style: string;
    sku: string;
}

export function SpecificationsTab({ diamondSpecs, metalSpecs, material, gemstoneType, style, sku }: SpecificationsTabProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-10 animate-in fade-in duration-500">
     
          {/* Diamond / Gemstone Column */}
          {diamondSpecs && Object.keys(diamondSpecs).length > 0 && (
            <div className="space-y-3">
              <h3 className="font-bold text-xs uppercase tracking-widest">
                Diamond Specifications
              </h3>
              <div className="space-y-2">
                <SpecRow label="Carat Weight" value={diamondSpecs.carat} />
                <SpecRow label="Cut"          value={diamondSpecs.cut} />
                <SpecRow label="Color"        value={diamondSpecs.color} />
                <SpecRow label="Clarity"      value={diamondSpecs.clarity} />
                <SpecRow label="Halo"         value={diamondSpecs.halo} />
                <SpecRow label="Stones"       value={diamondSpecs.stones} />
              </div>
            </div>
          )}
     
          {/* Metal / Construction Column */}
          {metalSpecs && Object.keys(metalSpecs).length > 0 && (
            <div className="space-y-3">
              <h3 className="font-bold text-xs uppercase tracking-widest">
                Metal Specifications
              </h3>
              <div className="space-y-2">
                <SpecRow label="Metal Type"       value={metalSpecs.type} />
                <SpecRow label="Weight"           value={metalSpecs.weight} />
                <SpecRow label="Finish"           value={metalSpecs.finish} />
                <SpecRow label="Setting"          value={metalSpecs.setting} />
                <SpecRow label="Width"            value={metalSpecs.width} />
                <SpecRow label="Length"           value={metalSpecs.length} />
                <SpecRow label="Clasp"            value={metalSpecs.clasp} />
                <SpecRow label="Movement"         value={metalSpecs.movement} />
                <SpecRow label="Water Resistance" value={metalSpecs.waterResistance} />
                <SpecRow label="Crystal"          value={metalSpecs.glass} />
                <SpecRow label="Strap"            value={metalSpecs.strap} />
                <SpecRow label="Battery"          value={metalSpecs.battery} />
              </div>
            </div>
          )}
     
          {/* Shared Product Details — always visible */}
          <div className="space-y-3">
            <h3 className="font-bold text-xs uppercase tracking-widest">
              Product Details
            </h3>
            <div className="space-y-2">
              <SpecRow label="Material" value={material} />
              <SpecRow label="Gemstone" value={gemstoneType !== "none" ? gemstoneType : undefined} />
              <SpecRow label="Style"    value={style} />
              <SpecRow label="SKU"      value={sku} />
            </div>
          </div>
     
        </div>
      );
}