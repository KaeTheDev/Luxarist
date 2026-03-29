/**
 * Purpose: Provides a simple boolean that flips to true on mount, enabling
 * a CSS opacity transition to create a fade-in effect without any animation
 * libraries or custom keyframes.
 *
 * Responsibilities:
 * - Initialize visible as false to start the element transparent.
 * - Flip visible to true on mount via useEffect.
 *
 * Usage:
 *   const visible = useFadeIn();
 *   <div className={`transition-opacity duration-500 ${visible ? "opacity-100" : "opacity-0"}`}>
 */

import { useState, useEffect } from "react";
 
export function useFadeIn() {
  const [visible, setVisible] = useState(false);
  useEffect(() => { setVisible(true); }, []);
  return visible;
}