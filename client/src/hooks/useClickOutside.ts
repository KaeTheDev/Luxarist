/**
 * Purpose: Calls a handler function when a click or touch occurs outside
 * the referenced element. Handles its own event listener cleanup on unmount.
 *
 * Responsibilities:
 * - Attach mousedown and touchstart listeners to the document on mount.
 * - Ignore events that originate inside the ref'd element.
 * - Call handler when the event target is outside the ref'd element.
 * - Remove listeners on unmount to prevent memory leaks.
 *
 * Usage:
 *   const ref = useRef<HTMLDivElement>(null);
 *   useClickOutside(ref, () => setIsOpen(false));
 *
 *   <div ref={ref}>...</div>
 */

import { useEffect, type RefObject } from "react";

export function useClickOutside<T extends HTMLElement>(
    ref: RefObject<T>,
    handler: () => void
  ) {
    useEffect(() => {
      function listener(e: MouseEvent | TouchEvent) {
        // If the click was inside the ref'd element, do nothing
        if (!ref.current || ref.current.contains(e.target as Node)) return;
        handler();
      }
   
      document.addEventListener("mousedown", listener);
      document.addEventListener("touchstart", listener);
   
      return () => {
        document.removeEventListener("mousedown", listener);
        document.removeEventListener("touchstart", listener);
      };
    }, [ref, handler]);
  }  