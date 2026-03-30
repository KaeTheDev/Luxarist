/**
 * Purpose: Renders a quantity stepper control for selecting item quantity.
 *
 * Responsibilities:
 * - Display the current quantity value passed via props.
 * - Call onChange when the user increments or decrements.
 * - Prevent quantity from dropping below 1.
 *
 * Usage:
 *   <QuantitySelector value={quantity} onChange={setQuantity} />
 */

interface QuantitySelectorProps {
    value: number;
    onChange: (value: number) => void;
}

export function QuantitySelector({ value, onChange }: QuantitySelectorProps) {
    return (
        <div className="flex items-center border w-fit">
            <button 
            onClick={() => { if (value > 1) onChange(value - 1); }}
            className="px-4 py-2 text-lg hover:bg-gray-100"
            aria-label="Decrease Quantity"
            > - </button>
            <span className="px-4 py-2 text-sm">{value}</span>
            <button 
            onClick={() => onChange(value + 1)}
            className="px-4 py-2 text-lg hover:bg-gray-100"
            aria-label="Increase Quantity"
            > + </button>
        </div>
    );
}