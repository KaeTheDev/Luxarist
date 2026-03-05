import { useState } from "react"

export function QuantitySelector() {
    const [quantity, setQuantity] = useState(1);

    const decrease = () => {
        if(quantity > 1) setQuantity(quantity - 1);
    };

    const increase = () => {
        setQuantity(quantity + 1);
    };

    return (
        <div className="flex items-center border w-fit">
            <button
            onClick={decrease}
            className="px-4 py-2 text-lg hover:bg-gray-100"
            aria-label="Decrease Quantity"
            > - </button>
            <span className="px-4 py-2 text-sm">{quantity}</span>
            <button
            onClick={increase}
            className="px-4 py-2 text-lg hover:bg-gray-100"
            aria-label="Increase Quantity"
            > + </button>
        </div>
    );
};