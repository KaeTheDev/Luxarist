import { useRef } from "react";

export function useCarousel() {
    const containerRef = useRef<HTMLDivElement>(null);

    const next = () => {
        if(!containerRef.current) return;
        containerRef.current.scrollBy({
            left: containerRef.current.offsetWidth,
            behavior: "smooth",
        });
    };

    const prev = () => {
        if(!containerRef.current) return;
        containerRef.current.scrollBy({
            left: -containerRef.current.offsetWidth,
            behavior: "smooth",
        });
    };

    return { containerRef, next, prev };
}