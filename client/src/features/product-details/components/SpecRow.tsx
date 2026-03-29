/**
 * Purpose: Renders a single specification label/value row inside a specs table.
 *
 * Responsibilities:
 * - Display a label and its corresponding value in a justified row.
 * - Return null silently when value is undefined, null, or an empty string,
 *   preventing empty rows from appearing in the specifications panel.
 *
 * Usage:
 *   <SpecRow label="Carat Weight" value={product.diamondSpecs.carat} />
 *   <SpecRow label="Finish" value={product.metalSpecs.finish} />
 */

interface SpecRowProps {
    label: string;
    value?: string | number;
}

export function SpecRow({ label, value }: SpecRowProps) {
    if(value === undefined || value === null || value === "") return null;

    return (
        <div className="flex justify-between border-b border-gray-50 pb-2">
            <span className="text-gray-500">{label}:</span>
            <span className="font-medium text-black text-right">{String(value)}</span>
        </div>
    );
}