/**
 * File: useFavorites.ts
 * Purpose:
 * A custom React hook that provides a centralized mechanism for managing user product 
 * favorites with persistent storage and cross-component synchronization.
 *
 * Responsibilities:
 * - Persistent Storage: Manages a list of favorited product IDs in `localStorage`
 * under the 'luxarist_favorites' key.
 * - Global Synchronization: Utilizes a custom 'favorites-updated' window event to 
 * ensure state consistency across multiple instances of the hook (e.g., between 
 * ProductCards and the FavoritesPage).
 * - State Initialization: Synchronously reads from storage on initial load to 
 * prevent UI flickering or missing data.
 * - CRUD Operations: Provides a `toggleFavorite` utility to handle both adding 
 * to and removing from the favorites array.
 *
 * Usage:
 * - Import and call `useFavorites()` in any component needing access to the 
 * favorites list or the toggle functionality.
 * - Use the returned `favorites` array to determine the "active" state of icons.
 * - Trigger `toggleFavorite(id)` to update the global list and storage automatically.
 */

import { useState, useEffect } from "react";

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>(() => {
    // Initialize state immediately from localStorage on first load
    const saved = localStorage.getItem("luxarist_favorites");
    return saved ? JSON.parse(saved) : [];
  });

  // Sync state across different instances/tabs
  useEffect(() => {
    const handleStorageChange = () => {
      const saved = localStorage.getItem("luxarist_favorites");
      setFavorites(saved ? JSON.parse(saved) : []);
    };

    // Listen for changes made in other components
    window.addEventListener("favorites-updated", handleStorageChange);
    return () => window.removeEventListener("favorites-updated", handleStorageChange);
  }, []);

  const toggleFavorite = (productId: string) => {
    const saved = localStorage.getItem("luxarist_favorites");
    const current: string[] = saved ? JSON.parse(saved) : [];
    
    const updated = current.includes(productId)
      ? current.filter((id) => id !== productId)
      : [...current, productId];

    localStorage.setItem("luxarist_favorites", JSON.stringify(updated));
    
    // Update local state
    setFavorites(updated);
    
    // Trigger a custom event so OTHER instances of this hook update immediately
    window.dispatchEvent(new Event("favorites-updated"));
  };

  return { favorites, toggleFavorite };
}